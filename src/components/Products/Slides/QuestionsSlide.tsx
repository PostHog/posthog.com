import React, { useState } from 'react'
import Tabs from 'components/RadixUI/Tabs'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
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
    questions: Question[]
    tutorialData: TutorialData
}

export default function QuestionsSlide({
    productName,
    answersDescription,
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

        if (!tutorialNode) return 'Content not found.'

        // Use frontmatter description first, if available (only if no hash fragment)
        if (!hashFragment && tutorialNode.frontmatter?.description) {
            return tutorialNode.frontmatter.description
        }

        // Process rawBody to get content
        if (tutorialNode.rawBody) {
            let content = tutorialNode.rawBody

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
            // Take first few paragraphs, skip frontmatter, export statements, and images
            const contentParagraphs = paragraphs
                .filter((p: string) => !p.startsWith('---') && !p.startsWith('export ') && p.trim().length > 50)
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
                .join('\n\n')

            // Limit to reasonable length
            return contentParagraphs.length > 900 ? contentParagraphs.substring(0, 900) + '...' : contentParagraphs
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
                    What can I discover with {productName}?
                </h2>
                <p className="text-xl text-secondary max-w-4xl mx-auto mb-8 text-center">{answersDescription}</p>
            </div>
            <Tabs.Root
                className="flex-1 flex w-full min-h-0 items-start bg-accent rounded"
                defaultValue={`tab-${currentTab}`}
                value={`tab-${currentTab}`}
                onValueChange={(value) => setCurrentTab(parseInt(value.split('-')[1]))}
                orientation="horizontal"
                size="md"
            >
                <div data-scheme="secondary" className="w-96 h-full bg-primary rounded">
                    <ScrollArea className="h-full">
                        <Tabs.List className="flex flex-col p-1 gap-0.5" aria-label="Questions">
                            {questions.map((question: Question, index: number) => (
                                <Tabs.Trigger key={index} value={`tab-${index}`} className="text-left">
                                    {question.question}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                    </ScrollArea>
                </div>
                {questions.map((question: Question, index: number) => (
                    <Tabs.Content
                        className="text-primary flex-1 bg-primary grow px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full"
                        key={index}
                        value={`tab-${index}`}
                    >
                        <ScrollArea className="h-full -mb-4">
                            <div className="px-4">
                                <h2 className="text-3xl mb-4">{question.question}</h2>
                                <div className="prose max-w-none [&_p]:!text-lg [&_li]:!text-lg">
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
                                            Read full tutorial →
                                        </OSButton>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </div>
    )
}
