import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import useWistiaPlayer from 'hooks/useWistiaPlayer'
import WistiaError from 'components/WistiaError'

interface WistiaVideoProps {
    videoId: string
    className?: string
    onEnd?: () => void
    hideInitialControls?: boolean
    hideAudioControls?: boolean
    autoPlay?: boolean
}

export interface WistiaVideoRef {
    play: () => void
    pause: () => void
    time: (seconds?: number) => number
}

const WistiaVideo = forwardRef<WistiaVideoRef, WistiaVideoProps>(
    (
        { videoId, className = '', onEnd, hideInitialControls = false, hideAudioControls = false, autoPlay = true },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null)
        const playerRef = useRef<any>(null)
        const endHandlerRef = useRef<(() => void) | null>(null)

        const { status, scriptLoaded, attempt, markReady, retry } = useWistiaPlayer({
            videoId,
            component: 'WistiaVideo',
        })

        useImperativeHandle(ref, () => ({
            play: () => playerRef.current?.play(),
            pause: () => playerRef.current?.pause(),
            time: (seconds?: number) => {
                if (seconds !== undefined) {
                    playerRef.current?.time(seconds)
                }
                return playerRef.current?.time() || 0
            },
        }))

        // Store onEnd in a ref to avoid stale closure issues
        const onEndRef = useRef(onEnd)
        onEndRef.current = onEnd

        useEffect(() => {
            if (!scriptLoaded || typeof window === 'undefined' || !containerRef.current) return

            let isMounted = true

            const cleanup = () => {
                // Unbind the end handler if it exists
                if (playerRef.current && endHandlerRef.current) {
                    try {
                        playerRef.current.unbind('end', endHandlerRef.current)
                    } catch (e) {
                        // Ignore
                    }
                }
                endHandlerRef.current = null
                playerRef.current = null

                // Clear the container
                if (containerRef.current) {
                    containerRef.current.innerHTML = ''
                }
            }

            // Clean up before initializing
            cleanup()

            // Create a fresh embed div
            const embedDiv = document.createElement('div')
            embedDiv.className = `wistia_embed wistia_async_${videoId} videoFoam=true ${
                hideInitialControls ? 'controlsVisibleOnLoad=false playButtonVisible=false' : ''
            } ${hideAudioControls ? 'volumeControl=false' : ''}`
            embedDiv.style.width = '100%'
            embedDiv.style.height = '100%'
            containerRef.current.appendChild(embedDiv)

            // Wait for Wistia to initialize this embed. If it never does, the
            // useWistiaPlayer timeout surfaces the error state, so bound the
            // poll rather than looping forever.
            let tries = 0
            const maxTries = 120
            const checkForVideo = () => {
                if (!isMounted) return

                const video = window.Wistia?.api(embedDiv)
                if (video) {
                    playerRef.current = video
                    markReady()

                    // Set options
                    video.mute()

                    // Create the end handler
                    endHandlerRef.current = () => {
                        if (isMounted) {
                            onEndRef.current?.()
                        }
                    }
                    video.bind('end', endHandlerRef.current)

                    if (autoPlay) {
                        video.play()
                    }
                } else if (tries < maxTries) {
                    // Video not ready yet, check again
                    tries++
                    setTimeout(checkForVideo, 100)
                }
            }

            // Start checking for the video
            setTimeout(checkForVideo, 100)

            return () => {
                isMounted = false
                cleanup()
            }
        }, [videoId, autoPlay, scriptLoaded, attempt, markReady])

        return (
            <div className={`relative aspect-square ${className}`}>
                <div ref={containerRef} className="w-full h-full" />
                {status === 'error' && <WistiaError videoId={videoId} onRetry={retry} />}
            </div>
        )
    }
)

WistiaVideo.displayName = 'WistiaVideo'

export default WistiaVideo
