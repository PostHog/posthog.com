import React from 'react'
import ProductFeatureFlags from 'components/Product/FeatureFlags'
import Layout from 'components/Layout'
import ProductDeskHog from 'components/Product/DeskHog'
export default function FeatureFlags(): JSX.Element {
    return (
        <Layout>
            <ProductDeskHog />
        </Layout>
    )
}
