declare module '*.svg' {
    const content: React.HTMLImageElement
    export default content
}
declare module '*.png' {
    const content: React.HTMLImageElement
    export default content
}

declare module 'mark.js' {
    export default class Mark {
        constructor(element: HTMLElement | HTMLElement[])
        mark(keyword: string, options?: any): void
        unmark(options?: any): void
    }
}

declare global {
    interface Window {
        __setPreferredTheme: (theme: string) => void
        __theme: string
        __onThemeChange: (theme: string) => void
    }
}
