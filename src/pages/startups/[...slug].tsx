import React from 'react'
import { useLocation } from '@reach/router'
import StartupProgram from 'components/Startups/StartupProgram'

// Client-only route for co-branded partner variants (e.g. /startups/stripe, /startups/yc).
// The canonical /startups page is prerendered from ./index.tsx for SEO.
export default function StartupsPartner(): JSX.Element {
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter(Boolean)
    // Ignore anything that isn't a plain slug, such as the literal "[...slug]" route path
    const partnerSlug = pathSegments.length > 1 && /^[a-z0-9-]+$/i.test(pathSegments[1]) ? pathSegments[1] : null

    return <StartupProgram partnerSlug={partnerSlug} />
}
