/// <reference types="astro/client" />

declare module 'astro' {
    interface AstroClientDirectives {
        /** Hydrates the page island after its page and content modules load (src/islands/pageDirective.ts). */
        'client:page'?: boolean
    }
}

export {}
