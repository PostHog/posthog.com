import React from 'react'
import { Switch } from 'components/UI/Switch'

export default function BasicSwitch(): JSX.Element {
    return (
        <label className="flex items-center gap-2 text-sm">
            <Switch.Root defaultChecked>
                <Switch.Thumb />
            </Switch.Root>
            Session replay
        </label>
    )
}
