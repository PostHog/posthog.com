import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { Emphasis } from 'components/UI/Emphasis'
import Panels from 'components/Scale/Panels'
import Receipt from 'components/Scale/Receipt'
import Reliability from 'components/Scale/Reliability'
import { ScaleDataContext, formatCount, inSentence, lines, useScaleData } from 'components/Scale/data'
import { useSwap } from 'components/Scale/useSwap'
import type { LineKey, ScaleData } from 'components/Scale/data'

const FIRST_TURN_SECONDS = 10
const TURN_SECONDS = 5

function lineAfter(key: LineKey): LineKey {
    return lines[(lines.findIndex((line) => line.key === key) + 1) % lines.length].key
}

function ScaleContent(): JSX.Element {
    const { relativeDay, totals } = useScaleData()
    const [selected, setSelected] = useState<LineKey>('rowsRead')
    const [rotating, setRotating] = useState(true)
    const [firstTurn, setFirstTurn] = useState(true)
    const { shown, swapClass } = useSwap(selected)
    const next = lineAfter(selected)
    const select = (key: LineKey) => {
        setSelected(key)
        setRotating(false)
    }
    return (
        <div className="scale-stage mx-auto grid max-w-6xl [--scale-accent:theme(colors.brand.yellow.DEFAULT)] [--scale-accent-2:theme(colors.brand.blue.DEFAULT)] grid-cols-[minmax(0,1fr)] gap-8 @3xl:grid-cols-[22rem_minmax(0,1fr)] @3xl:grid-rows-[auto_1fr] @3xl:gap-x-10">
            <h1 className="m-0 text-3xl font-bold @3xl:hidden">{relativeDay} at PostHog:</h1>
            <header className="hidden flex-col gap-6 @container @3xl:col-start-2 @3xl:row-start-1 @3xl:flex">
                <h1 className="m-0 grid text-[1.75rem] font-bold leading-[1.15] @[26.5rem]:text-[2rem] @[30rem]:text-[2.25rem] @[36.5rem]:text-[2.75rem] @[43rem]:text-[3.25rem]">
                    {lines.map((line) => {
                        const active = line.key === shown
                        const swap = active ? swapClass : ''
                        return (
                            <span
                                key={line.key}
                                className={`[grid-area:1/1] whitespace-nowrap ${active ? '' : 'invisible'}`}
                            >
                                {relativeDay}, we <span className={`inline-block ${swap}`}>{line.verb}</span>
                                <span className={`block ${swap}`}>
                                    <Emphasis>
                                        {formatCount(totals[line.key])} {line.noun}
                                    </Emphasis>
                                </span>
                            </span>
                        )
                    })}
                </h1>
                <p className="m-0 max-w-prose text-lg text-secondary">
                    Don’t believe us? Here’s the receipts of everything that happened {inSentence(relativeDay)} to put
                    that into perspective.
                </p>
            </header>
            <Receipt
                selected={selected}
                rotating={rotating}
                rotateSeconds={firstTurn ? FIRST_TURN_SECONDS : TURN_SECONDS}
                onSelect={select}
                onAdvance={() => {
                    setFirstTurn(false)
                    setSelected(next)
                }}
                className="relative z-10 hidden @3xl:col-start-1 @3xl:block @3xl:row-span-2 @3xl:row-start-1"
            />
            <Panels
                shown={shown}
                next={next}
                swapClass={swapClass}
                onNext={() => select(next)}
                className="@3xl:col-span-2 @3xl:col-start-1 @3xl:row-start-2 @3xl:ml-48 @3xl:self-start"
            />
        </div>
    )
}

export default function ScalePage({ data }: { data: { scaleData: ScaleData | null } }): JSX.Element {
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
                    {data.scaleData ? (
                        <ScaleDataContext.Provider value={data.scaleData}>
                            <ScaleContent />
                        </ScaleDataContext.Provider>
                    ) : (
                        <p className="mx-auto max-w-prose text-secondary">
                            The numbers for this page are not available in this build.
                        </p>
                    )}
                    <Reliability />
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    {
        scaleData {
            dayLabel
            relativeDay
            totals {
                rowsRead
                events
                logs
                flags
                mcp
                reports
                salesCalls
            }
            rowsReadSeries
            queryDurations {
                queries
                medianMs
                shareUnderOneSecond
                counts
            }
            logOrgSizes {
                orgs
                shares
            }
            mcpClients {
                label
                share
            }
            status {
                polledAt
                captureErrorPeakPercent
                eventLag {
                    hours
                    median
                    p99
                }
                flagResponse {
                    hours
                    median
                    p99
                }
            }
        }
    }
`
