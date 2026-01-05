import qs from 'qs'

// Fetch all places (public endpoint, no JWT required)
export const getPlaces = async (): Promise<Record<string, unknown>[]> => {
    const allPlaces: Array<{
        id: number
        name: string
        address: string
        type: string
        latitude: number
        longitude: number
    }> = []

    let page = 1
    let hasMore = true
    const pageSize = 100 // Strapi's max limit

    while (hasMore) {
        const placesQuery = qs.stringify(
            {
                pagination: {
                    page,
                    pageSize,
                },
            },
            { encodeValuesOnly: true }
        )

        const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/places?${placesQuery}`)

        if (!response.ok) {
            throw new Error(`Failed to fetch places: ${response.statusText}`)
        }

        const data = await response.json()

        if (!data?.data) {
            break
        }

        const places = data.data.map(
            (item: {
                id: number
                attributes: { name: string; address: string; type: string; latitude: number; longitude: number }
            }) => ({
                id: item.id,
                name: item.attributes.name,
                address: item.attributes.address,
                type: item.attributes.type,
                latitude: item.attributes.latitude,
                longitude: item.attributes.longitude,
            })
        )

        allPlaces.push(...places)

        // Check if there are more pages
        const pagination = data.meta?.pagination
        if (pagination && pagination.page < pagination.pageCount) {
            page++
        } else {
            hasMore = false
        }
    }

    return allPlaces
}

// Create a new place (requires authentication)
export const addPlace = async (
    jwt: string,
    payload: { name: string; address: string; type: string; latitude: number; longitude: number }
): Promise<Record<string, unknown>> => {
    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/places`, {
        method: 'POST',
        body: JSON.stringify({ data: payload }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to create place: ${response.statusText}`)
    }

    return response.json()
}

// Delete a place (moderators only)
export const deletePlace = async (jwt: string, placeId: number): Promise<void> => {
    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/places/${placeId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to delete place: ${response.statusText}`)
    }
}

// Fetch all place reviews (public endpoint, no JWT required)
export const getPlaceReviews = async (): Promise<Record<string, unknown>[]> => {
    const allReviews: Array<{
        id: number
        rating: number
        subcategoryRatings: { ratingCategory: string; ratingValue: number }[]
        notes: string
        events: string
        tags: any[]
        createdAt: string
        wouldGoBack?: boolean
        place: {
            id: number
            name: string
            address: string
            type: string
            latitude: null
            longitude: null
        }
    }> = []

    let page = 1
    let hasMore = true
    const pageSize = 100 // Strapi's max limit

    while (hasMore) {
        const reviewsQuery = qs.stringify(
            {
                populate: ['place', 'tags'],
                pagination: {
                    page,
                    pageSize,
                },
            },
            { encodeValuesOnly: true }
        )

        const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/place-reviews?${reviewsQuery}`)

        if (!response.ok) {
            throw new Error(`Failed to fetch place reviews: ${response.statusText}`)
        }

        const data = await response.json()

        if (!data?.data) {
            break
        }

        const reviews = data.data.map(
            (item: {
                id: number
                attributes: {
                    rating: number
                    subcategoryRatings?: { ratingCategory: string; ratingValue: number }[]
                    review?: string
                    wouldGoBack?: boolean
                    createdAt: string
                    place?: {
                        data?: {
                            id: number
                            attributes: {
                                name: string
                                address: string
                                type: string
                            }
                        }
                    }
                }
            }) => ({
                id: item.id,
                rating: item.attributes.rating,
                subcategoryRatings: item.attributes.subcategoryRatings || [],
                notes: item.attributes.review || '',
                events: '',
                tags: [],
                createdAt: item.attributes.createdAt,
                wouldGoBack: item.attributes.wouldGoBack,
                place: item.attributes.place?.data
                    ? {
                          id: item.attributes.place.data.id,
                          name: item.attributes.place.data.attributes.name,
                          address: item.attributes.place.data.attributes.address,
                          type: item.attributes.place.data.attributes.type,
                          latitude: null,
                          longitude: null,
                      }
                    : { id: 0, name: '', address: '', type: 'Airbnb' as const, latitude: null, longitude: null },
            })
        )

        allReviews.push(...reviews)

        // Check if there are more pages
        const pagination = data.meta?.pagination
        if (pagination && pagination.page < pagination.pageCount) {
            page++
        } else {
            hasMore = false
        }
    }

    return allReviews
}

// Create a new place review (requires authentication)
export const addPlaceReview = async (
    jwt: string,
    payload: Record<string, unknown>
): Promise<Record<string, unknown>> => {
    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/place-reviews`, {
        method: 'POST',
        body: JSON.stringify({ data: payload }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to create place review: ${response.statusText}`)
    }

    return response.json()
}

// Delete a place review (moderators only)
export const deletePlaceReview = async (jwt: string, reviewId: number): Promise<void> => {
    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/place-reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to delete place review: ${response.statusText}`)
    }
}
