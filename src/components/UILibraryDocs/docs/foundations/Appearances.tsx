import React from 'react'
import { Button, ButtonGroup } from 'components/UI/Button'
import type { ButtonAppearance } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const appearances: ButtonAppearance[] = ['flat', 'outline', 'raised']

export default function Appearances(): JSX.Element {
    return (
        <DemoRows>
            {appearances.map((appearance) => (
                <DemoRow key={appearance} label={appearance}>
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
