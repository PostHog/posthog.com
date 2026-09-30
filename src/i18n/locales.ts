/**
 * Writing direction per locale.
 *
 * This is the minimum the Arabic RTL work needs. The wider locale registry (labels,
 * hreflang matrix, catalog wiring) lands with the LTR localization branch — extend
 * this file rather than adding a second source of truth.
 */

export type Direction = 'ltr' | 'rtl'

/** Locales that read right to left. */
export const RTL_LOCALES = new Set(['ar'])

export const getDirection = (locale?: string): Direction => (locale && RTL_LOCALES.has(locale) ? 'rtl' : 'ltr')

/** Direction for a pathname, e.g. `/ar` or `/ar/pricing` -> `rtl`. Unknown prefixes are LTR. */
export const getDirectionFromPath = (pathname?: string): Direction =>
    getDirection(pathname?.split('/').filter(Boolean)[0])
