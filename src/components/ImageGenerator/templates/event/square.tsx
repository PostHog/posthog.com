import React from 'react'
import type { GeneratorState } from '../../types'
import { getThemeForeground } from '../../themes'
import { CalendarTile, ImageSlot, LogoBar, OVERLAY_BAR_HEIGHT, TextBlock, TitleBlock, themeBgStyle } from './EventBase'

const ACCENT_RED = '#F54E00'

export default function EventSquare({ state }: { state: GeneratorState }) {
    const fg = getThemeForeground(state.theme)
    return (
        <div className="w-full h-full relative overflow-hidden" style={{ ...themeBgStyle(state), color: fg }}>
            <CalendarTile date={state.event?.date} accentHex={ACCENT_RED} />

            <ImageSlot
                state={state}
                defaultHeight={1050}
                rightOffset={-120}
                bottomOffset={0}
                nameBadgeBottom={OVERLAY_BAR_HEIGHT + 32}
                nameBadgeRight={56}
                nameBadgeSizes={{ name: 38, role: 34 }}
            />

            <div className="absolute inset-0 flex flex-col p-16">
                <TitleBlock state={state} sizePx={150} color={fg} />
                <TextBlock state={state} sizePx={46} color={fg} />
                {state.logoPlacement === 'inline' && <LogoBar state={state} />}
            </div>

            {state.logoPlacement === 'overlay' && <LogoBar state={state} />}
        </div>
    )
}
