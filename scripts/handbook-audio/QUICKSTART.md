# Quick start guide

## Setup

Install dependencies with uv:

```bash
uv pip install -r scripts/handbook-audio/requirements.txt
```

Set your ElevenLabs API key:

```bash
export ELEVENLABS_API_KEY="your-key-here"
```

---

## Generate audio (full pipeline)

### Single file - dry run

```bash
python scripts/handbook-audio/generate.py --dry-run contents/handbook/values.md
```

**What it does:** Full pipeline (markdown → text → fake API call → fake save) without actually generating audio.

**Perfect for:** Testing the entire workflow before using your API credits.

---

### Single file - real generation

```bash
# Install dependencies with uv
uv pip install -r scripts/handbook-audio/requirements.txt

# Set your API key
export ELEVENLABS_API_KEY="your-key-here"

# Generate audio
python scripts/handbook-audio/generate.py contents/handbook/values.md
```

**What it does:** Full pipeline with real API call. Saves MP3 to `public/handbook-audio/values.mp3`.

**Cost:** ~$0.05 per page (depends on your ElevenLabs plan).

---

### Generate multiple files by search

```bash
# Find and generate all "engineering" pages
python scripts/handbook-audio/generate.py --search engineering

# Dry run first to see what would be generated
python scripts/handbook-audio/generate.py --dry-run --search engineering
```

**What it does:** Finds all files matching the pattern and generates audio for each.

**Perfect for:** Processing a specific section of the handbook.

---

### Generate ALL handbook files

```bash
# Dry run first (recommended)
python scripts/handbook-audio/generate.py --dry-run --all

# Then generate for real
python scripts/handbook-audio/generate.py --all
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
   export ELEVENLABS_API_KEY="your-key"
   python scripts/handbook-audio/generate.py contents/handbook/values.md
   ```

3. **Listen to the result:**
   ```bash
   open public/handbook-audio/values.mp3
   ```

4. **If happy, generate more:**
   ```bash
   python scripts/handbook-audio/generate.py --search engineering
   ```

5. **Or generate everything:**
   ```bash
   python scripts/handbook-audio/generate.py --all
   ```

---

## File locations

- **Input:** `contents/handbook/**/*.md(x)`
- **Output:** `public/handbook-audio/**/*.mp3`
- **Structure is preserved:** `contents/handbook/engineering/operations/on-call.md` → `public/handbook-audio/engineering/operations/on-call.mp3`

