import { useEffect, useMemo, useState } from 'react'

const INDEX_URL = 'https://posthog-art-library.vercel.app/data/index.json'

export type ArtLibraryAsset = {
    slug: string
    name: string
    version?: string
    imageType?: string
    caption?: string
    tags?: string[]
    colors?: { dominant?: string[]; palette?: string }
    files?: {
        thumb?: string
        md?: string
        lg?: string
        original?: string
        vector?: string
    }
}

let cache: ArtLibraryAsset[] | null = null
let pending: Promise<ArtLibraryAsset[]> | null = null

async function loadIndex(): Promise<ArtLibraryAsset[]> {
    if (cache) return cache
    if (pending) return pending
    pending = fetch(INDEX_URL)
        .then((r) => r.json())
        .then((data) => {
            const assets: ArtLibraryAsset[] = Array.isArray(data) ? data : data.assets || []
            cache = assets
            return assets
        })
        .finally(() => {
            pending = null
        })
    return pending
}

export function useArtLibrary() {
    const [assets, setAssets] = useState<ArtLibraryAsset[]>(cache || [])
    const [loading, setLoading] = useState(!cache)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (cache) return
        let cancelled = false
        setLoading(true)
        loadIndex()
            .then((data) => {
                if (!cancelled) setAssets(data)
            })
            .catch((e) => !cancelled && setError(e?.message || 'Failed to load library'))
            .finally(() => !cancelled && setLoading(false))
        return () => {
            cancelled = true
        }
    }, [])

    return { assets, loading, error }
}

export function searchArtLibrary(assets: ArtLibraryAsset[], query: string): ArtLibraryAsset[] {
    if (!query.trim()) return assets.slice(0, 48)
    const q = query.toLowerCase()
    return assets
        .filter((a) => {
            if (a.name?.toLowerCase().includes(q)) return true
            if (a.caption?.toLowerCase().includes(q)) return true
            if (a.tags?.some((t) => t.toLowerCase().includes(q))) return true
            return false
        })
        .slice(0, 48)
}

export function assetPreviewUrl(asset: ArtLibraryAsset): string | undefined {
    return asset.files?.thumb || asset.files?.md || asset.files?.original || asset.files?.vector
}

export function assetFullUrl(asset: ArtLibraryAsset): string | undefined {
    return asset.files?.vector || asset.files?.original || asset.files?.lg || asset.files?.md || asset.files?.thumb
}

export function assetDominantHex(asset: ArtLibraryAsset): string | undefined {
    return asset.colors?.dominant?.[0]
}
