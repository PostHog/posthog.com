import React, { useRef } from 'react'
import { useLocation } from '@reach/router'

import { ProductSwitcher, buildProductMenuTabs } from 'components/Products/ReaderViewProduct'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import { useLearnPlacement } from 'components/Products/ReaderViewProduct/learnPlacement'

import LearnSurface from './LearnSurface'

interface LearnPageProps {
    /** `handle` from `src/hooks/productData/*`, e.g. `ai_observability`. */
    productHandle: string
    /** Chapter slug from the route; omitted on the index. */
    chapter?: string
    title: string
    description: string
}

/** Page shell shared by the index and per-chapter routes. */
export default function LearnPage({ productHandle, chapter, title, description }: LearnPageProps): JSX.Element {
    const productData = useProduct({ handle: productHandle }) as any
    const contentRef = useRef<HTMLElement>(null)
    const location = useLocation()
    const learnPlacement = useLearnPlacement()
    const menuTabs = buildProductMenuTabs({
        productData,
        contentRef,
        // No Learn tab in the nested arm, so the reader sits under Docs.
        activeSurface: learnPlacement === 'nested' ? 'docs' : 'learn',
        currentPath: location?.pathname,
        learnPlacement,
    })
    const volumeId = productData?.pocketGuideVolume

    return (
        <>
            <SEO title={title} description={description} image="/images/og/default.png" />
            <ReaderView
                // The book carries its own structure; a second contents column competes.
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
