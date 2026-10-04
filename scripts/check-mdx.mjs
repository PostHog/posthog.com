#!/usr/bin/env node
// Compiles every content file with MDX 3, the same way the site build does, and lists the files that fail.
// Usage: node scripts/check-mdx.mjs [--json out.json] [glob...]
import { compile } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs/promises'
import os from 'node:os'
import { formatFor, mdxCompileOptions } from '../src/lib/mdx/options.mjs'

const args = process.argv.slice(2)
const jsonIndex = args.indexOf('--json')
const jsonOut = jsonIndex === -1 ? null : args.splice(jsonIndex, 2)[1]
const patterns = args.length
    ? args
    : ['contents/**/*.{md,mdx}', '.cache/posthog-main-repo/docs/published/**/*.{md,mdx}']

const files = await fg(patterns, { ignore: ['**/node_modules/**'] })
const failures = []
let next = 0

async function worker() {
    while (next < files.length) {
        const file = files[next++]
        const value = await fs.readFile(file, 'utf8')
        try {
            await compile({ value, path: file }, mdxCompileOptions({ development: false, format: formatFor(file) }))
        } catch (error) {
            failures.push({
                file,
                line: error.place?.start?.line ?? error.place?.line ?? error.line,
                reason: error.reason ?? error.message,
                rule: error.ruleId ?? error.source,
            })
        }
    }
}

await Promise.all(Array.from({ length: os.availableParallelism() }, worker))
failures.sort((a, b) => a.file.localeCompare(b.file))

for (const { file, line, reason } of failures) {
    console.log(`${file}:${line ?? '?'} ${reason.split('\n')[0]}`)
}
console.log(`\n${files.length - failures.length}/${files.length} files compile, ${failures.length} fail`)

if (jsonOut) {
    await fs.writeFile(jsonOut, JSON.stringify(failures, null, 2))
}
process.exitCode = failures.length ? 1 : 0
