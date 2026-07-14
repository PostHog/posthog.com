import React, { forwardRef } from 'react'

export const spotlightOptionId = (scope: 'result' | 'filter', index: number): string =>
    `spotlight-${scope}-option-${index}`

type SpotlightRowProps = {
    id: string
    icon: React.ReactNode
    selected: boolean
    children: React.ReactNode
    trailing?: React.ReactNode
    onActive: () => void
    onSelect: () => void
}

const SpotlightRow = forwardRef<HTMLLIElement, SpotlightRowProps>(function SpotlightRow(
    { id, icon, selected, children, trailing, onActive, onSelect },
    ref
) {
    return (
        <li
            ref={ref}
            id={id}
            role="option"
            aria-selected={selected}
            onMouseMove={onActive}
            onClick={onSelect}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${
                selected ? 'bg-accent ring-1 ring-inset ring-border' : 'bg-primary'
            }`}
        >
            <div
                data-scheme="secondary"
                className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary text-secondary [&_svg]:size-4"
            >
                {icon}
            </div>
            {children}
            {trailing}
        </li>
    )
})

export default SpotlightRow
