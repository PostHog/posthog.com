import React, { useEffect } from 'react'
import LearnTV from 'components/Learn/LearnTV'
import { learnVideoBySlug } from 'components/Learn/LearnTV/videos'
import SEO from 'components/seo'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'

const video = learnVideoBySlug('aio-traces')!

export default function AioTracesVideo(): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    // The window says "Learn TV"; the browser tab and search results keep the video's name.
    useEffect(() => {
        if (appWindow) setWindowTitle(appWindow, 'Learn TV')
    }, [])

    return (
        <>
            <SEO
                title={`${video.title} – Learn TV – PostHog`}
                description={video.description}
                image="/images/og/default.png"
                updateWindowTitle={false}
            />
            <LearnTV video={video} />
        </>
    )
}
