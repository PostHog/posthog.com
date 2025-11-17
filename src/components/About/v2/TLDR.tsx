import React from 'react'
import Link from 'components/Link'

export const TLDR = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-sm mx-auto border-2 border-primary px-4 py-3 mt-4 mb-1 mr-1 rotate-1">
            <div className="flex gap-2 items-center mb-2">
                <div className="w-10">
                    <div className="size-10 rounded-full bg-accent flex justify-center items-center text-xl font-bold text-muted">
                        TN
                    </div>
                </div>
                <div className="flex-1 text-sm flex flex-col">
                    <strong>TLDR Founders Newsletter</strong>
                    <span className="text-secondary text-xs">June 18, 2025</span>
                </div>
            </div>

            <p className="!mb-1">
                <Link
                    to="https://www.cautiousoptimism.news/p/posthog-vs-the-industry"
                    externalNoIcon
                    className="!text-primary underline !font-bold"
                >
                    PostHog vs. The Industry
                </Link>
            </p>
            <div className="prose-sm">{children}</div>
        </div>
    )
}
