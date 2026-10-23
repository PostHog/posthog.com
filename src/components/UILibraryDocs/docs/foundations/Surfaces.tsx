import React from 'react'
import { Checkbox } from 'components/UI/Checkbox'
import { Chip } from 'components/UI/Chip'
import { Input } from 'components/UI/Input'
import { Progress } from 'components/UI/Progress'
import { Radio, RadioGroup } from 'components/UI/Radio'
import { Switch } from 'components/UI/Switch'

export default function Surfaces(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <Input aria-label="Search" placeholder="Search…" className="max-w-xs" />
            <div className="flex flex-wrap items-center gap-4 text-sm">
                <label className="flex items-center gap-2">
                    <Checkbox.Root>
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    Checkbox
                </label>
                <RadioGroup aria-label="Billing" defaultValue="monthly" className="flex-row gap-4">
                    <label className="flex items-center gap-2">
                        <Radio.Root value="monthly">
                            <Radio.Indicator />
                        </Radio.Root>
                        Monthly
                    </label>
                    <label className="flex items-center gap-2">
                        <Radio.Root value="annual">
                            <Radio.Indicator />
                        </Radio.Root>
                        Annual
                    </label>
                </RadioGroup>
                <Switch.Root aria-label="Session replay">
                    <Switch.Thumb />
                </Switch.Root>
                <Chip>Chip</Chip>
            </div>
            <Progress.Root value={40} className="max-w-xs">
                <Progress.Label>Track</Progress.Label>
                <Progress.Track>
                    <Progress.Indicator />
                </Progress.Track>
            </Progress.Root>
        </div>
    )
}
