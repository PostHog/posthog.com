import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

declare global {
    interface Window {
        Wistia: any
        _wq: any[]
    }
}

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
        const [isVisible, setIsVisible] = useState(false)

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
            const container = containerRef.current
            if (!container) return

            const updateVisibility = () => {
                const { width, height } = container.getBoundingClientRect()
                setIsVisible(width > 0 && height > 0)
            }
            const observer = new ResizeObserver(updateVisibility)
            observer.observe(container)
            updateVisibility()

            return () => observer.disconnect()
        }, [])

        useEffect(() => {
            if (typeof window === 'undefined' || !containerRef.current || !isVisible) return

            const container = containerRef.current
            let isMounted = true
            let embedDiv: HTMLDivElement | undefined
            let pollTimer: ReturnType<typeof setTimeout>
            let endTimer: ReturnType<typeof setTimeout>

            const cleanup = () => {
                clearTimeout(pollTimer)
                clearTimeout(endTimer)
                // Unbind the end handler if it exists
                if (playerRef.current && endHandlerRef.current) {
                    try {
                        playerRef.current.unbind('end', endHandlerRef.current)
                    } catch (e) {
                        // Ignore
                    }
                }
                endHandlerRef.current = null
                const video = playerRef.current || (embedDiv && window.Wistia?.api(embedDiv))
                video?.remove()
                playerRef.current = null

                container.innerHTML = ''
            }

            const initializePlayer = () => {
                if (!isMounted || !containerRef.current) return

                embedDiv = document.createElement('div')
                embedDiv.className = `wistia_embed wistia_async_${videoId} videoFoam=true ${
                    hideInitialControls ? 'controlsVisibleOnLoad=false playButtonVisible=false' : ''
                } ${hideAudioControls ? 'volumeControl=false' : ''}`
                embedDiv.style.width = '100%'
                embedDiv.style.height = '100%'
                containerRef.current.appendChild(embedDiv)

                // Wait for Wistia to initialize this embed
                const checkForVideo = () => {
                    if (!isMounted) return

                    // Try to get the video from the embed div
                    const video = window.Wistia?.api(embedDiv)
                    if (video) {
                        playerRef.current = video

                        // Set options
                        video.mute()

                        // Create the end handler
                        endHandlerRef.current = () => {
                            queueMicrotask(() => {
                                if (!isMounted) return
                                endTimer = setTimeout(() => {
                                    if (isMounted) onEndRef.current?.()
                                }, 0)
                            })
                        }
                        video.bind('end', endHandlerRef.current)

                        if (autoPlay) {
                            video.play()
                        }
                    } else {
                        // Video not ready yet, check again
                        pollTimer = setTimeout(checkForVideo, 100)
                    }
                }

                // Start checking for the video
                pollTimer = setTimeout(checkForVideo, 100)
            }

            // Clean up before initializing
            cleanup()

            if (!window.Wistia) {
                const script = document.createElement('script')
                script.src = 'https://fast.wistia.com/assets/external/E-v1.js'
                script.async = true
                script.onload = () => {
                    if (isMounted) {
                        initializePlayer()
                    }
                }
                document.head.appendChild(script)
            } else {
                initializePlayer()
            }

            return () => {
                isMounted = false
                cleanup()
            }
        }, [videoId, autoPlay, isVisible])

        return <div ref={containerRef} className={`aspect-square ${className}`} />
    }
)

WistiaVideo.displayName = 'WistiaVideo'

export default WistiaVideo
