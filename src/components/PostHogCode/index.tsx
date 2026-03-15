import React, { useState, useEffect, useCallback } from 'react'
import CodeHeader from './CodeHeader'
import CodeSidebar from './CodeSidebar'
import CodeConversation from './CodeConversation'
import CodeEditor from './CodeEditor'
import { sections } from './data'
import { ConversationItem } from './types'
import { useIntersectionObserver } from 'hooks/useIntersectionObserver'

const LOREM_RESPONSES: React.ReactNode[] = [
    <>
        <p className="m-0 mb-2">
            I&apos;ve analyzed your PostHog data and here&apos;s what I found. Your events schema looks well-structured
            – I can see $pageview, $autocapture, and several custom events. Based on the patterns in your analytics, the
            most impactful area to focus on is your onboarding funnel, where there&apos;s a significant drop-off between
            steps 2 and 3.
        </p>
        <p className="m-0">
            I&apos;ve queried the last 7 days and the conversion rate from signup to first meaningful action is around
            34%. Want me to dig deeper into what&apos;s causing the drop-off, or should I look at which user segments
            are performing best?
        </p>
    </>,
    <>
        <p className="m-0 mb-2">
            I ran a HogQL query against your events table and found a few things worth calling out:
        </p>
        <ul className="m-0 mb-2 pl-4 list-disc">
            <li>Your identify calls are firing correctly on login</li>
            <li>There are 3 custom events with inconsistent naming (button_click vs buttonClick vs button-click)</li>
            <li>Session recordings show users hesitating on the pricing page before converting</li>
        </ul>
        <p className="m-0">
            I can standardize the event naming in your codebase and create an action in PostHog to group them. Want me
            to proceed?
        </p>
    </>,
    <>
        <p className="m-0 mb-2">
            Based on your feature flag configuration, the new-dashboard-ui flag is currently rolled out to 45% of users.
            Looking at the session recordings for users in the test group vs control group, the new UI is seeing a 12%
            higher engagement rate with the main chart component.
        </p>
        <p className="m-0">
            Your experiment has reached statistical significance (p &lt; 0.05). I can update the flag to 100% rollout
            and archive the experiment – should I do that, or would you like to review the full results first?
        </p>
    </>,
]

function pickLoremResponse(): React.ReactNode {
    return LOREM_RESPONSES[Math.floor(Math.random() * LOREM_RESPONSES.length)]
}

export default function PostHogCode() {
    const { elementRef, isInView } = useIntersectionObserver({ threshold: 0.15, rootMargin: '80px', triggerOnce: true })
    const [activeSection, setActiveSection] = useState(0)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [extraMessages, setExtraMessages] = useState<ConversationItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState('')
    const timeoutsRef = React.useRef<ReturnType<typeof setTimeout>[]>([])

    useEffect(() => {
        setExtraMessages([])
        setIsLoading(false)
        setInput('')
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []
    }, [activeSection])

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout)
        }
    }, [])

    const handleSubmit = useCallback(
        (text: string) => {
            if (!text.trim() || isLoading) return

            setInput('')
            setExtraMessages((prev) => [...prev, { type: 'user', content: text }])
            setIsLoading(true)

            const t1 = setTimeout(() => {
                const querySnippet = text.split(' ').slice(0, 4).join(' ')
                setExtraMessages((prev) => [
                    ...prev,
                    { type: 'tool', toolName: 'Read', toolDetail: 'posthog-mcp/schema.ts' },
                    { type: 'tool', toolName: 'Grep', toolDetail: `"${querySnippet}"` },
                ])
            }, 1200)

            const t2 = setTimeout(() => {
                setIsLoading(false)
                setExtraMessages((prev) => [...prev, { type: 'agent', content: pickLoremResponse() }])
            }, 2800)

            timeoutsRef.current.push(t1, t2)
        },
        [isLoading]
    )

    const conversation: ConversationItem[] = [
        ...(sections[activeSection]?.conversation || []),
        ...extraMessages,
        ...(isLoading ? [{ type: 'loading' as const }] : []),
    ]

    return (
        <div
            ref={elementRef}
            className="flex flex-col h-full min-h-0 bg-primary border border-primary rounded-md overflow-hidden"
        >
            <CodeHeader
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                title={sections[activeSection]?.title}
            />
            <div className="flex flex-1 min-h-0">
                {sidebarOpen && (
                    <CodeSidebar sections={sections} activeSection={activeSection} onSectionClick={setActiveSection} />
                )}
                <div className="flex flex-col flex-1 min-w-0">
                    <CodeConversation
                        conversation={conversation}
                        activeSection={activeSection}
                        typewriterTrigger={isInView && activeSection === 0}
                    />
                    <CodeEditor value={input} onChange={setInput} onSubmit={handleSubmit} disabled={isLoading} />
                </div>
            </div>
        </div>
    )
}
