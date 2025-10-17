#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Prebuild script for monorepo docs PoC
 *
 * Clones the posthog monorepo during Vercel builds to include docs.
 * Defaults to master branch for production/preview builds.
 * Can be overridden with POSTHOG_DOCS_REF for feature branch previews.
 *
 * Usage:
 *   - Local dev: Skip (no POSTHOG_DOCS_REF env var, no monorepo present)
 *   - Vercel posthog.com PR preview: Clones posthog@master
 *   - Vercel posthog feature branch preview: Triggered with POSTHOG_DOCS_REF=refs/pull/123/head
 *
 * References:
 *   - Issue: PostHog/posthog#38584
 *   - Guide: /docs/MONOREPO_DOCS_BUILD_GUIDE.md in posthog monorepo
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// Detect if running on Vercel - check for any truthy value
const isVercel = !!process.env.VERCEL
const docsRef = process.env.POSTHOG_DOCS_REF

// Debug: log environment
console.log('🔍 Environment:', {
    VERCEL: process.env.VERCEL,
    isVercel,
    POSTHOG_DOCS_REF: docsRef,
})

// Only clone if:
// 1. On Vercel (defaults to master), or
// 2. Explicitly told to with POSTHOG_DOCS_REF (for local testing)
const shouldClone = isVercel || docsRef
const refToClone = docsRef || (isVercel ? 'master' : null)

if (!shouldClone) {
    console.log('ℹ️  Not on Vercel and no POSTHOG_DOCS_REF set, skipping monorepo clone')
    process.exit(0)
}

const monorepoDest = path.join(__dirname, '..', '.posthog-monorepo-cache')

console.log(`📦 Cloning posthog at ${refToClone}...`)

try {
    const docsPath = path.join(monorepoDest, 'docs')

    // Check if docs already exist - if yes, skip clone
    if (fs.existsSync(docsPath)) {
        console.log('ℹ️  Monorepo docs already present, skipping clone')
        process.exit(0)
    }

    // Clone at specific ref
    const cloneCmd = `git clone --depth 1 --single-branch --branch ${refToClone} https://github.com/PostHog/posthog.git ${monorepoDest}`

    console.log(`Running: ${cloneCmd}`)
    execSync(cloneCmd, { stdio: 'inherit' })

    console.log('✅ Monorepo docs cloned successfully')
    process.exit(0)
} catch (error) {
    // Don't fail the build - log warning but continue
    // This allows builds to proceed even if clone fails
    console.warn('⚠️  Failed to clone monorepo')
    console.warn(`   Error: ${error.message}`)
    console.warn('   Continuing build without monorepo docs...')
    process.exit(0) // Still exit successfully
}
