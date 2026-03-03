# HogFM

PostHog's audio generation toolkit.

## What is this?

HogFM is a Python project that contains various audio generation tools for PostHog content. Currently includes:

- **handbook_audio**: Generate audio narration of handbook pages using ElevenLabs API

## Installation

This project uses [uv](https://docs.astral.sh/uv/) for dependency management.

```bash
cd scripts/hogfm
uv sync
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

## Usage

### Handbook Audio

Generate audio versions of handbook pages:

```bash
# Single file
uv run handbook-audio contents/handbook/values.md

# All handbook files
uv run handbook-audio --all

# Search for specific files
uv run handbook-audio --search "engineering"

# Dry run (test without API calls)
uv run handbook-audio --dry-run contents/handbook/values.md

# Upload to S3
uv run handbook-audio --upload-s3 contents/handbook/values.md
```

See [handbook_audio/README.md](handbook_audio/README.md) for more details.

## Project structure

```
hogfm/
├── handbook_audio/        # Handbook audio generation module
│   ├── __init__.py
│   ├── generate.py        # Main CLI script
│   ├── markdown_processor.py
│   ├── elevenlabs_client.py
│   ├── audio_saver.py
│   ├── s3_uploader.py
│   ├── file_selector.py
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── S3_SETUP.md
│   └── TEST_RESULTS.md
├── pyproject.toml         # Dependencies and CLI entry points
└── README.md              # This file
```

## Adding new tools

To add a new audio generation tool:

1. Create a new module directory (e.g., `blog_audio/`)
2. Add your scripts and logic
3. Add a CLI entry point in `pyproject.toml`
4. Update this README

## Development

```bash
# Install dependencies
uv sync

# Run commands
uv run handbook-audio --help

# Add a new dependency
uv add package-name
```

## License

MIT

