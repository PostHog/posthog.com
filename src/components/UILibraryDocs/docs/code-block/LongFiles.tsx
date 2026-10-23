import React from 'react'
import { CodeBlock } from 'components/UI/CodeBlock'

export default function LongFiles(): JSX.Element {
    return (
        <CodeBlock
            lineNumbers
            maxHeight={180}
            snippets={[
                {
                    id: 'query',
                    fileName: 'activation.sql',
                    language: 'sql',
                    highlightedLines: [9, 10],
                    code: `WITH signups AS (
    SELECT
        person_id,
        min(timestamp) AS signup_time
    FROM events
    WHERE event = 'signup_completed'
    GROUP BY person_id
)
SELECT
    toStartOfWeek(signup_time) AS week,
    count(DISTINCT signups.person_id) AS activated_users
FROM signups
JOIN events ON events.person_id = signups.person_id
WHERE events.event = 'report_exported'
    AND events.timestamp BETWEEN signup_time AND signup_time + INTERVAL 7 DAY
GROUP BY week
ORDER BY week DESC`,
                },
                {
                    id: 'request',
                    fileName: 'request.sh',
                    language: 'shell',
                    code: `curl --request POST 'https://us.i.posthog.com/capture/' --header 'Content-Type: application/json' --data '{"api_key":"<ph_project_token>","event":"report_exported","properties":{"distinct_id":"user_123","format":"csv"}}'`,
                },
            ]}
        />
    )
}
