import React, { useEffect, useState } from 'react'
import { IconCalendar } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import type { Event } from '../../pages/events'
import { downloadIcs, formatEventTime, getEventStart, googleCalendarUrl, viewerTimezone } from './utils'

const TIME_MODE_KEY = 'posthog-events-time-mode'

type TimeMode = 'event' | 'viewer'

/** Start time with a toggle between the event's timezone and the visitor's. */
export const EventTime = ({ event }: { event: Event }) => {
    const [mode, setMode] = useState<TimeMode>('viewer')

    useEffect(() => {
        try {
            const saved = localStorage.getItem(TIME_MODE_KEY)
            if (saved === 'event' || saved === 'viewer') setMode(saved)
        } catch {
            // Storage blocked: keep the default
        }
    }, [])

    const changeMode = (value: string) => {
        setMode(value as TimeMode)
        try {
            localStorage.setItem(TIME_MODE_KEY, value)
        } catch {
            // Storage blocked: the toggle still works for this visit
        }
    }

    // Only events with a known timezone can be shown two ways.
    // TODO: real Strapi events have no timezone field yet, so they always show the visitor's time.
    const canToggle = Boolean(event.timezone) && event.timezone !== viewerTimezone()

    return (
        <div>
            <div className="mb-1 flex items-center justify-between gap-2">
                <div className="text-secondary text-[13px]">Start time</div>
                {canToggle && (
                    <ToggleGroup
                        title="Timezone"
                        hideTitle
                        size="sm"
                        className="w-40"
                        options={[
                            { label: 'Your time', value: 'viewer' },
                            { label: 'Event time', value: 'event' },
                        ]}
                        value={mode}
                        onValueChange={changeMode}
                    />
                )}
            </div>
            <div>{formatEventTime(event, canToggle ? mode : 'viewer')}</div>
        </div>
    )
}

/** Download an .ics (Apple, Outlook, most apps) or open Google Calendar. Upcoming events only. */
export const AddToCalendar = ({ event }: { event: Event }) => {
    if (getEventStart(event).isBefore(new Date(), 'day')) return null
    return (
        <div>
            <div className="text-secondary text-[13px] mb-1">Add to calendar</div>
            <div className="flex flex-wrap gap-1">
                <OSButton size="md" icon={<IconCalendar />} onClick={() => downloadIcs(event)}>
                    Apple / Outlook (.ics)
                </OSButton>
                <OSButton size="md" asLink to={googleCalendarUrl(event)} external>
                    Google Calendar
                </OSButton>
            </div>
        </div>
    )
}
