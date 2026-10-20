import React from 'react'
import { IconPlay } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import LearnPage from 'components/PocketGuides/LearnPage'
import { SessionReplayLinkFigure } from 'components/PocketGuides/ProductAnalyticsIdentityExhibits'
import { BookingStepsFigure } from 'components/PocketGuides/ProductAnalyticsTrendsFunnelsExhibits'
import TwigEventFigure from 'components/PocketGuides/TwigEventFigure'
import { TWIG_URL } from '../../../constants'

function SectionIntro({ title, children }: { title: string; children: React.ReactNode }): JSX.Element {
    return (
        <div className="mt-8 mb-4 border-t border-primary pt-8">
            <h3 className="mt-0 mb-2 text-lg font-bold">{title}</h3>
            <p className="m-0 leading-relaxed">{children}</p>
        </div>
    )
}

export default function ProductAnalyticsLearnByDoing(): JSX.Element {
    return (
        <LearnPage
            productHandle="product_analytics"
            title="Explore Twig: live playground for Product Analytics – PostHog"
            description="Explore Twig, a full, live website and interactive playground with PostHog already instrumented."
        >
            <div className="not-prose min-w-0">
                <div className="mb-3 flex items-center gap-3">
                    <IconPlay className="size-6 shrink-0 text-orange" />
                    <h1 className="m-0 text-2xl font-bold">Explore Twig: live playground for Product Analytics</h1>
                </div>
                <h2 className="mt-0 mb-4 text-base font-medium text-secondary">
                    Explore real code, inspect events, and try hands-on labs
                </h2>
                <p className="mt-0 mb-5 leading-relaxed">
                    <Link to={TWIG_URL} external>
                        Twig
                    </Link>{' '}
                    is a live vacation rental website with PostHog built in. It's a playground that turns real code and
                    instrumentation into hands-on labs, so you can learn by experimenting.
                </p>
                <OSButton asLink to={TWIG_URL} external variant="primary" size="md">
                    Explore Twig
                </OSButton>
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
                    Experiment with different outcomes to see how event tracking reveals not just what users try to do,
                    but whether they succeed.
                </SectionIntro>
                <BookingStepsFigure />
            </div>
        </LearnPage>
    )
}
