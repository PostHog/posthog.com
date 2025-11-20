import qs from 'qs'

// API Functions

// Fetch all events (offsites)
export const getEvents = async (jwt: string): Promise<Record<string, unknown>[]> => {
    const offsitesQuery = qs.stringify(
        {
            pagination: {
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

    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/events?${offsitesQuery}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`)
    }

    const data = await response.json()
    if (!data?.data) {
        return []
    }

    return data.data.map((item: { id: number; attributes: Record<string, unknown> }) => {
        const {
            private: isPrivate,
            speakers: speakersData,
            partners: partnersData,
            photos: photosData,
        } = item.attributes

        const photos =
            (photosData as { data?: Array<{ id: number; attributes: { url: string } }> })?.data?.map((photo) => ({
                id: photo.id,
                url: photo.attributes?.url,
            })) || []
        const speakers =
            (
                speakersData as {
                    data?: Array<{ attributes: { firstName: string; lastName: string } }>
                }
            )?.data?.map((s) => `${s.attributes?.firstName} ${s.attributes?.lastName}`) || []
        const partners =
            (partnersData as Array<{ name: string; url?: string }> | undefined)?.map((p) => ({
                name: p.name,
                url: p.url || undefined,
            })) || []

        return {
            id: item.id,
            ...item.attributes,
            private: isPrivate === true,
            speakers,
            partners,
            photos,
        }
    })
}

// Create a new event (offsite)
export const addEvent = async (jwt: string, payload: Record<string, unknown>): Promise<Record<string, unknown>> => {
    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/events`, {
        method: 'POST',
        body: JSON.stringify({ data: payload }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to create event: ${response.statusText}`)
    }

    return response.json()
}

// Fetch all places
export const getPlaces = async (jwt: string): Promise<Record<string, unknown>[]> => {
    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/places`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })

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
            attributes: { name: string; address: string; type: string; lat: number; long: number }
        }) => ({
            id: item.id,
            name: item.attributes.name,
            address: item.attributes.address,
            type: item.attributes.type,
            lat: item.attributes.lat,
            long: item.attributes.long,
        })
    )
}

// Create a new place
export const addPlace = async (
    jwt: string,
    payload: { name: string; address: string; type: string }
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

// Fetch all place reviews
export const getPlaceReviews = async (jwt: string): Promise<Record<string, unknown>[]> => {
    const reviewsQuery = qs.stringify(
        {
            populate: ['place', 'tags'],
            pagination: {
                pageSize: 1000,
            },
        },
        { encodeValuesOnly: true }
    )

    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/place-reviews?${reviewsQuery}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })

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
            review: item.attributes.review || '',
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
