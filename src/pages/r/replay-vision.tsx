import React, { useCallback, useEffect, useRef, useState } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import type { CarouselSlide as CarouselSlideType } from 'components/Products/ReaderViewProduct/types'
import CarouselSlide from 'components/Products/ReaderViewProduct/CarouselSlide'
import TabbedCarousel from 'components/TabbedCarousel'
import { Plans, PricingCalculator } from 'components/Products/ReaderViewProduct/templates'
import { PricingTLDR, PricingPlans, PricingCredits } from 'components/ReplayVision/PricingSections'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import CloudinaryImage from 'components/CloudinaryImage'
import CustomerLogo from 'components/CustomerLogo'
import SlotMachineText from 'components/SlotMachineText'
import { Accordion } from 'components/RadixUI/Accordion'
import { IconPop } from 'components/Code/IconPop'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import { sessionReplay } from 'hooks/productData/session_replay'
import { replayVision } from 'hooks/productData/replay_vision'
import {
    IconBell,
    IconCheckCircle,
    IconCode,
    IconCursorClick,
    IconDocument,
    IconFlask,
    IconGraph,
    IconMagic,
    IconPlusSquare,
    IconTrending,
    IconVideoCamera,
    IconWarning,
} from '@posthog/icons'

// Paid-search landing page for "session replay" ads that point at Replay Vision.
// Built on the /slack page template (centered ReaderView column, highlighted
// headings) with the /desktop opening narrative ("The old way" → "The PostHog way")
// and a small version of the /mcp terminal. Not in the nav, so it's noindex.

const TITLE = 'The AI that watches your product for you'
const FREE_TIER = '5,000 recordings and 2,500 Replay Vision credits free every month.'
const SIGNUP_URL = 'https://app.posthog.com/signup'

// Same customers as the /r/session-replay ad page.
const CUSTOMER_SLUGS = ['elevenlabs', 'kilocode', 'juicebox', 'exa']

const IMAGES = {
    projectorHog: 'https://res.cloudinary.com/dmukukwp6/image/upload/projector_movie_noir_b2dd613e79.png',
    monitorsHog:
        'https://res.cloudinary.com/dmukukwp6/image/upload/noir_desk_relax_surveillance_computer_63a434c398.png',
} as const

// ─────────────────────────────────────────────
// Small helpers, same styles as /slack and /desktop
// ─────────────────────────────────────────────

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

// Yellow callout inside a carousel slide (the "dopamine mode" box on /desktop).
const SlideCallout = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-5 rounded border border-yellow bg-yellow/10 px-3 py-2.5 text-sm text-secondary">{children}</div>
)

const CARD = 'border border-primary rounded-md p-4 bg-primary'

const scrollToInstall = () => {
    const el = document.getElementById('install')
    if (el) {
        window.history.pushState(null, '', '#install')
        // Scroll only the reader's viewport. `scrollIntoView` also scrolls the
        // outer app containers and overshoots.
        const viewport = el.closest('[data-radix-scroll-area-viewport]')
        if (viewport) {
            const top = viewport.scrollTop + el.getBoundingClientRect().top - viewport.getBoundingClientRect().top
            viewport.scrollTo({ top, behavior: 'smooth' })
        } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
}

const CTAButtons = () => (
    <div className="flex flex-wrap items-center gap-3">
        <CallToAction to={SIGNUP_URL} size="sm" state={{ newWindow: true, initialTab: 'signup' }}>
            Get started free
        </CallToAction>
        <CallToAction type="secondary" size="sm" onClick={scrollToInstall}>
            Install with AI
        </CallToAction>
    </div>
)

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────

const HeroSection = () => {
    const { getCustomers } = useCustomers()

    return (
        <section id="overview" className="not-prose w-full tracking-[-0.0125em]">
            <div className="flex flex-col items-start gap-6 @4xl/reader-content:flex-row @4xl/reader-content:items-center @4xl/reader-content:gap-8">
                <div className="@4xl/reader-content:flex-1">
                    <p className="text-sm font-semibold text-secondary m-0 mb-3 flex items-center gap-1.5">
                        <IconPop show delay={200}>
                            <sessionReplay.Icon className={`size-5 text-${sessionReplay.color}`} />
                        </IconPop>
                        Session Replay
                        <IconPop show delay={450} className="ml-3">
                            <replayVision.Icon className={`size-5 text-${replayVision.color}`} />
                        </IconPop>
                        Replay Vision
                    </p>
                    <h1 className="!mt-0 mb-4 text-xl font-bold leading-tight @xl/reader-content:text-3xl">{TITLE}</h1>
                    <p className="mt-0 mb-4">
                        See exactly what people do in your product, from clicks and scrolls to network requests and
                        console logs. Then let the AI do the watching. Tell it what to look for and it flags where
                        people got stuck, scores frustration, and summarizes what happened.
                    </p>
                    <CTAButtons />
                    <p className="text-sm text-secondary mt-3 mb-0">5,000 recordings free every month, forever.</p>
                </div>
                <div className="w-full max-w-xs mx-auto @4xl/reader-content:mx-0 @4xl/reader-content:w-[38%] @4xl/reader-content:max-w-none">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_144675_8d8c4d3881.png"
                        alt="A Replay Vision observation showing the verdict, confidence score, and timestamped reasoning"
                        className="w-full"
                        imgClassName="w-full h-auto"
                    />
                </div>
            </div>

            {/* Logo row and caption from the /r/session-replay ad page. */}
            <div className="mt-10">
                <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary">
                    {getCustomers(CUSTOMER_SLUGS).map((customer) => (
                        <CustomerLogo key={customer.slug} customer={customer} className="h-8 max-w-40" />
                    ))}
                </div>
                <p className="text-xs mt-3 !mb-0">
                    <span className="font-semibold">These are some of our paying customers.</span>
                    <br />
                    <span className="text-muted">
                        (Yes they actually use us, no it's not just some random engineer who tried us out 2+ years ago.)
                    </span>
                </p>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// How it works
// ─────────────────────────────────────────────

// Each step is a slide in the same tabbed carousel as the Replay Vision "How do I use it?" section.
const steps: CarouselSlideType[] = [
    {
        slug: 'record',
        label: '1. Record',
        icon: <IconVideoCamera className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: '1. Record user sessions',
        description: (
            <>
                <p>
                    Session Replay captures sessions on web and mobile. Input fields are masked by default, so passwords
                    and card numbers stay out of the recording.
                </p>
                <SlideCallout>Your first 5,000 web recordings each month are free.</SlideCallout>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_player_overview_light_902aadff54.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_player_overview_dark_d03f1adf30.png',
            alt: 'The Session Replay page: the list of recordings on the left, the player in the middle, the event list on the right',
            maxWidth: 'max-w-none',
        },
    },
    {
        slug: 'describe',
        label: '2. Direct the AI',
        icon: <IconMagic className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: '2. Tell the AI what to look for',
        description: (
            <>
                <p>
                    Ask a question in plain English, like "did the user get stuck on checkout?" The AI watches the
                    sessions you point it at and catches the hesitation and confusion that never show up as an event.
                </p>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/rv_product_goal_flow_light_8beb9024d2.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/rv_product_goal_flow_dark_bf668d971a.png',
            alt: 'The Replay Vision new scanner page, where you describe what the scanner should find out',
            maxWidth: 'max-w-none',
        },
    },
    {
        slug: 'observe',
        label: '3. Observe',
        icon: <IconGraph className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: '3. Get observations you can act on',
        description: (
            <>
                <p>
                    Each scanned session becomes an observation: a yes/no verdict, a score, tags, or a summary. Every
                    observation has a confidence score. Observations also land as <code>$recording_observed</code>{' '}
                    events, so you can chart them, build cohorts from them, or send alerts to Slack.
                </p>
                <SlideCallout>
                    We do this ourselves. One of our scanners caught a visitor hunting for our changelog RSS feed, and
                    an agent wrote the fix.{' '}
                    <Link to="https://github.com/PostHog/posthog.com/pull/20192" className="underline font-bold">
                        It was merged the same day
                    </Link>
                    .
                </SlideCallout>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/rv_product_category_mix_light_29713d1d9b.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/rv_product_category_mix_dark_84ec02d2b4.png',
            alt: 'A Replay Vision classifier scanner, with a chart of its categories over time',
            maxWidth: 'max-w-none',
        },
    },
]

// ─────────────────────────────────────────────
// Scanners
// ─────────────────────────────────────────────

// Same cards as the "What it looks for" tab on /replay-vision
// (`hooks/productData/replay_vision/slides.tsx`), with an output line.
const scanners: {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    title: string
    description: string
    output?: string
}[] = [
    {
        Icon: IconDocument,
        color: 'text-green',
        title: 'Session summary',
        description: "The short version of a session, so you don't sit through 3 hours of someone scrolling.",
        output: 'A title and a summary',
    },
    {
        Icon: IconMagic,
        color: 'text-blue',
        title: 'User intent',
        description: 'Tags each session with what the user seemed to be trying to do.',
        output: 'Tags from a list you define',
    },
    {
        Icon: IconCheckCircle,
        color: 'text-teal',
        title: 'Session outcome',
        description: 'Tags what actually happened: completed, abandoned, errored, and so on.',
        output: 'Tags from a list you define',
    },
    {
        Icon: IconWarning,
        color: 'text-red',
        title: 'Dead ends',
        description: "Flags the moment someone can't find the next step and leaves.",
        output: 'A yes/no verdict, with reasoning',
    },
    {
        Icon: IconTrending,
        color: 'text-yellow',
        title: 'Frustration score',
        description: 'Rates how much friction a page caused.',
        output: 'A score on a scale you define',
    },
    {
        Icon: IconFlask,
        color: 'text-orange',
        title: 'Experiment',
        description:
            'Summarizes sessions from each variant of an experiment and puts them side by side, so you see what people did differently.',
        output: 'A summary, labeled with the variant',
    },
]

// Real prompts teams wrote, from the "Find issues that frustrate users" blog post
// (capitalized, typos fixed). The MCP terminal uses other prompts from the same post.
const customExamples = [
    "Find people who try to sign up but can't.",
    'Find sessions where users get stuck on mobile.',
    "I want to understand why we're not converting to paid users.",
    'I need to track annoying popups, mobile UI flaws, etc.',
]

// ─────────────────────────────────────────────
// MCP terminal, a smaller version of the /mcp "What can you do with it?" terminal
// ─────────────────────────────────────────────

// Example output only, to show the shape of an answer. Tool names are real
// (see /docs/replay-vision/mcp), the numbers are illustrative.
const terminalPrompts: {
    title: string
    Icon: React.ComponentType<{ className?: string }>
    prompt: string
    lines: string[]
}[] = [
    {
        title: 'Create a scanner',
        Icon: IconPlusSquare,
        prompt: 'Create a Replay Vision scanner that flags sessions where users get stuck on the /checkout page, narrow to enterprise customers, and start at 25% sampling. Estimate the cost first.',
        lines: [
            'Drafting a monitor for /checkout (vision-scanners-draft)...',
            'Filters: enterprise customers. Sampling: 25%.',
            'Estimate: about 1,200 observations a month, or 6,000 credits ($60).',
        ],
    },
    // The next five are prompts real teams wrote, from the "Find issues that frustrate users" blog post.
    {
        title: 'Find bugs',
        Icon: IconWarning,
        prompt: 'Set up a scanner to help me find bugs, UX issues, and 404s.',
        lines: [
            'Drafting a monitor for bugs, UX issues, and 404s (vision-scanners-draft)...',
            'Filters: sessions with an exception or a 404.',
            'Created. New sessions get checked every few minutes.',
        ],
    },
    {
        title: 'Onboarding drop-off',
        Icon: IconCursorClick,
        prompt: 'Find where users get stuck in onboarding.',
        lines: [
            'Drafting a classifier for onboarding steps (vision-scanners-draft)...',
            'Tags: create account, invite teammates, connect data, first insight.',
            'Most stuck sessions stop at: connect data (38%).',
        ],
    },
    {
        title: 'Checkout',
        Icon: IconGraph,
        prompt: 'Why do users abandon checkout?',
        lines: [
            "Scanning 50 recent sessions that reached /checkout but didn't pay (vision-scanners-inline-scan)...",
            'Top reason: the card form clears after a declined payment (14 of 50).',
            'Next: shipping cost only shows on the last step (9 of 50).',
        ],
    },
    {
        title: 'Frustration',
        Icon: IconTrending,
        prompt: 'Find issues that frustrate users.',
        lines: [
            'Starting from the Frustration score template...',
            'Scale: 1 to 5. Sampling: 10% of sessions.',
            "Created. I'll report back once the first scores land.",
        ],
    },
    {
        title: 'Feature adoption',
        Icon: IconCheckCircle,
        prompt: 'I want to know if the new edit settings are used, and if people stay on them for long.',
        lines: [
            'Drafting a monitor for the new edit settings (vision-scanners-draft)...',
            'Output: a yes/no verdict, plus how long they stayed on the page.',
            'Estimate: about 800 observations a month, or 4,000 credits ($40).',
        ],
    },
    {
        title: 'Get alerted',
        Icon: IconBell,
        prompt: 'Set up an alert that posts to Slack whenever my "Dead ends" monitor answers yes.',
        lines: [
            'Creating an alert on "Dead ends" (vision-alerts-create)...',
            'Trigger: every observation that answers yes.',
            'Destination: #product-alerts in Slack. Done.',
        ],
    },
]

const TYPING_SPEED = 20
const CYCLE_INTERVAL = 5000

const LINE_DELAY = 350

const MCPTerminal = () => {
    const [active, setActive] = useState(0)
    const [typedLength, setTypedLength] = useState(0)
    const [visibleLines, setVisibleLines] = useState(0)
    const [isInView, setIsInView] = useState(false)
    const paused = useRef(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const item = terminalPrompts[active]
    const typed = item.prompt.slice(0, typedLength)

    // Only animate while the terminal is on screen, same as TabbedCarousel: observe
    // against ReaderView's Radix scroll viewport when there is one, not the window.
    useEffect(() => {
        const el = containerRef.current
        if (!el || typeof IntersectionObserver === 'undefined') return
        const scrollRoot = (el.closest('[data-radix-scroll-area-viewport]') as Element | null) ?? null
        const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
            root: scrollRoot,
            threshold: 0,
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const show = useCallback((index: number) => {
        setActive(index)
        setTypedLength(0)
        setVisibleLines(0)
    }, [])

    // One step per tick: type a character, then reveal a response line, then move to
    // the next prompt (unless someone picked a chip). Scrolling away clears the pending
    // step, so the animation pauses where it is and picks up from there on return.
    useEffect(() => {
        if (!isInView) return
        let t: ReturnType<typeof setTimeout> | undefined
        if (typedLength < item.prompt.length) {
            t = setTimeout(() => setTypedLength((n) => n + 1), TYPING_SPEED)
        } else if (visibleLines < item.lines.length) {
            t = setTimeout(() => setVisibleLines((n) => n + 1), LINE_DELAY)
        } else if (!paused.current) {
            t = setTimeout(() => show((active + 1) % terminalPrompts.length), CYCLE_INTERVAL)
        }
        return () => clearTimeout(t)
    }, [isInView, active, typedLength, visibleLines, item, show])

    const pick = useCallback(
        (index: number) => {
            paused.current = true
            show(index)
        },
        [show]
    )

    return (
        <div ref={containerRef} className="not-prose rounded-md overflow-hidden border border-primary shadow-md my-6">
            <div className="bg-[#1e1e2e] dark:bg-[#11111b] border-b border-white/10 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-red/60" />
                    <span className="size-2.5 rounded-full bg-yellow/80" />
                    <span className="size-2.5 rounded-full bg-green/70" />
                </div>
                <span className="text-[11px] font-mono text-white/40 ml-2 truncate">posthog-mcp</span>
                <span className="ml-auto text-[9px] uppercase tracking-wider font-semibold text-white/30 inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-green animate-pulse" />
                    Live
                </span>
            </div>
            <div className="bg-[#1e1e2e] dark:bg-[#11111b] px-4 py-4 min-h-[210px]">
                <div className="flex items-center gap-2 mb-1">
                    <replayVision.Icon className="size-4 shrink-0 text-yellow" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40">
                        Replay Vision
                    </span>
                </div>
                <p className="m-0 text-[13px] @sm:text-[14px] font-mono text-white/90 leading-relaxed">
                    <span className="text-yellow mr-1.5">{'>'}</span>
                    {typed}
                    {typed.length < item.prompt.length && (
                        <span className="inline-block w-[2px] h-[14px] bg-yellow ml-0.5 align-middle animate-[pulse_1s_steps(1)_infinite]" />
                    )}
                </p>
                <div className="mt-3 space-y-1">
                    {item.lines.slice(0, visibleLines).map((line) => (
                        <p
                            key={line}
                            className="m-0 text-[12px] @sm:text-[13px] font-mono text-green/90 leading-relaxed"
                        >
                            {line}
                        </p>
                    ))}
                </div>
            </div>
            <div className="bg-[#16161e] dark:bg-[#0a0a12] border-t border-white/10 px-3 py-2.5">
                {/* Chips wrap instead of scrolling, so none get cut off at the edge. */}
                <div className="flex flex-wrap items-center gap-1.5">
                    {terminalPrompts.map(({ title, Icon }, i) => (
                        <button
                            key={title}
                            onClick={() => pick(i)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer border-0 whitespace-nowrap shrink-0 ${
                                i === active
                                    ? 'bg-white/15 text-white'
                                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                            }`}
                        >
                            <Icon className="size-3 shrink-0 text-yellow" />
                            {title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// FAQ and pricing
// ─────────────────────────────────────────────

const faqs = [
    {
        q: 'Does Replay Vision watch every session?',
        a: "No, and you wouldn't want it to. A scanner watches only the recordings that match its filters, at the sampling rate you set, so you control what gets scanned and what it costs.",
    },
    {
        q: 'How much does it cost?',
        a: 'Session Replay gives you 5,000 web recordings and 2,500 mobile recordings free every month. After that, web recordings start at $0.005 each. Replay Vision gives you 2,500 credits free every month. One credit is $0.01, and each observation costs 2, 5, or 15 credits depending on the model. On the default model, 2,500 credits cover 500 observations a month.',
    },
    {
        q: 'Can I trust what Replay Vision says?',
        a: "Every observation shows a confidence score and its reasoning. Rate observations with a thumbs up or down and the scanner learns from your team's ratings.",
    },
    {
        q: 'How does Session Replay protect user privacy?',
        a: "Session Replay masks inputs by default, and you can mask anything else. Replay Vision checks each answer for personal data the scanner didn't ask for. If it finds any, it rewrites the answer, and if the rewrite still has personal data, the scan fails and nothing is saved.",
    },
    {
        q: 'Can Replay Vision tell me when something goes wrong?',
        a: 'Yes. You can set alerts that fire on matching observations or when a metric crosses a threshold, and send them to Slack or a webhook.',
    },
]

// The pricing sections from /session-replay/pricing and /replay-vision/pricing,
// switched with the same toggle as the Replay Vision "AI prompts" section.
const PricingTabs = () => {
    const [tab, setTab] = useState<'session_replay' | 'replay_vision'>('session_replay')
    const sessionReplayData = useProduct({ handle: 'session_replay' }) as any

    return (
        <div className="not-prose mt-4">
            <ToggleGroup
                title="Product"
                hideTitle
                value={tab}
                onValueChange={(value) => {
                    if (value === 'session_replay' || value === 'replay_vision') setTab(value)
                }}
                options={[
                    { label: 'Session Replay', value: 'session_replay', default: true },
                    { label: 'Replay Vision', value: 'replay_vision' },
                ]}
                className="mb-8 max-w-sm"
            />
            {tab === 'session_replay' && sessionReplayData && (
                <div className="flex flex-col gap-12">
                    <Plans id="session-replay-plans" productData={sessionReplayData} allProducts={[]} />
                    <PricingCalculator
                        id="session-replay-calculator"
                        productData={sessionReplayData}
                        allProducts={[]}
                    />
                </div>
            )}
            {tab === 'replay_vision' && (
                <div className="flex flex-col gap-12">
                    <PricingPlans
                        id="replay-vision-plans"
                        productData={null}
                        allProducts={[]}
                        intro={<PricingTLDR id="replay-vision-tldr" productData={null} allProducts={[]} />}
                    />
                    <PricingCredits id="replay-vision-calculator" productData={null} allProducts={[]} />
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ReplayVisionLanding(): JSX.Element {
    return (
        <>
            <SEO
                title="Session Replay that watches itself | PostHog"
                description="PostHog Session Replay records what users do. Replay Vision watches those recordings for you and turns them into observations you can query and chart."
                noindex
            />
            <ReaderView hideLeftSidebar showQuestions={false} title="replay-vision.md" hideTitle={true}>
                {/* Centered column, same as /slack and /desktop. */}
                <div className="max-w-4xl mx-auto">
                    <HeroSection />
                    <hr className="border-t border-primary m-0 mb-10 mt-8" />

                    <section id="how-it-works" className="scroll-mt-20">
                        <h3 className="!text-2xl !font-bold">How it works</h3>
                        <div className="not-prose my-6">
                            <TabbedCarousel
                                tabs={steps.map((s) => ({
                                    value: s.slug,
                                    label: s.label,
                                    icon: s.icon,
                                    color: s.color,
                                    activeText: s.activeText,
                                    progressBar: s.progressBar,
                                    content: <CarouselSlide slide={s} productData={replayVision} />,
                                }))}
                                slideDuration={8000}
                                showActiveBg={false}
                                slideClassName="!min-h-0 !p-0 !rounded"
                            />
                        </div>
                    </section>

                    <section id="scanners" className="scroll-mt-20">
                        <h3 className="!text-2xl !font-bold">
                            <SlotMachineText
                                prefix="Find the"
                                words={['dead ends', 'rage clicks', 'confused users', 'broken checkouts']}
                                wordClassName="text-red dark:text-yellow"
                            />
                        </h3>
                        <p>
                            Replay Vision comes with scanners: AI probes you configure and point at your sessions. Pick
                            one of ours and tell it what to watch, or create your own.
                        </p>
                        <div className="not-prose @container my-6">
                            <div className="grid @md:grid-cols-2 @2xl:grid-cols-3 gap-4">
                                {scanners.map(({ Icon, color, title, description, output }) => (
                                    <div key={title} className={CARD}>
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <Icon className={`size-5 shrink-0 self-center ${color}`} />
                                            <h4 className="text-[15px] font-bold m-0">{title}</h4>
                                        </div>
                                        <p className="text-sm text-secondary m-0">{description}</p>
                                        {output && (
                                            <p className="text-sm font-semibold text-primary mt-3 mb-0">{output}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 rounded-md border border-purple/30 bg-purple/10 p-4 @2xl:p-6">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <IconCode className="size-5 shrink-0 self-center text-purple" />
                                    <h4 className="text-[15px] font-bold m-0">Create your own scanner</h4>
                                </div>
                                <p className="text-sm text-secondary m-0 mb-4">
                                    Pick a scanner type, write the prompt in your own words, and choose which recordings
                                    it watches. Some prompts teams use:
                                </p>
                                <ul className="list-none m-0 p-0 grid @md:grid-cols-2 gap-2">
                                    {customExamples.map((prompt) => (
                                        <li key={prompt} className="text-sm text-secondary italic">
                                            &ldquo;{prompt}&rdquo;
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section id="install" className="scroll-mt-20">
                        <h3 className="!text-2xl !font-bold">
                            Set up in <Highlight>one command</Highlight>
                        </h3>
                        <div className="not-prose grid @2xl/reader-content:grid-cols-2 gap-4 my-6">
                            <div className={CARD}>
                                <h4 className="text-lg font-bold mt-0 mb-2">Install with the wizard</h4>
                                <p className="text-sm text-secondary leading-relaxed m-0 mb-3">
                                    Run it in your project and it sets everything up, including three scanners written
                                    for your product.
                                </p>
                                <WizardCommand command="replay-vision" variant="bordered" slim />
                                <p className="text-sm text-secondary leading-relaxed mt-3 mb-0">
                                    They're ordinary scanners, so you can edit or delete them afterward.
                                </p>
                            </div>
                            <div className={CARD}>
                                <h4 className="text-lg font-bold mt-0 mb-2">Start in the app</h4>
                                <p className="text-sm text-secondary leading-relaxed m-0 mb-4">
                                    Already recording? Open Replay Vision, click New scanner, and pick a starting point.
                                    PostHog AI drafts the scanner, you run it on a recording you choose, and you see
                                    your first observation in about five minutes.
                                </p>
                                <CallToAction
                                    size="sm"
                                    type="primary"
                                    to="/docs/replay-vision/start-here"
                                    state={{ newWindow: true }}
                                >
                                    Open Replay Vision
                                </CallToAction>
                                <p className="text-sm text-secondary leading-relaxed mt-3 mb-0">
                                    An organization admin needs to approve AI data processing first.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="mcp" className="scroll-mt-20">
                        <h3 className="!text-2xl !font-bold">
                            Or just ask <Highlight>your agent</Highlight>
                        </h3>
                        <p>
                            Connect your agent to the PostHog MCP and ask a one-off question about specific sessions
                            without setting up a scanner, draft a scanner from a goal and estimate its cost before it
                            runs, or pull observations into context while it writes the fix.
                        </p>
                        {/* Second paragraph on the left, install on the right, both just above the terminal. */}
                        <div className="not-prose grid gap-4 items-center @2xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @2xl/reader-content:gap-10">
                            <p className="m-0">
                                The same MCP covers your funnels, flags, and errors, so the agent can go from
                                "conversion dropped" to the replays that explain it in one conversation.
                            </p>
                            <div>
                                <WizardCommand command="mcp add" variant="bordered" slim />
                                <p className="text-sm text-secondary mt-2 mb-0">
                                    Works in Cursor, Claude Code, Codex, VS Code, Windsurf, and other MCP clients.
                                </p>
                            </div>
                        </div>
                        <MCPTerminal />
                    </section>

                    <section id="questions" className="scroll-mt-20">
                        <h3 className="!text-2xl !font-bold">FAQ</h3>
                        <div className="not-prose mt-4">
                            <Accordion
                                type="single"
                                triggerClassName="!px-3 !py-2"
                                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                                items={faqs.map(({ q, a }) => ({ trigger: q, content: a }))}
                            />
                        </div>
                    </section>

                    <section id="pricing" className="scroll-mt-20">
                        <h3 className="!text-2xl !font-bold">Pricing</h3>
                        <PricingTabs />
                    </section>

                    {/* Closing box in the layout of the /slack "Try it" box. */}
                    <div
                        id="get-started"
                        className="not-prose bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-10"
                    >
                        <div className="grid @lg/reader-content:grid-cols-[1fr_240px] gap-8 items-center">
                            <div>
                                <h3 className="mt-0 mb-2 text-2xl font-bold">
                                    Go watch sunsets while PostHog watches your user sessions
                                </h3>
                                <p className="mt-0 mb-4">{FREE_TIER}</p>
                                <CTAButtons />
                            </div>
                            <CloudinaryImage
                                src={IMAGES.projectorHog}
                                alt=""
                                className="hidden @lg/reader-content:block pointer-events-none select-none"
                                imgClassName="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
