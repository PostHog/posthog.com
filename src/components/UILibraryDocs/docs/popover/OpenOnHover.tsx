import React from 'react'
import { IconInfo } from '@posthog/icons'
import { Button } from 'components/UI/Button'
import { Popover } from 'components/UI/Popover'

export default function PopoverOpenOnHover(): JSX.Element {
    return (
        <Popover.Root>
            <Popover.Trigger openOnHover delay={300} render={<Button icon={<IconInfo />} />}>
                Plan limits
            </Popover.Trigger>
            <Popover.Popup className="w-72">
                <Popover.Arrow />
                <Popover.Title>Free plan</Popover.Title>
                <Popover.Description>
                    1 million events and 5,000 recordings each month. Hover, click, or tap the button to see this.
                </Popover.Description>
            </Popover.Popup>
        </Popover.Root>
    )
}
