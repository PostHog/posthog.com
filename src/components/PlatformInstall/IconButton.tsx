import React from 'react'
import ZoomHover from 'components/ZoomHover'
import Tooltip from 'components/RadixUI/Tooltip'
import { cn } from '../../utils'

export interface IconButtonProps {
    label: string
    icon: React.ReactNode
    selected: boolean
    onClick: () => void
    /** Show the label inline with an animated reveal when selected */
    showLabelWhenSelected?: boolean
    /** Tooltip side */
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left'
    /** Disable the wrapping tooltip when the label is already visible */
    suppressTooltipWhenSelected?: boolean
    className?: string
}

export default function IconButton({
    label,
    icon,
    selected,
    onClick,
    showLabelWhenSelected = true,
    tooltipSide = 'top',
    suppressTooltipWhenSelected = true,
    className = '',
}: IconButtonProps): JSX.Element {
    const button = (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            aria-label={label}
            className={cn(
                'inline-flex items-center rounded px-1 py-px cursor-pointer border border-b-2',
                selected ? 'border-primary bg-primary' : 'border-transparent hover:border-primary hover:bg-primary',
                className
            )}
        >
            <span className="inline-flex items-center justify-center shrink-0 p-px size-[18px]">{icon}</span>
            {showLabelWhenSelected && (
                <span
                    aria-hidden={!selected}
                    className={cn(
                        'overflow-hidden whitespace-nowrap inline-block transition-[max-width] duration-300 ease-in-out',
                        selected ? 'max-w-[100px]' : 'max-w-[0px]'
                    )}
                >
                    <span className="pl-1.5 pr-0.5 text-sm font-semibold text-primary">{label}</span>
                </span>
            )}
        </button>
    )

    return (
        <Tooltip
            trigger={<ZoomHover size="sm">{button}</ZoomHover>}
            side={tooltipSide}
            delay={150}
            open={selected && suppressTooltipWhenSelected ? false : undefined}
        >
            {label}
        </Tooltip>
    )
}
