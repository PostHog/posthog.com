import React from 'react'

/**
 * A "stale asset" error is what Gatsby's client-side router throws when it can't
 * fetch a JS chunk or a `page-data.json` file during client navigation. This is
 * overwhelmingly caused by a new deploy: the HTML the visitor already has in
 * memory references hashed asset filenames that no longer exist on the CDN, so
 * the fetch 404s / times out and the navigation dies with a blank screen.
 *
 * A hard reload fixes it: the browser re-fetches the current (post-deploy) HTML,
 * which references the new asset hashes.
 */
export const isStaleAssetError = (error: unknown): boolean => {
    if (!error) {
        return false
    }
    const name = (error as { name?: string })?.name || ''
    const message = typeof error === 'string' ? error : (error as { message?: string })?.message || String(error ?? '')

    return (
        name === 'ChunkLoadError' ||
        /Loading( CSS)? chunk [\w-]+ failed/i.test(message) ||
        /page-data/i.test(message) ||
        /couldn'?t load/i.test(message) ||
        /Failed to fetch dynamically imported module/i.test(message) ||
        /Importing a module script failed/i.test(message)
    )
}

const RELOAD_GUARD_KEY = 'phcom:stale-asset-reload'

/**
 * Trigger a single hard reload to recover from a stale-asset failure, guarded so
 * we never get stuck in a reload loop if the asset is genuinely gone (in which
 * case reloading won't help and we should fall through to the fallback UI).
 *
 * Returns `true` if a reload was triggered, `false` if it was suppressed.
 */
export const reloadForStaleAssets = (): boolean => {
    if (typeof window === 'undefined') {
        return false
    }
    try {
        const now = Date.now()
        const last = Number(window.sessionStorage.getItem(RELOAD_GUARD_KEY) || 0)
        // Don't reload more than once every 15s — protects against loops when a
        // reload can't actually resolve the failure.
        if (now - last < 15000) {
            return false
        }
        window.sessionStorage.setItem(RELOAD_GUARD_KEY, String(now))
        window.location.reload()
        return true
    } catch {
        return false
    }
}

interface ErrorBoundaryProps {
    children: React.ReactNode
    /**
     * When this value changes the boundary resets its error state. Pass the
     * current path so navigating away from a page that errored clears the
     * fallback and lets the next page render.
     */
    resetKey?: string
}

interface ErrorBoundaryState {
    hasError: boolean
    showFallback: boolean
}

/**
 * Catches render-time exceptions in page content so a single broken page (or a
 * chunk that failed to evaluate) degrades to a readable message with a reload
 * action instead of a blank screen. Stale-asset errors auto-recover via a
 * guarded reload; everything else shows the fallback.
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, showFallback: false }
    }

    static getDerivedStateFromError(error: unknown): Partial<ErrorBoundaryState> {
        // Pure state derivation only. Stale-asset errors will be reloaded away in
        // componentDidCatch, so render nothing meanwhile; other errors show the
        // fallback immediately.
        return { hasError: true, showFallback: !isStaleAssetError(error) }
    }

    componentDidCatch(error: unknown): void {
        // Side effects belong here, not in getDerivedStateFromError. Attempt a
        // guarded reload for stale assets; if it's suppressed (loop guard) fall
        // back to the visible message rather than a permanent blank screen.
        if (isStaleAssetError(error) && !reloadForStaleAssets()) {
            this.setState({ showFallback: true })
        }
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps): void {
        if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
            this.setState({ hasError: false, showFallback: false })
        }
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            if (!this.state.showFallback) {
                return null
            }
            return (
                <div
                    data-scheme="primary"
                    className="flex flex-col items-center justify-center gap-2 p-8 text-center text-primary min-h-[50vh]"
                >
                    <h2 className="text-lg font-bold m-0">This page didn't load correctly</h2>
                    <p className="text-secondary m-0">
                        Something went wrong while loading this page. Reloading usually fixes it.
                    </p>
                    <button
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.location.reload()
                            }
                        }}
                        className="mt-2 px-4 py-2 rounded border border-primary bg-accent hover:bg-border font-semibold"
                    >
                        Reload page
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}
