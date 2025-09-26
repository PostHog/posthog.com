import React, { useState } from 'react'
import Tabs from 'components/RadixUI/Tabs'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import pluralizeWord from 'pluralize'
import { Markdown } from 'components/Squeak/components/Markdown'

interface Question {
    question: string
    url?: string
}

interface TutorialNode {
    fields: {
        slug: string
    }
    rawBody: string
    frontmatter?: {
        title: string
        description?: string
    }
}

interface TutorialData {
    allMdx: {
        nodes: TutorialNode[]
    }
}

interface QuestionsSlideProps {
    productName: string
    answersDescription: string
    answersHeadline?: string
    questions: Question[]
    tutorialData: TutorialData
}

export default function QuestionsSlide({
    productName,
    answersDescription,
    answersHeadline,
    questions,
    tutorialData,
}: QuestionsSlideProps) {
    const [currentTab, setCurrentTab] = useState(0)

    // Helper function to get content for a question URL
    const getContentForUrl = (url?: string) => {
        if (!url) return 'No additional content available.'

        // Extract slug and hash fragment from URL
        const [slug, hashFragment] = url.split('#')
        const tutorialNode = tutorialData.allMdx.nodes.find((node: TutorialNode) => node.fields.slug === slug)

        if (!tutorialNode) {
            console.warn(`Content not found for URL: ${url} (slug: ${slug})`)
            return null
        }

        // Use frontmatter description first, if available (only if no hash fragment)
        if (!hashFragment && tutorialNode.frontmatter?.description) {
            return tutorialNode.frontmatter.description
        }

        // Process rawBody to get content
        if (tutorialNode.rawBody) {
            let content = tutorialNode.rawBody

            // First, remove all import statements (they can be on single lines or span multiple lines)
            content = content.replace(/^import\s+.*?from\s+['"].*?['"]\s*$/gm, '')
            content = content.replace(/^import\s+{[\s\S]*?}\s+from\s+['"].*?['"]\s*$/gm, '')
            content = content.replace(/^import\s+.*$/gm, '')

            // If there's a hash fragment, find the corresponding header and start from there
            if (hashFragment) {
                // Convert hash fragment to potential header formats
                // e.g., "1-first-contentful-paint" -> "1. First Contentful Paint"
                let headerText = hashFragment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

                // Handle numbered sections by adding period after number
                headerText = headerText.replace(/^(\d+)\s/, '$1. ')

                // Look for the header in the content (try different formats and case variations)
                const headerPatterns = [
                    `## ${headerText}`,
                    `### ${headerText}`,
                    `# ${headerText}`,
                    headerText,
                    // Try lowercase variations for case-insensitive matching
                    `## ${headerText.toLowerCase()}`,
                    `### ${headerText.toLowerCase()}`,
                    `# ${headerText.toLowerCase()}`,
                ]

                let startIndex = -1
                for (const pattern of headerPatterns) {
                    // Case-insensitive search
                    const lowerContent = content.toLowerCase()
                    const lowerPattern = pattern.toLowerCase()
                    const index = lowerContent.indexOf(lowerPattern)
                    if (index !== -1) {
                        startIndex = index
                        break
                    }
                }

                // If we found the header, start content from there
                if (startIndex !== -1) {
                    content = content.substring(startIndex)
                }
            }

            // Split by double newlines to get paragraphs
            const paragraphs = content.split('\n\n')
            // Take first few paragraphs, skip various non-content elements
            const contentParagraphs = paragraphs
                .filter((p: string) => {
                    const trimmed = p.trim()
                    // Skip frontmatter
                    if (trimmed.startsWith('---')) return false
                    // Skip export statements
                    if (trimmed.startsWith('export ')) return false
                    // Skip import statements (single or multiline)
                    if (trimmed.startsWith('import ') || trimmed.match(/^import\s+{/)) return false
                    // Skip code blocks (triple backticks)
                    if (trimmed.startsWith('```')) return false
                    // Skip JSX/HTML blocks
                    if (trimmed.match(/^<[A-Z][a-zA-Z]*[\s>]/)) return false
                    // Skip short paragraphs
                    if (trimmed.length <= 50) return false
                    // Skip paragraphs that are just lists of imports
                    if (trimmed.match(/^import\s+.*from\s+['"].*['"]/m)) return false
                    return true
                })
                .map((p: string) => {
                    // If paragraph starts with a header, remove just the header line but keep the rest
                    if (p.startsWith('#')) {
                        const lines = p.split('\n')
                        // Remove the first line (header) but keep the rest
                        const contentLines = lines.slice(1).join('\n').trim()
                        return contentLines
                    }

                    // Remove image references ![alt](url) and standalone image lines
                    return p
                        .replace(/!\[.*?\]\(.*?\)/g, '')
                        .replace(/^\s*<.*?>\s*$/gm, '')
                        .trim()
                })
                .filter((p: string) => p.length > 0) // Remove empty paragraphs after image removal
                .slice(0, 5)

            // If we found no content paragraphs, try to find any prose content
            if (contentParagraphs.length === 0) {
                // Split by single newlines and look for prose
                const lines = content.split('\n')
                const proseLines = lines.filter((line: string) => {
                    const trimmed = line.trim()
                    // Skip empty lines
                    if (!trimmed) return false
                    // Skip headers
                    if (trimmed.startsWith('#')) return false
                    // Skip code/component lines
                    if (trimmed.startsWith('<') || trimmed.endsWith('>')) return false
                    // Skip lines that look like code
                    if (trimmed.startsWith('```') || trimmed.startsWith('    ')) return false
                    // Skip lines with only special characters
                    if (trimmed.match(/^[<>{}[\]()]+$/)) return false
                    // Accept lines with actual prose (at least 20 chars)
                    return trimmed.length > 20
                })

                if (proseLines.length > 0) {
                    const proseContent = proseLines.slice(0, 10).join(' ')
                    return proseContent.length > 900 ? proseContent.substring(0, 900) + '...' : proseContent
                }
            }

            const joinedContent = contentParagraphs.join('\n\n')
            // Limit to reasonable length
            return joinedContent.length > 900 ? joinedContent.substring(0, 900) + '...' : joinedContent
        }

        return 'No preview available.'
    }

    if (questions.length === 0) {
        return <div className="p-4">No questions available</div>
    }

    return (
        <div className="h-full flex flex-col p-4">
            <div className="flex-0">
                <h2 className="text-4xl font-bold text-primary my-2 text-center">
                    {answersHeadline || `What can I discover with ${productName}?`}
                </h2>
                <p className="text-xl text-secondary max-w-4xl mx-auto mb-8 text-center">{answersDescription}</p>
            </div>
            <Tabs.Root
                className="flex-1 flex w-full min-h-0 items-start bg-accent rounded @2xl:flex-row"
                defaultValue={`tab-${currentTab}`}
                value={`tab-${currentTab}`}
                onValueChange={(value) => setCurrentTab(parseInt(value.split('-')[1]))}
                orientation="horizontal"
                size="md"
            >
                <div
                    data-scheme="secondary"
                    className="w-full @2xl:w-96 @2xl:h-full bg-primary rounded-t @2xl:rounded-t-none @2xl:rounded-l border-b border-primary @2xl:border-b-0"
                >
                    <ScrollArea className="overflow-y-hidden @2xl:overflow-y-auto @2xl:h-full">
                        <Tabs.List className="flex @2xl:flex-col" aria-label="Questions">
                            {questions.map((question: Question, index: number) => (
                                <Tabs.Trigger key={index} value={`tab-${index}`} className="text-left">
                                    {question.question}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                    </ScrollArea>
                </div>
                {questions.map((question: Question, index: number) => {
                    const type = question.url ? question.url.split('/')[1] ?? 'tutorial' : 'tutorial'
                    const singularType =
                        type === 'docs'
                            ? 'documentation'
                            : type === 'product-engineers'
                            ? 'post'
                            : pluralizeWord.singular(type)

                    return (
                        <Tabs.Content
                            className="text-primary flex-1 bg-primary @2xl:border-l border-primary grow px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full rounded-b @2xl:rounded-b-none @2xl:rounded-r"
                            key={index}
                            value={`tab-${index}`}
                        >
                            <ScrollArea className="h-full">
                                <div className="px-4 pt-8 @2xl:pt-0">
                                    <h2 className="text-3xl mb-4">{question.question}</h2>
                                    <div className="prose dark:prose-invert max-w-none [&_p]:!text-lg [&_li]:!text-lg">
                                        <Markdown>{getContentForUrl(question.url)}</Markdown>
                                    </div>
                                    {question.url && (
                                        <div className="mt-6">
                                            <OSButton
                                                to={question.url}
                                                variant="secondary"
                                                size="lg"
                                                asLink
                                                state={{ newWindow: true }}
                                            >
                                                Read full {singularType} →
                                            </OSButton>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </Tabs.Content>
                    )
                })}
            </Tabs.Root>
        </div>
    )
}
