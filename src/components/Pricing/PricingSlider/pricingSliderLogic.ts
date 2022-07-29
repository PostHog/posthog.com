import { kea } from 'kea'
import { CLOUD_ENTERPRISE_MINIMUM_PRICING, ENTERPRISE_MINIMUM_PRICING } from '../constants'
import { inverseCurve, sliderCurve } from './LogSlider'

const calculatePrice = (eventNumber: number, pricingOption: PricingOptionType) => {
    let finalCost = 0
    let alreadyCountedEvents = 0

    const thresholdPrices =
        pricingOption === 'self-hosted'
            ? [
                  [1_000_000, 0],
                  [2_000_000, 0.00045],
                  [10_000_000, 0.000225],
                  [100_000_000, 0.000045],
                  [1_000_000_000, 0.000009],
                  [Number.MAX_SAFE_INTEGER, 0.000003],
              ]
            : pricingOption === 'self-hosted-enterprise'
            ? [
                  [10_000_000, 0.00045],
                  [100_000_000, 0.00009],
                  [1_000_000_000, 0.000018],
                  [Number.MAX_SAFE_INTEGER, 0.0000036],
              ]
            : pricingOption === 'cloud'
            ? [
                  [1_000_000, 0],
                  [10_000_000, 0.000225],
                  [100_000_000, 0.000075],
                  [Number.MAX_SAFE_INTEGER, 0.000025],
              ]
            : pricingOption === 'cloud-enterprise'
            ? [
                  [10_000_000, 0.0003],
                  [100_000_000, 0.0001],
                  [1_000_000_000, 0.00003],
                  [Number.MAX_SAFE_INTEGER, 0.000006],
              ]
            : [[]]

    for (const [threshold, unitPricing] of thresholdPrices) {
        finalCost =
            finalCost +
            Math.max(0, Math.min(eventNumber - alreadyCountedEvents, threshold - alreadyCountedEvents)) * unitPricing
        alreadyCountedEvents = threshold
    }

    if (pricingOption === 'self-hosted-enterprise') {
        finalCost = finalCost > ENTERPRISE_MINIMUM_PRICING ? finalCost : ENTERPRISE_MINIMUM_PRICING
    } else if (pricingOption === 'cloud-enterprise') {
        finalCost = finalCost > CLOUD_ENTERPRISE_MINIMUM_PRICING ? finalCost : CLOUD_ENTERPRISE_MINIMUM_PRICING
    }

    return Math.round(finalCost)
}

export type PricingOptionType = 'self-hosted' | 'self-hosted-enterprise' | 'cloud' | 'cloud-enterprise'

export const pricingSliderLogic = kea({
    actions: {
        setEventNumber: (value: number) => ({ value }),
        setInputValue: (value: number) => ({ value }),
        setSliderValue: (value: number) => ({ value }),
        setPricingOption: (option: PricingOptionType) => ({ option }),
    },
    reducers: {
        eventNumber: [
            1000000,
            {
                setSliderValue: (_: null, { value }: { value: number }) => Math.round(sliderCurve(value)),
                setInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        sliderValue: [
            1,
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
