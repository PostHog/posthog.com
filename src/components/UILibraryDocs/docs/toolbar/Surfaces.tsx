import React from 'react'
import { Toolbar } from 'components/UI/Toolbar'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Surfaces(): JSX.Element {
    return (
        <DemoRows>
            {(['raised', 'outlined', 'plain'] as const).map((appearance) => (
                <DemoRow key={appearance} label={appearance}>
                    <Toolbar.Root appearance={appearance} aria-label={`${appearance} insight controls`}>
                        <Toolbar.Button>Save insight</Toolbar.Button>
                        <Toolbar.Button>Export</Toolbar.Button>
                        <Toolbar.Separator />
                        <Toolbar.Input
                            aria-label="Insight name"
                            defaultValue="Weekly active users"
                            className="min-w-0 w-40"
                        />
                    </Toolbar.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
