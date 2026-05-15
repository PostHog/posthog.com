import { runIframePreflight } from '../../lib/iframe-preflight.js'

const CACHE = 'public, max-age=3600, s-maxage=3600'
const JSON_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': CACHE,
}

export async function onRequestGet({ request }) {
    const url = new URL(request.url).searchParams.get('url')
    const result = await runIframePreflight(url)
    return new Response(JSON.stringify(result.json), {
        status: result.status,
        headers: JSON_HEADERS,
    })
}
