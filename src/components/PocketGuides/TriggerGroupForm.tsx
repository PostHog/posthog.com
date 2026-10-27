import React from 'react'

import AnatomyFrame from './AnatomyFrame'
import { FigureMarker } from './FigureMarker'
import { AddButton, Control } from './MockFormControls'

/**
 * The app's trigger group form in miniature – the one place where "which sessions get recorded"
 * is actually decided. Drawn rather than screenshotted so it scales with the reader's Aa control
 * and stays legible on a phone. Annotated like the report anatomy figures, except the markers
 * stay visible at every width rather than fading in on hover – a form is a list of fields, and
 * a reader scanning it should see which ones are explained without having to find them first.
 * Hovering a marker still opens its gloss, and narrow readers get the glosses printed as a key.
 *
 * Partial by design: the fields are the app's, the chrome around them (save/cancel, the group
 * list, the legacy panel below) is left out so the figure teaches the shape of one group.
 */

/** A labelled field, laid out as the app lays it out: label above, control below. */
function Field({
    label,
    hint,
    marker,
    children,
    className = '',
}: {
    label: string
    hint?: React.ReactNode
    marker?: React.ReactNode
    children: React.ReactNode
    className?: string
}): JSX.Element {
    return (
        <div className={className}>
            <span className="flex items-center gap-1.5 text-[0.7em] font-bold leading-snug text-primary">
                {label}
                {marker}
            </span>
            {hint && <p className="mb-1 mt-0.5 text-[0.65em] leading-snug text-secondary">{hint}</p>}
            <div className={hint ? '' : 'mt-1'}>{children}</div>
        </div>
    )
}

/** One condition row: its label (and hint) on the left, its add control on the right. */
function ConditionRow({
    label,
    hint,
    action,
    marker,
}: {
    label: string
    hint?: React.ReactNode
    action: string
    marker?: React.ReactNode
}): JSX.Element {
    return (
        <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
                <span className="flex items-center gap-1.5 text-[0.7em] font-bold leading-snug text-primary">
                    {label}
                    {marker}
                </span>
                {hint && <p className="mb-0 mt-0.5 text-[0.65em] leading-snug text-secondary">{hint}</p>}
            </div>
            <AddButton label={action} />
        </div>
    )
}

export interface TriggerGroupFormProps {
    /** Sample rate as the app shows it, in whole percent. */
    sampleRate?: string
    /** Minimum duration, as the app's select renders it. */
    minimumDuration?: string
    /** Match type, as the app's select renders it. */
    matchType?: string
}

export default function TriggerGroupForm({
    sampleRate = '100',
    minimumDuration = 'No minimum',
    matchType = 'ANY condition matches',
}: TriggerGroupFormProps): JSX.Element {
    return (
        <AnatomyFrame className="rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
            <span className="block text-[0.8em] font-bold leading-snug text-primary">Trigger groups</span>
            <p className="mb-3 mt-1 text-[0.7em] leading-snug text-secondary">
                Configure custom recording triggers with individual sampling rates per group. Recording will start if
                any of the recording trigger groups match.
            </p>

            <div className="space-y-3 rounded border border-primary bg-primary p-3">
                <Field
                    label="Group name"
                    marker={
                        <FigureMarker
                            n={1}
                            label="Group name"
                            gloss="what this rule is for, so the next person knows why it exists"
                            visibility="always"
                        />
                    }
                >
                    <Control placeholder="e.g., Error Tracking, Feature Testing" />
                </Field>

                {/* Side by side in the app, stacked once the reading column is narrow. */}
                <div className="flex flex-col gap-3 @sm:flex-row">
                    <Field
                        label="Sample rate (%)"
                        className="flex-1"
                        marker={
                            <FigureMarker
                                n={2}
                                label="Sample rate"
                                gloss="what share of the sessions that matched to actually record – each group gets its own"
                                visibility="always"
                            />
                        }
                    >
                        <Control value={sampleRate} />
                    </Field>
                    <Field
                        label="Minimum duration (seconds)"
                        className="flex-1"
                        marker={
                            <FigureMarker
                                n={3}
                                label="Minimum duration"
                                gloss="drops sessions too short to be worth the storage, and the bill"
                                visibility="always"
                            />
                        }
                    >
                        <Control value={minimumDuration} select />
                    </Field>
                </div>

                <Field
                    label="Match type"
                    marker={
                        <FigureMarker
                            n={4}
                            label="Match type"
                            gloss="whether a session has to meet any of the conditions below, or all of them"
                            visibility="always"
                        />
                    }
                >
                    <Control value={matchType} select />
                </Field>

                <div className="border-t border-primary pt-3">
                    <span className="flex items-center gap-1.5 text-[0.75em] font-bold leading-snug text-primary">
                        Conditions
                        <FigureMarker
                            n={5}
                            label="Conditions"
                            gloss="what has to be true for the group to match at all – leave them empty and it matches every session"
                            visibility="always"
                        />
                    </span>

                    <div className="mt-2 space-y-3">
                        <ConditionRow label="Event triggers" action="Add event" />
                        <ConditionRow
                            label="URL patterns (regex)"
                            hint={
                                <>
                                    Matches if the user visits a matching URL at any point during the session. For more
                                    control, use a <strong className="font-bold">$pageview</strong> event trigger with
                                    property filters.
                                </>
                            }
                            action="Add URL"
                        />
                        <ConditionRow label="Feature flag" action="Add flag" />
                    </div>

                    <p className="mb-0 mt-3 rounded border border-dashed border-primary px-2 py-1.5 text-[0.65em] leading-snug text-secondary">
                        No conditions added yet. A trigger group will match all sessions if there are no conditions.
                    </p>
                </div>
            </div>
        </AnatomyFrame>
    )
}
