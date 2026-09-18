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

// Load mapbox-gl (and its stylesheet) on the client via a dynamic import so it is
// code-split out of the always-loaded bundle. A CommonJS require() is bundled statically
// by webpack and would ship mapbox-gl (~1.5 MiB) on every page of the site.
let mapboxModule: any = null
let mapboxPromise: Promise<any> | null = null

export const loadMapbox = (): Promise<any> => {
    if (typeof window === 'undefined') {
        return Promise.resolve(null)
    }
    mapboxPromise ??= import('mapbox-gl').then((module) => {
        mapboxModule = (module as any).default ?? module
        // Inject the mapbox-gl stylesheet via a <link> tag so marker/popup
        // positioning works correctly. Dynamic import() of .css files is
        // unreliable under Gatsby's webpack config.
        if (!document.querySelector('link[href*="mapbox-gl"]')) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'https://api.mapbox.com/mapbox-gl-js/v' + mapboxModule.version + '/mapbox-gl.css'
            document.head.appendChild(link)
        }
        return mapboxModule
    })
    return mapboxPromise
}

// Returns the loaded module, or null until loadMapbox() has resolved. Callers gate on the
// null and re-run once their mapboxReady state flips.
export const getMapbox = () => mapboxModule

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
