import React from 'react'
import KoreanHome from '../../components/Home/KoreanControl'
// Resolved by Gatsby at build; path is outside src so TS may not resolve
// @ts-expect-error - MDX import
import KoreanContent from '../../../contents/ko/index.mdx'

/**
 * Korean landing page. Content loaded via direct MDX import (no GraphQL).
 * No locale-based redirects; /ko is available to everyone.
 */
export default function KoreanLandingPage() {
    return <KoreanHome bodyComponent={KoreanContent} />
}
