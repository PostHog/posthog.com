import React from 'react'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const tile =
    'flex h-12 w-28 items-center justify-center border border-primary bg-white/60 text-xs text-secondary dark:bg-white/[0.06]'

export default function Radius(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="4px">
                <div className={`${tile} rounded-[4px]`}>sm controls</div>
            </DemoRow>
            <DemoRow label="6px">
                <div className={`${tile} rounded-[6px]`}>md, lg controls</div>
            </DemoRow>
            <DemoRow label="8px">
                <div className={`${tile} rounded-[8px]`}>Cards, sections</div>
            </DemoRow>
            <DemoRow label="Full">
                <div className={`${tile} rounded-full`}>Chips, pills</div>
            </DemoRow>
        </DemoRows>
    )
}
