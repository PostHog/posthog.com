const LUMA_LIST_EVENTS_URL = 'https://public-api.luma.com/v1/calendar/list-events'
// Safety bound so a runaway cursor can't loop forever (5 pages × 100 events)
const MAX_PAGES = 5

// Luma's API sends no CORS headers, so the browser can't call it directly.
// This proxy fetches upcoming events from the PostHog Luma calendar and
// returns a trimmed payload for the event form's auto-suggest.
const handler = async (req, res) => {
    const token = process.env.GATSBY_LUMA_TOKEN
    if (!token) {
        return res.status(500).json({ error: 'Missing Luma API token' })
    }

    try {
        const events = []
        let cursor = null

        for (let page = 0; page < MAX_PAGES; page++) {
            const url = new URL(LUMA_LIST_EVENTS_URL)
            url.searchParams.set('after', new Date().toISOString())
            url.searchParams.set('pagination_limit', '100')
            if (cursor) {
                url.searchParams.set('pagination_cursor', cursor)
            }

            const response = await fetch(url.toString(), {
                headers: { 'x-luma-api-key': token },
            })
            if (!response.ok) {
                throw new Error(`Luma API request failed: ${response.status}`)
            }

            const json = await response.json()
            const entries = Array.isArray(json?.entries) ? json.entries : []

            for (const entry of entries) {
                const event = entry?.event || entry
                if (!event?.name) continue
                const geo = event.geo_address_json || {}
                events.push({
                    id: event.api_id || event.id,
                    name: event.name,
                    startAt: event.start_at || null,
                    endAt: event.end_at || null,
                    timezone: event.timezone || null,
                    url: event.url || null,
                    lat: event.coordinate?.latitude ?? (event.geo_latitude ? Number(event.geo_latitude) : null),
                    lng: event.coordinate?.longitude ?? (event.geo_longitude ? Number(event.geo_longitude) : null),
                    city: geo.city || null,
                    cityState: geo.city_state || null,
                    country: geo.country || null,
                    venue: geo.address || null,
                    fullAddress: geo.full_address || null,
                    online: event.location_type !== 'offline',
                })
            }

            if (!json?.has_more || !json?.next_cursor) break
            cursor = json.next_cursor
        }

        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
        return res.status(200).json({ events })
    } catch (error) {
        console.error('Error fetching Luma events:', error)
        return res.status(500).json({ error: 'Failed to fetch Luma events' })
    }
}

// CommonJS (not `export default`) so the Gatsby dev middleware can require() this
// file directly with plain Node; Vercel's runtime supports CJS handlers natively.
module.exports = handler
