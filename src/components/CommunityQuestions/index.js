import { createHubSpotContact, squeakProfileLink } from 'lib/utils'
import React from 'react'
import { Squeak } from 'squeak-react'

export default function CommunityQuestions() {
    return (
        <div className="max-w-[600px] mt-12">
            <h3 id="squeak-questions" className="mb-4">
                Questions?
            </h3>
            <Squeak
                profileLink={squeakProfileLink}
                onSignUp={(user) => createHubSpotContact(user)}
                apiHost={process.env.GATSBY_SQUEAK_API_HOST}
                organizationId={process.env.GATSBY_SQUEAK_ORG_ID}
            />
        </div>
    )
}
