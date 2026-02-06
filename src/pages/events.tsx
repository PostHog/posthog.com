import React, { useEffect, useState, useCallback } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import OSButton from 'components/OSButton'
import TeamMember from 'components/TeamMember'
import { ZoomImage } from 'components/ZoomImage'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import EventForm from 'components/EventForm'
import { useUser } from 'hooks/useUser'
import qs from 'qs'
import { IconPencil, IconTrash } from '@posthog/icons'
import { useToast } from '../context/Toast'
import EventsMap, { LAYER_EVENTS_UPCOMING, LAYER_EVENTS_PAST } from 'components/HogMap/EventsMap'
import { useApp } from '../context/App'

export type Event = {
    date: string // YYYY-MM-DD
    name: string
    description?: string
    location: {
        label: string // Location display name
        lat?: number
        lng?: number
        venue?: {
            name: string
        }
    }
    private?: boolean
    format?: string[]
    audience?: string[]
    speakers?: string[]
    speakerTopic?: string
    partners?: Array<{ name: string; url?: string }>
    attendees?: number
    vibeScore?: number
    photos?: { id: number; url: string }[]
    video?: string
    presentation?: string
    link?: string
    startTime?: string // HH:mm format
    id: number
}

const transformStrapiEvent = (strapiEvent: any): Event => {
    const {
        private: isPrivate,
        speakers: speakersData,
        partners: partnersData,
        photos: photosData,
    } = strapiEvent.attributes

    const photos = photosData?.data?.map((photo: any) => ({ id: photo.id, url: photo.attributes?.url }))
    const speakers = speakersData?.data?.map((s: any) =>
        [s.attributes?.firstName, s.attributes?.lastName].filter(Boolean).join(' ')
    )
    const partners = partnersData?.map((p: any) => ({ name: p.name, url: p.url || undefined }))

    return {
        ...strapiEvent.attributes,
        private: isPrivate === true,
        speakers,
        partners,
        photos,
        id: strapiEvent.id,
    }
}

const useEvents = (): { events: Event[]; refreshEvents: () => void; deleteEvent: (eventId: number) => void } => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [events, setEvents] = useState<Event[]>([])
    const fetchEvents = async (page = 1) => {
        try {
            const eventsQuery = qs.stringify(
                {
                    pagination: {
                        page,
                        pageSize: 100,
                    },
                    sort: ['date:desc'],
                    populate: {
                        location: {
                            populate: ['venue'],
                        },
                        photos: true,
                        speakers: true,
                        partners: true,
                    },
                },
                { encodeValuesOnly: true }
            )
            const eventsUrl = `${process.env.GATSBY_SQUEAK_API_HOST}/api/events?${eventsQuery}`
            const response = await fetch(eventsUrl)

            if (!response.ok) {
                throw new Error(`Failed to fetch events: ${response.statusText}`)
            }

            const { data: events, meta } = await response.json()

            if (!events || !Array.isArray(events)) {
                throw new Error('Invalid response format: events data is missing or malformed')
            }

            setEvents((prev) => [...prev, ...events.map(transformStrapiEvent)])

            if (meta?.pagination?.pageCount > meta?.pagination?.page) {
                await fetchEvents(page + 1)
            }
        } catch (error: any) {
            console.error('Error fetching events:', error)
            addToast({
                title: 'Failed to load events',
                description: error?.message || 'An unexpected error occurred while loading events.',
                error: true,
            })
        }
    }

    const deleteEvent = async (eventId: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/events/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${await getJwt()}`,
                    },
                    method: 'DELETE',
                })

                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                addToast({ title: 'Event deleted', description: 'The event was deleted successfully.' })
                refreshEvents()
            } catch (error: any) {
                addToast({
                    title: 'Failed to delete event',
                    description: error?.message || 'An unexpected error occurred while deleting the event.',
                    error: true,
                })
            }
        }
    }

    const refreshEvents = useCallback(() => {
        setEvents([])
        fetchEvents()
    }, [])

    useEffect(() => {
        refreshEvents()
    }, [])

    return { events, refreshEvents, deleteEvent }
}

const EventCard = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateX: '-50%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '-50%' }}
            transition={{ duration: 0.3 }}
            className="absolute left-4 top-4 bottom-4 w-96 rounded bg-primary border border-primary shadow-lg z-10 overflow-hidden flex flex-col"
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1">{children}</ScrollArea>
        </motion.div>
    )
}

function Events() {
    const { websiteMode } = useApp()
    const { isModerator } = useUser()
    const { events: eventsData, refreshEvents, deleteEvent } = useEvents()
    const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('upcoming')
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [creatingEvent, setCreatingEvent] = useState(false)
    const [editingEvent, setEditingEvent] = useState<boolean>(false)
    const [pendingSelectedId, setPendingSelectedId] = useState<number | null>(null)
    const [isInitialized, setIsInitialized] = useState(false)

    // Generate unique event key
    const getEventKey = (event: Event) => {
        const slug = event.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return `${event.date}-${event.id}-${slug}`
    }

    const today = new Date()
    const pastEvents = eventsData
        .filter((event) => new Date(event.date) < today)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const upcomingEvents = eventsData
        .filter((event) => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const displayEvents = activeTab === 'past' ? pastEvents : upcomingEvents

    const handleEventClick = (event: Event, updateHash = true) => {
        setSelectedEvent(event)
        setEditingEvent(false)
        setCreatingEvent(false)

        if (updateHash) {
            window.history.replaceState(null, '', `#eventId=${event.id}`)
        }
    }
    const handleMapEventClick = (eventOrId: number) => {
        const event = eventsData.find((e) => e.id === eventOrId)
        if (event) {
            handleEventClick(event)
        } else {
            // Store for selection once events load/refresh
            setPendingSelectedId(eventOrId)
        }
    }

    const handleCloseEvent = () => {
        setSelectedEvent(null)
        window.history.replaceState(null, '', window.location.pathname)
    }

    // Handle ESC key to close detail panel
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedEvent) {
                handleCloseEvent()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedEvent])

    // Map is handled by EventsMap component now

    useEffect(() => {
        const newSelectedEvent = selectedEvent && eventsData.find((event) => selectedEvent.id === event.id)
        if (newSelectedEvent && newSelectedEvent !== selectedEvent) {
            setSelectedEvent(newSelectedEvent)
        }
    }, [eventsData])

    // If a map click happened before events loaded, select once data is available
    useEffect(() => {
        if (pendingSelectedId != null && eventsData.length > 0) {
            const found = eventsData.find((e) => e.id === pendingSelectedId)
            if (found) {
                handleEventClick(found)
                setPendingSelectedId(null)
            }
        }
    }, [eventsData, pendingSelectedId])

    // Initialize from URL hash on page load
    useEffect(() => {
        if (!isInitialized && eventsData.length > 0) {
            const hash = window.location.hash
            const match = hash.match(/#eventId=(\d+)/)

            if (match) {
                const eventId = parseInt(match[1], 10)
                const event = eventsData.find((e) => e.id === eventId)

                if (event) {
                    // Determine if event is past or upcoming and switch tab
                    const today = new Date()
                    const isUpcoming = new Date(event.date) >= today
                    setActiveTab(isUpcoming ? 'upcoming' : 'past')

                    // Select event without updating hash (since we're reading from it)
                    handleEventClick(event, false)
                }
            }

            setIsInitialized(true)
        }
    }, [eventsData, isInitialized])

    return (
        <>
            <SEO
                title="Cool tech events - PostHog"
                description="Real-life events for people who like tech and people who build things"
                image={`/images/og/default.png`}
            />

            <Explorer
                template="generic"
                slug="events"
                title="Cool tech events"
                fullScreen
                viewportClasses="[&>div>div]:h-full"
            >
                <div
                    data-scheme="primary"
                    className={`flex flex-col @xl:flex-row text-primary h-full ${
                        websiteMode ? 'h-[calc(100vh-48px)]' : ''
                    }`}
                >
                    <aside
                        data-scheme="secondary"
                        className="basis-3/5 @xl:basis-80 bg-primary @xl:border-r border-primary h-full flex flex-col"
                    >
                        <div className="border-b border-primary px-4 pt-4 pb-4">
                            <ToggleGroup
                                title=""
                                hideTitle
                                options={[
                                    { label: `Upcoming (${upcomingEvents.length})`, value: 'upcoming' },
                                    { label: `Past (${pastEvents.length})`, value: 'past' },
                                ]}
                                onValueChange={(value) => setActiveTab(value as 'past' | 'upcoming')}
                                value={activeTab}
                            />
                        </div>

                        <ScrollArea className="flex-1">
                            <div className="p-4 h-96 @xl:h-full">
                                <div className="space-y-3">
                                    {isModerator && (
                                        <OSButton
                                            variant="primary"
                                            width="full"
                                            size="md"
                                            onClick={() => {
                                                setCreatingEvent(true)
                                                setSelectedEvent(null)
                                                setEditingEvent(false)
                                            }}
                                        >
                                            Add event
                                        </OSButton>
                                    )}
                                    {displayEvents.map((event) => (
                                        <OSButton
                                            data-scheme="primary"
                                            key={getEventKey(event)}
                                            onClick={() => handleEventClick(event)}
                                            align="left"
                                            width="full"
                                            zoomHover="md"
                                            className={`bg-primary border border-primary active:bg-primary
                      
                      ${
                          selectedEvent && getEventKey(selectedEvent) === getEventKey(event)
                              ? 'border-primary outline outline-orange outline-2 outline-offset-1'
                              : 'border-primary'
                      }
                    `}
                                        >
                                            <div className="w-full">
                                                {event.photos && event.photos.length > 0 && (
                                                    <div className="float-right ml-2 max-w-20">
                                                        {event.photos[0] && (
                                                            <img
                                                                src={event.photos[0].url}
                                                                alt={`Event photo`}
                                                                className="w-20 max-h-20 object-cover rounded"
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                <div className="text-secondary text-[13px]">
                                                    {new Date(event.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                                <div className="font-semibold text-sm line-clamp-2">{event.name}</div>
                                                <div className="text-[13px] text-secondary">
                                                    <div>{event.location.label}</div>

                                                    {event.vibeScore && (
                                                        <div className="flex items-center gap-1">
                                                            {Array.from({ length: event.vibeScore }).map((_, i) => (
                                                                <span key={i}>🔥</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </OSButton>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                    </aside>

                    <div className="flex-1 relative h-full border-primary border-t @xl:border-t-0">
                        <AnimatePresence>
                            {(editingEvent || creatingEvent) && isModerator ? (
                                <EventCard
                                    onClose={() => {
                                        setCreatingEvent(false)
                                        setEditingEvent(false)
                                        handleCloseEvent()
                                    }}
                                >
                                    <div className="p-4">
                                        <EventForm
                                            event={editingEvent && selectedEvent ? selectedEvent : undefined}
                                            onSuccess={() => {
                                                if (editingEvent) {
                                                    setEditingEvent(false)
                                                } else {
                                                    setCreatingEvent(false)
                                                }
                                                refreshEvents()
                                            }}
                                        />
                                    </div>
                                </EventCard>
                            ) : (
                                selectedEvent && (
                                    <EventCard onClose={handleCloseEvent}>
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold mb-1 pr-12">{selectedEvent.name}</h2>
                                            <div className="mb-2 text-secondary">
                                                {dayjs(selectedEvent.date).format('MMMM D, YYYY')}
                                            </div>

                                            <div className="space-y-3 text-sm mb-4">
                                                {selectedEvent.private && (
                                                    <div
                                                        data-scheme="secondary"
                                                        className="border border-primary bg-primary rounded p-2"
                                                    >
                                                        <div className="text-secondary text-[13px]">
                                                            This event is closed to the public
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.startTime && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">
                                                            Start time
                                                        </div>
                                                        <div>
                                                            {dayjs(
                                                                `${selectedEvent.date} ${selectedEvent.startTime}`
                                                            ).format('h:mm A')}
                                                        </div>
                                                    </div>
                                                )}

                                                <div>
                                                    <div className="text-secondary text-[13px] mb-1">Location</div>
                                                    {selectedEvent.location.venue && (
                                                        <div className="text-primary font-semibold mt-1">
                                                            {selectedEvent.location.venue.name}
                                                        </div>
                                                    )}
                                                    <div>{selectedEvent.location.label}</div>
                                                </div>

                                                {selectedEvent.description && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">
                                                            Description
                                                        </div>
                                                        <div className="text-sm leading-relaxed">
                                                            {selectedEvent.description}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">
                                                            Speaker{selectedEvent.speakers.length > 1 ? 's' : ''}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedEvent.speakers.map((speaker, i) => (
                                                                <TeamMember key={i} name={speaker} photo />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.speakerTopic && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Topic</div>
                                                        <div>{selectedEvent.speakerTopic}</div>
                                                        {selectedEvent.presentation && (
                                                            <a
                                                                href={selectedEvent.presentation}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block mt-1 font-semibold underline"
                                                            >
                                                                View slide deck
                                                            </a>
                                                        )}
                                                    </div>
                                                )}

                                                {selectedEvent.format && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Format</div>
                                                        <div>{selectedEvent.format.join(', ')}</div>
                                                    </div>
                                                )}

                                                {selectedEvent.audience && selectedEvent.audience.length > 0 && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Audience</div>
                                                        <div>{selectedEvent.audience.join(', ')}</div>
                                                    </div>
                                                )}

                                                {selectedEvent.partners && selectedEvent.partners.length > 0 && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Partners</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedEvent.partners.map((partner, i) =>
                                                                partner.url ? (
                                                                    <a
                                                                        key={i}
                                                                        href={partner.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-orange hover:underline"
                                                                    >
                                                                        {partner.name}
                                                                    </a>
                                                                ) : (
                                                                    <span key={i}>{partner.name}</span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.attendees && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Attendees</div>
                                                        <div>{selectedEvent.attendees} people</div>
                                                    </div>
                                                )}

                                                {selectedEvent.vibeScore && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">
                                                            Vibe Score
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {Array.from({ length: selectedEvent.vibeScore }).map(
                                                                (_, i) => (
                                                                    <span key={i} className="text-lg">
                                                                        🔥
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Photos</div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {selectedEvent.photos.map((photo, i) => (
                                                                <ZoomImage key={i}>
                                                                    <img
                                                                        src={photo.url}
                                                                        alt={`Event photo ${i + 1}`}
                                                                        className="w-full h-32 object-cover rounded"
                                                                    />
                                                                </ZoomImage>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.video && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Video</div>
                                                        <a
                                                            href={selectedEvent.video}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-orange hover:underline text-sm"
                                                        >
                                                            Watch video →
                                                        </a>
                                                    </div>
                                                )}

                                                {selectedEvent.link && (
                                                    <div>
                                                        <OSButton
                                                            asLink
                                                            to={selectedEvent.link}
                                                            variant={
                                                                new Date(selectedEvent.date) >=
                                                                new Date(new Date().toISOString().split('T')[0])
                                                                    ? 'primary'
                                                                    : 'secondary'
                                                            }
                                                            width="full"
                                                            size="md"
                                                            external
                                                        >
                                                            View details
                                                        </OSButton>
                                                    </div>
                                                )}
                                                {isModerator && (
                                                    <div className="mt-2 flex justify-end gap-1">
                                                        <OSButton
                                                            size="md"
                                                            tooltip="Edit this event"
                                                            icon={<IconPencil />}
                                                            onClick={() => {
                                                                setEditingEvent(true)
                                                            }}
                                                        />
                                                        <OSButton
                                                            size="md"
                                                            tooltip="Delete this event"
                                                            icon={<IconTrash />}
                                                            onClick={() => {
                                                                deleteEvent(selectedEvent.id)
                                                                handleCloseEvent()
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </EventCard>
                                )
                            )}
                        </AnimatePresence>

                        <EventsMap
                            layers={activeTab === 'upcoming' ? [LAYER_EVENTS_UPCOMING] : [LAYER_EVENTS_PAST]}
                            onEventClick={handleMapEventClick}
                            selectedEventId={selectedEvent?.id || null}
                        />
                    </div>
                </div>
            </Explorer>
        </>
    )
}

export default Events
