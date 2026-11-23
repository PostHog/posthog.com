const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const path = require('path')

const DOC = fs.readFileSync(
    path.join(__dirname, '..', 'contents', 'docs', 'data-pipelines', 'sources', 'gainsight-px.md'),
    'utf8'
)

// Mirrors the tables with `incremental_fields` in products/warehouse_sources/sources/gainsight_px/settings.py
// in PostHog/posthog.
const INCREMENTAL_TABLES = [
    'page_view_events',
    'session_events',
    'engagement_view_events',
    'feature_match_events',
    'segment_match_events',
    'custom_events',
    'identify_events',
    'form_submit_events',
    'email_events',
    'lead_events',
    'survey_responses',
]

const FULL_REFRESH_TABLES = ['accounts', 'users', 'features', 'segments', 'engagements', 'articles', 'kc_bots']

test('Gainsight PX doc does not claim every table is full refresh', () => {
    assert.doesNotMatch(DOC, /all (?:gainsight px )?tables (?:are|use)[^.]*full refresh/i)
})

test('Gainsight PX doc names the incremental field', () => {
    assert.match(DOC, /incremental[^.]*sync on `date`/i)
})

for (const table of [...INCREMENTAL_TABLES, ...FULL_REFRESH_TABLES]) {
    test(`Gainsight PX doc lists the sync method for \`${table}\``, () => {
        assert.ok(DOC.includes(`\`${table}\``), `missing \`${table}\``)
    })
}
