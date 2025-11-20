#!/usr/bin/env python3

"""
Main script to generate handbook audio files

Usage:
    # Single file
    python scripts/handbook-audio/generate.py contents/handbook/values.md
    
    # All handbook files
    python scripts/handbook-audio/generate.py --all
    
    # Search and generate
    python scripts/handbook-audio/generate.py --search "engineering"
    
    # Dry run (process markdown but don't generate audio)
    python scripts/handbook-audio/generate.py --dry-run contents/handbook/values.md
"""

import sys
import time
from pathlib import Path

from handbook.markdown_processor import process_markdown_file
from handbook.file_selector import (
    find_all_handbook_files,
    find_handbook_file_by_pattern,
    find_handbook_files_in_directory
)
from handbook.elevenlabs_client import generate_audio, check_api_available
from handbook.audio_saver import save_audio_file, save_text_file, save_cost_file
from handbook.s3_uploader import upload_to_s3, check_s3_available

# Constants
# Navigate from scripts/hogfm/handbook_audio/generate.py to repo root
# generate.py -> handbook_audio -> hogfm -> scripts -> repo_root
REPO_ROOT = Path(__file__).parent.parent.parent.parent
HANDBOOK_DIR = REPO_ROOT / 'contents' / 'handbook'
OUTPUT_DIR = REPO_ROOT / 'public' / 'handbook-audio'


def process_single_file(file_path, dry_run=False, upload_s3=False):
    """Process a single file with all steps"""
    content = process_markdown_file(file_path, HANDBOOK_DIR)
    
    if not content:
        return False
    
    # Save parsed text FIRST so you can test with it before generating audio
    save_text_file(content['slug'], content, OUTPUT_DIR, dry_run=dry_run)
    
    result = generate_audio(content, dry_run=dry_run)
    
    if not result:
        return False
    
    audio_data, cost_metrics = result
    
    # Save to local disk and get audio duration
    audio_path, audio_duration_seconds = save_audio_file(content['slug'], audio_data, OUTPUT_DIR, dry_run=dry_run)
    
    # Save cost metrics (using actual audio duration for accurate cost calculation)
    save_cost_file(content['slug'], cost_metrics, OUTPUT_DIR, audio_duration_seconds=audio_duration_seconds, dry_run=dry_run)
    
    # Optionally upload to S3
    if upload_s3:
        upload_to_s3(content['slug'], audio_data, dry_run=dry_run)
    
    return True


def main():
    if len(sys.argv) < 2:
        print('Usage:')
        print('  python scripts/handbook-audio/generate.py <file-path>')
        print('  python scripts/handbook-audio/generate.py --all')
        print('  python scripts/handbook-audio/generate.py --dir <directory>')
        print('  python scripts/handbook-audio/generate.py --search <pattern>')
        print('  python scripts/handbook-audio/generate.py --dry-run <file-path>')
        print('  python scripts/handbook-audio/generate.py --upload-s3 <file-path>')
        print('  python scripts/handbook-audio/generate.py --all --upload-s3')
        print('')
        print('Examples:')
        print('  python scripts/handbook-audio/generate.py --dir engineering')
        print('  python scripts/handbook-audio/generate.py --dir engineering/operations')
        sys.exit(1)
    
    # Check for flags
    dry_run = '--dry-run' in sys.argv
    upload_s3 = '--upload-s3' in sys.argv
    
    if dry_run:
        sys.argv.remove('--dry-run')
        print('🎙️  Handbook Audio Generator [DRY RUN MODE]\n')
    else:
        print('🎙️  Handbook Audio Generator\n')
        available, message = check_api_available()
        if not available:
            print(f'❌ {message}')
            print('   Get your API key from: https://elevenlabs.io/app/settings/api-keys')
            print('   Or run with --dry-run to test without API')
            sys.exit(1)
    
    if upload_s3:
        sys.argv.remove('--upload-s3')
        s3_available, s3_message = check_s3_available()
        if not s3_available and not dry_run:
            print(f'⚠️  S3 upload disabled: {s3_message}')
            print('   Set S3_BUCKET and configure AWS credentials')
            print('   Or run with --dry-run to test')
            upload_s3 = False
        elif s3_available:
            print(f'☁️  S3 upload enabled: {s3_message}\n')
    
    if len(sys.argv) < 2:
        print('❌ Please specify a file path, --all, --dir <directory>, or --search <pattern>')
        sys.exit(1)
    
    if sys.argv[1] == '--all':
        print('Finding all handbook files...\n')
        files = find_all_handbook_files(HANDBOOK_DIR)
        print(f'Found {len(files)} files\n')
        
        success_count = 0
        fail_count = 0
        
        for i, file_path in enumerate(files):
            relative_path = file_path.relative_to(HANDBOOK_DIR)
            print(f'\n[{i + 1}/{len(files)}] {relative_path}')
            
            if process_single_file(file_path, dry_run=dry_run, upload_s3=upload_s3):
                success_count += 1
            else:
                fail_count += 1
            
            # Rate limiting: wait 1 second between API calls (skip in dry-run)
            if not dry_run and i < len(files) - 1:
                time.sleep(1)
        
        print('\n✨ Done!')
        print(f'   Success: {success_count}')
        print(f'   Failed/Skipped: {fail_count}')
    
    elif sys.argv[1] == '--search':
        if len(sys.argv) < 3:
            print('❌ Please provide a search pattern')
            sys.exit(1)
        
        pattern = sys.argv[2]
        print(f'Searching for files matching: "{pattern}"\n')
        
        files = find_handbook_file_by_pattern(HANDBOOK_DIR, pattern)
        
        if not files:
            print(f'❌ No files found matching "{pattern}"')
            sys.exit(1)
        
        print(f'Found {len(files)} matching files:\n')
        for file_path in files:
            relative = file_path.relative_to(HANDBOOK_DIR)
            print(f'  - {relative}')
        
        print('\nProcessing files...\n')
        
        success_count = 0
        fail_count = 0
        
        for i, file_path in enumerate(files):
            relative_path = file_path.relative_to(HANDBOOK_DIR)
            print(f'\n[{i + 1}/{len(files)}] {relative_path}')
            
            if process_single_file(file_path, dry_run=dry_run, upload_s3=upload_s3):
                success_count += 1
            else:
                fail_count += 1
            
            # Rate limiting
            if not dry_run and i < len(files) - 1:
                time.sleep(1)
        
        print('\n✨ Done!')
        print(f'   Success: {success_count}')
        print(f'   Failed/Skipped: {fail_count}')
    
    elif sys.argv[1] == '--dir':
        if len(sys.argv) < 3:
            print('❌ Please provide a directory path')
            sys.exit(1)
        
        directory = sys.argv[2]
        print(f'Finding files in directory: "{directory}"\n')
        
        files = find_handbook_files_in_directory(HANDBOOK_DIR, directory)
        
        if not files:
            print(f'❌ No files found in "{directory}"')
            print(f'   Make sure the directory exists under contents/handbook/')
            sys.exit(1)
        
        print(f'Found {len(files)} files in {directory}:\n')
        for file_path in files:
            relative = file_path.relative_to(HANDBOOK_DIR)
            print(f'  - {relative}')
        
        print('\nProcessing files...\n')
        
        success_count = 0
        fail_count = 0
        
        for i, file_path in enumerate(files):
            relative_path = file_path.relative_to(HANDBOOK_DIR)
            print(f'\n[{i + 1}/{len(files)}] {relative_path}')
            
            if process_single_file(file_path, dry_run=dry_run, upload_s3=upload_s3):
                success_count += 1
            else:
                fail_count += 1
            
            # Rate limiting
            if not dry_run and i < len(files) - 1:
                time.sleep(1)
        
        print('\n✨ Done!')
        print(f'   Success: {success_count}')
        print(f'   Failed/Skipped: {fail_count}')
    
    else:
        # Single file mode
        file_path = Path(sys.argv[1]).resolve()
        
        if not file_path.exists():
            print(f'❌ File not found: {file_path}')
            sys.exit(1)
        
        process_single_file(file_path, dry_run=dry_run, upload_s3=upload_s3)
        print('\n✨ Done!')


if __name__ == '__main__':
    main()

