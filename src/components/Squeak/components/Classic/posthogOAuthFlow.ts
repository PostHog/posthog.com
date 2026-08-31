// Shared state for the PostHog OAuth sign-in flow, kept in sessionStorage so it
// survives both the external round-trip to oauth.posthog.com and any client
// remount of the landing page, and clears itself when the tab closes.
//
// - RETURN_TO: the URL the user started from, so a completed sign-in returns
//   them there instead of the marketing home page.
// - PENDING: the disambiguation state (a fresh server token, not the consumed
//   access token), so a remount restores the "create or link" screen rather than
//   replaying an exchange the server has already finished.
// - MODE: the disambiguation screen the user chose ("create" vs "link").
export const OAUTH_RETURN_TO_KEY = 'posthog_oauth_return_to'
export const OAUTH_PENDING_KEY = 'posthog_oauth_pending'
export const OAUTH_MODE_KEY = 'posthog_oauth_mode'

// Start a new sign-in: record where to return, and drop any leftover progress
// from an earlier flow in the same tab so it can't resurface as stale state.
export const beginOAuthFlow = (returnTo: string): void => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(OAUTH_PENDING_KEY)
    sessionStorage.removeItem(OAUTH_MODE_KEY)
    sessionStorage.setItem(OAUTH_RETURN_TO_KEY, returnTo)
}

// Clear every trace of the flow once it ends (success, error, or a restart).
export const clearOAuthFlow = (): void => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(OAUTH_RETURN_TO_KEY)
    sessionStorage.removeItem(OAUTH_PENDING_KEY)
    sessionStorage.removeItem(OAUTH_MODE_KEY)
}
