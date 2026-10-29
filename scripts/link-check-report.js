/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

function summarize(directory) {
    const reports = []
    const errors = []
    for (const name of ['link-check.json', 'src-link-check.json']) {
        try {
            const report = JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'))
            for (const key of ['totalLinks', 'brokenLinks', 'excludedLinks', 'redirectedLinks']) {
                if (!Number.isSafeInteger(report.summary?.[key]) || report.summary[key] < 0)
                    throw new Error(`Invalid ${key}`)
            }
            if (name === 'link-check.json' && !Number.isSafeInteger(report.summary.brokenAnchors))
                throw new Error('Invalid brokenAnchors')
            reports.push(report.summary)
        } catch (error) {
            errors.push(`${name}: ${error.message}`)
        }
    }
    const total = (key) => (errors.length ? null : reports.reduce((sum, report) => sum + (report[key] || 0), 0))
    return {
        complete: errors.length === 0,
        errors,
        markdownFiles: total('markdownFiles'),
        sourceFiles: total('sourceFiles'),
        totalLinks: total('totalLinks'),
        excludedLinks: total('excludedLinks'),
        redirectedLinks: total('redirectedLinks'),
        brokenLinks: total('brokenLinks'),
        brokenAnchors: total('brokenAnchors'),
    }
}

function writeSummary(directory, summaryFile) {
    const summary = summarize(directory)
    const value = (key) => (summary[key] === null ? 'unknown' : summary[key])
    const markdown = [
        '## Internal link check',
        '',
        summary.complete
            ? `Found ${value('brokenLinks')} broken page links and ${value('brokenAnchors')} broken anchors.`
            : 'The link scan did not complete. Missing results are not a passing check.',
        '',
        `Checked ${value('markdownFiles')} content files and ${value('sourceFiles')} source files.`,
        'The report covers PostHog links. Third-party sites and authenticated PostHog app URLs are excluded.',
        '',
        'Detailed reports and full logs are in link-check-results. Artifact upload can be disabled for manual runs.',
        ...summary.errors.map((error) => `- ${error}`),
        '',
    ].join('\n')
    fs.mkdirSync(directory, { recursive: true })
    fs.writeFileSync(path.join(directory, 'summary.json'), JSON.stringify(summary, null, 2))
    if (summaryFile) fs.appendFileSync(summaryFile, markdown)
    console.log(markdown)
    return summary
}

async function notify(summary, env = process.env, send = fetch) {
    if (!env.SLACK_WEBHOOK) throw new Error('Slack webhook is not configured')
    const success =
        summary.complete && !summary.brokenLinks && !summary.brokenAnchors && env.GH_JOB_STATUS === 'success'
    const workflowUrl = `https://github.com/${env.GH_REPOSITORY}/actions/runs/${env.GH_RUN_ID}`
    const count = (key) => (summary[key] === null ? 'unknown' : String(summary[key]))
    const payload = {
        status: success ? 'completed successfully' : summary.complete ? 'failed' : 'scan incomplete',
        emoji: success ? ':white_check_mark:' : ':x:',
        repository: env.GH_REPOSITORY,
        triggered_by: env.GH_EVENT_NAME === 'schedule' ? 'Triggered via schedule' : `manually run by ${env.GH_ACTOR}`,
        workflow_url: workflowUrl,
        markdown_files: count('markdownFiles'),
        links_checked: count('totalLinks'),
        excluded_links: count('excludedLinks'),
        redirected_links: count('redirectedLinks'),
        broken_links: count('brokenLinks'),
        broken_anchors: count('brokenAnchors'),
        results_download:
            env.SAVE_RESULTS === 'false'
                ? ''
                : env.ARTIFACT_ID
                ? `${workflowUrl}/artifacts/${env.ARTIFACT_ID}`
                : workflowUrl,
        save_results: env.SAVE_RESULTS || 'true',
    }
    const response = await send(env.SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) throw new Error(`Slack notification failed (HTTP ${response.status})`)
    console.log('Slack notification sent successfully')
}

async function main() {
    const directory = process.argv[2] || 'link-check-results'
    if (process.argv.includes('--notify')) {
        await notify(summarize(directory))
    } else {
        const summary = writeSummary(directory, process.env.GITHUB_STEP_SUMMARY)
        if (!summary.complete) process.exitCode = 2
    }
}
if (require.main === module)
    main().catch((error) => {
        console.error(error.message)
        process.exitCode = 2
    })
module.exports = { summarize, writeSummary, notify }
