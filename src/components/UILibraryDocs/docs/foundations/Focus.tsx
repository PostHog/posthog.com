import React from 'react'
import { Button } from 'components/UI/Button'
import { Input } from 'components/UI/Input'
import { ScrollArea } from 'components/UI/ScrollArea'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Focus(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Outside ring">
                <Button>Tab to me</Button>
            </DemoRow>
            <DemoRow label="Field focus">
                <Input aria-label="Field focus" placeholder="Tab into me" className="max-w-xs" />
            </DemoRow>
            <DemoRow label="Inside ring">
                <ScrollArea.Root className="h-20 w-56 rounded-md border border-primary">
                    <ScrollArea.Viewport>
                        <ScrollArea.Content className="p-2 text-sm">
                            A scroll area clips its edges, so its own ring sits inside. Tab to it, then scroll with the
                            arrow keys. The ring stays visible at every edge.
                        </ScrollArea.Content>
                    </ScrollArea.Viewport>
                </ScrollArea.Root>
            </DemoRow>
        </DemoRows>
    )
}
