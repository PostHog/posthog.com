import * as HoggiePngs from '@posthog/brand/hoggies/png'

export type Hoggie = {
    /** The export name in `@posthog/brand/hoggies/png`, used as a React key. */
    key: string
    /** A display name derived from the export name, for example "Quick call". */
    name: string
    src: string
}

/**
 * Turns `hedgehogQuickCallPng` into `Quick Call`.
 *
 * Title case on purpose: that is how the brand library names these illustrations, and many
 * of them are proper nouns, so sentence case would print "Steve jobs".
 *
 * The exact display names ship in `@posthog/brand/hoggies/metadata`, but reading them pulls
 * in a metadata module per illustration — 568 KB of source, mostly search tags — to correct
 * the capitalization of two names out of 142. The derived name matches the rest.
 */
const friendlyName = (key: string): string =>
    key
        .replace(/^hedgehog/, '')
        .replace(/Png$/, '')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

/**
 * Every hedgehog illustration in the PostHog brand library, as an image URL.
 *
 * Deliberately the PNG exports rather than the React components from
 * `@posthog/brand/hoggies`. Each component inlines its own SVG path data — on the order of
 * 240 KB of module source per illustration — so reaching for the whole library as
 * components would put several megabytes of JavaScript on this page. The PNG exports are
 * URLs: the bundler emits the files, and a reader downloads only the one on screen.
 *
 * Sorted, so the server-rendered pick is stable from one build to the next.
 */
export const HOGGIES: Hoggie[] = Object.entries(HoggiePngs as unknown as Record<string, unknown>)
    .filter(([key, src]) => key.endsWith('Png') && typeof src === 'string')
    .map(([key, src]) => ({ key, name: friendlyName(key), src: src as string }))
    .sort((a, b) => a.key.localeCompare(b.key))
