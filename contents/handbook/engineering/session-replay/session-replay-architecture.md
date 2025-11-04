---
title: Session replay architecture
sidebar: Docs
showTitle: true
---

## Session recording architecture: ingestion → processing → serving

## 1. Capture (client-side)

**PostHog-JS** uses **rrweb** (record and replay the web) to:
- Serialize DOM into JSON snapshots
- Capture full snapshots (complete DOM state) + incremental snapshots (mutations/interactions)
- Track clicks, keypresses, mouse activity, console logs, network requests
- Batch events into `$snapshot_items` arrays with a `$session_id` (UUIDv7)
- Send to `/s/` (replay capture endpoint) via `$snapshot` events

Events include metadata: `$window_id`, `$session_id`, `$snapshot_source` (Web/Mobile), timestamps, distinct_id

## 2. Ingestion pipeline

### Phase 1: Rust capture service (recordings mode)
**`rust/capture/src/router.rs:235` and `rust/capture/src/v0_endpoint.rs:342`**
- Separate capture service instance running with `CAPTURE_MODE=recordings`
- Receives POST to `/s/` endpoint (routed to `recording` handler)
- Validates session_id (rejects IDs >70 chars or with non-alphanumeric characters except hyphens)
- Calls `process_replay_events` to transform events into `$snapshot_items` format
- Publishes to **`session_recording_snapshot_item_events`** Kafka topic
- Or **`session_recording_snapshot_item_overflow`** if session is billing-limited (checked via Redis) OR if session id is present in Redis key @posthog/capture-overflow/replay (operational/load management) 

**Kafka sink** (`rust/capture/src/sinks/kafka.rs`):
- Produces to primary topic: `KAFKA_SESSION_RECORDING_SNAPSHOT_ITEM_EVENTS`
- Overflow topic: `KAFKA_SESSION_RECORDING_SNAPSHOT_ITEM_OVERFLOW`

### Phase 2: Blob ingestion consumer (Node.js/TypeScript)
**`plugin-server/src/main/ingestion-queues/session-recording-v2/`**

**SessionRecordingIngester** consumes from Kafka and:
1. **Parses** gzipped/JSON messages (`kafka/message-parser.ts`)
2. **Batches** by session via **SessionBatchRecorder** 
3. **Buffers** events in memory per session using **SnappySessionRecorder**:

```ts
    public recordMessage(message: ParsedMessageData): number {
        if
   ...
   133| {
            this.endDateTime = message.eventsRange.end
        }

        for (const [windowId, events] of Object.entries(message.eventsByWindowId)) {
            for (const event of events) {
                const serializedLine = JSON.stringify([windowId, event]) + '\n'
                const chunk = Buffer.from(serializedLine)
                this.uncompressedChunks.push(chunk)

                const eventTimestamp = event.timestamp
                const shouldComputeMetadata = eventPassesMetadataSwitchoverTest(
                    eventTimestamp,
                    this.metadataSwitchoverDate
                )

                if (shouldComputeMetadata) {
                    // Store segmentation event for later use in active time calculation
                    this.segmentationEvents.push(toSegmentationEvent(event))

                    const eventUrl = hrefFrom(event)
                    if (eventUrl) {
                        this.addUrl(eventUrl)
                    }

                    if (isClick(event)) {
                        this.clickCount += 1
                    }

                    if (isKeypress(event)) {
                        this.keypressCount += 1
                    }

                    if (isMouseActivity(event)) {
                        this.mouseActivityCount += 1
                    }

                    this.eventCount++
                    this.size += chunk.length
                }

                rawBytesWritten += chunk.length
            }
        }

        this.messageCount += 1
        return rawBytesWritten
    }
```
   - Accumulates events as newline-delimited JSON: `[windowId, event]\n[windowId, event]\n...`
   - Tracks metadata: click_count, keypress_count, URLs, console logs, active_milliseconds
   - Compresses each session block with Snappy
4. **Flushes** periodically (max 10 seconds buffer age or 100 MB buffer size)

**Persistence** (`sessions/s3-session-batch-writer.ts`):
- Writes to **S3** as multipart uploads
- File structure: `{prefix}/{timestamp}-{suffix}`
- Each batch file contains multiple compressed session blocks
- Uses byte-range URLs: `s3://bucket/key?range=bytes=start-end`
- Retention-aware: writes to different S3 paths based on team retention period

**Metadata** written to ClickHouse via Kafka:
- Produces to **`clickhouse_session_replay_events`** topic
- Table: **`session_replay_events`** (AggregatingMergeTree, sharded)
- Stores: session_id, team_id, distinct_id, timestamps, URLs, counts (clicks/keypresses/console), block locations, retention_period_days
- Old format also used: **`session_recording_events`** (deprecated, contains raw snapshot_data)

## 3. Storage schema

### ClickHouse tables
**`session_replay_events`** (primary, v2):
```
session_id, team_id, distinct_id
min_first_timestamp, max_last_timestamp
block_first_timestamps[], block_last_timestamps[], block_urls[]
first_url, all_urls[]
click_count, keypress_count, mouse_activity_count, active_milliseconds
console_log_count, console_warn_count, console_error_count
size, message_count, event_count
snapshot_source, snapshot_library
retention_period_days
```

**`session_recording_events`** (legacy):
- Stored raw `snapshot_data` directly in ClickHouse
- Deprecated, no usage (maybe except very old, long-lived hobby installs but unlikely and totally unsupported)

### PostgreSQL

PostgreSQL writes happen when:

  1. User pins to playlist → Immediate write
  2. User requests persistence → Immediate write + background LTS copy task
  3. Auto-trigger on save → Background LTS copy task (via post_save signal)
  4. Periodic sweep → Finds recordings 24hrs-90days old without LTS path, queues background tasks

Note: Regular session recordings (not pinned/persisted) do NOT write to PostgreSQL - they only exist in
ClickHouse session_replay_events table until explicitly pinned or persisted as LTS.
  
**`posthog_sessionrecording`** model:
- session_id (unique), team_id
- object_storage_path (for LTS recordings)
- full_recording_v2_path
- Metadata: duration, active_seconds, click_count, start_time, end_time, distinct_id
- Used for persisted/LTS recordings

### S3 object storage
- Main storage: `session_recordings/{team_id}/{session_id}/...`
- Blob ingestion: organized by retention period + timestamp
- Files are byte-addressable compressed session blocks

## 4. Playback/Retrieval

### API Flow (`posthog/session_recordings/session_recording_api.py`)

**GET `/api/projects/:id/session_recordings/:session_id/`**:
1. Loads metadata from ClickHouse `session_replay_events` or Postgres
2. Returns: duration, start_time, person info, viewed status

**GET `/api/projects/:id/session_recordings/:session_id/snapshots`**:
Two-phase fetch:
1. **Phase 1**: Returns available sources: `["blob"]` or `["blob", "realtime"]`
    - note: "realtime" source is no longer used for blob-ingested recordings (possibly used only for Hobby) 
2. **Phase 2**: Client requests `?source=blob`

**Source resolution**:
- **Blob (primary)**: Queries ClickHouse for block metadata
  - Gets S3 URLs with byte ranges for each session block
  - Generates pre-signed URLs (60s expiry)
  - Client fetches compressed blocks directly from S3
- **Legacy**: Recordings were originally stored in ClickHouse `session_recording_events` table (migrated away in 2024)

**Query** (`queries/session_replay_events.py`):
```python
SessionReplayEvents().get_metadata()  # metadata
SessionReplayEvents().get_block_listing()  # S3 blob locations
```

Returns block listing:
```python
[{
  "blob_key": "s3://bucket/path?range=bytes=0-1000",
  "first_timestamp": "...",
  "last_timestamp": "...",
  "first_url": "...",
  "size": 1000
}, ...]
```

### Frontend playback
**`frontend/src/scenes/session-recordings/player/`**

1. **sessionRecordingPlayerLogic** fetches snapshot sources (only blob_v2 now, except for hobby) 
2. For each snapshot source fetches snapshots
3. Decompresses Snappy blocks
4. Parses JSONL: `[windowId, event]` per line
5. Feeds to **rrweb-player** for DOM reconstruction
6. Renders in iframe with timeline controls

**Metadata** (`playerMetaLogic.tsx`):
- Shows person info, properties, events, console logs
- Queries events from `events` table filtered by session_id

## Key optimizations

- **Compression**: Snappy for session blocks
- **Byte-range fetching**: Only fetch needed time ranges from S3
- **Pre-signed URLs**: Direct client→S3 download, no proxying
- **Buffering**: 10 second batches reduce S3 write ops
- **Sharding**: ClickHouse sharded by distinct_id
- **TTL**: Automatic expiry based on retention_period_days
- **Overflow handling**: Separate Kafka topic + limiter for billing control

## Data flow summary

```
Browser (rrweb)
  → POST /s/ with $snapshot events
  → Rust Capture validates & produces to Kafka
  → Node.js Blob Ingestion buffers & compresses
  → Writes to S3 (session blocks) + ClickHouse metadata (via Kafka)
  → Frontend fetches metadata from ClickHouse
  → Frontend fetches blocks from S3 via pre-signed URLs
  → rrweb-player reconstructs & renders
```
