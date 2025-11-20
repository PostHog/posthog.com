import base64
import io
import json
import os
import subprocess
import sys
from datetime import datetime

import boto3
import gspread
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.types import DialogueInput
from google.oauth2.service_account import Credentials
from structlog import get_logger

load_dotenv()
logger = get_logger(__name__)


GOOGLE_SHEETS_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
]

# s3
S3_BUCKET = os.getenv("S3_BUCKET")
S3_PREFIX = os.getenv("S3_PREFIX")

# google sheets
GOOGLE_SHEETS_SA = os.getenv("GOOGLE_SHEETS_SA")
GOOGLE_SHEET_ID = os.getenv("GOOGLE_SHEET_ID")
GOOGLE_SHEET_NAME = "Sheet2"
GOOGLE_SHEET_CELL = "B2"

# eleven labs voice ids
JAMES_VOICE_ID = os.getenv("JAMES_VOICE_ID")
MAX_VOICE_ID = os.getenv("MAX_VOICE_ID")


elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

s3_client = boto3.client(
  "s3",
  aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
  region_name=os.getenv("AWS_REGION", "us-east-1"),
)


def download_s3_static_files():
  assert S3_BUCKET is not None, "S3_BUCKET is not set"
  assert S3_PREFIX is not None, "S3_PREFIX is not set"
  if not os.path.exists("/tmp"):
    os.makedirs("/tmp", exist_ok=True)
  logger.info(f"Downloading files from s3://{S3_BUCKET}/{S3_PREFIX} to /tmp")
  paginator = s3_client.get_paginator("list_objects_v2")
  page_iterator = paginator.paginate(Bucket=S3_BUCKET, Prefix=S3_PREFIX)
  downloaded_count = 0
  for page in page_iterator:
    if "Contents" not in page:
      logger.info(f"No files found at s3://{S3_BUCKET}/{S3_PREFIX}")
      break
    for obj in page["Contents"]:
      s3_key = obj["Key"]
      relative_path = s3_key[len(S3_PREFIX) :].lstrip("/")
      local_file_path = os.path.join("/tmp", relative_path)
      logger.info(f"Downloading: {s3_key} -> {local_file_path}")
      s3_client.download_file(S3_BUCKET, s3_key, local_file_path)
      downloaded_count += 1
  logger.info(f"Download complete! {downloaded_count} files downloaded to /tmp")


def get_audio_duration(file_path: str):
  """Get the duration of an audio file in seconds using ffprobe."""
  command = [
    "ffprobe",
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    file_path,
  ]
  try:
    result = subprocess.run(command, check=True, capture_output=True, text=True)
    return float(result.stdout.strip())
  except (subprocess.CalledProcessError, ValueError) as e:
    logger.error(f"Error getting duration: {e}")
    sys.exit(1)


def merge_audio_files() -> None:
  intro_file = "/tmp/intro.mp3"
  main_file = "/tmp/body.mp3"
  outro_file = "/tmp/outro.mp3"
  intermediate_file = "/tmp/tmp.mp3"
  output_file = "/tmp/final-output.mp3"

  for file in [intro_file, main_file, outro_file]:
    if not os.path.exists(file):
      logger.error(f"Error: File not found: {file}")
      sys.exit(1)
  logger.info("Merging intro and main body...")
  intro_command = [
    "ffmpeg",
    "-i",
    intro_file,
    "-i",
    main_file,
    "-filter_complex",
    "[1]adelay=10000|10000[delayed];[0][delayed]amix=inputs=2:duration=longest:normalize=0",
    intermediate_file,
  ]
  subprocess.run(intro_command, check=True, capture_output=False)
  duration = get_audio_duration(intermediate_file)
  delay_ms = int((duration - 5) * 1000)
  outro_command = [
    "ffmpeg",
    "-i",
    intermediate_file,
    "-i",
    outro_file,
    "-filter_complex",
    f"[1]adelay={delay_ms}|{delay_ms}[delayed];[0][delayed]amix=inputs=2:duration=longest:normalize=0",
    output_file,
  ]
  subprocess.run(outro_command, check=True, capture_output=False)
  logger.info("Done merging audio...")


def fetch_dialogue_from_sheets():
  """Fetch dialogue text from Google Sheets."""
  assert GOOGLE_SHEETS_SA is not None, "GOOGLE_SHEETS_SA is not set"
  assert GOOGLE_SHEET_ID is not None, "GOOGLE_SHEET_ID is not set"
  decoded_creds_json = json.loads(base64.b64decode(GOOGLE_SHEETS_SA))
  creds = Credentials.from_service_account_info(decoded_creds_json, scopes=GOOGLE_SHEETS_SCOPES)
  client = gspread.authorize(creds)
  sheet = client.open_by_key(GOOGLE_SHEET_ID).worksheet(GOOGLE_SHEET_NAME)
  return sheet.acell(GOOGLE_SHEET_CELL).value


def parse_dialogue(text: str):
  """Parse dialogue text and generate audio streams."""
  assert JAMES_VOICE_ID is not None, "JAMES_VOICE_ID is not set"
  assert MAX_VOICE_ID is not None, "MAX_VOICE_ID is not set"
  lines = [line.strip() for line in text.split("\n") if line.strip()]
  for i, line in enumerate(lines):
    speaker = JAMES_VOICE_ID
    if i % 2 == 0:
      speaker = MAX_VOICE_ID
    inputs = [DialogueInput(text=line, voice_id=speaker)]
    yield elevenlabs.text_to_dialogue.stream(inputs=inputs, output_format="mp3_44100_32")


def write_audio_body_to_file(audio_generator):
  """Stream audio chunks directly to S3."""
  buffer = io.BytesIO()
  for i, line in enumerate(audio_generator):
    if (i + 1) % 5 == 0:
      logger.info(f"Writing audio: line {i + 1}...")
    for _, chunk in enumerate(line):
      if isinstance(chunk, bytes):
        buffer.write(chunk)
  buffer.seek(0)
  with open("/tmp/body.mp3", "wb") as f:
    f.write(buffer.read())
  logger.info("Wrote audio body content to file /tmp/body.mp3...")


def write_to_s3(file, bucket, key):
  logger.info(f"Writing {file} to s3...")
  with open(file, "rb") as f:
    s3_client.upload_fileobj(f, bucket, key)
  logger.info("Successfully uploaded to s3")


def main():
  assert S3_BUCKET is not None, "S3_BUCKET is not set"
  assert S3_PREFIX is not None, "S3_PREFIX is not set"
  logger.info("Fetching dialogue from Google Sheets...")
  dialogue_text = fetch_dialogue_from_sheets()
  if not dialogue_text:
    logger.info("No audio retrieved from sheets. Exiting.")
    return
  audio = parse_dialogue(dialogue_text)
  write_audio_body_to_file(audio)
  download_s3_static_files()
  merge_audio_files()
  key = f"changehog/{datetime.now().strftime('%GW%V')}.mp3"
  write_to_s3("/tmp/body.mp3", S3_BUCKET, key)
  write_to_s3("/tmp/final-output.mp3", S3_BUCKET, key)


if __name__ == "__main__":
  main()
