import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Checkbox } from 'components/UI/Checkbox'

export default function ControlledCheckbox(): JSX.Element {
    const [checked, setChecked] = useState(true)

    return (
        <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
                <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                Email me weekly reports
            </label>
            <Button size="sm" appearance="flat" onClick={() => setChecked(!checked)}>
                Turn {checked ? 'off' : 'on'} from outside
            </Button>
        </div>
    )
}
