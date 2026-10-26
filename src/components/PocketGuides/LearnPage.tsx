import React, { createContext, useContext } from 'react'
import { useLocation } from '@reach/router'

import { ProductSwitcher, buildProductMenuTabs, surfaceBasePath } from 'components/Products/ReaderViewProduct'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import { pocketGuideUrl, volumeById } from '../../constants/pocketGuides'

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

const InLearnShell = createContext(false)

/**
 * Learn's ReaderView and product sidebar. AppWindow renders it around every `/learn/<product>`
 * page, so the sidebar stays mounted when the reader moves between Learn pages.
 */
export function LearnShell({ path, children }: { path: string; children: React.ReactNode }): JSX.Element {
    const products = useProduct() as any[]
    const currentPath = path.replace(/\/$/, '')
    const productData = products.find((product) => {
        const learnUrl = product.pocketGuideVolume && surfaceBasePath(product.slug, 'learn')
        return learnUrl && (currentPath === learnUrl || currentPath.startsWith(`${learnUrl}/`))
    })
    if (!productData) return <>{children}</>
    // A hub root shows the product's landing page, which has no markdown to copy.
    const isLearnLanding =
        Boolean(volumeById(productData.pocketGuideVolume)?.learnHub) &&
        currentPath === surfaceBasePath(productData.slug, 'learn')

    return (
        <ReaderView
            // Learn navigation already lives in the product sidebar.
            hideRightSidebar
            hideTitle
            hideMarkdownActions={isLearnLanding}
            showQuestions={false}
            menuTabs={buildProductMenuTabs({ productData, activeSurface: 'learn', currentPath })}
            productSelect={<ProductSwitcher activeHandle={productData.handle} />}
        >
            <InLearnShell.Provider value>{children}</InLearnShell.Provider>
        </ReaderView>
    )
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
    const inShell = useContext(InLearnShell)
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
