import { useEffect } from 'react'
import { navigate } from 'gatsby'

const INTRODUCTION_PATH = '/docs/product-analytics/learn/introduction'

/** Vercel performs this redirect in production; this page keeps local Gatsby previews consistent. */
export default function ProductAnalyticsPocketGuideRedirect(): null {
    useEffect(() => {
        navigate(INTRODUCTION_PATH, { replace: true })
    }, [])

    return null
}
