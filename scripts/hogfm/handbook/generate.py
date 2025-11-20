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
from handbook.s3_uploader import upload_to_s3, check_s3_available, download_text_from_s3, delete_from_s3

# Constants
# Navigate from scripts/hogfm/handbook_audio/generate.py to repo root
# generate.py -> handbook_audio -> hogfm -> scripts -> repo_root
REPO_ROOT = Path(__file__).parent.parent.parent.parent
HANDBOOK_DIR = REPO_ROOT / 'contents' / 'handbook'
OUTPUT_DIR = REPO_ROOT / 'public' / 'handbook-audio'

# Allowed files list (relative to HANDBOOK_DIR)
# This list is used by the --allowed-only mode for cron jobs
ALLOWED_FILES = [
    # Core handbook pages (in order)
    'why-does-posthog-exist.md',      # 1. Why does PostHog exist?
    'story.md',                        # 2. How we got here
    'how-we-get-users.md',             # 3. How we get users
    'who-we-build-for.md',             # 4. Who we are building for
    'making-users-happy.md',           # 5. How we make users happy
    'how-we-make-money.md',            # 6. How we make money
    'low-prices.md',                   # 7. Enduringly low prices
    'which-products.md',               # 8. Deciding which products to build
    'wide-company.md',                 # 9. A wide company with small teams
    'strong-team.md',                  # 10. How we're building a world-class team
    'values.md',                       # 11. What we value
    'world-class-engineering.md',      # 12. Providing a world-class engineering environment
    'finance.md',                      # 13. Not running out of money
    'future.md',                       # 14. Where are we going?
    'help.md',                         # 15. How you can help
]


def process_single_file(file_path, dry_run=False, upload_s3=False):
    """Process a single file with all steps"""
    content = process_markdown_file(file_path, HANDBOOK_DIR)
    
    if not content:
        return False
    
    # Generate the full text that will be sent to ElevenLabs
    full_text = f'{content["title"]}.\n\n{content["text"]}'
    
    # If upload_s3 is enabled, check S3 for existing text to detect changes
    if upload_s3:
        existing_text = download_text_from_s3(content['slug'], dry_run=dry_run)
        
        if existing_text is not None:
            # Compare texts
            if existing_text == full_text:
                print(f'  ⏭️  Content unchanged, skipping generation')
                return 'skipped'
            else:
                print(f'  🔄 Content changed, regenerating audio')
        else:
            print(f'  🆕 First generation (no existing file in S3)')
    
    # Save parsed text FIRST so you can test with it before generating audio
    text_file_path = save_text_file(content['slug'], content, OUTPUT_DIR, dry_run=dry_run)
    
    result = generate_audio(content, dry_run=dry_run)
    
    if not result:
        return False
    
    audio_data, cost_metrics = result
    
    # Save to local disk and get audio duration
    audio_path, audio_duration_seconds = save_audio_file(content['slug'], audio_data, OUTPUT_DIR, dry_run=dry_run)
    
    # Save cost metrics (using actual audio duration for accurate cost calculation)
    cost_file_path = save_cost_file(content['slug'], cost_metrics, OUTPUT_DIR, audio_duration_seconds=audio_duration_seconds, dry_run=dry_run)
    
    # Optionally upload to S3 (includes audio, text, and cost files)
    if upload_s3:
        upload_to_s3(
            content['slug'], 
            audio_data, 
            text_file_path=text_file_path,
            cost_file_path=cost_file_path,
            dry_run=dry_run
        )
    
    return True


def main():
    if len(sys.argv) < 2:
        print('Usage:')
        print('  python scripts/handbook-audio/generate.py <file-path>')
        print('  python scripts/handbook-audio/generate.py --all')
        print('  python scripts/handbook-audio/generate.py --dir <directory>')
        print('  python scripts/handbook-audio/generate.py --search <pattern>')
        print('  python scripts/handbook-audio/generate.py --allowed-only [--limit N]')
        print('  python scripts/handbook-audio/generate.py --dry-run <file-path>')
        print('  python scripts/handbook-audio/generate.py --upload-s3 <file-path>')
        print('  python scripts/handbook-audio/generate.py --all --upload-s3')
        print('')
        print('Examples:')
        print('  python scripts/handbook-audio/generate.py --dir engineering')
        print('  python scripts/handbook-audio/generate.py --dir engineering/operations')
        print('  python scripts/handbook-audio/generate.py --allowed-only --upload-s3  # For cron jobs')
        print('  python scripts/handbook-audio/generate.py --allowed-only --limit 2    # First 2 files only')
        sys.exit(1)
    
    # Check for flags
    dry_run = '--dry-run' in sys.argv
    upload_s3 = '--upload-s3' in sys.argv
    limit = None
    
    # Check for --limit flag
    if '--limit' in sys.argv:
        limit_idx = sys.argv.index('--limit')
        if limit_idx + 1 < len(sys.argv):
            try:
                limit = int(sys.argv[limit_idx + 1])
                sys.argv.pop(limit_idx + 1)  # Remove the number
                sys.argv.pop(limit_idx)      # Remove --limit
            except (ValueError, IndexError):
                print('❌ --limit requires a number')
                sys.exit(1)
        else:
            print('❌ --limit requires a number')
            sys.exit(1)
    
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
        print('❌ Please specify a file path, --all, --dir <directory>, --search <pattern>, or --allowed-only')
        sys.exit(1)
    
    if sys.argv[1] == '--all':
        print('Finding all handbook files...\n')
        files = find_all_handbook_files(HANDBOOK_DIR)
        print(f'Found {len(files)} files\n')
        
        success_count = 0
        fail_count = 0
        skipped_count = 0
        
        for i, file_path in enumerate(files):
            relative_path = file_path.relative_to(HANDBOOK_DIR)
            print(f'\n[{i + 1}/{len(files)}] {relative_path}')
            
            result = process_single_file(file_path, dry_run=dry_run, upload_s3=upload_s3)
            if result == True:
                success_count += 1
            elif result == 'skipped':
                skipped_count += 1
            else:
                fail_count += 1
            
            # Rate limiting: wait 1 second between API calls (skip in dry-run)
            if not dry_run and i < len(files) - 1:
                time.sleep(1)
        
        print('\n✨ Done!')
        print(f'   Success: {success_count}')
        print(f'   Skipped (unchanged): {skipped_count}')
        print(f'   Failed: {fail_count}')
    
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
        skipped_count = 0
        
        for i, file_path in enumerate(files):
            relative_path = file_path.relative_to(HANDBOOK_DIR)
            print(f'\n[{i + 1}/{len(files)}] {relative_path}')
            
            result = process_single_file(file_path, dry_run=dry_run, upload_s3=upload_s3)
            if result == True:
                success_count += 1
            elif result == 'skipped':
                skipped_count += 1
            else:
                fail_count += 1
            
            # Rate limiting
            if not dry_run and i < len(files) - 1:
                time.sleep(1)
        
        print('\n✨ Done!')
        print(f'   Success: {success_count}')
        print(f'   Skipped (unchanged): {skipped_count}')
        print(f'   Failed: {fail_count}')
    
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
        skipped_count = 0
        
        for i, file_path in enumerate(files):
            relative_path = file_path.relative_to(HANDBOOK_DIR)
            print(f'\n[{i + 1}/{len(files)}] {relative_path}')
            
            result = process_single_file(file_path, dry_run=dry_run, upload_s3=upload_s3)
            if result == True:
                success_count += 1
            elif result == 'skipped':
                skipped_count += 1
            else:
                fail_count += 1
            
            # Rate limiting
            if not dry_run and i < len(files) - 1:
                time.sleep(1)
        
        print('\n✨ Done!')
        print(f'   Success: {success_count}')
        print(f'   Skipped (unchanged): {skipped_count}')
        print(f'   Failed: {fail_count}')
    
    elif sys.argv[1] == '--allowed-only':
        # Apply limit if specified
        files_to_check = ALLOWED_FILES[:limit] if limit else ALLOWED_FILES
        
        if limit:
            print(f'Processing allowed files list (first {limit} of {len(ALLOWED_FILES)} files)\n')
        else:
            print(f'Processing allowed files list ({len(ALLOWED_FILES)} files)\n')
        
        # Build full paths from allowed files list and track missing files
        files = []
        missing_files = []
        
        for relative_path in files_to_check:
            file_path = HANDBOOK_DIR / relative_path
            if file_path.exists():
                files.append(file_path)
            else:
                missing_files.append(relative_path)
        
        # Handle missing files - delete from S3 if upload_s3 is enabled
        deleted_count = 0
        if missing_files and upload_s3:
            print(f'Found {len(missing_files)} deleted files (will remove from S3):\n')
            for relative_path in missing_files:
                print(f'  - {relative_path}')
            print()
            
            for relative_path in missing_files:
                # Convert path to slug (remove .md/.mdx extension)
                slug = str(Path(relative_path).with_suffix(''))
                print(f'🗑️  Deleting S3 files for removed file: {relative_path}')
                if delete_from_s3(slug, dry_run=dry_run):
                    deleted_count += 1
            print()
        elif missing_files:
            print(f'⚠️  Found {len(missing_files)} missing files (skipping, S3 upload not enabled):\n')
            for relative_path in missing_files:
                print(f'  - {relative_path}')
            print()
        
        if not files and not missing_files:
            print('❌ No files in the allowed list')
            sys.exit(1)
        
        if files:
            print(f'Found {len(files)} files to process:\n')
            for file_path in files:
                relative = file_path.relative_to(HANDBOOK_DIR)
                print(f'  - {relative}')
            
            print('\nProcessing files...\n')
        
        success_count = 0
        fail_count = 0
        skipped_count = 0
        
        for i, file_path in enumerate(files):
            relative_path = file_path.relative_to(HANDBOOK_DIR)
            print(f'\n[{i + 1}/{len(files)}] {relative_path}')
            
            result = process_single_file(file_path, dry_run=dry_run, upload_s3=upload_s3)
            if result == True:
                success_count += 1
            elif result == 'skipped':
                skipped_count += 1
            else:
                fail_count += 1
            
            # Rate limiting
            if not dry_run and i < len(files) - 1:
                time.sleep(1)
        
        print('\n✨ Done!')
        print(f'   Success: {success_count}')
        print(f'   Skipped (unchanged): {skipped_count}')
        if deleted_count > 0:
            print(f'   Deleted from S3: {deleted_count}')
        print(f'   Failed: {fail_count}')
    
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

