#!/usr/bin/env python3

"""
Regenerate cost files for existing audio files with accurate duration-based costs

Usage:
    uv run python handbook/regenerate_costs.py
"""

from pathlib import Path
from handbook.audio_saver import get_audio_duration_seconds, save_cost_file

# Navigate to repo root
REPO_ROOT = Path(__file__).parent.parent.parent.parent
AUDIO_DIR = REPO_ROOT / 'public' / 'handbook-audio'


def regenerate_cost_for_file(mp3_path):
    """Regenerate cost file for a single MP3"""
    # Read audio data
    with open(mp3_path, 'rb') as f:
        audio_data = f.read()
    
    # Get duration
    duration = get_audio_duration_seconds(audio_data)
    
    if not duration:
        print(f'⚠️  Could not get duration for {mp3_path.name}')
        return False
    
    # Create cost metrics
    slug = str(mp3_path.relative_to(AUDIO_DIR)).replace('.mp3', '')
    cost_metrics = {
        'character_count': 0,  # Unknown for existing files
        'chunks_count': 0,
        'request_ids': []
    }
    
    # Save cost file
    save_cost_file(slug, cost_metrics, AUDIO_DIR, audio_duration_seconds=duration, dry_run=False)
    return True


def main():
    print('🎙️  Regenerating cost files for existing audio\n')
    
    # Find all MP3 files
    mp3_files = list(AUDIO_DIR.rglob('*.mp3'))
    print(f'Found {len(mp3_files)} audio files\n')
    
    success = 0
    failed = 0
    
    for mp3_file in mp3_files:
        try:
            if regenerate_cost_for_file(mp3_file):
                success += 1
            else:
                failed += 1
        except Exception as e:
            print(f'❌ Error processing {mp3_file.name}: {e}')
            failed += 1
    
    print(f'\n✨ Done!')
    print(f'   Success: {success}')
    print(f'   Failed: {failed}')


if __name__ == '__main__':
    main()

