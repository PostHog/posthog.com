import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Panels from 'components/Scale/Panels'
import Receipt from 'components/Scale/Receipt'
import { formatCount, lineByKey, lines } from 'components/Scale/data'
import { useSwap } from 'components/Scale/useSwap'
import type { LineKey } from 'components/Scale/data'
import { Card } from 'components/UI/Card'
import { Emphasis } from 'components/UI/Emphasis'

const FIRST_TURN_SECONDS = 10
const TURN_SECONDS = 5

export default function ScalePage(): JSX.Element {
    const [selected, setSelected] = useState<LineKey>('rowsRead')
    const [rotating, setRotating] = useState(true)
    const [firstTurn, setFirstTurn] = useState(true)
    const { shown, swapClass } = useSwap(selected)
    const line = lineByKey[shown]
    return (
        <>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap&text=Thank%20you%20for%20your%20data"
                />
            </Helmet>
            <SEO
                title="Scale and reliability - PostHog"
                description="How much data PostHog Cloud handles in a day, and how reliably."
                noindex
            />
            <ReaderView hideLeftSidebar hideRightSidebar showQuestions={false} title="scale" hideTitle>
                <div className="not-prose @container pb-20" data-scheme="primary">
                    <div className="scale-stage mx-auto grid max-w-6xl gap-8 @3xl:grid-cols-[22rem_minmax(0,1fr)] @3xl:grid-rows-[auto_1fr] @3xl:gap-x-10">
                        <header className="flex flex-col gap-6 @3xl:col-start-2 @3xl:row-start-1">
                            <h1 className="m-0 text-[length:clamp(2rem,6cqw,3.25rem)] font-bold leading-[1.15]">
                                Yesterday, we{' '}
                                <span key={`verb-${line.key}`} className={`inline-block ${swapClass}`}>
                                    {line.verb}
                                </span>
                                <span key={`count-${line.key}`} className={`block ${swapClass}`}>
                                    <Emphasis>
                                        {formatCount(line.yesterday)} {line.noun}
                                    </Emphasis>
                                </span>
                            </h1>
                            <p className="m-0 max-w-prose text-lg text-secondary">
                                Don’t believe us? Here’s the receipts of everything that happened yesterday to put that
                                into perspective.
                            </p>
                        </header>
                        <Receipt
                            selected={selected}
                            rotating={rotating}
                            rotateSeconds={firstTurn ? FIRST_TURN_SECONDS : TURN_SECONDS}
                            onSelect={(key) => {
                                setSelected(key)
                                setRotating(false)
                            }}
                            onAdvance={() => {
                                setFirstTurn(false)
                                setSelected(
                                    lines[
                                        (lines.findIndex((candidate) => candidate.key === selected) + 1) % lines.length
                                    ].key
                                )
                            }}
                            className="relative z-10 mx-auto @3xl:col-start-1 @3xl:row-span-2 @3xl:row-start-1 @3xl:mx-0"
                        />
                        <Card.Root
                            appearance="solid"
                            className="min-h-72 @3xl:col-span-2 @3xl:col-start-1 @3xl:row-start-2 @3xl:ml-48 @3xl:self-start @3xl:pl-48"
                        >
                            <Panels shown={shown} swapClass={swapClass} />
                        </Card.Root>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
