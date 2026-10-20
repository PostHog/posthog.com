import React from 'react'
import LivePlaygroundPage, { SectionIntro } from 'components/PocketGuides/LivePlaygroundPage'
import { SessionReplayLinkFigure } from 'components/PocketGuides/ProductAnalyticsIdentityExhibits'
import { BookingStepsFigure } from 'components/PocketGuides/ProductAnalyticsTrendsFunnelsExhibits'
import TwigEventFigure from 'components/PocketGuides/TwigEventFigure'

export default function ProductAnalyticsLearnByDoing(): JSX.Element {
    return (
        <LivePlaygroundPage
            productHandle="product_analytics"
            productName="Product Analytics"
            subtitle="Explore real code, inspect events, and try hands-on labs"
        >
            <SectionIntro title="See where your data comes from">
                See how real activity on a website generates product data, events, and identities in PostHog.
            </SectionIntro>
            <SessionReplayLinkFigure autoPlay />
            <SectionIntro title="Make a change and see the data respond">
                Interactive exercises show how instrumentation lets you track product flows and understand user
                behavior.
            </SectionIntro>
            <TwigEventFigure />
            <SectionIntro title="Track actions and measure outcomes">
                Experiment with different outcomes to see how event tracking reveals not just what users try to do, but
                whether they succeed.
            </SectionIntro>
            <BookingStepsFigure />
        </LivePlaygroundPage>
    )
}
