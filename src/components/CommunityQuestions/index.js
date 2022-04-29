import React from 'react'
import { Squeak } from 'squeak-react'

export default function CommunityQuestions({ questions }) {
    return (
        <div className="max-w-[450px]">
            <Squeak
                apiHost="https://squeak.cloud"
                apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXBrcXV2d3FhYXVudXpqb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MjE3ODUsImV4cCI6MTk2NTI5Nzc4NX0.SxdOpxHjVwap7sDUptK2TFJl7WK3v3HLuKbzb0JKeKg"
                url="https://pxipkquvwqaaunuzjoge.supabase.co"
                organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
            />
        </div>
    )
}
