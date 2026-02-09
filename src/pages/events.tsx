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
import { IconPencil, IconShare, IconTrash } from '@posthog/icons'
import { useToast } from '../context/Toast'
import EventsMap, { LAYER_EVENTS_UPCOMING, LAYER_EVENTS_PAST } from 'components/HogMap/EventsMap'

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
    const { isModerator } = useUser()
    const { addToast } = useToast()
    const { events: eventsData, refreshEvents, deleteEvent } = useEvents()
    const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('upcoming')
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [creatingEvent, setCreatingEvent] = useState(false)
    const [editingEvent, setEditingEvent] = useState<boolean>(false)
    const [pendingSelectedId, setPendingSelectedId] = useState<number | null>(null)
    const [isInitialized, setIsInitialized] = useState(false)
    const [showMobileMap, setShowMobileMap] = useState(false)

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

    const getShareUrl = (eventId: number) => {
        if (typeof window === 'undefined') return ''
        return `${window.location.origin}/events?eventId=${eventId}`
    }

    const handleShareEvent = async (event: Event) => {
        const shareUrl = getShareUrl(event.id)
        if (!shareUrl) return
        if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
            try {
                await navigator.share({
                    title: event.name,
                    text: event.description || event.location.label,
                    url: shareUrl,
                })
                return
            } catch {
                // User cancelled or share failed; fall back below if possible
            }
        }
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(shareUrl)
                addToast({
                    title: 'Link copied',
                    description: 'Event link copied to clipboard.',
                })
            } catch {
                addToast({
                    title: 'Share failed',
                    description: 'Unable to copy the event link.',
                    error: true,
                })
            }
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

    // Initialize from URL hash on page load, or select nearest upcoming event
    useEffect(() => {
        if (!isInitialized && eventsData.length > 0) {
            const params = new URLSearchParams(window.location.search)
            const queryEventId = params.get('eventId')
            const hash = window.location.hash
            const match = hash.match(/#eventId=(\d+)/)
            const matchedId = queryEventId ? parseInt(queryEventId, 10) : match ? parseInt(match[1], 10) : null

            if (matchedId) {
                const event = eventsData.find((e) => e.id === matchedId)

                if (event) {
                    // Determine if event is past or upcoming and switch tab
                    const today = new Date()
                    const isUpcoming = new Date(event.date) >= today
                    setActiveTab(isUpcoming ? 'upcoming' : 'past')

                    // Select event without updating hash (since we're reading from it)
                    handleEventClick(event, false)
                }
            } else if (upcomingEvents.length > 0) {
                // Auto-select the nearest upcoming event (first in the sorted list)
                handleEventClick(upcomingEvents[0], false)
            }

            setIsInitialized(true)
        }
    }, [eventsData, isInitialized, upcomingEvents])

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
                <div data-scheme="primary" className="flex flex-col @xl:flex-row text-primary h-full">
                    {/* Mobile horizontal ribbon - visible only on small screens */}
                    <div className="@xl:hidden flex flex-col h-full">
                        <div className="border-b border-primary px-3 pt-3 pb-3 flex items-center gap-2">
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
                            <div className="flex-1" />
                            <OSButton
                                size="lg"
                                variant={showMobileMap ? 'primary' : 'secondary'}
                                onClick={() => {
                                    setShowMobileMap(!showMobileMap)
                                    if (!showMobileMap) {
                                        setSelectedEvent(null)
                                    }
                                }}
                            >
                                📍 Map
                            </OSButton>
                            {isModerator && (
                                <OSButton
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {
                                        setCreatingEvent(true)
                                        setSelectedEvent(null)
                                        setEditingEvent(false)
                                        setShowMobileMap(false)
                                    }}
                                >
                                    + Add
                                </OSButton>
                            )}
                        </div>

                        {/* Horizontal scrolling ribbon - sized to show ~2.5 events */}
                        {!showMobileMap && (
                            <div className="border-b border-primary overflow-x-auto">
                                <div className="flex gap-3 p-3 min-w-max">
                                    {displayEvents.map((event) => (
                                        <button
                                            key={getEventKey(event)}
                                            onClick={() => handleEventClick(event)}
                                            className={`flex items-center gap-3 p-2 rounded-md border bg-primary shrink-0 text-left transition-all hover:border-orange/50 w-[200px] overflow-hidden ${
                                                selectedEvent && getEventKey(selectedEvent) === getEventKey(event)
                                                    ? 'border-orange ring-2 ring-orange/30'
                                                    : 'border-primary'
                                            }`}
                                        >
                                            {event.photos && event.photos.length > 0 && event.photos[0] ? (
                                                <img
                                                    src={event.photos[0].url}
                                                    alt=""
                                                    className="w-20 h-20 object-cover rounded shrink-0"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 bg-accent rounded shrink-0 flex items-center justify-center text-secondary text-2xl">
                                                    📍
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1 overflow-hidden">
                                                <div className="text-xs text-secondary whitespace-nowrap font-medium truncate">
                                                    {new Date(event.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </div>
                                                <div className="text-sm font-semibold text-primary line-clamp-2 mt-0.5">
                                                    {event.location.label.split(',')[0]}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mobile content area - keeps map mounted so it can animate in the background */}
                        <div className="flex-1 relative overflow-hidden">
                            <div
                                className={`absolute inset-0 transition-opacity duration-300 ${
                                    showMobileMap || (!selectedEvent && !(editingEvent || creatingEvent))
                                        ? 'opacity-100'
                                        : 'opacity-0 pointer-events-none'
                                }`}
                                aria-hidden={!(showMobileMap || (!selectedEvent && !(editingEvent || creatingEvent)))}
                            >
                                <EventsMap
                                    layers={activeTab === 'upcoming' ? [LAYER_EVENTS_UPCOMING] : [LAYER_EVENTS_PAST]}
                                    onEventClick={(eventId) => {
                                        handleMapEventClick(eventId)
                                        setShowMobileMap(false)
                                    }}
                                    selectedEventId={selectedEvent?.id || null}
                                />
                            </div>

                            {(editingEvent || creatingEvent) && isModerator ? (
                                <div className="absolute inset-0 h-full overflow-auto p-4 bg-primary">
                                    <div className="flex justify-end mb-2">
                                        <button
                                            onClick={() => {
                                                setCreatingEvent(false)
                                                setEditingEvent(false)
                                                handleCloseEvent()
                                            }}
                                            className="w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary text-xl"
                                        >
                                            ✕
                                        </button>
                                    </div>
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
                            ) : selectedEvent ? (
                                <ScrollArea className="absolute inset-0 h-full bg-primary">
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h2 className="text-lg font-bold mb-1">{selectedEvent.name}</h2>
                                                <div className="text-sm text-secondary">
                                                    {dayjs(selectedEvent.date).format('MMMM D, YYYY')}
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleCloseEvent}
                                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary text-xl shrink-0"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <div className="space-y-3 text-sm">
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
                                                    <div className="text-secondary text-[13px] mb-1">Start time</div>
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
                                                    <div className="text-secondary text-[13px] mb-1">Description</div>
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
                                                    <div className="text-secondary text-[13px] mb-1">Vibe Score</div>
                                                    <div className="flex gap-1">
                                                        {Array.from({ length: selectedEvent.vibeScore }).map((_, i) => (
                                                            <span key={i} className="text-lg">
                                                                🔥
                                                            </span>
                                                        ))}
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
                                                <div className="flex gap-2">
                                                    <div className="flex-[3]">
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
                                                    <div className="flex-1">
                                                        <OSButton
                                                            onClick={() => handleShareEvent(selectedEvent)}
                                                            variant="secondary"
                                                            width="full"
                                                            size="md"
                                                            icon={<IconShare />}
                                                            tooltip="Share this event"
                                                        >
                                                            Share
                                                        </OSButton>
                                                    </div>
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
                                </ScrollArea>
                            ) : null}
                        </div>
                    </div>

                    {/* Desktop sidebar - hidden on small screens */}
                    <aside
                        data-scheme="secondary"
                        className="hidden @xl:flex basis-80 bg-primary border-r border-primary h-full flex-col"
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
                            <div className="p-4 h-full">
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

                    {/* Desktop main content area - hidden on small screens */}
                    <div className="hidden @xl:block flex-1 relative h-full border-primary">
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
                                                    <div className="flex gap-2">
                                                        <div className="flex-[3]">
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
                                                        <div className="flex-1">
                                                            <OSButton
                                                                onClick={() => handleShareEvent(selectedEvent)}
                                                                variant="secondary"
                                                                width="full"
                                                                size="md"
                                                                icon={<IconShare />}
                                                                tooltip="Share this event"
                                                            >
                                                                Share
                                                            </OSButton>
                                                        </div>
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
