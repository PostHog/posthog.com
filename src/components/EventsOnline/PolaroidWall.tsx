import React, { useState } from 'react'
import dayjs from 'dayjs'
import { ZoomImage } from 'components/ZoomImage'
import OSButton from 'components/OSButton'
import type { Event } from '../../pages/events'
import { eventTilt } from './utils'

const PAGE_SIZE = 12

type PolaroidWallProps = {
    events: Event[]
    onSelectEvent: (event: Event) => void
}

export default function PolaroidWall({ events, onSelectEvent }: PolaroidWallProps): JSX.Element | null {
    const [visible, setVisible] = useState(PAGE_SIZE)
    // One photo per event keeps the wall varied instead of ten shots of the same room
    const withPhotos = events.filter((event) => event.photos && event.photos.length > 0)
    if (withPhotos.length === 0) return null

    return (
        <section>
            <h3 className="mb-1 text-lg font-bold">Photo wall</h3>
            <p className="mb-3 text-sm text-secondary">Proof that we touch grass sometimes.</p>

            {/* Corkboard */}
            <div className="@container rounded-md border-[10px] border-brown bg-brown-dark p-4 shadow-inner">
                <div className="grid grid-cols-2 gap-5 @md:grid-cols-3 @2xl:grid-cols-4">
                    {withPhotos.slice(0, visible).map((event) => (
                        <figure
                            key={event.id}
                            className="relative bg-light-1 p-2 pb-1 shadow-lg transition-transform duration-200 rotate-[var(--tilt)] hover:z-10 hover:rotate-0 hover:scale-105"
                            style={{ '--tilt': `${eventTilt(event, 4)}deg` } as React.CSSProperties}
                        >
                            {/* Push pin */}
                            <span className="absolute -top-1.5 left-1/2 z-10 size-3 -translate-x-1/2 rounded-full bg-red shadow" />
                            <ZoomImage>
                                <img
                                    src={event.photos![0].url}
                                    alt={event.name}
                                    loading="lazy"
                                    className="aspect-square w-full object-cover"
                                />
                            </ZoomImage>
                            <figcaption>
                                <button
                                    onClick={() => onSelectEvent(event)}
                                    className="block w-full px-0.5 pt-1.5 pb-1 text-left text-black hover:underline"
                                >
                                    <span className="block text-[13px] font-semibold leading-tight line-clamp-2">
                                        {event.name}
                                    </span>
                                    <span className="block text-[11px] text-black/60">
                                        {dayjs(event.date).format('MMM YYYY')}
                                        {event.location?.label ? ` · ${event.location.label}` : ''}
                                    </span>
                                </button>
                            </figcaption>
                        </figure>
                    ))}
                </div>
                {visible < withPhotos.length && (
                    <div className="mt-5 flex justify-center">
                        <OSButton variant="secondary" size="md" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                            Pin up more photos ({withPhotos.length - visible} left)
                        </OSButton>
                    </div>
                )}
            </div>
        </section>
    )
}
