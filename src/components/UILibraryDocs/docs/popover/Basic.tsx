import React from 'react'
import { IconInfo } from '@posthog/icons'
import { Button } from 'components/UI/Button'
import { Popover } from 'components/UI/Popover'

export default function PopoverBasic(): JSX.Element {
    return (
        <Popover.Root>
            <Popover.Trigger render={<Button icon={<IconInfo />} />}>What is this?</Popover.Trigger>
            <Popover.Popup className="w-72">
                <Popover.Arrow />
                <Popover.Title>Feature flags</Popover.Title>
                <Popover.Description>
                    Roll out features to specific users or groups, and roll them back without a deploy.
                </Popover.Description>
            </Popover.Popup>
        </Popover.Root>
    )
}
