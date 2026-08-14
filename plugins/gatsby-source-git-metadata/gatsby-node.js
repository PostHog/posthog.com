const { glob } = require('glob')
const pLimit = require('p-limit')

const files = {}

const PATHS_PER_QUERY = 100
const CONCURRENCY = 8
const MAX_ATTEMPTS = 5

const historyQuery = (owner, repo, paths, commitLimit) => {
    const selections = paths
        .map(
            (path, i) => `f${i}: history(first: ${commitLimit}, path: ${JSON.stringify(path)}) {
                nodes { oid committedDate messageHeadline author { user { login avatarUrl url } } }
            }`
        )
        .join('\n')

    return `query {
        repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(repo)}) {
            defaultBranchRef { target { ... on Commit { ${selections} } } }
        }
    }`
}

async function fetchChunk({ owner, repo, paths, commitLimit, token }) {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: historyQuery(owner, repo, paths, commitLimit) }),
    })
    if (!response.ok) throw new Error(`GitHub GraphQL responded ${response.status}`)

    const { data, errors } = await response.json()
    if (errors?.length) throw new Error(errors[0].message)

    const commit = data.repository?.defaultBranchRef?.target
    if (!commit) throw new Error('repository has no default branch')

    const result = {}
    paths.forEach((path, i) => {
        const nodes = commit[`f${i}`]?.nodes ?? []
        if (!nodes.length) return

        const contributors = []
        const seen = new Set()
        const commits = nodes.map(({ oid, committedDate, messageHeadline, author }) => {
            const user = author?.user ?? null
            if (user && !seen.has(user.login)) {
                seen.add(user.login)
                contributors.push({ avatar: user.avatarUrl, url: user.url, username: user.login })
            }
            return {
                author: user ? { login: user.login, avatar_url: user.avatarUrl, html_url: user.url } : null,
                date: committedDate,
                message: messageHeadline,
                url: `https://github.com/${owner}/${repo}/commit/${oid}`,
            }
        })

        result[path] = { commits, contributors, lastUpdated: nodes[0].committedDate }
    })

    return result
}

async function fetchChunkWithRetry(args, reporter, index) {
    for (let attempt = 1; ; attempt++) {
        try {
            return await fetchChunk(args)
        } catch (error) {
            if (attempt >= MAX_ATTEMPTS) throw error
            // Full jitter: GitHub drops connections under load, so spread out retries
            const delay = Math.round(Math.random() * 1000 * 2 ** attempt)
            reporter.warn(`[git-metadata] chunk ${index + 1} failed (${error.message}), retrying in ${delay}ms`)
            await new Promise((resolve) => setTimeout(resolve, delay))
        }
    }
}

exports.onPreInit = async function ({ reporter }, options = {}) {
    const {
        owner = 'PostHog',
        repo = 'posthog.com',
        contentPath = 'contents',
        commitLimit = 30,
        cwd = process.cwd(),
    } = options

    const token = process.env.GITHUB_API_KEY
    if (!token) {
        reporter.warn('[git-metadata] no GitHub token, page dates and contributors will be omitted')
        return
    }

    const paths = await glob(`${contentPath}/**/*.{md,mdx}`, { cwd, posix: true })
    if (!paths.length) throw new Error(`[git-metadata] no markdown found under ${contentPath}`)

    const chunks = []
    for (let i = 0; i < paths.length; i += PATHS_PER_QUERY) chunks.push(paths.slice(i, i + PATHS_PER_QUERY))

    const start = Date.now()
    const limit = pLimit(CONCURRENCY)

    await Promise.all(
        chunks.map((chunk, index) =>
            limit(async () => {
                reporter.info(`[git-metadata] fetching ${chunk.length} files (${index + 1}/${chunks.length})`)
                Object.assign(
                    files,
                    await fetchChunkWithRetry({ owner, repo, paths: chunk, commitLimit, token }, reporter, index)
                )
            })
        )
    )

    reporter.info(
        `[git-metadata] ${Object.keys(files).length}/${paths.length} files in ${chunks.length} requests, ` +
            `${((Date.now() - start) / 1000).toFixed(1)}s`
    )
}

exports.onCreateNode = async function ({ node, getNode, actions }) {
    const { createNodeField } = actions
    if (node.internal.type !== 'MarkdownRemark' && node.internal.type !== 'Mdx') return

    const parent = getNode(node.parent)
    if (parent?.internal.type !== 'File') return

    const file = files[`contents/${parent.relativePath}`]
    if (file?.contributors.length) createNodeField({ node, name: 'contributors', value: file.contributors })
    if (file?.commits.length) createNodeField({ node, name: 'commits', value: file.commits })
    createNodeField({ node: parent, name: 'gitLogLatestDate', value: file?.lastUpdated || new Date() })
}
