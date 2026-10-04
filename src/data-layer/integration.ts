// Astro integration that prepares the data layer before Astro starts: syncs the posthog/posthog
// clone, runs the sources, writes the generated files (artifacts.ts), indexes content, and writes
// the query files components import.
import type { AstroIntegration } from 'astro'
import { writeArtifacts } from './artifacts'
import { getContent } from './content'
import { env } from './env'
import { loadSources } from './index'
import { syncPosthogRepo } from './posthogRepo'
import { writeQueries } from './queries'

const HOUR = 60 * 60 * 1000

export default function dataLayer(): AstroIntegration {
    return {
        name: 'posthog:data-layer',
        hooks: {
            'astro:config:setup': async ({ command }) => {
                // CI and production builds fetch fresh data. Local runs reuse data younger than a day.
                // DATA_LAYER_MAX_AGE (hours) overrides both.
                const fresh = command === 'build' && !!env('CI')
                const hours = env('DATA_LAYER_MAX_AGE')
                const maxAge = hours !== undefined ? Number(hours) * HOUR : fresh ? 0 : 24 * HOUR
                syncPosthogRepo({ maxAge })
                await Promise.all([loadSources({ maxAge, strict: env('DATA_LAYER_STRICT') === '1' }), writeArtifacts()])
                getContent()
                await writeQueries()
            },
        },
    }
}
