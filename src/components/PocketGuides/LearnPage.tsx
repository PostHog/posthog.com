import React, { useRef } from 'react'
import { useLocation } from '@reach/router'

import { ProductSwitcher, buildProductMenuTabs, surfaceBasePath } from 'components/Products/ReaderViewProduct'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'

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
}

export interface LearnLandingProps {
    productName: string
    description: string
    pocketGuideUrl: string
    interactiveLearningUrl: string
}

/** Page shell shared by the index and per-chapter routes. */
export default function LearnPage({
    productHandle,
    chapter,
    title,
    description,
    landing: Landing,
}: LearnPageProps): JSX.Element {
    const productData = useProduct({ handle: productHandle }) as any
    const contentRef = useRef<HTMLElement>(null)
    const location = useLocation()
    const volumeId = productData?.pocketGuideVolume
    const interactiveLearningUrl = productData?.interactiveLearningUrl as string | undefined
    const isLearnLanding = Boolean(!chapter && volumeId && Landing && interactiveLearningUrl)
    const landingProps = {
        productName: productData?.name,
        description,
        pocketGuideUrl: `${surfaceBasePath(productData?.slug, 'learn')}/introduction`,
        interactiveLearningUrl,
    } as LearnLandingProps
    const productMenuTabs = buildProductMenuTabs({
        productData,
        contentRef,
        activeSurface: 'learn',
        currentPath: location?.pathname,
    })
    return (
        <>
            <SEO title={title} description={description} image="/images/og/default.png" />
            <ReaderView
                // The book carries its own structure; a second contents column competes.
                hideRightSidebar
                hideTitle
                hideMarkdownActions={isLearnLanding}
                showQuestions={false}
                menuTabs={productMenuTabs}
                productSelect={<ProductSwitcher activeHandle={productHandle} />}
            >
                <article ref={contentRef}>
                    {isLearnLanding && Landing && interactiveLearningUrl ? (
                        <Landing {...landingProps} />
                    ) : volumeId ? (
                        <LearnSurface
                            volumeId={volumeId}
                            chapter={chapter}
                            basePath={surfaceBasePath(productData.slug, 'learn')}
                        />
                    ) : null}
                </article>
            </ReaderView>
        </>
    )
}
