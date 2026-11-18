import React from 'react'
import { Button } from 'components/UI/Button'
import { Tooltip } from 'components/UI/Tooltip'

const OPEN_DELAY_MS = 600

export default function TooltipDelay(): JSX.Element {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger delay={OPEN_DELAY_MS} render={<Button />}>
                Hover and wait
            </Tooltip.Trigger>
            <Tooltip.Popup>Opens after {OPEN_DELAY_MS} ms</Tooltip.Popup>
        </Tooltip.Root>
    )
}
