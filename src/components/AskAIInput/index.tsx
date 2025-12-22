// Use to replace FAQs with an Ask PostHog AI input interface, let users choose their own FAQs. Add a h2 heading "Have a question? Ask PostHog AI" above this component in the MDX file

import React, { useState } from 'react'
import { IconSparkles } from '@posthog/icons'
import { useLayoutData } from 'components/Layout/hooks'
import usePostHog from 'hooks/usePostHog'
import { useApp } from '../../context/App'
import { useLocation } from '@reach/router'
import { useWindow } from '../../context/Window'

interface AskAIInputProps {
    placeholder?: string
    className?: string
}

export default function AskAIInput({ placeholder = 'Enter your question...', className = '' }: AskAIInputProps) {
    const [question, setQuestion] = useState('')
    const posthog = usePostHog()
    const { compact } = useLayoutData()
    const { openNewChat } = useApp()
    const { appWindow } = useWindow()
    const location = useLocation()

    const handleSubmit = () => {
        if (!question.trim()) return
        posthog?.capture('Opened MaxAI chat', { source: 'AskAI input' })
        openNewChat({
            path: `ask-max-${location.pathname}`,
            initialQuestion: question,
            context: [
                {
                    type: 'page',
                    value: {
                        path: appWindow?.path || '',
                        label: appWindow?.meta?.title || '',
                    },
                },
            ],
        })
    }

    if (compact) return null

    return (
        <div className={`relative mt-2 mb-4 border border-primary rounded overflow-hidden ${className}`}>
            <div className="relative flex items-center bg-accent px-3 py-2">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit()
                        }
                    }}
                    placeholder={placeholder}
                    className="flex-1 text-sm bg-transparent border-none outline-none focus:ring-0 placeholder:text-muted"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!question.trim()}
                    className="inline-flex items-center gap-1 text-muted hover:text-secondary px-1 py-1 bg-transparent hover:bg-border border border-transparent hover:border rounded relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99] text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <span className="whitespace-nowrap">PostHog AI</span>
                    <IconSparkles className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
