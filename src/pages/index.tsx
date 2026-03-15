import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import Control from '../components/Home/Control'

const KOREAN_FIRST_VISIT_KEY = 'korean-first-visit-redirect'

/**
 * Home page. Korean users are redirected to /ko on their first visit only.
 */
export default function Home() {
    useEffect(() => {
        if (typeof window === 'undefined') return
        if (localStorage.getItem(KOREAN_FIRST_VISIT_KEY) === 'true') return
        const isKorean =
            navigator.language?.startsWith('ko') ||
            (navigator.languages && navigator.languages.some((l) => String(l).startsWith('ko')))
        if (isKorean) {
            localStorage.setItem(KOREAN_FIRST_VISIT_KEY, 'true')
            navigate('/ko/', { replace: true })
        }
    }, [])

    return <Control />
}
