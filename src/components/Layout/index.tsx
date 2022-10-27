import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import Banner from '../Banner/index'
import { Footer } from '../Footer/Footer'
import { useValues } from 'kea'
import './Fonts.scss'
import './Layout.scss'
import './SkeletonLoading.css'
import './DarkMode.scss'
import { PosthogAnnouncement } from '../PosthogAnnouncement/PosthogAnnouncement'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import CookieBanner from 'components/CookieBanner'

const Layout = ({ children, className = '' }: { children: React.ReactNode; className?: string }): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }
    }, [])

    return (
        <div className={className}>
            <Banner />
            <Header />
            <main>{children}</main>
            <Footer />
            <PosthogAnnouncement />
            <CookieBanner />
        </div>
    )
}

export default Layout
export { Layout }
