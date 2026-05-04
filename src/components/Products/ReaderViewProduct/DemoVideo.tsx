import React, { useEffect, useRef, useState } from 'react'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'
import { IconPlayFilled } from '@posthog/icons'

export interface DemoVideoHighlight {
    title: string
    description: string
}

export interface DemoVideoChapter {
    title: string
    time: number
}

interface DemoVideoProps {
    wistia: string
    highlights?: DemoVideoHighlight[]
    chapters?: DemoVideoChapter[]
    className?: string
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function DemoVideo({ wistia, highlights, chapters, className = '' }: DemoVideoProps) {
    const playerRef = useRef<any>(null)
    const [wistiaChapters, setWistiaChapters] = useState<DemoVideoChapter[]>([])

    useEffect(() => {
        if (chapters && chapters.length > 0) return
        fetch(`https://fast.wistia.com/embed/medias/${wistia}.json`)
            .then((r) => r.json())
            .then((data) => {
                const list = data?.media?.embedOptions?.plugin?.chapters?.chapterList
                if (Array.isArray(list)) {
                    setWistiaChapters(
                        list
                            .filter((c: any) => c.deleted !== 'true' && c.deleted !== true)
                            .map((c: any) => ({ title: c.title, time: parseFloat(c.time) }))
                            .sort((a: DemoVideoChapter, b: DemoVideoChapter) => a.time - b.time)
                    )
                }
            })
            .catch(() => undefined)
    }, [wistia])

    if (!wistia) return null

    const resolvedChapters = chapters?.length ? chapters : wistiaChapters
    const hasSidebar = (highlights && highlights.length > 0) || resolvedChapters.length > 0

    return (
        <div className={`@container ${className}`}>
            <div className="flex flex-col @5xl:gap-8 @5xl:flex-row">
                <div className="rounded flex-1 w-full">
                    <WistiaCustomPlayer mediaId={wistia} glow="red" ref={playerRef} />
                </div>

                {hasSidebar && (
                    <div className="@container shrink @5xl:basis-[300px] flex flex-col gap-6">
                        {highlights && highlights.length > 0 && (
                            <div>
                                <h3>In this video...</h3>
                                <ul className="mt-6 grid grid-cols-1 @xl:grid-cols-2 @5xl:grid-cols-1 gap-x-6 gap-y-3 marker:text-yellow m-0">
                                    {highlights.map((highlight, index) => (
                                        <li key={index} className="leading-snug">
                                            <strong className="text-primary">{highlight.title}</strong>{' '}
                                            <span className="text-secondary">{highlight.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {resolvedChapters.length > 0 && (
                            <div>
                                <h3 className="mb-4">In this video...</h3>
                                <ul className="m-0 p-0 list-none">
                                    {resolvedChapters.map((chapter, index) => (
                                        <li
                                            key={index}
                                            className="[&>button]:first:before:top-1 [&>button]:last:before:bottom-1"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    playerRef.current?.time(chapter.time)
                                                    playerRef.current?.play()
                                                }}
                                                className="group relative py-1 flex items-start gap-2 text-sm text-left w-full hover:text-red group before:content-[''] before:absolute before:left-3
                                                before:-ml-px
                                                before:-top-1 
                                                before:bottom-0 
                                                before:w-0.5 before:bg-black/50 dark:before:bg-white"
                                            >
                                                <div className="relative size-6 group-hover:size-7 group-hover:-m-0.5 rounded-full bg-white border border-primary flex justify-center items-center transition-all duration-300">
                                                    <IconPlayFilled className="size-0 group-hover:size-4 transition-all duration-300" />
                                                </div>
                                                <span className="font-mono text-xs text-secondary shrink-0 pt-0.5 group-hover:text-red">
                                                    {formatTime(chapter.time)}
                                                </span>
                                                <span>{chapter.title}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
