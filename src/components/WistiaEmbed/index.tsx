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

    useEffect(() => {
        const loadWistiaScripts = async () => {
            // Avoid loading scripts multiple times
            if (scriptsLoadedRef.current) return
            scriptsLoadedRef.current = true

            // Load the main Wistia player script
            const playerScript = document.createElement('script')
            playerScript.src = 'https://fast.wistia.com/player.js'
            playerScript.async = true
            document.head.appendChild(playerScript)

            // Load the specific media script
            const mediaScript = document.createElement('script')
            mediaScript.src = `https://fast.wistia.com/embed/${mediaId}.js`
            mediaScript.async = true
            mediaScript.type = 'module'
            document.head.appendChild(mediaScript)

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

            return () => {
                // Clean up scripts and styles when component unmounts
                document.head.removeChild(playerScript)
                document.head.removeChild(mediaScript)
                document.head.removeChild(style)
            }
        }

        loadWistiaScripts()
    }, [mediaId, aspectRatio])

    // Configure player options for privacy
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Wistia && playerRef.current) {
            // Configure privacy-focused options
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
