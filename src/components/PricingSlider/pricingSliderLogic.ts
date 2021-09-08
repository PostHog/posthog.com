import { kea } from 'kea'
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
            8000000,
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
            (eventNumber: number, pricingOption: PricingOption) => {
                if (pricingOption === 'self-hosted') {
                    let unitPricing = 0.000225

                    const estimatedCost = eventNumber * unitPricing
                    let finalCost = estimatedCost > 2000 ? estimatedCost : 2000

                    if (eventNumber >= 10_000_000 && eventNumber < 100_000_000) {
                        unitPricing = 0.000045
                        finalCost = 10_000_000 * 0.000225 + (eventNumber - 10_000_000) * 0.000045
                    } else if (eventNumber >= 100000000) {
                        unitPricing = 0.000009
                        finalCost =
                            10_000_000 * 0.000225 + 90_000_000 * 0.000045 + (eventNumber - 100_000_000) * 0.000009
                    }

                    actions.setAdditionalUnitPrice(unitPricing)
                    return Math.round(finalCost).toLocaleString()
                }

                // Cloud
                const billableEvents = eventNumber - 1000000 > 0 ? eventNumber - 1000000 : 0
                return Math.round(billableEvents * 0.000225).toLocaleString()
            },
        ],
    }),
})
