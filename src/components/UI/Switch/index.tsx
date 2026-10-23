import React from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cn } from '../../../utils'
import { fieldDivider, focusRing, trackSurface } from '../styles'
import { withClassName } from '../utils'

const Root = withClassName(
    BaseSwitch.Root,
    cn(
        'group relative inline-flex h-7 w-12 shrink-0 cursor-default items-center rounded-[6px] border p-[3px]',
        fieldDivider,
        trackSurface,
        'transition-[background-color,border-color] duration-200 ease-out motion-reduce:transition-none',
        'data-[checked]:border-button data-[checked]:bg-orange data-[checked]:shadow-[inset_0_1px_2px_rgb(0_0_0/0.2)] dark:data-[checked]:border-button-dark dark:data-[checked]:bg-orange dark:data-[checked]:shadow-[inset_0_1px_2px_rgb(0_0_0/0.2)]',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        focusRing
    )
)

const grip = 'block h-2 w-px rounded-full bg-[rgb(var(--border))] dark:bg-black/50'

const raisedFace = (
    <span
        className={cn(
            'absolute inset-x-0 bottom-[2px] top-0 flex items-center justify-center gap-[3px] rounded-[4px] border border-primary bg-primary dark:border-gray dark:bg-[rgb(var(--border))]',
            'transition-transform duration-100 ease-out group-active:translate-y-px group-data-[disabled]:translate-y-0 motion-reduce:transition-none',
            'group-data-[checked]:border-button dark:group-data-[checked]:border-button-dark'
        )}
    >
        <span className={grip} />
        <span className={grip} />
    </span>
)

const Thumb = withClassName(
    BaseSwitch.Thumb,
    cn(
        'relative block h-full w-5 rounded-[4px] bg-[rgb(var(--border))] dark:bg-black/50',
        'transition-transform duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none',
        'data-[checked]:translate-x-5 data-[checked]:bg-button-shadow dark:data-[checked]:bg-button-shadow-dark'
    ),
    { children: raisedFace }
)

export const Switch = { Root, Thumb }
