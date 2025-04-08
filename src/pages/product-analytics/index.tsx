import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'

export default function ProductAnalytics(): JSX.Element {
    return (
        <Explorer
            features
            pricing
            customers
            comparison
            docs
            tutorials
            questions
            team
            roadmap
            changelog
            slug="product-analytics"
            // teamName="product-analytics"
            // roadmapCategory="product-analytics"
            // changelogCategory="product-analytics"
        />
    )
}
