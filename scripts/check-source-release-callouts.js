#!/usr/bin/env node
/**
 * Fails when a data warehouse source doc states a release stage (alpha, beta, GA).
 *
 * posthog.com doesn't show release stages for warehouse sources: a stage in the docs goes stale
 * the moment the source is promoted, and over 700 pages drifted this way before. A stage the
 * vendor puts on its own API ("the v2 API is in beta") is fine, so the patterns only match claims
 * about the PostHog source, connector, or sync method.
 */

const fs = require('fs')
const path = require('path')

const SOURCES_DIR = path.join(__dirname, '..', 'contents', 'docs', 'data-pipelines', 'sources')

const STAGE = '(?:alpha|beta)'
const SUBJECT = '(?:source|connector|integration|sync(?:\\s+method)?)'

const PATTERNS = [
    {
        regex: /<(?:Alpha|Beta)Release\s*\/>/gi,
        message: 'alpha/beta release component',
    },
    {
        regex: new RegExp(`<CalloutBox[^>]*title="[^"]*\\b${STAGE}\\b[^"]*"`, 'gi'),
        message: 'callout titled with a release stage',
    },
    {
        regex: new RegExp(`^>\\s*\\*\\*${STAGE}\\b`, 'gim'),
        message: 'release stage label',
    },
    {
        regex: new RegExp(
            `\\b${SUBJECT}\\s+is\\s+(?:currently\\s+|still\\s+|now\\s+)?(?:in\\s+|an?\\s+)\\**${STAGE}\\b`,
            'gi'
        ),
        message: 'prose claiming a release stage',
    },
    {
        regex: new RegExp(`\\b${SUBJECT}\\s+is\\s+(?:now\\s+)?generally\\s+available\\b`, 'gi'),
        message: 'prose claiming general availability',
    },
    {
        regex: /^(?:alpha|beta):\s*(?:true|false)\s*$/gim,
        message: 'alpha/beta frontmatter flag',
    },
]

const failures = []

for (const entry of fs.readdirSync(SOURCES_DIR, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) {
        continue
    }
    const file = path.join(entry.parentPath || entry.path, entry.name)
    const contents = fs.readFileSync(file, 'utf8')
    for (const { regex, message } of PATTERNS) {
        const match = contents.match(regex)
        if (match) {
            failures.push(`${path.relative(process.cwd(), file)}: ${message} (${match[0].trim()})`)
        }
    }
}

if (failures.length > 0) {
    console.error('Release stage found in data warehouse source docs:\n')
    for (const failure of failures) {
        console.error(`  ${failure}`)
    }
    console.error(
        [
            '',
            "posthog.com doesn't show alpha, beta, or GA for warehouse sources. Remove the notice.",
            '',
            "  - A stage the vendor puts on its own API or product is fine. Name the vendor's API, not the source.",
            '  - A notice about something else, such as a sync method or a missing table, is fine.',
            '    Give it a title that does not name a release stage.',
            '',
        ].join('\n')
    )
    process.exit(1)
}

console.log(`No release stages in ${path.relative(process.cwd(), SOURCES_DIR)}.`)
