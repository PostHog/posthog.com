import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export const VsCompetitor = ({ title, children, image }) => {
    return (
        <div
            className={`p-4 border border-light dark:border-dark`}
        >
            <h4 className="leading-tight">{title}</h4>
            <div className="flex flex-col-reverse md:flex-row gap-4">
                <div className="flex-1 mb-auto">
                    {children}
                </div>
                <div className="shrink-0 basis-[189px] text-center">{image}</div>
            </div>
        </div>
    )
}
