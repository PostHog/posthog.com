import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { useValues } from 'kea'
import React, { useEffect } from 'react'
import './Fonts.scss'
import './Layout.scss'
import './SkeletonLoading.css'
import './DarkMode.scss'
import { PosthogAnnouncement } from '../PosthogAnnouncement/PosthogAnnouncement'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import SearchBar from '../../templates/Handbook/SearchBar'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import './DarkMode.scss'
import './Layout.scss'
import './SkeletonLoading.css'

const Navigation = () => {
    return (
        <div className="flex items-center justify-between px-4 py-2 md:border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark md:sticky top-0 z-50 bg-tan dark:bg-primary text-[15px] font-semibold text-[#00000040]">
            <div className="md:hidden block">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="md:block hidden">
                <SearchBar />
            </div>
            <div className="flex flex-shrink-0 space-x-2">
                <CallToAction type="primary" className="" size="sm">
                    Try PostHog
                </CallToAction>
                <CallToAction type="outline" size="sm" className="text-red hover:text-red md:block hidden">
                    Demo
                </CallToAction>
            </div>
        </div>
    )
}

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }
    }, [])

    return (
        <>
            <div className="flex items-start">
                <Header />
                <div className="w-full md:w-[calc(100vw-230px)]">
                    <Navigation />
                    <main>{children}</main>
                    <Footer />
                </div>
            </div>

            <PosthogAnnouncement />
        </>
    )
}

export default Layout
export { Layout }
