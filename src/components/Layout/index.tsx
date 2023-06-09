import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import CookieBanner from 'components/CookieBanner'
import usePostHog from '../../hooks/usePostHog'
import { SearchProvider } from 'components/Search/SearchContext'

import './Fonts.scss'
import './Layout.scss'
import './SkeletonLoading.css'
import './DarkMode.scss'
import { LayoutProvider } from './context'

const Layout = ({
    children,
    parent,
    activeInternalMenu,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}): JSX.Element => {
    const posthog = usePostHog()

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }
    }, [])

    return (
        <SearchProvider>
            <LayoutProvider parent={parent} activeInternalMenu={activeInternalMenu}>
                <div className={className}>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <CookieBanner />
                </div>
            </LayoutProvider>
        </SearchProvider>
    )
}

export default Layout
export { Layout }
