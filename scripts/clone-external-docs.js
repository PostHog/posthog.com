#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Prebuild script for external docs integration
 *
 * Clones external repos during Vercel builds to include their docs.
 * Configuration is read from gatsby-config-exports.js externalDocsSources array.
 *
 * Each source specifies:
 * - github.repo: GitHub repo to clone from (e.g., 'PostHog/posthog')
 * - github.path: Subdirectory to clone (e.g., 'docs/published')
 * - path: Local destination path
 * - ref: Git ref to clone (defaults to 'master' on Vercel)
 *
 * Usage:
 *   - Local dev: Skip (no env vars set, no sources present)
 *   - Vercel builds: Clones all configured sources
 *   - Feature branch previews: Override ref with env var (e.g., POSTHOG_MONOREPO_REF)
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// Import external docs sources config
const { externalDocsSources } = require('../gatsby-config-exports')

// Detect if running on Vercel
const isVercel = !!process.env.VERCEL

console.log('🔍 Environment:', {
    VERCEL: process.env.VERCEL,
    isVercel,
    configuredSources: externalDocsSources.length,
})

if (!externalDocsSources || externalDocsSources.length === 0) {
    console.log('ℹ️  No external docs sources configured, skipping clone')
    process.exit(0)
}

// Sanitize shell inputs to prevent command injection
function sanitizeShellArg(arg) {
    // Only allow alphanumeric, underscore, hyphen, forward slash, and dot
    if (typeof arg !== 'string' || !/^[a-zA-Z0-9/_.-]+$/.test(arg)) {
        throw new Error(`Invalid shell argument: ${arg}`)
    }
    return arg
}

// Clone each configured source
externalDocsSources.forEach((source) => {
    const { name, github, path: dest, ref: configRef } = source

    if (!github) {
        console.log(`⚠️  Source "${name}" has no github config, skipping`)
        return
    }

    // Determine ref to clone:
    // 1. Check for source-specific env var (e.g., POSTHOG_MONOREPO_REF)
    // 2. Use config ref if set
    // 3. Default to 'master' on Vercel
    const envVarName = `${name.toUpperCase().replace(/-/g, '_')}_REF`
    const envRef = process.env[envVarName]
    const refToClone = envRef || configRef || (isVercel ? 'master' : null)

    // Only clone if on Vercel or explicitly told to via env var
    const shouldClone = isVercel || envRef || configRef
    if (!shouldClone) {
        console.log(`ℹ️  Source "${name}": Not on Vercel and no ref set, skipping`)
        return
    }

    console.log(`📦 Cloning source: ${name}`)
    console.log(`   Repo: ${github.repo}`)
    console.log(`   Path: ${github.path}`)
    console.log(`   Ref: ${refToClone}`)
    console.log(`   Dest: ${dest}`)

    try {
        // Check if already cloned (prebuild runs twice in the build process)
        if (fs.existsSync(dest)) {
            console.log(`   ℹ️  Already exists, skipping`)
            return
        }

        // Sanitize inputs to prevent command injection
        const safeRef = sanitizeShellArg(refToClone)
        const safeRepo = sanitizeShellArg(github.repo)
        const safePath = sanitizeShellArg(github.path)
        const safeDest = sanitizeShellArg(dest)

        // Clone only specified directory with sparse-checkout (shallow, minimal data)
        console.log(`   📦 Setting up sparse clone...`)

        // Step 1: Initialize repo with no checkout
        execSync(
            `git clone --depth 1 --single-branch --branch ${safeRef} --no-checkout https://github.com/${safeRepo}.git ${safeDest}`,
            { stdio: 'inherit' }
        )

        // Step 2: Enable sparse-checkout in no-cone mode for strict path filtering
        execSync(
            `cd ${safeDest} && git sparse-checkout init --no-cone && git sparse-checkout set "${safePath}/*" && git checkout`,
            {
                stdio: 'inherit',
            }
        )

        // Step 2.5: Capture git info before removing .git directory
        const gitSha = execSync(`cd ${safeDest} && git rev-parse HEAD`, { encoding: 'utf8' }).trim()
        const gitBranch = execSync(`cd ${safeDest} && git rev-parse --abbrev-ref HEAD`, { encoding: 'utf8' }).trim()
        console.log(`   📍 Cloned commit: ${gitSha} (${gitBranch})`)

        // Write git info to metadata file for manifest generation
        const gitInfoPath = path.join(dest, '.git-info.json')
        fs.writeFileSync(
            gitInfoPath,
            JSON.stringify(
                {
                    sha: gitSha,
                    branch: gitBranch,
                    ref: refToClone,
                    clonedAt: new Date().toISOString(),
                },
                null,
                2
            )
        )

        // Step 3: Remove .git directory to prevent Gatsby from processing unwanted files
        const gitDir = path.join(dest, '.git')
        if (fs.existsSync(gitDir)) {
            console.log(`   🧹 Removing .git directory...`)
            fs.rmSync(gitDir, { recursive: true, force: true })
        }

        // Step 4: List and verify only expected files remain
        console.log(`   📋 Verifying clone contents...`)
        const remainingFiles = fs.readdirSync(dest)
        console.log(`   Files in ${dest}:`, remainingFiles)

        console.log(`   ✅ Cloned successfully`)
    } catch (error) {
        // Don't fail the build - log warning but continue
        console.warn(`   ⚠️  Failed to clone: ${error.message}`)
        console.warn(`   Continuing build without ${name}...`)
    }
})

console.log('✅ External docs clone complete')
process.exit(0)
