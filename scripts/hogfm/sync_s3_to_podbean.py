#!/usr/bin/env python3
"""
Sync podcast episodes from S3 to Podbean.

This script:
1. Lists audio files in an S3 bucket/prefix
2. Gets existing episodes from Podbean
3. Uploads any new files that aren't already published

Usage:
    uv run python sync_s3_to_podbean.py
    uv run python sync_s3_to_podbean.py --dry-run
    uv run python sync_s3_to_podbean.py --status publish
"""

import os
import sys
import tempfile
import argparse
from pathlib import Path
from typing import Optional

import boto3
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Podbean API credentials
PODBEAN_CLIENT_ID = os.getenv("PODBEAN_CLIENT_ID")
PODBEAN_CLIENT_SECRET = os.getenv("PODBEAN_CLIENT_SECRET")

# S3 configuration
S3_BUCKET = os.getenv("S3_BUCKET")

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")

# Supported audio extensions
AUDIO_EXTENSIONS = {".mp3", ".m4a", ".wav", ".ogg", ".flac", ".aac"}


def get_access_token() -> str:
    """Get OAuth2 access token from Podbean."""
    url = "https://api.podbean.com/v1/oauth/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": PODBEAN_CLIENT_ID,
        "client_secret": PODBEAN_CLIENT_SECRET,
    }

    r = requests.post(url, data=data)
    r.raise_for_status()
    return r.json()["access_token"]


def list_s3_audio_files(prefix: str) -> list[dict]:
    """
    List all audio files in the S3 bucket/prefix.

    Returns a list of dicts with 'key', 'size', 'last_modified', and 'filename'.
    """
    s3 = boto3.client("s3", region_name=AWS_REGION)

    files = []
    paginator = s3.get_paginator("list_objects_v2")

    prefix = prefix.strip("/") + "/" if prefix else ""

    for page in paginator.paginate(Bucket=S3_BUCKET, Prefix=prefix):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            filename = Path(key).name
            ext = Path(filename).suffix.lower()

            if ext in AUDIO_EXTENSIONS:
                files.append({
                    "key": key,
                    "filename": filename,
                    "size": obj["Size"],
                    "last_modified": obj["LastModified"].isoformat(),
                })

    return files


def get_podbean_episodes(kind: str) -> list[dict]:
    """
    Get all existing episodes from Podbean.

    Returns a list of episode objects with title, status, etc.
    """
    token = get_access_token()
    url = "https://api.podbean.com/v1/episodes"
    headers = {"Authorization": f"Bearer {token}"}

    episodes = []
    offset = 0
    limit = 100

    while True:
        params = {"offset": offset, "limit": limit}
        r = requests.get(url, headers=headers, params=params)
        r.raise_for_status()

        data = r.json()
        batch = data.get("episodes", [])

        # filter for the episode title to contain the kind
        batch = [episode for episode in batch if episode.get("title", "").lower().startswith(kind.lower())]
        episodes.extend(batch)

        if len(batch) < limit:
            break
        offset += limit

    return episodes


def get_presigned_upload_url(token: str, filename: str, filesize: int, content_type: str = "audio/mpeg") -> dict:
    """
    Get a presigned URL for uploading to Podbean.

    Returns dict with 'presigned_url' and 'file_key'.
    """
    url = "https://api.podbean.com/v1/files/uploadAuthorize"
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "filename": filename,
        "filesize": filesize,
        "content_type": content_type,
    }

    r = requests.get(url, headers=headers, params=params)
    r.raise_for_status()
    return r.json()


def upload_file_to_presigned_url(presigned_url: str, file_path: str, content_type: str = "audio/mpeg"):
    """Upload a file to Podbean's presigned URL."""
    with open(file_path, "rb") as f:
        headers = {"Content-Type": content_type}
        r = requests.put(presigned_url, data=f, headers=headers)
        r.raise_for_status()


def publish_episode(
    token: str,
    file_key: str,
    title: str,
    content: str = "",
    status: str = "publish",
    episode_type: str = "public",
) -> dict:
    """
    Publish an episode to Podbean.

    Args:
        token: Podbean access token
        file_key: The file key from upload
        title: Episode title
        content: Episode description/show notes (HTML allowed)
        status: 'publish', 'draft', or 'scheduled'
        episode_type: 'public', 'premium', or 'private'

    Returns the created episode data.
    """
    url = "https://api.podbean.com/v1/episodes"
    headers = {"Authorization": f"Bearer {token}"}

    data = {
        "title": title,
        "content": content,
        "status": status,
        "type": episode_type,
        "media_key": file_key,
    }

    r = requests.post(url, headers=headers, data=data)
    r.raise_for_status()
    return r.json()


def download_s3_file(s3_key: str, local_path: str):
    """Download a file from S3 to local path."""
    s3 = boto3.client("s3", region_name=AWS_REGION)
    s3.download_file(S3_BUCKET, s3_key, local_path)


def get_content_type(filename: str) -> str:
    """Get content type based on file extension."""
    ext = Path(filename).suffix.lower()
    content_types = {
        ".mp3": "audio/mpeg",
        ".m4a": "audio/mp4",
        ".wav": "audio/wav",
        ".ogg": "audio/ogg",
        ".flac": "audio/flac",
        ".aac": "audio/aac",
    }
    return content_types.get(ext, "audio/mpeg")




def find_matching_episode(filename: str, episodes: list[dict]) -> Optional[dict]:
    """
    Find a Podbean episode that matches the given filename.

    Matches by checking if the filename (without extension) appears in the episode title,
    or if the episode title appears in the filename.
    """
    name_stem = Path(filename).stem.lower()

    for episode in episodes:
        title = episode.get("title", "").lower()
        # Check both directions for flexibility
        if name_stem in title or title in name_stem:
            return episode
        # Also check if the title matches when normalized
        title_normalized = title.replace(" ", "-").replace("_", "-")
        name_normalized = name_stem.replace(" ", "-").replace("_", "-")
        if title_normalized == name_normalized:
            return episode

    return None


def sync_episodes(dry_run: bool = False, publish_status: str = "draft", kind: str = "handbook"):
    """
    Main sync function.

    Args:
        dry_run: If True, don't actually upload anything
        publish_status: Status for new episodes ('publish', 'draft', 'scheduled')
    """
    print("Podbean S3 Sync")
    print("=" * 50)

    # Validate configuration
    if not all([PODBEAN_CLIENT_ID, PODBEAN_CLIENT_SECRET]):
        print("Error: PODBEAN_CLIENT_ID and PODBEAN_CLIENT_SECRET must be set")
        sys.exit(1)

    if not S3_BUCKET:
        print("Error: S3_BUCKET must be set")
        sys.exit(1)

    print(f"S3 Bucket: {S3_BUCKET}")
    print(f"S3 folder: {kind}")
    print(f"Publish status: {publish_status}")
    if dry_run:
        print("DRY RUN - no changes will be made")
    print()

    # Get S3 files
    print("Listing S3 audio files...")
    s3_files = list_s3_audio_files(kind)
    print(f"   Found {len(s3_files)} audio file(s)")

    if not s3_files:
        print("No audio files found in S3. Nothing to sync.")
        return

    # Get Podbean episodes
    print("Fetching Podbean episodes...")
    episodes = get_podbean_episodes(kind)
    print(f"   Found {len(episodes)} existing episode(s)")
    print()

    # Find files that need to be synced
    to_sync = []
    already_exists = []

    for s3_file in s3_files:
        filename = s3_file["filename"]
        match = find_matching_episode(filename, episodes)

        if match:
            already_exists.append((s3_file, match))
        else:
            to_sync.append(s3_file)

    # Report status
    if already_exists:
        print(f"Already synced ({len(already_exists)}):")
        for s3_file, episode in already_exists:
            print(f"   - {s3_file['filename']} -> {episode['title']}")
        print()

    if not to_sync:
        print("All files are already synced!")
        return

    print(f"To sync ({len(to_sync)}):")
    for s3_file in to_sync:
        size_mb = s3_file["size"] / (1024 * 1024)
        print(f"   - {s3_file['filename']} ({size_mb:.1f} MB)")
    print()

    # Get token for uploads
    token = get_access_token()

    # Sync each file
    for i, s3_file in enumerate(to_sync, 1):
        filename = s3_file["filename"]
        s3_key = s3_file["key"]
        filesize = s3_file["size"]

        key_path = s3_key.replace(".mp3", "")

        # Get the chapter name from the S3 key like handbook/engineering/deployments-support.mp3...
        # becomes "Handbook | Engineering | Deployments Support"
        title = key_path.replace("/", " | ").replace("-", " ").replace("_", " ").strip().title()
        content = f"AI generated audio for the '{title}' chapter of the PostHog {kind.capitalize()}. Read more about it at https://posthog.com/{key_path}"

        if dry_run:
            print(f"Dry run. Would have uploaded {key_path} to Podbean.")
            print(f"   Title: {title}")
            print(f"   Content: {content}")
            print(f"   Publish status: {publish_status}")
            continue

        try:
            # Create temp file for download
            with tempfile.NamedTemporaryFile(suffix=Path(filename).suffix, delete=False) as tmp:
                tmp_path = tmp.name

            # Download from S3
            print(f"   Downloading from S3...")
            download_s3_file(s3_key, tmp_path)

            # Get presigned URL
            content_type = get_content_type(filename)
            print(f"   Getting upload authorization...")
            auth = get_presigned_upload_url(token, filename, filesize, content_type)

            # Upload to Podbean
            print(f"   Uploading to Podbean...")
            upload_file_to_presigned_url(auth["presigned_url"], tmp_path, content_type)

            # Publish episode

            print(f"   Publishing episode: {title}")
            episode = publish_episode(
                token=token,
                file_key=auth["file_key"],
                title=title,
                content=content,
                status=publish_status,
            )

            print(f"   Published: {episode.get('episode', {}).get('permalink_url', 'N/A')}")

        except Exception as e:
            print(f"   Error: {e}")
            raise

        finally:
            # Clean up temp file
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

        print()

    print("Sync complete!")


def main():
    parser = argparse.ArgumentParser(
        description="Sync podcast episodes from S3 to Podbean"
    )
    parser.add_argument(
        "--kind",
        default="handbook",
        choices=["handbook", "changelog"],
        help="Kind of content to sync (default: handbook)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be synced without actually uploading",
    )
    parser.add_argument(
        "--status",
        choices=["publish", "draft", "scheduled"],
        default="draft",
        help="Status for new episodes (default: draft)",
    )

    args = parser.parse_args()

    sync_episodes(dry_run=args.dry_run, publish_status=args.status, kind=args.kind)


if __name__ == "__main__":
    main()
