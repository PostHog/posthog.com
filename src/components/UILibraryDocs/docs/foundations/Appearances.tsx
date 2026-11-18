import React from 'react'
import { Button, ButtonGroup } from 'components/UI/Button'
import type { ButtonAppearance } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const appearances: { appearance: ButtonAppearance; label: string }[] = [
    { appearance: 'flat', label: 'flat · toolbars' },
    { appearance: 'outline', label: 'outline · secondary' },
    { appearance: 'raised', label: 'raised · default' },
]

export default function Appearances(): JSX.Element {
    return (
        <DemoRows>
            {appearances.map(({ appearance, label }) => (
                <DemoRow key={appearance} label={label}>
                    <Button appearance={appearance}>Save</Button>
                    <ButtonGroup appearance={appearance} aria-label={`${appearance} group`}>
                        <Button>Day</Button>
                        <Button>Week</Button>
                        <Button>Month</Button>
                    </ButtonGroup>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
