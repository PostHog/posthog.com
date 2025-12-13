import React, { useState } from 'react'
import { HomepageCards } from 'components/NoHatingAllowed/data'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'
import SEO from 'components/seo'
import OSButton from 'components/OSButton'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { useApp } from '../../context/App'
import WistiaVideo from 'components/WistiaVideo'

export default function Home2() {
    const { siteSettings } = useApp()

    return (
        <>
            <SEO
                title="Welcome to PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Wizard
                leftNavigation={
                    <>
                        <CallToAction type="secondary" size="sm">
                            Previous
                        </CallToAction>
                    </>
                }
                rightNavigation={
                    <>
                        <OSButton asLink to="/demo" variant="primary" size="md" state={{ newWindow: true }}>
                            Watch a demo
                        </OSButton>
                    </>
                }
            >
                <ScrollArea className="flex-1 w-full [&>div>div]:h-full [&>div>div]:!flex [&>div>div]:flex-col [&>div>div]:py-4">
                    <Logo className="inline-block" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />
                    <h1>The AI platform for engineers</h1>
                    <p>Debug products. Ship features faster. With all user and product data in one stack.</p>

                    <WistiaVideo videoId="pmh9dvfgj4" className="max-w-96" />
                </ScrollArea>
            </Wizard>
        </>
    )
}
