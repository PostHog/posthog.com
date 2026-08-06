import React from 'react'

import { CopyableCommand } from 'components/PlatformInstall/CopyableCommand'
import Link from 'components/Link'
import { usePostHog } from 'posthog-js/react'

import OSButton from 'components/OSButton'

import { productSource } from './sources'

import { buildScoutDeepLink, buildSelfDrivingCommand } from './scoutDeepLink'
import { Requirement, RequirementLevel, ScoutSpec } from './types'

/** Pinned shortcut to the enable block, which sits last because the page teaches top-to-bottom. */
export function EnableScoutBar({ scout, templateTitle }: Pick<EnableScoutProps, 'scout' | 'templateTitle'>) {
    const posthog = usePostHog()
    return (
        <div className="flex items-center gap-3 border-t border-primary bg-primary px-6 py-3">
            <span className="min-w-0 flex-1 truncate text-sm text-secondary">
                <span className="font-mono text-[13px] text-primary">{scout?.name || templateTitle}</span>
            </span>
            <OSButton
                asLink
                to={buildScoutDeepLink(scout)}
                external
                variant="primary"
                size="sm"
                onClick={() =>
                    posthog?.capture('pocket_guide_interaction', {
                        kind: 'add_scout_click',
                        scout: scout?.name,
                        placement: 'pinned_bar',
                    })
                }
            >
                Add this scout
            </OSButton>
        </div>
    )
}

interface EnableScoutProps {
    scout?: ScoutSpec
    requires?: Requirement[]
    /** Fallback label when the template has no scout spec. */
    templateTitle: string
}

// Same badge vocabulary and classes as docs steps (components/Docs/Steps.tsx), so a
// requirement reads identically here and in the setup docs.
const REQUIREMENT_BADGE: Record<RequirementLevel, { text: string; color: string }> = {
    required: { text: 'Required', color: 'orange' },
    recommended: { text: 'Recommended', color: 'purple' },
    optional: { text: 'Optional', color: 'blue' },
}

const badgeClasses = (color: string) =>
    `bg-${color}/10 text-${color} dark:text-white dark:bg-${color}/50 text-xs font-medium rounded-sm px-1 py-0.5 inline-block`

/** Links the tool a requirement names to its setup page, so "not set up yet" has somewhere to go. */
function RequirementLabel({ label }: { label: string }): JSX.Element {
    const { label: tool, install, docs } = productSource(label)
    const href = install ?? docs
    const at = href ? label.toLowerCase().indexOf(tool.toLowerCase()) : -1
    if (at < 0 || !href) {
        return <>{label}</>
    }
    return (
        <>
            {label.slice(0, at)}
            <Link to={href} state={{ newWindow: true }} className="underline">
                {label.slice(at, at + tool.length)}
            </Link>
            {label.slice(at + tool.length)}
        </>
    )
}

/**
 * A mock of the scout row as it appears in your troop, next to the action that puts it there.
 * Kept honest against posthog/posthog `scenes/inbox/components/config/scouts/ScoutRowCard.tsx`.
 */
export default function EnableScout({ scout, requires, templateTitle }: EnableScoutProps): JSX.Element {
    const posthog = usePostHog()
    const deepLink = buildScoutDeepLink(scout)
    const hasScout = Boolean(scout?.name && scout?.description)
    const selfDrivingCommand = buildSelfDrivingCommand()

    // No card chrome or heading of its own: the page hosting it owns the gutter and label.
    return (
        <div>
            <p className="mb-4 text-[15px] text-secondary">
                This is how the scout appears in PostHog once it's running – a scheduled agent that files a report when
                it finds something.
            </p>

            {/* Labeled and inert: a toggle in its on state otherwise reads as a live control. */}
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-secondary">Preview</p>
            <div
                aria-hidden="true"
                className="pointer-events-none mb-4 flex select-none items-center gap-3 rounded border border-light bg-accent px-3 py-2.5 dark:border-dark dark:bg-accent-dark"
            >
                <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                        <span className="truncate font-mono text-[13px] font-semibold text-primary">
                            {scout?.name || 'signals-scout-custom'}
                        </span>
                        <span className="shrink-0 rounded-sm bg-highlight px-1 py-0.5 text-[11px] font-medium text-primary">
                            Custom
                        </span>
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-secondary">
                        {scout?.schedule || 'Daily'} · writes findings to your inbox
                    </span>
                </span>
                {/* Not RadixUI/Switch – that renders a real form and label, wrong for a mock. */}
                <span className="relative block h-[27px] w-[44px] shrink-0 rounded-full border border-primary bg-green">
                    <span className="absolute top-1/2 left-[19px] block size-[21px] -translate-y-1/2 rounded-full bg-white" />
                </span>
            </div>

            {requires && requires.length > 0 && (
                <ul className="mb-4 list-none space-y-1.5 p-0">
                    {requires.map((requirement) => {
                        const badge = REQUIREMENT_BADGE[requirement.level || 'required']
                        return (
                            <li key={requirement.label} className="flex items-start gap-2 text-[15px] text-primary">
                                {/* Fixed width, not `shrink-0`: three badge widths left a ragged left edge. */}
                                <span className="mt-0.5 w-[104px] shrink-0">
                                    <span className={badgeClasses(badge.color)}>{badge.text}</span>
                                </span>
                                <span>
                                    <RequirementLabel label={requirement.label} />
                                </span>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div className="flex flex-wrap items-center gap-2">
                <OSButton
                    asLink
                    to={deepLink}
                    external
                    variant="primary"
                    size="md"
                    onClick={() =>
                        posthog?.capture('pocket_guide_interaction', {
                            kind: 'add_scout_click',
                            scout: scout?.name,
                            placement: 'enable_section',
                        })
                    }
                >
                    Add this scout
                </OSButton>
                <span className="text-xs text-secondary">
                    {hasScout
                        ? 'Opens PostHog with it prefilled. Review it, then hit Create.'
                        : 'Opens your scout troop in PostHog.'}
                </span>
            </div>

            {/* Demoted: as a second primary CTA the command competed with "Add this scout". */}
            <div className="mt-4 border-t border-light pt-3 dark:border-dark">
                <p className="mb-2 text-xs text-secondary">
                    Not set up yet? One command installs PostHog, connects GitHub, and turns on a default troop of
                    scouts. That troop doesn't include this one – add it above once you're set up.
                </p>
                <CopyableCommand
                    command={selfDrivingCommand.displayCommand}
                    copyCommand={selfDrivingCommand.copyCommand}
                />
            </div>
        </div>
    )
}
