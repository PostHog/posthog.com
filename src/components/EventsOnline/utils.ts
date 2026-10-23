import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { eventGraphicStyle, eventGraphicStyleIndex } from 'constants/eventGraphicPalette'
import type { Event } from '../../pages/events'

dayjs.extend(utc)
dayjs.extend(timezone)
// Needed for the `z` (timezone abbreviation) format token
dayjs.extend(advancedFormat)

// Online events with no end time are treated as live for this long after they start
const DEFAULT_ONLINE_DURATION_MINUTES = 60

// Same seed the event graphic uses, so tapes and stamps match the event's artwork
export const eventHue = (event: Event): string =>
    eventGraphicStyle(eventGraphicStyleIndex(`${event.id}-${event.name}`)).hue.from

// Stable small number per event, used for tilts on polaroids and stamps
export const eventTilt = (event: Event, range = 6): number => {
    const n = Math.abs(event.id * 9301 + 49297) % (range * 2 + 1)
    return n - range
}

export const viewerTimezone = (): string => {
    try {
        return dayjs.tz.guess()
    } catch {
        return 'UTC'
    }
}

const datePart = (event: Event): string => dayjs(event.date).format('YYYY-MM-DD')

/** Start of the event. Uses the event's own timezone when it has one (demo events only, for now). */
export const getEventStart = (event: Event): Dayjs => {
    if (event.startTime) {
        const local = `${datePart(event)} ${event.startTime}`
        return event.timezone ? dayjs.tz(local, event.timezone) : dayjs(local)
    }
    return dayjs(event.date)
}

export const getEventEnd = (event: Event): Dayjs => {
    const start = getEventStart(event)
    if (event.endTime) {
        const local = `${datePart(event)} ${event.endTime}`
        const end = event.timezone ? dayjs.tz(local, event.timezone) : dayjs(local)
        if (end.isAfter(start)) return end
    }
    if (event.end_date) {
        const end = dayjs(event.end_date)
        if (end.isAfter(start)) return end
    }
    // Without a start time we only know the day, so the whole day counts
    return event.startTime ? start.add(DEFAULT_ONLINE_DURATION_MINUTES, 'minute') : start.endOf('day')
}

/** Only online events can be "live" – in-person events never get the on-air treatment. */
export const isEventLive = (event: Event, now: Dayjs = dayjs()): boolean => {
    if (!event.online || !event.startTime) return false
    return !now.isBefore(getEventStart(event)) && now.isBefore(getEventEnd(event))
}

/** Formats the start time either in the event's timezone or the viewer's. */
export const formatEventTime = (event: Event, mode: 'event' | 'viewer'): string => {
    const start = getEventStart(event)
    const zoned = mode === 'event' && event.timezone ? start.tz(event.timezone) : start.tz(viewerTimezone())
    return zoned.format('ddd, MMM D · h:mm A z')
}

// --- Calendar ---------------------------------------------------------------------------------------

const icsEscape = (value = ''): string =>
    value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')

const utcStamp = (d: Dayjs): string => d.utc().format('YYYYMMDD[T]HHmmss[Z]')

const eventLocationText = (event: Event): string =>
    event.online
        ? event.link || 'Online'
        : [event.location?.venue?.name, event.location?.label].filter(Boolean).join(', ')

const calendarDates = (event: Event): { start: string; end: string; allDay: boolean } => {
    if (!event.startTime) {
        const day = dayjs(event.date)
        return { start: day.format('YYYYMMDD'), end: day.add(1, 'day').format('YYYYMMDD'), allDay: true }
    }
    return { start: utcStamp(getEventStart(event)), end: utcStamp(getEventEnd(event)), allDay: false }
}

export const buildIcs = (event: Event): string => {
    const { start, end, allDay } = calendarDates(event)
    const dateLine = (key: string, value: string) => (allDay ? `${key};VALUE=DATE:${value}` : `${key}:${value}`)
    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//PostHog//Events//EN',
        'BEGIN:VEVENT',
        `UID:event-${event.id}@posthog.com`,
        `DTSTAMP:${utcStamp(dayjs())}`,
        dateLine('DTSTART', start),
        dateLine('DTEND', end),
        `SUMMARY:${icsEscape(event.name)}`,
        `DESCRIPTION:${icsEscape(event.description || '')}`,
        `LOCATION:${icsEscape(eventLocationText(event))}`,
        event.link ? `URL:${event.link}` : '',
        'END:VEVENT',
        'END:VCALENDAR',
    ]
        .filter(Boolean)
        .join('\r\n')
}

export const downloadIcs = (event: Event): void => {
    const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`
    a.click()
    URL.revokeObjectURL(url)
}

export const googleCalendarUrl = (event: Event): string => {
    const { start, end } = calendarDates(event)
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.name,
        dates: `${start}/${end}`,
        details: [event.description, event.link].filter(Boolean).join('\n\n'),
        location: eventLocationText(event),
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
}
