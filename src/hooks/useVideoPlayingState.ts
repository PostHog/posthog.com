import { useEffect, useState } from 'react'

type UseVideoPlayingStateReturn = {
    isVideoPlaying: boolean
    dispatchVideoPlayingState: (isPlaying: boolean) => void
}

export const useVideoPlayingState = (): UseVideoPlayingStateReturn => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    const dispatchVideoPlayingState = (isPlaying: boolean): void => {
        if (typeof window === 'undefined') return

        window.dispatchEvent(new CustomEvent('videoPlayingStateChange', { detail: { isPlaying } }))
    }

    const handleVideoPlayingStateChange = (event: Event) => {
        const customEvent = event as CustomEvent<{ isPlaying: boolean }>
        setIsVideoPlaying(customEvent.detail.isPlaying)
    }

    useEffect(() => {
        if (typeof window === 'undefined') return

        window.addEventListener('videoPlayingStateChange', handleVideoPlayingStateChange)

        return () => window.removeEventListener('videoPlayingStateChange', handleVideoPlayingStateChange)
    }, [])

    return { isVideoPlaying, dispatchVideoPlayingState }
}
