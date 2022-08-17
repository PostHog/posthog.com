import React from 'react'
import { Squeak } from 'squeak-react'

export default function CommunityQuestions() {
    return (
        <div className="max-w-[600px] mt-12">
            <h3 id="squeak-questions" className="mb-4">
                Questions?
            </h3>
            <Squeak apiHost="https://squeak.cloud" organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626" />
        </div>
    )
}
