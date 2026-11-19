/**
 * The prompt demo on /mcp shows MCP tool calls by name. This test fails when a tool is renamed or
 * removed, so the demo doesn't show a tool that doesn't exist.
 *
 * Run: node --test src/components/MCPPage/promptDemo.test.ts
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'

import { flows } from './promptDemo.data.ts'

const root = path.resolve(import.meta.dirname, '../../..')
const toolsData = JSON.parse(fs.readFileSync(path.join(root, 'src/data/mcp-tools.json'), 'utf8')) as {
    categories: unknown[] | null
    byName: Record<string, unknown>
}

test('every tool in the prompt demo is a real PostHog MCP tool', { skip: toolsData.categories === null }, () => {
    for (const { title, calls } of flows) {
        for (const { mcpTool } of calls) {
            assert.ok(mcpTool in toolsData.byName, `"${title}" uses ${mcpTool}, which isn't in mcp-tools.json`)
        }
    }
})
