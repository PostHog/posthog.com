import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { useApp } from '../../../context/App'

export default function BrickHog(): JSX.Element {
    const { websiteMode } = useApp()
    return (
        <>
            <SEO
                title="BrickHog - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer template="generic" slug="brickhog" title="BrickHog" fullScreen>
                <iframe
                    src="https://brickbreak-ebon.vercel.app/"
                    className={`w-full h-full border-0 ${websiteMode ? 'min-h-[calc(100vh-103px)]' : ''}`}
                />
            </Explorer>
        </>
    )
}
