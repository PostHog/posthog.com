import React, { useEffect, useRef } from 'react'

interface WistiaEmbedProps {
    mediaId: string
    aspectRatio?: number
    className?: string
    autoPlay?: boolean
    muted?: boolean
    controls?: boolean
}

declare global {
    interface Window {
        Wistia?: any
    }
}

export default function WistiaEmbed({
    mediaId,
    aspectRatio = 1.7777777777777777, // 16:9 default
    className = '',
    autoPlay = false,
    muted = false,
    controls = true,
}: WistiaEmbedProps) {
    const playerRef = useRef<HTMLElement>(null)
    const scriptsLoadedRef = useRef(false)
    const wistiaReadyRef = useRef(false)

    useEffect(() => {
        // Only load scripts in browser environment
        if (typeof window === 'undefined') return

        const loadWistiaScripts = async () => {
            // Check if scripts are already in the DOM (from another instance)
            const existingPlayerScript = document.querySelector('script[src="https://fast.wistia.com/player.js"]')
            const existingMediaScript = document.querySelector(
                `script[src="https://fast.wistia.com/embed/${mediaId}.js"]`
            )

            if (existingPlayerScript && existingMediaScript) {
                // Scripts already loaded, just configure the player
                wistiaReadyRef.current = true
                configurePlayer()
                return
            }

            // Avoid loading scripts multiple times from this instance
            if (scriptsLoadedRef.current) return
            scriptsLoadedRef.current = true

            // Load the main Wistia player script
            const playerScript = document.createElement('script')
            playerScript.src = 'https://fast.wistia.com/player.js'
            playerScript.async = true

            // Wait for the player script to load before loading media script
            playerScript.onload = () => {
                // Load the specific media script
                const mediaScript = document.createElement('script')
                mediaScript.src = `https://fast.wistia.com/embed/${mediaId}.js`
                mediaScript.async = true
                mediaScript.type = 'module'

                // Mark Wistia as ready when media script loads
                mediaScript.onload = () => {
                    wistiaReadyRef.current = true

                    // Try to configure player after scripts are loaded
                    configurePlayer()
                }

                document.head.appendChild(mediaScript)
            }

            document.head.appendChild(playerScript)

            // Add the loading state styles
            const style = document.createElement('style')
            style.textContent = `
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: ${(1 / aspectRatio) * 100}%;
        }
      `
            document.head.appendChild(style)
        }

        loadWistiaScripts()
    }, [mediaId, aspectRatio])

    // Configure player options for privacy
    const configurePlayer = () => {
        if (typeof window === 'undefined') return

        let retryCount = 0
        const maxRetries = 50 // 5 seconds max wait time

        const checkWistiaReady = () => {
            // Check if Wistia object and API are available
            if (window.Wistia && window.Wistia.api) {
                try {
                    // Wait for the specific video to be ready
                    const video = window.Wistia.api(mediaId)
                    if (video && video.ready) {
                        // Configure privacy-focused options
                        video.ready(() => {
                            video.options({
                                doNotTrack: true,
                                plugin: {
                                    // Disable various tracking plugins
                                    'captions-v1': false,
                                    'chapters-v1': false,
                                    'socialbar-v1': false,
                                },
                            })
                        })
                    } else {
                        // Video not ready yet, configure without waiting
                        window.Wistia.api(mediaId, {
                            doNotTrack: true,
                            plugin: {
                                // Disable various tracking plugins
                                'captions-v1': false,
                                'chapters-v1': false,
                                'socialbar-v1': false,
                            },
                        })
                    }
                } catch (error) {
                    // If API call fails, try again if we haven't exceeded retries
                    if (retryCount < maxRetries) {
                        retryCount++
                        setTimeout(checkWistiaReady, 100)
                    } else {
                        console.warn('Failed to configure Wistia player after max retries:', error)
                    }
                }
            } else {
                // If Wistia is not ready yet, try again
                if (retryCount < maxRetries) {
                    retryCount++
                    setTimeout(checkWistiaReady, 100)
                } else {
                    console.warn('Wistia API not available after max retries')
                }
            }
        }

        checkWistiaReady()
    }

    useEffect(() => {
        // Try to configure player when component mounts or mediaId changes
        if (wistiaReadyRef.current) {
            configurePlayer()
        }
    }, [mediaId])

    return (
        <wistia-player
            ref={playerRef}
            media-id={mediaId}
            aspect={aspectRatio.toString()}
            autoplay={autoPlay ? 'true' : 'false'}
            muted={muted ? 'true' : 'false'}
            controls={controls ? 'true' : 'false'}
            className={className}
        />
    )
}
