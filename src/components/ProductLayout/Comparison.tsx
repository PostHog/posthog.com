import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { IComparison } from './types'

export default function Comparison({ children }: IComparison) {
    return (
        <div id="comparison" className="max-w-screen-2xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="m-0">PostHog vs...</h2>
                    <p className="m-0">How does PostHog compare?</p>
                </div>
            </div>

            <div className="-mx-12 my-4 relative">
                <div className="w-full sm:hidden">
                    <StaticImage alt="PostHog vs..." src="./images/vs-mobile.jpg" />
                </div>
                <div className="hidden sm:block w-full">
                    <StaticImage alt="PostHog vs..." src="./images/vs.jpg" />
                </div>
            </div>

            <div className="overflow-x-auto article-content mt-0 -mx-5 px-5">{children}</div>
        </div>
    )
}
