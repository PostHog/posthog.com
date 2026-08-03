import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

import { IconCheckCircle, IconCompass, IconGraph, IconPullRequest } from '@posthog/icons'

import CustomSelfDrivingLoop from 'components/CustomSelfDrivingLoop'
import Explorer from 'components/Explorer'
import { Accordion } from 'components/RadixUI/Accordion'

import SelfDrivingInbox, { TOOL_PARAM, toolsInUse, useSelfDrivingTemplates } from './index'
import { InboxFilter } from './types'
import { productSource } from './sources'

/** The loop, explained once in shared chrome. Wording from /docs/self-driving/self-improving-loop. */
const LOOP_STAGES = [
    { label: 'Signal', icon: IconCompass, color: '#FFA81C', description: 'Something worth knowing, with its evidence' },
    { label: 'Report', icon: IconGraph, color: '#F54E00', description: 'Related signals grouped into one problem' },
    {
        label: 'Pull request',
        icon: IconPullRequest,
        color: '#A737D2',
        description: 'An agent writes the fix; you review and merge',
    },
    { label: 'Measured', icon: IconCheckCircle, color: '#47C861', description: 'PostHog checks whether it worked' },
]

interface SelfDrivingInboxPageProps {
    /** Pre-select a template, so a per-template URL opens straight to it. */
    initialSlug?: string
}

/**
 * The mailbox list: how the surface holds a couple dozen templates without a redesign.
 * One row per tool, matching templates that are about it or that read it.
 */
function ToolRail({ active, onSelect }: { active: InboxFilter; onSelect: (product: InboxFilter) => void }) {
    const templates = useSelfDrivingTemplates()
    const tools = toolsInUse(templates)

    const rowClasses = (selected: boolean) =>
        `flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm no-underline ${
            selected ? 'bg-accent font-bold text-primary dark:bg-accent-dark' : 'text-secondary hover:bg-accent/60'
        }`

    const row = (name: InboxFilter, label: string, count: number) => {
        // Same color as the list's group header, so a row and the section it points at match.
        const { token } = productSource(name ?? '')
        return (
            <li key={label}>
                <Link
                    to={
                        name
                            ? `/templates/self-driving?${TOOL_PARAM}=${encodeURIComponent(name)}`
                            : '/templates/self-driving'
                    }
                    className={rowClasses(active === name)}
                    onClick={(event: React.MouseEvent) => {
                        if (event.metaKey || event.ctrlKey || event.shiftKey) {
                            return
                        }
                        event.preventDefault()
                        onSelect(name)
                    }}
                >
                    <span
                        aria-hidden="true"
                        className={`h-4 w-1 shrink-0 rounded-full ${name ? `bg-${token}` : 'bg-transparent'}`}
                    />
                    <span className="flex-1">{label}</span>
                    <span className="text-xs tabular-nums opacity-60">{count}</span>
                </Link>
            </li>
        )
    }

    return (
        <nav aria-label="Filter templates by tool">
            <p className="mb-1.5 px-2 text-xs font-bold uppercase tracking-wide text-secondary">Tools</p>
            <ul className="m-0 list-none space-y-0.5 p-0">
                {row(null, 'All templates', templates.length)}
                {tools.map(({ name, count }) => row(name, name, count))}
            </ul>
        </nav>
    )
}

/** Explorer chrome around the inbox. Every self-driving route renders this same screen. */
export default function SelfDrivingInboxPage({ initialSlug }: SelfDrivingInboxPageProps): JSX.Element {
    const location = useLocation()

    // State, not the URL: the window shell keeps its tree mounted across route changes, so a
    // URL-driven filter silently did nothing. Read once on mount so shared links still work.
    const [activeFilter, setActiveFilter] = useState<InboxFilter>(() =>
        new URLSearchParams(location.search).get(TOOL_PARAM)
    )

    return (
        <Explorer
            template="generic"
            slug="templates/self-driving"
            title="What self-driving watches for"
            // No address bar: its category select only knows top-level site destinations
            // (products, pricing, docs…). There is no "templates" value, so it renders
            // permanently empty, and a whole-site jump list is noise inside a focused surface.
            showAddressBar={false}
            // Back/forward only. Explorer's default header also renders a search button, which
            // (a) isn't wired to this list so it searches nothing useful, and (b) overlaps the
            // window's own controls in the top-right corner.
            headerBarOptions={['showBack', 'showForward']}
            // fullScreen hands us the raw main element: no ambient ScrollArea and no prose
            // wrapper (which would underline every row). Each pane owns its scroll and padding,
            // per the house pattern in src/pages/art-library.tsx.
            fullScreen
            leftSidebarContent={
                <div className="space-y-4">
                    {/* `not-prose` only on the rail: Explorer's sidebar is `prose`, which would
                        underline every row. The accordions below keep it, so their links look
                        like links. Explorer also stacks the sidebar under @3xl, where the rail
                        would sit after everything it filters – the list's select takes over. */}
                    <div className="not-prose hidden @3xl:block">
                        <ToolRail active={activeFilter} onSelect={setActiveFilter} />
                    </div>
                    {/* Below the rail: onboarding is read once, navigation is used every visit. */}
                    <Accordion
                        data-scheme="primary"
                        className=""
                        defaultValue="item-0"
                        items={[
                            {
                                trigger: <span className="flex-1">How to use these templates</span>,
                                content: (
                                    <div className="space-y-2 text-sm">
                                        <p className="mb-0">
                                            Each template is an example of a report a scout would file for you. They're
                                            designed to look and feel like the reports that land in your inbox once
                                            self-driving is running.
                                        </p>
                                        <p className="mb-0">
                                            Open one to see the use case it covers, how scouts spot a real problem from
                                            noise, and add it to your scout troop in a click.
                                        </p>
                                        <p className="mb-0">
                                            <Link to="/templates" state={{ newWindow: true }}>
                                                All templates
                                            </Link>
                                        </p>
                                    </div>
                                ),
                            },
                            {
                                trigger: <span className="flex-1">How self-driving works</span>,
                                content: (
                                    <div className="space-y-3 text-sm">
                                        {/* Frames the diagram without restating it – the stages carry
                                        their own labels and descriptions. */}
                                        <p className="mb-0">
                                            Self-driving runs as a loop. Every scout you enable feeds the same four
                                            stages, and the last one starts completes the loop.
                                        </p>
                                        <CustomSelfDrivingLoop stages={LOOP_STAGES} loop />
                                        <p className="mb-0">
                                            <Link to="/docs/self-driving" state={{ newWindow: true }}>
                                                What is self-driving?
                                            </Link>{' '}
                                            ·{' '}
                                            <Link
                                                to="/docs/self-driving/self-improving-loop"
                                                state={{ newWindow: true }}
                                            >
                                                The loop
                                            </Link>
                                        </p>
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
            }
        >
            <SelfDrivingInbox initialSlug={initialSlug} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </Explorer>
    )
}
