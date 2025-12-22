import React, { useState } from 'react'
import { IconSparkles } from '@posthog/icons'
import { useLayoutData } from 'components/Layout/hooks'
import usePostHog from 'hooks/usePostHog'
import { useApp } from '../../context/App'
import { useLocation } from '@reach/router'
import { useWindow } from '../../context/Window'

interface AskAIProps {
    placeholder?: string
    className?: string
}

export default function AskAI({ placeholder = 'Enter your question...', className = '' }: AskAIProps) {
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
            path: `ask-ai-${location.pathname}`,
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
        <div
            className={`flex items-center bg-primary border border-border rounded px-3 py-2 focus-within:border-primary ${className}`}
        >
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
                className="flex-1 bg-transparent border-0 outline-none text-primary placeholder:text-muted focus:ring-0"
            />
            <button
                onClick={handleSubmit}
                disabled={!question.trim()}
                className="inline-flex items-center gap-1.5 text-primary/50 hover:text-primary/75 hover:bg-accent text-sm rounded px-2 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <span className="whitespace-nowrap">PostHog AI</span>
                <IconSparkles className="size-4" />
            </button>
        </div>
    )
}
