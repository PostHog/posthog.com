import { Menu } from '@headlessui/react'
import { IconCopy, IconEye, IconExternal } from '@posthog/icons'
import { Chevron } from 'components/Icons'
import CheckIcon from '../../images/check.svg'
import Link from 'components/Link'
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
        '!m-0 py-1.5 px-3 !text-sm cursor-pointer rounded-sm hover:bg-light active:bg-accent dark:hover:bg-light/10 dark:active:bg-light/5 transition-colors hover:transition-none whitespace-nowrap w-full text-left flex items-center !text-primary dark:!text-primary-dark hover:!text-primary dark:hover:!text-primary-dark'
    const menuItemIconStyles = 'w-4 h-4 mr-3'

    // Helper function to safely create markdown URL
    const getMarkdownUrl = (url: string) => {
        try {
            // Try to parse as absolute URL first
            const urlObj = new URL(url)
            return `${urlObj.origin}${urlObj.pathname}.md`
        } catch {
            return `${url}.md`
        }
    }

    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(markdownContent)
        setCopiedState('markdown')
        setTimeout(() => setCopiedState(null), 2000)
    }

    return (
        <div className={`relative`}>
            <Menu>
                {({ open }) => (
                    <>
                        <Menu.Button
                            className={`flex items-center space-x-1 font-semibold text-primary/30 dark:text-primary-dark/30 hover:text-red dark:hover:text-yellow rounded-sm border relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99] ${
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

                        <Menu.Items className="absolute right-0 min-w-full shadow-xl bg-white dark:bg-accent-dark border border-light dark:border-dark list-none m-0 p-0.5 rounded-md mt-1 z-50 grid">
                            <Menu.Item>
                                <button onClick={handleCopyMarkdown} className={menuItemButtonStyles}>
                                    <IconCopy className={menuItemIconStyles} />
                                    <span>Copy as Markdown</span>
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <Link to={`${getMarkdownUrl(pageUrl)}`} externalNoIcon className={menuItemButtonStyles}>
                                    <IconEye className={menuItemIconStyles} />
                                    <span>View as Markdown</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item>
                                <Link
                                    to={`https://chat.openai.com/?q=${encodeURIComponent(
                                        `Read from ${getMarkdownUrl(pageUrl)} so I can ask questions about it`
                                    )}`}
                                    externalNoIcon
                                    className={menuItemButtonStyles}
                                >
                                    <IconExternal className={menuItemIconStyles} />
                                    <span>Open in ChatGPT</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item>
                                <Link
                                    to={`https://claude.ai/new?q=${encodeURIComponent(
                                        `Read from ${getMarkdownUrl(pageUrl)} so I can ask questions about it`
                                    )}`}
                                    externalNoIcon
                                    className={menuItemButtonStyles}
                                >
                                    <IconExternal className={menuItemIconStyles} />
                                    <span>Open in Claude</span>
                                </Link>
                            </Menu.Item>
                        </Menu.Items>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default CopyMarkdownActionsDropdown
