import React from 'react'
import LivePlaygroundPage, { SectionIntro } from 'components/PocketGuides/LivePlaygroundPage'
import { SessionReplayLinkFigure } from 'components/PocketGuides/ProductAnalyticsIdentityExhibits'
import { TwigReplayMaskingFigure } from 'components/PocketGuides/SessionReplayPlaygroundExhibits'

export default function SessionReplayLearnByDoing(): JSX.Element {
    return (
        <LivePlaygroundPage
            productHandle="session_replay"
            productName="Session Replay"
            subtitle="Watch a recorded visit and try a hands-on lab"
        >
            <SectionIntro title="See where your data comes from">
                See how real activity on a website generates product data, events, and identities in PostHog.
            </SectionIntro>
            <SessionReplayLinkFigure autoPlay />
            <SectionIntro title="Mask what people type">
                The replay lab on Twig records your own visit. Turn on input masking to see what a recording keeps.
            </SectionIntro>
            <TwigReplayMaskingFigure />
        </LivePlaygroundPage>
    )
}
