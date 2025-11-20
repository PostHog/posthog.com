import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { internalToolsNav } from '../../navs/internalTools'
import OSButton from 'components/OSButton'
import OSTable from 'components/OSTable'
import { IconArrowLeft, IconPencil } from '@posthog/icons'
import { navigate } from 'gatsby'
import { Fieldset } from 'components/OSFieldset'
import dayjs from 'dayjs'

interface PlaceTag {
    id: number
    attributes: {
        label: string
    }
}

interface Place {
    id: number
    name: string
    address: string
    type: 'Hotel' | 'Airbnb' | 'Restaurant' | 'Co-working' | 'Activity'
}

interface PlaceReview {
    id: number
    rating: number
    subcategoryRatings?: {
        ratingCategory: string
        ratingValue: number
    }[]
    notes: string
    events: string
    tags: PlaceTag[]
    place: Place
    createdAt: string
}

interface LocationGroup {
    place: Place
    reviews: PlaceReview[]
    averageRating: number
    totalReviews: number
}

interface PlaceDetailProps {
    location: {
        state?: {
            locationGroup?: LocationGroup
        }
    }
}

export default function PlaceDetail({ location }: PlaceDetailProps): JSX.Element {
    const locationGroup = location.state?.locationGroup

    // If no location data is passed, show placeholder
    if (!locationGroup) {
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
                                onClick={() => navigate('/place-reviews')}
                            >
                                Back to places
                            </OSButton>
                            <div className="text-center py-12">
                                <h2>Location not found</h2>
                                <p className="text-lg opacity-75">
                                    This location doesn't exist or the data couldn't be loaded.
                                </p>
                            </div>
                        </div>
                    </div>
                </ReaderView>
            </>
        )
    }

    const { place, reviews, averageRating, totalReviews } = locationGroup

    const columns = [
        { name: 'Date', align: 'left' as const, width: '120px' },
        { name: 'Rating', align: 'center' as const, width: '100px' },
        { name: 'Subcategory Ratings', align: 'left' as const, width: '180px' },
        { name: 'Notes', align: 'left' as const, width: 'auto' },
        { name: 'Events', align: 'left' as const, width: '200px' },
        { name: 'Tags', align: 'left' as const, width: '200px' },
    ]

    const rows = reviews.map((review) => ({
        key: String(review.id),
        cells: [
            { content: dayjs(review.createdAt).format('MMM D, YYYY') },
            { content: '⭐'.repeat(review.rating) },
            {
                content:
                    review.subcategoryRatings && review.subcategoryRatings.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            {review.subcategoryRatings.map((sr, idx) => (
                                <div key={idx} className="text-xs">
                                    <span className="font-medium">{sr.ratingCategory}:</span>{' '}
                                    {'⭐'.repeat(sr.ratingValue)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        '-'
                    ),
            },
            { content: review.notes || '-' },
            { content: review.events || '-' },
            {
                content:
                    review.tags.length > 0 ? (
                        <div className="flex gap-1 flex-wrap">
                            {review.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="px-2 py-1 rounded-full bg-accent text-xs border border-border"
                                >
                                    {tag.attributes.label}
                                </span>
                            ))}
                        </div>
                    ) : (
                        '-'
                    ),
            },
        ],
    }))

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
                            onClick={() => navigate('/place-reviews')}
                        >
                            Back to locations
                        </OSButton>

                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl font-bold m-0">{place.name}</h1>
                                <p className="text-lg text-secondary mt-2 mb-0">{place.address}</p>
                            </div>
                            <OSButton variant="secondary" size="md" icon={<IconPencil />}>
                                Edit location
                            </OSButton>
                        </div>

                        <div className="grid gap-6">
                            <Fieldset legend="Location Information">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-secondary">Type</label>
                                        <p className="m-0 mt-1">{place.type}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-secondary">Average Rating</label>
                                        <p className="m-0 mt-1 text-2xl">{'⭐'.repeat(Math.round(averageRating))}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-secondary">Total Reviews</label>
                                        <p className="m-0 mt-1 text-2xl">{totalReviews}</p>
                                    </div>
                                </div>
                            </Fieldset>

                            <Fieldset legend="Reviews">
                                {reviews.length > 0 ? (
                                    <OSTable columns={columns} rows={rows} />
                                ) : (
                                    <p className="m-0 text-secondary">No reviews yet</p>
                                )}
                            </Fieldset>
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
