import { IconCopy, IconEye, IconExternal, IconCheck, IconChevronDown } from '@posthog/icons'
import Link from 'components/Link'
import React, { useState, useEffect } from 'react'
import { Popover } from 'components/RadixUI/Popover'
import OSButton from 'components/OSButton'
import { isMarkdownContentPath } from '../../constants'

// `location.pathname` carries a trailing slash where `appWindow.path` doesn't, and
// `/docs/foo/.md` is not a real file. Normalize the same way seo.tsx does.
const normalizePath = (path?: string): string => (path || '').replace(/\/$/, '')

// Helper function to create markdown URL from page path
export const getMarkdownUrl = (path: string): string => {
    const normalized = normalizePath(path)
    if (!normalized) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://posthog.com'
    return `${origin}${normalized.startsWith('/') ? normalized : `/${normalized}`}.md`
}

// Check if the markdown URL exists (returns 200) or not (returns 404)
export const checkMarkdownUrlExists = async (pageUrl: string): Promise<boolean> => {
    if (!pageUrl || pageUrl === '/') return false
    try {
        const markdownUrl = getMarkdownUrl(pageUrl)
        const response = await fetch(markdownUrl, { method: 'HEAD' })
        return response.ok
    } catch {
        return false
    }
}

// Module-level caches so the HEAD request happens once per URL per session rather than
// once per mount — ReaderView remounts on every window/nav change.
const existsCache = new Map<string, boolean>()
const inFlight = new Map<string, Promise<boolean>>()

const resolveMarkdownExists = (pageUrl: string): Promise<boolean> => {
    const pending = inFlight.get(pageUrl)
    if (pending) return pending

    const promise = checkMarkdownUrlExists(pageUrl).then((result) => {
        existsCache.set(pageUrl, result)
        inFlight.delete(pageUrl)
        return result
    })
    inFlight.set(pageUrl, promise)
    return promise
}

/**
 * Returns `null` until the HEAD check resolves, then `true`/`false`. The check can only run
 * after hydration, so callers must treat `null` as "not yet known" and reserve space rather
 * than guessing — showing the control and then removing it on a `false` tears it out of the
 * DOM under the reader, dropdown and all.
 */
export const useMarkdownUrlExists = (pageUrl: string): boolean | null => {
    const [exists, setExists] = useState<boolean | null>(() => existsCache.get(pageUrl) ?? null)

    useEffect(() => {
        if (!pageUrl) {
            setExists(false)
            return
        }

        const cached = existsCache.get(pageUrl)
        if (cached !== undefined) {
            setExists(cached)
            return
        }

        // The .md files are written in onPostBuild, so they don't exist under `gatsby develop`.
        // Assume they're there rather than verifying, so the control is still reachable in dev —
        // the copy action itself will 404 there. See README.
        if (process.env.NODE_ENV === 'development') {
            setExists(true)
            return
        }

        let cancelled = false
        resolveMarkdownExists(pageUrl).then((result) => {
            if (!cancelled) setExists(result)
        })

        return () => {
            cancelled = true
        }
    }, [pageUrl])

    return exists
}

interface MarkdownActionsProps {
    /** Current page path, e.g. `/docs/product-analytics/installation` */
    pageUrl?: string
    /** Layout classes from the caller (ReaderView passes the prose column's width). */
    className?: string
}

/**
 * "Copy page" split button — copies the page's raw markdown, with a menu for viewing it or
 * handing it to an LLM. Renders on any page with a generated `.md` counterpart (see
 * `gatsby/rawMarkdownUtils.ts`) and returns null everywhere else.
 */
export const MarkdownActions: React.FC<MarkdownActionsProps> = ({ pageUrl, className = '' }) => {
    const [copied, setCopied] = useState(false)
    const [popoverOpen, setPopoverOpen] = useState(false)

    const path = normalizePath(pageUrl)
    const isAllowedPath = !!path && isMarkdownContentPath(path)
    const exists = useMarkdownUrlExists(isAllowedPath ? path : '')

    const menuItemButtonStyles =
        'flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-accent transition-colors w-full'
    const menuItemIconStyles = 'size-4'

    const markdownUrl = getMarkdownUrl(path)

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

    // The HEAD check can only answer after hydration, so the buttons stay hidden — but their
    // space stays reserved — until it does. Showing them optimistically and hiding them on a
    // 404 deleted the control, and any open dropdown, out from under the reader. Keeping the
    // slot mounted in every state means nothing below this shifts, and nothing that has been
    // shown is ever taken away. `invisible` also keeps the buttons out of the tab order and
    // the accessibility tree while unresolved.
    if (!isAllowedPath) return null

    return (
        <div className={`not-prose flex justify-end ${className}`}>
            <div className={`flex items-center gap-px ${exists === true ? '' : 'invisible'}`}>
                {/* `iconClassName` rather than the button's own className: OSButton's base classes
                    already set `text-primary` on the button, and two competing color utilities on one
                    element resolve by stylesheet order, not by which is written last. Setting the
                    color on the icon wrapper keeps both icons matched to the secondary label. */}
                <OSButton
                    size="md"
                    icon={copied ? <IconCheck className="text-green" /> : <IconCopy />}
                    iconClassName="text-secondary"
                    onClick={handleCopyMarkdown}
                    aria-label="Copy this page as Markdown"
                    tooltip="Copy this page as Markdown"
                >
                    <span className="hidden text-secondary  @sm/reader-content:inline">
                        {copied ? 'Copied' : 'Copy page'}
                    </span>
                </OSButton>

                <Popover
                    dataScheme="secondary"
                    align="end"
                    open={popoverOpen}
                    onOpenChange={setPopoverOpen}
                    trigger={
                        <span>
                            <OSButton
                                size="md"
                                aria-label="More Markdown actions"
                                icon={<IconChevronDown />}
                                iconClassName="text-secondary"
                            />
                        </span>
                    }
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
            </div>
        </div>
    )
}

export default MarkdownActions
