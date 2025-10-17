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

console.log('🔍 Paths:', {
    __dirname,
    monorepoDest,
    cwd: process.cwd(),
})
console.log(`📦 Cloning posthog at ${refToClone}...`)

try {
    // Clone only docs directory with sparse-checkout (shallow, minimal data)
    console.log(`📦 Setting up sparse clone for docs/ only...`)

    // Step 1: Initialize repo with no checkout
    execSync(
        `git clone --depth 1 --single-branch --branch ${refToClone} --no-checkout https://github.com/PostHog/posthog.git ${monorepoDest}`,
        {
            stdio: 'inherit',
        }
    )

    // Step 2: Enable sparse-checkout and fetch only docs/
    execSync(`cd ${monorepoDest} && git sparse-checkout set docs && git checkout`, {
        stdio: 'inherit',
    })

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
