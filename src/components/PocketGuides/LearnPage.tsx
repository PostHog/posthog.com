import React, { useContext } from 'react'
import { useLocation } from '@reach/router'

import { surfaceBasePath } from 'components/Products/ReaderViewProduct'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import { pocketGuideUrl, volumeById } from '../../constants/pocketGuides'

import LearnShell, { LearnShellContext } from './LearnShell'
import LearnSurface from './LearnSurface'

interface LearnPageProps {
    /** `handle` from `src/hooks/productData/*`, e.g. `ai_observability`. */
    productHandle: string
    /** Chapter slug from the route; omitted on the index. */
    chapter?: string
    title: string
    description: string
    /** Optional product-specific choice page. Its URL comes from product data. */
    landing?: React.ComponentType<LearnLandingProps>
    /** Optional non-chapter content, such as the agent teaching page. */
    children?: React.ReactNode
}

export interface LearnLandingProps {
    productName: string
    description: string
    storyUrl: string
    /** The hub root, `/learn/<product>`. */
    learnUrl: string
    volumeId: string
}

/** Page content shared by the index and per-chapter routes. */
export default function LearnPage({
    productHandle,
    chapter,
    title,
    description,
    landing: Landing,
    children,
}: LearnPageProps): JSX.Element {
    const inShell = useContext(LearnShellContext)
    const productData = useProduct({ handle: productHandle }) as any
    const location = useLocation()
    const volumeId = productData?.pocketGuideVolume
    const isLearnLanding = Boolean(volumeId && Landing && !chapter)
    const volume = volumeId ? volumeById(volumeId) : undefined
    // The registry owns the guide URL, so links match the pages createPages builds.
    const guideBasePath = volume
        ? pocketGuideUrl(volume)
        : productData
        ? surfaceBasePath(productData.slug, 'learn')
        : ''
    const landingProps = {
        productName: productData?.name,
        description,
        storyUrl: guideBasePath,
        learnUrl: productData ? surfaceBasePath(productData.slug, 'learn') : '',
        volumeId,
    } as LearnLandingProps

    const guide = volumeId ? (
        <LearnSurface
            volumeId={volumeId}
            chapter={chapter}
            basePath={guideBasePath}
            section={productData?.pocketGuideSection}
        />
    ) : null

    const content = (
        <>
            <SEO title={title} description={description} image="/images/og/default.png" />
            <article>
                {isLearnLanding && Landing ? <Landing {...landingProps} /> : null}
                {!isLearnLanding ? children ?? guide : null}
            </article>
        </>
    )

    return inShell ? content : <LearnShell path={location.pathname}>{content}</LearnShell>
}
