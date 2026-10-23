import React from 'react'
import { Checkbox } from 'components/UI/Checkbox'
import { Slider } from 'components/UI/Slider'
import { Switch } from 'components/UI/Switch'

export default function Motion(): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-6 text-sm">
                <label className="flex items-center gap-2">
                    <Checkbox.Root defaultChecked>
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    The check draws itself
                </label>
                <label className="flex items-center gap-2">
                    <Switch.Root defaultChecked>
                        <Switch.Thumb />
                    </Switch.Root>
                    The thumb slides and presses down
                </label>
            </div>
            <Slider.Root defaultValue={42} className="max-w-sm">
                <div className="flex items-center justify-between">
                    <Slider.Label>The value rolls like an odometer</Slider.Label>
                    <Slider.Value />
                </div>
                <Slider.Control>
                    <Slider.Track>
                        <Slider.Indicator />
                        <Slider.Thumb aria-label="Value" />
                    </Slider.Track>
                </Slider.Control>
            </Slider.Root>
        </div>
    )
}
