import React from 'react'
import { Headline, ReceiptCard } from './sections'
import Conveyor from './visual/Conveyor'

export default function Hero(): JSX.Element {
    return (
        <div className="grid gap-8">
            <ReceiptCard className="order-last z-10 mx-auto @3xl:order-none @3xl:mx-0 @3xl:rotate-1 @3xl:self-start @3xl:justify-self-end @3xl:[grid-area:1/1]" />
            <div className="flex min-w-0 flex-col gap-8 @3xl:[grid-area:1/1]">
                <div className="@3xl:pr-[26rem]">
                    <Headline />
                </div>
                <Conveyor inset={416} />
            </div>
        </div>
    )
}
