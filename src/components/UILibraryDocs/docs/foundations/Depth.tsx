import React from 'react'
import { Card } from 'components/UI/Card'
import { controlSurface, popupSurface, sectionSurface } from 'components/UI/styles'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const tile = 'flex h-14 w-40 items-center justify-center text-sm text-secondary'

export default function Depth(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Sunken">
                <div className={`${controlSurface} ${tile} rounded-md`}>Field, track</div>
            </DemoRow>
            <DemoRow label="Flat">
                <div className={`${sectionSurface} ${tile}`}>Outlined section</div>
            </DemoRow>
            <DemoRow label="Raised">
                <Card.Root padding="none" className={tile}>
                    Card
                </Card.Root>
            </DemoRow>
            <DemoRow label="Floating">
                <div className={`${popupSurface} ${tile}`}>Popover, menu</div>
            </DemoRow>
        </DemoRows>
    )
}
