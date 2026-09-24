// Flags pull request changes that can hurt how search engines and AI agents find, index, or cite
// posthog.com pages, and posts one comment per PR asking for an SEO/AEO review.
//
// It reads the PR diff through the GitHub API only. It never checks out or runs PR code, which keeps
// it safe under `pull_request_target`.

const COMMENT_MARKER = '<!-- seo-aeo-pr-check -->'
const IMAGE_URL = 'https://raw.githubusercontent.com/PostHog/posthog.com/master/.github/assets/seo-aeo-danger.png'

const PAGE_EXTENSIONS = /\.mdx?$/
const HEAD_TAG_PATTERN =
    /<Helmet|<SEO\b|<title|name=["']description["']|property=["']og:|name=["']twitter:|application\/ld\+json|rel=["']canonical["']/
const ROBOTS_RULE_PATTERN = /^\s*(user-agent|disallow|allow)\s*:/i

function isPagePath(filename) {
    if (!filename || !filename.startsWith('contents/') || !PAGE_EXTENSIONS.test(filename)) {
        return false
    }
    if (filename.startsWith('contents/images/')) {
        return false
    }
    // Snippets are imported into other pages and have no URL of their own.
    return !filename.split('/').some((segment) => segment.startsWith('_'))
}

// Mirrors the slug that gatsby-source-filesystem's createFilePath builds for a file under contents/.
function contentPathToUrl(filename) {
    let url = filename.replace(/^contents/, '').replace(PAGE_EXTENSIONS, '')
    url = url.replace(/\/index$/, '')
    return url === '' ? '/' : url
}

function sourceToRegExp(source) {
    const paramPattern = /(\/)?:(\w+)(\([^)]*\))?([*+?])?/g
    let pattern = ''
    let lastIndex = 0
    let match
    while ((match = paramPattern.exec(source)) !== null) {
        pattern += escapeRegExp(source.slice(lastIndex, match.index))
        const [, slash = '', , group, modifier] = match
        const slashPattern = escapeRegExp(slash)
        if (group) {
            const inner = group.slice(1, -1)
            pattern += modifier === '?' ? `(?:${slashPattern}${inner})?` : `${slashPattern}(?:${inner})`
        } else if (modifier === '*') {
            pattern += `(?:${slashPattern}.*)?`
        } else if (modifier === '+') {
            pattern += `${slashPattern}.+`
        } else if (modifier === '?') {
            pattern += `(?:${slashPattern}[^/]+)?`
        } else {
            pattern += `${slashPattern}[^/]+`
        }
        lastIndex = paramPattern.lastIndex
    }
    pattern += escapeRegExp(source.slice(lastIndex))
    return new RegExp(`^${pattern}/?$`)
}

function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function redirectFor(redirects, url) {
    return redirects.find((redirect) => {
        if (redirect.has || typeof redirect.source !== 'string') {
            return false
        }
        try {
            return sourceToRegExp(redirect.source).test(url)
        } catch {
            return redirect.source === url
        }
    })
}

function isTemporary(redirect) {
    return redirect.permanent === false || [302, 303, 307].includes(redirect.statusCode)
}

function redirectKey(redirect) {
    return `${redirect.source} -> ${redirect.destination}`
}

function parsePatch(patch) {
    const added = []
    const removed = []
    for (const line of (patch || '').split('\n')) {
        if (line.startsWith('+++') || line.startsWith('---')) {
            continue
        }
        if (line.startsWith('+')) {
            added.push(line.slice(1))
        } else if (line.startsWith('-')) {
            removed.push(line.slice(1))
        }
    }
    return { added, removed }
}

// Returns markdown H1 lines that the patch adds, read from the full file so a hunk that starts
// inside a code block does not turn shell comments into headings.
function addedH1s(patch, content) {
    const added = new Set(parsePatch(patch).added.map((line) => line.trim()))
    const headings = []
    let inFence = false
    for (const line of (content || '').split('\n')) {
        if (/^\s*(```|~~~)/.test(line)) {
            inFence = !inFence
            continue
        }
        if (!inFence && /^# \S/.test(line) && added.has(line.trim())) {
            headings.push(line.trim())
        }
    }
    return headings
}

function frontmatterValue(lines, key) {
    const line = lines.find((l) => new RegExp(`^${key}:`).test(l))
    if (line === undefined) {
        return undefined
    }
    return line
        .replace(new RegExp(`^${key}:`), '')
        .trim()
        .replace(/^['"]|['"]$/g, '')
}

function frontmatterLines(content) {
    const match = /^---\n([\s\S]*?)\n---/.exec(content || '')
    return match ? match[1].split('\n') : null
}

function clean(text) {
    return String(text)
        .replace(/[`\r\n]/g, '')
        .slice(0, 200)
}

function analyzeRedirects(baseRedirects, headRedirects) {
    const findings = []
    const baseKeys = new Set(baseRedirects.map(redirectKey))
    const headKeys = new Set(headRedirects.map(redirectKey))
    const headSources = headRedirects.filter((r) => !r.has)

    for (const redirect of headRedirects) {
        if (baseKeys.has(redirectKey(redirect)) || redirect.has) {
            continue
        }
        const { source, destination } = redirect
        if (source === destination) {
            findings.push({
                severity: 'blocker',
                title: 'Redirect loop',
                detail: `\`${clean(source)}\` redirects to itself.`,
                fix: 'Point the redirect at the page that replaces it, or remove it.',
                file: 'vercel.json',
            })
            continue
        }
        const next = destination.startsWith('/') && !destination.includes(':') && redirectFor(headSources, destination)
        if (next && next !== redirect) {
            findings.push({
                severity: 'review',
                title: 'Redirect chain',
                detail: `\`${clean(source)}\` goes to \`${clean(destination)}\`, which redirects again to \`${clean(
                    next.destination
                )}\`. Each extra hop slows crawlers and can dilute ranking signals.`,
                fix: `Point \`${clean(source)}\` straight at the final page.`,
                file: 'vercel.json',
            })
        }
        if (isTemporary(redirect)) {
            findings.push({
                severity: 'review',
                title: 'Temporary redirect',
                detail: `\`${clean(
                    source
                )}\` uses a temporary redirect, so search engines keep the old URL indexed and do not pass its ranking to the new page.`,
                fix: 'If the move is permanent, remove `statusCode`/`permanent` (Vercel defaults to a permanent 308) or use 301.',
                file: 'vercel.json',
            })
        }
    }

    const removed = baseRedirects.filter((r) => !headKeys.has(redirectKey(r)) && !r.has)
    if (removed.length > 0) {
        const sample = removed
            .slice(0, 5)
            .map((r) => `\`${clean(r.source)}\``)
            .join(', ')
        findings.push({
            severity: 'review',
            title: `${removed.length} redirect${removed.length === 1 ? '' : 's'} removed`,
            detail: `Old URLs that people, search engines, or AI agents still visit will start to return 404: ${sample}${
                removed.length > 5 ? ', and more' : ''
            }.`,
            fix: 'Keep a redirect for any URL that still gets traffic or has backlinks.',
            file: 'vercel.json',
        })
    }
    return findings
}

// files: [{ filename, status, previous_filename, patch, headContent }]
// headRedirects: the redirects array from vercel.json at the PR head.
function analyzeFiles(files, headRedirects) {
    const findings = []

    for (const file of files) {
        const { filename, status, previous_filename: previousFilename, patch } = file
        const { added, removed } = parsePatch(patch)

        const lostPath = status === 'removed' ? filename : status === 'renamed' ? previousFilename : null
        if (lostPath && isPagePath(lostPath)) {
            const oldUrl = contentPathToUrl(lostPath)
            const stillServed = status === 'renamed' && isPagePath(filename) && contentPathToUrl(filename) === oldUrl
            if (!stillServed && !redirectFor(headRedirects, oldUrl)) {
                findings.push({
                    severity: 'blocker',
                    title: status === 'removed' ? 'Page deleted without a redirect' : 'Page moved without a redirect',
                    detail: `\`${clean(
                        oldUrl
                    )}\` will return 404. Google drops its ranking, AI agents lose the page, and every link to it breaks.`,
                    fix:
                        status === 'renamed' && isPagePath(filename)
                            ? `Add \`{ "source": "${clean(oldUrl)}", "destination": "${clean(
                                  contentPathToUrl(filename)
                              )}" }\` to \`redirects\` in \`vercel.json\`.`
                            : 'Add a redirect in `vercel.json` to the closest page that replaces it.',
                    file: lostPath,
                })
            }
        }

        if (status === 'removed') {
            continue
        }

        const isCode =
            (/^(src|gatsby|plugins|api)\//.test(filename) || /^gatsby-(config|node|ssr|browser)\./.test(filename)) &&
            !PAGE_EXTENSIONS.test(filename)

        const addedNoindex = added.filter(
            (l) =>
                ((isCode || filename === 'vercel.json') && /noindex|nofollow|x-robots-tag/i.test(l)) ||
                (isPagePath(filename) && /^noindex:\s*true/i.test(l))
        )
        // A new page that starts as noindex (an ad landing page, a duplicate) has no ranking to lose.
        if (addedNoindex.length > 0 && status !== 'added') {
            findings.push({
                severity: 'blocker',
                title: 'noindex or X-Robots-Tag added',
                detail: `This change can remove existing pages from Google and AI search: \`${clean(
                    addedNoindex[0].trim()
                )}\``,
                fix: 'Confirm the pages must leave search results. If not, remove the directive.',
                file: filename,
            })
        }

        const robotsLines = [...added, ...removed].filter((l) => ROBOTS_RULE_PATTERN.test(l))
        if (/robots/i.test(filename) || robotsLines.length > 0) {
            findings.push({
                severity: 'blocker',
                title: 'robots.txt rules changed',
                detail: 'A wrong rule can block Google or AI crawlers (GPTBot, ClaudeBot, PerplexityBot) from the whole site or a section.',
                fix: 'Check every changed `Disallow` against the pages it matches before merging.',
                file: filename,
            })
        }

        if (isCode && [...added, ...removed].some((l) => /canonical/i.test(l))) {
            findings.push({
                severity: 'review',
                title: 'Canonical logic changed',
                detail: 'The canonical tag tells Google which URL to rank. A wrong canonical can move ranking to another page or drop a page from the index.',
                fix: 'Check the canonical on a few changed pages in the Vercel preview.',
                file: filename,
            })
        }

        if (filename === 'src/components/seo.tsx' || filename === 'gatsby-ssr.js') {
            findings.push({
                severity: 'review',
                title: 'Site-wide head tags changed',
                detail: 'This file writes the title, description, canonical, Open Graph, and structured data for every page.',
                fix: 'Compare the `<head>` of a docs page, a blog post, and the homepage in the Vercel preview against production.',
                file: filename,
            })
        } else if (isCode && status !== 'added' && [...added, ...removed].some((l) => HEAD_TAG_PATTERN.test(l))) {
            findings.push({
                severity: 'review',
                title: 'Page head tags changed',
                detail: 'This change edits the title, meta description, Open Graph, canonical, or structured data of the pages this component renders.',
                fix: 'Check the `<head>` of an affected page in the Vercel preview.',
                file: filename,
            })
        }

        if (
            filename === 'gatsby-config.js' &&
            [...added, ...removed].some((l) => /sitemap|excludes?\b|serialize/i.test(l))
        ) {
            findings.push({
                severity: 'review',
                title: 'Sitemap config changed',
                detail: 'Pages left out of the sitemap get crawled less often, and a broken sitemap slows indexing of new pages.',
                fix: 'Check `/sitemap/sitemap-index.xml` in the Vercel preview and confirm the important pages are still listed.',
                file: filename,
            })
        }

        if (
            ['gatsby/rawMarkdownUtils.ts', 'scripts/generate-md-redirects.js'].includes(filename) ||
            (filename === 'gatsby/onPostBuild.ts' && [...added, ...removed].some((l) => /llms|markdown|\.md/i.test(l)))
        ) {
            findings.push({
                severity: 'review',
                title: 'llms.txt or Markdown pages changed',
                detail: 'AI agents read `llms.txt` and the `.md` version of each docs page. A break here makes our docs harder for assistants to find and quote.',
                fix: 'Check `/llms.txt` and a few `.md` URLs in the Vercel preview.',
                file: filename,
            })
        }

        if (isPagePath(filename) && status === 'modified') {
            for (const key of ['title', 'description']) {
                const before = frontmatterValue(removed, key)
                const after = frontmatterValue(added, key)
                if (before && (after === undefined || after === '')) {
                    findings.push({
                        severity: 'review',
                        title: `Page ${key} removed`,
                        detail: `\`${clean(
                            contentPathToUrl(filename)
                        )}\` loses its \`${key}\`, which search results and AI answers use to describe the page.`,
                        fix: `Keep a \`${key}\` in the frontmatter.`,
                        file: filename,
                    })
                }
            }
        }

        if (isPagePath(filename)) {
            const lines = frontmatterLines(file.headContent)
            if (lines && status === 'added' && !frontmatterValue(lines, 'title')) {
                findings.push({
                    severity: 'review',
                    title: 'New page has no title',
                    detail: `\`${clean(
                        contentPathToUrl(filename)
                    )}\` has no \`title\` in its frontmatter, so it has no proper title tag or H1.`,
                    fix: 'Add a `title` to the frontmatter.',
                    file: filename,
                })
            }
            const rendersTitleAsH1 =
                lines && (filename.startsWith('contents/docs/') || frontmatterValue(lines, 'showTitle') === 'true')
            const headings = rendersTitleAsH1 ? addedH1s(patch, file.headContent) : []
            if (headings.length > 0) {
                findings.push({
                    severity: 'review',
                    title: 'Second H1 on the page',
                    detail: `The template already renders the page title as the H1, and this adds \`${clean(
                        headings[0]
                    )}\`. Two H1s make the main topic less clear to search engines.`,
                    fix: 'Use `##` for headings in the page body.',
                    file: filename,
                })
            }
        }
    }

    return findings
}

function buildComment(findings, { reviewer, backupNote }) {
    const blockers = findings.filter((f) => f.severity === 'blocker')
    const reviews = findings.filter((f) => f.severity === 'review')
    const section = (heading, items) =>
        items.length === 0
            ? ''
            : `**${heading} (${items.length})**\n\n` +
              items
                  .map((f) => `- **${f.title}** in \`${clean(f.file)}\`\n  ${f.detail}\n  _Fix:_ ${f.fix}`)
                  .join('\n') +
              '\n\n'

    return (
        `${COMMENT_MARKER}\n` +
        `![AEO/SEO: I'm in danger](${IMAGE_URL})\n\n` +
        `### This PR may affect SEO/AEO\n\n` +
        `@${reviewer}, please review the items below before this PR merges. ${backupNote}\n\n` +
        section('🚨 Likely to hurt search or AI visibility', blockers) +
        section('🔍 Worth a look', reviews) +
        `<sub>This comment updates on each push. The check reads the diff only, so it can miss problems or flag safe changes. If this is a false alarm, reply here so the check can improve.</sub>`
    )
}

function buildResolvedComment() {
    return `${COMMENT_MARKER}\n✅ The latest commit has no SEO/AEO risks that this check can find.`
}

async function getJsonFile(github, owner, repo, path, ref) {
    try {
        const { data } = await github.rest.repos.getContent({
            owner,
            repo,
            path,
            ref,
            mediaType: { format: 'raw' },
        })
        return JSON.parse(typeof data === 'string' ? data : Buffer.from(data).toString('utf8'))
    } catch (error) {
        if (error.status === 404) {
            return null
        }
        throw error
    }
}

async function getText(github, owner, repo, path, ref) {
    try {
        const { data } = await github.rest.repos.getContent({ owner, repo, path, ref, mediaType: { format: 'raw' } })
        return typeof data === 'string' ? data : Buffer.from(data).toString('utf8')
    } catch (error) {
        if (error.status === 404) {
            return null
        }
        throw error
    }
}

async function checkPullRequest({ github, core, owner, repo, number, reviewer, backupNote }) {
    const { data: pr } = await github.rest.pulls.get({ owner, repo, pull_number: number })
    if (pr.state !== 'open' || pr.draft) {
        core.info(`#${number}: skipped (${pr.draft ? 'draft' : pr.state})`)
        return
    }

    const files = await github.paginate(github.rest.pulls.listFiles, {
        owner,
        repo,
        pull_number: number,
        per_page: 100,
    })

    for (const file of files) {
        // Frontmatter is only needed for new pages and for patches that add a markdown H1.
        const needsFrontmatter = file.status === 'added' || /\n\+# \S/.test(file.patch || '')
        if (isPagePath(file.filename) && file.status !== 'removed' && needsFrontmatter) {
            file.headContent = await getText(github, owner, repo, file.filename, pr.head.sha)
        }
    }

    const needsRedirects = files.some(
        (f) => f.filename === 'vercel.json' || (f.status !== 'modified' && f.status !== 'added')
    )
    const headConfig = needsRedirects ? await getJsonFile(github, owner, repo, 'vercel.json', pr.head.sha) : null
    const headRedirects = headConfig?.redirects || []

    const findings = analyzeFiles(files, headRedirects)
    if (files.some((f) => f.filename === 'vercel.json')) {
        const baseConfig = await getJsonFile(github, owner, repo, 'vercel.json', pr.base.sha)
        findings.push(...analyzeRedirects(baseConfig?.redirects || [], headRedirects))
    }

    const comments = await github.paginate(github.rest.issues.listComments, {
        owner,
        repo,
        issue_number: number,
        per_page: 100,
    })
    const existing = comments.find((c) => c.user?.type === 'Bot' && c.body?.includes(COMMENT_MARKER))

    if (findings.length === 0) {
        if (existing && !existing.body.includes('✅')) {
            await github.rest.issues.updateComment({
                owner,
                repo,
                comment_id: existing.id,
                body: buildResolvedComment(),
            })
        }
        core.info(`#${number}: no findings`)
        return
    }

    const body = buildComment(findings, { reviewer, backupNote })
    if (existing) {
        // Editing a comment does not notify anyone, so later pushes do not ping the reviewer again.
        await github.rest.issues.updateComment({ owner, repo, comment_id: existing.id, body })
    } else {
        await github.rest.issues.createComment({ owner, repo, issue_number: number, body })
        if (pr.user.login.toLowerCase() !== reviewer.toLowerCase()) {
            try {
                await github.rest.pulls.requestReviewers({ owner, repo, pull_number: number, reviewers: [reviewer] })
            } catch (error) {
                core.warning(`#${number}: could not request a review from ${reviewer}: ${error.message}`)
            }
        }
    }
    core.info(`#${number}: ${findings.length} finding(s)`)
}

async function run({ github, context, core }) {
    const { owner, repo } = context.repo
    const reviewer = process.env.SEO_REVIEWER
    const backupNote = process.env.SEO_BACKUP_NOTE || ''
    const numbers = context.payload.pull_request
        ? [context.payload.pull_request.number]
        : (process.env.PR_NUMBERS || '')
              .split(',')
              .map((n) => parseInt(n.trim(), 10))
              .filter((n) => Number.isInteger(n) && n > 0)

    for (const number of numbers) {
        await checkPullRequest({ github, core, owner, repo, number, reviewer, backupNote })
    }
}

module.exports = {
    run,
    analyzeFiles,
    analyzeRedirects,
    buildComment,
    contentPathToUrl,
    isPagePath,
    redirectFor,
    addedH1s,
}
