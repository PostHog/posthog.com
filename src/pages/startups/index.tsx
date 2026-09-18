import React from 'react'
import StartupProgram from 'components/Startups/StartupProgram'

// Canonical, prerendered /startups page. This is what search engines crawl, so it must be a
// real static page (not the client-only [...slug] route) with a crawlable text H1.
export default function Startups(): JSX.Element {
    return <StartupProgram partnerSlug={null} />
}
