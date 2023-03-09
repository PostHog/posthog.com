import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import CookieBanner from 'components/CookieBanner'
import usePostHog from '../../hooks/usePostHog'
import { SearchProvider } from 'components/Search/SearchContext'
import { UserProvider } from '../../hooks/useUser'
import Banner from '../Banner/index'

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
            <UserProvider
                apiHost={process.env.GATSBY_SQUEAK_API_HOST as string}
                organizationId={process.env.GATSBY_SQUEAK_ORG_ID as string}
            >
                <div className={className}>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <CookieBanner />
                </div>
            </UserProvider>
        </SearchProvider>
    )
}

export default Layout
export { Layout }
