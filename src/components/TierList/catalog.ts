export const brandCatalogUrl = 'https://brand.posthog.com/catalog.json'

export interface Hoggie {
    slug: string
    name: string
    tags: string[]
}

export interface Catalog {
    source: string
    version: string
    tierColors: string[]
    hoggies: Hoggie[]
}

interface BrandCatalog {
    package: { version: string }
    hoggies: { name: string; tags?: string[]; images: { png: string; variant?: string }[] }[]
    colors: { slug: string; lighter: string }[]
}

// Use the same flattened, stable image slugs as the saved catalog and shared rankings.
export function normalizeCatalog(value: unknown): Catalog | null {
    try {
        const catalog = value as BrandCatalog
        if (typeof catalog.package.version !== 'string' || !Array.isArray(catalog.hoggies)) return null
        const seen = new Set<string>()
        const hoggies = catalog.hoggies.flatMap((hog) => {
            if (typeof hog.name !== 'string' || !Array.isArray(hog.images)) throw new Error('Invalid hoggie')
            return hog.images.map((image) => {
                const url = new URL(image.png)
                const slug = url.pathname.match(/^\/hoggies\/([a-z0-9-]+)\.png$/)?.[1]
                if (url.origin !== 'https://brand.posthog.com' || !slug || seen.has(slug))
                    throw new Error('Invalid or duplicate image')
                if (image.variant !== undefined && typeof image.variant !== 'string') throw new Error('Invalid variant')
                seen.add(slug)
                return {
                    slug,
                    name: `${hog.name}${image.variant ? ` (${image.variant})` : ''}`,
                    tags: Array.isArray(hog.tags) ? hog.tags.filter((tag) => typeof tag === 'string') : [],
                }
            })
        })
        if (!hoggies.length) return null
        const tierColors = ['coral', 'tangerine', 'lemon', 'green', 'blue'].map((slug) => {
            const color = catalog.colors.find((color) => color.slug === slug)?.lighter
            if (!color || !/^#[a-f\d]{6}$/i.test(color)) throw new Error('Invalid tier color')
            return color
        })
        return { source: brandCatalogUrl, version: catalog.package.version, tierColors, hoggies }
    } catch {
        return null
    }
}

export async function loadLatestCatalog(signal: AbortSignal): Promise<Catalog | null> {
    try {
        const response = await fetch(brandCatalogUrl, { signal, cache: 'no-cache' })
        return response.ok ? normalizeCatalog(await response.json()) : null
    } catch {
        return null
    }
}
