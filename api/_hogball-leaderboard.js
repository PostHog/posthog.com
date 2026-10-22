/**
 * Hogball all-time leaderboard, shared by the Vercel function (api/hogball-leaderboard.js) and the
 * Cloudflare Pages function (functions/api/hogball-leaderboard.ts).
 *
 * Scores come from the `hogball_score_submitted` events that the game sends when a player enters their
 * initials. The query reads only those events. Only three-letter initials (A to Z, not in the blocked list)
 * and pilot names from the game's own name list are shown, so a fake event cannot put other text on the page.
 *
 * Needs HOGBALL_LEADERBOARD_API_KEY (a personal API key with only the query:read scope) and
 * HOGBALL_LEADERBOARD_PROJECT_ID. HOGBALL_LEADERBOARD_HOST is optional.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const names = require('../src/components/Hogball/names.json')

const LEADERBOARD_CACHE_CONTROL = 's-maxage=60, stale-while-revalidate=300'
const MAX_SCORE = 5000000
const SIZE = 10
const FIRST = new Set(names.first)
const LAST = new Set(names.last)
const BLOCKED = new Set(names.blocked)

const QUERY = `
    SELECT
        argMax(properties.player_initials, toInt(properties.score)) AS initials,
        argMax(properties.player_name, toInt(properties.score)) AS name,
        max(toInt(properties.score)) AS score
    FROM events
    WHERE event = 'hogball_score_submitted'
        AND timestamp >= toDateTime('2026-10-01')
        AND properties.player_name IS NOT NULL
        AND toInt(properties.score) BETWEEN 1 AND ${MAX_SCORE}
    GROUP BY distinct_id
    ORDER BY score DESC
    LIMIT 50
`

const isPilotName = (name) => {
    if (typeof name !== 'string') return false
    const [first, ...rest] = name.split(' ')
    return FIRST.has(first) && LAST.has(rest.join(' '))
}

const isInitials = (initials) => typeof initials === 'string' && /^[A-Z]{3}$/.test(initials) && !BLOCKED.has(initials)

async function getLeaderboard(env) {
    const key = env.HOGBALL_LEADERBOARD_API_KEY
    const project = env.HOGBALL_LEADERBOARD_PROJECT_ID
    if (!key || !project) return { configured: false, leaders: [] }
    const host = env.HOGBALL_LEADERBOARD_HOST || 'https://us.posthog.com'
    const response = await fetch(`${host}/api/projects/${project}/query/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: { kind: 'HogQLQuery', query: QUERY }, name: 'hogball leaderboard' }),
    })
    if (!response.ok) throw new Error(`PostHog query returned ${response.status}`)
    const { results = [] } = await response.json()
    const leaders = results
        .filter(([initials, name]) => isInitials(initials) && isPilotName(name))
        .slice(0, SIZE)
        .map(([initials, name, score]) => ({ initials, name, score: Number(score) }))
    return { configured: true, leaders }
}

module.exports = { getLeaderboard, isInitials, isPilotName, LEADERBOARD_CACHE_CONTROL }
