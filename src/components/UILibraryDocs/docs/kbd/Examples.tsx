import React from 'react'
import { Kbd } from 'components/UI/Kbd'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Examples(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Single keys">
                <Kbd size="sm">K</Kbd>
                <Kbd>Enter</Kbd>
            </DemoRow>
            <DemoRow label="Mac shortcut">
                <Kbd.Shortcut keys={['meta', 'shift', 'k']} />
            </DemoRow>
            <DemoRow label="Windows shortcut">
                <Kbd.Shortcut keys={['meta', 'alt', 'arrowright']} platform="other" />
            </DemoRow>
        </DemoRows>
    )
}
