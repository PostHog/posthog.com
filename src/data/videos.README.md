# Video Library Data

This directory contains the video library data structure for PostHog's video library at `/videos`.

## Files

- **`videos.ts`** - Source of truth for video data. Manually maintained list of videos.
- **`public/videos-metadata.json`** - Auto-generated file with enriched metadata (thumbnails, titles) from YouTube and Wistia APIs. Created at build time and served as a static asset.

## How It Works

### Build Time Enrichment

During the Gatsby build (`onPreBootstrap` hook), the system:

1. Reads the base video data from `videos.ts`
2. Fetches metadata from video APIs:
   - **Wistia**: Uses the oEmbed API to get thumbnails and titles (no API key needed)
   - **YouTube**: Uses predictable thumbnail URLs (e.g., `https://img.youtube.com/vi/{videoId}/maxresdefault.jpg`)
   - **YouTube Titles** (optional): Fetches from YouTube Data API v3 if `YOUTUBE_API_KEY` env var is set
3. Writes enriched data to `public/videos-metadata.json` (served as a static asset)

### Runtime Usage

The `useVideos()` hook:
- Fetches enriched data from `/videos-metadata.json` (static asset)
- Starts with base `videos.ts` data, then upgrades to enriched data when loaded
- Gracefully falls back to base data if fetch fails
- Used by `/videos` (library page) and `/videos/play` (player page)

### Why public/ Directory?

Writing to `public/` ensures the file is:
- ✅ Served as a static asset on Vercel/CDN
- ✅ Available at `/videos-metadata.json` URL
- ✅ Cached and served efficiently
- ✅ No webpack bundling issues or timing concerns

## Adding New Videos

1. Add video metadata to the `videos` array in `videos.ts`:

```typescript
{
    source: 'youtube' | 'wistia',
    videoId: 'abc123',
    title: 'My Video Title',  // Fallback title
    folder: 'products',       // Folder/category name
    tags: ['demo', 'tutorial'] // Optional tags
}
```

2. Run a build - thumbnails and titles will be automatically fetched from the video platform APIs

## Environment Variables

- **`YOUTUBE_API_KEY`** (optional): Enables fetching video titles from YouTube Data API v3
  - Without this, YouTube videos will use manually-entered titles from `videos.ts`
  - Thumbnails work without an API key

## Folder Organization

Videos are automatically grouped by the `folder` field into accordion sections on the `/videos` page.

Current folders:
- `products` - Product demos and tutorials
- `changelog` - Changelog videos
- (Add more as needed)
