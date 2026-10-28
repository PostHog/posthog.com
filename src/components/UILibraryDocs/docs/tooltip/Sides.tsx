import React from 'react'
import { Button } from 'components/UI/Button'
import { Tooltip } from 'components/UI/Tooltip'

export default function TooltipSides(): JSX.Element {
    return (
        <Tooltip.Provider>
            <div className="flex flex-wrap justify-center gap-2 py-8">
                {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                    <Tooltip.Root key={side}>
                        <Tooltip.Trigger render={<Button />}>{side}</Tooltip.Trigger>
                        <Tooltip.Popup side={side}>Tooltip on the {side}</Tooltip.Popup>
                    </Tooltip.Root>
                ))}
            </div>
        </Tooltip.Provider>
    )
}
