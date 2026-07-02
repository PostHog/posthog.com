import React, { useEffect, useState } from 'react'
import { IconArrowRight, IconAtSign, IconCheck, IconCoffee, IconSparkles } from '@posthog/icons'
import { IconSlack } from 'components/OSIcons'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import useProduct from 'hooks/useProduct'
import { useApp } from '../../../context/App'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import TypecaastPlayer, { type TypecaastPlayerProps } from 'components/TypecaastPlayer'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { usePauseAutoAdvance, useSlideActive } from './autoAdvanceGate'
import slackBrokenLink from '../../../data/typecaast/slack-broken-link.json'
import cursorBrokenLink from '../../../data/typecaast/cursor-broken-link.json'
import slackSignalsLoading from '../../../data/typecaast/slack-signals-loading.json'
import slackAskPostHog from '../../../data/typecaast/slack-ask-posthog.json'

// A Typecaast embed for use inside the hero carousel. While its animation plays it holds
// the carousel's auto-advance (the animations run longer than the ~5s dwell), then releases
// on `onEnded` so a slide isn't cut off mid-animation. Bypassed under reduced motion
// (Typecaast renders the final state immediately), with a safety timeout so a missed
// `onEnded` can never leave the carousel frozen.
const MAX_CAROUSEL_HOLD_MS = 30000

// Shared height for every Typecaast embed in the hero carousel — one value so all slides
// match and the carousel doesn't jump in height between tabs.
const CAROUSEL_EMBED_HEIGHT = 'h-[400px]'

const CarouselTypecaast = ({ onEnded, ...props }: TypecaastPlayerProps): JSX.Element => {
    const [ended, setEnded] = useState(false)
    const reducedMotion = usePrefersReducedMotion()
    // Slides stay mounted across tab switches (the carousel force-mounts every tab), so pause
    // while this isn't the visible tab: Typecaast's controlled pause resumes in place instead
    // of restarting, and only the active slide holds auto-advance / runs the safety timeout.
    const isActive = useSlideActive()

    usePauseAutoAdvance(isActive && !ended && !reducedMotion)

    useEffect(() => {
        if (ended || reducedMotion || !isActive) return
        const timer = setTimeout(() => setEnded(true), MAX_CAROUSEL_HOLD_MS)
        return () => clearTimeout(timer)
    }, [ended, reducedMotion, isActive])

    return (
        <TypecaastPlayer
            {...props}
            paused={!isActive}
            onEnded={() => {
                setEnded(true)
                onEnded?.()
            }}
        />
    )
}

export const PullRequestSlide = () => {
    // Slack | Web toggle removed for now — multi-player is only supported in Slack.
    // Re-add this `view` state (plus the toggle and Web branch in the JSX below) when web lands.
    // const [view, setView] = useState<'slack' | 'web'>('slack')
    const allProducts = useProduct() as any[]
    const product = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === 'posthog_slack') : undefined
    const screenshot = product?.screenshots?.home

    return (
        <div className="@container rounded p-4 @md:p-6 h-full bg-accent/20">
            {/* Slack | Web view toggle — hidden for now (multi-player is Slack-only). Re-add when web lands.
            <div className="flex justify-center -mt-4 mb-4">
                <ToggleGroup
                    title="View"
                    hideTitle
                    options={[
                        { label: <span className="whitespace-nowrap">Slack</span>, value: 'slack' },
                        { label: <span className="whitespace-nowrap">Web</span>, value: 'web' },
                    ]}
                    value={view}
                    onValueChange={(v) => v && setView(v as 'slack' | 'web')}
                />
            </div>
            */}
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center">
                <CarouselTypecaast
                    config={slackBrokenLink}
                    height={CAROUSEL_EMBED_HEIGHT}
                    className="border border-primary"
                />
                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                            PostHog in <IconSlack className="size-4" /> Slack
                        </p>
                        <h2 className="text-2xl font-bold m-0">Work on pull requests together</h2>
                    </div>
                    <p className="text-secondary m-0">
                        Tag <code>@PostHog</code> in a thread to analyze customer behavior or create a PR – all without
                        ever leaving Slack. Triage and build with your team in the tools you already use.
                    </p>
                    <OSButton to="/slack" state={{ newWindow: true }} variant="secondary" size="md" asLink>
                        Learn more
                    </OSButton>
                </div>
                {/* Web view — re-add alongside the toggle when multi-player supports web:
                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                            <IconAtSign className="size-4" /> PostHog Slackbot
                        </p>
                        <h2 className="text-2xl font-bold m-0">Create pull requests in Slack</h2>
                    </div>
                    <p className="text-secondary m-0">
                        Tag <code>@PostHog</code> in a thread to analyze customer behavior or create a PR – all without
                        ever leaving Slack. Triage and build with your team in your existing tools.
                    </p>
                    <OSButton to="/slack" state={{ newWindow: true }} variant="secondary" asLink>
                        Explore PostHog Slackbot
                    </OSButton>
                </div>
                */}
            </div>
        </div>
    )
}

export const FixBugsSlide = () => {
    const [view, setView] = useState<'slack' | 'code'>('slack')
    const allProducts = useProduct() as any[]
    const codeProduct = Array.isArray(allProducts)
        ? allProducts.find((p: any) => p.handle === 'posthog_code')
        : undefined
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const codeScreenshot = codeProduct?.screenshots?.home

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="flex justify-center -mt-4 mb-4">
                <ToggleGroup
                    title="View"
                    hideTitle
                    options={[
                        { label: <span className="whitespace-nowrap">Slack</span>, value: 'slack' },
                        { label: <span className="whitespace-nowrap">PostHog Code</span>, value: 'code' },
                    ]}
                    value={view}
                    onValueChange={(v) => v && setView(v as 'slack' | 'code')}
                />
            </div>
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center">
                {view === 'slack' ? (
                    <CarouselTypecaast
                        config={slackSignalsLoading}
                        height={CAROUSEL_EMBED_HEIGHT}
                        className="border border-primary"
                    />
                ) : codeScreenshot ? (
                    <div className={`flex ${codeScreenshot.classes || ''}`}>
                        <CloudinaryImage
                            src={
                                (isDark && codeScreenshot.srcDark ? codeScreenshot.srcDark : codeScreenshot.src) as any
                            }
                            alt={codeScreenshot.alt}
                            imgClassName={codeScreenshot.imgClasses}
                        />
                    </div>
                ) : (
                    <div />
                )}
                {view === 'slack' ? (
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                                PostHog in <IconSlack className="size-4" /> Slack
                            </p>
                            <h2 className="text-2xl font-bold m-0">Automatic bug fixes &amp; optimizations</h2>
                        </div>
                        <p className="text-secondary m-0">
                            PostHog Signals runs analysis on errors, logs, and summarized session recordings to detect
                            and fix bugs without any human prompting.
                        </p>
                        <OSButton to="/self-driving" state={{ newWindow: true }} variant="secondary" size="md" asLink>
                            Learn more
                        </OSButton>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                                <IconCoffee className="size-4" /> PostHog Code (beta)
                            </p>
                            <h2 className="text-2xl font-bold m-0">Fix bugs automatically</h2>
                        </div>
                        <p className="text-secondary m-0">
                            <strong>PostHog Code</strong>, our AI code editor:
                        </p>
                        <ul className="list-none p-0 m-0 space-y-1.5">
                            <li className="flex items-center gap-2 text-secondary">
                                <IconCheck className="size-5 text-green shrink-0" /> Identifies product usage patterns
                            </li>
                            <li className="flex items-center gap-2 text-secondary">
                                <IconCheck className="size-5 text-green shrink-0" /> Triages bugs and errors
                            </li>
                            <li className="flex items-center gap-2 text-secondary">
                                <IconCheck className="size-5 text-green shrink-0" /> Creates pull requests automatically
                            </li>
                        </ul>
                        <OSButton to="/code" state={{ newWindow: true }} size="md" variant="secondary" asLink>
                            Explore PostHog Code
                        </OSButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export const AskAnythingSlide = () => {
    const [view, setView] = useState<'slack' | 'web'>('slack')
    const allProducts = useProduct() as any[]
    const aiProduct = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === 'posthog_ai') : undefined
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const webScreenshot = aiProduct?.screenshots?.home

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="flex justify-center -mt-4 mb-4">
                <ToggleGroup
                    title="View"
                    hideTitle
                    options={[
                        { label: <span className="whitespace-nowrap">Slack</span>, value: 'slack' },
                        { label: <span className="whitespace-nowrap">Web</span>, value: 'web' },
                    ]}
                    value={view}
                    onValueChange={(v) => v && setView(v as 'slack' | 'web')}
                />
            </div>
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center">
                {view === 'slack' ? (
                    <CarouselTypecaast
                        config={slackAskPostHog}
                        height={CAROUSEL_EMBED_HEIGHT}
                        className="border border-primary"
                    />
                ) : webScreenshot ? (
                    <div className={`flex ${webScreenshot.classes || ''}`}>
                        <CloudinaryImage
                            src={(isDark && webScreenshot.srcDark ? webScreenshot.srcDark : webScreenshot.src) as any}
                            alt={webScreenshot.alt}
                            imgClassName={webScreenshot.imgClasses}
                        />
                    </div>
                ) : (
                    <div />
                )}
                {view === 'slack' ? (
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                                PostHog in <IconSlack className="size-4" /> Slack
                            </p>
                            <h2 className="text-2xl font-bold m-0">Ask PostHog anything</h2>
                        </div>
                        <p className="text-secondary m-0">
                            PostHog has 250+ data and analysis tools that are stitched together on-the-fly to answer any
                            customer usage or data question you have.
                        </p>
                        <p className="text-secondary m-0">
                            Pipe in third party data to analyze alongside customer usage data for a more complete
                            picture of product usage.
                        </p>
                        <OSButton to="/ai" state={{ newWindow: true }} size="md" variant="secondary" asLink>
                            Explore PostHog AI
                        </OSButton>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                                <IconSparkles className="size-4" /> PostHog AI
                            </p>
                            <h2 className="text-2xl font-bold m-0">Ask PostHog anything</h2>
                        </div>
                        <p className="text-secondary m-0">
                            PostHog has 250+ data and analysis tools that are stitched together on-the-fly to answer any
                            customer usage or data question you have.
                        </p>
                        <p className="text-secondary m-0">
                            Pipe in third party data to analyze alongside customer usage data for a more complete
                            picture of product usage.
                        </p>
                        <OSButton to="/ai" state={{ newWindow: true }} size="md" variant="secondary" asLink>
                            Explore PostHog AI
                        </OSButton>
                    </div>
                )}
            </div>
        </div>
    )
}
