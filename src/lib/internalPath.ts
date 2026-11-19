// Guard for `navigate()` targets from an untrusted source, such as a cross-window
// postMessage or a shared URL. Only same-origin absolute paths like "/docs/foo" are
// allowed. This blocks "javascript:" and "data:" URLs (which Gatsby's navigate() would
// run via window.location, giving XSS) as well as "//" and "/\" host paths (open redirect).
export const isSafeInternalPath = (path: unknown): path is string => {
    if (typeof path !== 'string' || !path.startsWith('/') || /^\/[/\\]/.test(path)) {
        return false
    }
    try {
        return new URL(path, 'https://posthog.com').origin === 'https://posthog.com'
    } catch {
        return false
    }
}

export const getSharedWindows = (windows: unknown): { path: string; [key: string]: unknown }[] =>
    Array.isArray(windows) ? windows.filter((win) => isSafeInternalPath(win?.path)) : []
