const MapboxClient = require('@mapbox/mapbox-sdk')
const { chunk } = require('lodash')

const locationForProfile = (profile) => {
    return profile.location ?
        { q: profile.location, types: ['place', 'region', 'country'] } :
        { q: profile.country, types: ['country'] }
}

const sourceNodes = async (options, pluginOptions) => {
    const { actions: { createNode }, createNodeId, createContentDigest, getNodes, reporter } = options
    const { mapboxToken } = pluginOptions

    if (!mapboxToken) {
        reporter.warn('No Mapbox access token provided')
        return
    }

    // Initialize Mapbox client
    const mapboxClient = new MapboxClient({ accessToken: mapboxToken })

    // Get all Squeak profiles directly from nodes
    // Implement the filter below to guarantee we're not processing profiles that don't have a team

    const profiles = getNodes()
        .filter(node =>
            node.internal.type === 'SqueakProfile' && // For all Squeak profiles
            node.teams?.data?.length > 0 &&           // Implement the following to avoid old profiles: filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
            (node.location || node.country)           // Only process profiles with a location or country
        )
        .map(node => ({
            id: node.id,
            location: node.location,
            country: node.country,
        }))

    const BATCH_SIZE = 50
    const batches = chunk(profiles, BATCH_SIZE)

    reporter.info(`Processing ${profiles.length} locations in ${batches.length} batches`)

    const locations = []

    for (const [index, batch] of batches.entries()) {
        reporter.info(`Processing batch ${index + 1}/${batches.length}`)

        try {
            const response = await mapboxClient.createRequest({
                method: 'POST',
                path: '/search/geocode/v6/batch',
                body: batch.map(locationForProfile)
            }).send()

            console.log(JSON.stringify(response.body.batch, null, 2))

            // Match results with original profiles
            response.body.batch.forEach((entry, i) => {
                if (entry.features.length > 0) {
                    const [longitude, latitude] = entry.features[0]?.geometry?.coordinates
                    if (longitude && latitude) {
                        locations.push({
                            profileId: batch[i].id,
                            location: locationForProfile(batch[i]).q,
                            coordinates: {
                                latitude,
                                longitude
                            }
                        })
                    }
                }
            })
        } catch (error) {
            reporter.warn(`Failed to process batch ${index + 1}: ${error.message}`)
        }
    }

    reporter.info(`Successfully processed ${locations.length} locations`)

    // Create nodes directly here, not in a separate function
    locations.forEach(location => {
        const nodeContent = {
            ...location,
        }

        const nodeMeta = {
            id: createNodeId(`mapbox-location-${location.profileId}`),
            parent: null,
            children: [],
            internal: {
                type: `MapboxLocation`,
                content: JSON.stringify(nodeContent),
                contentDigest: createContentDigest(nodeContent),
            },
        }

        createNode({ ...nodeContent, ...nodeMeta })
    })
}

const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
        type MapboxLocation implements Node {
            profileId: String!
            location: String!
            coordinates: MapboxCoordinates!
        }

        type MapboxCoordinates {
            latitude: Float!
            longitude: Float!
        }
    `
    createTypes(typeDefs)
}

module.exports = { sourceNodes, createSchemaCustomization }