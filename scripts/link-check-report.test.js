/* eslint-disable @typescript-eslint/no-var-requires */

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { summarize, writeSummary, notify } = require('./link-check-report')

function reports(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'link-report-'))
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }))
    const summary = {
        totalLinks: 500,
        excludedLinks: 20,
        redirectedLinks: 10,
        brokenLinks: 2,
        brokenAnchors: 3,
        markdownFiles: 100,
    }
    fs.writeFileSync(path.join(directory, 'link-check.json'), JSON.stringify({ summary }))
    fs.writeFileSync(
        path.join(directory, 'src-link-check.json'),
        JSON.stringify({ summary: { ...summary, brokenAnchors: 0, sourceFiles: 50, markdownFiles: 0 } })
    )
    return directory
}

test('large scan output stays on disk while the summary stays small', (t) => {
    const directory = reports(t)
    fs.writeFileSync(path.join(directory, 'content.log'), 'x'.repeat(2_000_000))
    const result = writeSummary(directory, path.join(directory, 'step-summary.md'))
    assert.equal(result.brokenLinks, 4)
    assert.equal(result.brokenAnchors, 3)
    assert.equal(result.totalLinks, 1000)
    assert.ok(fs.statSync(path.join(directory, 'summary.json')).size < 1000)
    assert.ok(fs.statSync(path.join(directory, 'step-summary.md')).size < 2000)
})

test('missing and malformed reports are incomplete rather than zero findings', (t) => {
    const directory = reports(t)
    fs.writeFileSync(path.join(directory, 'src-link-check.json'), 'invalid JSON')
    assert.equal(summarize(directory).complete, false)
    assert.equal(summarize(directory).brokenLinks, null)
    fs.unlinkSync(path.join(directory, 'src-link-check.json'))
    assert.equal(summarize(directory).complete, false)
})

test('Slack payload contains counts only and reports HTTP failures honestly', async (t) => {
    const directory = reports(t)
    let payload
    await notify(
        summarize(directory),
        {
            SLACK_WEBHOOK: 'https://example.test',
            GH_REPOSITORY: 'PostHog/posthog.com',
            GH_RUN_ID: '123',
            GH_JOB_STATUS: 'failure',
        },
        async (_, request) => {
            payload = JSON.parse(request.body)
            return { ok: true }
        }
    )
    assert.equal(payload.broken_links, '4')
    assert.equal(payload.broken_anchors, '3')
    assert.equal(payload.status, 'failed')
    assert.ok(JSON.stringify(payload).length < 1500)
    await assert.rejects(
        notify(summarize(directory), { SLACK_WEBHOOK: 'https://example.test' }, async () => ({
            ok: false,
            status: 500,
        })),
        /HTTP 500/
    )
})

test('an incomplete scan sends unknown counts instead of a success message', async (t) => {
    const directory = reports(t)
    fs.unlinkSync(path.join(directory, 'src-link-check.json'))
    let payload
    await notify(
        summarize(directory),
        { SLACK_WEBHOOK: 'https://example.test', GH_JOB_STATUS: 'success' },
        async (_, request) => {
            payload = JSON.parse(request.body)
            return { ok: true }
        }
    )
    assert.equal(payload.status, 'scan incomplete')
    assert.equal(payload.broken_links, 'unknown')
})
