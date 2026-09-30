import { useEffect, useState } from 'react'
import { useLocation } from '@reach/router'
import { Direction, getDirectionFromPath } from './locales'

/**
 * Writing direction for the current route.
 *
 * `?dir=rtl` forces a direction on any page. It is opt-in, affects only the reader who
 * types it, and persists nothing — but it is deliberately not gated to development, so
 * RTL layout stays reviewable on a deploy preview and usable for QA once Arabic ships.
 *
 * The override is applied in an effect, not during render. A static build has no query
 * string, so the server always emits the path-based direction; React does not patch
 * attribute mismatches while hydrating, so reading the query during render would be
 * silently discarded in production.
 */
export const useDirection = (): Direction => {
    const { pathname, search } = useLocation()
    const fromPath = getDirectionFromPath(pathname)
    const [dir, setDir] = useState<Direction>(fromPath)

    useEffect(() => {
        const override = new URLSearchParams(search || '').get('dir')
        setDir(override === 'rtl' || override === 'ltr' ? override : fromPath)
    }, [search, fromPath])

    return dir
}
