import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import Product from 'components/Explorer/Product'

export default function DictatorOrTechBro(): JSX.Element {
    return (
        <>
            <SEO
                title="Dictator or tech bro? - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="dictator-or-tech-bro"
                title="Dictator or tech bro?"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                fullScreen
            >
                <iframe src="https://dictatorortechbro.com" className="w-full h-full border-0" />
            </Explorer>
        </>
    )
}
