import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import CookieBanner from 'components/CookieBanner'
import usePostHog from '../../hooks/usePostHog'
import { SearchProvider } from 'components/Search/SearchContext'
import { useLocation } from '@reach/router'
import { animateScroll as scroll } from 'react-scroll'
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
                <div className="m-4">
                    <SearchBox className="!w-full" location="mobile-header" />
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
    const { hash } = useLocation()
    const posthog = usePostHog()

    useEffect(() => {
        if (window && posthog?.setPersonProperties) {
            posthog.setPersonProperties({ preferred_theme: (window as any).__theme })
        }
        if (hash) scroll.scrollMore(-108)
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
