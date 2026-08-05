# S3 Upload Setup Guide

This guide explains how to configure and use S3 uploads for handbook audio files.

## Overview

The handbook audio generator can automatically upload generated MP3 files to Amazon S3, maintaining the same directory structure as the handbook itself.

## File Structure

Files are uploaded to S3 with the following structure:

```
s3://your-bucket/handbook-audio/
├── values.mp3
├── story.mp3
├── product/
│   ├── releasing-new-products-and-features.mp3
│   ├── metrics.mp3
│   └── product-team.mp3
├── engineering/
│   ├── posthog-com/
│   │   ├── markdown.mp3
│   │   └── product-comparisons.mp3
│   └── operations/
│       └── support-hero.mp3
├── people/
│   ├── benefits.mp3
│   └── hiring-process/
│       └── index.mp3
└── ...
```

This structure:
- ✅ Mirrors the handbook directory structure
- ✅ Makes it easy to generate URLs programmatically
- ✅ Keeps files organized by section
- ✅ Allows for easy CDN integration

## Prerequisites

### 1. Install dependencies

```bash
cd scripts/hogfm
uv sync
```

### 2. Create S3 Bucket

Create an S3 bucket for handbook audio files:

```bash
aws s3 mb s3://posthog-handbook-audio --region us-east-1
```

### 3. Configure Bucket Policy (Optional)

If you want files to be publicly accessible, add a bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::posthog-handbook-audio/handbook-audio/*"
    }
  ]
}
```

### 4. Configure AWS Credentials

**Option A: AWS CLI (Recommended)**
```bash
aws configure
```

**Option B: Environment Variables**
```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=us-east-1
```

**Option C: IAM Role (for EC2/ECS)**
- No configuration needed if running on AWS with an IAM role

### 5. Set Environment Variables

Add to your `.env` file in `scripts/hogfm/.env`:

```bash
# Required for S3 uploads
S3_BUCKET=your-bucket-name
AWS_REGION=your-aws-region
```

## Usage

### Single File Upload

```bash
# Generate and upload a single file
uv run handbook-audio --upload-s3 contents/handbook/values.md
```

### Batch Upload

```bash
# Generate and upload all files
uv run handbook-audio --all --upload-s3

# Generate and upload files matching a pattern
uv run handbook-audio --search "engineering" --upload-s3
```

### Dry Run (Test Without Uploading)

```bash
# Test S3 upload without actually uploading
uv run handbook-audio --dry-run --upload-s3 contents/handbook/values.md
```

## Generated URLs

Files are uploaded with the following URL pattern:

```
https://{bucket}.s3.{region}.amazonaws.com/handbook-audio/{slug}.mp3
```

**Examples:**
- `https://posthog-handbook-audio.s3.us-east-1.amazonaws.com/handbook-audio/values.mp3`
- `https://posthog-handbook-audio.s3.us-east-1.amazonaws.com/handbook-audio/product/releasing-new-products-and-features.mp3`
- `https://posthog-handbook-audio.s3.us-east-1.amazonaws.com/handbook-audio/engineering/posthog-com/markdown.mp3`

## CDN Integration

### CloudFront Setup (Optional)

For better performance and lower costs, you can add CloudFront:

1. Create a CloudFront distribution pointing to your S3 bucket
2. Update your application to use CloudFront URLs instead of S3 URLs

**Example CloudFront URL:**
```
https://d123456789.cloudfront.net/handbook-audio/values.mp3
```

## Programmatic Access

### Get URL for a Handbook Page

```python
from s3_uploader import get_s3_url

# For handbook page: contents/handbook/product/releasing-new-products-and-features.md
slug = "product/releasing-new-products-and-features"
url = get_s3_url(slug)
# Returns: https://posthog-handbook-audio.s3.us-east-1.amazonaws.com/handbook-audio/product/releasing-new-products-and-features.mp3
```

### Check if File Exists

```python
from s3_uploader import file_exists_in_s3

slug = "product/releasing-new-products-and-features"
if file_exists_in_s3(slug):
    print("Audio file exists in S3")
```

### List All Files

```python
from s3_uploader import list_s3_files

# List all files
all_files = list_s3_files()

# List files in a specific section
engineering_files = list_s3_files(prefix="engineering/")
```

## Cache Control

Files are uploaded with the following cache headers:

```
Cache-Control: public, max-age=31536000
```

This means:
- Files are cached for 1 year (31536000 seconds)
- If you update a file, the URL remains the same
- Consider adding versioning or cache busting if needed

## Metadata

Each uploaded file includes metadata:

```python
{
    "source": "handbook-audio-generator",
    "slug": "product/releasing-new-products-and-features"
}
```

## Troubleshooting

### "boto3 not installed"
```bash
cd scripts/hogfm
uv sync
```

### "AWS credentials not found"
```bash
aws configure
# OR
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
```

### "Access Denied"
- Check your IAM permissions include `s3:PutObject` and `s3:GetObject`
- Verify the bucket name is correct
- Ensure the bucket exists in the specified region

### "Bucket does not exist"
```bash
aws s3 mb s3://posthog-handbook-audio --region us-east-1
```

## Cost Estimation

**S3 Storage:**
- ~265 handbook files
- Average file size: ~5 MB (varies by length)
- Total storage: ~1.3 GB
- Cost: ~$0.03/month (S3 Standard)

**S3 Transfer:**
- PUT requests: $0.005 per 1,000 requests
- GET requests: $0.0004 per 1,000 requests
- Data transfer out: $0.09/GB (first 10 TB)

**Estimated monthly cost:** < $1 for typical usage

## Best Practices

1. **Use CloudFront** - Reduces S3 costs and improves performance
2. **Enable versioning** - Protects against accidental overwrites
3. **Set lifecycle policies** - Archive old versions to Glacier
4. **Monitor costs** - Set up AWS Budgets alerts
5. **Use IAM roles** - More secure than access keys when possible

## Integration with Website

To integrate audio files into the website:

```typescript
// Get audio URL for a handbook page
function getHandbookAudioUrl(slug: string): string {
  const bucket = process.env.S3_BUCKET
  const region = process.env.AWS_REGION || 'us-east-1'
  return `https://${bucket}.s3.${region}.amazonaws.com/handbook-audio/${slug}.mp3`
}

// Example usage
const audioUrl = getHandbookAudioUrl('product/releasing-new-products-and-features')
// Returns: https://posthog-handbook-audio.s3.us-east-1.amazonaws.com/handbook-audio/product/releasing-new-products-and-features.mp3
```

## Security Considerations

1. **Public vs Private:** Decide if audio files should be public or require authentication
2. **Signed URLs:** For private files, use pre-signed URLs with expiration
3. **CORS:** Configure CORS if accessing from a different domain
4. **Encryption:** Enable S3 encryption at rest (AES-256 or KMS)

## Next Steps

1. Set up the S3 bucket
2. Configure AWS credentials
3. Test with a single file using `--dry-run --upload-s3`
4. Generate and upload all files with `--all --upload-s3`
5. Integrate audio URLs into the website
6. (Optional) Set up CloudFront for better performance

