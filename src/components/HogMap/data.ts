import qs from 'qs'

// Fetch all places (public endpoint, no JWT required)
export const getPlaces = async (): Promise<Record<string, unknown>[]> => {
    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/places`)

    if (!response.ok) {
        throw new Error(`Failed to fetch places: ${response.statusText}`)
    }

    const data = await response.json()
    if (!data?.data) {
        return []
    }

    return data.data.map(
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
}

// Create a new place
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

// Fetch all place reviews (public endpoint, no JWT required)
export const getPlaceReviews = async (): Promise<Record<string, unknown>[]> => {
    const reviewsQuery = qs.stringify(
        {
            populate: ['place', 'tags'],
            pagination: {
                pageSize: 1000,
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
        return []
    }

    return data.data.map(
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
}

// Create a new place review
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
