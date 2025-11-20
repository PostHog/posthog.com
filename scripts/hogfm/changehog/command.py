import io
import os
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

# google sheets
GOOGLE_CREDENTIALS_FILE = os.getenv("GOOGLE_CREDENTIALS_FILE")
GOOGLE_SHEET_ID = os.getenv("GOOGLE_SHEET_ID")
GOOGLE_SHEET_NAME = "Sheet1"
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


def fetch_dialogue_from_sheets():
  """Fetch dialogue text from Google Sheets."""
  assert GOOGLE_SHEET_ID is not None, "GOOGLE_SHEET_ID is not set"
  creds = Credentials.from_service_account_file(GOOGLE_CREDENTIALS_FILE, scopes=GOOGLE_SHEETS_SCOPES)
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


def stream_to_s3(audio_generator, bucket: str, key: str):
  """Stream audio chunks directly to S3."""
  buffer = io.BytesIO()
  for i, line in enumerate(audio_generator):
    for j, chunk in enumerate(line):
      if isinstance(chunk, bytes):
        logger.info(f"Writing audio chunk line {i + 1}, chunk{j + 1} to buffer")
        buffer.write(chunk)
  buffer.seek(0)
  logger.info(f"\nUploading to s3://{bucket}/{key}...")
  s3_client.upload_fileobj(buffer, bucket, key)
  logger.info(f"Successfully uploaded to s3://{bucket}/{key}")


def main():
  assert S3_BUCKET is not None, "S3_BUCKET is not set"
  logger.info("Fetching dialogue from Google Sheets...")
  dialogue_text = fetch_dialogue_from_sheets()
  if not dialogue_text:
    logger.info("No audio retrieved from sheets. Exiting.")
    return
  audio = parse_dialogue(dialogue_text)
  key = f"{datetime.now().strftime('%GW%V')}/output.mp3"
  stream_to_s3(audio, S3_BUCKET, key)


if __name__ == "__main__":
  main()
