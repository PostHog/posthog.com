import sections from './sections.json'

// Text helpers shared by the OG card templates (Node) and the page templates (browser),
// so the card, its alt text, and the generated meta description state the same facts.

export type OGSection = { prefix: string; name: string; color: string; hog: string }

export const getSection = (slug: string): OGSection | undefined =>
    (sections as OGSection[]).find(({ prefix }) => slug === prefix || slug.startsWith(`${prefix}/`))

// "An 8 minute read", "A 6 minute read"
export const readTimeText = (minutes?: number): string => {
    if (!minutes) return ''
    const article = [8, 11, 18].includes(minutes) || (minutes >= 80 && minutes <= 89) ? 'An' : 'A'
    return `${article} ${minutes} minute read`
}

// Ashby stores timezones as free text, for example "GMT +2 to GMT -8".
export const formatTimezone = (timezone?: string): string =>
    (timezone || '')
        .trim()
        .replace(/GMT\s*([+-])\s*(\d)/g, 'GMT$1$2')
        .replace(/GMT-/g, 'GMT−')

const sectionLabel = (slug: string): string => {
    const section = getSection(slug)
    if (slug.startsWith('/tutorials')) return 'PostHog tutorial'
    if (slug.startsWith('/handbook')) return 'PostHog handbook'
    return !section || section.name === 'Docs' ? 'PostHog docs' : `PostHog ${section.name} docs`
}

export const docsCardText = ({ title, slug, timeToRead }: { title: string; slug: string; timeToRead?: number }) => {
    const readTime = readTimeText(timeToRead)
    return `${title}. ${sectionLabel(slug)}${readTime ? `, ${readTime.toLowerCase()}` : ''}.`
}

export const jobCardAlt = ({ role, timezone }: { role: string; timezone?: string }) => {
    const tz = formatTimezone(timezone)
    return `${role}. ${tz ? `Remote, ${tz}` : 'Fully remote'}. PostHog careers.`
}

export const jobDescription = ({ role, timezone, slug }: { role: string; timezone?: string; slug: string }) => {
    const tz = formatTimezone(timezone)
    return `${role} at PostHog. ${tz ? `Fully remote, ${tz}` : 'Fully remote'}. Apply at posthog.com${slug}.`
}

export const CAREERS_CARD_ALT = "We're hiring. Fully remote, all salaries public. PostHog careers."
