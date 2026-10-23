import React from 'react'
import { CodeBlock } from 'components/UI/CodeBlock'

export default function Files(): JSX.Element {
    return (
        <CodeBlock
            defaultValue="capture"
            snippets={[
                {
                    id: 'setup',
                    fileName: 'src/analytics/posthog.ts',
                    language: 'ts',
                    code: `import posthog from 'posthog-js'

posthog.init('<ph_project_token>', {
    api_host: 'https://us.i.posthog.com',
})`,
                },
                {
                    id: 'capture',
                    fileName: 'src/reports/capture-export.ts',
                    language: 'ts',
                    code: `import posthog from 'posthog-js'

export function captureExport(reportId: string) {
    posthog.capture('report_exported', {
        report_id: reportId,
        format: 'csv',
    })
}`,
                },
                {
                    id: 'query',
                    fileName: 'queries/report-exports.sql',
                    language: 'sql',
                    code: `SELECT properties.report_id, count() AS exports
FROM events
WHERE event = 'report_exported'
GROUP BY properties.report_id
ORDER BY exports DESC`,
                },
            ]}
        />
    )
}
