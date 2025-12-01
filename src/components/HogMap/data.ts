// API Functions

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
