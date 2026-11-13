import React from 'react'
import { Switch } from 'components/UI/Switch'

export default function DisabledSwitch(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-muted">
                <Switch.Root disabled>
                    <Switch.Thumb />
                </Switch.Root>
                Disabled
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
                <Switch.Root disabled defaultChecked>
                    <Switch.Thumb />
                </Switch.Root>
                Disabled and on
            </label>
        </div>
    )
}
