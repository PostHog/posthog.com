import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './slider.css'

// Thanks to https://codesandbox.io/s/rc-slider-log-demo-forked-xffr0

interface SliderProps {
    min: number
    max: number
    marks: number[]
    stepsInRange: number
    onChange: (value: number) => void
    value: number
    scaleMin?: number
}

const MySlider = Slider.createSliderWithTooltip(Slider)

export const prettyInt = (x: number): string => {
    return Math.round(x)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// change these to whatever curve function you need!
export const sliderCurve = Math.exp
export const inverseCurve = Math.log
export const identityCurve = (x: number): number => x
export const nonLinearCurve = (x: number): number => Math.pow(x, 0.4)
export const reverseNonLinearCurve = (y: number): number => Math.pow(y, 1 / 0.4)

const SI_SYMBOL = ['', 'k', 'M', 'B']

const abbreviateNumber = (number: number): string => {
    const tier = (Math.log10(Math.abs(number)) / 3) | 0
    if (tier == 0) return `${number}`
    const suffix = SI_SYMBOL[tier]
    const scale = Math.pow(10, tier * 3)
    const scaled = number / scale
    return `${scaled.toFixed(0) + suffix}`
}

const makeMarks = (marks: number[], scaleMin: number): Record<number, string> => {
    return marks.reduce((acc, cur) => {
        const value = cur <= 0 ? scaleMin : cur
        acc[inverseCurve(value)] = cur <= 0 ? '0' : abbreviateNumber(cur)
        return acc
    }, {} as Record<number, string>)
}

const makeLinearMarks = (marks: number[]): Record<number, string> => {
    return marks.reduce((acc, cur) => {
        acc[cur] = abbreviateNumber(cur)
        return acc
    }, {} as Record<number, string>)
}

const makeNonLinearMarks = (marks: number[], max): Record<number, string> => {
    return marks.reduce((acc, cur) => {
        acc[nonLinearCurve(cur)] = abbreviateNumber(cur)
        return acc
    }, {} as Record<number, string>)
}

export const LogSlider = ({ min, max, marks, stepsInRange, onChange, value, scaleMin }: SliderProps): JSX.Element => {
    const effectiveMin = scaleMin ?? Math.max(min, 1)

    return (
        <MySlider
            min={inverseCurve(effectiveMin)}
            max={inverseCurve(max)}
            marks={makeMarks(marks, effectiveMin)}
            step={(inverseCurve(max) - inverseCurve(effectiveMin)) / stepsInRange}
            tipFormatter={(value) => {
                const roundedValue = Math.round(sliderCurve(value))
                return min === 0 && roundedValue <= effectiveMin ? '0' : prettyInt(roundedValue)
            }}
            onChange={onChange}
            className="slider center"
            value={value}
        />
    )
}

export const LinearSlider = ({ min, max, marks, stepsInRange, onChange, value }: SliderProps): JSX.Element => {
    return (
        <MySlider
            min={min}
            max={max}
            marks={makeLinearMarks(marks)}
            step={(max - min) / stepsInRange}
            onChange={onChange}
            className="slider center"
            value={value}
        />
    )
}

export const NonLinearSlider = ({ min, max, marks, stepsInRange, onChange, value }: SliderProps): JSX.Element => {
    return (
        <MySlider
            min={nonLinearCurve(min)}
            max={nonLinearCurve(max)}
            marks={makeNonLinearMarks(marks, max)}
            step={(nonLinearCurve(max) - nonLinearCurve(min)) / stepsInRange}
            tipFormatter={(value) => prettyInt(reverseNonLinearCurve(value))}
            onChange={onChange}
            className="slider center"
            value={value}
        />
    )
}
