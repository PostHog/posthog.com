# Change detection for cost savings

## Overview

The handbook audio generation system now includes automatic change detection to avoid regenerating audio when content hasn't changed. This saves significant costs on daily cron runs.

## How it works

When running with `--upload-s3` flag enabled, the system:

1. **Parses the markdown** file to generate the text that would be sent to ElevenLabs
2. **Downloads the existing text** from S3 (`.elevenlabs-input.txt` file)
3. **Compares the texts** character-by-character
4. **Skips generation** if content is identical
5. **Generates and uploads** if content has changed or file doesn't exist

## Usage

### Enable change detection

Simply use the `--upload-s3` flag (change detection is automatic):

```bash
# Change detection enabled automatically
uv run handbook-audio --allowed-only --upload-s3
```

### Without change detection

If you don't use `--upload-s3`, files are always generated (no S3 comparison):

```bash
# Always generates, no change detection
uv run handbook-audio --allowed-only
```

## Example outputs

### First generation (no existing file in S3)

```bash
$ uv run handbook-audio --allowed-only --upload-s3

[1/10] values.md
Processing: contents/handbook/values.md
  ✓ Processed 5742 characters
  🆕 First generation (no existing file in S3)
  📝 Saved parsed text to: public/handbook-audio/values.elevenlabs-input.txt
  🎙️  Generating audio for: Values
  ✓ Generated 5.0 MB audio
  💾 Saved to: public/handbook-audio/values.mp3 (5.44 min)
  💰 Duration: 5.44 min | Credits: 5,439 | Cost: $1.6317
  ☁️  Uploading audio to S3...
      ✓ Audio uploaded
      ✓ Text file uploaded
      ✓ Cost file uploaded
```

### Content unchanged (skip generation)

```bash
$ uv run handbook-audio --allowed-only --upload-s3

[1/10] values.md
Processing: contents/handbook/values.md
  ✓ Processed 5742 characters
  ⏭️  Content unchanged, skipping generation
```

**Result:** No audio generation, no API call, no upload, no cost!

### Content changed (regenerate)

```bash
$ uv run handbook-audio --allowed-only --upload-s3

[1/10] values.md
Processing: contents/handbook/values.md
  ✓ Processed 5742 characters
  🔄 Content changed, regenerating audio
  📝 Saved parsed text to: public/handbook-audio/values.elevenlabs-input.txt
  🎙️  Generating audio for: Values
  ✓ Generated 5.0 MB audio
  ...
```

## Final summary

At the end of processing, you'll see three counters:

```
✨ Done!
   Success: 7
   Skipped (unchanged): 2
   Failed: 1
```

- **Success**: Files that were generated and uploaded
- **Skipped (unchanged)**: Files with no content changes (saved cost!)
- **Failed**: Files that encountered errors

## Cost savings

### Example scenario

Daily cron job processing 10 allowed files:
- Average cost per file: $2.00
- Files that change daily: 2
- Files unchanged: 8

**Without change detection:**
- Daily cost: 10 × $2.00 = $20.00
- Monthly cost: $600.00

**With change detection:**
- Daily cost: 2 × $2.00 = $4.00
- Monthly cost: $120.00
- **Savings: $480/month (80% reduction)**

## How comparison works

### Text comparison

The system compares the **exact parsed text** that would be sent to ElevenLabs:

```
Title.

Parsed content with SSML breaks and cleaned markdown...
```

Even minor changes trigger regeneration:
- ✅ Changed wording
- ✅ Added/removed paragraphs
- ✅ Changed formatting (becomes different parsed text)
- ✅ Updated SSML breaks
- ❌ Only frontmatter changed (not included in parsed text)
- ❌ Code examples changed (might not be parsed)

### S3 as source of truth

The comparison uses S3 as the source of truth because:
- GitHub Actions runners are ephemeral (no local state)
- S3 stores the last successfully generated version
- Multiple runners can use the same source of truth

## Dry-run behavior

In dry-run mode, change detection is simulated:

```bash
$ uv run handbook-audio --dry-run --upload-s3 --allowed-only

[1/10] values.md
  🔍 [DRY RUN] Would check S3 for existing text: s3://bucket/handbook/values.elevenlabs-input.txt
  🆕 First generation (no existing file in S3)
  📝 [DRY RUN] Would save parsed text...
```

**Note:** Dry-run always assumes "first generation" (no existing file) to avoid actual S3 calls.

## Cron job setup

### Recommended cron command

```bash
0 3 * * * cd /path/to/posthog.com/scripts/hogfm && \
  uv run handbook-audio --allowed-only --upload-s3 >> /var/log/handbook-audio.log 2>&1
```

### Expected behavior

**Day 1 (initial run):**
- All 10 files: First generation
- All 10 files uploaded to S3
- Cost: Full generation cost

**Day 2 (no changes):**
- All 10 files: Skipped (unchanged)
- No API calls, no uploads
- Cost: $0.00

**Day 3 (2 files changed):**
- 2 files: Regenerated and uploaded
- 8 files: Skipped (unchanged)
- Cost: 2 files worth

## Technical details

### Implementation

**File:** `s3_uploader.py`
```python
def download_text_from_s3(slug, dry_run=False):
    """
    Download the elevenlabs-input.txt file from S3 for comparison
    
    Returns:
        str: Text content if file exists
        None: If file doesn't exist (first generation)
    """
```

**File:** `generate.py`
```python
def process_single_file(file_path, dry_run=False, upload_s3=False):
    # Parse markdown
    content = process_markdown_file(...)
    full_text = f'{content["title"]}.\n\n{content["text"]}'
    
    # Check S3 if upload enabled
    if upload_s3:
        existing_text = download_text_from_s3(slug, dry_run)
        if existing_text is not None and existing_text == full_text:
            print('⏭️  Content unchanged, skipping generation')
            return 'skipped'
    
    # Continue with generation...
```

### Return values

`process_single_file()` now returns three possible values:
- `True` - Successfully generated and processed
- `False` - Failed (error occurred)
- `'skipped'` - Skipped (content unchanged)

All calling code has been updated to handle these three states.

## Limitations

### What triggers regeneration

Even trivial changes trigger regeneration because we compare the full parsed text:
- Typo fixes
- Punctuation changes  
- Whitespace changes in content
- SSML break timing changes

This is intentional - we want the audio to reflect the current content exactly.

### What doesn't trigger regeneration

Changes that don't affect the parsed text sent to ElevenLabs:
- Frontmatter changes (title, date, etc.)
- Comments in markdown
- Some MDX components that are stripped during parsing

### No partial updates

If a file has changed, the entire audio is regenerated. There's no "partial update" mechanism.

## Error handling

### S3 download fails

If S3 download fails (network error, permissions, etc.):
- Warning is logged
- Assumes first generation
- Proceeds with generation

This ensures the cron job doesn't fail silently.

### Comparison fails

If text comparison encounters an error:
- Assumes content changed
- Proceeds with generation

This is the safe default - better to regenerate unnecessarily than skip needed updates.

## Monitoring

### Check skipped files

```bash
# View log for skipped files
grep "Skipped (unchanged)" /var/log/handbook-audio.log

# Count skips
grep "Content unchanged" /var/log/handbook-audio.log | wc -l
```

### Verify cost savings

```bash
# Check S3 for most recent uploads (files that changed)
aws s3 ls s3://your-bucket/handbook/ --recursive | grep "$(date +%Y-%m-%d)"

# If only 2 files uploaded today, change detection worked!
```

## Best practices

### 1. Always use with --upload-s3

Change detection only works with S3 upload enabled:

```bash
# ✅ Good - change detection enabled
uv run handbook-audio --allowed-only --upload-s3

# ❌ Bad - always regenerates
uv run handbook-audio --allowed-only
```

### 2. Use --allowed-only for cron

The `--allowed-only` mode is designed for cron jobs with change detection:

```bash
# ✅ Perfect for cron
uv run handbook-audio --allowed-only --upload-s3
```

### 3. Monitor skip rate

Track how many files are skipped to verify change detection is working:

```bash
# Add to cron script
SKIPPED=$(grep -c "Content unchanged" $LOG_FILE)
echo "Skipped $SKIPPED files (change detection working!)"
```

### 4. First run expectations

The first run will always generate all files (no existing S3 files to compare).

## Troubleshooting

### "Always regenerating even though content hasn't changed"

**Possible causes:**
1. Not using `--upload-s3` flag
2. S3 download failing (check logs for warnings)
3. Text parsing changed (different output from `process_markdown_file`)
4. Frontmatter or whitespace differences

**Debug:**
```bash
# Download current S3 text
aws s3 cp s3://bucket/handbook/values.elevenlabs-input.txt local-old.txt

# Generate new text locally (dry-run)
uv run handbook-audio --dry-run contents/handbook/values.md

# Compare
diff local-old.txt public/handbook-audio/values.elevenlabs-input.txt
```

### "Not detecting changes when content did change"

This should never happen due to the exact string comparison. If it does:
1. Check S3 file was uploaded correctly
2. Verify `download_text_from_s3()` is returning the right content
3. Check logs for any errors

### "Too many S3 download calls"

Each file checked = 1 S3 GET request. For 10 files:
- 10 GET requests (minimal cost, ~$0.0004)
- Compare to regenerating all 10 files (~$20)

The S3 costs are negligible compared to the audio generation savings.

## Future enhancements

Possible improvements (not currently implemented):

1. **Force flag**: `--force` to bypass change detection
2. **Hash-based comparison**: Store content hash instead of full text
3. **Partial updates**: Only regenerate changed sections
4. **Local cache**: Cache S3 downloads for the session
5. **Change report**: Detailed diff of what changed

## Summary

Change detection is:
- ✅ Automatic when using `--upload-s3`
- ✅ Significant cost savings (up to 80%+)
- ✅ Safe (defaults to regenerating on any doubt)
- ✅ Transparent (clear logging of skip decisions)
- ✅ Designed for daily cron jobs

**Result:** Run your cron job daily without worrying about costs - only files with actual content changes will be regenerated!

