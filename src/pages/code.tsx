import React, { useRef, useState } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import { IconApple, IconArrowRight } from '@posthog/icons'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { IconPop } from 'components/Code/IconPop'
import { SignalsCallout } from 'components/Code/SignalsCallout'
import { FlowDiagram } from 'components/Code/FlowDiagram'
import { DottedConnection } from 'components/Code/DottedConnection'
import {
    StickerAi,
    StickerBulb,
    StickerCloud,
    StickerCoffee,
    StickerELearning,
    StickerMicroscope,
    StickerPause,
    StickerPullRequest,
    StickerTerminal,
    StickerUsers,
    StickerWebsite,
} from 'components/Stickers/Stickers'

// ─────────────────────────────────────────────
// Download CTA Button
// ─────────────────────────────────────────────

function DownloadButton() {
    return (
        <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#1d1f27] dark:bg-white text-white dark:text-[#1d1f27] rounded-full px-5 py-2.5 text-sm font-semibold no-underline hover:opacity-90 transition-opacity"
        >
            <IconApple className="size-4" />
            <span>Download for Mac</span>
            <IconArrowRight className="size-4" />
        </a>
    )
}

// ─────────────────────────────────────────────
// Section label ("The old way", "The PostHog way")
// ─────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-squeak text-secondary text-sm mb-3 @4xl/editor:mb-0 @4xl/editor:absolute @4xl/editor:-left-4 @4xl/editor:-translate-x-full @4xl/editor:top-0 @4xl/editor:whitespace-nowrap @4xl/editor:-rotate-3">
            {children}
        </div>
    )
}

// ─────────────────────────────────────────────
// Inline icon helper (sits in text flow)
// ─────────────────────────────────────────────

function InlineIcon({
    icon: Icon,
    children,
    className = '',
}: {
    icon: React.ComponentType<{ className?: string }>
    children?: React.ReactNode
    className?: string
}) {
    return (
        <span className="inline-flex items-baseline gap-0.5 whitespace-nowrap">
            <IconPop>
                <Icon className={`size-7 inline-block align-middle relative top-1.5 ${className}`} />
            </IconPop>
            {children}
        </span>
    )
}

// ─────────────────────────────────────────────
// Keyboard shortcut / badge style
// ─────────────────────────────────────────────

function KeyBadge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-sans align-middle mx-0.5 bg-[#1d1f27] text-white dark:bg-white dark:text-[#1d1f27]">
            {children}
        </span>
    )
}

// ─────────────────────────────────────────────
// AI Model badge with connection point
// ─────────────────────────────────────────────

function AIModelBadge({ innerRef }: { innerRef: React.RefObject<HTMLSpanElement> }) {
    return (
        <span
            ref={innerRef}
            className="inline-flex items-center gap-1.5 border border-primary rounded px-2 py-1 text-xs bg-accent align-middle mx-0.5"
        >
            <span className="font-semibold">Supports</span>
            <span className="text-secondary">Opus, Sonnet, Codex</span>
        </span>
    )
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────

function HeroSection() {
    return (
        <section className="mb-8 @2xl:mb-12 grid grid-cols-1 @2xl:grid-cols-[2fr_3fr] gap-6 @2xl:gap-8 items-center">
            <div>
                <h1 className="text-xl @xl:text-2xl @2xl:text-3xl font-bold leading-tight mb-5 !mt-0">
                    {'The AI code editor that knows your '}
                    <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2} delay={300}>
                        <em className="font-bold">product</em>
                    </RoughAnnotation>
                    {', not just your '}
                    <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2} delay={600}>
                        <em className="font-bold">codebase</em>
                    </RoughAnnotation>
                </h1>
                <DownloadButton />
            </div>
            <div>
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/code_screenshot_light_d0c42a8067.png"
                    alt="PostHog Code screenshot"
                    className="w-full rounded shadow-lg dark:hidden"
                />
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/code_screenshot_dark_b2a90f3c71.png"
                    alt="PostHog Code screenshot"
                    className="w-full rounded shadow-lg hidden dark:block"
                />
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The old way" Section
// ─────────────────────────────────────────────

function OldWaySection() {
    return (
        <section className="relative mb-8 @2xl:mb-12">
            <SectionLabel>The old way</SectionLabel>

            <p className="text-base leading-relaxed mb-5">
                <ChoppyReveal wordDelay={40}>
                    {'Most AI code editors '}
                    <InlineIcon icon={StickerBulb}>
                        <em>lack context</em>
                    </InlineIcon>
                    {' and '}
                    <InlineIcon icon={StickerPause}>{' wait for '}</InlineIcon>
                    <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5}>
                        <em>you</em>
                    </RoughAnnotation>
                    {' to tell them what to '}
                    <KeyBadge>Build ↵</KeyBadge>
                    {'.'}
                </ChoppyReveal>
            </p>

            <FlowDiagram className="mb-5" />

            <p className="text-base leading-relaxed">
                <ChoppyReveal wordDelay={40}>
                    {'They use your '}
                    <InlineIcon icon={StickerTerminal}>
                        {' '}
                        <RoughAnnotation type="box" color="#1D4AFF" strokeWidth={1.5} padding={2}>
                            <strong>codebase</strong>
                        </RoughAnnotation>
                    </InlineIcon>
                    {' as the source of truth, not how '}
                    <InlineIcon icon={StickerUsers}>
                        <em>people</em>
                    </InlineIcon>
                    {' use your '}
                    <InlineIcon icon={StickerWebsite}>
                        {' '}
                        <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                            <em>product</em>
                        </RoughAnnotation>
                    </InlineIcon>
                    {'.'}
                </ChoppyReveal>
            </p>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The PostHog way" Section
// ─────────────────────────────────────────────

function PostHogWaySection() {
    const signalsWordRef = useRef<HTMLSpanElement>(null)
    const signalsBoxRef = useRef<HTMLDivElement>(null)
    const aiModelRef = useRef<HTMLSpanElement>(null)
    const aiModelBadgeRef = useRef<HTMLSpanElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <section ref={sectionRef} className="relative mb-8 @2xl:mb-12">
            <SectionLabel>The PostHog way</SectionLabel>

            <div className="relative">
                {/* Signals callout — in DOM before paragraph so float-right works on desktop.
                    On mobile (no float), it falls in normal flow above the paragraph,
                    but we use flex + order to push it below the first paragraph. */}
                <div className="flex flex-col @2xl:block">
                    <div
                        ref={signalsBoxRef}
                        className="order-2 mb-5 @2xl:order-none @2xl:float-right @2xl:ml-6 @2xl:mb-4 @2xl:w-[280px]"
                    >
                        <SignalsCallout />
                    </div>

                    <p className="text-base leading-relaxed mb-5 order-1">
                        <ChoppyReveal wordDelay={40}>
                            <InlineIcon icon={StickerCoffee}>{' PostHog Code'}</InlineIcon>
                            {' uses '}
                            <span ref={signalsWordRef}>
                                <RoughAnnotation
                                    type="highlight"
                                    color="rgba(48, 164, 108, 0.2)"
                                    strokeWidth={1}
                                    padding={2}
                                    multiline
                                >
                                    <strong>signals</strong>
                                </RoughAnnotation>
                            </span>
                            {' from '}
                            <span className="text-green">&#9679;</span> <strong>production data</strong>
                            {' to '}
                            <InlineIcon icon={StickerMicroscope}>{' diagnose issues'}</InlineIcon>
                            {' and '}
                            <InlineIcon icon={StickerPullRequest}>{' generate pull requests'}</InlineIcon>
                            {' to fix them — '}
                            <em>before you even know there&apos;s a problem.</em>{' '}
                            <span className="text-secondary text-sm">z</span>
                            <span className="text-secondary text-xs">z</span>
                        </ChoppyReveal>
                    </p>
                </div>

                <p className="text-base leading-relaxed mb-2">
                    <ChoppyReveal wordDelay={40}>
                        {'Run it '}
                        <InlineIcon icon={StickerELearning}>{' locally'}</InlineIcon>
                        {' or in the '}
                        <InlineIcon icon={StickerCloud}>{' cloud'}</InlineIcon>
                        {' — either way, it automatically uses the right '}
                        <span ref={aiModelRef}>
                            <RoughAnnotation type="box" color="currentColor" strokeWidth={1} padding={2}>
                                <strong>AI model</strong>
                            </RoughAnnotation>
                        </span>
                        {' for the job.'}
                    </ChoppyReveal>
                </p>

                <AIModelBadge innerRef={aiModelBadgeRef} />

                {/* Clear float */}
                <div className="clear-both" />

                {/* Dotted connection lines */}
                <DottedConnection sourceRef={signalsWordRef} targetRef={signalsBoxRef} containerRef={sectionRef} />
                <DottedConnection sourceRef={aiModelRef} targetRef={aiModelBadgeRef} containerRef={sectionRef} />
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Bottom CTA
// ─────────────────────────────────────────────

function BottomCTASection() {
    return (
        <section className="mb-8">
            <p className="text-base leading-relaxed mb-5">
                <ChoppyReveal wordDelay={40}>
                    {'There are plenty of '}
                    <InlineIcon icon={StickerAi}>{' AI coding tools.'}</InlineIcon>
                    {" But there's only "}
                    <RoughAnnotation type="circle" color="#F54E00" strokeWidth={2} padding={4}>
                        <span>one</span>
                    </RoughAnnotation>
                    {' that knows your product like '}
                    <InlineIcon icon={StickerCoffee}>
                        {' '}
                        <strong>PostHog Code.</strong>
                    </InlineIcon>
                </ChoppyReveal>
            </p>
            <DownloadButton />
        </section>
    )
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function CodePage() {
    return (
        <>
            <SEO
                title="PostHog Code – The AI code editor that knows your product"
                description="PostHog Code uses signals from production data to diagnose issues and generate pull requests — before you even know there's a problem."
            />
            <Editor title="PostHog Code" slug="/code">
                <div className="@container not-prose">
                    <HeroSection />
                    <OldWaySection />

                    {/* Dotted divider */}
                    <hr className="border-t border-dashed border-primary my-8 @2xl:my-12" />

                    <PostHogWaySection />

                    {/* Dotted divider */}
                    <hr className="border-t border-dashed border-primary my-8 @2xl:my-12" />

                    <BottomCTASection />
                </div>
            </Editor>
        </>
    )
}
