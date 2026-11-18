import React from 'react'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Headings(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="h2 · text-2xl font-bold">
                <h2 className="m-0 text-2xl font-bold">Get started</h2>
            </DemoRow>
            <DemoRow label="h3 · text-xl font-bold">
                <h3 className="m-0 text-xl font-bold">Install the snippet</h3>
            </DemoRow>
            <DemoRow label="h3 · text-15 font-semibold">
                <h3 className="m-0 text-15 font-semibold">Weekly product report</h3>
            </DemoRow>
            <DemoRow label="h2 · no size class">
                <h2 className="m-0">Takes the size of the text around it</h2>
            </DemoRow>
        </DemoRows>
    )
}
