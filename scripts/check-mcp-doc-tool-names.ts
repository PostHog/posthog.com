/*
 * Reports MCP tool names in docs pages that are not in the MCP tool catalog.
 *
 * Docs name MCP tools inline in backticks. A tool rename in PostHog/posthog does not fail
 * any build here, so a page can point agents at a tool that no longer exists.
 * See https://github.com/PostHog/posthog.com/issues/20440.
 *
 * Only pages that mention MCP are scanned, and only inline-code tokens that look like tool
 * names (see scripts/mcp-doc-tool-names.ts). Add a false positive to IGNORED below.
 *
 * Usage:
 *   pnpm check:mcp-doc-tool-names            # reports unknown names, exits 0
 *   pnpm check:mcp-doc-tool-names --check    # exits 1 if any unknown name is found
 */

import fs from 'fs'
import path from 'path'
import { fetchMCPToolDefinitions } from '../gatsby/utils/fetchMCPTools'
import { findUnknownToolReferences, referencesMcp, toolNameHints } from './mcp-doc-tool-names'

const DOCS_DIR = path.resolve(__dirname, '../contents/docs')

// Inline-code tokens that look like tool names but are not, e.g. a header name or a flag key.
const IGNORED = new Set(['x-api-key', 'example-flag', 'new-search'])

function docsFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) return docsFiles(full)
        return /\.mdx?$/.test(entry.name) ? [full] : []
    })
}

async function main(): Promise<void> {
    const checkOnly = process.argv.includes('--check')
    const toolNames = new Set(Object.keys(await fetchMCPToolDefinitions(process.env.GATSBY_POSTHOG_BRANCH || 'master')))
    if (toolNames.size === 0) throw new Error('The MCP tool catalog is empty')
    const hints = toolNameHints(toolNames)

    let count = 0
    for (const file of docsFiles(DOCS_DIR)) {
        const source = fs.readFileSync(file, 'utf8')
        if (!referencesMcp(source)) continue
        for (const { name, line } of findUnknownToolReferences(source, toolNames, hints, IGNORED)) {
            console.warn(`${path.relative(process.cwd(), file)}:${line}  \`${name}\` is not in the MCP tool catalog`)
            count++
        }
    }

    console.log(`Unknown MCP tool names: ${count} (catalog: ${toolNames.size} tools)`)
    if (checkOnly && count > 0) process.exitCode = 1
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
