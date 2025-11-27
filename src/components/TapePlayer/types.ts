import { CassetteLabelBackground } from 'data/cassetteBackgrounds'

// YouTube API types
export interface YTPlayer {
    playVideo: () => void
    pauseVideo: () => void
    stopVideo: () => void
    loadVideoById: (videoId: string) => void
    getVideoData: () => { title: string; video_id: string; author: string }
    destroy?: () => void
}

export interface YTPlayerConfig {
    height: string
    width: string
    videoId: string
    host: string
    playerVars: {
        autoplay: number
        controls: number
        disablekb: number
        fs: number
        modestbranding: number
        rel: number
        playsinline?: number
    }
    events: {
        onReady: () => void
        onStateChange: (event: { data: number }) => void
    }
}

export interface YTPlayerConstructor {
    new (elementId: string, config: YTPlayerConfig): YTPlayer
}

export interface YTNamespace {
    Player: YTPlayerConstructor
    PlayerState: {
        PLAYING: number
        PAUSED: number
        ENDED: number
    }
}

// Extend Window interface for YouTube API
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        YT: YTNamespace | any
        onYouTubeIframeAPIReady: (() => void) | null
    }
}

// Mixtape types for Strapi
export interface Track {
    id: string
    title: string
    youtubeUrl: string
}

export interface MixtapeFormValues {
    title: string
    genres: string[]
    labelBackground: CassetteLabelBackground
    cassetteColor: string
    labelColor: string
    tracks: Track[]
}
