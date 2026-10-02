import { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

const BASE = '/docs/product-analytics/learn'

/** Client-only; the indexed copy is /pocket-guides. */
export default function ProductAnalyticsLearnChapter(): JSX.Element | null {
    const location = useLocation()
    const chapter = (location?.pathname || '').replace(/\/$/, '').slice(BASE.length).replace(/^\//, '')

    useEffect(() => {
        const suffix = chapter && chapter !== 'introduction' ? `/${chapter}` : ''
        void navigate(`/pocket-guides/product-analytics${suffix}${location.hash || ''}`, { replace: true })
    }, [chapter, location.hash])

    return null
}
