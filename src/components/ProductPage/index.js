import React from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import FeatureScreenshots from './FeatureScreenshots'
import FeatureSlider from './FeatureSlider'
import Hero from './Hero'

function ProductPage() {
    return (
        <Layout>
            <SEO title="Product • PostHog" />
            <FeatureSlider />
            <Hero />
            <FeatureScreenshots />
        </Layout>
    )
}

export default ProductPage
