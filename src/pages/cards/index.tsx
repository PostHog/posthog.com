import React, { useState } from 'react'
import { HomepageCards } from 'components/NoHatingAllowed/data'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from "components/Logo"
import SEO from "components/seo"

function Slide({ card }: { card: any }) {
    return (
        <div className="flex-1 px-4">
            <div
                className="text-primary flex-1 w-full flex flex-col items-center justify-center p-8 rounded"
                style={{ backgroundColor: card.color }}
            >
                <div className="max-w-2xl flex items-center text-center gap-8">
                    {card.Image && (
                        <div className={`${card.ImageSize || 'h-full'}`}>
                            {card.Image}
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="max-w-sm mx-auto">
                            <h2 className="text-3xl font-bold mb-6 text-balance">
                                <span className="underline underline-offset-4">
                                    {typeof card.top === 'string' ? card.top : card.top}
                                </span>
                            </h2>
                            <p className="text-base text-secondary text-balance">
                                {card.bottom}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Cards() {
    const [slideIndex, setSlideIndex] = useState(0)

    const cards = HomepageCards
    const currentCard = cards[slideIndex]
    const isFirst = slideIndex === 0
    const isLast = slideIndex === cards.length - 1

    return (
        <>
            <SEO
                title="You'll hate PostHog if..."
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Wizard
                leftNavigation={
                    <>
                        {!isFirst ? (
                            <CallToAction type="secondary" size="sm" onClick={() => setSlideIndex(slideIndex - 1)}>
                                Previous
                            </CallToAction>
                        ) : (
                            <span />
                        )}
                    </>
                }
                rightNavigation={
                    <>
                        {isLast ? (
                            <Link to="/" state={{ newWindow: true }}>
                                <CallToAction type="primary" size="sm">
                                    Done
                                </CallToAction>
                            </Link>
                        ) : (
                            <CallToAction type="primary" size="sm" onClick={() => setSlideIndex(slideIndex + 1)}>
                                Next
                            </CallToAction>
                        )}
                    </>
                }
            >
                <ScrollArea className="flex-1 w-full [&>div>div]:h-full [&>div>div]:!flex [&>div>div]:flex-col [&>div>div]:py-4">
                    <header className="pb-4">
                        <h1 className="text-2xl flex items-center justify-center gap-2">You'll hate <Logo /> if...</h1>
                    </header>
                    <Slide card={currentCard} />
                </ScrollArea>
            </Wizard>
        </>
    )
}
