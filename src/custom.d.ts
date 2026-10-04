import type { PostHog } from './types/posthog'

declare global {
    interface Window {
        __setPreferredTheme: (theme: string) => string
        __theme: string
        __onThemeChange: (theme: string) => void
        posthog: PostHog | undefined
    }
}
