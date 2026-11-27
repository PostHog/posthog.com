import React, { useEffect } from 'react'
import SEO from 'components/seo'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import LearnTV from './index'
import { learnVideoBySlug } from './videos'

/** The page for one Learn TV video, at `/learn/videos/<slug>`. Each page file renders this with its slug. */
export default function LearnTVPage({ slug }: { slug: string }): JSX.Element | null {
    const video = learnVideoBySlug(slug)
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    // The window toolbar says "Learn TV"; the browser tab and search results keep the video's name.
    useEffect(() => {
        if (appWindow) setWindowTitle(appWindow, 'Learn TV')
    }, [])

    if (!video) return null
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
