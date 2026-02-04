import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import KoreanHome from '../../components/Home/KoreanControl'
// Resolved by Gatsby at build; path is outside src so TS may not resolve
// @ts-expect-error - MDX import
import KoreanContent from '../../../contents/ko/index.mdx'

const PREVIEW_KEY = 'ko-preview'

/**
 * Korean landing page. Content loaded via direct MDX import (no GraphQL).
 * Only show for Korean users: redirect others to the English homepage.
 * To test as a non-Korean user: visit /ko?preview=ko (or set localStorage 'ko-preview' to 'true').
 */
export default function KoreanLandingPage() {
    useEffect(() => {
        if (typeof window === 'undefined') return
        const urlParams = new URLSearchParams(window.location.search)
        const previewParam = urlParams.get('preview') === 'ko'
        const previewStorage = localStorage.getItem(PREVIEW_KEY) === 'true'
        if (previewParam) localStorage.setItem(PREVIEW_KEY, 'true')
        const allowPreview = previewParam || previewStorage

        const isKorean =
            navigator.language?.startsWith('ko') ||
            (navigator.languages && navigator.languages.some((l) => l.startsWith('ko')))
        if (!isKorean && !allowPreview) {
            navigate('/', { replace: true })
        }
    }, [])

    return <KoreanHome bodyComponent={KoreanContent} />
}
