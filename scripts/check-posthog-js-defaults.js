#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Fails when a code example hardcodes a posthog-js `defaults` date.
 *
 * Code examples use the `<ph_posthog_js_defaults>` placeholder. `src/components/CodeBlock/index.tsx`
 * replaces it with the latest snapshot, so a version bump there updates every example. A hardcoded
 * date skips that replacement and goes stale when posthog-js ships a new snapshot.
 *
 * Only code is checked: fenced code blocks in Markdown, and every line of a script file. Prose that
 * names a specific snapshot, such as "enabled when `defaults` is `2026-08-29` or later", is fine.
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SCAN_DIRS = ['contents', 'src']
const MARKDOWN = /\.mdx?$/
const SCRIPT = /\.(?:js|jsx|ts|tsx)$/
const FENCE = /^\s*(?:```|~~~)/
const HARDCODED_DEFAULTS = /\bdefaults["']?\s*:\s*["'`]\d{4}-\d{2}-\d{2}["'`]/

const failures = []

for (const dir of SCAN_DIRS) {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true, recursive: true })) {
        const isMarkdown = MARKDOWN.test(entry.name)
        if (!entry.isFile() || (!isMarkdown && !SCRIPT.test(entry.name))) {
            continue
        }
        const file = path.join(entry.parentPath || entry.path, entry.name)
        let inFence = false
        fs.readFileSync(file, 'utf8')
            .split('\n')
            .forEach((line, index) => {
                if (isMarkdown && FENCE.test(line)) {
                    inFence = !inFence
                    return
                }
                if ((inFence || !isMarkdown) && HARDCODED_DEFAULTS.test(line)) {
                    failures.push(`${path.relative(ROOT, file)}:${index + 1}: ${line.trim()}`)
                }
            })
    }
}

if (failures.length > 0) {
    console.error('Hardcoded posthog-js defaults dates found in code examples:\n')
    for (const failure of failures) {
        console.error(`  ${failure}`)
    }
    console.error(
        [
            '',
            "Use `defaults: '<ph_posthog_js_defaults>'` instead. The code block replaces it with the latest",
            'snapshot. To change that snapshot, edit `<ph_posthog_js_defaults>` in',
            'src/components/CodeBlock/index.tsx.',
            '',
        ].join('\n')
    )
    process.exit(1)
}

console.log('No hardcoded posthog-js defaults dates in code examples.')
