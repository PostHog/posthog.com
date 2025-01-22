import React from 'react'
import { useChat } from 'hooks/useChat'
import { useStaticQuery } from 'gatsby'
import { graphql } from 'gatsby'
import { IconLightBulb, IconSidebarOpen } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { useLayoutData } from 'components/Layout/hooks'
import usePostHog from 'hooks/usePostHog'

interface AskMaxProps {
    border?: boolean
    className?: string
    quickQuestions?: string[]
    linkOnly?: boolean
    children?: React.ReactNode
}

export default function AskMax({
    border = false,
    className = '',
    quickQuestions,
    linkOnly = false,
    children,
}: AskMaxProps) {
    const posthog = usePostHog()
    const { compact } = useLayoutData()
    const { openChat, setQuickQuestions } = useChat()
    const {
        allDocsPages: { totalDocsCount },
    } = useStaticQuery(graphql`
        query {
            allDocsPages: allMdx(filter: { slug: { regex: "^/docs/" } }) {
                totalDocsCount: totalCount
            }
        }
    `)

    const borderClasses = border ? 'py-6 mt-4 border-y border-light dark:border-dark' : 'mb-8'

    const handleChatOpen = () => {
        posthog?.capture('Opened MaxAI chat')
        if (quickQuestions) {
            setQuickQuestions(quickQuestions)
        }
        openChat()
    }

    if (linkOnly) {
        return (
            <button onClick={handleChatOpen} className={className}>
                {children}
            </button>
        )
    }

    return compact ? null : (
        <div className="@container">
            <div
                className={`flex flex-col @lg:flex-row items-center justify-center @3xl:justify-start gap-4 @2xl:!gap-8 relative py-2 w-full @2xl:w-auto ${borderClasses} ${className}`}
            >
                <div className="flex-1 @2xl:flex-[0_0_auto] flex flex-col @lg:flex-row items-center justify-center gap-4">
                    <div>
                        <IconLightBulb className="size-10 inline-block bg-accent dark:bg-accent-dark rounded p-2 text-primary/50 dark:text-primary-dark/50" />
                    </div>

                    <div className="flex flex-col text-center @lg:text-left">
                        <h3 className="mb-0 !text-2xl @lg:!text-xl leading-tight">
                            Questions? <span className="text-red dark:text-yellow">Ask Max AI.</span>
                        </h3>
                        <p className="text-[15px] mb-0 opacity-75 text-balance">
                            It's easier than reading through <strong>{totalDocsCount} docs articles</strong>.
                        </p>
                    </div>
                </div>
                <div>
                    <CallToAction
                        type="secondary"
                        size="md"
                        className="group [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:px-3"
                        onClick={handleChatOpen}
                    >
                        Chat with Max AI
                        <IconSidebarOpen className="size-6 inline-block opacity-75 group-hover:opacity-100" />
                    </CallToAction>
                </div>
            </div>
        </div>
    )
}
