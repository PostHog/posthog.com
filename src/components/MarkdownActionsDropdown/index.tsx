import { IconCopy, IconEye, IconExternal, IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import React, { useState } from 'react'
import { Popover } from 'components/RadixUI/Popover'
import OSButton from 'components/OSButton'

interface CopyMarkdownActionsDropdownProps {
    /** Page URL for context */
    pageUrl: string
}

export const CopyMarkdownActionsDropdown: React.FC<CopyMarkdownActionsDropdownProps> = ({ pageUrl }) => {
    const [copied, setCopied] = useState(false)
    const [popoverOpen, setPopoverOpen] = useState(false)
    const menuItemButtonStyles =
        'flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-accent transition-colors w-full'
    const menuItemIconStyles = 'size-4'

    // Helper function to safely create markdown URL
    const getMarkdownUrl = (url: string) => {
        if (url.startsWith('/')) {
            return `${url}.md`
        }

        try {
            const urlObj = new URL(url)
            return `${urlObj.origin}${urlObj.pathname}.md`
        } catch {
            return `${url}.md`
        }
    }

    const handleCopyMarkdown = async () => {
        setPopoverOpen(false)
        try {
            const markdownUrl = getMarkdownUrl(pageUrl)
            const response = await fetch(markdownUrl)
            if (response.ok) {
                const markdownContent = await response.text()
                navigator.clipboard.writeText(markdownContent)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } else {
                console.error('Failed to fetch markdown:', response.statusText)
            }
        } catch (error) {
            console.error('Error fetching markdown:', error)
        }
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
