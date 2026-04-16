import React, { useState } from 'react'
import { ASCIIBox } from './TerminalSection'
import Link from 'components/Link'
import { DebugContainerQuery } from "components/DebugContainerQuery"

interface Chapter {
    title: string
    time: number
    copyable?: boolean
}

interface Video {
    title: string
    author: string
    wistia: string
    chapters: Chapter[]
    customThumb?: string
}

interface TerminalVideosProps {
    videos: Record<string, Video>
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

function VideoThumbnail({ video, videoKey }: { video: Video; videoKey: string }): JSX.Element {
    // Create a URL to open the video player with proper query parameters
    const videoUrl = `/videos/play?source=wistia&videoId=${video.wistia}`

    return (
        <Link
            to={videoUrl}
            state={{ newWindow: true }}
            className="block text-left transition-all hover:scale-[1.02]"
        >
            {video.customThumb ? (
                <img
                    src={video.customThumb}
                    alt={video.title}
                    className="w-full h-auto block"
                />
            ) : (
                <div className="text-[rgba(238,239,233,0.9)] text-sm">
                    {video.title}
                </div>
            )}
        </Link>
    )
}

function VideoItem({ videoKey, video }: { videoKey: string; video: Video }): JSX.Element {
    const [expanded, setExpanded] = useState(false)
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

    const handleCopy = (text: string, idx: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
    }

    return (
        <div className="mb-6">
            <VideoThumbnail video={video} videoKey={videoKey} />

            {/* Show chapters inline for reference */}
            {/* <button
                onClick={() => setExpanded(!expanded)}
                className="text-[#666] hover:text-[#F1A82C] text-[12px] mt-2 ml-2 font-code bg-transparent border-none p-0 cursor-pointer"
            >
                {expanded ? '▼' : '▶'} Show chapters
            </button>

            {expanded && (
                <div className="mt-3 ml-2 space-y-1 pl-4 border-l-2 border-[#333]">
                    <div className="text-[#F1A82C] text-[12px] font-bold mb-2">CHAPTERS:</div>
                    {video.chapters.map((chapter, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[13px] group">
                            <span className="text-[#F1A82C] font-mono min-w-[45px]">
                                [{(idx + 1).toString().padStart(2, '0')}]
                            </span>
                            <span className="text-[#666] min-w-[40px]">{formatTime(chapter.time)}</span>
                            <span className="text-[rgba(238,239,233,0.8)] flex-1">{chapter.title}</span>
                            {chapter.copyable && (
                                <button
                                    onClick={() => handleCopy(chapter.title, idx)}
                                    className="text-[#1D4AFF] hover:text-[#00FF00] opacity-0 group-hover:opacity-100 transition-opacity text-[12px] cursor-pointer bg-transparent border-none p-0 font-code"
                                    title="Copy prompt"
                                >
                                    {copiedIdx === idx ? '✓' : '📋'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    )
}

export default function TerminalVideos({ videos }: TerminalVideosProps): JSX.Element {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 @4xl:grid-cols-2 @7xl:grid-cols-3 gap-8">
                {Object.entries(videos).map(([key, video]) => (
                    <VideoItem key={key} videoKey={key} video={video} />
                ))}
            </div>
            {/* <div className="pt-4 border-t border-[#333] text-[13px] text-[#666] text-center">
                Click thumbnails to watch videos in a new window. Expand chapters below to copy prompts.
            </div> */}
        </div>
    )
}
