import React from 'react'
import type { GeneratorState } from '../../types'
import { CalendarTile, ImageSlot, LogoRow, TextBlock, TitleBlock, themeBgStyle } from './EventBase'

export default function EventOG({ state }: { state: GeneratorState }) {
    return (
        <div className="w-full h-full relative flex items-stretch text-light" style={themeBgStyle(state)}>
            {state.event?.showCalendar && <CalendarTile date={state.event.date} />}

            <div className="flex-1 flex flex-col justify-center p-16 max-w-[60%]">
                <TitleBlock state={state} sizePx={64} />
                <TextBlock state={state} sizePx={26} />
                {state.logoPlacement === 'inline' && (
                    <div className="mt-10">
                        <LogoRow state={state} />
                    </div>
                )}
            </div>

            <div className="flex-1 flex items-center justify-center p-12">
                <ImageSlot state={state} defaultMaxHeight={420} />
            </div>

            {state.logoPlacement === 'overlay' && <LogoRow state={state} />}
        </div>
    )
}
