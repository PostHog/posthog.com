// GitHub data: ResearchMergedPr, SelfDrivingPullRequest, and GitMetadata.
import fg from 'fast-glob'
import type { Source } from '../index'
import { env } from '../env'
import { fetchJson, mapLimit } from '../http'
import { ROOT } from '../paths'
import type { GitContributor, GitMetadataNode, ResearchMergedPrNode, SelfDrivingPullRequestNode } from '../types'

/* GitHub API */

export interface SearchIssue {
    number: number
    title: string
    body: string | null
    html_url: string
    repository_url?: string
    user?: { login: string } | null
    draft?: boolean
    created_at: string
    closed_at: string | null
    pull_request?: { merged_at: string | null }
}

export interface SearchResponse {
    items?: SearchIssue[]
    message?: string
}

export interface HistoryCommit {
    oid: string
    committedDate: string
    messageHeadline: string
    author: { user: { login: string; avatarUrl: string; url: string } | null } | null
}

export interface HistoryResponse {
    data?: {
        repository: {
            defaultBranchRef: { target: Record<string, { nodes: HistoryCommit[] } | null> | null } | null
        } | null
    }
    errors?: { message: string }[]
}

const RESEARCHER_GITHUB_HANDLES = ['nicowaltz', 'robbie-c', 'joshsny', 'MarconLP', 'k11kirky', 'jamesefhawkins']

/** The newest 8 `feat`/`epic` PRs merged by the research team outside posthog.com. Unauthenticated, as before. */
export const researchMergedPrSource: Source = {
    name: 'research-merged-prs',
    types: ['ResearchMergedPr'],
    async fetch() {
        const query = `org:posthog is:pr is:merged -repo:posthog/posthog.com ${RESEARCHER_GITHUB_HANDLES.map(
            (handle) => `author:${handle}`
        ).join(' ')}`
        const data = await fetchJson<SearchResponse>(
            `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=50`
        )
        const time = (date: string | null) => (date ? Date.parse(date) : 0)
        const nodes: ResearchMergedPrNode[] = (data.items ?? [])
            .filter((item) => /^(feat|epic)/i.test((item.title ?? '').trim()))
            .map((item) => ({
                id: `research-merged-pr-${item.html_url}`,
                title: item.title,
                url: item.html_url,
                repo: item.repository_url?.split('/').pop() ?? 'posthog',
                author: item.user?.login ?? 'unknown',
                mergedAt: item.pull_request?.merged_at ?? item.closed_at ?? null,
            }))
            .sort((a, b) => time(b.mergedAt) - time(a.mergedAt))
            .slice(0, 8)
        return { ResearchMergedPr: nodes }
    },
}

function parseCommitTitle(title: string) {
    const match = title.match(/^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/)
    return match
        ? { type: match[1].toLowerCase(), scope: match[2] || '', summary: match[3].trim() }
        : { type: '', scope: '', summary: title }
}

/**
 * PRs that PostHog's self-driving system opened from an Inbox report: merged ones and open drafts.
 * The search API works unauthenticated; a token only raises the rate limit.
 */
export const selfDrivingPullRequestSource: Source = {
    name: 'self-driving-prs',
    types: ['SelfDrivingPullRequest'],
    async fetch() {
        const token = env('GITHUB_API_KEY') ?? env('GITHUB_TOKEN')
        const headers: Record<string, string> = token ? { Authorization: `token ${token}` } : {}
        const search = async (q: string): Promise<SearchIssue[]> => {
            const params = new URLSearchParams({ q, sort: 'updated', order: 'desc', per_page: '30' })
            const response = await fetchJson<SearchResponse>(`https://api.github.com/search/issues?${params}`, {
                headers,
            })
            if (!Array.isArray(response.items)) throw new Error(response.message || 'no items')
            return response.items
        }
        const [merged, drafts] = await Promise.all([
            search('repo:PostHog/posthog is:pr is:merged "from an inbox report"'),
            search('repo:PostHog/posthog is:pr is:open draft:true "from an inbox report"'),
        ])
        // Merged first, so a PR that merged between the two searches wins over its draft copy
        const byNumber = new Map<number, SearchIssue>()
        for (const item of [...merged, ...drafts]) {
            const hasMarker = typeof item.body === 'string' && item.body.includes('posthog-code://inbox')
            if (hasMarker && !byNumber.has(item.number)) byNumber.set(item.number, item)
        }
        const nodes: SelfDrivingPullRequestNode[] = [...byNumber.values()].map((item) => {
            const mergedAt = item.pull_request?.merged_at || null
            return {
                id: `self-driving-pr-${item.number}`,
                prNumber: item.number,
                title: item.title,
                ...parseCommitTitle(item.title || ''),
                url: item.html_url,
                state: mergedAt ? 'merged' : item.draft ? 'draft' : 'open',
                openedAt: item.created_at,
                mergedAt: mergedAt || item.closed_at,
            }
        })
        return { SelfDrivingPullRequest: nodes }
    },
}

const PATHS_PER_QUERY = 100
const COMMIT_LIMIT = 30
const MAX_ATTEMPTS = 5

const historyQuery = (paths: string[]) => `query {
    repository(owner: "PostHog", name: "posthog.com") {
        defaultBranchRef { target { ... on Commit { ${paths
            .map(
                (path, i) =>
                    `f${i}: history(first: ${COMMIT_LIMIT}, path: ${JSON.stringify(
                        path
                    )}) { nodes { oid committedDate messageHeadline author { user { login avatarUrl url } } } }`
            )
            .join('\n')} } } }
    }
}`

/** The raw commit history of each path, newest first. */
async function fetchHistory(paths: string[]): Promise<[string, HistoryCommit[]][]> {
    const response = await fetchJson<HistoryResponse>(
        'https://api.github.com/graphql',
        {
            method: 'POST',
            headers: { Authorization: `Bearer ${env('GITHUB_API_KEY')}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: historyQuery(paths) }),
        },
        1
    )
    if (response.errors?.length) throw new Error(response.errors[0].message)
    const commit = response.data?.repository?.defaultBranchRef?.target
    if (!commit) throw new Error('repository has no default branch')
    return paths.map((path, i) => [path, commit[`f${i}`]?.nodes ?? []])
}

function metadataNode(path: string, history: HistoryCommit[]): GitMetadataNode {
    const contributors: GitContributor[] = []
    const seen = new Set<string>()
    const commits = history.map(({ oid, committedDate, messageHeadline, author }) => {
        const user = author?.user ?? null
        if (user && !seen.has(user.login)) {
            seen.add(user.login)
            contributors.push({ avatar: user.avatarUrl, url: user.url, username: user.login })
        }
        return {
            author: user ? { login: user.login, avatar_url: user.avatarUrl, html_url: user.url } : null,
            date: committedDate,
            message: messageHeadline,
            url: `https://github.com/PostHog/posthog.com/commit/${oid}`,
        }
    })
    return { id: `git-metadata-${path}`, path, contributors, commits, gitLogLatestDate: history[0].committedDate }
}

/**
 * Commit history of every content file: `{ path: 'contents/...', contributors, commits, gitLogLatestDate }`.
 * Files with no history have no node; content nodes then use the build time as their date.
 *
 * GitHub's `history(path:)` does not follow renames, so a `.mdx` file is also looked up under its old
 * `.md` name (content was renamed from .md to .mdx), and the two histories are merged.
 */
export const gitMetadataSource: Source = {
    name: 'git-metadata',
    types: ['GitMetadata'],
    requires: ['GITHUB_API_KEY'],
    async fetch() {
        const files = (await fg('contents/**/*.{md,mdx}', { cwd: ROOT })).sort()
        if (!files.length) throw new Error('no markdown found under contents')
        const aliases = (file: string) => (file.endsWith('.mdx') ? [file, file.slice(0, -1)] : [file])
        const paths = files.flatMap(aliases)
        const chunks: string[][] = []
        for (let i = 0; i < paths.length; i += PATHS_PER_QUERY) chunks.push(paths.slice(i, i + PATHS_PER_QUERY))
        const results = await mapLimit(chunks, 8, async (chunk, index) => {
            for (let attempt = 1; ; attempt++) {
                try {
                    return await fetchHistory(chunk)
                } catch (error) {
                    if (attempt >= MAX_ATTEMPTS) throw error
                    // Full jitter: GitHub drops connections under load, so spread out retries
                    const delay = Math.round(Math.random() * 1000 * 2 ** attempt)
                    console.warn(
                        `[data-layer] git-metadata chunk ${index + 1} failed (${
                            (error as Error).message
                        }), retrying in ${delay}ms`
                    )
                    await new Promise((resolve) => setTimeout(resolve, delay))
                }
            }
        })
        const histories = new Map(results.flat())
        const nodes: GitMetadataNode[] = files.flatMap((file) => {
            const byOid = new Map<string, HistoryCommit>()
            for (const path of aliases(file))
                for (const commit of histories.get(path) ?? []) byOid.set(commit.oid, commit)
            const history = [...byOid.values()]
                .sort((a, b) => Date.parse(b.committedDate) - Date.parse(a.committedDate))
                .slice(0, COMMIT_LIMIT)
            return history.length ? [metadataNode(file, history)] : []
        })
        return { GitMetadata: nodes }
    },
}

export const githubSources: Source[] = [researchMergedPrSource, selfDrivingPullRequestSource, gitMetadataSource]
