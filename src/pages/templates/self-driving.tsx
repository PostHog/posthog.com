import React from 'react'

import SelfDrivingInboxPage from 'components/SelfDrivingInbox/Page'
import SEO from 'components/seo'

/**
 * Self-driving field guides, browsed as an inbox rather than a card grid: each row is an example
 * report a scout would file, and opening one shows the job it does plus a one-click way to add it
 * to your troop.
 */
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
