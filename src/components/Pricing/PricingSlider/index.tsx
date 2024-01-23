import React from 'react'
import { useActions, useValues } from 'kea'
import { pricingSliderLogic } from './pricingSliderLogic'
import { LogSlider } from './Slider'

interface PricingSliderProps {
    marks?: number[]
    min?: number
    max?: number
    stepsInRange?: number
    pricingOption?: string
}

export const PricingSlider = ({
    marks = [10000, 100000, 1000000, 10000000, 100000000],
    min = 10000,
    max = 150000000,
    stepsInRange = 100,
}: PricingSliderProps) => {
    const { setSliderValue } = useActions(pricingSliderLogic)
    const { sliderValue } = useValues(pricingSliderLogic)
    return (
        <LogSlider
            min={min}
            max={max}
            marks={marks}
            stepsInRange={stepsInRange}
            onChange={(value) => setSliderValue(value)}
            value={sliderValue}
        />
    )
}
