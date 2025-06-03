import React from 'react'
import Link from 'components/Link'
import CalloutBox from 'components/Docs/CalloutBox'
import { CallToAction } from 'components/CallToAction'
import { IconOpenSidebar, IconMagicWand } from '@posthog/icons'

type MaxCTAProps = {
    className?: string
    children?: React.ReactNode
    question: string
}

export const MaxCTA = ({ className = '', children, question }: MaxCTAProps): JSX.Element => {
    const encodedQuestion = encodeURIComponent(question)
    const maxUrl = `https://app.posthog.com/#panel=max:!${encodedQuestion}`

    return (
        <div
            className={`ph-callout flex flex-col md:flex-row gap-2 md:gap-4 mt-4 mb-6 p-4 border rounded bg-gray/10 border-gray`}
        >
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                    <div className="shrink-0 opacity-75">
                        <IconMagicWand className="size-6" />
                    </div>
                    <strong className="text-lg">Run this faster with Max AI</strong>
                </div>
                <div className="ph-text pl-8 text-[15px] [&_p]:text-[15px] [&_*]:text-[15px] [&>*:last-child]:mb-0 !leading-relaxed">
                    Already using PostHog? <Link href="/docs/max-ai">Max</Link> can run this query for you.
                </div>
            </div>
            <aside className="pt-1 pl-8 md:pl-0">
                <CallToAction
                    type="secondary"
                    size="sm"
                    className="group [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:px-3"
                    childClassName="whitespace-nowrap"
                    href={maxUrl}
                    externalNoIcon
                >
                    Ask with Max
                    <IconOpenSidebar className="size-6 inline-block opacity-75 group-hover:opacity-100" />
                </CallToAction>
            </aside>
        </div>
    )
}
