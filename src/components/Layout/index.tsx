import React, { useEffect, useState } from 'react'
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
import Toggle from 'components/Toggle'
import Tooltip from 'components/Tooltip'

const TheoToggle = () => {
    const { theoMode, setTheoMode } = useLayoutData()
    return (
        <Tooltip content="Want to disable Theo mode?" placement="right-start">
            <div className="group fixed top-4 right-4 flex items-center bg-accent dark:bg-accent-dark rounded-full border border-light hover:border-border dark:border-dark py-1 pl-2 pr-3">
                <img
                    className="w-[25px] inline-block mr-1.5 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-50 dark:opacity-100 group-hover:opacity-100 relative group-hover:scale-[1.75] group-hover:-rotate-12 group-hover:-top-0.5"
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/theo_mode_0b96ff74d6.png"
                    alt="Want to disable Theo mode?"
                />
                <Toggle checked={theoMode} onChange={(checked) => setTheoMode(checked)} />
            </div>
        </Tooltip>
    )
}

const Article = ({
    children,
    className = '',
    headerBlur = true,
}: {
    children: React.ReactNode
    className?: string
    headerBlur?: boolean
}) => {
    const { compact, theoMode } = useLayoutData()

    return (
        <div className={className}>
            {/* <Banner /> */}
            {compact ? (
                <div className="px-4 py-3 border-b border-border dark:border-dark sticky top-0 z-[50] bg-light dark:bg-dark">
                    <SearchBox className="!w-full !py-2" location="mobile-header" />
                </div>
            ) : theoMode ? null : (
                <Header blur={headerBlur} />
            )}
            <main>{children}</main>
            {!compact && !theoMode && (
                <>
                    <Footer />
                    <CookieBanner />
                    <MobileNav />
                </>
            )}
            {theoMode && <TheoToggle />}
        </div>
    )
}

const Layout = ({
    children,
    parent,
    activeInternalMenu,
    className = '',
    headerBlur = true,
}: IProps & { className?: string; headerBlur?: boolean }): JSX.Element => {
    const posthog = usePostHog()

    useEffect(() => {
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
                <Article className={className} headerBlur={headerBlur}>
                    {children}
                </Article>
            </LayoutProvider>
        </SearchProvider>
    )
}

export default Layout
export { Layout }
