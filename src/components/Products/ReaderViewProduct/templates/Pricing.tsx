import React from 'react'
import PlanComparison from 'components/Products/Slides/PlanComparison'
import { SectionComponentProps } from '../types'

const Pricing = ({ id, productData, data }: SectionComponentProps) => {
    const products = data?.allProductData?.nodes?.[0]?.products
    if (!products || !productData) return null

    const handleScrollToFeatures = () => {
        const el = document.getElementById('features')
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-4">Pricing</h2>
            <PlanComparison
                products={products}
                productHandle={productData.handle}
                productData={productData}
                onScrollToFeatures={handleScrollToFeatures}
            />
        </section>
    )
}

export default Pricing
