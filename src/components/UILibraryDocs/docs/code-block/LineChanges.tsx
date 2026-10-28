import React from 'react'
import { CodeBlock } from 'components/UI/CodeBlock'

export default function LineChanges(): JSX.Element {
    return (
        <CodeBlock
            lineNumbers
            lineNumberStart={40}
            snippets={[
                {
                    id: 'flags',
                    fileName: 'feature-flags.ts',
                    language: 'ts',
                    highlightedLines: [1],
                    removedLines: [2],
                    addedLines: [3, 4, 5],
                    code: `const flag = 'new-reports'
const enabled = false
const enabled = await isFeatureOn(
    flag
)

renderReports({ enabled })`,
                },
            ]}
        />
    )
}
