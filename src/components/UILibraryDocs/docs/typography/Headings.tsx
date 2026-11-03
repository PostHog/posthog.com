import React from 'react'
import { Heading } from 'components/UI/Typography'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Headings(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="level 1 · title">
                <Heading level={1}>Session replay</Heading>
            </DemoRow>
            <DemoRow label="level 2 · lg">
                <Heading level={2}>Get started</Heading>
            </DemoRow>
            <DemoRow label="level 3 · md">
                <Heading level={3}>Install the snippet</Heading>
            </DemoRow>
            <DemoRow label="level 4 · sm">
                <Heading level={4}>Requirements</Heading>
            </DemoRow>
            <DemoRow label="level 2 · display">
                <Heading level={2} size="display">
                    Ship faster
                </Heading>
            </DemoRow>
        </DemoRows>
    )
}
