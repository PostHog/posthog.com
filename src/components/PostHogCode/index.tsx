import React, { useState, useEffect, useCallback } from 'react'
import CodeHeader from './CodeHeader'
import CodeSidebar from './CodeSidebar'
import CodeConversation from './CodeConversation'
import CodeEditor from './CodeEditor'
import { sections } from './data'
import { ConversationItem } from './types'

const LOREM_RESPONSES: React.ReactNode[] = [
    <>
        <p>
            I've analyzed your PostHog data and here's what I found. Your events schema looks well-structured — I can
            see <code>$pageview</code>, <code>$autocapture</code>, and several custom events. Based on the patterns in
            your analytics, the most impactful area to focus on is your onboarding funnel, where there's a significant
            drop-off between steps 2 and 3.
        </p>
        <p>
            I've queried the last 7 days and the conversion rate from signup to first meaningful action is around 34%.
            Want me to dig deeper into what's causing the drop-off, or should I look at which user segments are
            performing best?
        </p>
    </>,
    <>
        <p>I ran a HogQL query against your events table and found a few things worth calling out:</p>
        <ul>
            <li>
                Your <code>identify</code> calls are firing correctly on login
            </li>
            <li>
                There are 3 custom events with inconsistent naming (<code>button_click</code> vs{' '}
                <code>buttonClick</code> vs <code>button-click</code>)
            </li>
            <li>Session recordings show users hesitating on the pricing page before converting</li>
        </ul>
        <p>
            I can standardize the event naming in your codebase and create an action in PostHog to group them. Want me
            to proceed?
        </p>
    </>,
    <>
        <p>
            Based on your feature flag configuration, the <code>new-dashboard-ui</code> flag is currently rolled out to
            45% of users. Looking at the session recordings for users in the test group vs control group, the new UI is
            seeing a 12% higher engagement rate with the main chart component.
        </p>
        <p>
            Your experiment has reached statistical significance (p &lt; 0.05). I can update the flag to 100% rollout
            and archive the experiment — should I do that, or would you like to review the full results first?
        </p>
    </>,
    <>
        <p>
            I've read through your codebase and found the relevant instrumentation. You're using <code>posthog-js</code>{' '}
            v1.82.0 — there's a newer version (v1.95.0) with improved session recording compression and a fix for the
            Safari ITP issue you mentioned.
        </p>
        <p>
            I can update the package, migrate any deprecated API calls (<code>posthog.people.set</code> →{' '}
            <code>posthog.setPersonProperties</code>), and add the missing <code>$set_once</code> calls for first-touch
            attribution. Want me to create a PR for this?
        </p>
    </>,
    <>
        <p>I queried your error tracking and found 3 active issues in the last 24 hours:</p>
        <ul>
            <li>
                <strong>TypeError: Cannot read property 'id' of undefined</strong> — 47 occurrences, affecting users on
                the billing page
            </li>
            <li>
                <strong>ChunkLoadError</strong> — 12 occurrences, likely a deploy timing issue
            </li>
            <li>
                <strong>Network request failed</strong> — 8 occurrences, mostly in India/Southeast Asia
            </li>
        </ul>
        <p>
            I can pull a session recording for the billing page error to see exactly what's happening. Want me to look
            at that first?
        </p>
    </>,
]

function pickLoremResponse(): React.ReactNode {
    return LOREM_RESPONSES[Math.floor(Math.random() * LOREM_RESPONSES.length)]
}

export default function PostHogCode() {
    const [activeSection, setActiveSection] = useState(0)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [extraMessages, setExtraMessages] = useState<ConversationItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState('')
    const timeoutsRef = React.useRef<ReturnType<typeof setTimeout>[]>([])

    // Reset extra messages when switching sections
    useEffect(() => {
        setExtraMessages([])
        setIsLoading(false)
        setInput('')
        // Clear any pending timeouts
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []
    }, [activeSection])

    // Cleanup on unmount
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

            // After ~1.2s: append tool calls (replace loading with tools + new loading)
            const t1 = setTimeout(() => {
                const querySnippet = text.split(' ').slice(0, 4).join(' ')
                setExtraMessages((prev) => [
                    ...prev,
                    { type: 'tool', toolName: 'Read', toolDetail: 'posthog-mcp/schema.ts' },
                    { type: 'tool', toolName: 'Grep', toolDetail: `"${querySnippet}"` },
                ])
            }, 1200)

            // After ~2.8s: add agent response and clear loading
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
        <div className="flex flex-col h-full font-code @container" data-scheme="primary">
            <CodeHeader
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                title={sections[activeSection]?.title}
            />
            <div className="flex flex-1 overflow-hidden">
                {sidebarOpen && (
                    <CodeSidebar sections={sections} activeSection={activeSection} onSectionClick={setActiveSection} />
                )}
                <div className="flex flex-col flex-1 overflow-hidden">
                    <CodeConversation conversation={conversation} activeSection={activeSection} />
                    <CodeEditor value={input} onChange={setInput} onSubmit={handleSubmit} disabled={isLoading} />
                </div>
            </div>
        </div>
    )
}
