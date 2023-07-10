import React, { useState } from 'react'
import Layout from '../components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import { NewsletterForm } from 'components/NewsletterForm'
import { Check2 } from 'components/Icons/Icons'
import { SEO } from 'components/seo'

const Benefit = ({ text }) => {
    return (
        <li className="flex items-center w-full gap-2">
            <Check2 className="w-6 h-6 shrink-0 grow-0 text-green" />
            <p className="text-primary dark:text-primary-dark mb-0 flex-1">{text}</p>
        </li>
    )
}

export const NewsletterPage = () => {
    return (
        <Layout>
            <SEO title="PostHog Newsletter" image="/images/open-graph-newsletter.png" />
            <div className="max-w-6xl mx-auto px-4 py-8 lg:px-0">
                <div className="font-semibold pb-2 text-lg opacity-60 text-center">Subscribe to...</div>
                <h1 className="text-5xl lg:text-6xl mb-3 text-center">Product for Engineers</h1>
                <p className="font-semibold text-lg opacity-60 text-center leading-tight">
                    Our newsletter about making better products
                </p>

                <div className="md:grid md:grid-cols-5 md:gap-12 px-4 lg:px-12 max-w-6xl mx-auto items-center">
                    <div className="col-span-2 text-right">
                        <StaticImage
                            src="../images/newsletter-signup.png"
                            objectFit="contain"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="col-span-3 pt-6">
                        <p className="mb-3 text-lg">
                            <strong>Here's what you'll find inside:</strong>
                        </p>

                        <ul className="space-y-2 m-0 mb-8 p-0">
                            <Benefit text="Info to help engineers build better products" />
                            <Benefit text="The latest tutorials and tips from fast-growing startups" />
                            <Benefit text="Curated advice on building great products" />
                        </ul>

                        <h4 className="relative text-lg">
                            <strong>Subscribe through Substack</strong>
                        </h4>

                        <div className="max-w-lg -mt-6 -ml-4">
                            <iframe
                                src="https://newsletter.posthog.com/embed"
                                frameBorder="0"
                                scrolling="no"
                                className=" h-24"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default NewsletterPage
