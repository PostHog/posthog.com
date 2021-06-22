import React from 'react'
import './styles/features.scss'
import Layout from '../components/Layout'
import { PageHeader } from '../components/PageHeader'
import { ProductFeature } from '../components/ProductFeature'
import { FeaturesComparisonTable } from '../components/FeaturesComparisonTable'
import { FeaturesNav } from '../components/FeaturesNav'
import { SEO } from '../components/seo'

function ProductPage() {
    return (
        <Layout>
            <SEO title="Product • PostHog" />
            <PageHeader
                title="Build better products"
                tagline="The only way to build something amazing is by understanding your users. That’s where we come in, with the only open source product analytics platform."
                styleKey="productFeatures"
                bgColor="navy"
            />

            <div className="flex flex-wrap ">
                <ProductFeature
                    orientation="foo"
                    width="1/3"
                    name="Track events automatically"
                    description="Define any clicks or pageviews retroactively and see historical data since you installed PostHog."
                    docsUrl="#"
                    image="#"
                    klass="productFeatures"
                />

                <ProductFeature
                    orientation="foo"
                    width="2/3"
                    name="Track events automatically"
                    description="Define any clicks or pageviews retroactively and see historical data since you installed PostHog."
                    docsUrl="#"
                    image="#"
                    klass="productFeatures"
                />
            </div>

            <FeaturesNav />
            <FeaturesComparisonTable />
        </Layout>
    )
}

export default ProductPage
