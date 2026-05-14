import React, { useMemo, useState } from 'react'
import type { GeneratorState } from '../types'
import {
    ArtLibraryAsset,
    assetDominantHex,
    assetFullUrl,
    assetPreviewUrl,
    searchArtLibrary,
    useArtLibrary,
} from '../hooks/useArtLibrary'
import { suggestThemeFromHex } from '../themes'

type Props = {
    state: GeneratorState
    onChange: (next: GeneratorState) => void
}

export default function LibraryBrowser({ state, onChange }: Props) {
    const { assets, loading, error } = useArtLibrary()
    const [query, setQuery] = useState('')
    const results = useMemo(() => searchArtLibrary(assets, query), [assets, query])

    const select = (asset: ArtLibraryAsset) => {
        const full = assetFullUrl(asset)
        const dominant = assetDominantHex(asset)
        const suggested = dominant ? suggestThemeFromHex(dominant) : state.theme
        onChange({
            ...state,
            image: {
                ...state.image,
                source: 'library',
                librarySlug: asset.slug,
                libraryUrl: full,
            },
            theme: suggested,
        })
    }

    return (
        <div className="space-y-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search art library (e.g. hedgehog, sticker, scene)…"
                className="w-full bg-accent border border-primary rounded px-2 py-1 text-sm"
            />
            {loading && <p className="text-xs text-secondary">Loading library…</p>}
            {error && <p className="text-xs text-red">Library failed to load: {error}</p>}
            <div className="grid grid-cols-3 gap-1.5 max-h-72 overflow-y-auto">
                {results.map((asset) => {
                    const isActive = state.image.librarySlug === asset.slug
                    const preview = assetPreviewUrl(asset)
                    if (!preview) return null
                    return (
                        <button
                            key={asset.slug}
                            type="button"
                            onClick={() => select(asset)}
                            className={`aspect-square rounded border-2 overflow-hidden bg-accent ${
                                isActive ? 'border-primary' : 'border-transparent hover:border-primary/40'
                            }`}
                            title={asset.name}
                        >
                            <img src={preview} alt={asset.name} className="w-full h-full object-contain" />
                        </button>
                    )
                })}
            </div>
            {!loading && results.length === 0 && <p className="text-xs text-secondary">No assets match "{query}"</p>}
        </div>
    )
}
