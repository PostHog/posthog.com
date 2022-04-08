import React from 'react'
import { useActions, useValues } from 'kea'
import { pricingSliderLogic } from './pricingSliderLogic'
import { LogSlider } from './LogSlider'
import { Input } from 'antd'

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
    pricingOption = 'scale',
}: PricingSliderProps) => {
    const { setSliderValue, setInputValue, setPricingOption } = useActions(pricingSliderLogic)
    const { inputValue } = useValues(pricingSliderLogic)

    setPricingOption(pricingOption)

    return (
        <div className="mt-5 mb-6">
            <Input
                name="event"
                type="number"
                autoFocus
                value={inputValue}
                onChange={({ target: { value } }) => setInputValue(value)}
            />
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
