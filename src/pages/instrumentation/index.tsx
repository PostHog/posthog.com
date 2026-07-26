import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import Instrumentation from 'components/Instrumentation'
import { useAppSettings } from '../../context/App'

/** Where phones go instead: the demo needs a side-by-side layout to make sense. */
const MOBILE_FALLBACK = '/docs/getting-started/install'

export default function InstrumentationPage(): JSX.Element {
    const { isMobile } = useAppSettings()

    // The demo is a browser frame beside a reading column, and neither half works
    // at phone width. `isMobile` is false until App.tsx measures on the client, so
    // this fires on the pass after hydration rather than during SSR.
    useEffect(() => {
        if (isMobile) navigate(MOBILE_FALLBACK, { replace: true })
    }, [isMobile])

    return (
        <>
            <SEO
                title="How PostHog instrumentation works - PostHog"
                description="See every PostHog tool instrumented on a (fake) real app. Toggle the overlay to see the events, flags, replays, and surveys behind each element, and the code that powers them."
                image={`/images/og/default.png`}
            />
            {/* showAddressBar={false}: the address bar is a category <Select>, and with no
                selectOptions to offer it renders as an empty, unclickable dropdown. */}
            <Explorer
                template="generic"
                slug="instrumentation"
                title="Instrumentation"
                fullScreen
                showAddressBar={false}
            >
                <Instrumentation />
            </Explorer>
        </>
    )
}
