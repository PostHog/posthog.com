// Compute small lat/lng offsets to spread overlapping markers
export const computeOffsets = (count: number, baseRadius: number): Array<{ dx: number; dy: number }> => {
    if (count <= 1) {
        return [{ dx: 0, dy: 0 }]
    }
    const offsets: Array<{ dx: number; dy: number }> = []
    const rings = Math.ceil((count - 1) / 6)
    let remaining = count
    for (let ring = 1; remaining > 0; ring++) {
        const inRing = Math.min(6, remaining)
        const radius = baseRadius * ring * 1.5
        for (let i = 0; i < inRing; i++) {
            const angle = (i / inRing) * Math.PI * 2
            const dx = radius * Math.cos(angle)
            const dy = radius * Math.sin(angle)
            offsets.push({ dx, dy })
        }
        remaining -= inRing
        if (ring >= rings) {
            break
        }
    }
    while (offsets.length < count) {
        offsets.push({ dx: 0, dy: 0 })
    }
    return offsets
}

// Delay requiring mapbox-gl until client to avoid SSR issues
export const getMapbox = () => {
    if (typeof window === 'undefined') {
        return null
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mapboxgl = require('mapbox-gl')
    return mapboxgl
}

// Ensure a clustered GeoJSON source exists or update its data
export const ensureClusterSource = (map: any, id: string, data: any): void => {
    if (!map) return
    const existing = map.getSource(id) as any
    if (existing) {
        existing.setData(data)
        return
    }
    map.addSource(id, {
        type: 'geojson',
        data,
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 50,
    } as any)
}

// Ensure default cluster circle and count layers exist and attach expansion on click
export const ensureClusterLayers = (map: any, id: string): void => {
    if (!map) return
    const clustersId = `${id}-clusters`
    const countId = `${id}-cluster-count`
    const unclusteredId = `${id}-unclustered`

    // Layer for clustered points (2+ points grouped together)
    if (!map.getLayer(clustersId)) {
        map.addLayer({
            id: clustersId,
            type: 'circle',
            source: id,
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': '#111827',
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': 2,
                'circle-radius': ['step', ['get', 'point_count'], 14, 10, 18, 25, 24],
            },
        } as any)
    }

    // Layer for cluster count text
    if (!map.getLayer(countId)) {
        map.addLayer({
            id: countId,
            type: 'symbol',
            source: id,
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12,
            },
            paint: {
                'text-color': '#ffffff',
            },
        } as any)
    }

    // Layer for unclustered individual points (single person not in a cluster)
    if (!map.getLayer(unclusteredId)) {
        map.addLayer({
            id: unclusteredId,
            type: 'circle',
            source: id,
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#111827',
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': 2,
                'circle-radius': 14,
            },
        } as any)
    }

    // Layer for unclustered point count text (shows "1")
    const unclusteredCountId = `${id}-unclustered-count`
    if (!map.getLayer(unclusteredCountId)) {
        map.addLayer({
            id: unclusteredCountId,
            type: 'symbol',
            source: id,
            filter: ['!', ['has', 'point_count']],
            layout: {
                'text-field': '1',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12,
            },
            paint: {
                'text-color': '#ffffff',
            },
        } as any)
    }

    const clickHandler = (e: any) => {
        const features = map.queryRenderedFeatures(e.point, { layers: [clustersId] })
        const clusterId = features?.[0]?.properties?.cluster_id
        const source = map.getSource(id) as any
        if (clusterId && source && source.getClusterExpansionZoom) {
            source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
                if (err) return
                map.easeTo({ center: features[0].geometry.coordinates, zoom })
            })
        }
    }
    // Attempt to avoid duplicate handlers; requires the same function reference
    map.off('click', clustersId, clickHandler)
    map.on('click', clustersId, clickHandler)
}

// Toggle cluster layer visibility (including unclustered points)
export const setClusterVisibility = (map: any, id: string, visible: boolean): void => {
    if (!map) return
    const clustersId = `${id}-clusters`
    const countId = `${id}-cluster-count`
    const unclusteredId = `${id}-unclustered`
    const unclusteredCountId = `${id}-unclustered-count`
    ;[clustersId, countId, unclusteredId, unclusteredCountId].forEach((layerId) => {
        if (map.getLayer(layerId)) {
            map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none')
        }
    })
}

// Shared cluster zoom threshold used across maps
export const CLUSTER_ZOOM = 4
// Check if map style is ready for layer/source manipulation
export const isStyleReady = (map: any): boolean => {
    if (!map) return false
    return typeof map.isStyleLoaded !== 'function' || map.isStyleLoaded()
}

// Fixed-radius used to spread overlapping markers once per dataset (in degrees)
export const DEFAULT_SPREAD_RADIUS = 0.02
