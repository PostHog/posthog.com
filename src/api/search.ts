import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fetch from 'node-fetch'
import { typeForPath } from '../components/Search/typeForPath'

export type SemanticSearchResult = {
    type: string
    title: string
    url: string
    fragment?: string
    excerpt: string
}

const cleanTitle = (title: string): string => title.replace(/\s*-\s*(Docs\s*-\s*)?PostHog$/, '').trim()

const cleanExcerpt = (text: string): string =>
    text
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // markdown links → text
        .replace(/[#*`]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 300)

type InkeepDocument = {
    type: string
    record_type?: string
    url?: string
    title?: string
    source?: { content?: { type: string; text?: string }[] }
}

export const normalizeResults = (documents: InkeepDocument[]): SemanticSearchResult[] => {
    const seenPaths = new Set<string>()
    const results: SemanticSearchResult[] = []

    for (const doc of documents) {
        if (!doc?.url || !doc?.title) continue

        let parsed: URL
        try {
            parsed = new URL(doc.url)
        } catch {
            continue
        }

        // Only surface posthog.com results (the Inkeep project may also ingest
        // external sources like GitHub that don't belong in site search)
        if (!/(^|\.)posthog\.com$/.test(parsed.hostname)) continue

        // Inkeep ingests the generated markdown mirrors of pages (e.g.
        // /session-replay.md, /teams/billing.md) — link to the real page
        const pathname = parsed.pathname.replace(/\.md$/, '')

        // Multiple chunks of the same page can match — keep the highest-ranked one
        if (seenPaths.has(pathname)) continue
        seenPaths.add(pathname)

        const excerpt = cleanExcerpt((doc.source?.content || []).map((block) => block.text || '').join(' '))

        results.push({
            type: typeForPath(pathname),
            title: cleanTitle(doc.title),
            url: pathname,
            fragment: parsed.hash ? parsed.hash.slice(1) : undefined,
            excerpt,
        })
    }

    return results
}

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse): Promise<void> => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const apiKey = process.env.INKEEP_RAG_API_KEY
    if (!apiKey) {
        return res.status(500).json({ error: 'Search is not configured' })
    }

    const query = typeof req.body?.query === 'string' ? req.body.query.trim() : ''
    if (!query) {
        return res.status(400).json({ error: 'Missing query' })
    }

    try {
        const response = await fetch('https://api.inkeep.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'inkeep-rag',
                messages: [{ role: 'user', content: query }],
                response_format: { type: 'json_object' },
            }),
        })

        if (!response.ok) {
            console.error(`Inkeep RAG API returned ${response.status}: ${await response.text()}`)
            return res.status(502).json({ error: 'Search request failed' })
        }

        const data = await response.json()
        const content = JSON.parse(data?.choices?.[0]?.message?.content || '{}')
        const documents: InkeepDocument[] = Array.isArray(content?.content) ? content.content : []

        return res.status(200).json({ results: normalizeResults(documents) })
    } catch (error) {
        console.error('Semantic search error:', error)
        return res.status(500).json({ error: 'Search request failed' })
    }
}

export default handler
