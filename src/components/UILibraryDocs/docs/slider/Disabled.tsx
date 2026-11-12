import React from 'react'
import { Slider } from 'components/UI/Slider'

export default function DisabledSlider(): JSX.Element {
    return (
        <Slider.Root defaultValue={30} max={90} disabled className="max-w-sm">
            <div className="flex justify-between">
                <Slider.Label>Data retention (days)</Slider.Label>
                <Slider.Value />
            </div>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Indicator />
                    <Slider.Thumb aria-label="Data retention" />
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>
    )
}
