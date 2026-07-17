import React from 'react'
import InstallFrameworkGrid from 'components/Products/InstallFrameworkGrid'
import type { SectionComponentProps } from '../types'

/**
 * Product page install section. The framework list itself is rendered by the
 * shared `InstallFrameworkGrid` (driven by `constants/installation-taxonomy.ts`)
 * so it is never duplicated. Per-product hooks pick which category `id`s to
 * render via `productData.installation.categories`.
 */
const Installation = ({ id, productData }: SectionComponentProps) => {
    const installation = productData?.installation
    if (!installation) return null

    const productSlug: string | undefined = installation.productSlug || productData?.slug
    const enabledCategories: string[] | undefined = installation.categories

    const heading = installation.headline || installation.title || 'Install'
    const description: React.ReactNode | undefined = installation.description

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-3">{heading}</h2>
            {description && <p className="text-base text-secondary mb-4">{description}</p>}

            <div className="bg-primary rounded shadow-2xl p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10">
                <InstallFrameworkGrid categories={enabledCategories} productSlug={productSlug} />
            </div>
        </section>
    )
}

export default Installation
