/**
 * The agent brief (/mcp.md) copies a few facts from the MCP docs. These tests fail when the docs
 * change and the brief doesn't: every `code` token and command in the brief must still appear in
 * the docs, and every docs page it links to must still exist.
 *
 * Run: node --test src/components/MCPPage/agentBrief.test.ts
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { describe, test } from 'node:test'

import { buildMcpBrief } from './agentBrief.ts'

const root = path.resolve(import.meta.dirname, '../../..')
const docsDir = path.join(root, 'contents/docs')

const readAll = (dir: string): string =>
    fs
        .readdirSync(dir, { withFileTypes: true, recursive: true })
        .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
        .map((entry) => fs.readFileSync(path.join(entry.parentPath, entry.name), 'utf8'))
        .join('\n')

// The docs, plus the install schema, which holds the per-client install commands.
const sources = readAll(docsDir) + fs.readFileSync(path.join(root, 'src/components/PlatformInstall/schema.tsx'), 'utf8')

const brief = buildMcpBrief([{ name: 'Feature flags', tools: [1, 2] }], '2026-01-01')
const prose = brief.replace(/```[\s\S]*?```/g, '')

describe('MCP agent brief', () => {
    test('every inline code token appears in the docs', () => {
        const tokens = [...prose.matchAll(/`([^`]+)`/g)].map((match) => match[1])
        assert.ok(tokens.length > 10, 'expected the brief to name its params and headers')
        const missing = tokens.filter((token) => !sources.includes(token))
        assert.deepEqual(missing, [], `not in the docs any more: ${missing.join(', ')}`)
    })

    test('every shell command appears in the docs', () => {
        const commands = [...brief.matchAll(/```bash\n([\s\S]*?)```/g)].map((match) => match[1].trim())
        assert.ok(commands.length > 0)
        const missing = commands.filter((command) => !sources.includes(command))
        assert.deepEqual(missing, [], `not in the docs any more: ${missing.join(', ')}`)
    })

    test('every linked docs page exists', () => {
        const slugs = [...brief.matchAll(/https:\/\/posthog\.com\/docs\/([\w/-]+?)(?:\.md)?(?=[\s)#]|$)/gm)].map(
            (match) => match[1]
        )
        assert.ok(slugs.length > 0)
        const missing = slugs.filter(
            (slug) =>
                !['.mdx', '.md', '/index.mdx', '/index.md'].some((ext) => fs.existsSync(path.join(docsDir, slug + ext)))
        )
        assert.deepEqual(missing, [], `linked docs pages that do not exist: ${missing.join(', ')}`)
    })

    test('lists the live tool categories', () => {
        assert.match(brief, /2 tools in 1 categories/)
        assert.match(brief, /- Feature flags \(2\)/)
    })
})
