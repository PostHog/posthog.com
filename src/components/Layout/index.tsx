import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import CookieBanner from 'components/CookieBanner'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { SearchProvider } from 'components/Search/SearchContext'
import { UserProvider } from '../../hooks/useUser'

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
        <SearchProvider>
            <UserProvider apiHost="https://squeak.cloud" organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626">
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
