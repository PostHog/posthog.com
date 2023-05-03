import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import CookieBanner from 'components/CookieBanner'
import usePostHog from '../../hooks/usePostHog'
import { determineIfInIframe } from '../../utils'
import { SearchProvider } from 'components/Search/SearchContext'

import './Fonts.scss'
import './Layout.scss'
import './SkeletonLoading.css'
import './DarkMode.scss'

const Layout = ({ children, className = '' }: { children: React.ReactNode; className?: string }): JSX.Element => {
    const posthog = usePostHog()

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }
    }, [])

    // We only render layout content in iframes - this is for the 500 page of the PostHog app (/service-message)
    const isInFrame = determineIfInIframe()

    return (
        <SearchProvider>
            <div className={className}>
                {!isInFrame && <Header />}
                <main className={isInFrame ? 'in-iframe' : undefined}>{children}</main>
                {!isInFrame && <Footer />}
                {!isInFrame && <CookieBanner />}
            </div>
        </SearchProvider>
    )
}

export default Layout
export { Layout }
