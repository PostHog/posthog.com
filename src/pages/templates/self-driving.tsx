import React from 'react'

import SelfDrivingInboxPage from 'components/SelfDrivingInbox/Page'
import SEO from 'components/seo'

/**
 * Self-driving scout templates, browsed as an inbox rather than a card grid: each row is an
 * example report a scout would file, and opening one shows the question it answers plus a
 * one-click way to add it to your troop.
 */
export default function SelfDrivingTemplates(): JSX.Element {
    return (
        <>
            <SEO
                title="Self-driving templates - PostHog"
                description="The questions a self-driving product watches for. Read the reports scouts file, then add one to your troop."
                image="/images/og/default.png"
            />
            <SelfDrivingInboxPage />
        </>
    )
}
