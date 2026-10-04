import React from 'react'
import CodeBlock from 'components/Home/CodeBlock'
import htmlSnippetJson from '@data/content-html-snippet.json'
import type { HtmlSnippet } from '~/data-layer/queries/content'

const rawContent = htmlSnippetJson as HtmlSnippet

export default function SnippetRenderer(): JSX.Element | null {
    if (!rawContent) {
        return null
    }

    // Extract the code from the markdown (removing the ```html and ``` markers)
    const codeMatch = rawContent.match(/```html\n([\s\S]*?)\n```/)
    const snippetCode = codeMatch ? codeMatch[1] : rawContent

    return (
        <div className="max-w-4xl overflow-x-auto overflow-y-hidden">
            <CodeBlock code={snippetCode} language="html" hideNumbers={false} lineNumberStart={1} tooltips={[]} />
        </div>
    )
}
