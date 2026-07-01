import React from 'react'
import SEO from 'components/seo'
import SidebarExplorer from 'components/BlogLanding/variants/SidebarExplorer'
import { foundersIntro } from './founders'

// Always renders the redesigned (test) layout regardless of feature-flag assignment, so the
// team can review it directly. Not linked anywhere — visit /founders-preview locally.
// The live A/B test lives on /founders, gated by the `founders-hub-redesign` flag.

export default function FoundersPreview() {
    return (
        <>
            <SEO title="Founders landing preview - PostHog" noindex />
            <SidebarExplorer folder="founders" title="Founder's hub" intro={foundersIntro} />
        </>
    )
}
