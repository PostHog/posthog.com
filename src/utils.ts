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
