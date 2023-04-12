import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const TracksCTA = () => {
    return (
        <>
            <br />
            <p className="px-4 font-bold text-center z-10 relative mb-0 text-sm md:text-lg">
                Want more tips? Get curated courses and lessons in PostHog Tracks!
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
                <CallToAction width="56" to="/tracks">
                    Try PostHog Tracks
                </CallToAction>
                <CallToAction type="outline" width="56" to="/tutorials">
                    View all tutorials
                </CallToAction>
            </div>
            <br />
        </>
    )
}
