import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// Gatsby writes production source maps into public/, but PostHog error tracking does not read them
// from the deployed site. It symbolicates from uploaded symbol sets. Without this step, every
// browser exception from posthog.com shows minified names. The `postbuild` hook runs this script.
const credentials = ['POSTHOG_CLI_API_KEY', 'POSTHOG_CLI_PROJECT_ID']
const missing = credentials.filter((name) => !process.env[name])

if (missing.length > 0) {
    console.log(`Source map upload skipped: ${missing.join(' and ')} not set.`)
    process.exit(0)
}

const { status } = spawnSync(
    'pnpm',
    [
        'exec',
        'posthog-cli',
        'sourcemap',
        'process',
        '--directory',
        fileURLToPath(new URL('../public/', import.meta.url)),
    ],
    { stdio: 'inherit' }
)

// A site that does not deploy is worse than one with minified stack traces, so report the failure
// and let the build finish.
if (status !== 0) {
    console.warn('Source map upload failed. Stack traces from this build stay minified.')
}
