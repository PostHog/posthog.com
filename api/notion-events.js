const NOTION_QUERY_URL = (databaseId) => `https://api.notion.com/v1/databases/${databaseId}/query`
// Pinned: 2025-09-03 replaced database queries with data sources
const NOTION_API_VERSION = '2022-06-28'
// Safety bound so a runaway cursor can't loop forever (5 pages × 100 rows)
const MAX_PAGES = 5
// Include recently-finished events so they can still be backfilled
const PAST_WINDOW_DAYS = 90

const plainText = (rich) =>
    Array.isArray(rich)
        ? rich
              .map((chunk) => chunk?.plain_text || '')
              .join('')
              .trim()
        : ''

// The database is hand-maintained, so a field like Location may be rich_text in one
// workspace and select in another. Read the common shapes rather than assuming one.
const readProp = (prop) => {
    if (!prop) return null
    switch (prop.type) {
        case 'title':
            return plainText(prop.title) || null
        case 'rich_text':
            return plainText(prop.rich_text) || null
        case 'select':
            return prop.select?.name || null
        case 'status':
            return prop.status?.name || null
        case 'multi_select':
            return (
                prop.multi_select
                    ?.map((o) => o.name)
                    .filter(Boolean)
                    .join(', ') || null
            )
        case 'number':
            return typeof prop.number === 'number' ? prop.number : null
        case 'url':
            return prop.url || null
        case 'email':
            return prop.email || null
        case 'date':
            return prop.date?.start || null
        case 'people':
            return (
                prop.people
                    ?.map((p) => p.name)
                    .filter(Boolean)
                    .join(', ') || null
            )
        case 'formula':
            return prop.formula?.string ?? prop.formula?.number ?? prop.formula?.date?.start ?? null
        default:
            return null
    }
}

// Case-insensitive with aliases, so a renamed column degrades to a missing field
const findKey = (properties, name) => Object.keys(properties).find((key) => key.toLowerCase() === name.toLowerCase())

const pick = (properties, ...names) => {
    for (const name of names) {
        const key = findKey(properties, name)
        if (!key) continue
        const value = readProp(properties[key])
        if (value !== null && value !== '') return value
    }
    return null
}

const pickDate = (properties, ...names) => {
    for (const name of names) {
        const key = findKey(properties, name)
        if (key && properties[key]?.type === 'date' && properties[key].date?.start) return properties[key].date
    }
    return null
}

const titleKey = (properties) => Object.keys(properties).find((key) => properties[key]?.type === 'title')

// Role words mixed in with names ("Xander attending"). Excludes "team" on purpose —
// stripping it would leave "PostHog", which then matches the "PostHog AI" profile.
const ROLE_WORDS =
    /\b(speaking|speakers?|attending|attended|attends|attendee|hosting|hosts?|presenting|presenter|moderating|moderator|mc|panel(?:ist)?|talk|workshop|demo|booth|travel*ing|travelled|visiting|joining|joined|going|organi[sz]ing|organi[sz]er|sponsoring|sponsor|exhibiting|tbc|tbd|maybe)\b/gi

// Free text like "Meikel Ratz (PostHog) speaking; Daniel Z hosting w/ Peppe Silletti" —
// split into candidate names, dropping annotations. The client resolves them to profiles.
const parseSpeakerNames = (raw) =>
    (raw || '')
        .replace(/\([^)]*\)/g, ' ')
        .split(/,|;|&|\+|\bw\/|\band\b|\//i)
        .map((part) => part.replace(ROLE_WORDS, ' ').replace(/\s+/g, ' ').trim())
        // Keep name-shaped fragments only — no digits, URLs, or leftover notes
        .filter((part) => part.length > 1 && /^[\p{L}][\p{L}'’.\- ]*$/u.test(part))

const toEvent = (page) => {
    const properties = page.properties || {}
    const nameKey = titleKey(properties)
    const name = pick(properties, 'Name', 'Event', 'Title') || (nameKey ? readProp(properties[nameKey]) : null)
    if (!name) return null

    const date = pickDate(properties, 'Date', 'Event date', 'Start')
    const start = date?.start || null
    const category = pick(properties, 'Category', 'Type', 'Format')
    const location = pick(properties, 'Location', 'City')
    const venue = pick(properties, 'Venue')

    return {
        id: page.id,
        source: 'notion',
        name,
        // Raw: date-only or offset-bearing. The client reads the wall clock as authored.
        startAt: start,
        endAt: date?.end || null,
        allDay: Boolean(start) && !start.includes('T'),
        timezone: date?.time_zone || null,
        url: pick(properties, 'Event URL', 'URL', 'Link'),
        // Notion stores no coordinates; the client geocodes venue + location
        lat: null,
        lng: null,
        city: location,
        cityState: location,
        country: null,
        venue,
        fullAddress: [venue, location].filter(Boolean).join(', ') || null,
        // Heuristic: only the virtual categories imply no physical location
        online: /webinar|virtual|online/i.test(category || ''),
        description: pick(properties, 'Event Description', 'Description'),
        category,
        primaryPurpose: pick(properties, 'Primary purpose', 'Purpose'),
        attendees: pick(properties, 'Attended') ?? pick(properties, 'Registered'),
        status: pick(properties, 'Status'),
        // The "Speakers" relation is redacted unless the integration can also read the
        // related database, so names come from the free-text column instead.
        speakerNames: parseSpeakerNames(pick(properties, 'Speaking, Attending', 'Speakers', 'Speaker')),
    }
}

// Notion sends no CORS headers, and the token grants read access to the whole database,
// so the browser can't call it directly. Returns a trimmed payload for the event form.
const handler = async (req, res) => {
    const token = process.env.NOTION_TOKEN
    const databaseId = process.env.NOTION_EVENTS_DATABASE_ID
    if (!token || !databaseId) {
        return res.status(500).json({ error: 'Missing Notion token or database ID' })
    }

    const cutoff = new Date(Date.now() - PAST_WINDOW_DAYS * 86400000).toISOString().slice(0, 10)

    const query = async (body) =>
        fetch(NOTION_QUERY_URL(databaseId), {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Notion-Version': NOTION_API_VERSION,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

    try {
        const events = []
        let cursor = null
        // Notion rejects the filter if the date property isn't literally named "Date",
        // so fall back to an unfiltered scan and drop old rows below.
        let filterByDate = true

        for (let page = 0; page < MAX_PAGES; page++) {
            const body = { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }
            if (filterByDate) {
                body.filter = { property: 'Date', date: { on_or_after: cutoff } }
                body.sorts = [{ property: 'Date', direction: 'ascending' }]
            }

            let response = await query(body)
            if (!response.ok && filterByDate && response.status === 400) {
                console.warn('notion-events: no "Date" property to filter on, falling back to full scan')
                filterByDate = false
                delete body.filter
                delete body.sorts
                response = await query(body)
            }
            if (!response.ok) {
                throw new Error(`Notion API request failed: ${response.status}`)
            }

            const json = await response.json()
            for (const row of json.results || []) {
                const mapped = toEvent(row)
                // Rows with no date can't populate the form's required date field
                if (mapped?.startAt && mapped.startAt.slice(0, 10) >= cutoff) events.push(mapped)
            }

            if (!json.has_more || !json.next_cursor) break
            cursor = json.next_cursor
        }

        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
        return res.status(200).json({ events })
    } catch (error) {
        console.error('Error fetching Notion events:', error)
        return res.status(500).json({ error: 'Failed to fetch Notion events' })
    }
}

module.exports = handler
