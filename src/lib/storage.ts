// Safe wrapper around `localStorage`.
//
// A browser that blocks site storage makes every access to `localStorage`
// throw. WebKit removes the global (`ReferenceError`); Chromium keeps it but
// denies the read (`SecurityError`). A bare `typeof window !== 'undefined'`
// check does not catch either case. Each function below degrades to `null` or
// a no-op instead, so a caller never crashes.

export const getStorageItem = (key: string): string | null => {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

export const setStorageItem = (key: string, value: string): void => {
    try {
        localStorage.setItem(key, value)
    } catch {
        // Storage is blocked or full. Drop the write.
    }
}

export const removeStorageItem = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch {
        // Storage is blocked. Nothing to remove.
    }
}
