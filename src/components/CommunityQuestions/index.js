import React from 'react'
import { Squeak } from 'squeak-react'

export default function CommunityQuestions() {
    return (
        <div className="max-w-[600px] mt-12">
            <h3 id="squeak-questions" className="mb-4">
                Questions?
            </h3>
            <Squeak
                apiHost="https://squeak.cloud"
                apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXBrcXV2d3FhYXVudXpqb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MjE3ODUsImV4cCI6MTk2NTI5Nzc4NX0.SxdOpxHjVwap7sDUptK2TFJl7WK3v3HLuKbzb0JKeKg"
                url="https://pxipkquvwqaaunuzjoge.supabase.co"
                organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
            />
        </div>
    )
}
