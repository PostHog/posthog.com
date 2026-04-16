# S3 upload enhancement: All files now uploaded

## What changed

The S3 upload feature now uploads **all three files** for each handbook page, not just the audio file.

### Before

Only the `.mp3` audio file was uploaded to S3.

### After ✅

All three files are uploaded:
- `.mp3` - Audio file
- `.elevenlabs-input.txt` - Parsed text sent to ElevenLabs
- `.cost.json` - Cost metrics and tracking data

## Usage

No changes to commands - just use `--upload-s3` as before:

```bash
# Single file (uploads all 3 files)
uv run handbook-audio --upload-s3 contents/handbook/values.md

# Directory (uploads all 3 files for each page)
uv run handbook-audio --upload-s3 --dir engineering/ai

# All files
uv run handbook-audio --upload-s3 --all
```

## Example output

### Dry run

```bash
uv run handbook-audio --dry-run --upload-s3 contents/handbook/values.md

# Output:
☁️  [DRY RUN] Would upload to S3:
    - s3://your-bucket/handbook/values.mp3
    - s3://your-bucket/handbook/values.elevenlabs-input.txt
    - s3://your-bucket/handbook/values.cost.json
```

### Actual upload

```bash
uv run handbook-audio --upload-s3 contents/handbook/values.md

# Output:
☁️  Uploading audio to S3: s3://your-bucket/handbook/values.mp3
    ✓ Audio uploaded
    ✓ Text file uploaded
    ✓ Cost file uploaded
```

## S3 file structure

```
s3://your-bucket/handbook/
├── values.mp3
├── values.elevenlabs-input.txt
├── values.cost.json
├── engineering/
│   ├── ai/
│   │   ├── ai-platform.mp3
│   │   ├── ai-platform.elevenlabs-input.txt
│   │   ├── ai-platform.cost.json
│   │   ├── architecture.mp3
│   │   ├── architecture.elevenlabs-input.txt
│   │   └── architecture.cost.json
│   └── operations/
│       ├── support-hero.mp3
│       ├── support-hero.elevenlabs-input.txt
│       └── support-hero.cost.json
```

## Benefits

### 1. Cost tracking in S3

Cost data is now available alongside the audio files, making it easy to:
- Generate cost reports from S3 data
- Track usage across different sections
- Audit historical costs

```bash
# Download all cost files and calculate total
aws s3 sync s3://your-bucket/handbook/ ./costs --exclude "*" --include "*.cost.json"
find ./costs -name "*.cost.json" -exec jq -r '.estimated_cost_usd' {} + | awk '{sum+=$1} END {print "$" sum}'
```

### 2. Source text availability

The parsed text files allow you to:
- See exactly what was sent to ElevenLabs
- Debug audio generation issues
- Regenerate audio with different settings
- Verify text processing accuracy

### 3. Complete backup

All generation artifacts are backed up to S3, not just the final audio.

## Content types and caching

Each file is uploaded with appropriate metadata:

| File type | Content-Type | Cache-Control |
|-----------|-------------|---------------|
| `.mp3` | `audio/mpeg` | `public, max-age=31536000` (1 year) |
| `.elevenlabs-input.txt` | `text/plain` | `public, max-age=31536000` (1 year) |
| `.cost.json` | `application/json` | `public, max-age=31536000` (1 year) |

All files include metadata:
- `source: handbook-audio-generator`
- `slug: <page-slug>`

## Implementation

### Files modified

1. **`s3_uploader.py`**
   - Updated `upload_to_s3()` to accept `text_file_path` and `cost_file_path` parameters
   - Now uploads all three file types
   - Returns dictionary of URLs for all uploaded files

2. **`generate.py`**
   - Captures file paths from `save_text_file()` and `save_cost_file()`
   - Passes file paths to `upload_to_s3()`

3. **`README.md`**
   - Updated S3 documentation to reflect new behavior

### Backward compatibility

The function signature is backward compatible - the new parameters are optional:

```python
# Old call (still works, only uploads audio)
upload_to_s3(slug, audio_data, dry_run=False)

# New call (uploads all files)
upload_to_s3(slug, audio_data, text_file_path=path1, cost_file_path=path2, dry_run=False)
```

## Testing

Test with dry run to verify files would be uploaded:

```bash
uv run handbook-audio --dry-run --upload-s3 contents/handbook/values.md

# Shows all 3 files that would be uploaded without making actual API calls
```

## Cost implications

### S3 storage costs

For 260 handbook pages, assuming average file sizes:
- Audio: ~8 MB each = ~2 GB
- Text: ~10 KB each = ~2.6 MB
- Cost: ~500 bytes each = ~130 KB

**Total storage: ~2 GB** (negligible difference, dominated by audio files)

### S3 transfer costs

Uploading 3 files instead of 1:
- Audio: ~8 MB
- Text: ~10 KB (0.1% of audio size)
- Cost: ~500 bytes (0.006% of audio size)

**Impact: Minimal** - text and cost files add <0.2% to transfer size.

## Migration

### For existing uploads

If you've already uploaded audio files and want to add text/cost files:

```bash
# Re-run with --upload-s3 to upload missing files
uv run handbook-audio --upload-s3 --all

# Or for specific directory
uv run handbook-audio --upload-s3 --dir engineering
```

The system will upload all three files, overwriting existing audio with fresh copy.

## Accessing uploaded files

### Direct URLs

```
https://your-bucket.s3.region.amazonaws.com/handbook/values.mp3
https://your-bucket.s3.region.amazonaws.com/handbook/values.elevenlabs-input.txt
https://your-bucket.s3.region.amazonaws.com/handbook/values.cost.json
```

### Via AWS CLI

```bash
# Download audio
aws s3 cp s3://your-bucket/handbook/values.mp3 .

# Download text
aws s3 cp s3://your-bucket/handbook/values.elevenlabs-input.txt .

# Download cost data
aws s3 cp s3://your-bucket/handbook/values.cost.json .

# List all files for a page
aws s3 ls s3://your-bucket/handbook/values.
```

### Programmatic access

```python
import boto3
import json

s3 = boto3.client('s3')

# Get cost data for a page
response = s3.get_object(Bucket='your-bucket', Key='handbook/values.cost.json')
cost_data = json.loads(response['Body'].read())

print(f"Duration: {cost_data['audio_duration_minutes']} minutes")
print(f"Cost: ${cost_data['estimated_cost_usd']}")
```

## Summary

✅ **Three files uploaded** per handbook page  
✅ **No command changes** - works with existing workflow  
✅ **Complete artifacts** - audio, text, and cost data  
✅ **Minimal overhead** - text/cost files add <0.2% to upload size  
✅ **Better tracking** - cost data available in S3  
✅ **Source preserved** - parsed text stored for reference

