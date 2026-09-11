import React, { useEffect, useState } from 'react'
import { IconCheckCircle, IconCompass, IconArchive, IconPullRequest, IconRewindPlay, IconWarning } from '@posthog/icons'
import { IconGithub } from 'components/OSIcons'
import { useInView } from 'react-intersection-observer'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { usePauseAutoAdvance, useSlideActive, useSlidePaused } from '../autoAdvanceGate'
import './styles.css'

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
            className="inbox-demo not-prose relative w-full m-0 overflow-hidden rounded border border-primary bg-accent/20 text-primary"
            data-active={active}
            data-running={running}
            data-finished={finished}
        >
            <figcaption className="sr-only">
                Illustrative self-driving inbox. Four sample reports arrive one at a time, newest first: an invoice
                request from GitHub, a conversion tracking scout with a draft pull request, a checkout issue from
                session replay, and a high-priority sign-in error with a pull request ready to review.
            </figcaption>
            <div aria-hidden="true">
                <header className="inbox-demo-header border-b border-primary">
                    <h3>Self-driving inbox</h3>
                    <p>Issues and opportunities found in your product, ready to review.</p>
                </header>
                <div className="inbox-demo-list">
                    <div className="inbox-demo-empty text-secondary">
                        <IconArchive />
                        <strong>Your inbox is clear</strong>
                        <span>New findings will appear here.</span>
                    </div>
                    {ITEMS.map(({ priority, scope, title, summary, source, Icon, color, repo, pr }, index) => (
                        <article
                            key={scope}
                            className="inbox-demo-item bg-primary dark:bg-accent/30 border border-primary rounded"
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
                            <div className="inbox-demo-content">
                                <div className="inbox-demo-title-row">
                                    <span
                                        className={`inbox-demo-priority border rounded ${
                                            priority === 'P2'
                                                ? 'text-salmon border-salmon/40 bg-salmon/10'
                                                : 'text-red dark:text-yellow border-orange/40 bg-orange/10'
                                        }`}
                                    >
                                        {priority}
                                    </span>
                                    <h4>
                                        <code className="border border-primary rounded">{scope}</code>
                                        <span>{title}</span>
                                    </h4>
                                    {pr && (
                                        <span
                                            className={`inbox-demo-pr border rounded-full ${
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
                                <p className="inbox-demo-summary text-secondary">{summary}</p>
                                <footer className="inbox-demo-meta text-secondary">
                                    {repo && <span className="inbox-demo-repo font-mono">{repo}</span>}
                                    <span className="inbox-demo-source">
                                        <Icon className={color} /> {source}
                                    </span>
                                    <span className="inbox-demo-time">Just now</span>
                                </footer>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </figure>
    )
}
