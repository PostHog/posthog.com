import type { Event } from '../../../pages/events'
import { eventDefaults } from '../templates/event/defaults'
import { pickRandomTheme } from '../themes'
import { buildGeneratorUrl } from '../state'

function seedFromId(id: number): number {
    return Math.abs(id) % 22
}

export function buildEventGeneratorUrl(event: Event): string {
    const base = eventDefaults()
    const next = {
        ...base,
        theme: pickRandomTheme(seedFromId(event.id)),
        title: { ...base.title, content: event.name || base.title.content },
        event: {
            ...base.event!,
            date: event.date,
            time: event.startTime,
            showCalendar: true,
        },
    }
    return buildGeneratorUrl(next)
}
