#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import zlib from 'node:zlib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..', '..')
const publicDir = path.join(repoRoot, 'public')
const reportPath = path.join(repoRoot, 'bundle-report', 'bundle-size-report.json')

// Gatsby names chunks `[name]-[contenthash].js`. The content hash changes every build,
// so strip it to get a build-stable identity to diff against the master baseline.
const HASH_SUFFIX = /-[0-9a-f]{8,40}(\.js)$/

function strippedName(file) {
    return path.basename(file).replace(HASH_SUFFIX, '$1')
}

function walkJs(dir, acc = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walkJs(full, acc)
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            acc.push(full)
        }
    }
    return acc
}

function main() {
    if (!fs.existsSync(publicDir)) {
        console.error(`Bundle size report: ${publicDir} not found — run \`pnpm build\` first.`)
        process.exit(1)
    }

    const files = {}
    let total = 0
    for (const file of walkJs(publicDir)) {
        const gzip = zlib.gzipSync(fs.readFileSync(file)).length
        const name = strippedName(file)
        files[name] = (files[name] ?? 0) + gzip
        total += gzip
    }

    const report = { total, files }
    fs.mkdirSync(path.dirname(reportPath), { recursive: true })
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.info(`Bundle size report: ${Object.keys(files).length} stable JS names, total gzip ${(total / 1024 / 1024).toFixed(2)} MiB`)
}

main()
