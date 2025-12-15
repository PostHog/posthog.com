import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

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
}

export interface WistiaVideoRef {
    play: () => void
    pause: () => void
    time: (seconds?: number) => number
}

const WistiaVideo = forwardRef<WistiaVideoRef, WistiaVideoProps>(
    ({ videoId, className = '', onEnd, hideInitialControls = false, hideAudioControls = false }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null)
        const playerRef = useRef<any>(null)
        const endHandlerRef = useRef<(() => void) | null>(null)

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
            if (typeof window === 'undefined' || !containerRef.current) return

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

            const initializePlayer = () => {
                if (!isMounted || !containerRef.current) return

                // Create a fresh embed div
                const embedDiv = document.createElement('div')
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
                            if (isMounted) {
                                onEndRef.current?.()
                            }
                        }
                        video.bind('end', endHandlerRef.current)

                        // Auto play
                        video.play()
                    } else {
                        // Video not ready yet, check again
                        setTimeout(checkForVideo, 100)
                    }
                }

                // Start checking for the video
                setTimeout(checkForVideo, 100)
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
        }, [videoId])

        return <div ref={containerRef} className={`aspect-square ${className}`} />
    }
)

WistiaVideo.displayName = 'WistiaVideo'

export default WistiaVideo
