import React, { useEffect } from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import Hero from 'components/Home/Sections/Hero'
import DataStackSection from 'components/Home/Sections/DataStackSection'
import PricingSection from 'components/Home/Sections/PricingSection'
import AISection from 'components/Home/Sections/AISection'
import WhyPostHogSection from 'components/Home/Sections/WhyPostHogSection'
import BedtimeReadingSection from 'components/Home/Sections/BedtimeReadingSection'
import ShamelessCTASection from 'components/Home/Sections/ShamelessCTASection'
import HitCounter from 'components/Home/HitCounter'
import Customers from '../Customers'

export default function HomeTest() {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'home.mdx')
        }
    }, [])

    return (
        <>
            <SEO
                title="PostHog – We make dev tools for product engineers"
                updateWindowTitle={false}
                description="All your developer tools in one place. PostHog gives engineers everything to build, test, measure, and ship successful products faster. Get started free."
                image="/images/og/default.png"
            />
            <ReaderView hideTitle proseSize="lg" showQuestions={false} hideRightSidebar hideMenu>
                <div className="space-y-12">
                    <Hero />
                    <Customers />
                    <DataStackSection />
                    <PricingSection />
                    <AISection />
                    <WhyPostHogSection />
                    <BedtimeReadingSection />
                    <ShamelessCTASection />
                    <HitCounter />
                </div>
            </ReaderView>
        </>
    )
}
