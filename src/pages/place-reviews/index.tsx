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
    IconUpload,
} from '@posthog/icons'
import { navigate } from 'gatsby'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'
import { useDropzone } from 'react-dropzone'
import { fetchPlaces, createPlace, fetchPlaceReviews, createPlaceReview } from 'components/HogMap/data'

interface MapboxFeature {
    place_name: string
    text: string
}

export interface Place {
    id: number
    name: string
    address: string
    type: 'Coffee' | 'Hotel' | 'Airbnb' | 'Restaurant' | 'Co-working' | 'Activity'
}

export interface PlaceReview {
    id: number
    rating: number
    subcategoryRatings?: {
        ratingCategory: string
        ratingValue: number
    }[]
    review: string
    place: Place
    photos?: { id: number; url: string }[]
    createdAt: string
}

interface LocationGroup {
    place: Place
    reviews: PlaceReview[]
    averageRating: number
    totalReviews: number
}

interface FormData {
    place: Place | null
    placeName: string
    placeAddress: string
    placeType: 'Coffee' | 'Hotel' | 'Airbnb' | 'Restaurant' | 'Co-working' | 'Activity'
    rating: number
    subcategoryRatings: {
        ratingCategory: string
        ratingValue: number
    }[]
    wouldGoBack: boolean | null
    review: string
    photos?: { id: number; url: string }[]
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
    places,
}: {
    formData: FormData
    handleInputChange: (field: string, value: unknown) => void
    handleSubmit: (e: React.FormEvent) => void
    handleCancelAdd: () => void
    submitting: boolean
    places: Place[]
}) => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [uploadedPhotos, setUploadedPhotos] = React.useState<Array<{ file: File; id?: number; url?: string }>>([])
    const [uploadingPhotos, setUploadingPhotos] = React.useState(false)

    // Helper to find matching place by name and address
    const findMatchingPlace = (name: string, address: string): Place | null => {
        return (
            places.find(
                (p) => p.name.toLowerCase() === name.toLowerCase() && p.address.toLowerCase() === address.toLowerCase()
            ) || null
        )
    }

    const onPhotoDrop = async (acceptedFiles: File[]) => {
        setUploadingPhotos(true)
        try {
            const jwt = await getJwt()
            if (!jwt) {
                throw new Error('No JWT found')
            }

            // Upload each photo to Strapi/Cloudinary
            const uploadPromises = acceptedFiles.map(async (file) => {
                const uploadFormData = new FormData()
                uploadFormData.append('files', file)

                const uploadedImage = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/upload`, {
                    method: 'POST',
                    body: uploadFormData,
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }).then((res) => res.json())

                if (uploadedImage?.length > 0) {
                    return {
                        file,
                        id: uploadedImage[0].id,
                        url: uploadedImage[0].url,
                    }
                }
                return { file }
            })

            const uploadedImages = await Promise.all(uploadPromises)
            setUploadedPhotos((prev) => [...prev, ...uploadedImages])

            // Update formData with photo IDs
            const newPhotos = uploadedImages
                .filter((img): img is { file: File; id: number; url?: string } => img.id !== undefined)
                .map((img) => ({ id: img.id, url: img.url || '' }))
            handleInputChange('photos', [...(formData.photos || []), ...newPhotos])

            addToast({
                description: `${acceptedFiles.length} photo${acceptedFiles.length > 1 ? 's' : ''} uploaded`,
            })
        } catch (error) {
            console.error('Error uploading photos:', error)
            addToast({
                description: 'Failed to upload photos',
            })
        } finally {
            setUploadingPhotos(false)
        }
    }

    const removePhoto = (index: number) => {
        setUploadedPhotos((prev) => {
            const updated = prev.filter((_, i) => i !== index)
            // Update formData to remove the photo ID
            const photoIds = updated
                .filter((img): img is { file: File; id: number; url?: string } => img.id !== undefined)
                .map((img) => ({ id: img.id, url: img.url || '' }))
            handleInputChange('photos', photoIds)
            return updated
        })
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onPhotoDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
        },
        multiple: true,
    })
    return (
        <div className="w-[500px] h-full bg-primary border-l border-primary flex flex-col">
            <button
                onClick={handleCancelAdd}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
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
                                    // Check if this place already exists
                                    const existingPlace = findMatchingPlace(name, address)
                                    if (existingPlace) {
                                        handleInputChange('place', existingPlace)
                                        handleInputChange('placeType', existingPlace.type)
                                    } else {
                                        handleInputChange('place', null)
                                    }
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
                                    if (formData.placeName) {
                                        const existingPlace = findMatchingPlace(formData.placeName, address)
                                        if (existingPlace) {
                                            handleInputChange('place', existingPlace)
                                            handleInputChange('placeType', existingPlace.type)
                                        } else {
                                            handleInputChange('place', null)
                                        }
                                    }
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
                            <label className="text-[15px] font-semibold">Review</label>
                            <textarea
                                placeholder="What do you like about this place?"
                                value={formData.review}
                                onChange={(e) => handleInputChange('review', e.target.value)}
                                rows={4}
                                className="px-4 py-2.5 rounded border border-border bg-primary text-primary resize-none"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[15px] font-semibold">Photos (optional)</label>
                            <div
                                {...getRootProps()}
                                className={`w-full px-6 py-8 border-2 border-dashed rounded transition-colors cursor-pointer ${
                                    isDragActive
                                        ? 'border-primary bg-accent'
                                        : 'border-border bg-accent/50 hover:bg-accent'
                                }`}
                            >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center justify-center text-center">
                                    {uploadingPhotos ? (
                                        <div className="animate-spin size-6 mb-2">
                                            <IconUpload className="size-6" />
                                        </div>
                                    ) : (
                                        <IconUpload className="size-6 mb-2 opacity-50" />
                                    )}
                                    <p className="text-sm text-secondary m-0">
                                        {uploadingPhotos
                                            ? 'Uploading photos...'
                                            : isDragActive
                                            ? 'Drop photos here'
                                            : 'Click or drag photos here'}
                                    </p>
                                    <p className="text-xs text-secondary mt-1 m-0">PNG, JPG, WEBP, GIF</p>
                                </div>
                            </div>
                            {uploadedPhotos.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {uploadedPhotos.map((photo, index) => (
                                        <div
                                            key={index}
                                            className="relative group border border-border rounded overflow-hidden"
                                        >
                                            <img
                                                src={photo.url || URL.createObjectURL(photo.file)}
                                                alt={photo.file.name}
                                                className="size-20 object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                className="absolute top-1 right-1 size-5 bg-red text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                            >
                                                ✕
                                            </button>
                                            {!photo.id && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
                                                    Uploading...
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
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
        </div>
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
        place: null,
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
        review: '',
        photos: [],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwt = await getJwt()
                if (!jwt) {
                    throw new Error('No JWT found')
                }

                // Fetch places
                const fetchedPlaces = await fetchPlaces(jwt)
                setPlaces(fetchedPlaces as unknown as Place[])

                // Fetch place reviews
                const fetchedReviews = await fetchPlaceReviews(jwt)
                setReviews(fetchedReviews as unknown as PlaceReview[])

                // Group reviews by place
                const grouped = (fetchedReviews as unknown as PlaceReview[]).reduce(
                    (acc: { [key: number]: LocationGroup }, review) => {
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
                    },
                    {}
                )

                // Calculate average ratings
                const groups = Object.values(grouped).map((group) => ({
                    ...group,
                    totalReviews: group.reviews.length,
                    averageRating: group.reviews.reduce((sum, r) => sum + r.rating, 0) / group.reviews.length,
                }))

                setLocationGroups(groups)
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

            let placeIdToUse = formData.place?.id

            // Create new place if needed (place is null and we have name/address)
            if (!formData.place && formData.placeName && formData.placeAddress) {
                const newPlacePayload = {
                    name: formData.placeName,
                    address: formData.placeAddress,
                    type: formData.placeType,
                }

                const placeResult = await createPlace(jwt, newPlacePayload)
                const placeData = placeResult as {
                    data: { id: number; attributes: { name: string; address: string; type: Place['type'] } }
                }
                placeIdToUse = placeData.data.id

                // Update places list
                const newPlace: Place = {
                    id: placeData.data.id,
                    name: placeData.data.attributes.name,
                    address: placeData.data.attributes.address,
                    type: placeData.data.attributes.type,
                }
                setPlaces([...places, newPlace])
                // Update formData with the new place
                setFormData((prev) => ({ ...prev, place: newPlace }))
            }

            const reviewPayload = {
                place: placeIdToUse,
                rating: formData.rating,
                subcategoryRatings: formData.subcategoryRatings.filter((sr) => sr.ratingValue > 0),
                review: formData.review || undefined,
                photos: formData.photos?.map((photo) => photo.id) || undefined,
            }

            const result = await createPlaceReview(jwt, reviewPayload)
            const resultData = result as {
                data: { id: number; attributes: { rating: number; review?: string; createdAt: string } }
            }
            const selectedPlace = formData.place || places.find((p) => p.id === placeIdToUse)
            const newReview: PlaceReview = {
                id: resultData.data.id,
                rating: resultData.data.attributes.rating,
                review: resultData.data.attributes.review || '',
                createdAt: resultData.data.attributes.createdAt,
                place: selectedPlace || { id: 0, name: '', address: '', type: 'Hotel' as const },
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
                place: null,
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
                review: '',
                photos: [],
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
            place: null,
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
            review: '',
            photos: [],
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

                    {isAddingPlace && (
                        <PlaceFormCard
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            handleCancelAdd={handleCancelAdd}
                            submitting={submitting}
                            places={places}
                        />
                    )}
                </div>
            </Explorer>
        </>
    )
}
