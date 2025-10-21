import React from 'react'
import MediaPlayer from 'components/MediaPlayer'
import SEO from 'components/seo'
import { videos } from '../../data/videos'

export default function VideoPlayer({ location }: { location: Location }): JSX.Element {
    // Parse URL parameters
    const params = new URLSearchParams(location.search)
    const source = (params.get('source') as 'youtube' | 'wistia') || 'youtube'
    const videoId = params.get('videoId') || params.get('id') || ''
    const startTime = parseInt(params.get('t') || params.get('startTime') || '0', 10)

    // Find video info for better metadata
    const video = videos.find((v) => v.videoId === videoId && v.source === source)
    const title = video?.title || 'Video Player'

    return (
        <>
            <SEO title={`${title} - PostHog`} description={`Watch: ${title}`} image="/images/og/default.png" />
            {videoId ? (
                <MediaPlayer videoId={videoId} source={source} startTime={startTime} />
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-primary">No video selected. Please provide a videoId parameter.</p>
                </div>
            )}
        </>
    )
}
