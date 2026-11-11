import React from 'react'
import { grainSurface, sectionSurface } from 'components/UI/styles'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const tile =
    'flex h-20 w-48 items-center justify-center rounded-[8px] bg-white/60 text-sm text-secondary dark:bg-white/[0.06]'

export default function Grain(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="With grain">
                <div className={`${grainSurface} ${sectionSurface} ${tile}`}>Cards, popups, glass</div>
            </DemoRow>
            <DemoRow label="Without grain">
                <div className={`${sectionSurface} ${tile}`}>Fields, tracks, labels</div>
            </DemoRow>
        </DemoRows>
    )
}
