import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { internalToolsNav } from '../../navs/internalTools'
import OSButton from 'components/OSButton'
import { IconArrowLeft, IconPencil } from '@posthog/icons'
import { navigate } from 'gatsby'
import { Fieldset } from 'components/OSFieldset'
import { useUser } from 'hooks/useUser'
import qs from 'qs'
import dayjs from 'dayjs'
import TeamMember from 'components/TeamMember'
import { ZoomImage } from 'components/ZoomImage'
import { Event } from 'pages/events'

interface EventDetailProps {
    params: {
        id: string
    }
}

export default function EventDetail({ params }: EventDetailProps): JSX.Element {
    const { getJwt } = useUser()
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const jwt = await getJwt()
                if (!jwt) {
                    throw new Error('No JWT found')
                }

                const eventQuery = qs.stringify(
                    {
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

                const response = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/events/${params.id}?${eventQuery}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                )

                if (!response.ok) {
                    throw new Error(`Failed to fetch event: ${response.statusText}`)
                }

                const result = await response.json()
                if (result?.data) {
                    const strapiEvent = result.data
                    const {
                        private: isPrivate,
                        speakers: speakersData,
                        partners: partnersData,
                        photos: photosData,
                    } = strapiEvent.attributes

                    const photos = photosData?.data?.map((photo: any) => ({
                        id: photo.id,
                        url: photo.attributes?.url,
                    }))
                    const speakers = speakersData?.data?.map((s: any) =>
                        [s.attributes?.firstName, s.attributes?.lastName].filter(Boolean).join(' ')
                    )
                    const partners = partnersData?.map((p: any) => ({ name: p.name, url: p.url || undefined }))

                    setEvent({
                        id: strapiEvent.id,
                        ...strapiEvent.attributes,
                        private: isPrivate === true,
                        speakers,
                        partners,
                        photos,
                    })
                }
            } catch (err) {
                console.error('Error fetching event:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [params.id, getJwt])

    if (loading) {
        return (
            <>
                <SEO title="Loading... - Events - PostHog" />
                <ReaderView
                    title="Cool tech events"
                    leftSidebar={<TreeMenu items={internalToolsNav} />}
                    description="Event details"
                    showQuestions={false}
                >
                    <div className="@container text-primary">
                        <div className="space-y-8">
                            <OSButton
                                variant="secondary"
                                size="sm"
                                icon={<IconArrowLeft />}
                                onClick={() => navigate('/events')}
                            >
                                Back to events
                            </OSButton>
                            <div className="text-center py-12">
                                <p className="text-lg opacity-75">Loading event...</p>
                            </div>
                        </div>
                    </div>
                </ReaderView>
            </>
        )
    }

    if (error || !event) {
        return (
            <>
                <SEO title="Event Not Found - PostHog" />
                <ReaderView
                    title="Cool tech events"
                    leftSidebar={<TreeMenu items={internalToolsNav} />}
                    description="Event details"
                    showQuestions={false}
                >
                    <div className="@container text-primary">
                        <div className="space-y-8">
                            <OSButton
                                variant="secondary"
                                size="sm"
                                icon={<IconArrowLeft />}
                                onClick={() => navigate('/events')}
                            >
                                Back to events
                            </OSButton>
                            <div className="text-center py-12">
                                <h2>Event not found</h2>
                                <p className="text-lg opacity-75">
                                    This event doesn't exist or the data couldn't be loaded.
                                </p>
                            </div>
                        </div>
                    </div>
                </ReaderView>
            </>
        )
    }

    return (
        <>
            <SEO title={`${event.name} - Events - PostHog`} />
            <ReaderView
                title="Cool tech events"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                description={`Details for ${event.name}`}
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <div className="space-y-8">
                        <OSButton
                            variant="secondary"
                            size="sm"
                            icon={<IconArrowLeft />}
                            onClick={() => navigate('/events')}
                        >
                            Back to events
                        </OSButton>

                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl font-bold m-0">{event.name}</h1>
                                <p className="text-lg text-secondary mt-2 mb-0">
                                    {dayjs(event.date).format('MMMM D, YYYY')}
                                </p>
                            </div>
                            <OSButton variant="secondary" size="md" icon={<IconPencil />}>
                                Edit
                            </OSButton>
                        </div>

                        <div className="grid gap-6">
                            <Fieldset legend="Basic Information">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {event.private && (
                                        <div className="col-span-2 border border-primary bg-primary rounded p-2">
                                            <div className="text-secondary text-[13px]">
                                                This event is closed to the public
                                            </div>
                                        </div>
                                    )}
                                    {event.location && (
                                        <div>
                                            <label className="text-sm font-semibold text-secondary">Location</label>
                                            {event.location.label && (
                                                <p className="m-0 mt-1 font-semibold">{event.location.label}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Fieldset>

                            {event.description && (
                                <Fieldset legend="Description">
                                    <p className="m-0 whitespace-pre-wrap">{event.description}</p>
                                </Fieldset>
                            )}

                            {event.speakers && event.speakers.length > 0 && (
                                <Fieldset legend={`Speaker${event.speakers.length > 1 ? 's' : ''}`}>
                                    <div className="flex flex-wrap gap-2">
                                        {event.speakers.map((speaker, i) => (
                                            <TeamMember key={i} name={speaker} photo />
                                        ))}
                                    </div>
                                </Fieldset>
                            )}

                            {event.speakerTopic && (
                                <Fieldset legend="Topic">
                                    <p className="m-0">{event.speakerTopic}</p>
                                    {event.presentation && (
                                        <a
                                            href={event.presentation}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block mt-2 font-semibold underline"
                                        >
                                            View slide deck
                                        </a>
                                    )}
                                </Fieldset>
                            )}

                            {event.format && event.format.length > 0 && (
                                <Fieldset legend="Format">
                                    <p className="m-0">{event.format.join(', ')}</p>
                                </Fieldset>
                            )}

                            {event.audience && event.audience.length > 0 && (
                                <Fieldset legend="Audience">
                                    <p className="m-0">{event.audience.join(', ')}</p>
                                </Fieldset>
                            )}

                            {event.partners && event.partners.length > 0 && (
                                <Fieldset legend="Partners">
                                    <div className="flex flex-wrap gap-2">
                                        {event.partners.map((partner, i) =>
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
                                </Fieldset>
                            )}

                            {event.attendees && (
                                <Fieldset legend="Attendees">
                                    <p className="m-0">{event.attendees} people</p>
                                </Fieldset>
                            )}

                            {event.vibeScore && (
                                <Fieldset legend="Vibe Score">
                                    <div className="flex gap-1">
                                        {Array.from({ length: event.vibeScore }).map((_, i) => (
                                            <span key={i} className="text-lg">
                                                🔥
                                            </span>
                                        ))}
                                    </div>
                                </Fieldset>
                            )}

                            {event.photos && event.photos.length > 0 && (
                                <Fieldset legend="Photos">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {event.photos.map((photo, i) => (
                                            <ZoomImage key={i}>
                                                <img
                                                    src={photo.url}
                                                    alt={`Event photo ${i + 1}`}
                                                    className="w-full h-48 object-cover rounded"
                                                />
                                            </ZoomImage>
                                        ))}
                                    </div>
                                </Fieldset>
                            )}

                            {event.video && (
                                <Fieldset legend="Video">
                                    <a
                                        href={event.video}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange hover:underline text-sm"
                                    >
                                        Watch video →
                                    </a>
                                </Fieldset>
                            )}

                            {event.link && (
                                <div>
                                    <OSButton asLink to={event.link} variant="primary" size="md">
                                        View event details
                                    </OSButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
