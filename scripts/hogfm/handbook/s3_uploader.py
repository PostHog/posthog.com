"""
Upload handbook audio files to S3
"""

import os
from pathlib import Path

# Try to import boto3, but allow operation without it
try:
    import boto3
    from botocore.exceptions import ClientError, NoCredentialsError
    HAS_BOTO3 = True
except ImportError:
    HAS_BOTO3 = False

# S3 Configuration
S3_BUCKET = os.environ.get('S3_BUCKET')
S3_REGION = os.environ.get('AWS_REGION')
S3_PREFIX = 'handbook/'  # Prefix for all audio files in the bucket


def check_s3_available():
    """Check if S3 upload is available"""
    if not HAS_BOTO3:
        return False, 'boto3 not installed. Run: uv sync'
    
    if not S3_BUCKET:
        return False, 'S3_BUCKET environment variable not set'
    
    if not S3_REGION:
        return False, 'AWS_REGION environment variable not set'
    
    # Check for AWS credentials
    try:
        session = boto3.Session()
        credentials = session.get_credentials()
        if not credentials:
            return False, 'AWS credentials not configured'
    except Exception as e:
        return False, f'AWS configuration error: {e}'
    
    return True, 'S3 ready'


def upload_to_s3(slug, audio_data, text_file_path=None, cost_file_path=None, dry_run=False):
    """
    Upload audio file and associated files to S3
    
    Args:
        slug: File slug (e.g., 'engineering/operations/on-call-rotation')
        audio_data: Binary audio data
        text_file_path: Path to the ElevenLabs input text file
        cost_file_path: Path to the cost metrics JSON file
        dry_run: If True, skip actual upload
    
    Returns:
        dict: URLs for uploaded files, or None on error
    """
    if dry_run:
        urls = {
            'audio': f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{S3_PREFIX}{slug}.mp3',
            'text': f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{S3_PREFIX}{slug}.elevenlabs-input.txt',
            'cost': f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{S3_PREFIX}{slug}.cost.json'
        }
        print(f'  ☁️  [DRY RUN] Would upload to S3:')
        print(f'      - s3://{S3_BUCKET}/{S3_PREFIX}{slug}.mp3')
        print(f'      - s3://{S3_BUCKET}/{S3_PREFIX}{slug}.elevenlabs-input.txt')
        print(f'      - s3://{S3_BUCKET}/{S3_PREFIX}{slug}.cost.json')
        return urls
    
    if not HAS_BOTO3:
        print('  ❌ boto3 not installed. Run: uv pip install boto3')
        return None
    
    try:
        s3_client = boto3.client('s3', region_name=S3_REGION)
        urls = {}
        
        # Upload audio file
        audio_key = f'{S3_PREFIX}{slug}.mp3'
        print(f'  ☁️  Uploading audio to S3: s3://{S3_BUCKET}/{audio_key}')
        
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=audio_key,
            Body=audio_data,
            ContentType='audio/mpeg',
            CacheControl='public, max-age=31536000',  # Cache for 1 year
            Metadata={
                'source': 'handbook-audio-generator',
                'slug': slug
            }
        )
        urls['audio'] = f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{audio_key}'
        print(f'      ✓ Audio uploaded')
        
        # Upload text file if provided
        if text_file_path and Path(text_file_path).exists():
            text_key = f'{S3_PREFIX}{slug}.elevenlabs-input.txt'
            with open(text_file_path, 'rb') as f:
                s3_client.put_object(
                    Bucket=S3_BUCKET,
                    Key=text_key,
                    Body=f.read(),
                    ContentType='text/plain',
                    CacheControl='public, max-age=31536000',
                    Metadata={
                        'source': 'handbook-audio-generator',
                        'slug': slug
                    }
                )
            urls['text'] = f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{text_key}'
            print(f'      ✓ Text file uploaded')
        
        # Upload cost file if provided
        if cost_file_path and Path(cost_file_path).exists():
            cost_key = f'{S3_PREFIX}{slug}.cost.json'
            with open(cost_file_path, 'rb') as f:
                s3_client.put_object(
                    Bucket=S3_BUCKET,
                    Key=cost_key,
                    Body=f.read(),
                    ContentType='application/json',
                    CacheControl='public, max-age=31536000',
                    Metadata={
                        'source': 'handbook-audio-generator',
                        'slug': slug
                    }
                )
            urls['cost'] = f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{cost_key}'
            print(f'      ✓ Cost file uploaded')
        
        return urls
        
    except NoCredentialsError:
        print('  ❌ AWS credentials not found')
        return None
    except ClientError as e:
        print(f'  ❌ S3 upload error: {e}')
        return None
    except Exception as e:
        print(f'  ❌ Unexpected error uploading to S3: {e}')
        return None


def download_text_from_s3(slug, dry_run=False):
    """
    Download the elevenlabs-input.txt file from S3 for comparison
    
    Args:
        slug: File slug (e.g., 'engineering/operations/on-call-rotation')
        dry_run: If True, simulate download
    
    Returns:
        str: Text content if file exists, None if not found or error
    """
    if dry_run:
        print(f'  🔍 [DRY RUN] Would check S3 for existing text: s3://{S3_BUCKET}/{S3_PREFIX}{slug}.elevenlabs-input.txt')
        return None  # In dry-run, assume no existing file (always generate)
    
    if not HAS_BOTO3:
        return None
    
    try:
        s3_client = boto3.client('s3', region_name=S3_REGION)
        text_key = f'{S3_PREFIX}{slug}.elevenlabs-input.txt'
        
        response = s3_client.get_object(Bucket=S3_BUCKET, Key=text_key)
        text_content = response['Body'].read().decode('utf-8')
        
        return text_content
        
    except ClientError as e:
        # File doesn't exist (404) - this is expected for first generation
        if e.response['Error']['Code'] == 'NoSuchKey':
            return None
        # Other errors
        print(f'  ⚠️  Error downloading from S3: {e}')
        return None
    except Exception as e:
        print(f'  ⚠️  Unexpected error downloading from S3: {e}')
        return None


def delete_from_s3(slug, dry_run=False):
    """
    Delete all files for a slug from S3 (audio, text, and cost files)
    
    Args:
        slug: File slug (e.g., 'engineering/operations/on-call-rotation')
        dry_run: If True, simulate deletion
    
    Returns:
        bool: True if successful, False on error
    """
    if dry_run:
        print(f'  🗑️  [DRY RUN] Would delete from S3:')
        print(f'      - s3://{S3_BUCKET}/{S3_PREFIX}{slug}.mp3')
        print(f'      - s3://{S3_BUCKET}/{S3_PREFIX}{slug}.elevenlabs-input.txt')
        print(f'      - s3://{S3_BUCKET}/{S3_PREFIX}{slug}.cost.json')
        return True
    
    if not HAS_BOTO3:
        print('  ❌ boto3 not installed. Run: uv pip install boto3')
        return False
    
    try:
        s3_client = boto3.client('s3', region_name=S3_REGION)
        
        # Define the keys to delete
        keys_to_delete = [
            f'{S3_PREFIX}{slug}.mp3',
            f'{S3_PREFIX}{slug}.elevenlabs-input.txt',
            f'{S3_PREFIX}{slug}.cost.json'
        ]
        
        deleted_count = 0
        for key in keys_to_delete:
            try:
                s3_client.delete_object(Bucket=S3_BUCKET, Key=key)
                deleted_count += 1
            except ClientError as e:
                # If file doesn't exist, that's fine
                if e.response['Error']['Code'] != 'NoSuchKey':
                    print(f'  ⚠️  Error deleting {key}: {e}')
        
        if deleted_count > 0:
            print(f'  🗑️  Deleted {deleted_count} file(s) from S3')
        
        return True
        
    except NoCredentialsError:
        print('  ❌ AWS credentials not found')
        return False
    except Exception as e:
        print(f'  ❌ Unexpected error deleting from S3: {e}')
        return False


def file_exists_in_s3(slug):
    """
    Check if a file already exists in S3
    
    Args:
        slug: File slug
    
    Returns:
        bool: True if file exists
    """
    if not HAS_BOTO3:
        return False
    
    try:
        s3_client = boto3.client('s3', region_name=S3_REGION)
        s3_key = f'{S3_PREFIX}{slug}.mp3'
        
        s3_client.head_object(Bucket=S3_BUCKET, Key=s3_key)
        return True
    except ClientError:
        return False
    except Exception:
        return False


def get_s3_url(slug):
    """Get the S3 URL for a given slug"""
    s3_key = f'{S3_PREFIX}{slug}.mp3'
    return f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{s3_key}'


def list_s3_files(prefix=''):
    """
    List all audio files in S3
    
    Args:
        prefix: Optional prefix to filter files
    
    Returns:
        list: List of S3 keys
    """
    if not HAS_BOTO3:
        print('❌ boto3 not installed')
        return []
    
    try:
        s3_client = boto3.client('s3', region_name=S3_REGION)
        
        full_prefix = f'{S3_PREFIX}{prefix}'
        response = s3_client.list_objects_v2(
            Bucket=S3_BUCKET,
            Prefix=full_prefix
        )
        
        if 'Contents' not in response:
            return []
        
        return [obj['Key'] for obj in response['Contents']]
        
    except Exception as e:
        print(f'❌ Error listing S3 files: {e}')
        return []

