import React, { useRef } from 'react'
import { useLocation } from '@reach/router'

import { ProductSwitcher, buildProductMenuTabs } from 'components/Products/ReaderViewProduct'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'

import LearnSurface from './LearnSurface'

interface LearnPageProps {
    /** `handle` from `src/hooks/productData/*`, e.g. `ai_observability`. */
    productHandle: string
    /** Chapter slug from the route. Omitted on the index, which shows the volume's front matter. */
    chapter?: string
    title: string
    description: string
}

/** The Learn surface's page shell, shared by the index route and the per-chapter splat route. */
export default function LearnPage({ productHandle, chapter, title, description }: LearnPageProps): JSX.Element {
    const productData = useProduct({ handle: productHandle }) as any
    const contentRef = useRef<HTMLElement>(null)
    const location = useLocation()
    const menuTabs = buildProductMenuTabs({
        productData,
        contentRef,
        activeSurface: 'learn',
        currentPath: location?.pathname,
    })
    const volumeId = productData?.pocketGuideVolume

    return (
        <>
            <SEO title={title} description={description} image="/images/og/default.png" />
            <ReaderView
                // The book carries its own structure; a second contents column would compete with it.
                hideRightSidebar
                hideTitle
                showQuestions={false}
                menuTabs={menuTabs}
                productSelect={<ProductSwitcher activeHandle={productHandle} />}
            >
                <article ref={contentRef}>
                    {volumeId ? <LearnSurface volumeId={volumeId} chapter={chapter} /> : null}
                </article>
            </ReaderView>
        </>
    )
}
