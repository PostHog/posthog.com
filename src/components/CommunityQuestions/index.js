import { createHubSpotContact } from 'lib/utils'
import React from 'react'
import { Squeak } from 'squeak-react'

export default function CommunityQuestions() {
    return (
        <div className="max-w-[600px] mt-12">
            <h3 id="squeak-questions" className="mb-4">
                Questions?
            </h3>
            <Squeak
                onSignUp={(user) => createHubSpotContact(user)}
                apiHost="http://localhost:3000"
                organizationId="75421a23-0387-4418-8a6e-deddff8aefe8"
            />
        </div>
    )
}
