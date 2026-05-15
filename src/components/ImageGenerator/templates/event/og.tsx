import React from 'react'
import type { GeneratorState } from '../../types'
import { getThemeForeground } from '../../themes'
import { CalendarTile, ImageSlot, LogoBar, TextBlock, TitleBlock, themeBgStyle } from './EventBase'

const ACCENT_RED = '#F54E00'
const OG_OVERLAY_HEIGHT = 96

export default function EventOG({ state }: { state: GeneratorState }) {
    const fg = getThemeForeground(state.theme)
    return (
        <div className="w-full h-full relative overflow-hidden" style={{ ...themeBgStyle(state), color: fg }}>
            <CalendarTile date={state.event?.date} accentHex={ACCENT_RED} style={{ top: 32, right: 32, width: 110 }} />

            <ImageSlot
                state={state}
                defaultHeight={560}
                rightOffset={-80}
                bottomOffset={0}
                nameBadgeBottom={OG_OVERLAY_HEIGHT + 20}
                nameBadgeRight={40}
                nameBadgeSizes={{ name: 26, role: 22 }}
            />

            <div className="absolute inset-0 flex flex-col p-12">
                <TitleBlock state={state} sizePx={88} color={fg} />
                <TextBlock state={state} sizePx={28} color={fg} />
                {state.logoPlacement === 'inline' && <LogoBar state={state} overlayHeight={OG_OVERLAY_HEIGHT} />}
            </div>

            {state.logoPlacement === 'overlay' && <LogoBar state={state} overlayHeight={OG_OVERLAY_HEIGHT} />}
        </div>
    )
}
