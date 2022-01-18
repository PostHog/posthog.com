import { kea } from 'kea'
import { SCALE_MINIMUM_EVENTS, SCALE_MINIMUM_PRICING } from '../constants'
import { sliderCurve } from './LogSlider'

export type PricingOptionType = 'self-hosted' | 'cloud'

export const pricingSliderLogic = kea({
    actions: {
        setSliderValue: (value: number) => ({ value }),
        setPricingOption: (option: PricingOptionType) => ({ option }),
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
    },
    selectors: () => ({
        finalCost: [
            (s) => [s.eventNumber, s.pricingOption],
            (eventNumber: number, pricingOption: PricingOptionType) => {
                let finalCost = 0
                let alreadyCountedEvents = 0

                const thresholdPrices =
                    pricingOption === 'self-hosted'
                        ? [
                              [10_000_000, 0.000225],
                              [100_000_000, 0.000045],
                              [Number.MAX_SAFE_INTEGER, 0.000009],
                          ]
                        : [
                              [1_000_000, 0],
                              [10_000_000, 0.000225],
                              [100_000_000, 0.000075],
                              [Number.MAX_SAFE_INTEGER, 0.000025],
                          ]
                console.log('-----------------------------')
                for (const [threshold, unitPricing] of thresholdPrices) {
                    console.log(
                        threshold,
                        unitPricing,
                        Math.max(0, Math.min(eventNumber - alreadyCountedEvents, threshold - alreadyCountedEvents))
                    )
                    finalCost =
                        finalCost +
                        Math.max(0, Math.min(eventNumber - alreadyCountedEvents, threshold - alreadyCountedEvents)) *
                            unitPricing
                    alreadyCountedEvents = threshold
                }

                if (pricingOption === 'self-hosted') {
                    finalCost = finalCost > SCALE_MINIMUM_PRICING ? finalCost : SCALE_MINIMUM_PRICING
                }

                return Math.round(finalCost).toLocaleString()
            },
        ],
    }),
})
