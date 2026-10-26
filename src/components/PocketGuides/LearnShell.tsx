import React, { createContext } from 'react'

import buildProductMenuTabs, { surfaceBasePath } from 'components/Products/ReaderViewProduct/buildProductMenuTabs'
import ProductSwitcher from 'components/Products/ReaderViewProduct/ProductSwitcher'
import ReaderView from 'components/ReaderView'
import useProduct from 'hooks/useProduct'
import { volumeById } from '../../constants/pocketGuides'

// Kept apart from LearnPage: AppWindow imports this file on every page, so it must not pull in guide content.

/** True inside `LearnShell`, so `LearnPage` renders only its content. */
export const LearnShellContext = createContext(false)

/**
 * Learn's ReaderView and product sidebar. AppWindow renders it around every `/learn/<product>`
 * page, so the sidebar stays mounted when the reader moves between Learn pages.
 */
export default function LearnShell({ path, children }: { path: string; children: React.ReactNode }): JSX.Element {
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
            productSelect={<ProductSwitcher activeHandle={productData.handle} surface="learn" />}
        >
            <LearnShellContext.Provider value={true}>{children}</LearnShellContext.Provider>
        </ReaderView>
    )
}
