import React from 'react'
import { Toolbar } from 'components/UI/Toolbar'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const appearances = [
    { appearance: 'raised', label: 'raised · on window' },
    { appearance: 'outlined', label: 'outlined · flat region' },
    { appearance: 'plain', label: 'plain · in a card' },
] as const

export default function Surfaces(): JSX.Element {
    return (
        <DemoRows>
            {appearances.map(({ appearance, label }) => (
                <DemoRow key={appearance} label={label}>
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
