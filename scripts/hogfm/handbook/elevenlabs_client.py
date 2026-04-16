"""
ElevenLabs API client for generating audio using the official SDK
"""

import os
from pathlib import Path

# Try to import elevenlabs SDK, but allow dry-run mode without it
try:
    from elevenlabs import ElevenLabs
    from elevenlabs import VoiceSettings
    HAS_ELEVENLABS = True
except ImportError:
    HAS_ELEVENLABS = False

# Path to .env file in hogfm directory
# elevenlabs_client.py -> handbook_audio -> hogfm
_ENV_FILE_PATH = Path(__file__).resolve().parents[1] / '.env'
_ENV_VARS_LOADED = False


def _load_env_file():
    """Load variables from the repository-level .env file if it exists."""
    global _ENV_VARS_LOADED

    if _ENV_VARS_LOADED:
        return

    _ENV_VARS_LOADED = True

    if not _ENV_FILE_PATH.exists():
        return

    try:
        with _ENV_FILE_PATH.open('r', encoding='utf-8') as env_file:
            for raw_line in env_file:
                line = raw_line.strip()

                if not line or line.startswith('#') or '=' not in line:
                    continue

                key, value = line.split('=', 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")

                if key and value and key not in os.environ:
                    os.environ[key] = value
    except OSError as err:
        print(f'⚠️  Could not read {_ENV_FILE_PATH}: {err}')


_load_env_file()

# Constants
ELEVENLABS_API_KEY = os.environ.get('ELEVENLABS_API_KEY')
ELEVENLABS_VOICE_ID = os.environ.get('ELEVENLABS_VOICE_ID')
MAX_CHARS_PER_REQUEST = 5000
# Sentence-based chunking to avoid timeouts (smaller chunks = more reliable)
SENTENCES_PER_CHUNK = 8  # Adjust this if you still get timeouts


def check_api_available():
    """Check if ElevenLabs API is available"""
    if not HAS_ELEVENLABS:
        return False, 'elevenlabs SDK not installed. Run: uv pip install elevenlabs'
    
    if not ELEVENLABS_API_KEY:
        return False, 'ELEVENLABS_API_KEY not set'
    
    return True, 'API ready'


def split_text_into_sentences(text):
    """
    Split text into sentences, handling common abbreviations and edge cases.
    Returns a list of sentences.
    """
    import re
    
    # Split on sentence boundaries (., !, ?) followed by space or newline
    # But not on common abbreviations like "Dr.", "Mr.", "e.g.", "i.e."
    sentence_pattern = r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|!)\s+'
    sentences = re.split(sentence_pattern, text)
    
    # Clean up and filter empty sentences
    sentences = [s.strip() for s in sentences if s.strip()]
    
    return sentences


def split_text_into_chunks_by_sentences(text, sentences_per_chunk=8):
    """
    Split text into chunks by grouping a fixed number of sentences.
    This produces smaller, more manageable chunks that avoid timeouts.
    
    Args:
        text: The text to split
        sentences_per_chunk: Number of sentences per chunk (default: 8)
    
    Returns:
        List of text chunks
    """
    # Split into sentences
    sentences = split_text_into_sentences(text)
    
    # If we have fewer sentences than the chunk size, return as single chunk
    if len(sentences) <= sentences_per_chunk:
        return [text]
    
    chunks = []
    for i in range(0, len(sentences), sentences_per_chunk):
        chunk_sentences = sentences[i:i + sentences_per_chunk]
        chunks.append(' '.join(chunk_sentences))
    
    return chunks


def split_text_into_chunks(text, max_chars):
    """
    Split text into chunks by grouping sentences, respecting max_chars limit.
    This produces more natural audio breaks than splitting mid-sentence.
    """
    if len(text) <= max_chars:
        return [text]
    
    # Split into sentences
    sentences = split_text_into_sentences(text)
    
    chunks = []
    current_chunk = []
    current_length = 0
    
    for sentence in sentences:
        sentence_length = len(sentence)
        
        # If adding this sentence would exceed the limit, save current chunk
        if current_length + sentence_length + 1 > max_chars and current_chunk:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
            current_length = 0
        
        # If a single sentence is longer than max_chars, split it at paragraph/line breaks
        if sentence_length > max_chars:
            # Try to split on paragraph breaks first
            if '\n\n' in sentence:
                parts = sentence.split('\n\n')
                for part in parts:
                    if len(part) <= max_chars:
                        if current_chunk:
                            chunks.append(' '.join(current_chunk))
                            current_chunk = []
                            current_length = 0
                        chunks.append(part)
                    else:
                        # Split long paragraph at line breaks
                        lines = part.split('\n')
                        for line in lines:
                            if current_length + len(line) + 1 > max_chars and current_chunk:
                                chunks.append(' '.join(current_chunk))
                                current_chunk = []
                                current_length = 0
                            current_chunk.append(line)
                            current_length += len(line) + 1
            else:
                # No paragraph breaks, split at line breaks
                lines = sentence.split('\n')
                for line in lines:
                    if len(line) <= max_chars:
                        if current_length + len(line) + 1 > max_chars and current_chunk:
                            chunks.append(' '.join(current_chunk))
                            current_chunk = []
                            current_length = 0
                        current_chunk.append(line)
                        current_length += len(line) + 1
                    else:
                        # Line is still too long, force split at max_chars
                        if current_chunk:
                            chunks.append(' '.join(current_chunk))
                            current_chunk = []
                            current_length = 0
                        chunks.append(line[:max_chars])
                        remaining = line[max_chars:]
                        if remaining:
                            current_chunk.append(remaining)
                            current_length = len(remaining)
        else:
            current_chunk.append(sentence)
            current_length += sentence_length + 1
    
    # Add any remaining content
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks


def generate_audio(content, dry_run=False):
    """
    Generate audio using ElevenLabs API
    
    Args:
        content: Dict with keys 'title' and 'text'
        dry_run: If True, skip actual API call
    
    Returns:
        tuple: (audio_data, cost_metrics) where cost_metrics contains:
            - character_count: Number of characters processed
            - request_ids: List of request IDs from API
            - chunks_count: Number of chunks processed
        None: On error
    """
    if dry_run:
        print(f'  🎙️  [DRY RUN] Would generate audio for: {content["title"]}')
        full_text = f'{content["title"]}.\n\n{content["text"]}'
        character_count = len(full_text)
        print(f'  ℹ️  Text length: {character_count} characters')
        print(f'  ℹ️  First 200 chars: {full_text[:200]}...')
        cost_metrics = {
            'character_count': character_count,
            'request_ids': ['dry-run-request-id'],
            'chunks_count': 1
        }
        return b'fake-audio-data', cost_metrics
    
    if not HAS_ELEVENLABS:
        print('❌ elevenlabs SDK not installed. Run: uv pip install elevenlabs')
        return None
    
    if not ELEVENLABS_API_KEY:
        print('❌ ELEVENLABS_API_KEY not set')
        return None
    
    try:
        # Add title at the beginning
        full_text = f'{content["title"]}.\n\n{content["text"]}'
        character_count = len(full_text)
        request_ids = []
        
        # Check if we need to chunk the text
        # Use sentence-based chunking to avoid timeouts with smaller, more manageable chunks
        sentences = split_text_into_sentences(full_text)
        
        if len(sentences) > SENTENCES_PER_CHUNK:
            print(f'  🎙️  Generating audio for: {content["title"]} (long content, will chunk)')
            print(f'      Text length: {character_count} chars, {len(sentences)} sentences')
            
            # Split into chunks by sentences
            chunks = split_text_into_chunks_by_sentences(full_text, SENTENCES_PER_CHUNK)
            print(f'      Split into {len(chunks)} chunks ({SENTENCES_PER_CHUNK} sentences per chunk)')
            
            # Generate audio for each chunk
            audio_parts = []
            for i, chunk in enumerate(chunks):
                chunk_sentences = len(split_text_into_sentences(chunk))
                print(f'      Chunk {i+1}/{len(chunks)}: {len(chunk)} chars, {chunk_sentences} sentences')
                result = _generate_audio_chunk(chunk, i+1, len(chunks))
                if result is None:
                    return None
                audio_data, request_id = result
                audio_parts.append(audio_data)
                if request_id:
                    request_ids.append(request_id)
            
            # Concatenate all audio parts
            combined_audio = b''.join(audio_parts)
            size_mb = len(combined_audio) / 1024 / 1024
            print(f'  ✓ Generated {size_mb:.2f} MB audio from {len(chunks)} chunks')
            
            cost_metrics = {
                'character_count': character_count,
                'request_ids': request_ids,
                'chunks_count': len(chunks)
            }
            return combined_audio, cost_metrics
        
        # Single request for short content
        print(f'  🎙️  Generating audio for: {content["title"]}')
        print(f'      Text length: {character_count} chars, {len(sentences)} sentences')
        result = _generate_audio_chunk(full_text, 1, 1)
        if result is None:
            return None
        audio_data, request_id = result
        
        cost_metrics = {
            'character_count': character_count,
            'request_ids': [request_id] if request_id else [],
            'chunks_count': 1
        }
        return audio_data, cost_metrics
    except Exception as e:
        print(f'  ❌ Error generating audio: {e}')
        return None


def _generate_audio_chunk(text, chunk_num, total_chunks):
    """
    Generate audio for a single text chunk using the ElevenLabs SDK
    
    Returns:
        tuple: (audio_data, request_id) where:
            - audio_data: bytes of audio
            - request_id: request ID from response headers (for tracking)
        None: On error
    """
    # Try with retry on error
    max_retries = 2
    for attempt in range(max_retries):
        try:
            # Initialize the ElevenLabs client
            client = ElevenLabs(api_key=ELEVENLABS_API_KEY)
            
            # Generate audio using the SDK with raw response to capture headers
            # Using with_raw_response allows us to access response headers including request-id
            with client.text_to_speech.with_raw_response.convert(
                voice_id=ELEVENLABS_VOICE_ID,
                model_id="eleven_v3",
                text=text,
                voice_settings=VoiceSettings(
                    stability=0.5,
                    similarity_boost=0.75
                )
            ) as response:
                # Extract request-id from headers for tracking
                request_id = response._response.headers.get("request-id")
                
                # Collect all audio chunks into bytes
                audio_data = b''.join(chunk for chunk in response.data)
            
            size_mb = len(audio_data) / 1024 / 1024
            
            if total_chunks == 1:
                print(f'  ✓ Generated {size_mb:.2f} MB audio')
            else:
                print(f'      ✓ Chunk {chunk_num}/{total_chunks}: {size_mb:.2f} MB')
            
            return audio_data, request_id
            
        except Exception as e:
            if attempt < max_retries - 1:
                print(f'  ⏱️  Error (attempt {attempt + 1}/{max_retries}), retrying...')
                print(f'      Error: {e}')
                continue
            else:
                print(f'  ❌ Failed after {max_retries} attempts')
                print(f'      Error: {e}')
                return None
    
    return None


def get_voice_info():
    """Get information about the configured voice"""
    return {
        'voice_id': ELEVENLABS_VOICE_ID,
        'api_key_set': bool(ELEVENLABS_API_KEY),
        'has_sdk': HAS_ELEVENLABS
    }

