import React, { useRef } from 'react'
import { useLocation } from '@reach/router'
import { IconArrowLeft } from '@posthog/icons'

import { ProductSwitcher, buildProductMenuTabs, surfaceBasePath } from 'components/Products/ReaderViewProduct'
import Link from 'components/Link'
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
    storyUrl: string
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
    const isLearnLanding = Boolean(volumeId && Landing && !chapter)
    const learnBasePath = productData ? surfaceBasePath(productData.slug, 'learn') : ''
    const landingProps = {
        productName: productData?.name,
        description,
        storyUrl: `${learnBasePath}/introduction`,
    } as LearnLandingProps
    const productMenuTabs = buildProductMenuTabs({
        productData,
        contentRef,
        activeSurface: 'learn',
        currentPath: location?.pathname,
    })

    const guide = volumeId ? <LearnSurface volumeId={volumeId} chapter={chapter} basePath={learnBasePath} /> : null

    return (
        <>
            <SEO title={title} description={description} image="/images/og/default.png" />
            <ReaderView
                // Learn navigation already lives in the product sidebar.
                hideRightSidebar
                hideTitle
                hideMarkdownActions={isLearnLanding}
                showQuestions={false}
                menuTabs={productMenuTabs}
                productSelect={<ProductSwitcher activeHandle={productHandle} />}
                mobileTopBar={
                    chapter && Landing ? (
                        <Link
                            to={learnBasePath}
                            className="inline-flex min-w-0 items-center gap-1 rounded-sm p-1.5 text-sm !no-underline text-secondary hover:bg-accent hover:text-primary"
                        >
                            <IconArrowLeft className="size-4 shrink-0" />
                            <span className="truncate">Back to Learn</span>
                        </Link>
                    ) : undefined
                }
            >
                <article ref={contentRef}>
                    {isLearnLanding && Landing ? <Landing {...landingProps} /> : null}
                    {!isLearnLanding ? guide : null}
                </article>
            </ReaderView>
        </>
    )
}
