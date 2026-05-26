import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import ProductGalaxy from 'components/ProductGalaxy'

export default function ProductGalaxyPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Product Galaxy"
                description="Explore how PostHog products connect — visualize cross-product workflows and find complementary tools."
                image="/images/og/default.png"
            />

            <Explorer
                template="generic"
                slug="product-galaxy"
                title="Product Galaxy"
                fullScreen
                padding={false}
                showAddressBar={false}
                viewportClasses="[&>div>div]:h-full"
            >
                <ProductGalaxy />
            </Explorer>
        </>
    )
}
