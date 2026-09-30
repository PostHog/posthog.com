import type { PostHog } from './types/posthog'

declare module '*.svg' {
    const content: React.HTMLImageElement
    export default content
}
declare module '*.png' {
    const content: React.HTMLImageElement
    export default content
}
declare module '*.yml' {
    const content: Record<string, any>
    export default content
}

declare global {
    interface Window {
        __setPreferredTheme: (theme: string) => void
        __theme: string
        __onThemeChange: (theme: string) => void
        posthog: PostHog | undefined
    }
}
