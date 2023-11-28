import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Logo from 'components/Logo'

export const VsPostHog = ({ children }) => {
    return (
        <div
            className={`rounded-md p-4 border-2 border-blue dark:border-blue bg-white/50 dark:bg-accent-dark flex flex-col md:flex-row gap-4`}
        >
            <div className="shrink-0 basis-[145px] text-center">
                <StaticImage
                    src="../../../images/products/competitors-hog.png"
                    className="max-w-[145px]"
                    placeholder="none"
                />
            </div>
            <div className="flex-1 mb-auto">
                <h4 className="leading-tight flex items-end gap-2">
                    <span>Reasons to choose</span> <Logo className="w-32" />
                </h4>
                {children}
            </div>
        </div>
    )
}
