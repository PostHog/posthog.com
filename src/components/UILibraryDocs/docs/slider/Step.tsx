import React from 'react'
import { Slider } from 'components/UI/Slider'

export default function SliderStep(): JSX.Element {
    return (
        <Slider.Root defaultValue={1250} max={5000} step={50} className="max-w-sm">
            <div className="flex justify-between">
                <Slider.Label>Events per second</Slider.Label>
                <Slider.Value />
            </div>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Indicator />
                    <Slider.Thumb aria-label="Events per second" />
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>
    )
}
