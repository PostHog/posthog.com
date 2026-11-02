import React from 'react'
import LivePlaygroundPage, { SectionIntro } from 'components/PocketGuides/LivePlaygroundPage'
import { SessionReplayLinkFigure } from 'components/PocketGuides/ProductAnalyticsIdentityExhibits'
import {
    TwigAiCaptureFigure,
    TwigAiEventFigure,
    TwigTripTracesFigure,
} from 'components/PocketGuides/AiObservabilityPlaygroundExhibits'

export default function AiObservabilityLearnByDoing(): JSX.Element {
    return (
        <LivePlaygroundPage
            productHandle="ai_observability"
            productName="AI Observability"
            subtitle="Explore real code, inspect AI events, and try a hands-on lab"
        >
            <SectionIntro title="See where your data comes from">
                See how real activity on a website generates product data, events, and identities in PostHog.
            </SectionIntro>
            <SessionReplayLinkFigure autoPlay />
            <SectionIntro title="Trace a request to the model">
                Twig’s AI feature recommends a stay from a trip request. Each request becomes a trace with the model
                call inside it.
            </SectionIntro>
            <TwigTripTracesFigure />
            <SectionIntro title="See what a generation records">
                Compare <code>$ai_generation</code> events and which properties and see why an LLM succeeded or failed.
            </SectionIntro>
            <TwigAiEventFigure />
            <SectionIntro title="Read the code behind the events">
                Capture andd store information that's relevant to your agent or LLM calls.
            </SectionIntro>
            <TwigAiCaptureFigure />
        </LivePlaygroundPage>
    )
}
