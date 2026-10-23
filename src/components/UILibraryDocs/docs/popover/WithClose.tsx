import React from 'react'
import { Button } from 'components/UI/Button'
import { Popover } from 'components/UI/Popover'

export default function PopoverWithClose(): JSX.Element {
    return (
        <Popover.Root>
            <Popover.Trigger render={<Button />}>New feature</Popover.Trigger>
            <Popover.Popup align="start" className="flex w-72 flex-col gap-1">
                <Popover.Title>Session replay is on</Popover.Title>
                <Popover.Description>
                    This project now records sessions. Watch them in the replay tab.
                </Popover.Description>
                <div className="mt-2 flex justify-end">
                    <Popover.Close render={<Button size="sm" variant="primary" />}>Got it</Popover.Close>
                </div>
            </Popover.Popup>
        </Popover.Root>
    )
}
