import React from 'react'
import { Slider } from 'components/UI/Slider'

export default function BasicSlider(): JSX.Element {
    return (
        <Slider.Root defaultValue={40} className="max-w-sm">
            <div className="flex justify-between">
                <Slider.Label>Sample rate</Slider.Label>
                <Slider.Value />
            </div>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Indicator />
                    <Slider.Thumb aria-label="Sample rate" />
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>
    )
}
