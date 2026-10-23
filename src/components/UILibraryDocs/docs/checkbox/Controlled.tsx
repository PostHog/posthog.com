import React, { useState } from 'react'
import { Checkbox } from 'components/UI/Checkbox'

export default function ControlledCheckbox(): JSX.Element {
    const [checked, setChecked] = useState(true)

    return (
        <label className="flex items-center gap-2 text-sm">
            <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
                <Checkbox.Indicator />
            </Checkbox.Root>
            Controlled ({checked ? 'on' : 'off'})
        </label>
    )
}
