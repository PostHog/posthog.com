// Registers the `client:page` directive (see pageDirective.ts).
import type { AstroIntegration } from 'astro'
import { fileURLToPath } from 'node:url'

export default function pageIsland(): AstroIntegration {
    return {
        name: 'posthog:page-island',
        hooks: {
            'astro:config:setup': ({ addClientDirective }) => {
                addClientDirective({
                    name: 'page',
                    entrypoint: fileURLToPath(new URL('./pageDirective.ts', import.meta.url)),
                })
            },
        },
    }
}
