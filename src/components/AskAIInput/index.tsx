// Use to replace FAQs with an Ask PostHog AI input interface, let users choose their own FAQs. Add a h2 heading "Have a question? Ask PostHog AI" above this component in the MDX file

import React, { useState } from 'react'
import { IconSparkles } from '@posthog/icons'
import { useLayoutData } from 'components/Layout/hooks'
import usePostHog from 'hooks/usePostHog'
import { useApp } from '../../context/App'
import { useLocation } from '@reach/router'
import { useWindow } from '../../context/Window'
import OSButton from 'components/OSButton'

interface AskAIInputProps {
    placeholder?: string
    className?: string
}

const DEFAULT_PLACEHOLDER = 'Ask a question...'

export default function AskAIInput({ placeholder = DEFAULT_PLACEHOLDER, className = '' }: AskAIInputProps) {
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
        <div className={`flex gap-2 items-center ${className}`}>
            <input
                type="text"
                value={question}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        handleSubmit()
                    }
                }}
                placeholder={placeholder}
                className="flex-1 bg-primary border border-primary rounded px-2 py-2 ring-0 focus:ring-0"
            />
            <OSButton
                variant="secondary"
                size="md"
                onClick={handleSubmit}
                icon={<IconSparkles />}
                iconPosition="right"
                disabled={!question.trim()}
            >
                Ask PostHog AI
            </OSButton>
        </div>
    )
}
