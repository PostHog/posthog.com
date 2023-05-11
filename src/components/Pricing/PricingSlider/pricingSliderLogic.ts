import { kea } from 'kea'
import { pricing } from '../constants'
import { inverseCurve, prettyInt, sliderCurve } from './LogSlider'
import { pricingLogic } from '../pricingLogic'

import type { pricingSliderLogicType } from './pricingSliderLogicType'

const calculatePrice = (eventNumber: number, pricingOption: PricingOptionType) => {
    let finalCost = 0
    let alreadyCountedEvents = 0

    const thresholdPrices = pricing[pricingOption] || [[]]

    for (const [threshold, unitPricing] of thresholdPrices) {
        finalCost =
            finalCost +
            Math.max(0, Math.min(eventNumber - alreadyCountedEvents, threshold - alreadyCountedEvents)) * unitPricing
        alreadyCountedEvents = threshold
    }

    return Math.round(finalCost)
}

export type PricingOptionType = 'product-analytics' | 'session-recording'

export const pricingSliderLogic = kea<pricingSliderLogicType>({
    connect: {
        values: [pricingLogic, ['availableProducts']],
        actions: [pricingLogic, ['loadAvailableProducts']],
    },
    actions: {
        setEventNumber: (value: number) => ({ value }),
        setInputValue: (value: number) => ({ value }),
        setSliderValue: (value: number) => ({ value }),
        setPricingOption: (option: PricingOptionType) => ({ option }),
        setSessionRecordingSliderValue: (value: number) => ({ value }),
        setSessionRecordingInputValue: (value: number) => ({ value }),
    },
    reducers: {
        sessionRecordingEventNumber: [
            15000,
            {
                setSessionRecordingSliderValue: (_: null, { value }: { value: number }) =>
                    Math.round(sliderCurve(value)),
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        eventNumber: [
            1000000,
            {
                setSliderValue: (_: null, { value }: { value: number }) => Math.round(sliderCurve(value)),
                setInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        sliderValue: [
            null,
            {
                setSliderValue: (_: null, { value }: { value: number }) => value,
                setInputValue: (_: null, { value }: { value: number }) => inverseCurve(value * 1000000),
            },
        ],
        inputValue: [
            1,
            {
                setSliderValue: (_: null, { value }: { value: number }) => Math.round(sliderCurve(value) / 1000000),
                setInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        sessionRecordingSliderValue: [
            null,
            {
                setSessionRecordingSliderValue: (_: null, { value }: { value: number }) => value,
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => inverseCurve(value * 1000000),
            },
        ],
        sessionRecordingInputValue: [
            1,
            {
                setSessionRecordingSliderValue: (_: null, { value }: { value: number }) =>
                    Math.round(sliderCurve(value) / 1000000),
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        pricingOption: [
            'product-analytics',
            {
                setPricingOption: (_: null, { option }: { option: string }) => option,
            },
        ],
    },
    selectors: ({ actions, values }) => ({
        finalCost: [
            (s) => [s.eventNumber, s.pricingOption],
            (eventNumber: number, pricingOption: PricingOptionType) => {
                return calculatePrice(eventNumber, pricingOption)
            },
        ],
        sessionRecordingCost: [
            (s) => [s.sessionRecordingEventNumber],
            (sessionRecordingEventNumber: number) => {
                return calculatePrice(sessionRecordingEventNumber, 'session-recording')
            },
        ],
        productAnalyticsCost: [
            (s) => [s.eventNumber],
            (eventNumber: number) => {
                return calculatePrice(eventNumber, 'product-analytics')
            },
        ],
        monthlyTotal: [
            (s) => [s.sessionRecordingEventNumber, s.eventNumber],
            (sessionRecordingEventNumber: number, eventNumber: number) => {
                return (
                    calculatePrice(eventNumber, 'product-analytics') +
                    calculatePrice(sessionRecordingEventNumber, 'session-recording')
                )
            },
        ],
        finalMonthlyCost: [
            (s) => [s.finalCost],
            (finalCost: number) => {
                return finalCost.toLocaleString()
            },
        ],
        finalAnnualCost: [
            (s) => [s.finalCost],
            (finalCost: number) => {
                const finalAnnualCost = finalCost * 10.8
                return finalAnnualCost.toLocaleString()
            },
        ],
    }),
    events: ({ actions }) => ({
        afterMount: () => {
            actions.loadAvailableProducts()
        },
    }),
})
