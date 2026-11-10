import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'
import { controlLabel, type FieldAppearance } from 'components/UI/styles'
import { DemoColumn, DemoColumns } from 'components/UILibraryDocs/DemoLayout'

const states = [
    { label: 'Empty', props: { placeholder: 'Search members' } },
    { label: 'Filled', props: { defaultValue: 'feature flags' } },
    { label: 'Invalid', props: { defaultValue: '$pageview', 'aria-invalid': true } },
    { label: 'Disabled', props: { defaultValue: '$pageview', disabled: true } },
] as const

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            {states.map(({ label, props }) => (
                <div key={label} className="flex flex-col gap-1">
                    <span className={controlLabel} data-disabled={label === 'Disabled' ? '' : undefined}>
                        {label}
                    </span>
                    <SearchInput appearance={appearance} aria-label={`${label} search`} {...props} />
                </div>
            ))}
        </div>
    )
}

export default function States(): JSX.Element {
    return (
        <DemoColumns>
            <DemoColumn label="inset · forms">
                <StateColumn appearance="inset" />
            </DemoColumn>
            <DemoColumn label="line · inline filters">
                <StateColumn appearance="line" />
            </DemoColumn>
        </DemoColumns>
    )
}
