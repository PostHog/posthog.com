#!/usr/bin/env node
/**
 * Fails when a data warehouse source doc hardcodes its own alpha or beta release notice.
 *
 * `releaseStatus` on the source's SourceConfig in posthog/posthog is the one source of truth.
 * `src/templates/Handbook.tsx` renders the callout from it at build time, so a hardcoded notice
 * both duplicates that callout and goes stale the moment the source is promoted. Over 700 pages
 * drifted this way before the callout was automated.
 */

const fs = require('fs')
const path = require('path')

const SOURCES_DIR = path.join(__dirname, '..', 'contents', 'docs', 'cdp', 'sources')

// A notice about a sync method rather than about the source itself is legitimate, so the patterns
// below only match a claim about "this source" / "the <X> source", or a callout titled for a
// release stage.
const PATTERNS = [
    {
        id: 'release-stage-callout-title',
        regex: /<CalloutBox[^>]*title="(?:Alpha|Beta)(?: release| source| feature)?"/gi,
        message: 'callout titled for a release stage',
    },
    {
        id: 'source-release-claim',
        regex: /(?:This|The)\s+\S*\s*source\s+is\s+(?:currently\s+)?in\s+\*\*(?:alpha|beta)\*\*/gi,
        message: 'prose claiming the source is in alpha or beta',
    },
    {
        id: 'release-frontmatter-flag',
        regex: /^(?:alpha|beta):\s*(?:true|false)\s*$/gim,
        message: 'alpha/beta frontmatter flag, which nothing reads',
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
    console.error('Hardcoded release status found in data warehouse source docs:\n')
    for (const failure of failures) {
        console.error(`  ${failure}`)
    }
    console.error(
        [
            '',
            'The alpha and beta callouts are rendered automatically from `releaseStatus` on the',
            "source's SourceConfig in posthog/posthog. Remove the hardcoded notice.",
            '',
            "  - To change one source's status, change `releaseStatus` in posthog/posthog.",
            '  - To change the wording for every source, edit',
            '    src/components/Docs/SourceReleaseCallout.tsx.',
            '  - A notice about something else, such as a sync method or a missing table, is fine.',
            '    Give it a title that does not name a release stage.',
            '',
        ].join('\n')
    )
    process.exit(1)
}

console.log(`No hardcoded release status in ${SOURCES_DIR}.`)
