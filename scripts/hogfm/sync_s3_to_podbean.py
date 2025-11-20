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
from datetime import datetime, timezone

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

            if ext == ".mp3":
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

    Filters episodes by checking if the ID in the content starts with the kind prefix.

    Returns a list of episode objects with title, status, etc.
    """
    import re

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

        # Filter episodes by checking if the ID in content starts with the kind
        filtered_batch = []
        for episode in batch:
            content = episode.get("content", "")
            match = re.search(r"ID: ([^\s<]+)", content)

            if match:
                episode_id = match.group(1)
                if episode_id.startswith(kind):
                    filtered_batch.append(episode)

        episodes.extend(filtered_batch)

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


def delete_episode(token: str, episode_id: str) -> None:
    """
    Delete an episode from Podbean.

    Args:
        token: Podbean access token
        episode_id: The ID of the episode to delete
    """
    url = f"https://api.podbean.com/v1/episodes/{episode_id}/delete"
    headers = {"Authorization": f"Bearer {token}"}

    r = requests.post(url, headers=headers)
    r.raise_for_status()


def save_episode(
    token: str,
    title: str,
    content: str = "",
    status: str = "publish",
    episode_type: str = "public",
    file_key: Optional[str] = None,
    episode_id: Optional[str] = None,
) -> dict:
    """
    Create or update an episode on Podbean.

    Args:
        token: Podbean access token
        title: Episode title
        content: Episode description/show notes (HTML allowed)
        status: 'publish', 'draft', or 'scheduled'
        episode_type: 'public', 'premium', or 'private'
        file_key: The file key from upload (required for create, optional for update)
        episode_id: The ID of the episode to update (None for create)

    Returns the episode data.
    """
    if episode_id:
        url = f"https://api.podbean.com/v1/episodes/{episode_id}"
    else:
        url = "https://api.podbean.com/v1/episodes"

    headers = {"Authorization": f"Bearer {token}"}

    data = {
        "title": title,
        "content": content,
        "status": status,
        "type": episode_type,
    }

    if file_key:
        data["media_key"] = file_key

    r = requests.post(url, headers=headers, data=data)
    r.raise_for_status()
    return r.json()


def download_s3_file(s3_key: str, local_path: str):
    """Download a file from S3 to local path."""
    s3 = boto3.client("s3", region_name=AWS_REGION)
    s3.download_file(S3_BUCKET, s3_key, local_path)


def parse_timestamp(timestamp_str: str) -> datetime:
    """
    Parse a timestamp string to datetime object.

    Handles both ISO format (from S3) and Unix timestamps (from Podbean).
    """
    # Try parsing as ISO format first
    try:
        # Remove timezone info for comparison (S3 returns UTC)
        if timestamp_str.endswith('Z'):
            timestamp_str = timestamp_str[:-1] + '+00:00'
        return datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
    except (ValueError, AttributeError):
        pass

    # Try parsing as Unix timestamp (Podbean returns this)
    try:
        return datetime.fromtimestamp(int(timestamp_str), tz=timezone.utc)
    except (ValueError, TypeError):
        pass

    # Return epoch if we can't parse
    return datetime.fromtimestamp(0, tz=timezone.utc)


def is_s3_newer(s3_file: dict, episode: dict) -> bool:
    """
    Check if the S3 file is newer than the Podbean episode.

    Returns True if S3 file should replace the episode.
    """
    s3_time = parse_timestamp(s3_file["last_modified"])

    # Podbean uses 'publish_time' or 'update_time'
    episode_time_str = episode.get("update_time") or episode.get("publish_time")
    if not episode_time_str:
        return True  # No timestamp on episode, assume we should update

    episode_time = parse_timestamp(str(episode_time_str))

    return s3_time > episode_time




def find_matching_episode(s3_key: str, episodes: list[dict]) -> Optional[dict]:
    """
    Find a Podbean episode that matches the given S3 key.

    Matches by checking for the ID code in the episode content.
    """
    key_path = s3_key.replace(".mp3", "")

    for episode in episodes:
        content = episode.get("content", "")
        # Check if the ID code appears in the content
        if f"ID: {key_path}" in content:
            return episode

    return None


def extract_s3_key_from_episode(episode: dict) -> Optional[str]:
    """
    Extract the S3 key from an episode's content.

    Looks for the ID code pattern in the content.
    """
    import re
    content = episode.get("content", "")
    match = re.search(r"ID: ([^\s<]+)", content)
    if match:
        return match.group(1)
    return None


def generate_episode_metadata(s3_key: str, kind: str) -> tuple[str, str]:
    """
    Generate title and content for an episode based on S3 key.

    Returns (title, content) tuple.
    """
    key_path = s3_key.replace(".mp3", "")

    # Get the chapter name from the S3 key like handbook/engineering/deployments-support.mp3...
    # becomes "Handbook | Engineering | Deployments Support"
    title = key_path.replace("/", " | ").replace("-", " ").replace("_", " ").strip().title()

    if kind == "handbook":
        content = f"""<p>AI generated audio for the '{title}' chapter of the PostHog handbook.</p>
                    <p>Read more about it at <a href="https://posthog.com/{key_path}">https://posthog.com/{key_path}</a></p>
                    <p><code>ID: {key_path}</code></p>"""
    elif kind == "changehog":
        content = f"""<p>AI generated audio for the changes to the PostHog handbook</p>
                    <p>Find the full handbook here: <a href="https://posthog.com/handbook">https://posthog.com/handbook</a></p>
                    <p><code>ID: {key_path}</code></p>"""
    else:
        raise NotImplementedError(f"Invalid kind: {kind}")
    return title, content


def needs_metadata_update(episode: dict, title: str, content: str) -> bool:
    """
    Check if the episode metadata differs from the expected title/content.

    Returns True if the episode needs to be updated.
    """
    existing_title = episode.get("title", "")
    existing_content = episode.get("content", "")

    return existing_title != title or existing_content != content


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

    # Find files that need to be synced or updated
    to_create = []
    to_update_audio = []  # Need to upload new audio
    to_update_metadata = []  # Only need to update title/content
    up_to_date = []
    to_delete = []  # Episodes without corresponding S3 files

    # Build set of key paths (without extension) for quick lookup
    key_paths = {s3_file["key"].replace(".mp3", "") for s3_file in s3_files}

    for s3_file in s3_files:
        s3_key = s3_file["key"]
        match = find_matching_episode(s3_key, episodes)

        if match:
            title, content = generate_episode_metadata(s3_key, kind)
            audio_changed = is_s3_newer(s3_file, match)
            metadata_changed = needs_metadata_update(match, title, content)

            if audio_changed:
                to_update_audio.append((s3_file, match))
            elif metadata_changed:
                to_update_metadata.append((s3_file, match))
            else:
                up_to_date.append((s3_file, match))
        else:
            to_create.append(s3_file)

    # Find orphaned episodes (have ID but no corresponding S3 file)
    for episode in episodes:
        episode_key_path = extract_s3_key_from_episode(episode)
        # Only delete if the ID starts with the kind we're syncing
        if episode_key_path and episode_key_path.startswith(kind) and episode_key_path not in key_paths:
            print(f"Deleting episode: {episode['title']}")
            to_delete.append(episode)

    # Report status
    if up_to_date:
        print(f"Up to date ({len(up_to_date)}):")
        for s3_file, episode in up_to_date:
            print(f"   - {s3_file['filename']} -> {episode['title']}")
        print()

    if to_update_audio:
        print(f"To update (audio changed) ({len(to_update_audio)}):")
        for s3_file, episode in to_update_audio:
            size_mb = s3_file["size"] / (1024 * 1024)
            print(f"   - {s3_file['filename']} ({size_mb:.1f} MB) -> {episode['title']}")
        print()

    if to_update_metadata:
        print(f"To update (metadata only) ({len(to_update_metadata)}):")
        for s3_file, episode in to_update_metadata:
            print(f"   - {s3_file['filename']} -> {episode['title']}")
        print()

    if to_create:
        print(f"To create ({len(to_create)}):")
        for s3_file in to_create:
            size_mb = s3_file["size"] / (1024 * 1024)
            print(f"   - {s3_file['filename']} ({size_mb:.1f} MB)")
        print()

    if to_delete:
        print(f"To delete (no S3 file) ({len(to_delete)}):")
        for episode in to_delete:
            print(f"   - {episode['title']}")
        print()

    if not to_create and not to_update_audio and not to_update_metadata and not to_delete:
        print("All files are already synced and up to date!")
        return

    # Get token for uploads
    token = get_access_token()

    # Combine operations: (s3_file, episode_id or None, operation_type)
    # operation_type: 'create', 'update_audio', 'update_metadata'
    operations = [(s3_file, None, 'create') for s3_file in to_create]
    operations += [(s3_file, episode.get("id"), 'update_audio') for s3_file, episode in to_update_audio]
    operations += [(s3_file, episode.get("id"), 'update_metadata') for s3_file, episode in to_update_metadata]

    for i, (s3_file, episode_id, operation_type) in enumerate(operations, 1):
        filename = s3_file["filename"]
        s3_key = s3_file["key"]
        filesize = s3_file["size"]

        title, content = generate_episode_metadata(s3_key, kind)
        key_path = s3_key.replace(".mp3", "")

        if operation_type == 'create':
            action = "Creating"
        elif operation_type == 'update_audio':
            action = "Updating (audio)"
        else:
            action = "Updating (metadata)"

        print(f"[{i}/{len(operations)}] {action} {filename}...")

        if dry_run:
            print(f"   Dry run. Would have {action.lower()} {key_path} on Podbean.")
            if episode_id:
                print(f"   Episode ID: {episode_id}")
            print(f"   Title: {title}")
            print(f"   Content: {content}")
            print(f"   Publish status: {publish_status}")
            print()
            continue

        try:
            file_key = None

            # Only upload audio for create and update_audio operations
            if operation_type in ('create', 'update_audio'):
                # Create temp file for download
                with tempfile.NamedTemporaryFile(suffix=Path(filename).suffix, delete=False) as tmp:
                    tmp_path = tmp.name

                # Download from S3
                print(f"   Downloading from S3...")
                download_s3_file(s3_key, tmp_path)

                # Get presigned URL
                print(f"   Getting upload authorization...")
                auth = get_presigned_upload_url(token, filename, filesize)

                # Upload to Podbean
                print(f"   Uploading to Podbean...")
                upload_file_to_presigned_url(auth["presigned_url"], tmp_path)

                file_key = auth["file_key"]

                # Clean up temp file
                os.remove(tmp_path)

            # Publish or update episode
            action_verb = "Publishing" if operation_type == 'create' else "Updating"
            print(f"   {action_verb} episode: {title}")

            episode = save_episode(
                token=token,
                title=title,
                content=content,
                status=publish_status,
                file_key=file_key,
                episode_id=episode_id,
            )

            result_verb = "Published" if operation_type == 'create' else "Updated"
            print(f"   {result_verb}: {episode.get('episode', {}).get('permalink_url', 'N/A')}")

        except Exception as e:
            print(f"   Error: {e}")
            raise

        print()

    # Delete orphaned episodes
    for i, episode in enumerate(to_delete, 1):
        episode_id = episode.get("id")
        episode_title = episode.get("title", "Unknown")

        print(f"[{i}/{len(to_delete)}] Deleting {episode_title}...")

        if dry_run:
            print(f"   Dry run. Would have deleted episode {episode_id}.")
            print()
            continue

        try:
            delete_episode(token, episode_id)
            print(f"   Deleted.")
        except Exception as e:
            print(f"   Error: {e}")
            raise

        print()

    print("Sync complete!")


def main():
    parser = argparse.ArgumentParser(
        description="Sync podcast episodes from S3 to Podbean"
    )
    parser.add_argument(
        "--kind",
        choices=["handbook", "changehog"],
        required=True,
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
        required=True,
        help="Status for new episodes (default: draft)",
    )

    args = parser.parse_args()

    sync_episodes(dry_run=args.dry_run, publish_status=args.status, kind=args.kind)


if __name__ == "__main__":
    main()
