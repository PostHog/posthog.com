// Environment access for build-time code. astro.config.mjs loads the .env files into process.env.

export function env(name: string): string | undefined {
    const value = process.env[name]
    return value === undefined || value === '' ? undefined : value
}

/** True when every listed variable is set. Sources without their keys fall back to fake data. */
export function hasEnv(...names: string[]): boolean {
    return names.every((name) => env(name) !== undefined)
}

export const SQUEAK_API_HOST = () => env('PUBLIC_SQUEAK_API_HOST')
export const CLOUDINARY_CLOUD_NAME = () => env('PUBLIC_CLOUDINARY_CLOUD_NAME') ?? 'dmukukwp6'

/**
 * Preview deploys set MINIMAL_BUILD=true to build content pages only: docs, handbook, posts, SDK
 * references, pocket guides, Hogpedia, templates, and the pages in src/views. Listings, tags,
 * generated reference pages, jobs, events, plain pages, and the SEO outputs are skipped.
 */
export const MINIMAL_BUILD = () => env('MINIMAL_BUILD') === 'true'
