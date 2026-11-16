import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Collapsible } from 'components/UI/Collapsible'

export default function CollapsibleControlled(): JSX.Element {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex max-w-md flex-col gap-3">
            <Button size="sm" className="self-start" onClick={() => setOpen(!open)}>
                {open ? 'Hide' : 'Show'} event properties
            </Button>
            <Collapsible.Root open={open} onOpenChange={setOpen}>
                <Collapsible.Trigger>Event properties</Collapsible.Trigger>
                <Collapsible.Panel>
                    <p>Each event has a timestamp, a distinct ID, and the properties that you send with it.</p>
                </Collapsible.Panel>
            </Collapsible.Root>
        </div>
    )
}
