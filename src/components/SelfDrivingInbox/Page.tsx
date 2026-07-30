import React from 'react'
import { Link } from 'gatsby'

import { IconCheckCircle, IconCompass, IconGraph, IconPullRequest } from '@posthog/icons'

import CustomSelfDrivingLoop from 'components/CustomSelfDrivingLoop'
import Explorer from 'components/Explorer'
import { Accordion } from 'components/RadixUI/Accordion'

import SelfDrivingInbox from './index'

/**
 * The loop, explained once in shared chrome rather than in any template's own content — every
 * template needs the same 101, so none of them should carry it. Stage names and the summary
 * below are the docs' own wording (/docs/self-driving/self-improving-loop).
 */
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
 * The full self-driving templates surface: Explorer chrome around the inbox.
 *
 * Shared by `/templates/self-driving` and every `/templates/<slug>` self-driving route, so both
 * are literally the same screen — the per-template URL just arrives with a row pre-selected.
 */
export default function SelfDrivingInboxPage({ initialSlug }: SelfDrivingInboxPageProps): JSX.Element {
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
                                        Each row is an example of a report a scout would file for you – the same thing
                                        that lands in your inbox once self-driving is running.
                                    </p>
                                    <p className="mb-0">
                                        Open one to see the question it answers, how it tells a real problem from noise,
                                        and add it to your scout troop in a click.
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
                                        Self-driving runs as a loop. Every scout you turn on feeds the same four stages,
                                        and the last one starts the next pass.
                                    </p>
                                    <CustomSelfDrivingLoop stages={LOOP_STAGES} loop />
                                    <p className="mb-0">
                                        <Link to="/docs/self-driving" state={{ newWindow: true }}>
                                            What is self-driving?
                                        </Link>{' '}
                                        ·{' '}
                                        <Link to="/docs/self-driving/self-improving-loop" state={{ newWindow: true }}>
                                            The loop
                                        </Link>
                                    </p>
                                </div>
                            ),
                        },
                    ]}
                />
            }
        >
            <SelfDrivingInbox initialSlug={initialSlug} />
        </Explorer>
    )
}
