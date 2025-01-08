import React from 'react'
import { useChat } from 'hooks/useChat'
import { useStaticQuery } from 'gatsby'
import { graphql } from 'gatsby'
import { IconLightBulb, IconSidebarOpen } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'

interface AskMaxProps {
    border?: boolean
}

export function AskMax({ border = false }: AskMaxProps) {
    const { setChatOpen } = useChat()
    const {
        allDocsPages: { totalDocsCount },
    } = useStaticQuery(graphql`
        query {
            allDocsPages: allMdx(filter: { slug: { regex: "^/docs/" } }) {
                totalDocsCount: totalCount
            }
        }
    `)

    const borderClasses = border ? 'py-6 border-y border-light dark:border-dark' : ''

    return (
        <div className={`flex flex-col md:flex-row items-center justify-center gap-4 relative mb-8 md:mb-6 py-2 ${borderClasses}`}>
            <IconLightBulb className="size-10 inline-block bg-accent dark:bg-accent-dark rounded p-2 text-primary/50 dark:text-primary-dark/50" />

            <div className="flex flex-col text-center md:text-left">
                <h3 className="mb-0 text-lg leading-tight">Questions? <span className="text-red dark:text-yellow">Ask Max AI.</span></h3>
                <p className="text-[15px] mb-0 opacity-75">
                    It's easier than reading through <strong>{totalDocsCount} docs articles</strong>.
                </p>
            </div>
            <div className="md:pl-4">
                <CallToAction type="secondary" size="md" className="group [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:px-3" onClick={() => setChatOpen(true)}>
                    Chat with Max AI
                    <IconSidebarOpen className="size-6 inline-block opacity-75 group-hover:opacity-100" />
                </CallToAction>
            </div>
        </div>
    )
}