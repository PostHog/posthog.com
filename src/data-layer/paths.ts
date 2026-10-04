// File locations shared by the data layer. Everything is relative to the project root, which is the
// working directory for `astro dev`, `astro build`, and the scripts.
import path from 'node:path'

export const ROOT = process.cwd()
export const CONTENTS_DIR = path.join(ROOT, 'contents')
export const CACHE_DIR = path.join(ROOT, '.cache', 'data-layer')
export const QUERY_DIR = path.join(CACHE_DIR, 'queries')
/** The sparse clone of posthog/posthog: docs/published, docs/onboarding, and agent skill files. */
export const POSTHOG_REPO_DIR = path.join(ROOT, '.cache', 'posthog-main-repo')
