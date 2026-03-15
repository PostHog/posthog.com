import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import KoreanHome from '../components/Home/KoreanControl'

interface KoreanLandingContext {
    rawBody: string
    mdxBody: unknown
}

/**
 * Korean landing page. Content is passed at build time from createPages (contents/ko/index.mdx).
 * Only show for Korean users: redirect others to the English homepage.
 */
export default function KoreanLanding({ pageContext }: { pageContext: KoreanLandingContext }) {
    const { rawBody, mdxBody } = pageContext

    useEffect(() => {
        if (typeof window === 'undefined') return
        const isKorean =
            navigator.language?.startsWith('ko') ||
            (navigator.languages && navigator.languages.some((l) => l.startsWith('ko')))
        if (!isKorean) {
            navigate('/', { replace: true })
        }
    }, [])

    return <KoreanHome rawBody={rawBody} mdxBody={mdxBody} />
}
