import React, { useState } from 'react'
import { HomepageCards } from 'components/NoHatingAllowed/data'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'
import SEO from 'components/seo'
import OSButton from 'components/OSButton'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

import SuggestedLinksBlock from 'components/SuggestedLinksBlock'

const FinalSlide = () => (
    <div className="flex-1 px-4">
        <div className="text-primary flex-1 w-full h-full flex flex-col items-center justify-center">
            <div className="max-w-2xl text-center">
                <h2 className="text-4xl font-bold mb-6">Congrats, you survived!</h2>
                <p className="text-secondary">
                    <strong>Thanks for joining us on this journey of SaaS monotony.</strong> If you were triggered by
                    any of these classic sales tactics, then maybe PostHog is right for you after all.
                </p>
                <p className="text-secondary text-sm mt-4">If you enjoyed this, you might also like:</p>

                <SuggestedLinksBlock links={["sales", "pricing", "careers"]} />
            </div>
        </div>
    </div>
)

function Slide({ card, slideIndex }: { card: any; slideIndex: number }) {
    return (
        <div className="flex-1 px-4 relative">
            <div className="absolute top-2 right-6 text-sm text-secondary">
                {slideIndex + 1} / {HomepageCards.length}
            </div>
            <div
                className="text-primary flex-1 w-full h-full flex flex-col items-center justify-center p-8 rounded"
                style={{ backgroundColor: card.color }}
            >
                <div className="max-w-2xl flex flex-col @md:flex-row items-center text-center gap-8">
                    {card.Image && <div className={`${card.ImageSize || 'h-full'}`}>{card.Image}</div>}
                    <div className="flex-1">
                        <div className="max-w-sm mx-auto">
                            <h2 className="text-3xl font-bold mb-6 text-balance">
                                <span className="underline underline-offset-4">
                                    {typeof card.top === 'string' ? card.top : card.top}
                                </span>
                            </h2>
                            <p className="text-base text-secondary text-balance">{card.bottom}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Ick() {
    const [slideIndex, setSlideIndex] = useState(0)

    const cards = HomepageCards
    const totalSlides = cards.length + 1 // +1 for the final custom slide
    const isFirst = slideIndex === 0
    const isLast = slideIndex === totalSlides - 1
    const isFinalSlide = slideIndex === cards.length

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
                            <OSButton asLink to="/demo" variant="primary" size="md" state={{ newWindow: true }}>
                                Watch a demo
                            </OSButton>
                        ) : (
                            <CallToAction type="primary" size="sm" onClick={() => setSlideIndex(slideIndex + 1)}>
                                Next
                            </CallToAction>
                        )}
                    </>
                }
            >
                <ScrollArea className="flex-1 w-full [&>div>div]:h-full [&>div>div]:!flex [&>div>div]:flex-col [&>div>div]:py-4">
                    {!isFinalSlide && (
                        <header className="pb-4">
                            <h1 className="text-2xl flex items-center justify-center gap-2">
                                You'll hate <Logo className="relative -top-px" /> if...
                            </h1>
                        </header>
                    )}
                    {isFinalSlide ? <FinalSlide /> : <Slide card={cards[slideIndex]} slideIndex={slideIndex} />}
                </ScrollArea>
            </Wizard>
        </>
    )
}
