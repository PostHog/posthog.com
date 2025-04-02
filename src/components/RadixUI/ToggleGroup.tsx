import * as React from 'react'
import { ToggleGroup } from 'radix-ui'
import { IconTextWidth } from '@posthog/icons'
import { IconTextWidthFixed } from 'components/OSIcons'
const toggleGroupItemClasses =
    'flex p-1 aspect-square items-center justify-center bg-white leading-4 text-primary dark:text-primary-dark rounded hover:bg-accent-2 dark:hover:bg-accent-dark focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none data-[state=on]:bg-accent-2 data-[state=on]:bg-accent-2'

const ToggleGroupDemo = () => (
    <ToggleGroup.Root
        className="inline-flex space-x-px rounded p-1 bg-white dark:bg-accent-dark border border-light dark:border-dark"
        type="single"
        defaultValue="center"
        aria-label="Text alignment"
    >
        <ToggleGroup.Item className={toggleGroupItemClasses} value="left" aria-label="Left aligned">
            <IconTextWidthFixed className="size-5 inline-block" />
        </ToggleGroup.Item>
        <ToggleGroup.Item className={toggleGroupItemClasses} value="center" aria-label="Center aligned">
            <IconTextWidth className="size-5" />
        </ToggleGroup.Item>
    </ToggleGroup.Root>
)

export default ToggleGroupDemo
