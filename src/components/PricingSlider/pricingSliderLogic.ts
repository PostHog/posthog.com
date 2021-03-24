import { kea } from 'kea'

export const pricingSliderLogic = kea({
    actions: {
        setSliderValue: (value: number) => ({ value }),
    },
    reducers: {
        sliderValue: [
            250000,
            {
                setSliderValue: (_: null, { value }: { value: number }) => value,
            },
        ],
    },
})
