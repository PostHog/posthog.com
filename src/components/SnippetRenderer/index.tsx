import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import CodeBlock from 'components/Home/CodeBlock'

export default function SnippetRenderer() {
    const data = useStaticQuery(graphql`
        {
            mdx(slug: { eq: "docs/integrate/snippet" }) {
                rawBody
            }
        }
    `)

    if (!data?.mdx?.rawBody) {
        return null
    }

    // Extract the code from the markdown (removing the ```html and ``` markers)
    const rawContent = data.mdx.rawBody
    const codeMatch = rawContent.match(/```html\n([\s\S]*?)\n```/)
    const snippetCode = codeMatch ? codeMatch[1] : rawContent

    return (
        <div className="max-w-4xl mx-auto overflow-x-auto overflow-y-hidden">
            <CodeBlock code={snippetCode} language="html" hideNumbers={false} lineNumberStart={1} tooltips={[]} />
        </div>
    )
}
