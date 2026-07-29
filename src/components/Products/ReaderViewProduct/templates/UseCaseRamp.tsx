import React from 'react'
import { Tabs } from 'radix-ui'
import * as icons from '@posthog/icons'
import {
    IconAtSign,
    IconBolt,
    IconCoffee,
    IconNotification,
    IconPlug,
    IconSparkles,
    IconTerminal,
} from '@posthog/icons'
import Link from 'components/Link'
import { SectionComponentProps } from '../types'

interface Surface {
    name: string
    to: string
    Icon: React.ComponentType<{ className?: string }>
    /** `text-*` class for the icon. */
    color: string
    /** `bg-*` class for the active tab's underline. */
    accent: string
}

/**
 * The products (surfaces) a column happens in. Icons, colors and links mirror
 * the global Products nav in `components/TaskBarMenu/menuData.tsx` so a product
 * reads the same here as it does in the nav. PostHog Web and MCP have no
 * productData entry and the inbox has no slug, so these are declared here
 * rather than resolved from `allProducts`.
 */
const surfaces: Record<string, Surface> = {
    web: { name: 'PostHog Web', to: '/products', Icon: IconBolt, color: 'text-red', accent: 'bg-red' },
    ai: { name: 'PostHog AI', to: '/ai', Icon: IconSparkles, color: 'text-blue', accent: 'bg-blue' },
    mcp: { name: 'PostHog MCP', to: '/mcp', Icon: IconPlug, color: 'text-gray', accent: 'bg-gray' },
    inbox: {
        name: 'Inbox',
        to: '/docs/self-driving/inbox',
        Icon: IconNotification,
        color: 'text-blue',
        accent: 'bg-blue',
    },
    slack: { name: 'PostHog Slack', to: '/slack', Icon: IconAtSign, color: 'text-sky-blue', accent: 'bg-sky-blue' },
    cli: { name: 'PostHog CLI', to: '/docs/cli', Icon: IconTerminal, color: 'text-green', accent: 'bg-green' },
    desktop: { name: 'PostHog Desktop', to: '/desktop', Icon: IconCoffee, color: 'text-brown', accent: 'bg-brown' },
}

interface RampUseCase {
    title: string
    /**
     * An `@posthog/icons` export name, e.g. `'IconFunnels'`. Resolved at render
     * time the same way `components/MainNav` does it, so the data stays free of
     * JSX and per-hook icon imports. An unknown name renders no icon.
     */
    icon?: string
    /**
     * Keys into `surfaces`. Names which product(s) this use case happens in, so a
     * reader can tell PostHog AI from Slack from an editor agent. Usually one, but
     * some actions are identical from more than one entry point – e.g. asking a
     * question in plain English works the same from PostHog AI or an MCP client.
     */
    surfaces?: string[]
    steps: string[]
}

const UseCaseIcon = ({ name, color }: { name?: string; color?: string }): JSX.Element | null => {
    const Icon = name
        ? (icons as Record<string, React.ComponentType<{ className?: string }> | undefined>)[name]
        : undefined
    if (!Icon) return null

    return <Icon className={`size-4 shrink-0 ${color ? `text-${color}` : 'text-secondary'}`} />
}

/**
 * One level of the ramp. Levels are tabs rather than numbered steps – plenty of
 * teams skip one, and an agent-first team may well start at the self-driving end
 * and pick up the hands-on work later.
 */
interface RampColumn {
    /** Action-oriented label: what you're doing at this level of autonomy. */
    level: string
    /**
     * Keys into `surfaces`: the products this level covers. The first one supplies
     * the tab's icon and underline colour. Which product each individual use case
     * happens in is tagged per use case, not from here.
     */
    surfaces?: string[]
    /** Overrides the badge inherited from `levelMode`. */
    mode?: string
    /**
     * Who's driving and what kind of work you'd be doing at this level, in this
     * tool's terms. Tool-specific by design – there's no generic fallback, because
     * a shared sentence ends up describing the wrong tool's work.
     */
    driver?: string
    useCases: RampUseCase[]
}

interface UseCaseRampData {
    columns?: RampColumn[]
}

/**
 * How autonomous each level is, keyed by `level`. Only the badge lives here –
 * it's the one thing that's identical on every tool page. The who's-driving
 * sentence is per-tool `driver` data, because it describes the work you'd be
 * doing, which differs by tool.
 */
const levelMode: Record<string, string> = {
    'Do it yourself': 'Hands-on',
    'Ask an agent': 'Agent-assisted',
    'Ship with PostHog': 'Autonomous',
}

const slugify = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const resolveSurfaces = (keys?: string[]): Surface[] => (keys ?? []).map((key) => surfaces[key]).filter(Boolean)

/**
 * Which product(s) a use case happens in, tagged at the bottom of its card. Every
 * use case carries at least one, so the who's-driving sentence above doesn't have
 * to list them all.
 */
const SurfaceTags = ({ keys }: { keys?: string[] }): JSX.Element | null => {
    const resolved = resolveSurfaces(keys)
    if (!resolved.length) return null

    // `bg-light` against the card's `bg-accent` is what stops the tag disappearing.
    // `mt-auto` sits it on the card's bottom edge regardless of how many steps
    // come before it, so tags line up across a row of cards.
    return (
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
            {resolved.map((surface) => (
                <Link
                    key={surface.name}
                    to={surface.to}
                    state={{ newWindow: true }}
                    className="group/tag inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-primary bg-light px-1.5 py-0.5 text-[12px] font-bold text-primary hover:border-secondary dark:bg-dark"
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

    if (!columns.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-2">Ramp to self-driving</h2>
            <p className="m-0 mb-4 text-[15px] text-secondary">
                Three ways to use {productData?.name}, from hands-on to hands-off the wheel.
            </p>
            <Tabs.Root defaultValue={slugify(columns[0].level)}>
                <Tabs.List
                    className="flex flex-wrap @md/reader-content:flex-nowrap"
                    aria-label={`Ways to use ${productData?.name}`}
                >
                    {columns.map((column) => {
                        const primary = resolveSurfaces(column.surfaces)[0]
                        return (
                            <Tabs.Trigger
                                key={column.level}
                                value={slugify(column.level)}
                                className="group relative flex min-w-[calc(50%-0.25rem)] flex-1 cursor-pointer select-none flex-col items-center gap-1 rounded-t-md px-3 py-2.5 text-sm font-semibold text-secondary transition-colors hover:text-primary data-[state=active]:bg-light data-[state=active]:text-primary @md/reader-content:min-w-0 dark:data-[state=active]:bg-dark"
                            >
                                {primary?.Icon && <primary.Icon className={`size-5 shrink-0 ${primary.color}`} />}
                                <span className="text-balance text-center">{column.level}</span>
                                <span
                                    aria-hidden="true"
                                    className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full opacity-0 group-data-[state=active]:opacity-100 ${
                                        primary?.accent ?? 'bg-blue'
                                    }`}
                                />
                            </Tabs.Trigger>
                        )
                    })}
                </Tabs.List>
                {columns.map((column) => (
                    <Tabs.Content
                        key={column.level}
                        value={slugify(column.level)}
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
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <h3 className="m-0 text-xl font-bold text-primary @md/reader-content:text-2xl">
                                        {column.level}
                                    </h3>
                                    {(column.mode ?? levelMode[column.level]) && (
                                        <span className="rounded-sm bg-highlight px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-red dark:text-yellow">
                                            {column.mode ?? levelMode[column.level]}
                                        </span>
                                    )}
                                </div>
                                {column.driver && (
                                    <p className="m-0 text-[15px] leading-relaxed text-secondary">{column.driver}</p>
                                )}
                                {/*
                                 * Only on this level, and only text – not a link. This section now sits directly
                                 * above "AI prompts", which already has the full, clickable, tool-grouped prompt
                                 * catalog. Say so instead of re-listing a smaller version of the same prompts.
                                 */}
                                {column.level === 'Ask an agent' && (
                                    <p className="m-0 text-[13px] text-secondary">
                                        For the full list of things you can ask, see AI prompts just below.
                                    </p>
                                )}
                            </div>
                            <ul className="m-0 grid list-none gap-3 p-0 @md/reader-content:grid-cols-2">
                                {column.useCases.map((useCase) => (
                                    <li
                                        key={useCase.title}
                                        className="flex h-full flex-col rounded-md border border-primary bg-accent p-3 @md/reader-content:p-4"
                                    >
                                        <p className="m-0 mb-1 flex items-center gap-1.5 text-sm font-bold text-primary">
                                            <UseCaseIcon name={useCase.icon} color={productData?.color} />
                                            {useCase.title}
                                        </p>
                                        {/*
                                         * `list-decimal` sits on the li, not the ol: the `not-prose` layer sets
                                         * `list-style-type: none` directly on `.not-prose ol li`, which beats a
                                         * value inherited from the ol.
                                         */}
                                        <ol className="m-0 pl-5 text-[13px] leading-snug text-secondary">
                                            {useCase.steps.map((step) => (
                                                <li key={step} className="mt-1 list-decimal">
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>
                                        <SurfaceTags keys={useCase.surfaces} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </section>
    )
}

export default UseCaseRamp
