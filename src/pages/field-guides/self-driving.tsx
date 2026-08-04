import React from 'react'

import SelfDrivingInboxPage from 'components/SelfDrivingInbox/Page'
import SEO from 'components/seo'

/** Field guides browsed as an inbox: each row is a report a scout would file. */
export default function SelfDrivingTemplates(): JSX.Element {
    return (
        <>
            <SEO
                title="Self-driving field guides - PostHog"
                description="What a self-driving product watches for. Read the report a scout files, see the pull request it becomes, then add it to your troop."
                image="/images/og/default.png"
            />
            <SelfDrivingInboxPage />
        </>
    )
}
