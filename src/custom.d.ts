import type { PostHog } from './types/posthog'

declare module '*.svg' {
    const content: React.HTMLImageElement
    export default content
}
declare module '*.png' {
    const content: React.HTMLImageElement
    export default content
}

declare global {
    /**
     * CSS Custom Highlight API – used by `lib/textFragment` to paint `#:~:text=` matches without
     * touching the DOM. Missing from the DOM lib this repo's TypeScript ships with.
     */
    class Highlight {
        constructor(...ranges: Range[])
    }

    namespace CSS {
        const highlights: Map<string, Highlight> | undefined
    }

    interface Window {
        __setPreferredTheme: (theme: string) => void
        __theme: string
        __onThemeChange: (theme: string) => void
        posthog: PostHog | undefined
    }
}
