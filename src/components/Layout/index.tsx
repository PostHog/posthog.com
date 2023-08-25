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
                <div className={className}>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <CookieBanner />
                    <MobileNav />
                </div>
            </LayoutProvider>
        </SearchProvider>
    )
}

export default Layout
export { Layout }
