import React, { useRef } from 'react'

import LearnSurface from 'components/PocketGuides/LearnSurface'
import { ProductSwitcher, buildProductMenuTabs } from 'components/Products/ReaderViewProduct'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'

/** AI Observability's Learn surface. The volume comes from `pocketGuideVolume`, never named here. */
export default function AIObservabilityLearn(): JSX.Element {
    const productData = useProduct({ handle: 'ai_observability' }) as any
    const contentRef = useRef<HTMLElement>(null)
    const menuTabs = buildProductMenuTabs({ productData, contentRef, activeSurface: 'learn' })
    const volumeId = productData?.pocketGuideVolume

    return (
        <>
            <SEO
                title="Learn AI Observability – PostHog"
                description="Tracing every LLM call, scoring what comes back, and seeing what users do with it."
                image="/images/og/default.png"
            />
            <ReaderView
                // The book carries its own structure; a second contents column would compete with it.
                hideRightSidebar
                hideTitle
                showQuestions={false}
                menuTabs={menuTabs}
                productSelect={<ProductSwitcher activeHandle="ai_observability" />}
            >
                <article ref={contentRef}>{volumeId ? <LearnSurface volumeId={volumeId} /> : null}</article>
            </ReaderView>
        </>
    )
}
