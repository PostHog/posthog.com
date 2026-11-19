import React from 'react'
import { Slider } from 'components/UI/Slider'

export default function RangeSlider(): JSX.Element {
    return (
        <Slider.Root defaultValue={[20, 80]} className="max-w-sm">
            <div className="flex justify-between">
                <Slider.Label>Session length (minutes)</Slider.Label>
                <Slider.Value />
            </div>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Indicator />
                    <Slider.Thumb index={0} aria-label="Shortest session" />
                    <Slider.Thumb index={1} aria-label="Longest session" />
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>
    )
}
