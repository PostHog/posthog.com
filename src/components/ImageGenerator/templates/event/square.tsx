import React from 'react'
import type { GeneratorState } from '../../types'
import { CalendarTile, ImageSlot, LogoRow, TextBlock, TitleBlock, themeBgStyle } from './EventBase'

export default function EventSquare({ state }: { state: GeneratorState }) {
    return (
        <div className="w-full h-full relative flex flex-col items-center text-light p-20" style={themeBgStyle(state)}>
            {state.event?.showCalendar && <CalendarTile date={state.event.date} />}

            <div className="flex flex-col items-center w-full mt-8">
                <TitleBlock state={state} sizePx={88} />
                <TextBlock state={state} sizePx={36} />
            </div>

            <div className="flex-1 flex items-center justify-center w-full my-10">
                <ImageSlot state={state} defaultMaxHeight={420} />
            </div>

            <LogoRow state={state} />
        </div>
    )
}
