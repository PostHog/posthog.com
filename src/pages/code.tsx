import React, { useRef, useState } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import {
    IconApple,
    IconArrowRight,
    IconThoughtBubble,
    IconPause,
    IconCode,
    IconPeople,
    IconGlobe,
    IconLogomark,
    IconBug,
    IconBolt,
    IconLaptop,
    IconCloud,
    IconSparkles,
} from '@posthog/icons'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { IconPop } from 'components/Code/IconPop'
import { SignalsCallout } from 'components/Code/SignalsCallout'
import { FlowDiagram } from 'components/Code/FlowDiagram'
import { DottedConnection } from 'components/Code/DottedConnection'

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
        <div className="font-serif italic text-secondary text-sm @2xl:text-base @2xl:absolute @2xl:-left-2 @2xl:-translate-x-full @2xl:top-0 mb-3 @2xl:mb-0 @2xl:whitespace-nowrap">
            {children}
        </div>
    )
}

// ─────────────────────────────────────────────
// Inline icon helper (sits in text flow)
// ─────────────────────────────────────────────

function InlineIcon({
    icon: Icon,
    className = '',
}: {
    icon: React.ComponentType<{ className?: string }>
    className?: string
}) {
    return (
        <IconPop>
            <Icon className={`size-5 inline-block align-middle mx-0.5 ${className}`} />
        </IconPop>
    )
}

// ─────────────────────────────────────────────
// Keyboard shortcut / badge style
// ─────────────────────────────────────────────

function KeyBadge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1 border border-primary rounded px-1.5 py-0.5 text-xs font-mono bg-accent align-middle mx-0.5">
            {children}
        </span>
    )
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────

function HeroSection() {
    const [revealDone, setRevealDone] = useState(false)

    return (
        <section className="mb-8 @2xl:mb-12">
            <h1 className="text-2xl @xl:text-3xl @2xl:text-4xl font-bold leading-tight mb-5 !mt-0">
                <ChoppyReveal wordDelay={40} onComplete={() => setRevealDone(true)}>
                    {'The AI code editor that knows your '}
                    <RoughAnnotation
                        type="underline"
                        color="#F54E00"
                        strokeWidth={2}
                        show={revealDone}
                        animateOnScroll={false}
                        delay={100}
                    >
                        <em className="font-bold">product</em>
                    </RoughAnnotation>
                    {', not just your '}
                    <RoughAnnotation
                        type="underline"
                        color="#F54E00"
                        strokeWidth={2}
                        show={revealDone}
                        animateOnScroll={false}
                        delay={400}
                    >
                        <em className="font-bold">codebase</em>
                    </RoughAnnotation>
                </ChoppyReveal>
            </h1>
            <DownloadButton />
        </section>
    )
}

// ─────────────────────────────────────────────
// "The old way" Section
// ─────────────────────────────────────────────

function OldWaySection() {
    return (
        <section className="relative mb-8 @2xl:mb-12 @2xl:ml-32">
            <SectionLabel>The old way</SectionLabel>

            <p className="text-base @xl:text-lg leading-relaxed mb-5">
                <ChoppyReveal wordDelay={40}>
                    {'Most AI code editors '}
                    <InlineIcon icon={IconThoughtBubble} /> <em>lack context</em>
                    {' and '}
                    <InlineIcon icon={IconPause} />
                    {' wait for '}
                    <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5}>
                        <em>you</em>
                    </RoughAnnotation>
                    {' to tell them what to '}
                    <KeyBadge>Build ↵</KeyBadge>
                    {'.'}
                </ChoppyReveal>
            </p>

            <FlowDiagram className="mb-5" />

            <p className="text-base @xl:text-lg leading-relaxed">
                <ChoppyReveal wordDelay={40}>
                    {'They use your '}
                    <InlineIcon icon={IconCode} />{' '}
                    <RoughAnnotation type="box" color="#1D4AFF" strokeWidth={1.5} padding={2}>
                        <strong>codebase</strong>
                    </RoughAnnotation>
                    {' as the source of truth, not how '}
                    <InlineIcon icon={IconPeople} /> <em>people</em>
                    {' use your '}
                    <InlineIcon icon={IconGlobe} />{' '}
                    <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                        <em>product</em>
                    </RoughAnnotation>
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
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <section ref={sectionRef} className="relative mb-8 @2xl:mb-12 @2xl:ml-32">
            <SectionLabel>The PostHog way</SectionLabel>

            {/* Main text + signals callout side by side */}
            <div className="flex flex-col @2xl:flex-row @2xl:gap-8 gap-6 relative">
                <div className="flex-1">
                    <p className="text-base @xl:text-lg leading-relaxed mb-5">
                        <ChoppyReveal wordDelay={40}>
                            <InlineIcon icon={IconLogomark} />
                            {' PostHog Code uses '}
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
                            <InlineIcon icon={IconBug} />
                            {' diagnose issues and '}
                            <InlineIcon icon={IconBolt} />
                            {' generate pull requests to fix them — '}
                            <em>before you even know there&apos;s a problem.</em>{' '}
                            <span className="text-secondary text-sm">z</span>
                            <span className="text-secondary text-xs">z</span>
                        </ChoppyReveal>
                    </p>

                    <p className="text-base @xl:text-lg leading-relaxed mb-2">
                        <ChoppyReveal wordDelay={40}>
                            {'Run it '}
                            <InlineIcon icon={IconLaptop} />
                            {' locally or in the '}
                            <InlineIcon icon={IconCloud} />
                            {' cloud — either way, it automatically uses the right '}
                            <RoughAnnotation type="box" color="currentColor" strokeWidth={1} padding={2}>
                                <strong>AI model</strong>
                            </RoughAnnotation>
                            {' for the job.'}
                        </ChoppyReveal>
                    </p>

                    <p className="text-xs text-secondary border border-primary rounded px-2 py-1 inline-block">
                        Supports Opus, Sonnet, Codex
                    </p>
                </div>

                {/* Signals callout box */}
                <div ref={signalsBoxRef} className="@2xl:w-[280px] shrink-0">
                    <SignalsCallout />
                </div>

                {/* Dotted connection line (desktop only) */}
                <div className="hidden @2xl:block">
                    <DottedConnection sourceRef={signalsWordRef} targetRef={signalsBoxRef} containerRef={sectionRef} />
                </div>
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
            <p className="text-xl @xl:text-2xl @2xl:text-3xl font-bold leading-tight mb-5">
                <ChoppyReveal wordDelay={40}>
                    {'There are plenty of '}
                    <InlineIcon icon={IconSparkles} />
                    {" AI coding tools. But there's only "}
                    <RoughAnnotation type="circle" color="#F54E00" strokeWidth={2} padding={4}>
                        <span>one</span>
                    </RoughAnnotation>
                    {' that knows your product like '}
                    <InlineIcon icon={IconLogomark} /> <strong>PostHog Code.</strong>
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
            <Editor title="PostHog Code" slug="/code" hideToolbar>
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
