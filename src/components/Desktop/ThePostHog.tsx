import React, { useEffect } from 'react'
import MediaPlayer from 'components/MediaPlayer'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

export const VIDEO_ID = 'vndjn7wus5'

interface ThePostHogPlayerProps {
    /** Set by the caller so the window system can match this to its `appSettings` entry. */
    location?: { pathname: string }
    newWindow?: boolean
}

/** Wistia player opened as a window (no route). */
export default function ThePostHogPlayer({}: ThePostHogPlayerProps): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'The PostHog')
        }
    }, [appWindow, setWindowTitle])

    return <MediaPlayer videoId={VIDEO_ID} source="wistia" borderRadius={false} />
}
