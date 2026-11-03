import assert from 'node:assert/strict'
import { test } from 'node:test'
import { findUnknownToolReferences, looksLikeToolName, referencesMcp, toolNameHints } from './mcp-doc-tool-names.ts'

const catalog = new Set([
    'llma-evaluation-get',
    'llma-evaluation-list',
    'llma-evaluation-create',
    'insight-create',
    'insight-get',
    'vision-scanners-list',
])
const hints = toolNameHints(catalog, 2)

test('derives common actions and two-segment families from the catalog', () => {
    assert.deepEqual([...hints.actions].sort(), ['create', 'get', 'list'])
    assert.ok(hints.families.has('llma-evaluation'))
    assert.ok(hints.families.has('vision-scanners'))
})

test('treats tokens with a tool action or a known family as tool names', () => {
    assert.equal(looksLikeToolName('evaluation-get', hints), true)
    assert.equal(looksLikeToolName('vision-scanners-watch-feed', hints), true)
    assert.equal(looksLikeToolName('posthog-js', hints), false)
    assert.equal(looksLikeToolName('vision-scanners', hints), false)
})

test('reports unknown inline tool names with line numbers and skips known and ignored names', () => {
    const source = [
        'Use the PostHog MCP server.',
        '| `evaluation-get` | Get an evaluation |',
        '| `llma-evaluation-get` | Get an evaluation |',
        'Install `posthog-js` and call `insight-create` or `example-get`.',
    ].join('\n')

    assert.deepEqual(findUnknownToolReferences(source, catalog, hints, new Set(['example-get'])), [
        { name: 'evaluation-get', line: 2 },
    ])
})

test('skips fenced code blocks and double-backtick spans', () => {
    const source = ['```bash', '`evaluation-get`', '```', '~~~', '`insight-run-get`', '~~~', '``evaluation-get``'].join(
        '\n'
    )

    assert.deepEqual(findUnknownToolReferences(source, catalog, hints), [])
})

test('only pages that mention MCP are in scope', () => {
    assert.equal(referencesMcp('Ask your agent through the MCP server'), true)
    assert.equal(referencesMcp('See [tools](/docs/model-context-protocol/tools)'), true)
    assert.equal(referencesMcp('Track events with posthog-js'), false)
})
