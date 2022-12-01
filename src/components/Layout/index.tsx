import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import CookieBanner from 'components/CookieBanner'
import Banner from 'components/Banner'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

import './Fonts.scss'
import './Layout.scss'
import './SkeletonLoading.css'
import './DarkMode.scss'

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
            <CookieBanner />
        </div>
    )
}

export default Layout
export { Layout }
