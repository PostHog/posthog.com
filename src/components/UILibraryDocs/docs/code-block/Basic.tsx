import React from 'react'
import { CodeBlock } from 'components/UI/CodeBlock'

export default function Basic(): JSX.Element {
    return (
        <CodeBlock
            snippets={[
                {
                    id: 'capture',
                    fileName: 'analytics.ts',
                    language: 'ts',
                    code: `import posthog from 'posthog-js'

posthog.capture('signup_completed', {
    plan: 'team',
    source: 'pricing',
})`,
                },
            ]}
        />
    )
}
