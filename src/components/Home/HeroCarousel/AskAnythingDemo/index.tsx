import React, { useEffect, useState } from 'react'
import { Logo } from '@posthog/brand/logo'
import {
    IconArrowRight,
    IconAtSign,
    IconBook,
    IconCheck,
    IconChevronDown,
    IconCode2,
    IconDatabase,
    IconFlask,
    IconGraph,
    IconMessage,
    IconRewindPlay,
    IconServer,
    IconShield,
    IconToggle,
} from '@posthog/icons'
import { useInView } from 'react-intersection-observer'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import { usePauseAutoAdvance, useSlideActive, useSlidePaused } from '../autoAdvanceGate'
import './styles.css'

const QUESTION = 'Why are signups growing, but paid conversions falling?'
const DURATION = 20000
const CONVERSATION_START = 4800
const FINDING_START = 15500

const TOOLS = [
    {
        slug: 'google-ads',
        label: 'Google Ads',
        action: 'Compare campaign traffic',
        result: 'More visitors, same audience',
        start: 5800,
    },
    {
        slug: 'posthog',
        label: 'PostHog',
        action: 'Analyze the signup → payment funnel',
        result: 'Drop-off at mobile checkout',
        start: 8200,
    },
    {
        slug: 'stripe',
        label: 'Stripe',
        action: 'Check payments and declines',
        result: 'Payment declines are unchanged',
        start: 10600,
    },
    {
        slug: 'github',
        label: 'GitHub',
        action: 'Review recent checkout changes',
        result: 'A required field was added',
        start: 13000,
    },
]

const CAPABILITIES = [
    { label: 'Coding', Icon: IconCode2 },
    { label: 'Product analytics', Icon: IconGraph },
    { label: 'SQL', Icon: IconDatabase },
    { label: 'Session replay', Icon: IconRewindPlay },
    { label: 'SDK setup', Icon: IconServer },
    { label: 'Feature flags', Icon: IconToggle },
    { label: 'Experiments', Icon: IconFlask },
    { label: 'Surveys', Icon: IconMessage },
    { label: 'Docs', Icon: IconBook },
]

function PostHogMark({ className = '' }: { className?: string }) {
    return (
        <span className={className}>
            <Logo layout="logomark" variant="gradient" className="block dark:hidden" />
            <Logo layout="logomark" variant="mono" className="hidden dark:block" />
        </span>
    )
}

/** A scripted illustration. The composer and service calls never submit real requests. */
export default function AskAnythingDemo() {
    const sources: { label: string; url: string; image: string }[] = useSourcePlatforms()
    const active = useSlideActive()
    const carouselPaused = useSlidePaused()
    const reducedMotion = usePrefersReducedMotion()
    const { ref, inView } = useInView({ threshold: 0.25 })
    const [pageVisible, setPageVisible] = useState(true)
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const update = () => setPageVisible(!document.hidden)
        update()
        document.addEventListener('visibilitychange', update)
        return () => document.removeEventListener('visibilitychange', update)
    }, [])

    // Re-entering this slide starts a new demonstration; pausing or scrolling does not.
    useEffect(() => {
        if (active) setElapsed(0)
    }, [active])

    const finished = elapsed >= DURATION
    const running = active && inView && pageVisible && !carouselPaused && !reducedMotion && !finished
    usePauseAutoAdvance(active && !finished && !reducedMotion)

    useEffect(() => {
        if (!running) return
        let previous = performance.now()
        const timer = window.setInterval(() => {
            const now = performance.now()
            const delta = now - previous
            previous = now
            setElapsed((time) => Math.min(DURATION, time + delta))
        }, 50)
        return () => window.clearInterval(timer)
    }, [running])

    const time = reducedMotion ? DURATION : elapsed
    const conversation = time >= CONVERSATION_START
    const finding = time >= FINDING_START
    const typedQuestion = QUESTION.slice(0, Math.floor(Math.max(0, time - 1500) / 45))

    return (
        <div
            ref={ref}
            className="ask-anything-demo not-prose relative w-full overflow-hidden rounded border border-primary bg-primary text-primary shadow-2xl"
            data-phase={finding ? 'finding' : conversation ? 'tools' : 'composer'}
            data-running={running}
            role="group"
            aria-label="PostHog AI demonstration"
        >
            <p className="sr-only">
                Illustrative demo: PostHog AI investigates falling paid conversion using Google Ads traffic, PostHog
                funnels, Stripe payments, and GitHub changes. It finds an extra required field at mobile checkout and
                recommends testing a shorter checkout. All findings are sample data.
            </p>

            <div className="ai-demo-welcome" aria-hidden="true" data-visible={!conversation}>
                <PostHogMark className="ai-demo-welcome-logo" />
                <h3>How can I help you build?</h3>
                <p className="ai-demo-tagline">Build something people want.</p>

                <div className="ai-demo-composer" data-submitting={time >= 4200 && !conversation}>
                    <span className="ai-demo-context">
                        <IconAtSign /> Add context <IconChevronDown />
                    </span>
                    <div className="ai-demo-prompt">
                        {typedQuestion || <span className="text-secondary">Describe the task in detail...</span>}
                        {typedQuestion && time < 4200 && <span className="ai-demo-caret" />}
                    </div>
                    <div className="ai-demo-composer-footer">
                        <span className="ai-demo-select">
                            <IconShield className="text-green" /> Auto <IconChevronDown />
                        </span>
                        <span className="ai-demo-select">
                            Default · Claude Sonnet 5 High <IconChevronDown />
                        </span>
                        <span className="ai-demo-send">
                            <IconArrowRight />
                        </span>
                    </div>
                </div>

                <div className="ai-demo-capabilities">
                    {CAPABILITIES.map(({ label, Icon }) => (
                        <span key={label}>
                            <Icon />
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="ai-demo-conversation" aria-hidden="true" data-visible={conversation}>
                <div className="ai-demo-chat-heading">
                    <PostHogMark /> <strong>PostHog AI</strong>
                    <span>Sample data</span>
                </div>
                <div className="ai-demo-question">{QUESTION}</div>
                <p className="ai-demo-intro">I’ll trace the path from ad click to paying customer.</p>
                <div className="ai-demo-tools">
                    {TOOLS.map((tool) => {
                        const started = time >= tool.start
                        const done = time >= tool.start + 1800
                        const source = sources.find(({ url }) => url.endsWith(`/${tool.slug}`))
                        return (
                            <div className="ai-demo-tool" key={tool.slug} data-visible={started} data-done={done}>
                                <span className="ai-demo-service-logo">
                                    {tool.slug === 'posthog' ? (
                                        <PostHogMark />
                                    ) : (
                                        <img
                                            src={source?.image}
                                            alt=""
                                            className={tool.slug === 'github' ? 'dark:invert' : undefined}
                                        />
                                    )}
                                </span>
                                <div className="ai-demo-tool-copy">
                                    <strong>{tool.label}</strong>
                                    <span>{done ? tool.result : tool.action}</span>
                                </div>
                                <span className="ai-demo-tool-status">
                                    {done ? <IconCheck className="text-green" /> : <span className="ai-demo-spinner" />}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className="ai-demo-finding" data-visible={finding}>
                    <strong>The drop starts before payment.</strong>
                    <p>A new required field is losing customers at mobile checkout.</p>
                    <span>
                        <IconFlask /> Test a shorter mobile checkout.
                    </span>
                </div>
            </div>
        </div>
    )
}
