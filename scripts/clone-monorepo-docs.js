#!/usr/bin/env node

/**
 * Prebuild script for monorepo docs PoC
 *
 * Clones the posthog monorepo at a specific git ref during Vercel builds.
 * This allows preview builds to include docs from feature branches.
 *
 * Usage:
 *   - Local dev: Skip (no POSTHOG_DOCS_REF env var)
 *   - Vercel preview: Triggered with POSTHOG_DOCS_REF=refs/pull/123/head
 *   - Vercel production: Skip (no env var set)
 *
 * References:
 *   - Issue: PostHog/posthog#38584
 *   - Guide: /docs/MONOREPO_DOCS_POC_SETUP.md in posthog.com
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const docsRef = process.env.POSTHOG_DOCS_REF;

// Skip if not set (normal production builds, local dev without override)
if (!docsRef) {
    console.log('ℹ️  POSTHOG_DOCS_REF not set, skipping monorepo clone');
    process.exit(0);
}

const monorepoDest = path.join(__dirname, '..', 'posthog');

console.log(`📦 Cloning posthog at ${docsRef}...`);

try {
    // Check if already exists
    if (fs.existsSync(monorepoDest)) {
        console.log('ℹ️  Monorepo already cloned, skipping');
        process.exit(0);
    }

    // Clone at specific ref
    const cloneCmd = `git clone --depth 1 --single-branch --branch ${docsRef} https://github.com/PostHog/posthog.git ${monorepoDest}`;

    console.log(`Running: ${cloneCmd}`);
    execSync(cloneCmd, { stdio: 'inherit' });

    console.log('✅ Monorepo docs cloned successfully');
    process.exit(0);
} catch (error) {
    // Don't fail the build - log warning but continue
    // This allows builds to proceed even if clone fails
    console.warn('⚠️  Failed to clone monorepo');
    console.warn(`   Error: ${error.message}`);
    console.warn('   Continuing build without monorepo docs...');
    process.exit(0); // Still exit successfully
}
