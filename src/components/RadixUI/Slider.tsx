import * as React from 'react'
import { Slider as RadixSlider } from 'radix-ui'

const SliderDemo = () => (
    <form className="mb-0 flex">
        <RadixSlider.Root
            className="relative flex w-full touch-none select-none items-center"
            defaultValue={[50]}
            max={100}
            step={1}
        >
            <RadixSlider.Track className="relative h-2 grow rounded-full bg-light-4">
                <RadixSlider.Range className="absolute h-full rounded-full bg-light-9" />
            </RadixSlider.Track>
            <RadixSlider.Thumb
                className="block size-4 rounded-full bg-light-10 hover:bg-light-11 focus:bg-light-12 dark:bg-light-3 dark:hover:bg-light-2 dark:focus:bg-light-1 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
                aria-label="Line height"
            />
        </RadixSlider.Root>
    </form>
)

export default SliderDemo
