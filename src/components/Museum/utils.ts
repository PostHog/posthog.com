import dayjs from 'dayjs'
import slugify from 'slugify'
import type { DatePrecision, MuseumPerson } from 'hooks/useMuseum'

export const formatDate = (date?: string, precision: DatePrecision = 'month'): string =>
    date ? dayjs(date).format(precision === 'day' ? 'MMMM D, YYYY' : precision === 'year' ? 'YYYY' : 'MMMM YYYY') : ''

export const personName = ({ firstName, lastName }: MuseumPerson): string =>
    [firstName, lastName].filter(Boolean).join(' ')

export const uniqueSlug = (value: string, taken: string[]): string => {
    const base = slugify(value, { lower: true, strict: true }) || 'artifact'
    let slug = base
    for (let i = 2; taken.includes(slug); i++) {
        slug = `${base}-${i}`
    }
    return slug
}

export const parseVideo = (url: string): { source: 'youtube' | 'wistia'; videoId: string } | null => {
    const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
    if (youtube) return { source: 'youtube', videoId: youtube[1] }
    const wistia = url.match(/wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/([a-z0-9]+)/i)
    if (wistia) return { source: 'wistia', videoId: wistia[1] }
    return null
}
