import React, { useEffect, useState } from 'react'
import { IconCheckCircle, IconCompass, IconArchive, IconPullRequest, IconRewindPlay, IconWarning } from '@posthog/icons'
import { IconGithub } from 'components/OSIcons'
import { useInView } from 'react-intersection-observer'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { usePauseAutoAdvance, useSlideActive, useSlidePaused } from '../autoAdvanceGate'
import './animations.css'

// Illustrative reports, in arrival order. These are not live issues or pull requests.
const ITEMS = [
    {
        priority: 'P2',
        scope: 'feat(billing)',
        title: 'Make invoices easier to find',
        summary: 'Customers keep asking where to download invoices. Add a direct link from their account page.',
        source: 'GitHub',
        Icon: IconGithub,
        color: 'text-secondary',
        repo: undefined,
        pr: undefined,
    },
    {
        priority: 'P3',
        scope: 'fix(analytics)',
        title: 'Restore checkout conversion tracking',
        summary: 'The new checkout stopped sending completion events. Restore tracking so the funnel is accurate.',
        source: 'Scout · Conversion tracking',
        Icon: IconCompass,
        color: 'text-orange',
        repo: 'acme/web',
        pr: { number: 2041, ready: false },
    },
    {
        priority: 'P2',
        scope: 'fix(checkout)',
        title: 'Explain why a payment was declined',
        summary: 'Replays show customers retrying the same card. Replace the generic error with a useful message.',
        source: 'Session replay',
        Icon: IconRewindPlay,
        color: 'text-yellow',
        repo: undefined,
        pr: undefined,
    },
    {
        priority: 'P1',
        scope: 'fix(auth)',
        title: 'Fix sign-in failures on mobile',
        summary: 'An expired token leaves mobile users on a blank screen. Refresh the session before redirecting.',
        source: 'Error tracking',
        Icon: IconWarning,
        color: 'text-orange',
        repo: 'acme/web',
        pr: { number: 2043, ready: true },
    },
]

/** CSS owns every animation frame; React only controls the sequence lifecycle. */
export default function InboxDemo() {
    const active = useSlideActive()
    const paused = useSlidePaused()
    const reducedMotion = usePrefersReducedMotion()
    const { ref, inView } = useInView({ threshold: 0.25 })
    const [finished, setFinished] = useState(false)
    const [pageVisible, setPageVisible] = useState(true)

    useEffect(() => {
        if (active) setFinished(false)
    }, [active, reducedMotion])

    useEffect(() => {
        const update = () => setPageVisible(!document.hidden)
        update()
        document.addEventListener('visibilitychange', update)
        return () => document.removeEventListener('visibilitychange', update)
    }, [])

    const running = active && inView && pageVisible && !paused && !reducedMotion && !finished
    usePauseAutoAdvance(active && !finished && !reducedMotion)

    return (
        <figure
            ref={ref}
            className="inbox-demo @container aspect-[1000/774] [--row-height:22cqw] [--row-step:24cqw] [--badge-height:4.6cqw] [&_.inbox-demo-scope]:!text-[2.1cqw] not-prose relative w-full m-0 overflow-hidden rounded border border-primary bg-accent/20 text-primary"
            data-active={active}
            data-running={running}
            data-finished={finished}
        >
            <figcaption className="sr-only">
                Illustrative self-driving inbox. Four sample reports arrive one at a time, newest first: an invoice
                request from GitHub, a conversion tracking scout with a draft pull request, a checkout issue from
                session replay, and a high-priority sign-in error with a pull request ready to review.
            </figcaption>
            <div className="absolute inset-0" aria-hidden="true">
                <div className="inbox-demo-list absolute inset-x-[3cqw] inset-y-[2.5cqw]">
                    <div className="inbox-demo-empty absolute inset-0 flex flex-col items-center justify-center gap-[1.5cqw] text-center text-[2.6cqw] opacity-0 text-secondary">
                        <IconArchive className="size-[7cqw] mb-[1cqw]" />
                        <strong>Your inbox is clear</strong>
                        <span>New findings will appear here.</span>
                    </div>
                    {ITEMS.map(({ priority, scope, title, summary, source, Icon, color, repo, pr }, index) => (
                        <article
                            key={scope}
                            className="inbox-demo-item absolute inset-x-0 top-0 flex h-[var(--row-height)] p-[2.5cqw] data-[has-pr=false]:border-dashed bg-primary dark:bg-accent/30 border border-primary rounded"
                            data-has-pr={Boolean(pr)}
                            style={
                                {
                                    '--slot': ITEMS.length - index - 1,
                                    animationDelay: `${0.8 + index * 1.6}s`,
                                } as React.CSSProperties
                            }
                            onAnimationEnd={(event) => {
                                // The first timeline ends at 7.2 seconds, after a hold on the populated inbox.
                                if (index === 0 && event.animationName === 'inbox-arrival') setFinished(true)
                            }}
                        >
                            <div className="inbox-demo-content flex flex-col flex-1 min-w-0">
                                <div className="inbox-demo-title-row flex items-center gap-[1cqw]">
                                    <span
                                        className={`inbox-demo-priority flex items-center justify-center shrink-0 size-[var(--badge-height)] text-[2.2cqw] font-semibold border rounded ${
                                            priority === 'P2'
                                                ? 'text-salmon border-salmon/40 bg-salmon/10'
                                                : 'text-red dark:text-yellow border-orange/40 bg-orange/10'
                                        }`}
                                    >
                                        {priority}
                                    </span>
                                    <h4 className="flex items-center gap-[1cqw] flex-1 m-0 min-w-0 !text-[2.7cqw] font-bold !leading-[1.3]">
                                        <code className="inbox-demo-scope inline-flex items-center shrink-0 h-[var(--badge-height)] px-[0.6cqw] py-0 font-medium whitespace-nowrap bg-transparent border border-primary rounded">
                                            {scope}
                                        </code>
                                        <span>{title}</span>
                                    </h4>
                                    {pr && (
                                        <span
                                            className={`inbox-demo-pr inline-flex items-center gap-[0.5cqw] shrink-0 h-[var(--badge-height)] px-[0.8cqw] py-0 text-[2.1cqw] whitespace-nowrap [&_svg]:size-[2.2cqw] border rounded-full ${
                                                pr.ready
                                                    ? 'text-green-dark dark:text-green-2 border-green/40 bg-green/10'
                                                    : 'text-secondary border-primary bg-accent/30'
                                            }`}
                                        >
                                            <IconPullRequest /> #{pr.number}
                                            <IconCheckCircle className="text-green dark:text-green-2" />
                                        </span>
                                    )}
                                </div>
                                <p className="inbox-demo-summary line-clamp-2 my-[1cqw] mr-0 ml-[calc(var(--badge-height)+1cqw)] text-[2.35cqw] leading-[1.35] text-secondary">
                                    {summary}
                                </p>
                                <footer className="inbox-demo-meta flex items-center gap-[1.5cqw] mt-auto ml-[calc(var(--badge-height)+1cqw)] text-[2.1cqw] leading-[1.3] whitespace-nowrap text-secondary">
                                    {repo && <span className="inbox-demo-repo font-mono">{repo}</span>}
                                    <span className="inbox-demo-source inline-flex items-center gap-[0.8cqw] min-w-0 overflow-hidden text-ellipsis [&_svg]:size-[2.4cqw] [&_svg]:shrink-0 [&_g]:[clip-path:none]">
                                        <Icon className={`${color} fill-current`} /> {source}
                                    </span>
                                    <span className="inbox-demo-time ml-auto">Just now</span>
                                </footer>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </figure>
    )
}
