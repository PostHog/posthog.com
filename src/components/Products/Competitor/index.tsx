import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export const VsCompetitor = ({ title, children }) => {
    return (
        <div
            className={`rounded-md p-4 border border-light dark:border-dark bg-white/50 dark:bg-accent-dark flex flex-col-reverse md:flex-row gap-4`}
        >
            <div className="flex-1">
                <h4 className="leading-tight">{title}</h4>
                {children}
            </div>
            <div className="shrink-0 basis-[167px] text-center">
                <StaticImage src="../../../images/products/competitors-sr.png" className="max-w-[167px]" />
            </div>
        </div>
    )
}
