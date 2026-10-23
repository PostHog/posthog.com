import React from 'react'
import { Checkbox } from 'components/UI/Checkbox'

export default function CheckboxStates(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
                <Checkbox.Root defaultChecked={false}>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                Unchecked
            </label>
            <label className="flex items-center gap-2 text-sm">
                <Checkbox.Root defaultChecked>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                Checked
            </label>
            <label className="flex items-center gap-2 text-sm">
                <Checkbox.Root indeterminate>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                Indeterminate
            </label>
        </div>
    )
}
