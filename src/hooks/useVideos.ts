import { useState, useEffect } from 'react'
import { videos as baseVideos, Video } from '../data/videos'

/**
 * Hook to load video data with enriched metadata (thumbnails, titles)
 * Falls back to base video data if enriched data is not available
 */
export function useVideos(): Video[] {
    const [videos, setVideos] = useState<Video[]>(baseVideos)

    useEffect(() => {
        // Try to fetch enriched data from public directory
        fetch('/videos-metadata.json')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch video metadata')
                return res.json()
            })
            .then((enrichedVideos: Video[]) => {
                setVideos(enrichedVideos)
            })
            .catch((error) => {
                console.warn('Using base video data (enriched metadata not available):', error.message)
                // Keep using base videos as fallback
            })
    }, [])

    return videos
}
