import { kea } from 'kea'
import { CLOUD_ENTERPRISE_MINIMUM_PRICING, ENTERPRISE_MINIMUM_PRICING, pricing } from '../constants'
import { inverseCurve, prettyInt, sliderCurve } from './LogSlider'

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

    if (pricingOption === 'cloud-enterprise' || pricingOption === 'self-hosted-enterprise') {
        finalCost += 450
    }

    return Math.round(finalCost)
}

export type PricingOptionType =
    | 'self-hosted'
    | 'self-hosted-enterprise'
    | 'cloud'
    | 'cloud-enterprise'
    | 'session-recording'

export const pricingSliderLogic = kea({
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
            0,
            {
                setSessionRecordingSliderValue: (_: null, { value }: { value: number }) => Math.round(value),
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        eventNumber: [
            0,
            {
                setSliderValue: (_: null, { value }: { value: number }) => Math.round(value),
                setInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        sliderValue: [
            null,
            {
                setSliderValue: (_: null, { value }: { value: number }) => value,
                setInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        inputValue: [
            1,
            {
                setSliderValue: (_: null, { value }: { value: number }) => Math.round(value),
                setInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        sessionRecordingSliderValue: [
            null,
            {
                setSessionRecordingSliderValue: (_: null, { value }: { value: number }) => value,
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        sessionRecordingInputValue: [
            1,
            {
                setSessionRecordingSliderValue: (_: null, { value }: { value: number }) => Math.round(value),
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        pricingOption: [
            'cloud',
            {
                setPricingOption: (_: null, { option }: { option: string }) => option,
            },
        ],
    },
    selectors: () => ({
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
        cloudCost: [
            (s) => [s.eventNumber],
            (eventNumber: number) => {
                return calculatePrice(eventNumber, 'cloud')
            },
        ],
        selfHostedCost: [
            (s) => [s.eventNumber],
            (eventNumber: number) => {
                return calculatePrice(eventNumber, 'self-hosted')
            },
        ],
        cloudEnterpriseCost: [
            (s) => [s.eventNumber],
            (eventNumber: number) => {
                return calculatePrice(eventNumber, 'cloud-enterprise')
            },
        ],
        selfHostedEnterpriseCost: [
            (s) => [s.eventNumber],
            (eventNumber: number) => {
                return calculatePrice(eventNumber, 'self-hosted-enterprise')
            },
        ],
        monthlyTotal: [
            (s) => [s.sessionRecordingEventNumber, s.eventNumber],
            (sessionRecordingEventNumber: number, eventNumber: number) => {
                return (
                    calculatePrice(eventNumber, 'cloud') +
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
})
