import React from 'react'
import { Checkbox } from 'components/UI/Checkbox'

export default function DisabledCheckbox(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-muted">
                <Checkbox.Root disabled>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                Disabled
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
                <Checkbox.Root disabled defaultChecked>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                Disabled and checked
            </label>
        </div>
    )
}
