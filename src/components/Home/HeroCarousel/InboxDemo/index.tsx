import React, { useEffect, useState } from 'react'
import { IconCheckCircle, IconCompass, IconArchive, IconPullRequest, IconRewindPlay, IconWarning } from '@posthog/icons'
import { IconGithub } from 'components/OSIcons'
import { useInView } from 'react-intersection-observer'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { usePauseAutoAdvance, useSlideActive, useSlidePaused } from '../autoAdvanceGate'
import { useTranslation } from 'i18n'
import './animations.css'

// Illustrative reports, in arrival order. These are not live issues or pull requests.
// The title, summary, and source text come from section.2c.demo.card.<n> in src/i18n/locales. Sources that
// are product or brand names (GitHub, Session replay, Error tracking) have no key and stay in English.
const ITEMS = [
    {
        priority: 'P2',
        scope: 'feat(billing)',
        source: 'GitHub',
        sourcePrefix: undefined,
        sourceKey: undefined,
        Icon: IconGithub,
        color: 'text-secondary',
        repo: undefined,
        pr: undefined,
    },
    {
        priority: 'P3',
        scope: 'fix(analytics)',
        source: 'Scout · Conversion tracking',
        sourcePrefix: 'Scout · ',
        sourceKey: 'section.2c.demo.card.2.source',
        Icon: IconCompass,
        color: 'text-orange',
        repo: 'acme/web',
        pr: { number: 2041, ready: false },
    },
    {
        priority: 'P2',
        scope: 'fix(checkout)',
        source: 'Session replay',
        sourcePrefix: undefined,
        sourceKey: undefined,
        Icon: IconRewindPlay,
        color: 'text-yellow',
        repo: undefined,
        pr: undefined,
    },
    {
        priority: 'P1',
        scope: 'fix(auth)',
        source: 'Error tracking',
        sourcePrefix: undefined,
        sourceKey: undefined,
        Icon: IconWarning,
        color: 'text-orange',
        repo: 'acme/web',
        pr: { number: 2043, ready: true },
    },
]

/** CSS owns every animation frame; React only controls the sequence lifecycle. */
export default function InboxDemo() {
    const { t } = useTranslation()
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
            <figcaption className="sr-only">{t('section.2c.demo.description')}</figcaption>
            <div className="absolute inset-0" aria-hidden="true">
                <div className="inbox-demo-list absolute inset-x-[3cqw] inset-y-[2.5cqw]">
                    <div className="inbox-demo-empty absolute inset-0 flex flex-col items-center justify-center gap-[1.5cqw] text-center text-[2.6cqw] opacity-0 text-secondary">
                        <IconArchive className="size-[7cqw] mb-[1cqw]" />
                        <strong>{t('section.2c.demo.empty.heading')}</strong>
                        <span>{t('section.2c.demo.empty.body')}</span>
                    </div>
                    {ITEMS.map(({ priority, scope, source, sourcePrefix, sourceKey, Icon, color, repo, pr }, index) => (
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
                                        <span>{t(`section.2c.demo.card.${index + 1}.title`)}</span>
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
                                    {t(`section.2c.demo.card.${index + 1}.body`)}
                                </p>
                                <footer className="inbox-demo-meta flex items-center gap-[1.5cqw] mt-auto ml-[calc(var(--badge-height)+1cqw)] text-[2.1cqw] leading-[1.3] whitespace-nowrap text-secondary">
                                    {repo && <span className="inbox-demo-repo font-mono">{repo}</span>}
                                    <span className="inbox-demo-source inline-flex items-center gap-[0.8cqw] min-w-0 overflow-hidden text-ellipsis [&_svg]:size-[2.4cqw] [&_svg]:shrink-0 [&_g]:[clip-path:none]">
                                        <Icon className={`${color} fill-current`} />{' '}
                                        {sourceKey ? `${sourcePrefix}${t(sourceKey)}` : source}
                                    </span>
                                    <span className="inbox-demo-time ml-auto">{t('section.2c.demo.timestamp')}</span>
                                </footer>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </figure>
    )
}
