#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

/*
 * One-shot helper to suggest entries for src/data/mcp-rest-mapping.json.
 *
 * Fetches the live OpenAPI spec and the MCP tool definitions, finds operationIds
 * whose direct `_` → `-` transformation matches an existing MCP tool name, and
 * prints a JSON blob of NEW candidates (i.e. not already in the mapping file).
 *
 * Output is meant to be reviewed by a human before pasting into the mapping
 * file. The script never writes to the mapping file directly.
 *
 * Usage:
 *   node scripts/generate-mcp-rest-mapping-candidates.js
 *   node scripts/generate-mcp-rest-mapping-candidates.js --merge   # writes merged file
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const SPEC_URL = process.env.POSTHOG_OPEN_API_SPEC_URL || 'https://app.posthog.com/api/schema/'
const TOOLS_URL =
    'https://raw.githubusercontent.com/PostHog/posthog/refs/heads/master/services/mcp/schema/tool-definitions-all.json'
const MAPPING_FILE = path.resolve(__dirname, '../src/data/mcp-rest-mapping.json')

function get(url, headers = {}) {
    return new Promise((resolve, reject) => {
        https
            .get(url, { headers }, (res) => {
                if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    resolve(get(res.headers.location, headers))
                    return
                }
                let body = ''
                res.on('data', (c) => (body += c))
                res.on('end', () => resolve(body))
            })
            .on('error', reject)
    })
}

async function main() {
    const [specBody, toolsBody] = await Promise.all([get(SPEC_URL, { Accept: 'application/json' }), get(TOOLS_URL)])

    let spec
    try {
        spec = JSON.parse(specBody)
    } catch {
        console.error('Failed to parse OpenAPI spec as JSON. Try setting POSTHOG_OPEN_API_SPEC_URL to a JSON variant.')
        process.exit(1)
    }
    const tools = JSON.parse(toolsBody)
    const toolNames = new Set(Object.keys(tools))

    const operationIds = []
    for (const methods of Object.values(spec.paths || {})) {
        for (const op of Object.values(methods)) {
            if (op && typeof op === 'object' && op.operationId) {
                operationIds.push(op.operationId)
            }
        }
    }

    const existing = fs.existsSync(MAPPING_FILE) ? JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8')) : {}

    const candidates = {}
    for (const opId of operationIds) {
        const candidate = opId.replace(/_/g, '-')
        if (toolNames.has(candidate) && !existing[opId]) {
            candidates[opId] = [candidate]
        }
    }

    console.log(`Spec ops: ${operationIds.length}`)
    console.log(`MCP tools: ${toolNames.size}`)
    console.log(`Existing mappings: ${Object.keys(existing).length}`)
    console.log(`New direct-match candidates: ${Object.keys(candidates).length}`)
    console.log('')

    if (Object.keys(candidates).length === 0) {
        console.log('No new candidates.')
        return
    }

    if (process.argv.includes('--merge')) {
        const merged = { ...existing, ...candidates }
        const sorted = Object.fromEntries(Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)))
        fs.writeFileSync(MAPPING_FILE, JSON.stringify(sorted, null, 2) + '\n')
        console.log(`Wrote ${Object.keys(merged).length} entries to ${MAPPING_FILE}`)
    } else {
        console.log('Candidate JSON (paste into src/data/mcp-rest-mapping.json after review):')
        console.log(JSON.stringify(candidates, null, 2))
        console.log('')
        console.log('Or run with --merge to write directly.')
    }
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
