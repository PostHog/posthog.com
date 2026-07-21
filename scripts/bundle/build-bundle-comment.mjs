#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..', '..')
const reportDir = path.join(repoRoot, 'bundle-report')
const baselineDir = path.join(reportDir, 'baseline')
const commentPath = path.join(reportDir, 'comment.md')

const MARKER = '<!-- bundle-size-report -->'
const NUMERIC_CHUNK = /^\d+\.js$/

function readJson(file) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf-8'))
    } catch {
        return null
    }
}

function mib(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MiB`
}

function kib(bytes) {
    return `${(bytes / 1024).toFixed(1)} KiB`
}

function delta(current, base) {
    if (base == null) {
        return ''
    }
    const diff = current - base
    if (diff === 0) {
        return ' (no change)'
    }
    const sign = diff > 0 ? '+' : '-'
    const pct = base === 0 ? '' : ` / ${diff > 0 ? '+' : ''}${((diff / base) * 100).toFixed(1)}%`
    return ` (${sign}${kib(Math.abs(diff))}${pct})`
}

function eagerSection(report, baseline) {
    if (!report) {
        return ['### Eager graph', '', '_No eager-graph report produced this build._']
    }
    const baseByEntry = new Map((baseline?.roots ?? []).map((r) => [r.entrypoint, r]))
    const lines = [
        "### Eager graph (modules shipped in each entrypoint's initial chunks)",
        '',
        '| Entrypoint | Eager size | Budget | Modules |',
        '| --- | --- | --- | --- |',
    ]
    for (const r of report.roots) {
        const status = r.overBudget || r.forbiddenHits?.length ? '❌' : '✅'
        const budget = r.budgetBytes == null ? 'report-only' : mib(r.budgetBytes)
        const base = baseByEntry.get(r.entrypoint)
        lines.push(`| ${status} \`${r.entrypoint}\` | ${mib(r.bytes)}${delta(r.bytes, base?.bytes)} | ${budget} | ${r.files} |`)
    }
    for (const message of report.errors ?? []) {
        lines.push('', `> ⚠️ ${message}`)
    }
    for (const r of report.roots) {
        if (!r.largest?.length) {
            continue
        }
        lines.push('', `<details><summary>Largest modules in the <code>${r.entrypoint}</code> closure</summary>`, '', '| Module | Size |', '| --- | --- |')
        for (const { file, bytes } of r.largest.slice(0, 15)) {
            lines.push(`| \`${file}\` | ${kib(bytes)} |`)
        }
        lines.push('', '</details>')
    }
    return lines
}

function sizeSection(report, baseline) {
    if (!report) {
        return ['### Total JS', '', '_No bundle-size report produced this build._']
    }
    const lines = ['### Total JS (gzip)', '', `**${mib(report.total)}**${delta(report.total, baseline?.total)}`]

    const baseFiles = baseline?.files ?? {}
    const changed = Object.keys(report.files)
        .filter((name) => !NUMERIC_CHUNK.test(name))
        .map((name) => ({ name, cur: report.files[name], base: baseFiles[name] }))
        .filter(({ cur, base }) => base == null || Math.abs(cur - base) >= 1024)
        .sort((a, b) => Math.abs(b.cur - (b.base ?? 0)) - Math.abs(a.cur - (a.base ?? 0)))
        .slice(0, 15)

    if (baseline && changed.length) {
        lines.push(
            '',
            '<details><summary>Largest changed named chunks</summary>',
            '',
            '| Chunk | Gzip | Δ vs master |',
            '| --- | --- | --- |'
        )
        for (const { name, cur, base } of changed) {
            lines.push(`| \`${name}\` | ${kib(cur)} | ${base == null ? 'new' : delta(cur, base).trim().replace(/^\(|\)$/g, '')} |`)
        }
        lines.push('', '</details>')
    } else if (!baseline) {
        lines.push('', '_No master baseline yet — deltas appear once the baseline workflow has run on master._')
    }
    return lines
}

function main() {
    const eager = readJson(path.join(reportDir, 'eager-graph-report.json'))
    const size = readJson(path.join(reportDir, 'bundle-size-report.json'))
    const eagerBaseline = readJson(path.join(baselineDir, 'eager-graph-report.json'))
    const sizeBaseline = readJson(path.join(baselineDir, 'bundle-size-report.json'))

    const body = [
        MARKER,
        '## Bundle report',
        '',
        ...sizeSection(size, sizeBaseline),
        '',
        ...eagerSection(eager, eagerBaseline),
        '',
        '---',
        '_Eager-graph budgets are report-only until a baseline is established. ' +
            'Sizes are gzip of `public/**/*.js`; eager size is webpack module source bytes for the ' +
            "modules actually shipped in the entrypoint's initial chunks (post-tree-shake)._",
    ].join('\n')

    fs.mkdirSync(reportDir, { recursive: true })
    fs.writeFileSync(commentPath, body)
    console.info(`Wrote bundle comment to ${commentPath}`)
}

main()
