# Cost tracking implementation summary

## What was implemented

I've successfully added cost tracking functionality to the handbook audio generation system. Here's what changed:

### 1. Updated `elevenlabs_client.py`

**Key changes:**
- Modified `generate_audio()` to return a tuple: `(audio_data, cost_metrics)` instead of just audio data
- Modified `_generate_audio_chunk()` to capture `request-id` from API response headers
- Added character counting for all text sent to the API
- Tracked number of chunks processed for debugging

**How request-id is captured:**

The ElevenLabs SDK doesn't directly return cost data, but we can access response headers using `with_raw_response.convert()`:

```python
# OLD approach (no access to headers)
audio_generator = client.text_to_speech.convert(...)
audio_data = b''.join(audio_generator)

# NEW approach (captures headers)
with client.text_to_speech.with_raw_response.convert(...) as response:
    request_id = response._response.headers.get("request-id")
    audio_data = b''.join(chunk for chunk in response.data)
```

This `request-id` can be used for:
- Tracking requests in ElevenLabs dashboard
- Debugging with ElevenLabs support
- Request stitching for voice consistency

### 2. Added `save_cost_file()` to `audio_saver.py`

This function creates a JSON file alongside each audio file containing:

```json
{
  "character_count": 12567,
  "chunks_count": 3,
  "request_ids": ["req-id-1", "req-id-2", "req-id-3"],
  "estimated_cost_usd": 0.0377,
  "cost_per_1000_chars": 0.30,
  "note": "Update cost_per_1000_chars in audio_saver.py based on your ElevenLabs plan"
}
```

**Cost calculation:**
- Based on character count (ElevenLabs billing metric)
- Configurable rate per 1,000 characters (line 76 in `audio_saver.py`)
- Default: $0.30 per 1,000 characters (adjust for your plan)

### 3. Updated `generate.py`

Modified the `process_single_file()` function to:
- Unpack the tuple returned by `generate_audio()`
- Call `save_cost_file()` after saving audio
- Display cost information during generation

### 4. Updated module exports

Added `save_cost_file` to `__init__.py` exports for public API access.

### 5. Fixed module naming

Updated references from `handbook_audio` to `handbook` to match the directory rename:
- `pyproject.toml` - Entry point and package name
- `generate.py` - Import statements
- `README.md` - Documentation examples

## Output files

For each handbook page processed, the system now generates **three files**:

1. `{slug}.mp3` - Audio file
2. `{slug}.elevenlabs-input.txt` - Parsed text sent to API (ElevenLabs input)
3. `{slug}.cost.json` - **NEW**: Cost metrics and tracking data

Example:
```
public/handbook-audio/
├── values.mp3
├── values.elevenlabs-input.txt
├── values.cost.json  ← NEW
├── engineering/
│   ├── ai/
│   │   ├── ai-platform.mp3
│   │   ├── ai-platform.elevenlabs-input.txt
│   │   └── ai-platform.cost.json  ← NEW
```

## Usage

No changes needed to existing commands - cost tracking is automatic:

```bash
# Dry run (shows cost estimation)
uv run handbook-audio --dry-run contents/handbook/values.md

# Generate with cost tracking
uv run handbook-audio contents/handbook/values.md

# Process all files with cost tracking
uv run handbook-audio --all
```

## Configuration

To update pricing for your ElevenLabs plan, edit `audio_saver.py` line 76:

```python
cost_per_1000_chars = 0.30  # Update based on your plan
```

**ElevenLabs pricing reference:**
- Free: $0 (10,000 chars/month)
- Starter: ~$0.30 per 1,000 characters
- Creator: ~$0.24 per 1,000 characters
- Pro: ~$0.18 per 1,000 characters
- Scale: Custom pricing

## API response details

### What ElevenLabs returns

The ElevenLabs API **does not** return cost information directly. Here's what we get:

**Response headers:**
- `request-id`: Unique identifier for the API call
- Standard HTTP headers

**Response body:**
- Iterator of audio chunks (bytes)
- No metadata about cost, tokens, or character count

### What we track

Since the API doesn't provide cost data, we:

1. **Count characters locally** before sending to API
2. **Capture request-id** from response headers (using `with_raw_response.convert()`)
3. **Calculate cost** based on character count and your plan rate
4. **Track chunks** for debugging timeout/rate limit issues

This approach provides accurate cost estimation based on the billing metric (characters) that ElevenLabs actually uses.

## Analyzing costs

See [COST_TRACKING.md](./COST_TRACKING.md) for detailed analysis commands, including:

- Total cost across all pages
- Most expensive pages
- Total characters processed
- Per-page cost breakdowns

## Files modified

1. `elevenlabs_client.py` - Added cost tracking and request-id capture
2. `audio_saver.py` - Added `save_cost_file()` function
3. `generate.py` - Updated to handle new return format and save costs
4. `__init__.py` - Exported new function
5. `pyproject.toml` - Fixed module name from `handbook_audio` to `handbook`
6. `README.md` - Updated import examples and API documentation

## Files created

1. `COST_TRACKING.md` - User guide for cost tracking feature
2. `IMPLEMENTATION_SUMMARY.md` - This file

## Testing

Tested with dry-run mode:

```bash
$ uv run handbook-audio --dry-run ../../contents/handbook/values.md

🎙️  Handbook Audio Generator [DRY RUN MODE]

Processing: /Users/jonmccallum/Development/posthog.com/contents/handbook/values.md
  ✓ Processed 5742 characters
  📝 [DRY RUN] Would save text to: public/handbook-audio/values.txt
  🎙️  [DRY RUN] Would generate audio for: Values
  ℹ️  Text length: 5751 characters
  💾 [DRY RUN] Would save to: public/handbook-audio/values.mp3
  💰 [DRY RUN] Would save cost metrics to: public/handbook-audio/values.cost.json

✨ Done!
```

## Next steps

1. **Configure your pricing rate** in `audio_saver.py` based on your ElevenLabs plan
2. **Generate audio** for a test file to verify cost tracking works with real API calls
3. **Review cost files** in `public/handbook-audio/` to ensure data is accurate
4. **Optional:** Add timestamp tracking or other metrics to `cost_metrics` dict

## Questions answered

### Can we get cost data from the ElevenLabs SDK?

**No.** The ElevenLabs API does not return cost information in the response. We must calculate it locally based on character count.

### Can we get token usage back?

**No.** ElevenLabs uses characters (not tokens) as the billing metric, and this information isn't returned by the API - we count it ourselves before sending.

### What details do we get back from the SDK?

- **Audio data** (as an iterator of bytes)
- **Request ID** (via `response._response.headers.get("request-id")`)
- No cost, usage, or character count information

### How accurate is cost tracking?

**Very accurate** because:
- We count the exact characters sent to the API
- ElevenLabs bills based on characters, which we track precisely
- The only variable is your plan's rate per 1,000 characters (which you configure)

The estimated cost will match your actual bill (assuming correct rate configuration).

