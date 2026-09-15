import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import Instrumentation from 'components/Instrumentation'

export default function InstrumentationPage(): JSX.Element {
    // No mobile redirect: narrow screens get a "too small" overlay from inside
    // the component (a CSS container query), so a shared link or a resized window
    // never bounces you off the page.
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
