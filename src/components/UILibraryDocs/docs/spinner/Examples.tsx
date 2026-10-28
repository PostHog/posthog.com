import React from 'react'
import { Spinner } from 'components/UI/Spinner'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Examples(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="sm · 14px">
                <Spinner size="sm" label="Loading insights" />
            </DemoRow>
            <DemoRow label="md · 16px">
                <Spinner size="md" label="Loading insights" />
            </DemoRow>
            <DemoRow label="lg · 20px">
                <Spinner size="lg" label="Loading insights" />
            </DemoRow>
            <DemoRow label="Text color">
                <span className="flex items-center gap-2 text-brand-cobalt-darker dark:text-brand-cobalt-lighter">
                    <Spinner size="md" label="Loading replays" />
                    Loading replays
                </span>
            </DemoRow>
        </DemoRows>
    )
}
