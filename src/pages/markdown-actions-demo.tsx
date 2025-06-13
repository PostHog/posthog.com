import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { CopyMarkdownActionsDropdown } from 'components/MarkdownActionsDropdown'

const sampleMarkdown = `# Sample Document

This is a sample document to demonstrate the **CopyMarkdownActionsDropdown** component.

## Features

- Copy as Markdown
- Copy for LLMs (with title formatting)
- View as Markdown in new tab
- Open in ChatGPT (copies content to clipboard)
- Open in Claude (copies content to clipboard)

## Code Example

\`\`\`javascript
const example = () => {
    console.log('Hello, world!')
}
\`\`\`

## Usage

The dropdown allows users to easily share, analyze, or export documentation content in various formats suitable for different use cases.

### Why This is Useful

1. **Content Sharing**: Quickly copy markdown for sharing or documentation
2. **AI Analysis**: Send content to AI tools for analysis or assistance
3. **Content Review**: View raw markdown for editing or verification
4. **LLM Integration**: Format content appropriately for language models

This component follows the existing design patterns used throughout the PostHog documentation site.`

export default function MarkdownActionsDemo() {
    return (
        <Layout>
            <SEO title="Markdown Actions Demo - PostHog" />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-primary dark:text-primary-dark mb-2">
                            Markdown Actions Demo
                        </h1>
                        <p className="text-lg text-primary/70 dark:text-primary-dark/70">
                            Demonstrating the CopyMarkdownActionsDropdown component
                        </p>
                    </div>
                    <CopyMarkdownActionsDropdown
                        markdownContent={sampleMarkdown}
                        pageTitle="Markdown Actions Demo"
                        pageUrl="https://posthog.com/markdown-actions-demo"
                    />
                </div>

                <div className="prose dark:prose-invert max-w-none">
                    <div className="bg-accent dark:bg-accent-dark p-6 rounded-lg border border-border dark:border-border-dark mb-8">
                        <h2 className="text-xl font-semibold mb-4">How to Use</h2>
                        <ol className="space-y-2">
                            <li>
                                <strong>Copy as Markdown:</strong> Copy the raw markdown content to your clipboard
                            </li>
                            <li>
                                <strong>Copy for LLMs:</strong> Copy markdown with a formatted title, optimized for AI
                                tools
                            </li>
                            <li>
                                <strong>View as Markdown:</strong> Open the markdown content in a new tab for review
                            </li>
                            <li>
                                <strong>Open in ChatGPT:</strong> Copy content to clipboard and open ChatGPT
                            </li>
                            <li>
                                <strong>Open in Claude:</strong> Copy content to clipboard and open Claude
                            </li>
                        </ol>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-border dark:border-border-dark">
                        <h2 className="text-xl font-semibold mb-4">Sample Content Preview</h2>
                        <pre className="whitespace-pre-wrap text-sm text-primary/70 dark:text-primary-dark/70 font-mono">
                            {sampleMarkdown}
                        </pre>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
