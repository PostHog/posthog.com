/**
 * Parsers for the machine-readable JSON twins, against small fixtures written for this test.
 * The last suite reads the real sources. onPostBuild does not run in preview builds, so these
 * checks are the only ones that fail on the PR that changes a source.
 *
 * Run: pnpm test:machine-readable
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, test } from 'node:test'
import { fileURLToPath } from 'node:url'

import { parseFeatureOwnershipTable, parseSeverityLevels, parseSmeProductGroups } from './machineReadable.ts'

const ownershipFixture = `
# Widget ownership

Some intro text.

| Feature | Owner | Label |
| --- | --- | --- |
| Widgets | [Widget Factory Team](/teams/widget-factory.md) | [feature/widgets](https://example.com/labels/widgets) |
| Gadgets | [Widget Factory Team](/teams/widget-factory.md)[Gears & Cogs Team](/teams/gears-and-cogs.md) Gears & Cogs owns the motor. See [the plan](https://example.com/plan). |  |
| Sprockets | sprocket-works |  |
| Levers | Shared by all teams. |  |

Text after the table.
`

describe('parseFeatureOwnershipTable', () => {
    const rows = parseFeatureOwnershipTable(ownershipFixture, 'fixture.md')

    test('keeps table order', () => {
        assert.deepEqual(
            rows.map((row) => row.feature),
            ['Widgets', 'Gadgets', 'Sprockets', 'Levers']
        )
    })

    test('one owner: removes the trailing " Team" and the .md suffix', () => {
        assert.deepEqual(rows[0], {
            feature: 'Widgets',
            owners: [{ name: 'Widget Factory', slug: 'widget-factory' }],
            notes: '',
        })
    })

    test('two owners and a note', () => {
        assert.deepEqual(rows[1].owners, [
            { name: 'Widget Factory', slug: 'widget-factory' },
            { name: 'Gears & Cogs', slug: 'gears-and-cogs' },
        ])
        assert.equal(rows[1].notes, 'Gears & Cogs owns the motor. See [the plan](https://example.com/plan).')
    })

    test('bare slug: name is null', () => {
        assert.deepEqual(rows[2], {
            feature: 'Sprockets',
            owners: [{ name: null, slug: 'sprocket-works' }],
            notes: '',
        })
    })

    test('free text without an owner stays a note', () => {
        assert.deepEqual(rows[3], { feature: 'Levers', owners: [], notes: 'Shared by all teams.' })
    })

    test('throws and names the file when the table is missing', () => {
        assert.throws(
            () => parseFeatureOwnershipTable('# No table here', 'fixture.md'),
            /fixture\.md.*Feature \| Owner/
        )
    })
})

const smeFixture = `
## Ownership

### Product groups

The products are split into these groups:
- Hardware (widgets, gadgets (small, large), sprockets)
- Unsorted (tickets tagged with \`needs_sorting\`)
- Tools & Dies (tools/dies)

**A note**: these groups can change.

### Other heading

- Not a group (ignore, this)
`

describe('parseSmeProductGroups', () => {
    const groups = parseSmeProductGroups(smeFixture, 'fixture.md')

    test('keeps page order and stops at the end of the list', () => {
        assert.deepEqual(
            groups.map((group) => group.name),
            ['Hardware', 'Unsorted', 'Tools & Dies']
        )
    })

    test('nested commas stay inside one product', () => {
        assert.deepEqual(groups[0].products, ['widgets', 'gadgets (small, large)', 'sprockets'])
    })

    test('keeps a group as written', () => {
        assert.deepEqual(groups[1], { name: 'Unsorted', products: ['tickets tagged with `needs_sorting`'] })
    })

    test('throws and names the file when the list is missing', () => {
        assert.throws(
            () => parseSmeProductGroups('### Product groups\n\nNo list.', 'fixture.md'),
            /fixture\.md.*### Product groups/
        )
    })
})

const severityFixture = `
### Severity Levels

| **Level** | **Impact**        | **Examples**                                        |
| --------- | ----------------- | --------------------------------------------------- | --- |
| Red       | Nothing works     | <ul> <li>Site is down</li> <li>Data loss</li> </ul> |
| Green     | Almost no impact  | <ul><li>Questions</li></ul>                         |     |
`

describe('parseSeverityLevels', () => {
    test('reads level, definition, and examples', () => {
        assert.deepEqual(parseSeverityLevels(severityFixture, 'fixture.md'), [
            { level: 'Red', definition: 'Nothing works', examples: ['Site is down', 'Data loss'] },
            { level: 'Green', definition: 'Almost no impact', examples: ['Questions'] },
        ])
    })

    test('throws and names the file when the table is missing', () => {
        assert.throws(() => parseSeverityLevels('No table.', 'fixture.md'), /fixture\.md.*Level \| Impact/)
    })
})

describe('real sources', () => {
    const here = dirname(fileURLToPath(import.meta.url))
    const read = (relativePath: string): string => readFileSync(join(here, '..', relativePath), 'utf8')

    test('support-smes.md has product groups in the expected shape', () => {
        const source = 'contents/handbook/support/support-smes.md'
        assert.ok(parseSmeProductGroups(read(source), source).length > 0)
    })

    test('support-options.md has severity levels in the expected shape', () => {
        const source = 'contents/docs/support-options.md'
        assert.ok(parseSeverityLevels(read(source), source).length > 0)
    })

    // A static query cannot import a shared constant, so the /teams page and the build hook
    // each have a copy of the filter. This keeps the two copies equal.
    test('the /teams page and onPostBuild use the same teams filter', () => {
        const teamsFilter = (relativePath: string): string => {
            const match = read(relativePath).match(/allSqueakTeam\(filter: (\{.*\})\) \{/)
            assert.ok(match, `${relativePath}: found no allSqueakTeam(filter: { ... }) query`)
            return match[1]
        }
        assert.equal(teamsFilter('gatsby/onPostBuild.ts'), teamsFilter('src/pages/teams/index.tsx'))
    })
})
