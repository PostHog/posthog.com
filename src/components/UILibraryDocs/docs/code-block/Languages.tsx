import React from 'react'
import { CodeBlock } from 'components/UI/CodeBlock'

export default function Languages(): JSX.Element {
    return (
        <CodeBlock
            lineNumbers
            snippets={[
                {
                    id: 'web',
                    language: 'js',
                    label: 'Web',
                    code: `posthog.capture('report_exported', {
    format: 'csv',
})`,
                },
                {
                    id: 'python',
                    language: 'python',
                    code: `posthog.capture(
    distinct_id='user_123',
    event='report_exported',
    properties={'format': 'csv'},
)`,
                },
                {
                    id: 'ruby',
                    language: 'ruby',
                    code: `posthog.capture(
  distinct_id: 'user_123',
  event: 'report_exported',
  properties: { format: 'csv' }
)`,
                },
                {
                    id: 'sql',
                    language: 'sql',
                    code: `SELECT count()
FROM events
WHERE event = 'report_exported'`,
                },
            ]}
        />
    )
}
