import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { internalToolsNav } from '../../navs/internalTools'
import OSButton from 'components/OSButton'
import { IconArrowLeft, IconPencil } from '@posthog/icons'
import { navigate } from 'gatsby'
import { Fieldset } from 'components/OSFieldset'

interface Place {
    id: string
    name: string
    address: string
    type: 'Hotel' | 'Airbnb' | 'Restaurant' | 'Co-working' | 'Activity'
    rating: number
    notes: string
    events: string
}

interface PlaceDetailProps {
    location: {
        state?: {
            place?: Place
        }
    }
}

export default function PlaceDetail({ location }: PlaceDetailProps): JSX.Element {
    const place = location.state?.place

    // If no place data is passed, show placeholder
    // In a real app, you'd fetch the place data from an API using the ID
    if (!place) {
        return (
            <>
                <SEO title="Place Not Found - PostHog" />
                <ReaderView
                    title="Place reviews"
                    leftSidebar={<TreeMenu items={internalToolsNav} />}
                    description="Place details"
                    showQuestions={false}
                >
                    <div className="@container text-primary">
                        <div className="space-y-8">
                            <OSButton
                                variant="secondary"
                                size="sm"
                                icon={<IconArrowLeft />}
                                onClick={() => navigate('/places-reviews')}
                            >
                                Back to places
                            </OSButton>
                            <div className="text-center py-12">
                                <h2>Place not found</h2>
                                <p className="text-lg opacity-75">
                                    This place doesn't exist or the data couldn't be loaded.
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
            <SEO title={`${place.name} - Place reviews - PostHog`} />
            <ReaderView
                title="Place reviews"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                description={`Details for ${place.name}`}
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <div className="space-y-8">
                        <OSButton
                            variant="secondary"
                            size="sm"
                            icon={<IconArrowLeft />}
                            onClick={() => navigate('/places-reviews')}
                        >
                            Back to reviews
                        </OSButton>

                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl font-bold m-0">{place.name}</h1>
                                <p className="text-lg text-secondary mt-2 mb-0">{place.address}</p>
                            </div>
                            <OSButton variant="secondary" size="md" icon={<IconPencil />}>
                                Edit
                            </OSButton>
                        </div>

                        <div className="grid gap-6">
                            <Fieldset legend="Basic Information">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-secondary">Type</label>
                                        <p className="m-0 mt-1">{place.type}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-secondary">Rating</label>
                                        <p className="m-0 mt-1 text-2xl">{'⭐'.repeat(place.rating)}</p>
                                    </div>
                                </div>
                            </Fieldset>

                            {place.notes && (
                                <Fieldset legend="Notes">
                                    <p className="m-0 whitespace-pre-wrap">{place.notes}</p>
                                </Fieldset>
                            )}

                            {place.events && (
                                <Fieldset legend="Events that happened here">
                                    <p className="m-0">{place.events}</p>
                                </Fieldset>
                            )}
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
