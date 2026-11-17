import React from 'react'
import { Button } from 'components/UI/Button'
import { Toggle, ToggleGroup } from 'components/UI/Toggle'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function States(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Hover and press">
                <Button appearance="flat">Hover me</Button>
                <Button appearance="outline">Press me</Button>
            </DemoRow>
            <DemoRow label="Latched">
                <ToggleGroup appearance="flat" defaultValue={['week']} aria-label="Range">
                    <Toggle value="day">Day</Toggle>
                    <Toggle value="week">Week</Toggle>
                    <Toggle value="month">Month</Toggle>
                </ToggleGroup>
            </DemoRow>
        </DemoRows>
    )
}
