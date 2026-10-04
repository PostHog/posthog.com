// Keeps the sparse clone of posthog/posthog up to date. It provides docs/published (docs and
// handbook pages), docs/onboarding (snippets that content imports), and agent skill files.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { env } from './env'
import { POSTHOG_REPO_DIR } from './paths'

// docs/onboarding has a tsconfig that extends the posthog/posthog root tsconfig, which is not checked
// out; leaving it out makes those files compile with this repo's tsconfig, as they always did.
const PATTERNS = [
    'docs/published/**',
    'docs/onboarding/**',
    '!docs/onboarding/tsconfig.json',
    'products/*/skills/*/SKILL.md',
]
const REMOTE = 'https://github.com/posthog/posthog.git'

function git(args: string[], cwd?: string) {
    execFileSync('git', args, { cwd, stdio: 'pipe' })
}

/** Clones or updates the repo. A failure is logged, and the build continues without its docs, as before. */
export function syncPosthogRepo({ maxAge = 0 }: { maxAge?: number } = {}): void {
    const branch = env('POSTHOG_BRANCH') ?? 'master'
    const marker = path.join(POSTHOG_REPO_DIR, '.git', 'FETCH_HEAD')
    const branchFile = path.join(POSTHOG_REPO_DIR, '.git', 'posthog-com-branch')
    try {
        const sameBranch = fs.existsSync(branchFile) && fs.readFileSync(branchFile, 'utf8') === branch
        if (fs.existsSync(path.join(POSTHOG_REPO_DIR, '.git')) && sameBranch) {
            const age = fs.existsSync(marker) ? Date.now() - fs.statSync(marker).mtimeMs : Infinity
            git(['sparse-checkout', 'set', '--no-cone', ...PATTERNS], POSTHOG_REPO_DIR)
            if (age < maxAge) return
            git(['fetch', '--depth', '1', 'origin', branch], POSTHOG_REPO_DIR)
            git(['reset', '--hard', 'FETCH_HEAD'], POSTHOG_REPO_DIR)
        } else {
            fs.rmSync(POSTHOG_REPO_DIR, { recursive: true, force: true })
            git([
                'clone',
                '--depth',
                '1',
                '--filter=blob:none',
                '--sparse',
                '--branch',
                branch,
                REMOTE,
                POSTHOG_REPO_DIR,
            ])
            git(['sparse-checkout', 'set', '--no-cone', ...PATTERNS], POSTHOG_REPO_DIR)
            fs.writeFileSync(branchFile, branch)
            fs.writeFileSync(marker, '')
        }
        console.log(`[data-layer] posthog/posthog ${branch} synced`)
    } catch (error) {
        console.error(`[data-layer] could not sync posthog/posthog: ${(error as Error).message}`)
    }
}
