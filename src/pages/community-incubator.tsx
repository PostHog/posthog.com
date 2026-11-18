import React from 'react'
import CommunityIncubatorProgram from 'components/CommunityIncubator/CommunityIncubatorProgram'

// Canonical, prerendered /community-incubator page. Real static page (like /startups) so search
// engines get a crawlable H1 instead of a client-only route.
export default function CommunityIncubator(): JSX.Element {
    return <CommunityIncubatorProgram />
}
