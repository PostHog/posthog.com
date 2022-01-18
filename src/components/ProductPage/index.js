import FooterCTA from 'components/FooterCTA'
import React from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import FeatureFlags from './FeatureFlags'
import FeatureSlider from './FeatureSlider'
import Heatmaps from './Heatmaps'
import Hero from './Hero'
import Navigation from './Navigation'
import SelfHost from './SelfHost'
import Platform from './Platform'
import ProductAnalytics from './ProductAnalytics'
import SessionRecording from './SessionRecording'

function ProductPage() {
    return (
        <Layout>
            <SEO title="Product • PostHog" />
            <FeatureSlider />
            <Hero />
            <Navigation />
            <ProductAnalytics />
            <SessionRecording />
            <FeatureFlags />
            <Heatmaps />
            <SelfHost />
            <Platform />
            <div className="my-12 md:my-24 px-5 max-w-[960px] mx-auto">
                <FooterCTA />
            </div>
        </Layout>
    )
}

export default ProductPage
