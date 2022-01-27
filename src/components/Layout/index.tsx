import { CallToAction } from 'components/CallToAction'
import { useValues } from 'kea'
import React, { useEffect } from 'react'
import { GetStartedModal } from '../../components/GetStartedModal'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import SearchBar from '../../templates/Handbook/SearchBar'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { PosthogAnnouncement } from '../PosthogAnnouncement/PosthogAnnouncement'
import './DarkMode.scss'
import './Layout.scss'
import './SkeletonLoading.css'

const Navigation = () => {
    return (
        <div className="flex justify-between px-4 py-2 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark sticky top-0 z-50 bg-tan dark:bg-primary text-[15px] font-semibold text-[#00000040]">
            <SearchBar />
            <div className="flex flex-shrink-0 space-x-2">
                <CallToAction type="custom" className="bg-red border-red text-white hover:text-white" size="md">
                    Try PostHog
                </CallToAction>
                <CallToAction type="outline" size="md" className="text-red hover:text-red">
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
                <div className="z-[9999] px-7 py-4 flex-shrink-0 w-[230px] h-screen sticky top-0 border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                    <Header />
                </div>
                <div className="w-[calc(100vw-230px)]">
                    <Navigation />
                    <main>{children}</main>
                    <Footer />
                </div>
            </div>

            <PosthogAnnouncement />
            <GetStartedModal />
        </>
    )
}

export default Layout
export { Layout }
