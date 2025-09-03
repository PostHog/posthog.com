import { Menu } from '@headlessui/react'
import { IconCopy, IconEye, IconExternal, IconCheck } from '@posthog/icons'
import { Chevron } from 'components/Icons'
import CheckIcon from '../../images/check.svg'
import Link from 'components/Link'
import React, { useState } from 'react'
import { Popover } from 'components/RadixUI/Popover'
import OSButton from 'components/OSButton'

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
    const [copied, setCopied] = useState(false)
    const [popoverOpen, setPopoverOpen] = useState(false)
    const menuItemButtonStyles =
        'flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-accent transition-colors w-full'
    const menuItemIconStyles = 'size-4'

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
        setPopoverOpen(false)
        navigator.clipboard.writeText(markdownContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Popover
            trigger={
                <span>
                    <OSButton icon={copied ? <IconCheck className="text-green" /> : <IconCopy />} />
                </span>
            }
            dataScheme="secondary"
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
        >
            <button onClick={handleCopyMarkdown} className={menuItemButtonStyles}>
                <IconCopy className={menuItemIconStyles} />
                <span>Copy as Markdown</span>
            </button>

            <Link to={`${getMarkdownUrl(pageUrl)}`} externalNoIcon className={menuItemButtonStyles}>
                <IconEye className={menuItemIconStyles} />
                <span>View as Markdown</span>
            </Link>

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
        </Popover>
    )
}

export default CopyMarkdownActionsDropdown
