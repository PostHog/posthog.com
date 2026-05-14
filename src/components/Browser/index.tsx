import React, { useEffect, useState } from 'react'
import { IconExternal, IconRefresh, IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

interface BrowserProps {
    url: string
    location?: { pathname: string }
    newWindow?: boolean
    minimal?: boolean
}

export default function Browser({ url }: BrowserProps): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle, closeWindow } = useApp()
    const [iframeKey, setIframeKey] = useState(0)

    const displayHost = (() => {
        try {
            return new URL(url).host
        } catch {
            return url
        }
    })()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, displayHost)
        }
    }, [appWindow, displayHost])

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
                    <span className="text-secondary">{displayHost}</span>
                    <span className="text-muted">{url.slice(url.indexOf(displayHost) + displayHost.length)}</span>
                </div>
                <a
                    href={url}
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
                src={url}
                className="flex-1 w-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                referrerPolicy="no-referrer-when-downgrade"
                title={displayHost}
            />
        </div>
    )
}
