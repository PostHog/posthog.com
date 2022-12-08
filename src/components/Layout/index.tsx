import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import CookieBanner from 'components/CookieBanner'
import Banner from 'components/Banner'
import usePostHog from '../../hooks/usePostHog'
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

    return (
        <SearchProvider>
            <div className={className}>
                <Banner />
                <Header />
                <main>{children}</main>
                <Footer />
                <CookieBanner />
            </div>
        </SearchProvider>
    )
}

export default Layout
export { Layout }
