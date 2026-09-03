import React from 'react'
import { Tabs } from 'radix-ui'
import slugify from 'slugify'
import * as icons from '@posthog/icons'
import {
    IconArrowRight,
    IconAtSign,
    IconBolt,
    IconCoffee,
    IconCursorClick,
    IconNotification,
    IconPlug,
    IconRocket,
    IconSparkles,
    IconTerminal,
} from '@posthog/icons'
import Glow from 'components/Glow'
import Link from 'components/Link'
import LetPostHogScroller from 'components/LetPostHogScroller'
import { SectionComponentProps } from '../types'

interface Surface {
    name: string
    to: string
    Icon: React.ComponentType<{ className?: string }>
    color: string
}

/**
 * Mirrors icon/color/link from the global Products nav (`components/TaskBarMenu/menuData.tsx`).
 * PostHog Web and MCP have no productData entry, and the inbox has no slug, so
 * these are declared here rather than resolved from `allProducts`.
 */
const surfaces: Record<string, Surface> = {
    web: { name: 'PostHog Web', to: '/products', Icon: IconBolt, color: 'text-red' },
    ai: { name: 'PostHog AI', to: '/ai', Icon: IconSparkles, color: 'text-blue' },
    mcp: { name: 'PostHog MCP', to: '/mcp', Icon: IconPlug, color: 'text-gray' },
    inbox: { name: 'Inbox', to: '/docs/self-driving/inbox', Icon: IconNotification, color: 'text-blue' },
    slack: { name: 'PostHog Slack', to: '/slack', Icon: IconAtSign, color: 'text-sky-blue' },
    cli: { name: 'PostHog CLI', to: '/docs/cli', Icon: IconTerminal, color: 'text-green' },
    desktop: { name: 'PostHog Desktop', to: '/desktop', Icon: IconCoffee, color: 'text-brown dark:text-brown-dark' },
}

/**
 * Badge and tab styling per level. The tab colors ramp blue → purple → red to
 * read as escalating autonomy, independent of the column's surface colors.
 */
const levels: Record<string, { mode: string; Icon: React.ComponentType<{ className?: string }>; color: string }> = {
    'Do it yourself': { mode: 'Hands-on', Icon: IconCursorClick, color: 'blue' },
    'Ask an agent': { mode: 'Agent-assisted', Icon: IconSparkles, color: 'purple' },
    'Ship with PostHog': { mode: 'Self-driving', Icon: IconRocket, color: 'red' },
}

/** One level's version of the scenario named in `UseCaseRampData.scenario`. */
interface RampScenario {
    /**
     * An `@posthog/icons` export name, e.g. `'IconFunnels'`, resolved at render
     * time so the data stays free of JSX. An unknown name renders no icon.
     */
    icon?: string
    steps: React.ReactNode[]
}

/** What the level means for the ramp. Prose – the steps belong to `RampScenario`. */
interface RampPoint {
    title: string
    /** An `@posthog/icons` export name, resolved like `RampScenario.icon`. */
    icon?: string
    /** Accepts JSX so a point can link an unfamiliar term to its docs page. */
    body: React.ReactNode
}

interface RampColumn {
    level: string
    /** Keys into `surfaces`. */
    surfaces?: string[]
    scenario?: RampScenario
    /** Usually two cards. The final one doubles as a clickable pivot into the next tab. */
    points?: RampPoint[]
}

interface UseCaseRampData {
    intro?: string
    /** The one incident traced through every level, rendered on each column's scenario card. */
    scenario?: string
    columns?: RampColumn[]
}

const toTabValue = (value: string): string => slugify(value, { lower: true, strict: true })

const UseCaseIcon = ({ name, color }: { name?: string; color?: string }): JSX.Element | null => {
    const Icon = name
        ? (icons as Record<string, React.ComponentType<{ className?: string }> | undefined>)[name]
        : undefined
    if (!Icon) return null

    return <Icon className={`size-4 shrink-0 ${color ? `text-${color}` : 'text-secondary'}`} />
}

const SurfaceTags = ({ keys }: { keys?: string[] }): JSX.Element | null => {
    const resolved = (keys ?? []).map((key) => surfaces[key]).filter(Boolean)
    if (!resolved.length) return null

    return (
        <div className="flex shrink-0 items-center gap-1.5">
            {resolved.map((surface) => (
                <Link
                    key={surface.name}
                    to={surface.to}
                    state={{ newWindow: true }}
                    className="group/tag inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-primary bg-light px-1.5 py-0.5 text-xs font-bold text-primary hover:border-secondary dark:bg-dark"
                >
                    <surface.Icon className={`size-3.5 shrink-0 ${surface.color}`} />
                    <span className="group-hover/tag:underline">{surface.name}</span>
                </Link>
            ))}
        </div>
    )
}

const UseCaseRamp = ({ id, productData }: SectionComponentProps): JSX.Element | null => {
    const ramp: UseCaseRampData | undefined = productData?.useCaseRamp
    const columns = ramp?.columns ?? []

    // Opens on "Ask an agent" rather than the first tab: it's the middle rung, and the
    // one most likely to make someone curious enough to also check the other two.
    const defaultColumn = columns.find((column) => column.level === 'Ask an agent') ?? columns[0]
    // Controlled (rather than `defaultValue`) so the pivot cards can jump the reader
    // forward a level with a click, instead of only telling them where to go.
    const [activeTab, setActiveTab] = React.useState(defaultColumn ? toTabValue(defaultColumn.level) : '')

    if (!columns.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="m-0 mb-2">
                <LetPostHogScroller className="text-2xl font-bold tracking-tight text-primary @xl:text-3xl" />
            </h2>
            <p className="m-0 mb-4 text-[15px] text-secondary">
                {ramp?.intro ??
                    `${productData?.name} works at three levels. Do it yourself, ask an agent to do it for you, or let PostHog work proactively with your data.`}
            </p>
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                <Tabs.List
                    className="flex flex-wrap @md/reader-content:flex-nowrap"
                    aria-label={`Ways to use ${productData?.name}`}
                >
                    {columns.map((column) => {
                        const level = levels[column.level]
                        return (
                            <Tabs.Trigger
                                key={column.level}
                                value={toTabValue(column.level)}
                                className="group relative flex min-w-[calc(50%-0.25rem)] flex-1 cursor-pointer select-none flex-col items-center gap-1 rounded-t-md px-3 py-2.5 text-sm font-semibold text-secondary transition-colors hover:text-primary data-[state=active]:bg-light data-[state=active]:text-primary @md/reader-content:min-w-0 dark:data-[state=active]:bg-dark"
                            >
                                {level && <level.Icon className={`size-5 shrink-0 text-${level.color}`} />}
                                <span className="text-balance text-center">{column.level}</span>
                                <span
                                    aria-hidden="true"
                                    className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full opacity-0 group-data-[state=active]:opacity-100 bg-${
                                        level?.color ?? 'blue'
                                    }`}
                                />
                            </Tabs.Trigger>
                        )
                    })}
                </Tabs.List>
                {columns.map((column, index) => {
                    const mode = levels[column.level]?.mode
                    const points = column.points ?? []
                    const nextColumn = columns[index + 1]
                    return (
                        <Tabs.Content
                            key={column.level}
                            value={toTabValue(column.level)}
                            /*
                             * No display utility here. Radix keeps a visited panel mounted as
                             * `<div hidden>` with empty children, and `hidden` only works through the
                             * UA rule `[hidden] { display: none }` – an author `display: flex` would
                             * beat it and leave an empty padded band stacking up above the live panel.
                             * Layout goes on the inner wrapper instead.
                             */
                            className="rounded-b-md rounded-tr-md bg-light p-4 outline-none @md/reader-content:p-6 dark:bg-dark"
                        >
                            <div className="flex flex-col gap-5">
                                <div className="relative z-10 flex flex-col gap-2">
                                    <h3 className="m-0 text-xl font-bold text-primary @md/reader-content:text-2xl">
                                        {column.level}
                                    </h3>
                                    <div className="flex items-center gap-1.5 overflow-x-auto">
                                        {mode && (
                                            <span className="shrink-0 whitespace-nowrap rounded-sm bg-highlight px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-red dark:text-yellow">
                                                {mode} with
                                            </span>
                                        )}
                                        <SurfaceTags keys={column.surfaces} />
                                    </div>
                                </div>
                                {column.scenario && (
                                    // `isolate` gives this box its own stacking context so `glowClassName="-z-10"`
                                    // stays scoped here – without it, the negative z-index escapes to the page
                                    // root and the glow paints behind the entire page instead of just this card.
                                    <Glow
                                        color={productData?.color}
                                        size="sm"
                                        intensity="soft"
                                        rounded="md"
                                        className="w-full isolate"
                                        glowClassName="-z-10"
                                    >
                                        <div className="flex flex-col rounded-md border border-primary bg-accent p-3 @md/reader-content:p-4">
                                            <p className="m-0 mb-1 flex items-center gap-1.5 text-sm font-bold text-primary">
                                                <UseCaseIcon name={column.scenario.icon} color={productData?.color} />
                                                <span className="font-normal text-secondary">Example:</span>{' '}
                                                {ramp?.scenario}
                                            </p>
                                            {/*
                                             * `list-decimal` sits on the li, not the ol: the `not-prose` layer sets
                                             * `list-style-type: none` directly on `.not-prose ol li`, which beats a
                                             * value inherited from the ol.
                                             */}
                                            <ol className="m-0 pl-5 text-[13px] leading-snug text-secondary">
                                                {column.scenario.steps.map((step, stepIndex) => (
                                                    <li key={stepIndex} className="mt-1 list-decimal">
                                                        {step}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </Glow>
                                )}
                                {!!points.length && (
                                    <ul className="relative z-10 m-0 grid list-none gap-3 p-0 @md/reader-content:grid-cols-2">
                                        {points.map((point, pointIndex) => {
                                            // The last point doubles as the pivot into the next tab: only the
                                            // arrow is clickable. It's positioned absolutely, not pushed down
                                            // with `mt-auto`, so it sits in the corner without stretching the
                                            // card past its own content.
                                            const isPivot = pointIndex === points.length - 1 && !!nextColumn
                                            return (
                                                <li
                                                    key={point.title}
                                                    className={`relative flex flex-col rounded-md border border-primary bg-accent p-3 @md/reader-content:p-4 ${
                                                        isPivot ? 'pb-9' : ''
                                                    }`}
                                                >
                                                    <p className="m-0 mb-1 flex items-center gap-1.5 text-sm font-bold text-primary">
                                                        <UseCaseIcon name={point.icon} color={productData?.color} />
                                                        {point.title}
                                                    </p>
                                                    <p className="m-0 text-[13px] leading-snug text-secondary">
                                                        {point.body}
                                                    </p>
                                                    {isPivot && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveTab(toTabValue(nextColumn.level))}
                                                            aria-label={`Go to ${nextColumn.level}`}
                                                            className="group absolute bottom-2 right-2 rounded-full p-1 text-secondary transition-colors hover:text-primary"
                                                        >
                                                            <IconArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                                                        </button>
                                                    )}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>
                        </Tabs.Content>
                    )
                })}
            </Tabs.Root>
        </section>
    )
}

export default UseCaseRamp
