import { useLocation } from '@reach/router'
import { Direction, getDirectionFromPath } from './locales'

/**
 * Writing direction for the current route.
 *
 * `?dir=rtl` forces a direction on any page. It is opt-in, affects only the reader who
 * types it, and persists nothing — but it is deliberately not gated to development, so
 * RTL layout stays reviewable on a deploy preview and usable for QA once Arabic ships.
 */
export const useDirection = (): Direction => {
    const { pathname, search } = useLocation()

    if (search) {
        const override = new URLSearchParams(search).get('dir')
        if (override === 'rtl' || override === 'ltr') return override
    }

    return getDirectionFromPath(pathname)
}
