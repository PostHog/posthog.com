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
                    Helping engineers and founders flex their product muscles
                </p>

                <div className="md:grid md:grid-cols-5 md:gap-12 px-4 lg:px-12 pb-8 max-w-6xl mx-auto items-center">
                    <div className="col-span-2 text-right">
                        <StaticImage
                            src="../images/newsletter-signup.png"
                            objectFit="contain"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="col-span-3 pt-6">
                        <p className="mb-3 text-lg">
                            <strong>Recent issues include:</strong>
                        </p>

                        <ul className="space-y-2 m-0 mb-8 p-0">
                            <Benefit text="How to talk to users (as an engineer)" />
                            <Benefit text="What we've learned about product-market fit" />
                            <Benefit text="When, why, and how GitHub uses feature flags" />
                        </ul>

                        <h4 className="relative text-lg">
                            <strong>Subscribe on Substack</strong>
                        </h4>

                        <div className="max-w-lg -mt-6 dark:mt-0 -ml-4 dark:ml-0">
                            <iframe
                                src="https://newsletter.posthog.com/embed"
                                frameBorder="0"
                                scrolling="no"
                                className="h-24 dark:rounded dark:bg-dark"
                            />
                            <div className="hidden dark:block text-sm dark:text-primary-dark max-w-sm opacity-50 -mt-2">
                                (Just imagine how much nicer this form would look in dark mode if Substack had better
                                embedding options!)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default NewsletterPage
