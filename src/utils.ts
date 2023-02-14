import { useMemo } from 'react'
import GithubSlugger from 'github-slugger'

export function dateToDays(date: string | Date) {
    const today = new Date()

    let posted: Date
    if (date instanceof Date) {
        posted = date
    } else {
        posted = new Date(date)
    }

    const diff = today.getTime() - posted.getTime()
    return Math.round(diff / (1000 * 3600 * 24))
}

export function dayFormat(days: number) {
    return days <= 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`
}

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const useToc = (headings: { value: string; depth: number }[]) => {
    return useMemo(() => {
        const slugger = new GithubSlugger()

        return headings.map((heading) => {
            return {
                ...heading,
                depth: heading.depth - 2,
                url: slugger.slug(heading.value),
            }
        })
    }, [])
}
