import { kea } from 'kea'
import { SCALE_MINIMUM_EVENTS, SCALE_MINIMUM_PRICING } from '../constants'
import { sliderCurve } from './LogSlider'

export type PricingOptionType = 'vpc' | 'self-hosted' | 'cloud'

export const pricingSliderLogic = kea({
    actions: {
        setSliderValue: (value: number) => ({ value }),
        setPricingOption: (option: PricingOptionType) => ({ option }),
        setAdditionalUnitPrice: (value: number) => ({ value }),
    },
    reducers: {
        eventNumber: [
            SCALE_MINIMUM_EVENTS,
            {
                setSliderValue: (_: null, { value }: { value: number }) => Math.round(sliderCurve(value)),
            },
        ],
        sliderValue: [
            0,
            {
                setSliderValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        pricingOption: [
            'self-hosted',
            {
                setPricingOption: (_: null, { option }: { option: string }) => option,
            },
        ],
        additionalUnitPrice: [
            0.000225,
            {
                setAdditionalUnitPrice: (_: null, { value }: { value: number }) => value,
            },
        ],
    },
    selectors: ({ actions }) => ({
        finalCost: [
            (s) => [s.eventNumber, s.pricingOption],
            (eventNumber: number, pricingOption: PricingOptionType) => {
                let finalCost = 0
                let unitPricing = 0.000225
                if (pricingOption === 'self-hosted') {
                    const estimatedCost = eventNumber * unitPricing
                    finalCost = estimatedCost > SCALE_MINIMUM_PRICING ? estimatedCost : SCALE_MINIMUM_PRICING

                    if (eventNumber >= 10_000_000 && eventNumber < 100_000_000) {
                        unitPricing = 0.000045
                        finalCost = 10_000_000 * 0.000225 + (eventNumber - 10_000_000) * unitPricing
                    } else if (eventNumber >= 100_000_000) {
                        unitPricing = 0.000009
                        finalCost =
                            10_000_000 * 0.000225 + 90_000_000 * 0.000045 + (eventNumber - 100_000_000) * unitPricing
                    }

                    actions.setAdditionalUnitPrice(unitPricing)
                    return Math.round(finalCost).toLocaleString()
                }

                // Cloud
                if (eventNumber > 1_000_000 && eventNumber <= 10_000_000) {
                    unitPricing = 0.000225
                    finalCost = (eventNumber - 1_000_000) * unitPricing
                } else if (eventNumber > 10_000_000 && eventNumber <= 100_000_000) {
                    unitPricing = 0.000075
                    finalCost = 9_000_000 * 0.000225 + (eventNumber - 10_000_000) * unitPricing
                } else if (eventNumber > 100_000_000) {
                    unitPricing = 0.000075
                    finalCost = 9_000_000 * 0.000225 + 90_000_000 * 0.000075 + (eventNumber - 100_000_000) * unitPricing
                }
                actions.setAdditionalUnitPrice(unitPricing)
                return Math.round(finalCost).toLocaleString()
            },
        ],
    }),
})
