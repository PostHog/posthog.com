import React from 'react'
import { IconTextWidth } from '@posthog/icons'
import { IconTextWidthFixed } from 'components/OSIcons'
import { ToggleGroup as RadixToggleGroup } from 'radix-ui'

const toggleGroupItemClasses =
    'flex p-1 aspect-square items-center justify-center bg-white leading-4 text-primary dark:text-primary-dark rounded hover:bg-accent-2 dark:hover:bg-accent-dark focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none data-[state=on]:bg-accent-2 data-[state=on]:bg-accent-2'

export const ToggleGroup = ({ title }: { title: string }) => (
    <RadixToggleGroup.Root
        className="inline-flex space-x-px rounded p-1 bg-white dark:bg-accent-dark border border-light dark:border-dark"
        type="single"
        defaultValue="fixed"
        aria-label={title}
    >
        <RadixToggleGroup.Item className={toggleGroupItemClasses} value="fixed" aria-label="Fixed width">
            <IconTextWidthFixed className="size-5 inline-block" />
        </RadixToggleGroup.Item>
        <RadixToggleGroup.Item className={toggleGroupItemClasses} value="full" aria-label="Full width">
            <IconTextWidth className="size-5" />
        </RadixToggleGroup.Item>
    </RadixToggleGroup.Root>
)
