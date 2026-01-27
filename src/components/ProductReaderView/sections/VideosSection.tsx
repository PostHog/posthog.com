import React from 'react'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'

interface VideoChapter {
    title: string
    time: number
    copyable?: boolean
}

interface Video {
    title: string
    author?: string
    wistia: string
    customThumb?: string
    chapters?: VideoChapter[]
}

interface VideosSectionProps {
    productData: any
}

export default function VideosSection({ productData }: VideosSectionProps): JSX.Element {
    const videos: Record<string, Video> = productData?.videos || {}
    const videoKeys = Object.keys(videos)

    if (videoKeys.length === 0) {
        return <></>
    }

    return (
        <section id="videos" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Videos</h2>

            <div className="space-y-8">
                {videoKeys.map((key) => {
                    const video = videos[key]
                    return (
                        <div key={key} className="pb-6 border-b border-primary last:border-b-0">
                            {/* Video title and author */}
                            <div className="mb-4">
                                <h3 className="text-xl font-bold m-0">{video.title}</h3>
                                {video.author && <p className="text-sm text-secondary mt-1">By {video.author}</p>}
                            </div>

                            {/* Video player */}
                            <div className="mb-4">
                                <WistiaCustomPlayer mediaId={video.wistia} aspectRatio={16 / 9} className="max-w-3xl" />
                            </div>

                            {/* Chapters */}
                            {video.chapters && video.chapters.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                                        Chapters
                                    </h4>
                                    <ul className="list-none pl-0 space-y-1">
                                        {video.chapters.map((chapter, index) => (
                                            <li key={index} className="text-sm">
                                                <span className="font-mono text-muted mr-2">
                                                    {formatTime(chapter.time)}
                                                </span>
                                                <span className="text-secondary">{chapter.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

/**
 * Format seconds into MM:SS format
 */
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}
