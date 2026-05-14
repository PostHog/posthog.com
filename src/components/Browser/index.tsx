import React, { useEffect, useMemo, useState } from 'react'
import { IconExternal, IconRefresh, IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

interface BrowserProps {
    url: string
    location?: { pathname: string }
    newWindow?: boolean
    minimal?: boolean
}

// Defence-in-depth: only allow http/https URLs to reach `href` / iframe `src`.
// Anything else (javascript:, data:, vbscript:, file:, etc.) returns null.
function sanitizeHttpUrl(input: string): { href: string; host: string; pathAndRest: string } | null {
    try {
        const parsed = new URL(input)
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null
        const href = parsed.toString()
        return {
            href,
            host: parsed.host,
            pathAndRest: parsed.pathname + parsed.search + parsed.hash,
        }
    } catch {
        return null
    }
}

export default function Browser({ url }: BrowserProps): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle, closeWindow } = useApp()
    const [iframeKey, setIframeKey] = useState(0)

    const safeUrl = useMemo(() => sanitizeHttpUrl(url), [url])

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, safeUrl?.host || 'Browser')
        }
    }, [appWindow, safeUrl?.host])

    if (!safeUrl) {
        return (
            <div
                data-app="Browser"
                data-scheme="primary"
                className="@container w-full h-full flex items-center justify-center bg-primary p-6 text-center text-secondary"
            >
                <div>
                    <p className="mb-2 font-semibold text-primary">Can't open this link in a PostHog window.</p>
                    <p className="text-sm">Only http(s) URLs can be embedded.</p>
                </div>
            </div>
        )
    }

    return (
        <div
            data-app="Browser"
            data-scheme="primary"
            className="@container w-full h-full flex flex-col min-h-1 bg-primary"
        >
            <div className="flex items-center gap-2 px-2 py-1.5 border-b border-primary bg-accent">
                <button
                    type="button"
                    onClick={() => setIframeKey((k) => k + 1)}
                    title="Reload"
                    className="p-1 rounded hover:bg-input-bg text-secondary hover:text-primary"
                >
                    <IconRefresh className="size-4" />
                </button>
                <div className="flex-1 truncate text-sm font-mono px-2 py-1 rounded bg-primary border border-primary text-primary">
                    <span className="text-secondary">{safeUrl.host}</span>
                    <span className="text-muted">{safeUrl.pathAndRest}</span>
                </div>
                <a
                    href={safeUrl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in browser tab"
                    className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded text-secondary hover:text-primary hover:bg-input-bg"
                >
                    <IconExternal className="size-4" />
                    <span className="hidden @md:inline">Open in tab</span>
                </a>
                {appWindow && (
                    <button
                        type="button"
                        onClick={() => closeWindow(appWindow)}
                        title="Close"
                        className="p-1 rounded hover:bg-input-bg text-secondary hover:text-primary"
                    >
                        <IconX className="size-4" />
                    </button>
                )}
            </div>
            <iframe
                key={iframeKey}
                src={safeUrl.href}
                className="flex-1 w-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                referrerPolicy="no-referrer-when-downgrade"
                title={safeUrl.host}
            />
        </div>
    )
}
