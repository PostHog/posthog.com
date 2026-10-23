import React from 'react'
import { IconGraph, IconCart } from '@posthog/icons'
import { Card } from 'components/UI/Card'
import { Button } from 'components/UI/Button'
import { Snippet } from 'components/UI/Snippet'

export default function Bars(): JSX.Element {
    return (
        <div className="grid gap-4 @2xl:grid-cols-2">
            <Card.Root variant="solid">
                <Card.TitleBar icon={<IconCart className="text-red" />} meta="cart 0">
                    Your product
                </Card.TitleBar>
                <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-semibold">Hogzilla sticker</span>
                    <span className="text-sm text-secondary">Matte, glossy, or holographic.</span>
                </div>
                <div>
                    <Button variant="primary" size="sm">
                        Add to cart
                    </Button>
                </div>
                <Card.StatusBar>
                    <Snippet.Inline>posthog.capture()</Snippet.Inline>
                    <span>8 events</span>
                </Card.StatusBar>
            </Card.Root>
            <Card.Root>
                <Card.TitleBar icon={<IconGraph className="text-blue" />} meta="8 events by type">
                    Ingestion
                </Card.TitleBar>
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-sm">
                    {[
                        ['click', 5],
                        ['$pageview', 2],
                        ['$rageclick', 1],
                    ].map(([event, count]) => (
                        <li key={event} className="flex justify-between">
                            <span className="font-code">{event}</span>
                            <span className="tabular-nums text-secondary">{count}</span>
                        </li>
                    ))}
                </ul>
            </Card.Root>
        </div>
    )
}
