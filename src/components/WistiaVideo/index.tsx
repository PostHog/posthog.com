import React, { useEffect, useRef } from 'react'

declare global {
    interface Window {
        Wistia: any
        _wq: any[]
    }
}

interface WistiaVideoProps {
    videoId: string
    className?: string
}

export default function WistiaVideo({ videoId, className = '' }: WistiaVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return

        const initializePlayer = () => {
            const embedDiv = document.createElement('div')
            embedDiv.className = `wistia_embed wistia_async_${videoId} videoFoam=true`
            embedDiv.style.width = '100%'
            embedDiv.style.height = '100%'

            if (containerRef.current) {
                containerRef.current.innerHTML = ''
                containerRef.current.appendChild(embedDiv)
            }

            window._wq = window._wq || []
            window._wq.push({
                id: videoId,
                options: {
                    autoPlay: true,
                    muted: true,
                    loop: true,
                    controlsVisibleOnLoad: false,
                    playButton: false,
                    playbar: false,
                    volumeControl: false,
                    fullscreenButton: false,
                    settingsControl: false,
                    qualityControl: false,
                    smallPlayButton: false,
                    bigPlayButton: false,
                },
            })
        }

        if (!window.Wistia) {
            const script = document.createElement('script')
            script.src = 'https://fast.wistia.com/assets/external/E-v1.js'
            script.async = true
            script.onload = initializePlayer
            document.head.appendChild(script)
        } else {
            initializePlayer()
        }
    }, [videoId])

    return <div ref={containerRef} className={`aspect-square ${className}`} />
}
