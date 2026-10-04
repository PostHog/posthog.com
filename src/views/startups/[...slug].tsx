import React from 'react'
import StartupProgram from 'components/Startups/StartupProgram'
import { useLocation } from 'lib/navigation'

// Client-only route for co-branded partner variants (e.g. /startups/stripe, /startups/yc).
// The canonical /startups page is prerendered from ./index.tsx for SEO.
export default function StartupsPartner(): JSX.Element {
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const partnerSlug = pathSegments.length > 1 ? pathSegments[1] : null

    return <StartupProgram partnerSlug={partnerSlug} />
}
