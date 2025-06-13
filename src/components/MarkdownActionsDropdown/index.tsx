import { Menu } from '@headlessui/react'
import { IconCopy, IconEye, IconExternal } from '@posthog/icons'
import { Chevron } from 'components/Icons'
import CheckIcon from '../../images/check.svg'
import React, { useState } from 'react'

interface CopyMarkdownActionsDropdownProps {
    /** The markdown content to work with */
    markdownContent: string
    /** Page URL for context */
    pageUrl: string
}

export const CopyMarkdownActionsDropdown: React.FC<CopyMarkdownActionsDropdownProps> = ({
    markdownContent,
    pageUrl,
}) => {
    const [copiedState, setCopiedState] = useState<string | null>(null)

    // Consolidated styles
    const menuItemButtonStyles =
        '!m-0 py-1.5 px-3 !text-sm cursor-pointer rounded-sm hover:bg-light active:bg-accent dark:hover:bg-light/10 dark:active:bg-light/5 transition-colors hover:transition-none whitespace-nowrap w-full text-left flex items-center'
    const menuItemIconStyles = 'w-4 h-4 mr-3'

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
        const cleanPath = getCleanPath(pageUrl)
        const markdownUrl = `${cleanPath}.md`
        window.open(markdownUrl, '_blank')
    }

    const handleOpenInChatGPT = () => {
        const cleanPath = getCleanPath(pageUrl)
        const markdownUrl = `${cleanPath}.md`
        const prompt = `Read from ${markdownUrl} so I can ask questions about it`
        const encodedPrompt = encodeURIComponent(prompt)
        window.open(`https://chat.openai.com/?q=${encodedPrompt}`, '_blank')
    }

    const handleOpenInClaude = () => {
        const cleanPath = getCleanPath(pageUrl)
        const markdownUrl = `${cleanPath}.md`
        const prompt = `Read from ${markdownUrl} so I can ask questions about it`
        const encodedPrompt = encodeURIComponent(prompt)
        window.open(`https://claude.ai/new?q=${encodedPrompt}`, '_blank')
    }

    return (
        <div className={`relative`}>
            <Menu>
                {({ open }) => (
                    <>
                        <Menu.Button
                            className={`flex items-center space-x-1 font-semibold text-primary/30 dark:text-primary-dark/30 hover:text-red dark:hover:text-yellow py-1 px-1 rounded-sm border relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99] ${
                                open
                                    ? 'scale-[1.02] bg-accent dark:bg-accent-dark border-light dark:border-dark text-primary/100 dark:text-primary-dark/100'
                                    : 'border-transparent hover:bg-accent dark:hover:bg-accent-dark hover:border-light dark:hover:border-dark'
                            }`}
                        >
                            {copiedState === 'markdown' ? (
                                <>
                                    <img src={CheckIcon} alt="Copied" className="w-4 h-4 text-green" />
                                    <span className="text-primary/70 dark:text-primary-dark/70">Copied</span>
                                </>
                            ) : (
                                <>
                                    <IconCopy className="w-4 h-4" />
                                    <span>Copy page</span>
                                </>
                            )}
                            <Chevron className="w-2.5 opacity-70 group-hover:opacity-70" />
                        </Menu.Button>

                        <Menu.Items className="absolute right-0 min-w-full shadow-xl bg-white dark:bg-accent-dark border border-light dark:border-dark list-none m-0 p-0.5 rounded-md mt-1 z-20 grid">
                            <Menu.Item>
                                <button onClick={handleCopyMarkdown} className={menuItemButtonStyles}>
                                    <IconCopy className={menuItemIconStyles} />
                                    <span>Copy as Markdown</span>
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button onClick={handleViewAsMarkdown} className={menuItemButtonStyles}>
                                    <IconEye className={menuItemIconStyles} />
                                    <span>View as Markdown</span>
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button onClick={handleOpenInChatGPT} className={menuItemButtonStyles}>
                                    <IconExternal className={menuItemIconStyles} />
                                    <span>Open in ChatGPT</span>
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button onClick={handleOpenInClaude} className={menuItemButtonStyles}>
                                    <IconExternal className={menuItemIconStyles} />
                                    <span>Open in Claude</span>
                                </button>
                            </Menu.Item>
                        </Menu.Items>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default CopyMarkdownActionsDropdown
