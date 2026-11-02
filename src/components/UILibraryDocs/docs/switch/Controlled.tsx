import React, { useState } from 'react'
import { Switch } from 'components/UI/Switch'

export default function ControlledSwitch(): JSX.Element {
    const [autocapture, setAutocapture] = useState(false)

    return (
        <label className="flex items-center gap-2 text-sm">
            <Switch.Root checked={autocapture} onCheckedChange={setAutocapture}>
                <Switch.Thumb />
            </Switch.Root>
            Autocapture ({autocapture ? 'on' : 'off'})
        </label>
    )
}
