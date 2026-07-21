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
    const containerRef = useRef<HTMLDivElement>(null)
    const [wistiaChapters, setWistiaChapters] = useState<DemoVideoChapter[]>([])
    const [currentTime, setCurrentTime] = useState(0)

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
    const activeChapterIndex = resolvedChapters.reduce((active, chapter, index) => {
        return chapter.time <= currentTime ? index : active
    }, -1)

    return (
        <div ref={containerRef} className={`@container scroll-mt-20 ${className}`}>
            <div className="flex flex-col @5xl:gap-8 @5xl:flex-row">
                <div className="rounded flex-1 w-full">
                    <WistiaCustomPlayer mediaId={wistia} glow="red" ref={playerRef} onTimeUpdate={setCurrentTime} />
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
                                            className="[&>button]:first:before:top-2 [&>button]:last:before:bottom-[calc(100%_-_1rem)]"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    containerRef.current?.scrollIntoView({
                                                        behavior: 'smooth',
                                                        block: 'nearest',
                                                    })
                                                    playerRef.current?.time(chapter.time)
                                                    playerRef.current?.play()
                                                }}
                                                className="group relative py-1 pl-7 hover:pl-8 flex items-start gap-2 text-sm text-left w-full hover:text-red group before:content-[''] before:absolute before:left-3
                                                before:-ml-px
                                                before:top-0 
                                                before:bottom-0 
                                                before:w-0.5 before:bg-black/25 dark:before:bg-white/25
                                                transition-all duration-100
                                                hover:text-primary"
                                            >
                                                <div
                                                    className="absolute size-3 top-2 left-1.5 group-hover:size-7 group-hover:top-0 group-hover:-left-0.5
                                                group-active:top-0.5
                                                group-active:left-0 
                                                group-active:size-6 rounded-full bg-black dark:bg-[#aaa] group-hover:bg-black 
                                                dark:group-hover:bg-white border border-primary group-hover:border-[1.5px] group-hover:border-black/50 dark:group-hover:border-white flex justify-center items-center transition-all duration-100"
                                                >
                                                    <IconPlayFilled
                                                        className="size-0 group-hover:size-4
                                                    group-active:size-3 transition-all duration-100 group-hover:text-white dark:group-hover:text-black"
                                                    />
                                                </div>
                                                <span className="font-mono text-xs text-secondary shrink-0 pt-0.5">
                                                    {formatTime(chapter.time)}
                                                </span>
                                                <span
                                                    className={`relative group-hover:underline group-active:scale-[.995] group-active:top-[.5px] transition-all duration-50${
                                                        index === activeChapterIndex ? ' font-bold' : ''
                                                    }`}
                                                >
                                                    {chapter.title}
                                                </span>
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
