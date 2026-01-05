import { IconCopy, IconEye, IconExternal, IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import React, { useState, useEffect } from 'react'
import { Popover } from 'components/RadixUI/Popover'
import OSButton from 'components/OSButton'

// Helper function to create markdown URL from page path
export const getMarkdownUrl = (path: string): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://posthog.com'
    return `${origin}${path}.md`
}

// Check if the markdown URL exists (returns 200) or not (returns 404)
export const checkMarkdownUrlExists = async (pageUrl: string): Promise<boolean> => {
    try {
        const markdownUrl = getMarkdownUrl(pageUrl)
        const response = await fetch(markdownUrl, { method: 'HEAD' })
        return response.ok
    } catch {
        return false
    }
}

// Hook to check if markdown URL exists
export const useMarkdownUrlExists = (pageUrl: string): boolean | null => {
    const [exists, setExists] = useState<boolean | null>(null)

    useEffect(() => {
        let cancelled = false

        const check = async () => {
            const result = await checkMarkdownUrlExists(pageUrl)
            if (!cancelled) {
                setExists(result)
            }
        }

        check()

        return () => {
            cancelled = true
        }
    }, [pageUrl])

    return exists
}

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

    const markdownUrl = getMarkdownUrl(pageUrl)

    console.log('markdownUrl', markdownUrl)

    const handleCopyMarkdown = async () => {
        setPopoverOpen(false)
        try {
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

            <a href={markdownUrl} target="_blank" rel="noopener noreferrer" className={menuItemButtonStyles}>
                <IconEye className={menuItemIconStyles} />
                <span>View as Markdown</span>
            </a>

            <Link
                to={`https://chat.openai.com/?q=${encodeURIComponent(
                    `Read from ${markdownUrl} so I can ask questions about it`
                )}`}
                externalNoIcon
                className={menuItemButtonStyles}
            >
                <IconExternal className={menuItemIconStyles} />
                <span>Open in ChatGPT</span>
            </Link>

            <Link
                to={`https://claude.ai/new?q=${encodeURIComponent(
                    `Read from ${markdownUrl} so I can ask questions about it`
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
