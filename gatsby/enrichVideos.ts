import fs from 'fs/promises'
import path from 'path'
import { videos } from '../src/data/videos'

interface VideoMetadata {
    thumbnail: string
    title: string
}

/**
 * Fetch video metadata from Wistia's oEmbed API
 */
async function fetchWistiaMetadata(videoId: string): Promise<VideoMetadata | null> {
    try {
        const url = `https://fast.wistia.com/oembed?url=https://home.wistia.com/medias/${videoId}`
        const response = await fetch(url)
        if (!response.ok) {
            console.warn(`Failed to fetch Wistia metadata for ${videoId}`)
            return null
        }
        const data = await response.json()
        return {
            thumbnail: data.thumbnail_url || '',
            title: data.title || '',
        }
    } catch (error) {
        console.warn(`Error fetching Wistia metadata for ${videoId}:`, error)
        return null
    }
}

/**
 * Get YouTube thumbnail URL (no API needed)
 * YouTube thumbnails follow a predictable pattern
 */
function getYouTubeThumbnail(videoId: string): string {
    // Try maxresdefault first (1920x1080), fallback to hqdefault (480x360)
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

/**
 * Fetch video title from YouTube Data API v3
 * Requires YOUTUBE_API_KEY environment variable
 */
async function fetchYouTubeTitle(videoId: string): Promise<string | null> {
    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) {
        console.warn('YOUTUBE_API_KEY not set, skipping YouTube title fetch')
        return null
    }

    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        const response = await fetch(url)
        if (!response.ok) {
            console.warn(`Failed to fetch YouTube metadata for ${videoId}`)
            return null
        }
        const data = await response.json()
        if (data.items && data.items.length > 0) {
            return data.items[0].snippet.title
        }
        return null
    } catch (error) {
        console.warn(`Error fetching YouTube metadata for ${videoId}:`, error)
        return null
    }
}

/**
 * Enrich video data with thumbnails and titles from APIs
 */
export async function enrichVideos() {
    console.log('🎬 Enriching video data with metadata from APIs...')

    const enrichedVideos = await Promise.all(
        videos.map(async (video) => {
            let thumbnail = ''
            let apiTitle = ''

            if (video.source === 'wistia') {
                const metadata = await fetchWistiaMetadata(video.videoId)
                if (metadata) {
                    thumbnail = metadata.thumbnail
                    apiTitle = metadata.title
                }
            } else if (video.source === 'youtube') {
                thumbnail = getYouTubeThumbnail(video.videoId)
                const title = await fetchYouTubeTitle(video.videoId)
                if (title) {
                    apiTitle = title
                }
            }

            return {
                ...video,
                thumbnail,
                // Use API title if available and manual title is generic, otherwise keep manual title
                title: apiTitle || video.title,
            }
        })
    )

    // Write enriched data to public directory so it's served as a static asset
    const outputPath = path.join(__dirname, '../public/videos-metadata.json')
    await fs.writeFile(outputPath, JSON.stringify(enrichedVideos, null, 2))

    console.log(`✅ Enriched ${enrichedVideos.length} videos, saved to public/videos-metadata.json`)
}
