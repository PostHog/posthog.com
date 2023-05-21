import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { IComparison } from './types'

export default function Comparison({ description, children }: IComparison) {
    return (
        <div id="comparison" className="max-w-screen-2xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="m-0">PostHog vs...</h2>
                    {/*<p className="m-0">{description}</p>*/}
                </div>
            </div>

            <div className="-mx-12 my-4 relative">
                <StaticImage className="w-full sm:hidden" alt="PostHog vs..." src="./images/vs-mobile.jpg" />
                <StaticImage className="hidden sm:block w-full" alt="PostHog vs..." src="./images/vs.jpg" />
            </div>

            <div className="overflow-x-auto article-content mt-0 -mx-5 px-5">{children}</div>
        </div>
    )
}
