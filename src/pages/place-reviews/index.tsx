import React, { useState, useEffect } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import { OSInput } from 'components/OSForm'
import {
    IconPlus,
    IconMapPin,
    IconBuilding,
    IconBed,
    IconBurger,
    IconCoffee,
    IconLaptop,
    IconTelescope,
} from '@posthog/icons'
import { navigate } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import qs from 'qs'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'

interface MapboxFeature {
    place_name: string
    text: string
}

interface PlaceTag {
    id: number
    attributes: {
        label: string
    }
}

export interface Place {
    id: number
    name: string
    address: string
    type: 'Hotel' | 'Airbnb' | 'Restaurant' | 'Co-working' | 'Activity'
}

export interface PlaceReview {
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

interface FormData {
    placeId: number | null
    placeName: string
    placeAddress: string
    placeType: 'Hotel' | 'Airbnb' | 'Restaurant' | 'Coffee' | 'Co-working' | 'Activity'
    rating: number
    subcategoryRatings: {
        ratingCategory: string
        ratingValue: number
    }[]
    wouldGoBack: boolean | null
    notes: string
    events: string
    tags: PlaceTag[]
}

const MapboxAutocomplete = ({
    value,
    onChange,
    placeholder,
}: {
    value: string
    onChange: (value: string, placeName: string) => void
    placeholder: string
}) => {
    const [query, setQuery] = React.useState(value)
    const [suggestions, setSuggestions] = React.useState<MapboxFeature[]>([])
    const [showSuggestions, setShowSuggestions] = React.useState(false)

    React.useEffect(() => {
        setQuery(value)
    }, [value])

    const handleSearch = async (searchText: string) => {
        setQuery(searchText)

        if (searchText.length < 3) {
            setSuggestions([])
            return
        }

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    searchText
                )}.json?access_token=${process.env.MAPBOX_TOKEN}&types=poi,address&limit=5`
            )
            const data = await response.json()
            setSuggestions(data.features || [])
            setShowSuggestions(true)
        } catch (error) {
            console.error('Mapbox geocoding error:', error)
        }
    }

    const handleSelect = (place: MapboxFeature) => {
        onChange(place.place_name, place.text)
        setQuery(place.text)
        setShowSuggestions(false)
        setSuggestions([])
    }

    return (
        <div className="relative">
            <OSInput
                label=""
                direction="column"
                placeholder={placeholder}
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-primary border border-primary rounded shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((place, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelect(place)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-accent border-b border-border last:border-b-0"
                        >
                            <div className="font-medium">{place.text}</div>
                            <div className="text-xs text-secondary">{place.place_name}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

const PlaceFormCard = ({
    formData,
    handleInputChange,
    handleSubmit,
    handleCancelAdd,
    submitting,
}: {
    formData: FormData
    handleInputChange: (field: string, value: unknown) => void
    handleSubmit: (e: React.FormEvent) => void
    handleCancelAdd: () => void
    submitting: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateX: '150%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '150%' }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-4 bottom-4 w-140 rounded bg-primary border border-primary shadow-lg z-10 overflow-hidden flex flex-col"
        >
            <button
                onClick={handleCancelAdd}
                className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1">
                <div className="p-6">
                    <h2 className="text-2xl font-bold m-0 mb-6 sticky bg-primary py-4 top-0 z-10">Add a review</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-xl font-bold m-0">Review a place</h3>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[15px] font-semibold">Search</label>
                            <MapboxAutocomplete
                                value={formData.placeName}
                                onChange={(address, name) => {
                                    handleInputChange('placeName', name)
                                    handleInputChange('placeAddress', address)
                                }}
                                placeholder="Search for place name..."
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[15px] font-semibold">Address</label>
                            <MapboxAutocomplete
                                value={formData.placeAddress}
                                onChange={(address) => {
                                    handleInputChange('placeAddress', address)
                                }}
                                placeholder="Search for address..."
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[15px] font-semibold">Type</label>
                            <div className="flex gap-0 border border-border rounded overflow-hidden">
                                {(
                                    [
                                        { label: 'Hotel', icon: IconBuilding },
                                        { label: 'Airbnb', icon: IconBed },
                                        { label: 'Restaurant', icon: IconBurger },
                                        { label: 'Coffee', icon: IconCoffee },
                                        { label: 'Co-working', icon: IconLaptop },
                                        { label: 'Activity', icon: IconTelescope },
                                    ] as const
                                ).map(({ label, icon: Icon }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => handleInputChange('placeType', label)}
                                        className={`flex-1 px-3 py-2.5 text-sm transition-colors whitespace-nowrap flex flex-col items-center gap-1 ${
                                            formData.placeType === label
                                                ? 'bg-accent font-semibold'
                                                : 'bg-primary hover:bg-accent/50'
                                        }`}
                                    >
                                        <Icon className="size-4" />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[15px] font-semibold">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleInputChange('rating', star)}
                                        className="text-4xl hover:scale-110 transition-transform leading-none"
                                    >
                                        {star <= formData.rating ? '⭐' : '☆'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <label className="text-[15px] font-semibold">Subcategory Ratings (optional)</label>
                            {formData.subcategoryRatings.map((subRating, index) => (
                                <div key={index} className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium">{subRating.ratingCategory}</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => {
                                                    const newRatings = [...formData.subcategoryRatings]
                                                    newRatings[index].ratingValue = star
                                                    handleInputChange('subcategoryRatings', newRatings)
                                                }}
                                                className="text-2xl hover:scale-110 transition-transform leading-none"
                                            >
                                                {star <= subRating.ratingValue ? '⭐' : '☆'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[15px] font-semibold">Would you go back here?</label>
                            <div className="flex gap-0 border border-border rounded overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('wouldGoBack', true)}
                                    className={`flex-1 px-4 py-2.5 text-sm transition-colors ${
                                        formData.wouldGoBack === true
                                            ? 'bg-accent font-semibold'
                                            : 'bg-primary hover:bg-accent/50'
                                    }`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('wouldGoBack', false)}
                                    className={`flex-1 px-4 py-2.5 text-sm transition-colors ${
                                        formData.wouldGoBack === false
                                            ? 'bg-accent font-semibold'
                                            : 'bg-primary hover:bg-accent/50'
                                    }`}
                                >
                                    No
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[15px] font-semibold">Notes</label>
                            <textarea
                                placeholder="What do you like about this place?"
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                rows={4}
                                className="px-4 py-2.5 rounded border border-border bg-primary text-primary resize-none"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[15px] font-semibold">Events that happened here</label>
                            <input
                                type="text"
                                placeholder="Type a historical event..."
                                value={formData.events}
                                onChange={(e) => handleInputChange('events', e.target.value)}
                                className="px-4 py-2.5 rounded border border-border bg-primary text-primary"
                            />
                        </div>

                        <div className="flex gap-2 sticky bottom-0 bg-primary py-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2.5 bg-[#F7A501] hover:bg-[#E09500] text-black font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Saving...' : 'Save location'}
                            </button>
                        </div>
                    </form>
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default function PlaceReviews(): JSX.Element {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [places, setPlaces] = useState<Place[]>([])
    const [reviews, setReviews] = useState<PlaceReview[]>([])
    const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([])
    const [isAddingPlace, setIsAddingPlace] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState<FormData>({
        placeId: null,
        placeName: '',
        placeAddress: '',
        placeType: 'Hotel',
        rating: 0,
        subcategoryRatings: [
            { ratingCategory: 'Wi-fi', ratingValue: 0 },
            { ratingCategory: 'Power outlets', ratingValue: 0 },
            { ratingCategory: 'Vibe', ratingValue: 0 },
        ],
        wouldGoBack: null,
        notes: '',
        events: '',
        tags: [],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwt = await getJwt()
                if (!jwt) {
                    throw new Error('No JWT found')
                }

                // Fetch places
                const placesResponse = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/places`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                const placesData = await placesResponse.json()
                let fetchedPlaces: Place[] = []
                if (placesData?.data) {
                    fetchedPlaces = placesData.data.map(
                        (item: { id: number; attributes: { name: string; address: string; type: Place['type'] } }) => ({
                            id: item.id,
                            name: item.attributes.name,
                            address: item.attributes.address,
                            type: item.attributes.type,
                        })
                    )
                    setPlaces(fetchedPlaces)
                }

                // Fetch place reviews with place relationship populated
                const reviewsQuery = qs.stringify(
                    {
                        populate: ['place', 'tags'],
                        pagination: {
                            pageSize: 1000,
                        },
                    },
                    { encodeValuesOnly: true }
                )
                const reviewsResponse = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/place-reviews?${reviewsQuery}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                )
                const reviewsData = await reviewsResponse.json()
                let fetchedReviews: PlaceReview[] = []
                if (reviewsData?.data) {
                    fetchedReviews = reviewsData.data.map(
                        (item: {
                            id: number
                            attributes: {
                                rating: number
                                subcategoryRatings?: { ratingCategory: string; ratingValue: number }[]
                                notes?: string
                                events?: string
                                tags?: { data: PlaceTag[] }
                                createdAt: string
                                place?: {
                                    data?: {
                                        id: number
                                        attributes: {
                                            name: string
                                            address: string
                                            type: Place['type']
                                        }
                                    }
                                }
                            }
                        }) => ({
                            id: item.id,
                            rating: item.attributes.rating,
                            subcategoryRatings: item.attributes.subcategoryRatings || [],
                            notes: item.attributes.notes || '',
                            events: item.attributes.events || '',
                            tags: item.attributes.tags?.data || [],
                            createdAt: item.attributes.createdAt,
                            place: item.attributes.place?.data
                                ? {
                                      id: item.attributes.place.data.id,
                                      name: item.attributes.place.data.attributes.name,
                                      address: item.attributes.place.data.attributes.address,
                                      type: item.attributes.place.data.attributes.type,
                                  }
                                : { id: 0, name: '', address: '', type: 'Airbnb' as const },
                        })
                    )
                    setReviews(fetchedReviews)

                    // Group reviews by place
                    const grouped = fetchedReviews.reduce((acc: { [key: number]: LocationGroup }, review) => {
                        const placeId = review.place.id
                        if (!acc[placeId]) {
                            acc[placeId] = {
                                place: review.place,
                                reviews: [],
                                averageRating: 0,
                                totalReviews: 0,
                            }
                        }
                        acc[placeId].reviews.push(review)
                        return acc
                    }, {})

                    // Calculate average ratings
                    const groups = Object.values(grouped).map((group) => ({
                        ...group,
                        totalReviews: group.reviews.length,
                        averageRating: group.reviews.reduce((sum, r) => sum + r.rating, 0) / group.reviews.length,
                    }))

                    setLocationGroups(groups)
                }
            } catch (err) {
                console.error('Error fetching data:', err)
                addToast({
                    description: 'Failed to load places',
                })
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleInputChange = (field: string, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const jwt = await getJwt()
            if (!jwt) {
                throw new Error('No JWT found')
            }

            let placeIdToUse = formData.placeId

            // Create new place if needed
            if (!formData.placeId && formData.placeName) {
                const newPlacePayload = {
                    name: formData.placeName,
                    address: formData.placeAddress,
                    type: formData.placeType,
                }

                const placeResponse = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/places`, {
                    method: 'POST',
                    body: JSON.stringify({ data: newPlacePayload }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                })

                if (!placeResponse.ok) {
                    throw new Error(`Failed to create place: ${placeResponse.statusText}`)
                }

                const placeResult = await placeResponse.json()
                placeIdToUse = placeResult.data.id

                // Update places list
                const newPlace: Place = {
                    id: placeResult.data.id,
                    name: placeResult.data.attributes.name,
                    address: placeResult.data.attributes.address,
                    type: placeResult.data.attributes.type,
                }
                setPlaces([...places, newPlace])
            }

            const reviewPayload = {
                place: placeIdToUse,
                rating: formData.rating,
                subcategoryRatings: formData.subcategoryRatings.filter((sr) => sr.ratingValue > 0),
                wouldGoBack: formData.wouldGoBack,
                notes: formData.notes || undefined,
                events: formData.events || undefined,
                tags: formData.tags.map((tag) => tag.id),
            }

            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/place-reviews`, {
                method: 'POST',
                body: JSON.stringify({ data: reviewPayload }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to create place review: ${response.statusText}`)
            }

            const result = await response.json()
            const selectedPlace = places.find((p) => p.id === placeIdToUse)
            const newReview: PlaceReview = {
                id: result.data.id,
                rating: result.data.attributes.rating,
                notes: result.data.attributes.notes || '',
                events: result.data.attributes.events || '',
                tags: result.data.attributes.tags?.data || [],
                createdAt: result.data.attributes.createdAt,
                place: selectedPlace || { id: 0, name: '', address: '', type: 'Airbnb' as const },
            }

            const updatedReviews = [...reviews, newReview]
            setReviews(updatedReviews)

            // Update location groups
            const grouped = updatedReviews.reduce((acc: { [key: number]: LocationGroup }, review) => {
                const placeId = review.place.id
                if (!acc[placeId]) {
                    acc[placeId] = {
                        place: review.place,
                        reviews: [],
                        averageRating: 0,
                        totalReviews: 0,
                    }
                }
                acc[placeId].reviews.push(review)
                return acc
            }, {})

            const groups = Object.values(grouped).map((group) => ({
                ...group,
                totalReviews: group.reviews.length,
                averageRating: group.reviews.reduce((sum, r) => sum + r.rating, 0) / group.reviews.length,
            }))

            setLocationGroups(groups)

            setFormData({
                placeId: null,
                placeName: '',
                placeAddress: '',
                placeType: 'Hotel',
                rating: 0,
                subcategoryRatings: [
                    { ratingCategory: 'Wi-fi', ratingValue: 0 },
                    { ratingCategory: 'Power outlets', ratingValue: 0 },
                    { ratingCategory: 'Vibe', ratingValue: 0 },
                ],
                wouldGoBack: null,
                notes: '',
                events: '',
                tags: [],
            })
            setIsAddingPlace(false)
            addToast({
                description: 'Place review created successfully',
            })
        } catch (error) {
            console.error('Error creating place review:', error)
            addToast({
                description: 'Failed to create place review',
            })
        } finally {
            setSubmitting(false)
        }
    }

    const handleCancelAdd = () => {
        setIsAddingPlace(false)
        setFormData({
            placeId: null,
            placeName: '',
            placeAddress: '',
            placeType: 'Hotel',
            rating: 0,
            subcategoryRatings: [
                { ratingCategory: 'Wi-fi', ratingValue: 0 },
                { ratingCategory: 'Power outlets', ratingValue: 0 },
                { ratingCategory: 'Vibe', ratingValue: 0 },
            ],
            wouldGoBack: null,
            notes: '',
            events: '',
            tags: [],
        })
    }

    const handleRowClick = (placeId: number) => {
        const locationGroup = locationGroups.find((g) => g.place.id === placeId)
        if (locationGroup) {
            navigate(`/place-reviews/${placeId}`, { state: { locationGroup } })
        }
    }

    const columns = [
        { name: 'Name', align: 'left' as const, width: '200px' },
        { name: 'Address', align: 'left' as const, width: '250px' },
        { name: 'Type', align: 'center' as const, width: '120px' },
        { name: 'Avg Rating', align: 'center' as const, width: '100px' },
        { name: 'Reviews', align: 'center' as const, width: '100px' },
    ]

    const rows = locationGroups.map((group) => ({
        key: String(group.place.id),
        cells: [
            {
                content: (
                    <button
                        onClick={() => handleRowClick(group.place.id)}
                        className="text-left font-semibold text-red dark:text-yellow hover:underline"
                    >
                        {group.place.name}
                    </button>
                ),
            },
            { content: group.place.address },
            { content: group.place.type },
            { content: '⭐'.repeat(Math.round(group.averageRating)) },
            { content: String(group.totalReviews) },
        ],
    }))

    return (
        <>
            <SEO title="Place reviews - PostHog" />
            <Explorer template="generic" slug="places" title="Place reviews" fullScreen>
                <div data-scheme="primary" className="flex h-full text-primary relative">
                    <div className="flex-1 p-8 overflow-auto">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-4xl font-bold m-0">Place reviews</h1>
                                <OSButton
                                    variant="primary"
                                    size="md"
                                    icon={<IconPlus />}
                                    onClick={() => setIsAddingPlace(true)}
                                >
                                    Add review
                                </OSButton>
                            </div>

                            {loading ? (
                                <div className="text-center py-12">
                                    <p className="text-lg opacity-75">Loading places...</p>
                                </div>
                            ) : locationGroups.length === 0 ? (
                                <div className="text-center py-12 border border-primary rounded-md bg-accent">
                                    <IconMapPin className="size-12 mx-auto mb-4 text-muted" />
                                    <p className="text-lg opacity-75 mb-4">No reviews added yet</p>
                                    <OSButton
                                        variant="secondary"
                                        size="sm"
                                        icon={<IconPlus />}
                                        onClick={() => setIsAddingPlace(true)}
                                    >
                                        Add your first review
                                    </OSButton>
                                </div>
                            ) : (
                                <OSTable columns={columns} rows={rows} />
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isAddingPlace && (
                            <PlaceFormCard
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                handleCancelAdd={handleCancelAdd}
                                submitting={submitting}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </Explorer>
        </>
    )
}
