import React from 'react'
import './styles/features.css'
import Layout from '../components/Layout'
import { PageHeader } from '../components/PageHeader'
import { FeaturesComparisonTable } from '../components/FeaturesComparisonTable'
import { FeaturesNav } from '../components/FeaturesNav'

function ProductFeatures() {
    return (
        <Layout>
            <PageHeader
                title="Features"
                tagline="We know you’re wondering how PostHog compares to other analytics tools, so we have made it easy
                for you to check out how feature-rich we actually are."
                styleKey="productFeatures"
                bgColor="navy"
            />
            <FeaturesNav />
            <FeaturesComparisonTable />
        </Layout>
    )
}

export default ProductFeatures
