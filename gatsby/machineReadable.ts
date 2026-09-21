// Pure parsers behind the machine-readable JSON twins that onPostBuild publishes
// (feature ownership, support SME groups, support severity levels).
// No imports, so `node --test` can load this file without the rest of the build.
// Each parser throws when it finds zero rows: a page edit that changes the shape
// must fail the build, not publish an empty file.

export type FeatureOwner = { name: string | null; slug: string }
export type FeatureOwnership = { feature: string; owners: FeatureOwner[]; notes: string }
export type SmeProductGroup = { name: string; products: string[] }
export type SeverityLevel = { level: string; definition: string; examples: string[] }

const SLUG = '[a-z0-9]+(?:-[a-z0-9]+)*'
// A team link as the generated .md twin writes it: [Product Analytics Team](/teams/product-analytics.md)
const TEAM_LINK = new RegExp(`^\\[([^\\]]+)\\]\\((?:https://posthog\\.com)?/teams/(${SLUG})(?:\\.md)?/?\\)`)
const BARE_SLUG = new RegExp(`^${SLUG}(?=\\s|$)`)

const splitRow = (line: string): string[] =>
    line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split(/(?<!\\)\|/)
        .map((cell) => cell.replace(/\\\|/g, '|').trim())

const isSeparatorRow = (cells: string[]): boolean => cells.every((cell) => /^:?-+:?$/.test(cell) || cell === '')

// Returns the body rows of the first Markdown table whose header cells equal `header`.
const tableRows = (markdown: string, header: string[]): string[][] => {
    const lines = markdown.split('\n')
    const normalize = (cell: string) => cell.replace(/\*/g, '').trim().toLowerCase()
    const start = lines.findIndex((line) => {
        if (!line.trim().startsWith('|')) return false
        const cells = splitRow(line).map(normalize)
        return header.every((name, i) => cells[i] === name.toLowerCase())
    })
    if (start === -1) return []

    const rows: string[][] = []
    for (const line of lines.slice(start + 1)) {
        if (!line.trim().startsWith('|')) break
        const cells = splitRow(line)
        if (!isSeparatorRow(cells)) rows.push(cells)
    }
    return rows
}

// Owner cell = team links first, then optional free-text notes.
// A team the page cannot resolve renders as its bare slug. The parser accepts a bare slug
// only when it is the whole cell or directly follows a link. Other text is a note.
const parseOwnerCell = (cell: string): { owners: FeatureOwner[]; notes: string } => {
    const owners: FeatureOwner[] = []
    let rest = cell.trim()

    for (;;) {
        const link = rest.match(TEAM_LINK)
        if (link) {
            owners.push({ name: link[1].trim().replace(/ Team$/, ''), slug: link[2] })
            rest = rest.slice(link[0].length)
            continue
        }
        const bare = rest.match(BARE_SLUG)
        if (bare && (owners.length > 0 || bare[0] === rest)) {
            owners.push({ name: null, slug: bare[0] })
            rest = rest.slice(bare[0].length)
            continue
        }
        break
    }

    return { owners, notes: rest.trim() }
}

export const parseFeatureOwnershipTable = (markdown: string, source: string): FeatureOwnership[] => {
    const features = tableRows(markdown, ['Feature', 'Owner', 'Label'])
        .filter((cells) => cells[0])
        .map((cells) => ({ feature: cells[0], ...parseOwnerCell(cells[1] || '') }))

    if (features.length === 0) {
        throw new Error(
            `${source}: found no feature ownership rows. Expected a Markdown table with the header "| Feature | Owner | Label |" and one row for each feature.`
        )
    }
    return features
}

// Splits on commas that are not inside parentheses.
const splitTopLevelCommas = (text: string): string[] => {
    const parts: string[] = []
    let depth = 0
    let current = ''
    for (const char of text) {
        if (char === '(') depth++
        if (char === ')') depth--
        if (char === ',' && depth === 0) {
            parts.push(current)
            current = ''
        } else {
            current += char
        }
    }
    parts.push(current)
    return parts.map((part) => part.trim()).filter(Boolean)
}

export const parseSmeProductGroups = (markdown: string, source: string): SmeProductGroup[] => {
    const lines = markdown.split('\n')
    const start = lines.findIndex((line) => /^###\s+Product groups\s*$/.test(line))
    const groups: SmeProductGroup[] = []

    if (start !== -1) {
        for (const line of lines.slice(start + 1)) {
            if (/^#{1,6}\s/.test(line)) break
            const bullet = line.match(/^\s*[-*]\s+(.+?)\s*$/)
            if (!bullet) {
                // The list ends at the first non-blank line after it
                if (groups.length > 0 && line.trim()) break
                continue
            }
            const group = bullet[1].match(/^(.+?)\s*\((.+)\)$/)
            if (!group) continue
            groups.push({ name: group[1].trim(), products: splitTopLevelCommas(group[2]) })
        }
    }

    if (groups.length === 0) {
        throw new Error(
            `${source}: found no product groups. Expected a bulleted list under the heading "### Product groups", one bullet for each group, in the shape "- Group name (product, product)".`
        )
    }
    return groups
}

export const parseSeverityLevels = (markdown: string, source: string): SeverityLevel[] => {
    const severities = tableRows(markdown, ['Level', 'Impact', 'Examples'])
        .filter((cells) => cells[0])
        .map((cells) => ({
            level: cells[0].replace(/\*/g, '').trim(),
            definition: cells[1] || '',
            examples: Array.from((cells[2] || '').matchAll(/<li>(.*?)<\/li>/g), (match) => match[1].trim()),
        }))

    if (severities.length === 0) {
        throw new Error(
            `${source}: found no severity rows. Expected a Markdown table with the header "| Level | Impact | Examples |" and one row for each severity level.`
        )
    }
    return severities
}
