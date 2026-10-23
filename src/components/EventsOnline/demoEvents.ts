import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import type { Event } from '../../pages/events'

dayjs.extend(utc)
dayjs.extend(timezone)

// DEMO ONLY – mixed into /events unless the URL has ?demo=0, so we can show online, live and recorded
// events before Strapi has any. Negative IDs keep them clear of real events.

// TODO(britt): swap these for real PostHog talk/stream recordings. Any YouTube URL or video ID works.
const RECORDINGS = {
    teardown: 'https://www.youtube.com/watch?v=1FZji2L-LmM',
    hogHours: 'https://www.youtube.com/watch?v=1FZji2L-LmM',
    flags: 'https://www.youtube.com/watch?v=1FZji2L-LmM',
    surveys: 'https://www.youtube.com/watch?v=1FZji2L-LmM',
    launch: 'https://www.youtube.com/watch?v=1FZji2L-LmM',
}

const online = { label: 'Online' }

// Builds date + startTime in the event's own timezone, relative to "now", so the live one is always live
const at = (minutesFromNow: number, tz: string): Pick<Event, 'date' | 'startTime' | 'timezone'> => {
    // Upcoming ones snap to the hour so they read like real listings; the live one stays relative to now
    const shifted = dayjs().add(minutesFromNow, 'minute')
    const start = (minutesFromNow > 0 ? shifted.startOf('hour') : shifted).tz(tz)
    return { date: start.format('YYYY-MM-DD'), startTime: start.format('HH:mm'), timezone: tz }
}

const daysAgo = (days: number, time: string, tz: string): Pick<Event, 'date' | 'startTime' | 'timezone'> => ({
    date: dayjs().subtract(days, 'day').format('YYYY-MM-DD'),
    startTime: time,
    timezone: tz,
})

export const buildDemoEvents = (): Event[] => [
    {
        id: -1,
        name: 'Hog Hours: live product teardown',
        description: 'We pull apart a real product with the community, live. Bring questions and hot takes.',
        ...at(-20, 'America/New_York'),
        endTime: dayjs().add(40, 'minute').tz('America/New_York').format('HH:mm'),
        online: true,
        location: online,
        format: ['Livestream'],
        audience: ['Builders'],
        link: 'https://posthog.com/community',
    },
    {
        id: -2,
        name: 'Community call: what shipped this month',
        description: 'A 30-minute tour of everything new in PostHog, with the people who built it.',
        ...at(60 * 24 * 6, 'Europe/London'),
        online: true,
        location: online,
        format: ['Community call'],
        audience: ['Builders'],
        link: 'https://posthog.com/community',
    },
    {
        id: -3,
        name: 'Office hours with the Product Analytics team',
        description: 'Bring your trickiest funnel and we will help you fix it.',
        ...at(60 * 24 * 13, 'America/Los_Angeles'),
        online: true,
        location: online,
        format: ['Office hours'],
        audience: ['Builders'],
        link: 'https://posthog.com/community',
    },
    {
        id: -11,
        name: 'Product teardown #12: onboarding flows',
        ...daysAgo(9, '17:00', 'Europe/London'),
        online: true,
        location: online,
        video: RECORDINGS.teardown,
        attendees: 214,
        vibeScore: 4,
    },
    {
        id: -12,
        name: 'Hog Hours: ask a PostHog engineer anything',
        ...daysAgo(23, '12:00', 'America/New_York'),
        online: true,
        location: online,
        video: RECORDINGS.hogHours,
        attendees: 158,
        vibeScore: 5,
    },
    {
        id: -13,
        name: 'Feature flags without the footguns',
        ...daysAgo(41, '16:00', 'Europe/Berlin'),
        online: true,
        location: online,
        video: RECORDINGS.flags,
        attendees: 97,
        vibeScore: 3,
    },
    {
        id: -14,
        name: 'Surveys that people actually answer',
        ...daysAgo(64, '10:00', 'America/Los_Angeles'),
        online: true,
        location: online,
        video: RECORDINGS.surveys,
        attendees: 121,
        vibeScore: 4,
    },
    {
        id: -15,
        name: 'Launch week recap stream',
        ...daysAgo(90, '18:00', 'Europe/London'),
        online: true,
        location: online,
        video: RECORDINGS.launch,
        attendees: 342,
        vibeScore: 5,
    },
]
