# Cost tracking for handbook audio generation

This system now tracks the cost of audio generation per handbook page using the ElevenLabs API.

## How it works

### Character-based cost calculation

ElevenLabs charges based on the number of characters processed. The system:

1. **Counts characters**: Tracks the total character count of text sent to the API (including title)
2. **Captures request IDs**: Extracts `request-id` headers from each API call for tracking and debugging
3. **Tracks chunks**: Records how many API chunks were required for long content
4. **Estimates cost**: Calculates estimated cost based on configurable pricing

### Output files

For each handbook page, the system now generates three files:

- `{slug}.mp3` - The generated audio file
- `{slug}.elevenlabs-input.txt` - The parsed text that was sent to the API
- `{slug}.cost.json` - **NEW**: Cost metrics and tracking data

### Cost metrics file format

Example `engineering/ai/ai-platform.cost.json`:

```json
{
  "character_count": 12567,
  "chunks_count": 3,
  "request_ids": [
    "abc123-request-id-1",
    "def456-request-id-2",
    "ghi789-request-id-3"
  ],
  "estimated_cost_usd": 0.0377,
  "cost_per_1000_chars": 0.30,
  "note": "Update cost_per_1000_chars in audio_saver.py based on your ElevenLabs plan"
}
```

### Fields explained

- **character_count**: Total characters processed (used for billing)
- **chunks_count**: Number of API calls made (for debugging timeouts/rate limits)
- **request_ids**: Array of request IDs from ElevenLabs (for support/debugging)
- **estimated_cost_usd**: Calculated cost in USD
- **cost_per_1000_chars**: Your configured rate (update in `audio_saver.py`)

## Configuration

### Update your pricing

Edit `scripts/hogfm/handbook/audio_saver.py` line 76:

```python
cost_per_1000_chars = 0.30  # Update this based on your ElevenLabs plan
```

### ElevenLabs pricing tiers (as of 2024)

- **Free**: $0 (10,000 chars/month)
- **Starter**: ~$0.30 per 1,000 characters
- **Creator**: ~$0.24 per 1,000 characters  
- **Pro**: ~$0.18 per 1,000 characters
- **Scale**: Custom pricing

Check your current plan at: https://elevenlabs.io/pricing

## Usage

No changes needed - cost tracking is automatic:

```bash
# Single file (outputs .mp3, .txt, and .cost.json)
python scripts/hogfm/handbook/generate.py contents/handbook/values.md

# All files with cost tracking
python scripts/hogfm/handbook/generate.py --all

# Dry run (shows estimated characters/cost)
python scripts/hogfm/handbook/generate.py --dry-run contents/handbook/values.md
```

## Analyzing costs

### Total cost for all pages

```bash
# Sum up all costs
find public/handbook-audio -name "*.cost.json" -exec jq -r '.estimated_cost_usd' {} + | awk '{sum+=$1} END {print sum}'
```

### Most expensive pages

```bash
# List top 10 most expensive pages
find public/handbook-audio -name "*.cost.json" -exec sh -c 'echo "$(jq -r .estimated_cost_usd "$1") $1"' _ {} \; | sort -rn | head -10
```

### Total characters processed

```bash
# Sum all characters
find public/handbook-audio -name "*.cost.json" -exec jq -r '.character_count' {} + | awk '{sum+=$1} END {print sum}'
```

## API response details

### What data does ElevenLabs return?

The ElevenLabs SDK doesn't directly return cost information. Instead, we:

1. **Track character count**: We count characters before sending to API
2. **Capture request-id header**: Using `with_raw_response.convert()` to access response headers
3. **Calculate cost locally**: Based on character count and your plan rate

### Request ID usage

The `request-id` header can be used to:

- Track individual API requests in ElevenLabs dashboard
- Debug issues with ElevenLabs support
- Implement request stitching for voice consistency across chunks

### Code changes

The system now uses `with_raw_response.convert()` instead of plain `convert()`:

```python
# OLD: Just audio data
audio_generator = client.text_to_speech.convert(...)
audio_data = b''.join(audio_generator)

# NEW: Access headers and audio data
with client.text_to_speech.with_raw_response.convert(...) as response:
    request_id = response._response.headers.get("request-id")
    audio_data = b''.join(chunk for chunk in response.data)
```

## Limitations

1. **Estimated costs**: Actual billing may vary based on your specific ElevenLabs plan and any promotional rates
2. **No real-time billing data**: ElevenLabs doesn't provide cost info in API responses
3. **Manual rate updates**: You must manually update `cost_per_1000_chars` when your plan changes

## Troubleshooting

### Cost seems wrong

1. Verify your `cost_per_1000_chars` matches your ElevenLabs plan
2. Check your ElevenLabs dashboard for actual usage
3. Character count includes title and all text sent to API

### Missing request IDs

Request IDs may be empty in dry-run mode or if API calls fail. This doesn't affect cost calculation.

### Want more detailed tracking?

You can extend `cost_metrics` in `elevenlabs_client.py` to include:
- Timestamp of generation
- Model used (eleven_v3, etc.)
- Voice ID
- Audio file size
- Generation duration

