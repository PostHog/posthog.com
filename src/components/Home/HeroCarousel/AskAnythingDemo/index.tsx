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
import './animations.css'

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
            className="ask-anything-demo @container aspect-[998/774] [background-color:color-mix(in_srgb,rgb(var(--bg))_60%,rgb(var(--accent)))] [&_svg]:size-[1em] [&_svg]:shrink-0 not-prose relative w-full overflow-hidden rounded border border-primary text-primary shadow-2xl"
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

            <div
                className="ai-demo-welcome absolute inset-0 flex flex-col items-center justify-center gap-[3cqw] px-[2.6%] py-[6cqw] text-[2.8cqw] leading-[1.4]"
                aria-hidden="true"
                data-visible={!conversation}
            >
                <PostHogMark className="ai-demo-welcome-logo block w-[10.4cqw] shrink-0 [&_svg]:!w-full [&_svg]:!h-auto" />
                <h3 className="w-full text-center m-0 text-[4cqw] font-bold leading-tight">
                    What can I help you with?
                </h3>

                <div
                    className="ai-demo-composer group/composer border border-primary bg-light dark:bg-dark relative w-full h-[28.85cqw] shrink-0 p-[1.8cqw] rounded-[2cqw] data-[submitting=true]:border-yellow"
                    data-submitting={time >= 4200 && !conversation}
                >
                    <span className="ai-demo-context border border-primary inline-flex items-center gap-[0.8cqw] whitespace-nowrap leading-none font-semibold text-secondary py-[0.8cqw] px-[1cqw] rounded-[1.1cqw] text-[2.5cqw]">
                        <IconAtSign /> Add context <IconChevronDown />
                    </span>
                    <div className="ai-demo-prompt pt-[3.1cqw] px-[1.3cqw] pb-0 text-[3cqw] leading-[1.4]">
                        {typedQuestion || <span className="text-secondary">Describe the task in detail...</span>}
                        {typedQuestion && time < 4200 && (
                            <span className="ai-demo-caret inline-block h-[1em] ml-[0.15em] border-r border-current align-[-0.12em]" />
                        )}
                    </div>
                    <div className="ai-demo-composer-footer absolute bottom-[1.8cqw] left-[1.8cqw] right-[1.3cqw] flex items-end gap-[1cqw]">
                        <span className="ai-demo-select border border-primary inline-flex items-center gap-[0.8cqw] whitespace-nowrap leading-none font-semibold bg-primary p-[1cqw] rounded-[0.7cqw] text-[2.5cqw] [&>svg:last-child]:!w-[0.7em] [&>svg:last-child]:ml-[0.5cqw]">
                            <IconShield className="text-green" /> Auto <IconChevronDown />
                        </span>
                        <span className="ai-demo-select border border-primary inline-flex items-center gap-[0.8cqw] whitespace-nowrap leading-none font-semibold bg-primary p-[1cqw] rounded-[0.7cqw] text-[2.5cqw] [&>svg:last-child]:!w-[0.7em] [&>svg:last-child]:ml-[0.5cqw]">
                            Default · Claude Sonnet 5 High <IconChevronDown />
                        </span>
                        <span className="ai-demo-send border border-yellow text-secondary flex items-center justify-center ml-auto w-[7.6cqw] h-[6.1cqw] rounded-[1.3cqw] shadow-[0_0.55cqw_0_rgb(var(--input-border))] [&_svg]:!size-[3.6cqw] group-data-[submitting=true]/composer:bg-yellow group-data-[submitting=true]/composer:text-black">
                            <IconArrowRight />
                        </span>
                    </div>
                </div>

                <div className="ai-demo-capabilities w-full flex flex-wrap gap-y-[1.5cqw] gap-x-[1.2cqw] justify-center [&_svg]:text-secondary">
                    {CAPABILITIES.map(({ label, Icon }) => (
                        <span
                            key={label}
                            className="border border-primary inline-flex items-center gap-[0.8cqw] whitespace-nowrap leading-none font-semibold bg-primary p-[0.85cqw] rounded-[1.1cqw] text-[2.5cqw] shadow-[0_0.45cqw_0_rgb(var(--input-border))]"
                        >
                            <Icon className="fill-current [&_g]:[clip-path:none]" />
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <div
                className="ai-demo-conversation absolute inset-0 text-[2.8cqw] leading-[1.4] p-[3cqw]"
                aria-hidden="true"
                data-visible={conversation}
            >
                <div className="ai-demo-chat-heading flex items-center gap-[1.1cqw] h-[3.6cqw] text-[2.5cqw] [&>span:first-child]:w-[4.8cqw] [&_svg]:!w-full [&_svg]:!h-auto [&>span:last-child]:text-secondary [&>span:last-child]:ml-auto [&>span:last-child]:mr-[4.8cqw] [&>span:last-child]:text-[1.9cqw]">
                    <PostHogMark /> <strong>PostHog AI</strong>
                    <span>Sample data</span>
                </div>
                <div className="ai-demo-question border border-primary bg-accent mt-[2.2cqw] mr-0 mb-[2.4cqw] ml-auto py-[1.6cqw] px-[2cqw] w-[85%] rounded-[1.5cqw] font-semibold text-[2.7cqw]">
                    {QUESTION}
                </div>
                <p className="ai-demo-intro m-0 mb-[2cqw] text-[2.6cqw]">
                    I’ll trace the path from ad click to paying customer.
                </p>
                <div className="ai-demo-tools grid gap-[0.8cqw]">
                    {TOOLS.map((tool) => {
                        const started = time >= tool.start
                        const done = time >= tool.start + 1800
                        const source = sources.find(({ url }) => url.endsWith(`/${tool.slug}`))
                        return (
                            <div
                                className="ai-demo-tool border-b border-primary flex items-center gap-[1.6cqw] min-h-[7.4cqw] p-[0.4cqw] leading-tight"
                                key={tool.slug}
                                data-visible={started}
                                data-done={done}
                            >
                                <span className="ai-demo-service-logo flex items-center justify-center size-[4cqw] shrink-0 [&_img]:block [&_img]:size-full [&_img]:object-contain [&>span]:w-full [&_svg]:!w-full [&_svg]:!h-auto">
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
                                <div className="ai-demo-tool-copy flex flex-col gap-[0.1cqw] [&_strong]:text-[2.4cqw] [&>span]:text-secondary [&>span]:text-[2.2cqw]">
                                    <strong>{tool.label}</strong>
                                    <span>{done ? tool.result : tool.action}</span>
                                </div>
                                <span className="ai-demo-tool-status flex justify-center w-[3cqw] ml-auto">
                                    {done ? (
                                        <IconCheck className="text-green" />
                                    ) : (
                                        <span className="ai-demo-spinner border-primary border-t-current size-[2.2cqw] border-2 border-solid rounded-full" />
                                    )}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div
                    className="ai-demo-finding bg-light dark:bg-dark border border-primary mt-[2.4cqw] py-[1.7cqw] px-[2cqw] rounded-[1.5cqw] [&>strong]:text-[2.8cqw] [&_p]:text-secondary [&_p]:text-[2.3cqw] [&_p]:mt-[0.7cqw] [&_p]:mx-0 [&_p]:mb-[1.1cqw] [&>span]:flex [&>span]:items-center [&>span]:gap-[0.8cqw] [&>span]:text-[2.4cqw] [&>span]:font-semibold"
                    data-visible={finding}
                >
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
