import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { useApp } from '../../../context/App'

export default function BrickBreak(): JSX.Element {
    const { websiteMode } = useApp()
    return (
        <>
            <SEO
                title="Brick Break - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer template="generic" slug="brick-break" title="Brick Break" fullScreen>
                <iframe
                    src="https://brickbreak-wheat.vercel.app/"
                    className={`w-full h-full border-0 ${websiteMode ? 'min-h-[calc(100vh-103px)]' : ''}`}
                />
            </Explorer>
        </>
    )
}
