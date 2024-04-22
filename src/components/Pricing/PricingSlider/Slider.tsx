import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './slider.scss'

// Thanks to https://codesandbox.io/s/rc-slider-log-demo-forked-xffr0

interface SliderProps {
    min: number
    max: number
    marks: number[]
    stepsInRange: number
    onChange: (value: number) => void
    value: number
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

const SI_SYMBOL = ['', 'k', 'M', 'B']

const abbreviateNumber = (number: number): string => {
    const tier = (Math.log10(Math.abs(number)) / 3) | 0
    if (tier == 0) return `${number}`
    const suffix = SI_SYMBOL[tier]
    const scale = Math.pow(10, tier * 3)
    const scaled = number / scale
    return `${scaled.toFixed(0) + suffix}`
}

const makeMarks = (marks: number[]): Record<number, string> => {
    return marks.reduce((acc, cur) => {
        acc[inverseCurve(cur)] = abbreviateNumber(cur)
        return acc
    }, {} as Record<number, string>)
}

const makeLinearMarks = (marks: number[]): Record<number, string> => {
    return marks.reduce((acc, cur) => {
        acc[cur] = abbreviateNumber(cur)
        return acc
    }, {} as Record<number, string>)
}

export const LogSlider = ({ min, max, marks, stepsInRange, onChange, value }: SliderProps): JSX.Element => {
    return (
        <MySlider
            min={inverseCurve(min)}
            max={inverseCurve(max)}
            marks={makeMarks(marks)}
            step={(inverseCurve(max) - inverseCurve(min)) / stepsInRange}
            tipFormatter={(value) => prettyInt(sliderCurve(value))}
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
