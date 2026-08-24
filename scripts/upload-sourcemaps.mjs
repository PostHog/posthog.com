// Inject chunk IDs into the built JavaScript and upload the source maps to PostHog
// error tracking. Without this step every stack trace from the live site shows raw
// webpack module ids in the minified bundle, which nobody can read.
//
// The step runs after `gatsby build`, so it works on the `public/` output. It only
// runs when a PostHog personal API key is present, so local builds and pull request
// previews skip it. It never fails the build: a source map problem must not block a
// deploy.

import { spawnSync } from 'node:child_process'

const BUILD_DIR = 'public'
const RELEASE_NAME = 'posthog.com'
const CLI_VERSION = '0.11.2'

// The CLI reads POSTHOG_CLI_API_KEY and POSTHOG_CLI_PROJECT_ID from the environment and needs
// both. Skip unless both are present, otherwise the CLI would run and fail with a credential error.
if (!process.env.POSTHOG_CLI_API_KEY || !process.env.POSTHOG_CLI_PROJECT_ID) {
    console.log('[sourcemaps] POSTHOG_CLI_API_KEY or POSTHOG_CLI_PROJECT_ID not set. Skipping source map upload.')
    process.exit(0)
}

// Vercel sets VERCEL_GIT_COMMIT_SHA; GitHub Actions sets GITHUB_SHA.
const releaseVersion = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || 'unknown'

const args = [
    'dlx',
    `@posthog/cli@${CLI_VERSION}`,
    'sourcemap',
    'process',
    '--directory',
    BUILD_DIR,
    '--release-name',
    RELEASE_NAME,
    '--release-version',
    releaseVersion,
]

console.log(`[sourcemaps] Uploading source maps for ${RELEASE_NAME}@${releaseVersion}`)
const result = spawnSync('pnpm', args, { stdio: 'inherit' })

if (result.status !== 0) {
    console.warn('[sourcemaps] Upload failed. The deploy continues without readable stack traces.')
}

process.exit(0)
