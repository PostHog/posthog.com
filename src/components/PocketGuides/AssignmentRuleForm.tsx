import React from 'react'

import { IconFlask, IconPlus, IconX } from '@posthog/icons'

import AnatomyFrame from './AnatomyFrame'
import { FigureMarker } from './FigureMarker'
import { Control } from './MockFormControls'

/**
 * The Error Tracking assignment rule editor in miniature – the modal behind Settings > Error
 * tracking > Assignment rules > Add rule. Drawn rather than screenshotted so it scales with the
 * reader's Aa control and stays legible on a phone. Labels and field order follow the app's
 * `RuleModal` and `AssignmentRuleModal`: Filters with a Match All/Any toggle, the property
 * filters, the Assignee picker, the 7-day test result, then Test rule / Cancel / Save.
 *
 * Markers stay visible at every width, like the trigger group figure.
 */

/** The app's All/Any segmented control. */
function MatchToggle({ value }: { value: 'All' | 'Any' }): JSX.Element {
    return (
        <span className="inline-flex shrink-0 overflow-hidden rounded border border-primary text-[0.65em] font-semibold leading-none">
            {(['All', 'Any'] as const).map((option) => (
                <span
                    key={option}
                    className={`px-2 py-1 ${
                        option === value ? 'bg-accent text-primary dark:bg-accent-dark' : 'bg-primary text-secondary'
                    }`}
                >
                    {option}
                </span>
            ))}
        </span>
    )
}

/** A footer button, drawn as the app draws it: secondary by default, primary for Save. */
function FooterButton({
    label,
    icon,
    primary = false,
}: {
    label: string
    icon?: React.ReactNode
    primary?: boolean
}): JSX.Element {
    return (
        <span
            className={`inline-flex select-none items-center gap-1 rounded border px-2 py-1 text-[0.65em] font-semibold leading-none ${
                primary ? 'border-orange bg-orange text-white' : 'border-primary bg-primary text-primary'
            }`}
        >
            {icon}
            {label}
        </span>
    )
}

export interface AssignmentRuleFormProps {
    /** The exception property the filter reads, as the app labels it. */
    property?: string
    /** The filter's operator, as the app's select renders it. */
    operator?: string
    /** What the property is compared to. */
    value?: string
    /** The role or teammate the rule assigns to. */
    assignee?: string
    /** Exceptions the rule would have matched over the last 7 days. */
    exceptionCount?: number
    /** Issues those exceptions belong to. */
    issueCount?: number
}

export default function AssignmentRuleForm({
    property = 'Exception source',
    operator = 'contains',
    value = 'src/trips/',
    assignee = 'Trips',
    exceptionCount = 184,
    issueCount = 7,
}: AssignmentRuleFormProps): JSX.Element {
    return (
        <AnatomyFrame className="rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
            <span className="block text-[0.8em] font-bold leading-snug text-primary">New assignment rule</span>
            <p className="mb-3 mt-1 text-[0.7em] leading-snug text-secondary">
                Matching exceptions will be automatically assigned to the chosen user or role.
            </p>

            <div className="space-y-3 rounded border border-primary bg-primary p-3">
                <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[0.75em] font-bold leading-snug text-primary">Filters</span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-[0.7em] leading-snug text-secondary">Match</span>
                            <MatchToggle value="All" />
                            <FigureMarker
                                n={1}
                                label="Match"
                                gloss="All needs every filter to pass, Any needs just one"
                                visibility="always"
                            />
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="w-32">
                            <Control value={property} select />
                        </span>
                        <span className="w-24">
                            <Control value={operator} select />
                        </span>
                        <span className="min-w-[6rem] flex-1">
                            <Control value={value} />
                        </span>
                        <IconX className="size-3 shrink-0 text-secondary" aria-hidden="true" />
                        <FigureMarker
                            n={2}
                            label="Filter"
                            gloss="a property of the exception, read after source maps are applied – so this is the original file, not the minified bundle"
                            visibility="always"
                        />
                    </div>

                    <span className="mt-2 inline-flex select-none items-center gap-1 rounded border border-primary px-1.5 py-0.5 text-[0.65em] font-semibold leading-none text-secondary">
                        <IconPlus className="size-2.5" aria-hidden="true" />
                        Add filter
                    </span>
                </div>

                <div>
                    <span className="flex items-center gap-1.5 text-[0.75em] font-bold leading-snug text-primary">
                        Assignee
                        <FigureMarker
                            n={3}
                            label="Assignee"
                            gloss="a role such as a team, or one teammate – the first rule that matches wins"
                            visibility="always"
                        />
                    </span>
                    <div className="mt-2">
                        <Control value={assignee} select />
                    </div>
                </div>

                <p className="mb-0 rounded border border-green/30 bg-green/10 px-2 py-1.5 text-[0.7em] leading-snug text-primary">
                    <span className="font-bold underline">{exceptionCount} exceptions</span> across{' '}
                    <span className="font-bold underline">{issueCount} issues</span> would have been assigned in the
                    last 7 days
                </p>
            </div>

            <div className="mt-3 flex items-center justify-end gap-1.5">
                <FooterButton label="Test rule" icon={<IconFlask className="size-3" aria-hidden="true" />} />
                <FooterButton label="Cancel" />
                <FooterButton label="Save" primary />
            </div>
        </AnatomyFrame>
    )
}
