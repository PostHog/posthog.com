import React, { useEffect, useRef, useState } from 'react'
import type { ReactNode, VideoHTMLAttributes } from 'react'
import { useApp } from '../../../context/App'
import { IconPause, IconPlay } from '@posthog/icons'
import { FloatingIconButton } from '../FloatingButton'
import { cn } from '../../../utils'
import { cardLevels, insetFocusRing } from '../styles'
import { useId } from '../utils'

export type VideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'aria-label'> & {
    src: string
    darkSrc?: string
    darkPoster?: string
    label: string
    caption?: ReactNode
    frame?: boolean
    loading?: 'lazy' | 'eager'
    wrapperClassName?: string
}

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(function Video(
    {
        src,
        darkSrc,
        poster,
        darkPoster,
        label,
        caption,
        frame = true,
        loading = 'lazy',
        autoPlay = true,
        muted = true,
        playsInline = true,
        loop = autoPlay,
        controls,
        preload = 'none',
        className,
        wrapperClassName,
        children,
        onPlay,
        onPause,
        onEnded,
        onEmptied,
        'aria-describedby': describedBy,
        ...props
    },
    ref
) {
    const { siteSettings } = useApp()
    const videoRef = useRef<HTMLVideoElement>(null)
    React.useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement)
    const captionId = useId()
    const [reducedMotion, setReducedMotion] = useState(true)
    const [entered, setEntered] = useState(false)
    const [nearViewport, setNearViewport] = useState(false)
    const [pageVisible, setPageVisible] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [pausedByUser, setPausedByUser] = useState(false)
    const pausedByUserRef = useRef(false)
    const pausedBySystem = useRef(false)
    const ready = loading === 'eager' || entered
    const motionAllowed = autoPlay && !reducedMotion
    const shouldPlay = ready && motionAllowed && nearViewport && pageVisible
    const showNativeControls = controls ?? (!autoPlay || reducedMotion)
    const showPlaybackToggle = motionAllowed && !showNativeControls
    const resolvedSrc = siteSettings.theme === 'dark' && darkSrc ? darkSrc : src
    const resolvedPoster = siteSettings.theme === 'dark' && darkPoster ? darkPoster : poster
    const hasCaption = caption !== undefined && caption !== null

    const markPausedByUser = (paused: boolean) => {
        pausedByUserRef.current = paused
        setPausedByUser(paused)
    }

    const togglePlayback = () => {
        const video = videoRef.current
        if (!video) return
        if (video.paused) {
            markPausedByUser(false)
            void video.play().catch(() => setIsPlaying(false))
        } else {
            markPausedByUser(true)
            video.pause()
        }
    }

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = () => setReducedMotion(preference.matches)
        update()
        preference.addEventListener('change', update)
        return () => preference.removeEventListener('change', update)
    }, [])

    useEffect(() => {
        const update = () => setPageVisible(document.visibilityState !== 'hidden')
        update()
        document.addEventListener('visibilitychange', update)
        return () => document.removeEventListener('visibilitychange', update)
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        if (!('IntersectionObserver' in window)) {
            setEntered(true)
            setNearViewport(true)
            return
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const intersecting = entries.some((entry) => entry.isIntersecting)
                if (intersecting) setEntered(true)
                setNearViewport(intersecting)
            },
            { rootMargin: '200px' }
        )
        observer.observe(video)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!video || !autoPlay) return
        if (shouldPlay && !pausedByUserRef.current) {
            if (video.paused && !video.ended) void video.play().catch(() => setIsPlaying(false))
        } else if (!shouldPlay && !video.paused) {
            pausedBySystem.current = true
            video.pause()
        }
    }, [autoPlay, shouldPlay, resolvedSrc])

    return (
        <figure className={cn('m-0 min-w-0', wrapperClassName)}>
            <div className={cn('group/video relative overflow-hidden rounded-[8px]', frame && cardLevels[1])}>
                <video
                    {...props}
                    ref={videoRef}
                    src={ready ? resolvedSrc : undefined}
                    poster={resolvedPoster}
                    muted={muted}
                    playsInline={playsInline}
                    loop={loop}
                    controls={showNativeControls}
                    onPlay={(event) => {
                        setIsPlaying(true)
                        markPausedByUser(false)
                        onPlay?.(event)
                    }}
                    onPause={(event) => {
                        setIsPlaying(false)
                        if (!pausedBySystem.current && !event.currentTarget.ended) markPausedByUser(true)
                        pausedBySystem.current = false
                        onPause?.(event)
                    }}
                    onEnded={(event) => {
                        setIsPlaying(false)
                        onEnded?.(event)
                    }}
                    onEmptied={(event) => {
                        setIsPlaying(false)
                        onEmptied?.(event)
                    }}
                    preload={ready ? preload : 'none'}
                    aria-label={label}
                    aria-describedby={
                        [describedBy, hasCaption ? captionId : undefined].filter(Boolean).join(' ') || undefined
                    }
                    className={cn('m-0 block aspect-video w-full object-contain', insetFocusRing, className)}
                >
                    {children}
                    <a href={resolvedSrc}>Download video: {label}</a>
                </video>
                {showPlaybackToggle && (
                    <FloatingIconButton
                        size="sm"
                        aria-label={`${isPlaying ? 'Pause' : 'Play'} video: ${label}`}
                        icon={isPlaying ? <IconPause /> : <IconPlay />}
                        onClick={togglePlayback}
                        className={cn(
                            'absolute bottom-2 right-2 transition-[opacity,transform,background-color] focus-visible:opacity-100 group-hover/video:opacity-100 [@media(hover:none)]:opacity-100',
                            pausedByUser ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                )}
            </div>
            {hasCaption && (
                <figcaption id={captionId} className="mt-2 text-sm leading-relaxed text-secondary">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
})
