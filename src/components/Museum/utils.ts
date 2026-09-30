import dayjs from 'dayjs'
import slugify from 'slugify'
import type { DatePrecision, MuseumLink, MuseumVideo } from 'hooks/useMuseum'

// Older exhibits often only have a month or a year, so the date renders at the precision it was entered
export const formatExhibitDate = (date?: string | null, precision: DatePrecision = 'month'): string => {
    if (!date) {
        return ''
    }
    const parsed = dayjs(date)
    if (!parsed.isValid()) {
        return ''
    }
    return parsed.format(precision === 'day' ? 'D MMMM YYYY' : precision === 'year' ? 'YYYY' : 'MMMM YYYY')
}

export const toSlug = (value: string): string => slugify(value, { lower: true, strict: true })

export const uniqueSlug = (value: string, taken: string[]): string => {
    const base = toSlug(value) || 'exhibit'
    let slug = base
    let suffix = 2
    while (taken.includes(slug)) {
        slug = `${base}-${suffix}`
        suffix += 1
    }
    return slug
}

export type VideoEmbed = { source: 'youtube'; id: string } | { source: 'wistia'; id: string } | { source: 'link' }

export const parseVideo = ({ url }: MuseumVideo): VideoEmbed => {
    const youtube = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
    if (youtube) {
        return { source: 'youtube', id: youtube[1] }
    }
    const wistia = url.match(/(?:wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/|wvideo=)([a-z0-9]+)/i)
    if (wistia) {
        return { source: 'wistia', id: wistia[1] }
    }
    return { source: 'link' }
}

// Absolute http(s) URLs or site-relative paths like /merch (per the internal-link convention)
export const isValidUrl = (value: string): boolean => {
    if (!/^(https?:\/\/|\/)/.test(value)) {
        return false
    }
    try {
        new URL(value, 'https://posthog.com')
        return true
    } catch {
        return false
    }
}

// The form edits links as one "Label | URL" pair per line
export const parseLinks = (value: string): MuseumLink[] =>
    value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [label, ...rest] = line.split('|')
            const url = rest.join('|').trim()
            return url ? { label: label.trim() || url, url } : { label: label.trim(), url: label.trim() }
        })

export const formatLinks = (links: MuseumLink[]): string =>
    links.map(({ label, url }) => (label && label !== url ? `${label} | ${url}` : url)).join('\n')
