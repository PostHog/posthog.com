import React from 'react'
import SEO from 'components/seo'
import Test from '../../components/Home/Test'

/**
 * Arabic home page.
 *
 * The RTL layout is done; the translated copy is not. Until the shared string catalog
 * lands, this renders the English copy in an RTL layout so the direction work is
 * reviewable on a deploy preview. That is also why it is `noindex`.
 *
 * When the Arabic strings land: drop `noindex`, and add the `ar` hreflang alternate
 * here and in `src/pages/index.tsx`.
 */
export default function ArabicHome() {
    return (
        <>
            <SEO
                title="PostHog"
                updateWindowTitle={false}
                description="PostHog automatically diagnoses problems, fixes bugs, and generates pull requests – all without you having to prompt it."
                image="/images/og/default.png"
                lang="ar"
                dir="rtl"
                noindex
            />
            <Test />
        </>
    )
}
