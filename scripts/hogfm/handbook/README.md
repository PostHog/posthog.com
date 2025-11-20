# Handbook audio generation (modular)

This module (part of the `hogfm` project) generates audio narration of handbook pages using ElevenLabs.

## Quick setup

```bash
# Navigate to the hogfm project
cd scripts/hogfm

# Install dependencies with uv
uv sync

# Set your API key in .env file at repo root
# See .env template below

# Test with a dry run
uv run handbook-audio --dry-run contents/handbook/values.md

# Generate audio
uv run handbook-audio contents/handbook/values.md
```

## Environment setup

Create a `.env` file in the hogfm directory (`scripts/hogfm/.env`):

```bash
# ElevenLabs Configuration (Required for audio generation)
ELEVENLABS_API_KEY=your-api-key-here
ELEVENLABS_VOICE_ID=your-voice-id-here

# S3 Configuration (Required only if using --upload-s3)
S3_BUCKET=your-bucket-name
AWS_REGION=your-aws-region
```

## Key features

### 🎯 MDX component handling

The processor intelligently handles MDX/JSX components in handbook files:

- **Component descriptions**: Custom components like `<ProductScreenshot>`, `<CalloutBox>`, `<ProductVideo>`, etc. are replaced with spoken descriptions that include their attributes (e.g., alt text, captions)
- **Code block awareness**: Components shown as examples in code blocks are not narrated—only actual components in the content
- **Image narration**: Markdown images are described using their alt text
- **Tabs and interactive elements**: Complex components like `<Tab.Group>` and `<ProductComparisonTable>` are described with their key properties

### 📦 Automatic chunking for long content

ElevenLabs has a 10,000 character limit per request. The script automatically:

- Splits long content into chunks at natural boundaries (paragraphs, sentences)
- Generates audio for each chunk separately
- Concatenates the audio seamlessly
- Shows progress for each chunk during generation

This means you can generate audio for any handbook page, regardless of length!

### 🧪 Testing with component-heavy files

The best file to test with is `contents/handbook/engineering/posthog-com/markdown.mdx` which contains ~91 custom components and is long enough to trigger chunking:

```bash
# Dry run to see text processing without API calls
uv run handbook-audio --dry-run contents/handbook/engineering/posthog-com/markdown.mdx

# Generate actual audio (requires API key)
uv run handbook-audio contents/handbook/engineering/posthog-com/markdown.mdx
```

This file exercises nearly every component type and edge case in the processor.

## Structure

```
handbook-audio/
├── __init__.py                    # Package init
├── markdown_processor.py          # Convert markdown/MDX to speech text
├── file_selector.py               # Find and select handbook files
├── elevenlabs_client.py           # ElevenLabs API client with chunking
├── audio_saver.py                 # Save audio files to disk
├── generate.py                    # Main generation script
├── QUICKSTART.md                  # Quick start guide
└── README.md                      # This file
```

## Full generation

### Single file

```bash
# Dry run (no API call)
uv run handbook-audio --dry-run contents/handbook/values.md

# Generate audio
uv run handbook-audio contents/handbook/values.md
```

### Directory mode 🆕

Generate all files in a specific directory (recursive):

```bash
# Generate all files in engineering/ai/
uv run handbook-audio --dir engineering/ai

# Generate all engineering docs (includes subdirectories)
uv run handbook-audio --dir engineering

# Test without API calls
uv run handbook-audio --dry-run --dir engineering/operations
```

See [DIRECTORY_MODE.md](./DIRECTORY_MODE.md) for details.

### Search and generate

```bash
# Find and generate all files matching a pattern
uv run handbook-audio --search "engineering"
uv run handbook-audio --search "people"
```

### All files

```bash
# Generate audio for all 260 handbook files
uv run handbook-audio --all
```

### Allowed files only (for cron jobs) 🆕

Process a hardcoded list of allowed files - perfect for automated cron jobs:

```bash
# Process only files in the allowed list
uv run handbook-audio --allowed-only

# With S3 upload (typical for cron jobs)
uv run handbook-audio --allowed-only --upload-s3

# Dry run
uv run handbook-audio --dry-run --allowed-only
```

The list is hardcoded in `generate.py` under `ALLOWED_FILES`. Edit the list to add/remove files. See [ALLOWED_FILES_MODE.md](./ALLOWED_FILES_MODE.md) for details on setting up cron jobs.

## How it works

### Markdown/MDX processing pipeline

1. **Strip frontmatter** - Remove YAML metadata
2. **Remove code blocks** - Replace with "Here is a [language] code example" (prevents narrating component examples)
3. **Describe components** - Replace MDX components with spoken descriptions:
   - `<ProductScreenshot alt="..." />` → "Product screenshot: [alt text]"
   - `<CalloutBox title="..." />` → Extracts and narrates the content inside
   - `<ProductComparisonTable competitors={[...]} />` → "Product comparison table highlighting competitors X, Y"
   - `<OSQuote customer="..." author="..." />` → "Customer quote from [author] at [customer]"
4. **Clean markdown** - Remove links, bold/italic markers, list bullets
5. **Add SSML breaks** - Insert pauses at headings for natural pacing
6. **Return speech-ready text** - Plain text optimized for TTS

### Audio generation with chunking

1. **Check length** - If content exceeds 9,500 characters, split into chunks
2. **Smart splitting** - Break at paragraph boundaries, then sentences, then spaces
3. **Generate per chunk** - Make separate API calls for each chunk with retry logic
4. **Concatenate audio** - Combine MP3 data seamlessly
5. **Save to disk** - Write final audio file maintaining directory structure

## Module API reference

### `markdown_processor.py`

Converts Markdown/MDX files to speech-friendly text.

```python
from handbook.markdown_processor import process_markdown_file

result = process_markdown_file(
    file_path="/path/to/file.md",
    handbook_dir="/path/to/handbook"
)
# Returns: {'title': str, 'slug': str, 'text': str} or None
```

**Component handling:**
- Recognizes 15+ MDX components (ProductScreenshot, CalloutBox, Tab, etc.)
- Extracts alt text, captions, and other attributes for narration
- Skips components inside code blocks (examples only)

### `file_selector.py`

```python
from handbook.file_selector import (
    find_all_handbook_files,
    find_handbook_file_by_pattern,
    get_handbook_file_info
)

# Find all files
files = find_all_handbook_files(handbook_dir)

# Search by pattern
matches = find_handbook_file_by_pattern(handbook_dir, "values")

# Get info
info = get_handbook_file_info(handbook_dir)
```

### `elevenlabs_client.py`

ElevenLabs API client with automatic chunking for long content.

```python
from handbook.elevenlabs_client import (
    generate_audio,
    check_api_available,
    get_voice_info
)

# Check if API is ready
available, message = check_api_available()

# Generate audio (automatically chunks if needed)
content = {'title': 'My Page', 'text': 'Some text...'}
audio_data, cost_metrics = generate_audio(content, dry_run=False)
```

**Chunking behavior:**
- Automatically splits text over 9,500 characters
- Splits at paragraph breaks, then sentences, then spaces
- Makes separate API calls per chunk with retry logic
- Concatenates MP3 audio seamlessly
- Shows progress: "Chunk 1/3: 8,234 chars"

### `audio_saver.py`

```python
from handbook.audio_saver import (
    save_audio_file,
    save_cost_file,
    audio_file_exists
)

# Save audio
save_audio_file(
    slug="engineering/operations/on-call",
    audio_data=b"...",
    output_dir=Path("public/handbook-audio"),
    dry_run=False
)

# Save cost metrics
save_cost_file(
    slug="engineering/operations/on-call",
    cost_metrics={'character_count': 1234, 'chunks_count': 1, 'request_ids': ['abc123']},
    output_dir=Path("public/handbook-audio"),
    dry_run=False
)

# Check if exists
exists = audio_file_exists(slug, output_dir)
```

## Testing workflow

### 1. Test with dry-run (no API key needed)

```bash
# Quick test with a simple file
python scripts/handbook-audio/generate.py --dry-run contents/handbook/values.md

# Test with component-heavy file (best for validation)
python scripts/handbook-audio/generate.py --dry-run contents/handbook/engineering/posthog-com/markdown.mdx
```

Dry-run mode:
- Processes markdown/MDX completely
- Shows text length and first 200 characters
- Skips actual audio generation
- Perfect for testing component handling

### 2. Generate audio for a single file

```bash
export ELEVENLABS_API_KEY="your-key"

# Short file (no chunking)
python scripts/handbook-audio/generate.py contents/handbook/values.md

# Long file (triggers chunking)
python scripts/handbook-audio/generate.py contents/handbook/engineering/posthog-com/markdown.mdx
```

### 3. Batch generation

```bash
# All files matching pattern
python scripts/handbook-audio/generate.py --search "engineering"

# All handbook files (260+ files, takes hours)
python scripts/handbook-audio/generate.py --all
```

## S3 Upload Support

Generated audio files and associated files can be automatically uploaded to S3 with the `--upload-s3` flag:

```bash
# Generate and upload to S3
python scripts/handbook-audio/generate.py --upload-s3 contents/handbook/values.md

# Generate all files and upload to S3
python scripts/handbook-audio/generate.py --all --upload-s3
```

### What gets uploaded

For each handbook page, **three files** are uploaded to S3:
- `.mp3` - Audio file
- `.elevenlabs-input.txt` - Parsed text sent to ElevenLabs
- `.cost.json` - Cost metrics and tracking data

### S3 File Structure

Files are uploaded maintaining the same structure as the handbook:

```
s3://your-bucket/handbook/
├── values.mp3
├── values.elevenlabs-input.txt
├── values.cost.json
├── product/
│   ├── releasing-as-beta.mp3
│   ├── releasing-as-beta.elevenlabs-input.txt
│   ├── releasing-as-beta.cost.json
│   └── metrics.mp3
├── engineering/
│   ├── posthog-com/
│   │   └── markdown.mp3
│   └── operations/
│       └── support-hero.mp3
└── ...
```

This makes it easy to:
- Map handbook pages to audio files
- Access the parsed text used for generation
- Track costs across all pages
- Organize files by section
- Generate CDN URLs programmatically

## Environment variables

**ElevenLabs (required for audio generation):**
- `ELEVENLABS_API_KEY` - Your ElevenLabs API key (required for actual generation)
- `ELEVENLABS_VOICE_ID` - Voice ID to use (optional, defaults to Sarah)

**AWS S3 (optional for uploads):**
- `S3_BUCKET` - S3 bucket name (e.g., 'posthog-handbook-audio')
- `AWS_REGION` - AWS region (optional, defaults to 'us-east-1')
- `AWS_ACCESS_KEY_ID` - AWS access key (or use AWS CLI/IAM role)
- `AWS_SECRET_ACCESS_KEY` - AWS secret key (or use AWS CLI/IAM role)

You can set these in a `.env` file in `scripts/hogfm/.env`:

```bash
# Required for audio generation
ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_VOICE_ID=your_voice_id_here

# Required only if using S3 uploads
S3_BUCKET=your-bucket-name
AWS_REGION=your-aws-region
```

## Dependencies

- Python 3.7+
- `elevenlabs` (required for audio generation via ElevenLabs SDK)
- `boto3` (optional, only required for S3 uploads)

```bash
# Install with uv (recommended - fast!)
uv pip install -r scripts/handbook-audio/requirements.txt

# Or install manually
uv pip install elevenlabs boto3
```

The script uses the [official ElevenLabs Python SDK](https://elevenlabs.io/docs/agents-platform/libraries/python) for cleaner, more maintainable API interactions.

## Troubleshooting

**"max_character_limit_exceeded" error:**
- This should not happen anymore—chunking is automatic
- If you see this, the chunking logic may have failed
- Try with `--dry-run` to verify text length

**Components being read twice:**
- Make sure code blocks are processed before components
- The pipeline order matters: code blocks → components → cleanup

**Missing component descriptions:**
- Check if the component is in `describe_special_components()` in `markdown_processor.py`
- Add new component patterns to the regex list at the top of the file

