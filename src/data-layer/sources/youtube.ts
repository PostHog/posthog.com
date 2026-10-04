// ChangelogVideo: the videos of the changelog YouTube playlist, newest first, without Shorts (60 s or less).
import type { Source } from '../index'
import { env } from '../env'
import { fetchJson } from '../http'
import type { ChangelogVideoNode } from '../types'

/* YouTube Data API */

export interface PlaylistItemsResponse {
    items?: { contentDetails?: { videoId?: string }; snippet?: { resourceId?: { videoId?: string } } }[]
    nextPageToken?: string
}

export interface VideosResponse {
    items?: { id?: string; snippet?: { publishedAt?: string; title: string }; contentDetails?: { duration?: string } }[]
}

const DEFAULT_CHANGELOG_PLAYLIST_ID = 'PLnOY1RYHjDfxcuWI_L1xwuhoXAsxR59VL'

/** An ISO 8601 duration (PT1H2M3S) in seconds. */
function seconds(duration: string | undefined): number | null {
    const match = duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return null
    return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0)
}

export const changelogVideoSource: Source = {
    name: 'changelog-videos',
    types: ['ChangelogVideo'],
    requires: ['YOUTUBE_API_KEY_CHANGELOG'],
    async fetch() {
        const key = env('YOUTUBE_API_KEY_CHANGELOG') ?? ''
        const playlistId = env('CHANGELOG_YOUTUBE_PLAYLIST_ID') ?? DEFAULT_CHANGELOG_PLAYLIST_ID
        const videoIds: string[] = []
        let pageToken: string | undefined
        do {
            const params = new URLSearchParams({ part: 'snippet,contentDetails', playlistId, maxResults: '50', key })
            if (pageToken) params.set('pageToken', pageToken)
            const page: PlaylistItemsResponse = await fetchJson<PlaylistItemsResponse>(
                `https://www.googleapis.com/youtube/v3/playlistItems?${params}`
            )
            if (!page.items) break
            for (const item of page.items) {
                const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId
                if (videoId) videoIds.push(videoId)
            }
            pageToken = page.nextPageToken
        } while (pageToken)

        const videos = new Map<string, ChangelogVideoNode>()
        for (let i = 0; i < videoIds.length; i += 50) {
            const params = new URLSearchParams({
                part: 'snippet,contentDetails',
                id: videoIds.slice(i, i + 50).join(','),
                key,
                maxResults: '50',
            })
            const response = await fetchJson<VideosResponse>(`https://www.googleapis.com/youtube/v3/videos?${params}`)
            for (const item of response.items ?? []) {
                if (!item.id || !item.snippet?.publishedAt) continue
                const length = seconds(item.contentDetails?.duration)
                if (length !== null && length <= 60) continue
                videos.set(item.id, {
                    id: `changelog-video-${item.id}`,
                    videoId: item.id,
                    publishedAt: item.snippet.publishedAt,
                    title: item.snippet.title,
                })
            }
        }
        const nodes = [...videos.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
        return { ChangelogVideo: nodes }
    },
}
