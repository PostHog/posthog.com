import React from 'react'
import { useValues, useActions } from 'kea'
import { pricingSliderLogic } from './pricingSliderLogic'
import { LogSlider } from './LogSlider'

interface PricingSliderProps {
    marks?: number[]
    min?: number
    max?: number
    stepsInRange?: number
}

export const PricingSlider = ({
    marks = [10000, 100000, 1000000, 10000000, 100000000],
    min = 10000,
    max = 150000000,
    stepsInRange = 100,
}: PricingSliderProps) => {
    const { setSliderValue } = useActions(pricingSliderLogic)

    return (
        <div className="mt-8 mb-12">
            <LogSlider
                min={min}
                max={max}
                marks={marks}
                stepsInRange={stepsInRange}
                onChange={(value) => setSliderValue(value)}
            />
        </div>
    )
}
