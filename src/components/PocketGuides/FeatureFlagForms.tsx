import React from 'react'

import AnatomyFrame from './AnatomyFrame'
import { FigureMarker } from './FigureMarker'
import { AddButton, Control } from './MockFormControls'

function SectionHeading({ title, description }: { title: string; description: string }): JSX.Element {
    return (
        <>
            <span className="block text-[0.8em] font-bold leading-snug text-primary">{title}</span>
            <p className="mb-3 mt-1 text-[0.7em] leading-snug text-secondary">{description}</p>
        </>
    )
}

function SetLabel({ n }: { n: number }): JSX.Element {
    return (
        <span className="shrink-0 rounded bg-accent px-1.5 py-0.5 text-[0.65em] font-semibold leading-none text-primary dark:bg-accent-dark">
            Set {n}
        </span>
    )
}

function RolloutLine({ percentage, marker }: { percentage: string; marker?: React.ReactNode }): JSX.Element {
    const wordClasses = 'text-[0.7em] leading-snug text-primary'
    return (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className={wordClasses}>Roll out to</span>
            <span className="w-14">
                <Control value={`${percentage}%`} />
            </span>
            <span className={wordClasses}>
                of <strong className="font-bold">users</strong> in this set.
            </span>
            {marker}
        </div>
    )
}

export function ReleaseConditionsForm(): JSX.Element {
    return (
        <AnatomyFrame className="rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
            <SectionHeading
                title="Release conditions"
                description="Specify users for flag release. Condition sets are evaluated top to bottom - the first matching set is used. A condition matches when all property filters pass AND the target falls within the rollout percentage."
            />

            <div className="rounded border border-primary bg-primary p-3">
                <div className="flex items-center gap-1.5">
                    <SetLabel n={1} />
                    <FigureMarker
                        n={1}
                        label="Condition set"
                        gloss="one group of people: everyone who passes all its filters, cut to its rollout percentage"
                        visibility="always"
                    />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="w-16">
                        <Control value="email" select />
                    </span>
                    <span className="w-24">
                        <Control value="ends with" select />
                    </span>
                    <span className="min-w-[8rem] flex-1">
                        <Control value="@yourcompany.com" />
                    </span>
                    <FigureMarker
                        n={2}
                        label="Property filter"
                        gloss="who is eligible – here, your team, by email domain"
                        visibility="always"
                    />
                </div>
                <RolloutLine percentage="100" />
            </div>

            <div className="my-1.5 flex items-center justify-center gap-1.5 text-[0.65em] font-bold text-secondary">
                OR
                <FigureMarker
                    n={3}
                    label="Top to bottom"
                    gloss="a person gets the flag if any set matches, and the first set that matches decides"
                    visibility="always"
                />
            </div>

            <div className="rounded border border-primary bg-primary p-3">
                <div className="flex items-center gap-1.5">
                    <SetLabel n={2} />
                    <span className="text-[0.7em] leading-snug text-secondary">Condition set will match all users</span>
                </div>
                <RolloutLine
                    percentage="5"
                    marker={
                        <FigureMarker
                            n={4}
                            label="Rollout percentage"
                            gloss="the cut-off for the hash – raise it and everyone who had the flag keeps it"
                            visibility="always"
                        />
                    }
                />
            </div>

            <div className="mt-3">
                <AddButton label="Add condition set" />
            </div>
        </AnatomyFrame>
    )
}

const CHECKOUT_VARIANTS = [
    { letter: 'A', key: 'control', description: 'Three-step checkout', rollout: '50' },
    { letter: 'B', key: 'test', description: 'One-page checkout', rollout: '50' },
]

const VARIANT_GRID = 'grid grid-cols-[1.25rem_1fr_1.5fr_3.5rem] items-center gap-2'

export function VariantsForm(): JSX.Element {
    return (
        <AnatomyFrame className="rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
            <SectionHeading
                title="Variants"
                description="A multivariate flag answers with a variant key instead of true or false."
            />

            <div className="space-y-2 rounded border border-primary bg-primary p-3">
                <div className={`${VARIANT_GRID} text-[0.65em] font-bold text-primary`}>
                    <span />
                    <span className="flex items-center gap-1.5">
                        Variant key
                        <FigureMarker
                            n={1}
                            label="control"
                            gloss="the variant an experiment compares every other variant against"
                            visibility="always"
                        />
                    </span>
                    <span>Description</span>
                    <span className="flex items-center gap-1.5">
                        Rollout
                        <FigureMarker
                            n={2}
                            label="Rollout split"
                            gloss="how the people who match the release conditions divide between variants – the hash keeps each person in one"
                            visibility="always"
                        />
                    </span>
                </div>
                {CHECKOUT_VARIANTS.map((variant) => (
                    <div key={variant.key} className={VARIANT_GRID}>
                        <span className="flex size-5 items-center justify-center rounded bg-accent text-[0.65em] font-bold text-secondary dark:bg-accent-dark">
                            {variant.letter}
                        </span>
                        <Control value={variant.key} />
                        <Control value={variant.description} />
                        <Control value={`${variant.rollout}%`} />
                    </div>
                ))}
            </div>

            <div className="mt-3">
                <AddButton label="Add variant" />
            </div>
        </AnatomyFrame>
    )
}
