# Quick start: Cost tracking

## What you asked for

✅ Track cost of audio generation per handbook page  
✅ Output cost metric file alongside audio and text files  
✅ Research what data ElevenLabs SDK returns  
✅ Capture request IDs and usage information

## What's new

### Three files per page (instead of two)

```
public/handbook-audio/
├── values.mp3              # Audio file
├── values.txt              # Parsed text
└── values.cost.json        # ← NEW: Cost metrics
```

### Cost file format

```json
{
  "character_count": 5751,
  "chunks_count": 1,
  "request_ids": ["abc123-request-id"],
  "estimated_cost_usd": 0.0173,
  "cost_per_1000_chars": 0.30,
  "note": "Update cost_per_1000_chars in audio_saver.py based on your ElevenLabs plan"
}
```

## Quick start

### 1. Configure your pricing (one time)

Edit `scripts/hogfm/handbook/audio_saver.py` line 76:

```python
cost_per_1000_chars = 0.30  # ← Change to match your ElevenLabs plan
```

**ElevenLabs pricing:**
- Free: $0 (10K chars/month)
- Starter: $0.30 per 1K chars
- Creator: $0.24 per 1K chars
- Pro: $0.18 per 1K chars

### 2. Generate audio (automatic cost tracking)

```bash
# Single file
uv run handbook-audio contents/handbook/values.mdx

# All files
uv run handbook-audio --all

# Test without API calls
uv run handbook-audio --dry-run contents/handbook/values.mdx
```

### 3. View cost metrics

```bash
# Example: values.cost.json
cat public/handbook-audio/values.cost.json
```

## Analyze costs

### Total cost for all generated audio

```bash
find public/handbook-audio -name "*.cost.json" -exec jq -r '.estimated_cost_usd' {} + | awk '{sum+=$1} END {print "$" sum}'
```

### Top 10 most expensive pages

```bash
find public/handbook-audio -name "*.cost.json" -exec sh -c 'echo "$(jq -r .estimated_cost_usd "$1") $1"' _ {} \; | sort -rn | head -10
```

### Total characters processed

```bash
find public/handbook-audio -name "*.cost.json" -exec jq -r '.character_count' {} + | awk '{sum+=$1} END {printf "%'"'"'d characters\n", sum}'
```

## What ElevenLabs returns (answer to your question)

### Response data available

The ElevenLabs SDK returns:

✅ **Audio data** (bytes)  
✅ **Request ID** (via `response._response.headers.get("request-id")`)  
❌ **No cost information**  
❌ **No token/character usage data**  
❌ **No metadata about billing**

### How we track costs

Since ElevenLabs doesn't return cost data, we:

1. **Count characters** before sending to API (exact billing metric)
2. **Capture request-id** from response headers (for debugging)
3. **Calculate cost** based on character count × your plan rate
4. **Track chunks** to help debug timeouts

This gives you **accurate cost estimates** because we count the exact characters that ElevenLabs bills for.

### Code changes made

**Before:**
```python
audio_generator = client.text_to_speech.convert(...)
audio_data = b''.join(audio_generator)
```

**After (captures request-id):**
```python
with client.text_to_speech.with_raw_response.convert(...) as response:
    request_id = response._response.headers.get("request-id")
    audio_data = b''.join(chunk for chunk in response.data)
```

## Files created/modified

**Modified:**
- `elevenlabs_client.py` - Returns cost metrics with audio data
- `audio_saver.py` - Added `save_cost_file()` function
- `generate.py` - Saves cost files automatically
- `__init__.py` - Exports new function
- `pyproject.toml` - Fixed module name
- `README.md` - Updated examples

**New documentation:**
- `COST_TRACKING.md` - Complete guide
- `IMPLEMENTATION_SUMMARY.md` - Technical details
- `QUICK_START_COST_TRACKING.md` - This file

**Example output:**
- `public/handbook-audio/EXAMPLE.cost.json` - Sample cost file

## Test it

```bash
# Dry run (no API calls)
cd scripts/hogfm
uv run handbook-audio --dry-run ../../contents/handbook/values.mdx

# Output shows:
# 💰 [DRY RUN] Would save cost metrics to: public/handbook-audio/values.cost.json
```

## Need more details?

- **User guide:** See `COST_TRACKING.md`
- **Technical details:** See `IMPLEMENTATION_SUMMARY.md`
- **Module usage:** See `README.md`

## That's it!

Cost tracking is now automatic. Every time you generate audio, you'll get a `.cost.json` file with detailed cost information.

**Key benefit:** Know exactly what your audio generation costs before you get your ElevenLabs bill! 💰

