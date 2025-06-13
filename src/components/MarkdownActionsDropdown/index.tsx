import { Menu } from '@headlessui/react'
import { IconCheck, IconChevronDown, IconCopy } from '@posthog/icons'
import React, { useState } from 'react'

interface CopyMarkdownActionsDropdownProps {
    /** The markdown content to work with */
    markdownContent: string
    /** Optional page title for generating better prompts */
    pageTitle?: string
    /** Optional page URL for context */
    pageUrl?: string
    /** Custom className for styling */
    className?: string
}

export const CopyMarkdownActionsDropdown: React.FC<CopyMarkdownActionsDropdownProps> = ({
    markdownContent,
    pageTitle,
    pageUrl,
    className = '',
}) => {
    const [copiedState, setCopiedState] = useState<string | null>(null)

    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(markdownContent)
        setCopiedState('markdown')
        setTimeout(() => setCopiedState(null), 2000)
    }

    const handleCopyForLLMs = () => {
        const llmContent = `# ${pageTitle || 'Page Content'}\n\n${markdownContent}`
        navigator.clipboard.writeText(llmContent)
        setCopiedState('llm')
        setTimeout(() => setCopiedState(null), 2000)
    }

    const handleViewAsMarkdown = () => {
        const blob = new Blob([markdownContent], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const newWindow = window.open(url, '_blank')
        if (newWindow) {
            newWindow.document.title = `${pageTitle || 'Content'} - Markdown View`
        }
        // Clean up the blob URL after a short delay
        setTimeout(() => URL.revokeObjectURL(url), 1000)
    }

    const handleOpenInChatGPT = () => {
        const prompt = `Please analyze this content from ${pageTitle || 'a webpage'}${
            pageUrl ? ` (${pageUrl})` : ''
        }:\n\n${markdownContent}`

        // Copy to clipboard and open ChatGPT
        navigator.clipboard.writeText(prompt)
        window.open('https://chat.openai.com/', '_blank')
    }

    const handleOpenInClaude = () => {
        const prompt = `Please analyze this content from ${pageTitle || 'a webpage'}${
            pageUrl ? ` (${pageUrl})` : ''
        }:\n\n${markdownContent}`

        // Copy to clipboard and open Claude
        navigator.clipboard.writeText(prompt)
        window.open('https://claude.ai/', '_blank')
    }

    return (
        <div className={`relative ${className}`}>
            <Menu>
                <Menu.Button className="flex items-center space-x-1 text-primary/30 dark:text-primary-dark/30 hover:text-red dark:hover:text-yellow font-semibold">
                    <IconCopy className="w-4 h-4" />
                    <span>Copy as Markdown</span>
                    <IconChevronDown className="w-4 h-4" />
                </Menu.Button>

                <Menu.Items className="absolute right-0 mt-1 w-56 bg-white dark:bg-accent-dark border border-border dark:border-border-dark rounded-md shadow-lg z-50 divide-y divide-border dark:divide-border-dark">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleCopyMarkdown}
                                    className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-accent-dark' : ''
                                    } flex items-center w-full px-4 py-2 text-sm text-left text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark`}
                                >
                                    <IconCopy className="w-4 h-4 mr-3" />
                                    <span>Copy as Markdown</span>
                                    {copiedState === 'markdown' && <IconCheck className="w-4 h-4 ml-auto text-green" />}
                                </button>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleCopyForLLMs}
                                    className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-accent-dark' : ''
                                    } flex items-center w-full px-4 py-2 text-sm text-left text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark`}
                                >
                                    <IconCopy className="w-4 h-4 mr-3" />
                                    <span>Copy for LLMs</span>
                                    {copiedState === 'llm' && <IconCheck className="w-4 h-4 ml-auto text-green" />}
                                </button>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleViewAsMarkdown}
                                    className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-accent-dark' : ''
                                    } flex items-center w-full px-4 py-2 text-sm text-left text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark`}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                    <span>View as Markdown</span>
                                </button>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleOpenInChatGPT}
                                    className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-accent-dark' : ''
                                    } flex items-center w-full px-4 py-2 text-sm text-left text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark`}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.529 2.9 5.973 5.973 0 0 0 5.397 0 6.09 6.09 0 0 0 6.521-2.9 5.985 5.985 0 0 0 .509-4.688 5.965 5.965 0 0 0 2.09-4.679z" />
                                    </svg>
                                    <span>Open in ChatGPT</span>
                                </button>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleOpenInClaude}
                                    className={`${
                                        active ? 'bg-gray-100 dark:bg-gray-accent-dark' : ''
                                    } flex items-center w-full px-4 py-2 text-sm text-left text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark`}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.5 3H4.5A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3zM12 17.25L6.75 12l1.06-1.06L12 15.19l4.19-4.25L17.25 12 12 17.25z" />
                                    </svg>
                                    <span>Open in Claude</span>
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default CopyMarkdownActionsDropdown
