"""
Save generated audio files to disk
"""

from pathlib import Path


def save_audio_file(slug, audio_data, output_dir, dry_run=False):
    """
    Save audio file to disk
    
    Args:
        slug: File slug (e.g., 'engineering/operations/on-call-rotation')
        audio_data: Binary audio data
        output_dir: Base output directory
        dry_run: If True, don't actually write file
    
    Returns:
        Path to saved file
    """
    output_path = output_dir / f'{slug}.mp3'
    
    if dry_run:
        relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
        print(f'  💾 [DRY RUN] Would save to: {relative_path}')
        return output_path
    
    # Ensure directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'wb') as f:
        f.write(audio_data)
    
    relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
    print(f'  💾 Saved to: {relative_path}')
    return output_path


def get_output_path(slug, output_dir):
    """Get the output path for a given slug"""
    return output_dir / f'{slug}.mp3'


def audio_file_exists(slug, output_dir):
    """Check if audio file already exists"""
    output_path = get_output_path(slug, output_dir)
    return output_path.exists()


def save_text_file(slug, content, output_dir, dry_run=False):
    """
    Save parsed text file alongside audio file
    
    Args:
        slug: File slug (e.g., 'engineering/operations/on-call-rotation')
        content: Dict with 'title' and 'text' keys
        output_dir: Base output directory
        dry_run: If True, don't actually write file
    
    Returns:
        Path to saved file
    """
    output_path = output_dir / f'{slug}.txt'
    
    if dry_run:
        relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
        print(f'  📝 [DRY RUN] Would save text to: {relative_path}')
        return output_path
    
    # Ensure directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Combine title and text as it will be sent to the audio API
    full_text = f'{content["title"]}.\n\n{content["text"]}'
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_text)
    
    relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
    print(f'  📝 Saved text to: {relative_path}')
    return output_path

