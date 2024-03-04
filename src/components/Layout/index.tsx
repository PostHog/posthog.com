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
import { IProps, LayoutProvider } from './context'
import { Mobile as MobileNav } from 'components/MainNav'
import { useLayoutData } from './hooks'
import SearchBox from 'components/Search/SearchBox'

const Article = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const { compact } = useLayoutData()
    return (
        <div className={className}>
            {compact ? (
                <div className="px-4 py-3 border-b border-border dark:border-dark sticky top-0 z-50 bg-light dark:bg-dark">
                    <SearchBox className="!w-full !py-2" location="mobile-header" />
                </div>
            ) : (
                <Header />
            )}
            <main>{children}</main>
            {!compact && (
                <>
                    <Footer />
                    <CookieBanner />
                    <MobileNav />
                </>
            )}
        </div>
    )
}

const Layout = ({
    children,
    parent,
    activeInternalMenu,
    className = '',
}: IProps & { className?: string }): JSX.Element => {
    const posthog = usePostHog()

    useEffect(() => {
        if (window && posthog?.setPersonProperties) {
            posthog.setPersonProperties({ preferred_theme: (window as any).__theme })
        }

        posthog?.register_once({
            utm_source: null,
            utm_medium: null,
            utm_campaign: null,
            utm_content: null,
            utm_term: null,
        })
    }, [])

    return (
        <SearchProvider>
            <LayoutProvider parent={parent} activeInternalMenu={activeInternalMenu}>
                <Article className={className}>{children}</Article>
            </LayoutProvider>
        </SearchProvider>
    )
}

export default Layout
export { Layout }
