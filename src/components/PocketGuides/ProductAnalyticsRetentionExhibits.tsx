import React from 'react'
import { stays } from '@posthog/twig-components/catalog'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import coast from '@posthog/twig-components/assets/coast.jpg'
import '@posthog/twig-components/catalog.css'

import { Exhibit } from './ProductAnalyticsExhibits'

// Local teaching data: these bookings are not part of the 10-person cohort below.
const bookings = [
    {
        stay: stays[0],
        image: cabin,
        label: 'First booking',
        trip: 'March 2025 stay',
        eventDate: 'Jan 15, 2025',
    },
    {
        stay: stays[1],
        image: coast,
        label: 'Books again',
        trip: 'March 2026 stay',
        eventDate: 'Jan 18, 2026',
    },
]

export function RepeatBookingFigure(): JSX.Element {
    return (
        <Exhibit stacked>
            <div className="twig-browser grid gap-3 !border-0 !bg-transparent @lg:grid-cols-2">
                {bookings.map(({ stay, image, label, trip, eventDate }) => (
                    <article key={stay.id} className="overflow-hidden rounded border border-[#d7c8b6] bg-[#fff8ee]">
                        <div className="flex min-w-0 gap-3 p-3">
                            <img className="size-20 shrink-0 rounded object-cover" src={image} alt="" />
                            <div className="min-w-0">
                                <span className="text-xs uppercase tracking-wide text-[#6d6258]">{label}</span>
                                <h3 className="!my-0 text-base">{stay.title}</h3>
                                <p className="!my-0 text-sm text-[#6d6258]">{trip}</p>
                            </div>
                        </div>
                        <div className="border-t border-[#d7c8b6] px-3 py-2 font-code text-xs">
                            <div className="font-semibold">booking_completed</div>
                            <div className="text-[#6d6258]">{eventDate} · person_42</div>
                        </div>
                    </article>
                ))}
            </div>
        </Exhibit>
    )
}

const retentionMonths = [
    { month: 'Month 0', guests: '10', retention: '100%' },
    { month: 'Month 6', guests: '2', retention: '20%' },
    { month: 'Month 12', guests: '3', retention: '30%' },
]

export function BookingRetentionFigure(): JSX.Element {
    return (
        <Exhibit stacked>
            <div className="overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] font-rounded text-[#292724]">
                <div className="border-b border-[#d3d0c8] bg-[#f6f3ed] px-3 py-2 text-sm font-semibold">
                    January cohort · 10 guests
                </div>
                <div className="grid grid-cols-3 gap-px bg-[#d3d0c8]">
                    {retentionMonths.map(({ month, guests, retention }) => (
                        <div key={month} className="min-w-0 bg-[#fffdfa] p-2 text-center @md:p-3">
                            <div className="text-xs text-[#716c63]">{month}</div>
                            <div className="mt-2 rounded bg-[#fff0dc] px-1 py-2">
                                <strong className="block text-base leading-5">{retention}</strong>
                                <span className="text-xs">{guests} guests</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Exhibit>
    )
}
