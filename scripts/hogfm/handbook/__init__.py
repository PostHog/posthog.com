"""
Handbook Audio Generation Module

Generate audio versions of PostHog handbook pages using ElevenLabs API.
"""

from .markdown_processor import process_markdown_file
from .elevenlabs_client import generate_audio, check_api_available
from .audio_saver import save_audio_file, save_text_file, save_cost_file
from .s3_uploader import upload_to_s3, check_s3_available, download_text_from_s3, delete_from_s3
from .file_selector import (
    find_all_handbook_files,
    find_handbook_file_by_pattern,
    find_handbook_files_in_directory
)

__all__ = [
    "process_markdown_file",
    "generate_audio",
    "check_api_available",
    "save_audio_file",
    "save_text_file",
    "save_cost_file",
    "upload_to_s3",
    "check_s3_available",
    "download_text_from_s3",
    "delete_from_s3",
    "find_all_handbook_files",
    "find_handbook_file_by_pattern",
    "find_handbook_files_in_directory",
]

