import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { IComparison } from './types'

export default function Comparison({ children }: IComparison) {
    return (
        <div id="comparison" className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="m-0">PostHog vs...</h2>
                    <p className="m-0">How does PostHog compare?</p>
                </div>
                <div>
                    <StaticImage className="max-w-[530px]" alt="PostHog vs..." src="./images/vs.png" />
                </div>
            </div>
            <div className="overflow-x-auto article-content mt-12">{children}</div>
        </div>
    )
}
