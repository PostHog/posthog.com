"""
Save generated audio files to disk
"""

from pathlib import Path
import io


def get_audio_duration_seconds(audio_data):
    """
    Get duration of MP3 audio in seconds
    
    Args:
        audio_data: Binary MP3 data
    
    Returns:
        float: Duration in seconds, or None if unable to determine
    """
    try:
        # Try to import mutagen for MP3 duration detection
        from mutagen.mp3 import MP3
        
        # Create a file-like object from bytes
        audio_file = io.BytesIO(audio_data)
        audio = MP3(audio_file)
        return audio.info.length
    except ImportError:
        # Mutagen not available, try pydub as fallback
        try:
            from pydub import AudioSegment
            audio_file = io.BytesIO(audio_data)
            audio = AudioSegment.from_mp3(audio_file)
            return len(audio) / 1000.0  # Convert milliseconds to seconds
        except ImportError:
            # Neither library available
            return None
    except Exception as e:
        print(f'  ⚠️  Could not determine audio duration: {e}')
        return None


def save_audio_file(slug, audio_data, output_dir, dry_run=False):
    """
    Save audio file to disk
    
    Args:
        slug: File slug (e.g., 'engineering/operations/on-call-rotation')
        audio_data: Binary audio data
        output_dir: Base output directory
        dry_run: If True, don't actually write file
    
    Returns:
        tuple: (output_path, duration_seconds) where duration_seconds may be None if unable to determine
    """
    output_path = output_dir / f'{slug}.mp3'
    
    if dry_run:
        relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
        print(f'  💾 [DRY RUN] Would save to: {relative_path}')
        # Estimate duration for dry run (rough estimate: 150 words per minute, ~5 chars per word)
        return output_path, None
    
    # Ensure directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Get audio duration before saving
    duration = get_audio_duration_seconds(audio_data)
    
    with open(output_path, 'wb') as f:
        f.write(audio_data)
    
    relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
    
    if duration:
        duration_mins = duration / 60
        print(f'  💾 Saved to: {relative_path} ({duration_mins:.2f} min)')
    else:
        print(f'  💾 Saved to: {relative_path}')
    
    return output_path, duration


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
    output_path = output_dir / f'{slug}.elevenlabs-input.txt'
    
    if dry_run:
        relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
        print(f'  📝 [DRY RUN] Would save parsed text to: {relative_path}')
        return output_path
    
    # Ensure directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Combine title and text as it will be sent to the audio API
    full_text = f'{content["title"]}.\n\n{content["text"]}'
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_text)
    
    relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
    print(f'  📝 Saved parsed text (ElevenLabs input) to: {relative_path}')
    return output_path


def save_cost_file(slug, cost_metrics, output_dir, audio_duration_seconds=None, dry_run=False):
    """
    Save cost metrics file alongside audio file
    
    Args:
        slug: File slug (e.g., 'engineering/operations/on-call-rotation')
        cost_metrics: Dict with cost tracking information:
            - character_count: Number of characters processed
            - request_ids: List of request IDs from API
            - chunks_count: Number of chunks processed
        output_dir: Base output directory
        audio_duration_seconds: Actual duration of generated audio in seconds (used for cost calculation)
        dry_run: If True, don't actually write file
    
    Returns:
        Path to saved file
    """
    import json
    
    output_path = output_dir / f'{slug}.cost.json'
    
    if dry_run:
        relative_path = output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path
        print(f'  💰 [DRY RUN] Would save cost metrics to: {relative_path}')
        return output_path
    
    # Ensure directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # ElevenLabs pricing for PostHog:
    # $0.30 per 1000 credits
    # 100,000 credits ≈ 100 min audio
    # Therefore: 1000 credits ≈ 1 minute of audio
    # Cost per minute = $0.30
    cost_per_minute = 0.30
    
    character_count = cost_metrics.get('character_count', 0)
    
    # Calculate cost based on audio duration if available
    if audio_duration_seconds:
        duration_minutes = audio_duration_seconds / 60
        estimated_cost = duration_minutes * cost_per_minute
        credits_used = duration_minutes * 1000  # 1000 credits per minute
        
        # Create detailed cost report
        cost_data = {
            'audio_duration_seconds': round(audio_duration_seconds, 2),
            'audio_duration_minutes': round(duration_minutes, 2),
            'credits_used': round(credits_used, 0),
            'character_count': character_count,
            'chunks_count': cost_metrics.get('chunks_count', 0),
            'request_ids': cost_metrics.get('request_ids', []),
            'estimated_cost_usd': round(estimated_cost, 4),
            'cost_per_minute': cost_per_minute,
            'plan_details': '100,000 credits ≈ 100 min audio @ $0.30/1000 credits ($0.30/min)'
        }
        
        print(f'  💰 Saved cost metrics to: {output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path}')
        print(f'      Duration: {duration_minutes:.2f} min | Credits: {credits_used:,.0f} | Cost: ${estimated_cost:.4f}')
    else:
        # Fallback: estimate based on character count (rough approximation)
        # Average: ~150 words per minute, ~5 characters per word = 750 chars/min
        estimated_duration_minutes = character_count / 750
        estimated_cost = estimated_duration_minutes * cost_per_minute
        
        cost_data = {
            'audio_duration_seconds': None,
            'audio_duration_minutes': None,
            'credits_used': None,
            'character_count': character_count,
            'chunks_count': cost_metrics.get('chunks_count', 0),
            'request_ids': cost_metrics.get('request_ids', []),
            'estimated_cost_usd': round(estimated_cost, 4),
            'cost_per_minute': cost_per_minute,
            'note': 'Cost estimated from character count (audio duration not available). Install mutagen or pydub for accurate costs.',
            'plan_details': '100,000 credits ≈ 100 min audio @ $0.30/1000 credits ($0.30/min)'
        }
        
        print(f'  💰 Saved cost metrics to: {output_path.relative_to(Path.cwd()) if output_path.is_relative_to(Path.cwd()) else output_path}')
        print(f'      ⚠️  Duration unknown, estimated cost from character count: ${estimated_cost:.4f}')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(cost_data, f, indent=2)
    
    return output_path

