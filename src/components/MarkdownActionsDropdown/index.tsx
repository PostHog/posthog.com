import { Menu } from '@headlessui/react'
import { IconCheck, IconCopy, IconEye, IconExternal } from '@posthog/icons'
import { Chevron } from 'components/Icons'
import React, { useState } from 'react'

interface CopyMarkdownActionsDropdownProps {
    /** The markdown content to work with */
    markdownContent: string
    /** Optional page URL for context */
    pageUrl?: string
    /** Custom className for styling */
    className?: string
}

export const CopyMarkdownActionsDropdown: React.FC<CopyMarkdownActionsDropdownProps> = ({
    markdownContent,
    pageUrl,
    className = '',
}) => {
    const [copiedState, setCopiedState] = useState<string | null>(null)

    // Helper function to strip query parameters from URL
    const getCleanPath = (url: string) => {
        return url.split('?')[0]
    }

    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(markdownContent)
        setCopiedState('markdown')
        setTimeout(() => setCopiedState(null), 2000)
    }

    const handleViewAsMarkdown = () => {
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
        const cleanPath = getCleanPath(currentPath)
        const markdownUrl = `${cleanPath}.md`
        window.open(markdownUrl, '_blank')
    }

    const handleOpenInChatGPT = () => {
        const cleanPath = pageUrl ? getCleanPath(pageUrl) : ''
        const markdownUrl = `${cleanPath}.md`
        const prompt = `Read from ${markdownUrl} so I can ask questions about it`
        const encodedPrompt = encodeURIComponent(prompt)
        window.open(`https://chat.openai.com/?q=${encodedPrompt}`, '_blank')
    }

    const handleOpenInClaude = () => {
        const cleanPath = pageUrl ? getCleanPath(pageUrl) : ''
        const markdownUrl = `${cleanPath}.md`
        const prompt = `Read from ${markdownUrl} so I can ask questions about it`
        const encodedPrompt = encodeURIComponent(prompt)
        window.open(`https://claude.ai/new?q=${encodedPrompt}`, '_blank')
    }

    return (
        <div className={`relative ${className}`}>
            <Menu>
                {({ open }) => (
                    <>
                        <Menu.Button className="flex items-center space-x-1 text-primary/30 dark:text-primary-dark/30 hover:text-red dark:hover:text-yellow font-semibold">
                            <IconCopy className="w-4 h-4" />
                            <span>Copy page</span>
                            <Chevron className="w-2.5 opacity-70 group-hover:opacity-70" />
                        </Menu.Button>

                        <Menu.Items className="absolute right-0 min-w-full shadow-xl bg-white dark:bg-accent-dark border border-light dark:border-dark list-none m-0 p-0.5 rounded-md mt-1 z-20 grid">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleCopyMarkdown}
                                        className={`!m-0 py-1.5 px-3 !text-sm cursor-pointer rounded-sm hover:bg-light active:bg-accent dark:hover:bg-light/10 dark:active:bg-light/5 transition-colors hover:transition-none whitespace-nowrap w-full text-left flex items-center justify-between ${
                                            copiedState === 'markdown' ? 'font-bold' : ''
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <IconCopy className="w-4 h-4 mr-3" />
                                            <span>Copy as Markdown</span>
                                        </div>
                                        {copiedState === 'markdown' && <IconCheck className="w-4 h-4 text-green" />}
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleViewAsMarkdown}
                                        className="!m-0 py-1.5 px-3 !text-sm cursor-pointer rounded-sm hover:bg-light active:bg-accent dark:hover:bg-light/10 dark:active:bg-light/5 transition-colors hover:transition-none whitespace-nowrap w-full text-left flex items-center"
                                    >
                                        <IconEye className="w-4 h-4 mr-3" />
                                        <span>View as Markdown</span>
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleOpenInChatGPT}
                                        className="!m-0 py-1.5 px-3 !text-sm cursor-pointer rounded-sm hover:bg-light active:bg-accent dark:hover:bg-light/10 dark:active:bg-light/5 transition-colors hover:transition-none whitespace-nowrap w-full text-left flex items-center"
                                    >
                                        <IconExternal className="w-4 h-4 mr-3" />
                                        <span>Open in ChatGPT</span>
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleOpenInClaude}
                                        className="!m-0 py-1.5 px-3 !text-sm cursor-pointer rounded-sm hover:bg-light active:bg-accent dark:hover:bg-light/10 dark:active:bg-light/5 transition-colors hover:transition-none whitespace-nowrap w-full text-left flex items-center"
                                    >
                                        <IconExternal className="w-4 h-4 mr-3" />
                                        <span>Open in Claude</span>
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default CopyMarkdownActionsDropdown
