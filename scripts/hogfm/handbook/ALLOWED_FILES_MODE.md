# Allowed files mode for cron jobs

## Overview

The `--allowed-only` mode processes a hardcoded list of allowed handbook files. This is designed for cron jobs where you want to:
- Version control the list of files to process
- Avoid external file dependencies
- Have a predictable, repeatable process
- Automatically generate and upload specific handbook pages

## Usage

```bash
# Basic usage
uv run handbook-audio --allowed-only

# With S3 upload (typical for cron jobs)
uv run handbook-audio --allowed-only --upload-s3

# Dry run to test
uv run handbook-audio --dry-run --allowed-only

# Dry run with S3 upload simulation
uv run handbook-audio --dry-run --upload-s3 --allowed-only
```

## How it works

The allowed files list is **hardcoded** in `generate.py`:

```python
# Allowed files list (relative to HANDBOOK_DIR)
ALLOWED_FILES = [
    # Core values and company docs
    'values.md',
    
    # Engineering docs
    'engineering/ai/ai-platform.md',
    'engineering/ai/architecture.md',
    'engineering/operations/support-hero.md',
    
    # Support docs
    'support/customer-support.md',
    
    # Add more files here as needed
]
```

## Managing the allowed list

### Add files

Edit `scripts/hogfm/handbook/generate.py` and add paths to the `ALLOWED_FILES` list:

```python
ALLOWED_FILES = [
    'values.md',
    'engineering/new-doc.md',  # ← Add new files here
    # ...
]
```

Paths are **relative to `contents/handbook/`**.

### Remove files

Simply remove or comment out lines from the list:

```python
ALLOWED_FILES = [
    'values.md',
    # 'engineering/old-doc.md',  # ← Commented out, won't process
    'engineering/new-doc.md',
]
```

**Important:** When you remove a file from the list and run with `--upload-s3`, the system will automatically delete the corresponding S3 files (mp3, txt, and json) to keep S3 in sync with your allowed list.

### Organize with comments

Use comments to organize the list:

```python
ALLOWED_FILES = [
    # ========================================
    # Core company docs (update weekly)
    # ========================================
    'values.md',
    'strategy.md',
    
    # ========================================
    # Engineering docs (update on changes)
    # ========================================
    'engineering/ai/ai-platform.md',
    'engineering/ai/architecture.md',
    
    # ========================================
    # Support docs (update monthly)
    # ========================================
    'support/customer-support.md',
    'support/troubleshooting-tips.md',
]
```

## S3 cleanup for deleted files

When running with `--upload-s3`, the system automatically cleans up S3 files for handbook pages that have been deleted locally.

### How it works

If a file in `ALLOWED_FILES` doesn't exist locally:
1. **With `--upload-s3`**: Deletes the mp3, txt, and json files from S3
2. **Without `--upload-s3`**: Just warns about the missing file

### Example: File removed from handbook

```bash
$ uv run handbook-audio --allowed-only --upload-s3

Processing allowed files list (10 files)

Found 1 deleted files (will remove from S3):
  - engineering/old-feature.md

🗑️  Deleting S3 files for removed file: engineering/old-feature.md
  🗑️  Deleted 3 file(s) from S3

Found 9 files to process:
  - values.md
  - engineering/ai/ai-platform.md
  ...
```

This keeps your S3 bucket in sync with your current allowed files list!

## Example output

```bash
$ uv run handbook-audio --allowed-only --upload-s3

🎙️  Handbook Audio Generator

☁️  S3 upload enabled: S3 ready

Processing allowed files list (10 files)

Found 10 files to process:

  - values.md
  - engineering/ai/ai-platform.md
  - engineering/ai/architecture.md
  - engineering/operations/support-hero.md
  - support/customer-support.md
  ...

Processing files...

[1/10] values.md
  ✓ Processed 5742 characters
  📝 Saved parsed text (ElevenLabs input) to: public/handbook-audio/values.elevenlabs-input.txt
  🎙️  Generating audio for: Values
  ✓ Generated 5.0 MB audio
  💾 Saved to: public/handbook-audio/values.mp3 (5.44 min)
  💰 Duration: 5.44 min | Credits: 5,439 | Cost: $1.6317
  ☁️  Uploading audio to S3: s3://bucket/handbook/values.mp3
      ✓ Audio uploaded
      ✓ Text file uploaded
      ✓ Cost file uploaded

[2/10] engineering/ai/ai-platform.md
  ...

✨ Done!
   Success: 10
   Skipped (unchanged): 0
   Deleted from S3: 1
   Failed: 0
```

## Setting up a cron job

### Example crontab entry

Generate and upload allowed files every day at 3 AM:

```bash
# Edit crontab
crontab -e

# Add this line:
0 3 * * * cd /path/to/posthog.com/scripts/hogfm && uv run handbook-audio --allowed-only --upload-s3 >> /var/log/handbook-audio.log 2>&1
```

### Example cron with environment variables

```bash
0 3 * * * cd /path/to/posthog.com/scripts/hogfm && \
  ELEVENLABS_API_KEY=your-key \
  ELEVENLABS_VOICE_ID=your-voice-id \
  S3_BUCKET=your-bucket \
  AWS_REGION=us-east-1 \
  uv run handbook-audio --allowed-only --upload-s3 >> /var/log/handbook-audio.log 2>&1
```

### Example with better error handling

```bash
#!/bin/bash
# /usr/local/bin/handbook-audio-cron.sh

set -e

cd /path/to/posthog.com/scripts/hogfm

# Load environment variables
source /path/to/.env

# Run generation with logging
echo "$(date): Starting handbook audio generation..."
uv run handbook-audio --allowed-only --upload-s3

# Check exit code
if [ $? -eq 0 ]; then
  echo "$(date): Success!"
else
  echo "$(date): Failed!"
  exit 1
fi
```

Then in crontab:
```bash
0 3 * * * /usr/local/bin/handbook-audio-cron.sh >> /var/log/handbook-audio.log 2>&1
```

## Error handling

### Missing files

If a file in the allowed list doesn't exist, it's skipped with a warning:

```
⚠️  File not found (skipping): engineering/nonexistent.md
```

The script continues processing other files.

### API failures

If a file fails to generate (API error, quota exceeded, etc.), it's counted as failed but other files continue:

```
[3/10] engineering/large-doc.md
  ❌ Failed after 2 attempts
      Error: quota_exceeded

[4/10] engineering/other-doc.md
  ✓ Generated successfully
  ...
```

At the end:
```
✨ Done!
   Success: 9
   Failed/Skipped: 1
```

### Exit codes

- `0` - Success (all files processed, some may have failed)
- `1` - Critical error (no files to process, invalid arguments, etc.)

## Why hardcoded vs file-based list?

| Aspect | Hardcoded (--allowed-only) | File-based |
|--------|---------------------------|------------|
| **Version control** | ✅ Changes tracked in git | ❌ External file needs tracking |
| **Deployment** | ✅ No extra files to deploy | ❌ Must deploy list file separately |
| **Cron simplicity** | ✅ Single command | ❌ Must specify file path |
| **Code review** | ✅ Changes reviewed with code | ⚠️ May miss file updates |
| **Flexibility** | ⚠️ Requires code change | ✅ Edit file directly |

For **cron jobs and automated processes**, hardcoded is better.  
For **manual/ad-hoc usage**, use `--dir` or `--search` instead.

## Comparison with other modes

| Mode | Use case | Example |
|------|----------|---------|
| `--allowed-only` 🎯 | Cron jobs, automated generation of specific files | `uv run handbook-audio --allowed-only --upload-s3` |
| `--all` | Regenerate everything | `uv run handbook-audio --all` |
| `--dir` | Regenerate a section | `uv run handbook-audio --dir engineering` |
| `--search` | Find files by text | `uv run handbook-audio --search "support"` |
| `<file>` | Single file | `uv run handbook-audio contents/handbook/values.md` |

## Monitoring

### Check last run

```bash
# View last 50 lines of log
tail -50 /var/log/handbook-audio.log

# Check for errors
grep "Failed" /var/log/handbook-audio.log

# Check for successes
grep "Success:" /var/log/handbook-audio.log | tail -5
```

### Cost tracking

After each cron run, check total costs:

```bash
# Local costs
find public/handbook-audio -name "*.cost.json" -exec jq -r '.estimated_cost_usd' {} + | awk '{sum+=$1} END {printf "Total: $%.2f\n", sum}'

# S3 costs (if uploaded)
aws s3 sync s3://your-bucket/handbook/ ./costs --exclude "*" --include "*.cost.json"
find ./costs -name "*.cost.json" -exec jq -r '.estimated_cost_usd' {} + | awk '{sum+=$1} END {printf "Total: $%.2f\n", sum}'
```

### Email notifications

Add to cron script:

```bash
#!/bin/bash
set -e

cd /path/to/posthog.com/scripts/hogfm

# Run generation
OUTPUT=$(uv run handbook-audio --allowed-only --upload-s3 2>&1)

# Email results
echo "$OUTPUT" | mail -s "Handbook Audio Generation Report" admin@example.com
```

## Best practices

### 1. Start small

Begin with a few critical files:

```python
ALLOWED_FILES = [
    'values.md',
    'getting-started.md',
]
```

Test thoroughly before expanding.

### 2. Group by update frequency

Organize files by how often they change:

```python
ALLOWED_FILES = [
    # High priority - update daily
    'values.md',
    'roadmap.md',
    
    # Medium priority - update weekly
    'engineering/operations/support-hero.md',
    
    # Low priority - update monthly
    'handbook-intro.md',
]
```

You could even create separate cron jobs with different schedules.

### 3. Use dry runs in development

Before deploying changes:

```bash
uv run handbook-audio --dry-run --allowed-only
```

Verify all files are found and character counts look reasonable.

### 4. Monitor costs

Set up alerts when costs exceed thresholds:

```bash
# After cron run
TOTAL_COST=$(find public/handbook-audio -name "*.cost.json" -exec jq -r '.estimated_cost_usd' {} + | awk '{sum+=$1} END {print sum}')

if (( $(echo "$TOTAL_COST > 100" | bc -l) )); then
  echo "WARNING: Total cost exceeds $100" | mail -s "Cost Alert" admin@example.com
fi
```

### 5. Version control changes

Always commit changes to `ALLOWED_FILES`:

```bash
git add scripts/hogfm/handbook/generate.py
git commit -m "Add new handbook files to audio generation"
git push
```

## Implementation details

### Code location

The allowed files list is in `scripts/hogfm/handbook/generate.py`:

```python
ALLOWED_FILES = [
    'values.md',
    # ... more files
]
```

### Processing logic

1. Read `ALLOWED_FILES` list
2. Convert relative paths to absolute paths
3. Check each file exists
4. Process existing files in order
5. Apply 1-second rate limiting between files
6. Upload to S3 if `--upload-s3` flag is set

### Rate limiting

To avoid API rate limits, there's a 1-second delay between files (skipped in dry-run mode).

For 100 files: ~100 seconds (~1.7 minutes) + generation time.

## Troubleshooting

### "No valid files found in the allowed list"

**Cause:** All files in `ALLOWED_FILES` don't exist.

**Solution:** Check file paths are correct (relative to `contents/handbook/`).

### Files not updating on S3

**Cause:** S3 upload might be cached.

**Solution:** S3 uploads overwrite existing files. Check S3 bucket versioning settings if needed.

### Cron job not running

**Check:**
```bash
# View cron logs
grep CRON /var/log/syslog

# Test script manually
cd /path/to/posthog.com/scripts/hogfm
uv run handbook-audio --allowed-only
```

### Cost higher than expected

**Check:**
```bash
# List cost files with amounts
find public/handbook-audio -name "*.cost.json" -exec sh -c 'echo "$(jq -r .estimated_cost_usd "$1") - $1"' _ {} \; | sort -rn | head -10
```

Identify which files are most expensive.

## Summary

✅ **Hardcoded list** - Version controlled, no external dependencies  
✅ **Cron-friendly** - Simple command for automation  
✅ **Flexible** - Edit list to add/remove files  
✅ **Safe** - Only processes specified files  
✅ **Monitored** - Clear output for logging and alerts  
✅ **Cost-aware** - Tracks generation costs per file

