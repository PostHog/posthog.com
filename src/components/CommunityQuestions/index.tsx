import { createHubSpotContact } from 'lib/utils'
import React from 'react'
import { Squeak } from 'components/Squeak'

export default function CommunityQuestions() {
    return (
        <div className="max-w-[600px] mt-12">
            <h3 id="squeak-questions" className="mb-4">
                Community questions
            </h3>
            <Squeak />
        </div>
    )
}
