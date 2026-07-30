import React from 'react'

import { CopyableCommand } from 'components/PlatformInstall/CopyableCommand'
import OSButton from 'components/OSButton'

import { buildScoutDeepLink, buildWizardCommand } from './scoutDeepLink'
import { Requirement, RequirementLevel, ScoutSpec } from './types'

/**
 * The persistent shortcut to the same action the full block offers, pinned to the bottom of the
 * detail pane. The page teaches top-to-bottom, so the full enable block comes last — this keeps
 * "one touch" literally one touch for anyone who already knows what they want.
 */
export function EnableScoutBar({ scout, templateTitle }: Pick<EnableScoutProps, 'scout' | 'templateTitle'>) {
    return (
        <div className="flex items-center gap-3 border-t border-primary bg-primary px-6 py-3">
            <span className="min-w-0 flex-1 truncate text-sm text-secondary">
                <span className="font-mono text-[13px] text-primary">{scout?.name || templateTitle}</span>
            </span>
            <OSButton asLink to={buildScoutDeepLink(scout)} external variant="primary" size="sm">
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

/**
 * A faithful mock of the scout as it appears in your troop, next to the action that puts it
 * there. The mock is doing double duty: it's the enablement affordance *and* the clearest
 * answer to "what even is a scout", which no amount of prose delivers as fast.
 *
 * Kept honest against the real product UI (posthog/posthog
 * `frontend/src/scenes/inbox/components/config/scouts/ScoutRowCard.tsx`): a scout row shows the
 * name, the schedule as a muted subtitle, an origin pill, and a bare switch with no text label.
 * The product has no "install" concept — the deep link opens a prefilled "Create a scout" form.
 */
export default function EnableScout({ scout, requires, templateTitle }: EnableScoutProps): JSX.Element {
    const deepLink = buildScoutDeepLink(scout)
    const hasScout = Boolean(scout?.name && scout?.description)

    return (
        <section className="rounded border border-primary bg-primary p-4">
            <h3 className="mt-0 mb-1 text-base font-bold text-primary">Add this to your scout troop</h3>
            <p className="mb-4 text-sm text-secondary">
                This is how it appears once it's running – a scheduled agent that files a report when it finds
                something.
            </p>

            {/* The mock scout row. Presentational only: the switch is decorative and disabled. */}
            <div
                aria-hidden="true"
                className="mb-4 flex items-center gap-3 rounded border border-light bg-accent px-3 py-2.5 dark:border-dark dark:bg-accent-dark"
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
                {/* A static picture of the product's toggle in its on state. Deliberately not
                    RadixUI/Switch: that renders a real <form> and a visible label, neither of
                    which belongs in a decorative mock. Dimensions match the real control. */}
                <span className="relative block h-[27px] w-[44px] shrink-0 rounded-full border border-primary bg-green">
                    <span className="absolute top-1/2 left-[19px] block size-[21px] -translate-y-1/2 rounded-full bg-white" />
                </span>
            </div>

            {requires && requires.length > 0 && (
                <ul className="mb-4 list-none space-y-1.5 p-0">
                    {requires.map((requirement) => {
                        const badge = REQUIREMENT_BADGE[requirement.level || 'required']
                        return (
                            <li key={requirement.label} className="flex items-start gap-2 text-sm text-primary">
                                <span className={`${badgeClasses(badge.color)} mt-0.5 shrink-0`}>{badge.text}</span>
                                <span>{requirement.label}</span>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div className="flex flex-wrap items-center gap-2">
                <OSButton asLink to={deepLink} external variant="primary" size="md">
                    Add this scout
                </OSButton>
                <span className="text-xs text-secondary">
                    {hasScout
                        ? 'Opens PostHog with it prefilled. Review it, then hit Create.'
                        : 'Opens your scout troop in PostHog.'}
                </span>
            </div>

            <div className="mt-4 border-t border-light pt-4 dark:border-dark">
                <p className="mb-2 text-sm text-secondary">
                    Not set up yet? One command installs PostHog, connects GitHub, and sets up your troop – including
                    something like <span className="text-primary">{templateTitle.toLowerCase()}</span>.
                </p>
                <CopyableCommand command={buildWizardCommand()} />
            </div>
        </section>
    )
}
