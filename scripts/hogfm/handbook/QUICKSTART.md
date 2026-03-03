# Quick start guide

## Setup

Navigate to the hogfm project and install dependencies with uv:

```bash
cd scripts/hogfm
uv sync
```

Set your configuration in `.env` file in the hogfm directory:

```bash
# In scripts/hogfm/.env

# Required for audio generation
ELEVENLABS_API_KEY=your-key-here
ELEVENLABS_VOICE_ID=your-voice-id-here

# Required only if using --upload-s3
S3_BUCKET=your-bucket-name
AWS_REGION=your-aws-region
```

---

## Generate audio (full pipeline)

### Single file - dry run

```bash
uv run handbook-audio --dry-run contents/handbook/values.md
```

**What it does:** Full pipeline (markdown → text → fake API call → fake save) without actually generating audio.

**Perfect for:** Testing the entire workflow before using your API credits.

---

### Single file - real generation

```bash
# Generate audio
uv run handbook-audio contents/handbook/values.md
```

**What it does:** Full pipeline with real API call. Saves MP3 to `public/handbook-audio/values.mp3`.

**Cost:** ~$0.05 per page (depends on your ElevenLabs plan).

---

### Generate multiple files by search

```bash
# Find and generate all "engineering" pages
uv run handbook-audio --search engineering

# Dry run first to see what would be generated
uv run handbook-audio --dry-run --search engineering
```

**What it does:** Finds all files matching the pattern and generates audio for each.

**Perfect for:** Processing a specific section of the handbook.

---

### Generate ALL handbook files

```bash
# Dry run first (recommended)
uv run handbook-audio --dry-run --all

# Then generate for real
uv run handbook-audio --all
```

**What it does:** Processes all 260 handbook files.

**Time:** ~5-10 minutes (with 1 second delay between API calls).

**Cost:** ~$10-20 total (depends on your plan).

---

## Typical workflow

1. **Do a dry run:**
   ```bash
   python scripts/handbook-audio/generate.py --dry-run contents/handbook/values.md
   ```

2. **Generate audio for that one file:**
   ```bash
   uv run handbook-audio contents/handbook/values.md
   ```

3. **Listen to the result:**
   ```bash
   open public/handbook-audio/values.mp3
   ```

4. **If happy, generate more:**
   ```bash
   uv run handbook-audio --search engineering
   ```

5. **Or generate everything:**
   ```bash
   uv run handbook-audio --all
   ```

---

## File locations

- **Input:** `contents/handbook/**/*.md(x)`
- **Output:** `public/handbook-audio/**/*.mp3`
- **Structure is preserved:** `contents/handbook/engineering/operations/on-call.md` → `public/handbook-audio/engineering/operations/on-call.mp3`

