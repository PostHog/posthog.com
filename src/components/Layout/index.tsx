import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { useValues } from 'kea'
import './Fonts.scss'
import './Layout.scss'
import './SkeletonLoading.css'
import './DarkMode.scss'
import { PosthogAnnouncement } from '../PosthogAnnouncement/PosthogAnnouncement'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import CookieBanner from 'components/CookieBanner'
import Link from 'components/Link'

const Layout = ({ children, className = '' }: { children: React.ReactNode; className?: string }): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }
    }, [])

    return (
        <div className={className}>
            <div>
                <p className="text-center py-4 bg-gray-accent-light dark:bg-gray-accent-dark flex sm:flex-row flex-col justify-center sm:space-x-1 font-semibold m-0">
                    <span>🚀 PostHog's EU Cloud has arrived!</span>
                    <Link to="/eu" className="text-red">
                        Learn more
                    </Link>
                </p>
            </div>
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
