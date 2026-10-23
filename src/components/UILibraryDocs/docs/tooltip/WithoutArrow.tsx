import React from 'react'
import { Tooltip } from 'components/UI/Tooltip'
import { Button } from 'components/UI/Button'

export default function WithoutArrow(): JSX.Element {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger render={<Button />}>Save insight</Tooltip.Trigger>
            <Tooltip.Popup showArrow={false}>Save this insight to your dashboard</Tooltip.Popup>
        </Tooltip.Root>
    )
}
