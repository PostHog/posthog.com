import React from 'react'
import { graphql } from 'gatsby'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { TreeMenu } from 'components/TreeMenu'
import { productOSNav } from 'hooks/useProductOSNavigation'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import { SignalsCallout } from 'components/Code/SignalsCallout'
import { getWindowSurfaceBg } from '../../constants/frostedSurfaces'
import { useAppSettings } from '../../context/App'
import {
    IconArrowRight,
    IconAtSign,
    IconBolt,
    IconCheckCircle,
    IconCode,
    IconCoffee,
    IconCompass,
    IconLock,
    IconPeople,
    IconPlug,
    IconPullRequest,
    IconRewindPlay,
    IconSearch,
    IconShieldLock,
    IconSparkles,
    IconStack,
    IconTarget,
    IconTerminal,
    IconWarning,
} from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>
type CloudinarySrc = `https://res.cloudinary.com/${string}`

const LOOP_SCOUTS_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/scouts_8fe0af6de1.png'
const LOOP_INBOX_IMAGE: CloudinarySrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_prs_cloud_f44f8ba69b.png'
const LOOP_MERGE_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/4_merge_ffb549df4a.png'
const sectionHeadingClassName = 'my-6 mt-12 text-2xl font-bold @md/reader-content:text-3xl'

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const coloredHighlightClasses = {
    blue: 'bg-blue/10 text-blue dark:bg-blue/20',
    purple: 'bg-purple/10 text-purple dark:bg-purple/20',
}

const ColoredHighlight = ({ children, color }: { children: React.ReactNode; color: 'blue' | 'purple' }) => (
    <span className={`rounded-sm px-0.5 ${coloredHighlightClasses[color]}`}>{children}</span>
)

const flowingGradientClasses = {
    default: 'from-yellow via-green to-blue',
    chill: 'from-red-2 via-purple/70 to-blue-2',
}

const FlowingGradientHighlight = ({
    children,
    palette = 'default',
}: {
    children: React.ReactNode
    palette?: keyof typeof flowingGradientClasses
}) => (
    <em
        className={`inline bg-gradient-to-r ${flowingGradientClasses[palette]} bg-[length:200%_200%] bg-clip-text not-italic text-transparent animate-gradient-rotate motion-reduce:animate-none`}
        style={{ animationDuration: '12s' }}
    >
        {children}
    </em>
)

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">{children}</span>
)

const LeftSidebarContent = () => <TreeMenu items={productOSNav.children} />

// Icon + text rows for enriching carousel slides (à la the Slack app carousel).
const IconList = ({ items }: { items: { Icon: IconComponent; color: string; text: React.ReactNode }[] }) => (
    <ul className="mt-3 mb-0 list-none space-y-2 pl-0">
        {items.map(({ Icon, color, text }, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                <Icon className={`size-4 shrink-0 mt-0.5 ${color}`} />
                <span>{text}</span>
            </li>
        ))}
    </ul>
)

const Callout = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-3 rounded border border-yellow bg-yellow/10 px-3 py-2 text-sm text-secondary">{children}</div>
)

// Titled columns of icon + label, like the Slack app "ship a fix" slide.
type IconGroup = { title: string; description: string; items: { Icon: IconComponent; color: string; name: string }[] }

const IconGroupColumns = ({ groups }: { groups: IconGroup[] }) => (
    <div className="not-prose mt-4 grid grid-cols-1 gap-6 @sm:grid-cols-2">
        {groups.map((group) => (
            // @container so the items below can wrap to two columns when the group is wide enough
            // (full-width on mobile → 2 cols, keeping the slide short; side-by-side on desktop → 1 col)
            <div key={group.title} className="@container flex flex-col gap-3">
                <div>
                    <p className="m-0 text-base font-bold text-primary">{group.title}</p>
                    <p className="m-0 text-sm text-secondary">{group.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-1.5 @xs:grid-cols-2">
                    {group.items.map(({ Icon, color, name }) => (
                        <span key={name} className="flex items-start gap-1.5 text-sm text-primary">
                            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

type TabPanelHighlightColor = 'blue' | 'red' | 'yellow' | 'green'

const tabPanelHighlightClasses: Record<TabPanelHighlightColor, string> = {
    blue: 'bg-blue/10 text-blue dark:bg-blue/20',
    red: 'bg-red/10 text-red dark:bg-red/20',
    yellow: 'bg-yellow/15 text-yellow dark:bg-yellow/20',
    green: 'bg-green/10 text-green dark:bg-green/20',
}

const TabPanel = ({
    title,
    highlightedTitle,
    titleSuffix,
    highlightColor = 'blue',
    children,
    image,
}: {
    title: string
    highlightedTitle?: string
    titleSuffix?: string
    highlightColor?: TabPanelHighlightColor
    children: React.ReactNode
    image: CloudinarySrc
}) => {
    const fullTitle = [title, highlightedTitle, titleSuffix].filter(Boolean).join(' ')

    return (
        <div className="rounded bg-primary p-4 @xl:p-6">
            <h2 className="mt-0 mb-2 text-2xl font-bold">
                {title}
                {highlightedTitle ? (
                    <>
                        {' '}
                        <span className={`rounded-sm px-0.5 ${tabPanelHighlightClasses[highlightColor]}`}>
                            {highlightedTitle}
                        </span>
                        {titleSuffix ? ` ${titleSuffix}` : null}
                    </>
                ) : null}
            </h2>
            {/* text-[15px] matches the page body copy – the codebase defines .prose-sm as text-[15px] */}
            <div className="text-secondary text-[15px]">{children}</div>
            <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
                <CloudinaryImage src={image} alt={fullTitle} imgClassName="w-full block" />
            </div>
        </div>
    )
}

// Signal sources shown on the carousel's first slide, à la the homepage "debug and fix" slide.
const signalSources: { Icon: IconComponent; color: string; name: string; description: string }[] = [
    {
        Icon: IconWarning,
        color: 'text-yellow',
        name: 'Error tracking',
        description: 'Exceptions and stack traces grouped into issues',
    },
    {
        Icon: IconRewindPlay,
        color: 'text-orange',
        name: 'Session replay',
        description: 'Dead clicks, quick backs, long stalls',
    },
    {
        Icon: IconCompass,
        color: 'text-blue',
        name: 'Scouts',
        description: 'Scheduled agents with durable memory',
    },
    {
        Icon: IconPlug,
        color: 'text-purple',
        name: 'External tools',
        description: 'Zendesk, Linear, GitHub issues',
    },
]

// Example scouts, drawn from /docs/self-driving/scout-examples.
const scoutGroups: IconGroup[] = [
    {
        title: 'Canonical scouts',
        description: 'Pre-built to watch common patterns.',
        items: [
            { Icon: IconCheckCircle, color: 'text-green', name: 'Health checks' },
            { Icon: IconStack, color: 'text-blue', name: 'Data pipelines' },
            { Icon: IconSparkles, color: 'text-purple', name: 'AI observability' },
            { Icon: IconSearch, color: 'text-orange', name: 'Observability gaps' },
        ],
    },
    {
        title: 'Custom scouts',
        description: 'Specific to your product.',
        items: [
            { Icon: IconAtSign, color: 'text-sky-blue', name: 'A Slack channel' },
            { Icon: IconBolt, color: 'text-yellow', name: 'A custom event' },
            { Icon: IconCode, color: 'text-blue', name: 'A GitHub repo' },
            { Icon: IconCompass, color: 'text-purple', name: 'The troop itself' },
        ],
    },
]

const loopTabs: TabbedCarouselTab[] = [
    {
        value: 'signals',
        label: 'Signals',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Notable things"
                highlightedTitle="happening in your product"
                image="https://res.cloudinary.com/dmukukwp6/image/upload/report_177cacd2dd.png"
            >
                <p className="m-0">
                    A signal is a single observation about your product. Signal sources are the pipes that produce them:
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-x-4 gap-y-3 @sm:grid-cols-2">
                    {signalSources.map(({ Icon, color, name, description }) => (
                        <div key={name} className="flex items-start gap-2">
                            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                            <div>
                                <p className="m-0 text-base font-bold text-primary">{name}</p>
                                <p className="m-0 text-sm leading-snug text-secondary">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Callout>
                    On their own, raw signals are noisy. Grouped into a{' '}
                    <Link
                        to="/docs/self-driving/reports"
                        state={{ newWindow: true }}
                        className="font-semibold text-red dark:text-yellow"
                    >
                        report
                    </Link>
                    , they become a single thing you can act on.
                </Callout>
            </TabPanel>
        ),
    },
    {
        value: 'scouts',
        label: 'Scouts',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Specialist agents that"
                highlightedTitle="go deep"
                titleSuffix="on one surface"
                highlightColor="red"
                image={LOOP_SCOUTS_IMAGE}
            >
                <p className="m-0">
                    Scouts <Badge>Beta</Badge> run on a schedule and build durable memory of what they've seen.
                </p>
                <IconGroupColumns groups={scoutGroups} />
                <Callout>We run a troop of 35 scouts on the PostHog web app.</Callout>
            </TabPanel>
        ),
    },
    {
        value: 'inbox',
        label: 'Inbox',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <TabPanel
                title="One"
                highlightedTitle="prioritized list"
                titleSuffix="of work to review"
                highlightColor="yellow"
                image={LOOP_INBOX_IMAGE}
            >
                <p className="m-0">
                    The Inbox <Badge>Beta</Badge> clusters related findings into researched reports, ranked by priority.
                    Reviewers are suggested from git blame (whoever last touched that bit of code) – add your own if
                    someone else should take a look.
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconCode className="size-5 shrink-0 text-blue" />
                            <span className="text-base font-bold text-primary">Code importance</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Is the issue in a hot path like checkout, signup, or billing?
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconPeople className="size-5 shrink-0 text-purple" />
                            <span className="text-base font-bold text-primary">User impact</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            How many users are affected, and are they on a paid plan?
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconWarning className="size-5 shrink-0 text-red" />
                            <span className="text-base font-bold text-primary">Severity</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Is the product broken for these users, or just a minor UX issue?
                        </p>
                    </div>
                </div>
            </TabPanel>
        ),
    },
    {
        value: 'pull-requests',
        label: 'Pull requests',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Actionable reports, opened as"
                highlightedTitle="pull requests"
                highlightColor="green"
                image={LOOP_MERGE_IMAGE}
            >
                <p className="m-0">
                    When something needs a code change, an agent clones your repo into a sandbox, traces the root cause,
                    writes the code, and opens a pull request. If a report <em>isn't</em> actionable, it triggers a
                    research task.
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconSearch className="size-5 shrink-0 text-blue" />
                            <span className="text-base font-bold text-primary">Root cause analysis</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Pairs the signal with your code to find what's actually broken.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconShieldLock className="size-5 shrink-0 text-purple" />
                            <span className="text-base font-bold text-primary">Sandboxed execution</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Clones your repo, applies the fix, and runs your tests.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconCheckCircle className="size-5 shrink-0 text-green" />
                            <span className="text-base font-bold text-primary">You review and merge</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Chat with the agent to tweak it, or merge as-is (lgtm!).
                        </p>
                    </div>
                </div>
                <Callout>
                    <strong className="text-primary">Best part:</strong> the agents babysit CI and rerun flaky jobs
                    until the PR is actually mergeable.
                </Callout>
            </TabPanel>
        ),
    },
]

const slackReports: { label: string; src: CloudinarySrc }[] = [
    { label: 'P0', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P0_report_in_slack_21ed6fa69a.png' },
    {
        label: 'P1 · Replay',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P1_report_in_slack_replay_5fcf5aac7d.png',
    },
    {
        label: 'P1 · Zendesk',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P1_report_in_slack_zendesk_316671edcb.png',
    },
    { label: 'P2', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P2_report_in_slack_b35af9738a.png' },
    { label: 'P3', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P3_report_in_slack_97d9c6d8d4.png' },
    { label: 'P4', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P4_report_in_slack_7119174383.png' },
]

// Scattered, tilted report screenshots in an infinite, centered loop – like the PostHog AI prompt cards.
const SlackReportsRow = (): JSX.Element => {
    const railRef = React.useRef<HTMLDivElement>(null)
    // Three copies so the user can scroll endlessly in either direction.
    const loopReports = [...slackReports, ...slackReports, ...slackReports]

    const copyWidth = (rail: HTMLDivElement): number => {
        const cards = rail.children
        if (cards.length <= slackReports.length) return 0
        return (cards[slackReports.length] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
    }

    const centerCard = (rail: HTMLDivElement, index: number) => {
        const card = rail.children[index] as HTMLElement | undefined
        if (card) rail.scrollLeft = card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2
    }

    React.useEffect(() => {
        const rail = railRef.current
        if (rail) centerCard(rail, slackReports.length)
    }, [])

    const recenter = () => {
        const rail = railRef.current
        if (!rail) return
        const one = copyWidth(rail)
        if (!one) return
        if (rail.scrollLeft < one * 0.5) rail.scrollLeft += one
        else if (rail.scrollLeft > one * 1.5) rail.scrollLeft -= one
    }

    const scrollByCards = (dir: number) => {
        const rail = railRef.current
        if (!rail) return
        // Measure one card + gap rather than hard-coding a width that breaks at the @lg card size.
        const stride =
            rail.children.length > 1
                ? (rail.children[1] as HTMLElement).offsetLeft - (rail.children[0] as HTMLElement).offsetLeft
                : rail.clientWidth
        rail.scrollBy({ left: dir * stride, behavior: 'smooth' })
    }

    return (
        <div className="not-prose relative">
            <div ref={railRef} onScroll={recenter} className="flex snap-x gap-8 overflow-x-auto pb-8 pt-8">
                {loopReports.map(({ label, src }, i) => (
                    <CloudinaryImage
                        key={`${label}-${i}`}
                        src={src}
                        alt={`A ${label} self-driving report delivered to a Slack channel`}
                        className="w-[280px] flex-shrink-0 snap-center odd:-rotate-3 even:rotate-3 @lg/reader-content:w-[320px]"
                        imgClassName="w-full rounded shadow-md"
                    />
                ))}
            </div>
            <button
                type="button"
                aria-label="Previous report"
                onClick={() => scrollByCards(-1)}
                className="absolute left-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-primary shadow-md hover:bg-accent"
            >
                <IconArrowRight className="size-4 rotate-180 text-primary" />
            </button>
            <button
                type="button"
                aria-label="Next report"
                onClick={() => scrollByCards(1)}
                className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-primary shadow-md hover:bg-accent"
            >
                <IconArrowRight className="size-4 text-primary" />
            </button>
        </div>
    )
}

type SelfDrivingPR = {
    prNumber: number
    summary: string
    type: string
    scope: string
    url: string
    mergedAt: string
}

// Conventional-commit type -> tag text color + left accent-stripe color for each ticker card.
const PR_TYPE_STYLES: Record<string, { label: string; accent: string }> = {
    fix: { label: 'text-red', accent: 'bg-red' },
    feat: { label: 'text-green', accent: 'bg-green' },
    perf: { label: 'text-blue', accent: 'bg-blue' },
    refactor: { label: 'text-purple', accent: 'bg-purple' },
    chore: { label: 'text-secondary', accent: 'bg-orange' },
    docs: { label: 'text-secondary', accent: 'bg-orange' },
    test: { label: 'text-secondary', accent: 'bg-orange' },
    style: { label: 'text-secondary', accent: 'bg-orange' },
    build: { label: 'text-secondary', accent: 'bg-orange' },
    ci: { label: 'text-secondary', accent: 'bg-orange' },
}
const prTypeStyle = (type: string) => PR_TYPE_STYLES[type] ?? { label: 'text-primary', accent: 'bg-orange' }

// Soft fade on both edges so cards scroll in/out instead of hard-clipping.
const TICKER_FADE = 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)'

// Short, human "merged N ago" – computed in the browser so it stays fresh between rebuilds.
const timeAgo = (iso: string): string => {
    if (!iso) return ''
    const then = new Date(iso).getTime()
    // Guard against missing/epoch dates (e.g. a PR with no merge date) rendering as "2949w ago".
    if (Number.isNaN(then) || then <= 0) return ''
    const seconds = Math.max(0, (Date.now() - then) / 1000)
    const days = Math.floor(seconds / 86400)
    if (days >= 7) return `${Math.floor(days / 7)}w ago`
    if (days >= 1) return `${days}d ago`
    const hours = Math.floor(seconds / 3600)
    if (hours >= 1) return `${hours}h ago`
    const minutes = Math.floor(seconds / 60)
    return minutes >= 1 ? `${minutes}m ago` : 'just now'
}

const TickerCard = ({ pr }: { pr: SelfDrivingPR }): JSX.Element => {
    const style = prTypeStyle(pr.type)
    return (
        <Link
            to={pr.url}
            external
            externalNoIcon
            className="group relative flex w-[300px] flex-shrink-0 items-start gap-2.5 overflow-hidden rounded-md border border-primary bg-primary py-2.5 pl-4 pr-3.5 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
        >
            {/* Type-colored accent stripe down the left edge */}
            <span className={`absolute inset-y-0 left-0 w-1 ${style.accent}`} aria-hidden />
            <IconPullRequest className="mt-0.5 size-4 shrink-0 text-green" />
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wide">
                    <span className={style.label}>{pr.type || 'merged'}</span>
                    {pr.scope && <span className="truncate normal-case text-secondary">{pr.scope}</span>}
                </div>
                <p className="m-0 truncate text-sm text-primary group-hover:underline">{pr.summary}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-secondary">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-1.5 py-px font-semibold text-green">
                        <IconCheckCircle className="size-3" />
                        merged
                    </span>
                    <span className="font-mono">#{pr.prNumber}</span>
                    <span aria-hidden>·</span>
                    {/* Relative time is computed at render, so it differs between the SSR build and
                        the client – suppress the expected hydration mismatch on this text node. */}
                    <span suppressHydrationWarning>{timeAgo(pr.mergedAt)}</span>
                </div>
            </div>
        </Link>
    )
}

// One continuously scrolling row. `direction` sets scroll direction (1 = left→right rail advance,
// -1 = the reverse). Pauses on hover/focus and stops entirely for reduced-motion users.
const TickerRow = ({ prs, direction }: { prs: SelfDrivingPR[]; direction: 1 | -1 }): JSX.Element => {
    const railRef = React.useRef<HTMLDivElement>(null)
    const pausedRef = React.useRef(false)

    // Two copies of the list so scrollLeft can wrap seamlessly at either end.
    const loop = [...prs, ...prs]

    React.useEffect(() => {
        const rail = railRef.current
        if (!rail || prs.length === 0) return
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return

        let frame = 0
        const step = () => {
            if (!pausedRef.current) {
                rail.scrollLeft += 0.5 * direction
                const half = rail.scrollWidth / 2
                if (half > 0) {
                    if (rail.scrollLeft >= half) rail.scrollLeft -= half
                    else if (rail.scrollLeft <= 0) rail.scrollLeft += half
                }
            }
            frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
        return () => cancelAnimationFrame(frame)
    }, [prs.length, direction])

    const pause = () => {
        pausedRef.current = true
    }
    const resume = () => {
        pausedRef.current = false
    }

    return (
        <div
            ref={railRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocusCapture={pause}
            onBlurCapture={resume}
            className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ maskImage: TICKER_FADE, WebkitMaskImage: TICKER_FADE }}
        >
            {loop.map((pr, i) => (
                <TickerCard key={`${pr.prNumber}-${i}`} pr={pr} />
            ))}
        </div>
    )
}

// A "wall of merges": one row when there are only a few PRs, two rows scrolling in
// opposite directions when there are enough to fill them.
const SelfDrivingTicker = ({ prs }: { prs: SelfDrivingPR[] }): JSX.Element | null => {
    if (prs.length === 0) return null
    const twoRows = prs.length >= 6
    const mid = Math.ceil(prs.length / 2)
    const rowA = twoRows ? prs.slice(0, mid) : prs
    const rowB = twoRows ? prs.slice(mid) : []

    return (
        <div className="not-prose flex flex-col gap-3">
            <TickerRow prs={rowA} direction={1} />
            {rowB.length > 0 && <TickerRow prs={rowB} direction={-1} />}
        </div>
    )
}

const workSurfaces: {
    Icon: IconComponent
    iconColor: string
    label: React.ReactNode
    copy: React.ReactNode
    cta?: React.ReactNode
}[] = [
    {
        Icon: IconBolt,
        iconColor: 'text-red',
        label: <span className="font-bold text-primary">PostHog web app</span>,
        copy: 'The full product in your browser. Explore your data, review proposed work, and dig into the evidence.',
        cta: (
            <CallToAction to="https://app.posthog.com/signup" externalNoIcon type="primary" size="md">
                Sign up for free
            </CallToAction>
        ),
    },
    {
        Icon: IconAtSign,
        iconColor: 'text-sky-blue',
        label: (
            <Link to="/slack" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog Slack app
            </Link>
        ),
        copy: '@PostHog brings PostHog into Slack channels. Route reports to the ones each team already watches (hedgehog mode not included).',
        cta: (
            <CallToAction to="/slack" state={{ newWindow: true }} type="secondary" size="md">
                Add to Slack
            </CallToAction>
        ),
    },
    {
        Icon: IconPlug,
        iconColor: 'text-gray',
        label: (
            <Link to="/mcp" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog MCP
            </Link>
        ),
        copy: 'Look ma, no hands! Pull self-driving context into other tools, and pull context from your other tools into self-driving.',
        cta: (
            <CallToAction to="/mcp" state={{ newWindow: true }} type="secondary" size="md">
                Hook it up
            </CallToAction>
        ),
    },
    {
        Icon: IconTerminal,
        iconColor: 'text-green',
        label: (
            <Link to="/docs/cli" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog CLI
            </Link>
        ),
        copy: 'Self-driving from your terminal. Query your data and drive agents right where you already work, and wire it into your scripts and CI.',
        cta: (
            <CallToAction to="/docs/cli" state={{ newWindow: true }} type="secondary" size="md">
                Read the docs
            </CallToAction>
        ),
    },
    {
        Icon: IconCoffee,
        iconColor: 'text-brown dark:text-brown-dark',
        label: (
            <span className="inline-flex items-center gap-2">
                <Link to="/code" state={{ newWindow: true }} className="font-bold text-primary">
                    PostHog Code
                </Link>
                <span className="inline-flex items-center rounded-sm bg-yellow/15 px-1 py-0.5 text-xs font-bold text-yellow">
                    Beta
                </span>
            </span>
        ),
        copy: 'A desktop app for driving parallel agents to edit your product. The same Inbox and reports live here.',
        cta: (
            <CallToAction to="/code" state={{ newWindow: true }} type="secondary" size="md">
                Get the app
            </CallToAction>
        ),
    },
]

type WorkMode = {
    tag: string
    tagClass: string
    title: string
    copy: string
    guard: { label: string; copy: string }
}

const workModes: WorkMode[] = [
    {
        tag: 'Prompted',
        tagClass: 'bg-red/15 text-red',
        title: 'It builds what you spec',
        copy: "This is what you're used to (you set the spec and the agents do the work). Prompt a task from PostHog AI, PostHog Code, or the Slack app, and agents build it.",
        guard: {
            label: 'Full product context',
            copy: "Understands your users, not just the diff it's editing.",
        },
    },
    {
        tag: 'Reactive',
        tagClass: 'bg-purple/15 text-purple',
        title: 'It acts on your data',
        copy: 'This is what the Inbox is for. It watches the data you already have in PostHog and turns anything worth acting on into a researched report, often with a fix attached.',
        guard: {
            label: 'Always on',
            copy: 'Reads logs and tickets for fun. Sick, honestly.',
        },
    },
    {
        tag: 'Proactive',
        tagClass: 'bg-blue/15 text-blue',
        title: 'It looks for work',
        copy: "This is where it gets good. Scouts dig through your data and flag problems you haven't thought about (yet). Your product improves everywhere, every day.",
        guard: {
            label: 'Remembers everything',
            copy: 'Including that. Especially, that.',
        },
    },
]

type HumanRole = {
    heading: string
    copy: string
    image: CloudinarySrc
    alt: string
}

const humanRoles: HumanRole[] = [
    {
        heading: "You're (still) the driver",
        copy: "Like a Waymo, a self-driving product doesn't decide where you're going (it just makes getting there easier). You choose where the product goes next.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/hog_head_point_b6a2ffb400.png',
        alt: 'A hedgehog pointing to the side',
    },
    {
        heading: 'Skip to the good part',
        copy: "Somebody's gotta clean up around here. Turns out it doesn't have to be you. Bug fixes and maintenance work land in your inbox. Hit merge and move on with your day.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_popcorn_82aa11ea69.png',
        alt: 'A hedgehog eating popcorn',
    },
    {
        heading: 'Outship everyone',
        copy: "Product capability used to scale with headcount. Now it's handled (without adding any). A small team with self-driving can outship companies 10x the size.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_laptop_2afc8d8955.png',
        alt: 'A hedgehog working at a laptop',
    },
]

const faqItems = [
    {
        trigger: 'What is a self-driving product?',
        content: (
            <p>
                A product that improves itself without waiting to be prompted. PostHog watches how people actually use
                your product, finds what's broken or worth changing, writes the fix, and opens a pull request (in a
                never-ending loop).
            </p>
        ),
    },
    {
        trigger: "We're a tiny team – is this overkill?",
        content: (
            <p>
                The opposite. The whole point is that a small team can ship like a much bigger one. Self-driving is
                basically founder mode for your product (sweat the details, focus on the work, get involved where you
                are needed).
            </p>
        ),
    },
    {
        trigger: "Won't it just flood my codebase with AI slop?",
        content: (
            <p>
                That's the failure mode (we're not selling you a slop-cannon). PostHog self-driving handles detection,
                instrumentation, and low-risk iteration, but every change is a pull request a human reviews and merges.
                The code is good because we're using the same AI models you are.
            </p>
        ),
    },
    {
        trigger: "Why can't I just run this in Cursor, Claude Code, or Devin?",
        content: (
            <p>
                Those are great at the coding half, but they start from a ticket or prompt and see only your repo. They
                can't originate work from vague signals like "users are struggling here." Self-driving can, because the
                signals live in your product data. You can still bring that context into your own agent via{' '}
                <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                    PostHog MCP
                </Link>
                .
            </p>
        ),
    },
    {
        trigger: 'How is this different from PostHog Code and PostHog AI?',
        content: (
            <p>
                Same brain, different doors.{' '}
                <Link to="/ai" state={{ newWindow: true }} className="text-red dark:text-yellow font-semibold">
                    PostHog AI
                </Link>{' '}
                answers data questions inside the app.{' '}
                <Link to="/code" state={{ newWindow: true }} className="text-red dark:text-yellow font-semibold">
                    PostHog Code
                </Link>{' '}
                is the desktop coding agent you edit your product with. Self-driving is what happens when you point that
                agent at your product data and let it work on its own.
            </p>
        ),
    },
    {
        trigger: 'What are signal sources and Scouts?',
        content: (
            <p>
                The two ways work shows up in your Inbox. <strong>Signal sources</strong> are raw inputs (like errors,
                support tickets, and replays). They trigger a reactive investigation. <strong>Scouts</strong> are
                proactive agents that wake on a schedule. They search for slow leaks no single event reveals (and have
                memory across runs so they're not silly goldfish).
            </p>
        ),
    },
    {
        trigger: 'Does it really open pull requests on its own?',
        content: (
            <p>
                You betcha. When a fix is well-researched and clear, an agent opens a real PR with a written description
                and a suggested reviewer. It even babysits CI until the PR is mergeable. What it doesn't do is merge it
                (that's your job).
            </p>
        ),
    },
    {
        trigger: 'What does it cost?',
        content: (
            <p>
                Self-driving is in open paid beta. Scouts, reports, and the Inbox are all free. You pay a flat fee per
                pull request (valuable work actually completed) and there's a free tier to start. See{' '}
                <Link to="/pricing" state={{ newWindow: true }} className="text-red dark:text-yellow font-semibold">
                    pricing
                </Link>{' '}
                for the latest.
            </p>
        ),
    },
    {
        trigger: 'What can it watch, and can I control it?',
        content: (
            <p>
                Anything you already send to PostHog (errors, session replays, logs, funnels, flags, experiments,
                revenue) plus external sources like GitHub issues, Linear, Zendesk. You can toggle them on and off at
                any time to control costs.
            </p>
        ),
    },
    {
        trigger: 'How does setup work, and what does the wizard do?',
        content: (
            <p>
                Setup is a single command with the PostHog wizard. The wizard reads your codebase and product, detects
                the services you run, and enables only the sources and scouts relevant to what it finds. It checks your
                GitHub connection, that the PostHog SDK is installed, and that AI data processing is approved, then
                hands back a setup report showing exactly what was and wasn't enabled, and why. Your first reports land
                in ~20–30 minutes – just enough time to build the cache and ingest from your first sources.
            </p>
        ),
    },
    {
        trigger: 'Is my code safe?',
        content: (
            <p>
                Your code stays in your repo and your data stays in PostHog. Agents work in isolated sandboxes, and you
                can read the full log of everything they did before you merge a thing.
            </p>
        ),
    },
]

export default function SelfDrivingPage({
    data,
}: {
    data?: { allSelfDrivingPullRequest?: { nodes: SelfDrivingPR[] } }
}): JSX.Element {
    const { siteSettings } = useAppSettings()

    const selfDrivingPRs = data?.allSelfDrivingPullRequest?.nodes ?? []
    const humanRoleCardBackground = getWindowSurfaceBg(siteSettings.heaterMode)
    return (
        <>
            <SEO
                title="Self-driving mode from PostHog"
                description="PostHog watches your product, finds what's worth fixing, writes the code, and opens the pull request. You review and merge. A product that develops itself – now in open beta."
                image="/images/og/default.png"
            />
            <ReaderView
                leftSidebar={<LeftSidebarContent />}
                title="self-driving.md"
                hideTitle
                className="overflow-x-hidden"
            >
                <div className="relative z-10">
                    <div className="not-prose mb-8 pt-2 @lg/reader-content:pt-6 @3xl:mb-12">
                        <section className="relative mx-auto max-w-5xl overflow-hidden rounded-md border border-primary bg-primary shadow-2xl">
                            <div className="relative z-20 p-5 pb-6 @md/reader-content:p-7 @xl/reader-content:p-10">
                                <h1 className="m-0 mb-5 text-3xl !leading-[1.2] @md/reader-content:text-4xl @3xl/reader-content:text-5xl">
                                    Shift your product into <Highlight>self-driving</Highlight> mode
                                </h1>
                                <p className="m-0 text-[15px] text-secondary @xl/reader-content:text-[17px]">
                                    <strong className="text-primary">
                                        You have a new pull request ready for review.
                                    </strong>{' '}
                                    <em>(Yep, really.)</em>
                                </p>
                                <p className="mb-0 mt-6 max-w-3xl text-[15px] text-secondary @xl/reader-content:text-[17px]">
                                    While you slept, PostHog dug through your product data, found what was worth fixing,
                                    and had agents do the work. <Highlight>All you need to do is hit merge.</Highlight>
                                </p>
                                <p className="mb-0 mt-6 text-sm text-secondary">
                                    <span className="inline-block">Unlimited reports.</span>{' '}
                                    <span className="inline-block">Priced by pull request.</span>{' '}
                                    <span className="inline-block">3 free each month.</span>
                                </p>
                                <div className="mt-6 flex flex-col items-start gap-3 @sm/reader-content:flex-row @sm/reader-content:items-center">
                                    <CallToAction to="/docs/self-driving/inbox" state={{ newWindow: true }} size="md">
                                        Learn about inbox
                                    </CallToAction>
                                    <span className="whitespace-nowrap text-[13px] text-secondary">
                                        New to PostHog?{' '}
                                        <Link to="https://app.posthog.com/signup" external>
                                            Sign up
                                        </Link>
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 mx-4 h-64 overflow-hidden rounded-t border border-b-0 border-primary bg-accent @sm/reader-content:h-72 @md/reader-content:mx-7 @xl/reader-content:mx-10 @xl/reader-content:h-80">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_light_9aa9eed335.png"
                                    alt="The Inbox surfacing reports and pull requests across PostHog Code and the cloud"
                                    className="dark:hidden w-full"
                                    imgClassName="block w-full"
                                />
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_dark_216a157762.png"
                                    alt="The Inbox surfacing reports and pull requests across PostHog Code and the cloud"
                                    className="hidden dark:block w-full"
                                    imgClassName="block w-full"
                                />
                            </div>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/self_driving_with_road_3ff29b8dc3.png"
                                alt=""
                                aria-hidden
                                imgClassName="pointer-events-none absolute inset-x-0 bottom-0 z-30 block w-full max-w-none"
                            />
                        </section>
                    </div>

                    <div className="max-w-4xl @7xl:max-w-7xl mx-auto">
                        {/* How a product develops itself */}
                        <p id="how" className={sectionHeadingClassName}>
                            How a product <FlowingGradientHighlight>improves itself</FlowingGradientHighlight>
                        </p>
                        <div className="not-prose my-6">
                            <TabbedCarousel tabs={loopTabs} />
                        </div>

                        {/* …then it loops */}
                        <div
                            data-scheme="secondary"
                            className="not-prose my-8 grid grid-cols-1 items-center gap-5 rounded-md border border-primary bg-primary p-4 @md/reader-content:p-6 @2xl/reader-content:grid-cols-[minmax(0,1fr)_minmax(12rem,17rem)] @2xl/reader-content:gap-8"
                        >
                            <div className="col-start-1 row-start-2 @2xl/reader-content:row-start-1">
                                <h3 className="m-0 mb-3 text-2xl font-bold text-primary @md/reader-content:text-3xl">
                                    …then it{' '}
                                    <span className="rounded-sm bg-purple/10 px-0.5 text-purple dark:bg-purple/20">
                                        loops
                                    </span>
                                </h3>
                                <p className="m-0 text-sm text-secondary">
                                    Every change ships with the instrumentation to measure it – the agent adds the
                                    events, feature flags, and experiments as it goes. After it merges, PostHog checks
                                    whether the metric actually moved. If it didn't, that's a new signal (and the change
                                    can be rolled back).
                                </p>
                            </div>
                            <div className="col-start-1 row-start-1 flex justify-center @2xl/reader-content:col-start-2 @2xl/reader-content:justify-end">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_144036_1_9ce78ec4c5.svg"
                                    alt="A hedgehog illustrating the self-improving product loop"
                                    imgClassName="block w-full max-w-[230px] @2xl/reader-content:max-w-[270px]"
                                />
                            </div>
                            <div
                                className="col-start-1 row-start-3 w-full pt-2 @2xl/reader-content:row-start-2 @2xl/reader-content:pt-0"
                                style={{ gridColumn: '1 / -1' }}
                            >
                                <Link
                                    to="/docs/self-driving/self-improving-loop"
                                    state={{ newWindow: true }}
                                    className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-semibold"
                                >
                                    {['Signal', 'Research', 'Report', 'PR', 'Ship', 'Measure'].map((step, i) => (
                                        <React.Fragment key={step}>
                                            {i > 0 && <IconArrowRight className="size-4 shrink-0 text-secondary" />}
                                            <span className="text-primary">{step}</span>
                                        </React.Fragment>
                                    ))}
                                    <IconArrowRight className="size-4 shrink-0 text-secondary" />
                                    <span className="text-red underline dark:text-yellow">The self-improving loop</span>
                                </Link>
                            </div>
                        </div>

                        {/* PostHog agents run on their own, but don't run wild */}
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/transformer_hedgehog_2a379334d7.png"
                            alt="A hedgehog transforming into a self-driving machine"
                            className="@lg/reader-content:float-right @lg/reader-content:max-w-[220px] @lg/reader-content:ml-6 mb-4 mt-2"
                            imgClassName="w-full"
                        />
                        <h3 className={sectionHeadingClassName}>
                            PostHog agents run on their own, but <Highlight>don't run wild</Highlight>
                        </h3>
                        <p>
                            Self-driving is autonomy from instruction, not from you. Agents work in the background
                            without you prompting them to make progress, but nothing ships on autopilot.
                        </p>
                        <IconList
                            items={[
                                {
                                    Icon: IconShieldLock,
                                    color: 'text-purple',
                                    text: (
                                        <>
                                            <strong className="text-primary">It's stuck in a sandbox.</strong> Work
                                            happens in the cloud, nowhere near your repo. Agents follow your branch
                                            protections, CI, and review rules.
                                        </>
                                    ),
                                },
                                {
                                    Icon: IconPullRequest,
                                    color: 'text-red dark:text-yellow',
                                    text: (
                                        <>
                                            <strong className="text-primary">The work can't merge itself.</strong>{' '}
                                            Nothing reaches production until a human clicks merge. Robots don't touch
                                            the big green button.
                                        </>
                                    ),
                                },
                                {
                                    Icon: IconStack,
                                    color: 'text-blue',
                                    text: (
                                        <>
                                            <strong className="text-primary">PRs {'>'} Issues.</strong> Raw signals are
                                            deduped and clustered into reports. Actionable ones become PRs. You only pay
                                            for real work completed.
                                        </>
                                    ),
                                },
                                {
                                    Icon: IconLock,
                                    color: 'text-green',
                                    text: (
                                        <>
                                            <strong className="text-primary">Your secrets are safe.</strong> Literally,
                                            and so is your code. Private repos stay private, and so does your data.
                                            (We're training AI models, but{' '}
                                            <Link to="/blog/training-ai-models" state={{ newWindow: true }}>
                                                not on your code
                                            </Link>
                                            .)
                                        </>
                                    ),
                                },
                            ]}
                        />
                        <div className="clear-both" />

                        {/* Live ticker: real self-driving PRs merged into PostHog's own repo */}
                        {selfDrivingPRs.length > 0 && (
                            <div className="not-prose my-8 overflow-hidden rounded-md border border-primary bg-accent p-4 @md/reader-content:p-6">
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        {/* Pulsing "live" indicator */}
                                        <span className="relative flex size-2 shrink-0">
                                            <span className="absolute inline-flex size-full animate-pulse rounded-full bg-green opacity-75" />
                                            <span className="relative inline-flex size-2 rounded-full bg-green" />
                                        </span>
                                        <p className="m-0 font-mono text-[11px] font-bold uppercase tracking-wider text-secondary">
                                            Merged into PostHog by self-driving
                                        </p>
                                    </div>
                                    <Link
                                        to="https://github.com/PostHog/posthog/pulls?q=is%3Apr+is%3Amerged+%22from+an+inbox+report%22"
                                        external
                                        externalNoIcon
                                        className="whitespace-nowrap text-xs font-semibold text-red dark:text-yellow"
                                    >
                                        See them all →
                                    </Link>
                                </div>
                                <SelfDrivingTicker prs={selfDrivingPRs} />
                            </div>
                        )}

                        {/* It runs on the data you already have */}
                        <h3 className={sectionHeadingClassName}>
                            It runs on the data you <ColoredHighlight color="blue">already have</ColoredHighlight>
                        </h3>
                        <p>
                            Your product is a context goldmine. Self-driving puts that data to work. The more sources
                            PostHog can see, the sharper the fixes get.
                        </p>
                        <div className="not-prose mt-6 mb-12 flex justify-center">
                            <SignalsCallout className="max-w-md" />
                        </div>

                        {/* Works in your workflow */}
                        <h3 className={sectionHeadingClassName}>
                            Works in <ColoredHighlight color="purple">your workflow</ColoredHighlight>
                        </h3>
                        <p className="mb-0">
                            <span className="block">The same Inbox and agents show up across five surfaces</span>
                            <em className="mt-1 block">(everywhere you go, there's PostHog).</em>
                        </p>
                        <div className="not-prose mt-8 mb-12 grid gap-4 @md/reader-content:grid-cols-2">
                            {workSurfaces.map(({ Icon, iconColor, label, copy, cta }, index) => (
                                <div
                                    key={index}
                                    className="flex min-h-full flex-col rounded-md border border-primary bg-primary p-5 shadow-sm @lg/reader-content:p-6"
                                >
                                    <p className="m-0 flex items-center gap-2 text-lg font-bold text-primary">
                                        <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                        {label}
                                    </p>
                                    <p className="m-0 mt-3 text-sm text-secondary">{copy}</p>
                                    {cta && <div className="mt-auto flex justify-start pt-5">{cta}</div>}
                                </div>
                            ))}
                        </div>

                        {/* Steer it from Slack */}
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/Inbox_in_slack_229d1d3693.png"
                            alt="Steering a self-driving report from a Slack thread"
                            className="w-full !block m-0"
                            imgClassName="w-full !block"
                        />

                        <h3 className={sectionHeadingClassName}>
                            Build in public (with <Highlight>the whole team</Highlight>)
                        </h3>
                        <p>
                            Self-driving isn't only autonomous. Some fixes are better hashed out by three people in a
                            thread.
                        </p>
                        <div className="not-prose grid @md/reader-content:grid-cols-2 gap-4 my-6">
                            <div className="border border-primary rounded-md p-4 bg-primary">
                                <div className="flex items-center gap-2 mb-2">
                                    <IconPeople className="size-5 shrink-0 text-purple" />
                                    <span className="font-bold text-primary">Solve it together</span>
                                </div>
                                <p className="m-0 text-sm text-secondary">
                                    Work through a report or PR with collaborators in Slack. Add context, steer the
                                    agent, and decide what ships.
                                </p>
                            </div>
                            <div className="border border-primary rounded-md p-4 bg-primary">
                                <div className="flex items-center gap-2 mb-2">
                                    <IconTarget className="size-5 shrink-0 text-red" />
                                    <span className="font-bold text-primary">Sorted by priority</span>
                                </div>
                                <p className="m-0 text-sm text-secondary">
                                    Each report arrives tagged P0–P4 by impact, so the channel sees what needs attention
                                    now and what can wait.
                                </p>
                            </div>
                        </div>
                        <SlackReportsRow />
                        <p className={sectionHeadingClassName}>
                            <FlowingGradientHighlight palette="chill">Suspiciously chill</FlowingGradientHighlight> for
                            how much it's doing
                        </p>

                        {/* You prompt it → it works on its own */}
                        <div className="not-prose my-6">
                            <div className="mb-4 grid grid-cols-[auto_minmax(1rem,1fr)_auto] items-center gap-2 text-xs font-semibold @sm/reader-content:gap-3 @sm/reader-content:text-sm">
                                <span className="whitespace-nowrap text-red-2">Building with AI</span>
                                <svg
                                    className="h-2.5 w-full"
                                    viewBox="0 0 632 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                    aria-hidden
                                >
                                    <path
                                        d="M0.75 4.91612H630.637M625.224 9.11279L630.637 4.91612L625.224 0.750034"
                                        stroke="url(#self-driving-building-arrow-grad)"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="self-driving-building-arrow-grad"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="0%"
                                        >
                                            <stop stopColor="#FF5C1C" />
                                            <stop offset="0.504808" stopColor="#A737D2" />
                                            <stop offset="1" stopColor="#007CF2" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span className="whitespace-nowrap text-blue-2">
                                    Building <em className="italic underline underline-offset-2">with</em> AI
                                </span>
                            </div>
                            <div className="grid gap-3 @md/reader-content:grid-cols-3">
                                {workModes.map((mode) => (
                                    <div
                                        key={mode.title}
                                        className="flex flex-col rounded-md border border-primary bg-primary p-4"
                                    >
                                        <span
                                            className={`inline-block self-start rounded-full px-2 py-0.5 text-xs font-bold ${mode.tagClass}`}
                                        >
                                            {mode.tag}
                                        </span>
                                        <p className="m-0 mt-2 text-base font-bold">{mode.title}</p>
                                        <p className="m-0 mt-1 text-sm text-secondary">{mode.copy}</p>
                                        <p className="m-0 mt-3 border-t border-primary pt-3 text-sm text-secondary">
                                            <strong className="text-primary">{mode.guard.label}</strong> –{' '}
                                            {mode.guard.copy}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* So, what's left for you? */}
                        <h3 className={sectionHeadingClassName}>
                            So, what's <Highlight>left for you?</Highlight>
                        </h3>
                        <p className="max-w-xl">
                            Work lands while you sleep. You wake up to diffs and reports waiting for review.{' '}
                            <em>Then what?</em>
                        </p>
                        <div className="not-prose grid grid-cols-1 @md/reader-content:grid-cols-3 gap-3 my-6">
                            {humanRoles.map(({ heading, copy, image, alt }) => (
                                <div
                                    key={heading}
                                    className={`flex flex-col overflow-hidden rounded-md border border-primary ${humanRoleCardBackground}`}
                                >
                                    <div className="p-4">
                                        <p className="m-0 text-base font-bold text-primary">{heading}</p>
                                        <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                    </div>
                                    <div className="mt-auto px-6 @md/reader-content:px-8">
                                        <CloudinaryImage
                                            src={image}
                                            alt={alt}
                                            className="w-full !block"
                                            imgClassName="w-full !block"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="not-prose relative overflow-hidden bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6">
                            <div className="grid @lg/reader-content:grid-cols-[1fr_170px] gap-6 items-end">
                                <div>
                                    <h3 className="mt-0 mb-3 inline-flex items-center gap-2 text-2xl font-bold">
                                        Set up your Inbox
                                        <Badge>Beta</Badge>
                                    </h3>
                                    <p className="mt-0 mb-4 text-secondary">
                                        Install PostHog, then run the wizard – it turns on your signal sources, connects
                                        GitHub, and sets up your scouts. Your first reports start landing in ~20–30
                                        minutes.
                                    </p>
                                    <WizardCommand command="self-driving" />
                                    <p className="mt-4 mb-0 text-sm text-secondary">
                                        New to all this? Read the{' '}
                                        <Link
                                            to="/docs/self-driving"
                                            state={{ newWindow: true }}
                                            className="text-red dark:text-yellow font-semibold underline"
                                        >
                                            self-driving docs
                                        </Link>
                                        .
                                    </p>
                                </div>
                                <div className="hidden @lg/reader-content:block self-end -mb-4 @md/reader-content:-mb-6">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_hanging_from_sign_83184d5f0a.png"
                                        alt="A hog clinging to a signpost"
                                        className="w-full !block"
                                        imgClassName="w-full !block"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <h3>FAQ</h3>
                        <div className="not-prose mt-4">
                            <Accordion
                                type="multiple"
                                triggerClassName="!px-3 !py-2"
                                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                                items={faqItems}
                            />
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query SelfDrivingPage {
        allSelfDrivingPullRequest(
            filter: { state: { eq: "merged" } }
            sort: { fields: mergedAt, order: DESC }
            limit: 24
        ) {
            nodes {
                prNumber
                summary
                type
                scope
                url
                mergedAt
            }
        }
    }
`
