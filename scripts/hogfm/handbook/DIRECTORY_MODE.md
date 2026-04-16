# Directory mode for handbook audio generation

## New feature: Generate audio for entire directories

You can now generate audio for all files in a specific directory using the `--dir` flag.

## Usage

### Basic syntax

```bash
uv run handbook-audio --dir <directory-path>
```

The directory path is **relative to `contents/handbook/`**.

## Examples

### Single directory

```bash
# Generate all files in engineering/ai/
uv run handbook-audio --dir engineering/ai

# Output:
# Found 5 files in engineering/ai:
#   - engineering/ai/ai-platform.md
#   - engineering/ai/architecture.md
#   - engineering/ai/implementation.md
#   - engineering/ai/products.md
#   - engineering/ai/team-structure.md
```

### Nested subdirectory

```bash
# Generate all files in engineering/operations/
uv run handbook-audio --dir engineering/operations

# Found 4 files in engineering/operations:
#   - engineering/operations/incidents.md
#   - engineering/operations/on-call-rotation.md
#   - engineering/operations/post-mortems.md
#   - engineering/operations/support-hero.md
```

### Top-level directory (includes all subdirectories)

```bash
# Generate ALL files under engineering/ (recursive)
uv run handbook-audio --dir engineering

# Found 71 files in engineering:
#   - engineering/ai/ai-platform.md
#   - engineering/ai/architecture.md
#   - engineering/clickhouse/clusters.mdx
#   - engineering/operations/incidents.md
#   - engineering/posthog-com/api-docs.md
#   ... (all subdirectories included)
```

## Combine with flags

### Dry run

Test without making API calls:

```bash
uv run handbook-audio --dry-run --dir engineering/ai
```

### Upload to S3

Generate and upload:

```bash
uv run handbook-audio --upload-s3 --dir engineering/operations
```

### Both

```bash
uv run handbook-audio --dry-run --upload-s3 --dir engineering
```

## Comparison: All modes

| Mode | Command | Description |
|------|---------|-------------|
| **Single file** | `uv run handbook-audio contents/handbook/values.md` | Generate one specific file |
| **Directory** 🆕 | `uv run handbook-audio --dir engineering/ai` | Generate all files in a directory |
| **Search** | `uv run handbook-audio --search "engineering"` | Generate files matching text pattern |
| **All** | `uv run handbook-audio --all` | Generate ALL handbook files |

## When to use each mode

### Use `--dir` when:
- ✅ You want to generate a specific section (e.g., all engineering docs)
- ✅ You want to regenerate a specific subdirectory
- ✅ You're working on content in one area and want to update just that section
- ✅ You want more control than `--all` but more targeted than `--search`

### Use `--search` when:
- ✅ Files are scattered across different directories
- ✅ You want files matching a keyword (e.g., "support" finds support-hero.md, customer-support.md, etc.)
- ✅ Text-based matching across the entire handbook

### Use `--all` when:
- ✅ You want to regenerate everything
- ✅ Initial bulk generation
- ✅ You've changed the audio generation settings

### Use single file when:
- ✅ Testing
- ✅ Updating one specific page
- ✅ Debugging

## Examples by use case

### Regenerate all engineering handbook audio

```bash
uv run handbook-audio --dir engineering
```

**Result:** 71 files processed

### Generate all AI team docs

```bash
uv run handbook-audio --dir engineering/ai
```

**Result:** 5 files processed

### Generate all support-related docs (scattered)

```bash
uv run handbook-audio --search support
```

**Result:** Finds support files across multiple directories

### Test a specific section without API costs

```bash
uv run handbook-audio --dry-run --dir engineering/operations
```

**Result:** Shows what would be generated, no API calls

## Features

### Recursive by default

`--dir` automatically includes all subdirectories:

```bash
uv run handbook-audio --dir engineering
```

Processes:
- `engineering/*.md`
- `engineering/ai/*.md`
- `engineering/operations/*.md`
- `engineering/clickhouse/*.mdx`
- `engineering/clickhouse/schema/*.mdx`
- etc.

### Excludes special directories

Automatically skips:
- `_snippets/` - Code snippet files
- `_includes/` - Included content fragments

### Rate limiting

Includes automatic 1-second delay between files (can be disabled with `--dry-run`).

### Progress tracking

Shows progress for each file:

```
[1/5] engineering/ai/ai-platform.md
  ✓ Processed 8466 characters
  📝 Saved text to: public/handbook-audio/engineering/ai/ai-platform.txt
  🎙️  Generating audio...
  💾 Saved to: public/handbook-audio/engineering/ai/ai-platform.mp3 (9.90 min)
  💰 Duration: 9.90 min | Credits: 9,902 | Cost: $2.9707

[2/5] engineering/ai/architecture.md
...
```

## Error handling

### Directory not found

```bash
uv run handbook-audio --dir nonexistent

# Output:
# ❌ No files found in "nonexistent"
#    Make sure the directory exists under contents/handbook/
```

### Empty directory

```bash
uv run handbook-audio --dir empty-folder

# Output:
# ❌ No files found in "empty-folder"
```

### Partial failures

If some files fail (e.g., API errors), the script continues:

```
✨ Done!
   Success: 68
   Failed/Skipped: 3
```

## Cost estimation

Before running on large directories, use `--dry-run` to estimate:

```bash
uv run handbook-audio --dry-run --dir engineering

# Shows character counts for all 71 files
# Estimate: ~71 files × ~5 min avg = ~355 minutes
# Cost estimate: 355 min × $0.30/min = $106.50
```

## Implementation

The feature adds:

1. **New function:** `find_handbook_files_in_directory()` in `file_selector.py`
2. **New CLI flag:** `--dir <directory>` in `generate.py`
3. **Recursive search:** Uses `rglob()` to find all `.md` and `.mdx` files

## Related documentation

- [README.md](./README.md) - Main documentation
- [COST_TRACKING.md](./COST_TRACKING.md) - Cost analysis
- [COST_CALCULATION_UPDATE.md](./COST_CALCULATION_UPDATE.md) - Duration-based costs
- [QUICKSTART.md](./QUICKSTART.md) - Getting started guide

