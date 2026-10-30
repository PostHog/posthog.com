#!/usr/bin/env node
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..', '..')
const graphPath = path.join(repoRoot, 'bundle-report', 'webpack-graph.json')
const reportPath = path.join(repoRoot, 'bundle-report', 'eager-graph-report.json')

// The eager graph is everything an entrypoint actually SHIPS on first load — the JS a
// browser must download and decode before that surface is interactive, regardless of how
// the bytes are split across chunks. Total dist size can't see regressions here (a
// fake-lazy require() moves no bytes but makes them eager), which is why this check exists
// alongside the compressed bundle-size check.
//
// It is measured from the modules webpack placed into the entrypoint's INITIAL
// (synchronously loaded) chunks — the `eager` set emitted per entrypoint by the
// EMIT_WEBPACK_STATS plugin. That set is post-tree-shaking: a module whose used exports
// were all eliminated is never assigned to a chunk, so a side-effect-free re-export barrel
// only costs the sub-modules that survive into the output, not every module it statically
// names. Walking the raw static import graph (what this check used to do) counted the whole
// barrel and mistook reachability for shipped weight.
//
// posthog.com is Gatsby + webpack, page-split: every page lazily loads its own chunk.
// What is loaded on EVERY page is the `app` entrypoint — Gatsby's runtime plus whatever
// gatsby-browser.tsx statically pulls in (global providers, layout, global CSS-in-JS).
// A heavy import that creeps into that eager set inflates first-load for every single page
// on the site, so `app` is the root we budget. The measurement input is
// bundle-report/webpack-graph.json, emitted by the EMIT_WEBPACK_STATS plugin in
// gatsby-node.ts.
//
// Budgets are module source bytes (webpack module.size(), pre-minification): stable across
// builds and proportional to decoded-script cost. Ratchet policy: when a splitting win
// lands, lower the budget to lock it in; raise one only as a conscious, reviewed decision
// in the PR that needs it.
const ROOTS = [
    {
        entrypoint: 'app',
        label: 'app shell (loaded on every page)',
        // Set from the first CI measurement — until then the check runs report-only and
        // never fails the build (see --report-only in the workflow).
        budgetBytes: null,
        forbidden: [],
    },
]

function formatMiB(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MiB`
}

function fail(message) {
    console.error(`\n❌ ${message}`)
    process.exitCode = 1
}

function eagerClosure(modules, roots) {
    const parentOf = new Map()
    const seen = new Set(roots)
    const queue = [...roots]
    while (queue.length) {
        const id = queue.shift()
        for (const target of modules[id]?.static || []) {
            if (seen.has(target) || !modules[target]) {
                continue
            }
            seen.add(target)
            parentOf.set(target, id)
            queue.push(target)
        }
    }
    return { seen, parentOf }
}

function chainTo(parentOf, modules, target) {
    const chain = []
    let cur = target
    while (cur !== undefined && chain.length < 50) {
        chain.unshift(modules[cur]?.name ?? cur)
        cur = parentOf.get(cur)
    }
    return chain
}

export function measure(graph, roots = ROOTS) {
    const report = { roots: [], errors: [] }
    for (const { entrypoint, label, budgetBytes, forbidden } of roots) {
        const ep = graph.entrypoints?.[entrypoint]
        if (!ep || !ep.eager?.length) {
            const known = Object.keys(graph.entrypoints ?? {}).join(', ') || '(none)'
            report.errors.push(
                `Entrypoint '${entrypoint}' not found in webpack graph (or has no eager modules). Known entrypoints: ${known}`
            )
            continue
        }

        // The shipped, tree-shaken set: modules webpack actually placed into this
        // entrypoint's initial chunks. Measuring these instead of walking the static import
        // closure means a module whose used exports were all tree-shaken away costs nothing.
        const shipped = ep.eager
        let totalBytes = 0
        for (const id of shipped) {
            totalBytes += graph.modules[id]?.size ?? 0
        }
        const largest = shipped
            .map((id) => ({ file: graph.modules[id]?.name ?? id, bytes: graph.modules[id]?.size ?? 0 }))
            .sort((a, b) => b.bytes - a.bytes)
            .slice(0, 15)

        const overBudget = budgetBytes != null && totalBytes > budgetBytes

        // A forbidden module is a violation only when it actually ships in the eager set.
        // The import chain is a best-effort trace through the static input graph (what a
        // human reads); it can be short if the shipped edge has no source-level counterpart.
        const forbiddenHits = []
        if (forbidden?.length) {
            const { parentOf } = eagerClosure(graph.modules, ep.roots)
            for (const substr of forbidden) {
                const hit = shipped.find((id) => (graph.modules[id]?.name ?? '').includes(substr))
                if (hit != null) {
                    forbiddenHits.push({ module: substr, chain: chainTo(parentOf, graph.modules, hit) })
                }
            }
        }

        report.roots.push({
            entrypoint,
            label,
            bytes: totalBytes,
            files: shipped.length,
            budgetBytes,
            overBudget,
            forbidden: forbidden ?? [],
            forbiddenHits,
            largest,
        })
    }
    return report
}

function printAndEnforce(report) {
    const summaryLines = [
        '## Eager graph check',
        '',
        '| Entrypoint | Eager size | Budget | Modules |',
        '| --- | --- | --- | --- |',
    ]
    for (const message of report.errors ?? []) {
        fail(message)
    }
    for (const r of report.roots) {
        const status = r.overBudget || r.forbiddenHits.length > 0 ? '❌' : '✅'
        const budget = r.budgetBytes == null ? 'unset (report-only)' : formatMiB(r.budgetBytes)
        console.info(`${status} ${r.label}`)
        console.info(`   entrypoint: ${r.entrypoint}`)
        console.info(`   eager (shipped): ${r.files} modules, ${formatMiB(r.bytes)} (budget ${budget})`)
        console.info('   largest modules shipped eagerly:')
        for (const { file, bytes } of r.largest.slice(0, 10)) {
            console.info(`   ${formatMiB(bytes).padStart(10)}  ${file}`)
        }
        summaryLines.push(`| ${status} \`${r.entrypoint}\` | ${formatMiB(r.bytes)} | ${budget} | ${r.files} |`)

        if (r.overBudget) {
            fail(
                `Eager graph for '${r.entrypoint}' is ${formatMiB(r.bytes)}, over the ${formatMiB(r.budgetBytes)} budget.\n` +
                    `Something newly shipped in the eager chunks is inflating it. Largest modules:\n` +
                    r.largest.map(({ file, bytes }) => `   ${formatMiB(bytes).padStart(10)}  ${file}`).join('\n') +
                    `\nMake the offending import lazy (loadable / dynamic import()), or raise the budget in ` +
                    `scripts/bundle/check-eager-graph.mjs as a conscious decision in this PR.`
            )
        }
        for (const hit of r.forbiddenHits) {
            fail(
                `'${hit.module}' ships eagerly from '${r.entrypoint}' — it must stay behind a dynamic import.\n` +
                    `Import chain:\n   ${hit.chain.join('\n   -> ')}`
            )
        }
    }
    if (process.env.GITHUB_STEP_SUMMARY) {
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryLines.join('\n') + '\n')
    }
}

function assertReport(reportFilePath) {
    if (!fs.existsSync(reportFilePath)) {
        fail(`Report not found at ${reportFilePath} — did the build run the check?`)
        return
    }
    const report = JSON.parse(fs.readFileSync(reportFilePath, 'utf-8'))
    printAndEnforce(report)
}

function main() {
    const reportOnly = process.argv.includes('--report-only')
    const assertIndex = process.argv.indexOf('--assert-report')

    if (assertIndex !== -1) {
        assertReport(process.argv[assertIndex + 1] ?? reportPath)
    } else {
        if (!fs.existsSync(graphPath)) {
            fail(`Webpack graph not found at ${graphPath} — build with EMIT_WEBPACK_STATS=true first.`)
            process.exit(1)
        }
        const graph = JSON.parse(fs.readFileSync(graphPath, 'utf-8'))
        const report = measure(graph)
        try {
            report.sha = execSync('git rev-parse HEAD', { cwd: repoRoot, encoding: 'utf-8' }).trim()
        } catch {
            // best-effort; report is still usable without a sha
        }
        fs.mkdirSync(path.dirname(reportPath), { recursive: true })
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
        printAndEnforce(report)
    }

    if (process.exitCode) {
        console.error('\nEager graph check failed — see above.')
        if (reportOnly) {
            console.error('Running with --report-only: violations recorded in the report, not failing the build.')
            process.exit(0)
        }
    } else {
        console.info('\nAll eager graph budgets respected.')
    }
    process.exit(process.exitCode ?? 0)
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main()
}
