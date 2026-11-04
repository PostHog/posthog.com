import assert from 'node:assert/strict'
import { test } from 'node:test'
import { findStaleMappings } from './mcp-rest-mapping.ts'

test('reports missing targets, including partially valid mappings and aliases', () => {
    const mapping = {
        hog_flows_logs_retrieve: ['retired-logs'],
        environments_hog_flows_logs_retrieve: ['retired-logs'],
        mixed_operation: ['current-tool', 'retired-tool'],
        valid_operation: ['current-tool'],
    }
    const original = structuredClone(mapping)

    assert.deepEqual(findStaleMappings(mapping, new Set(['current-tool'])), {
        hog_flows_logs_retrieve: ['retired-logs'],
        environments_hog_flows_logs_retrieve: ['retired-logs'],
        mixed_operation: ['retired-tool'],
    })
    assert.deepEqual(mapping, original)
})

test('returns no stale mappings when all targets exist or the mapping is empty', () => {
    assert.deepEqual(findStaleMappings({ operation: ['one', 'two'] }, new Set(['one', 'two'])), {})
    assert.deepEqual(findStaleMappings({}, new Set()), {})
})

test('reports all targets when the catalog is empty', () => {
    assert.deepEqual(findStaleMappings({ operation: ['one', 'two'] }, new Set()), {
        operation: ['one', 'two'],
    })
})
