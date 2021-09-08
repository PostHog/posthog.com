import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { useValues } from 'kea'
import './Layout.scss'
import './SkeletonLoading.css'
import './DarkMode.scss'
import { PosthogAnnouncement } from '../PosthogAnnouncement/PosthogAnnouncement'
import { GetStartedModal } from '../../components/GetStartedModal'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }
    }, [])

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <PosthogAnnouncement />
            <GetStartedModal />
        </>
    )
}

export default Layout
export { Layout }
