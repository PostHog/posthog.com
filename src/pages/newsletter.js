import React, { useState } from 'react'
import Layout from '../components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import { NewsletterForm } from 'components/NewsletterForm'
import { Check2 } from 'components/Icons/Icons'

const Benefit = ({ text }) => {
    return (
        <li className="flex items-center w-full gap-2">
            <Check2 className="w-6 h-6 shrink-0 grow-0 opacity-60" />
            <p className="text-lg font-semibold text-gray-600 mb-0 flex-1">{text}</p>
        </li>
    )
}

export const NewsletterPage = () => {
    return (
        <Layout>
            <div className="md:grid md:grid-cols-5 md:gap-12 px-4 lg:px-12 max-w-6xl mx-auto md:pt-8">
                <div className="col-span-2 text-right">
                    <StaticImage src="../images/newsletter-signup.png" objectFit="contain" className="w-full h-full" />
                </div>
                <div className="col-span-3">
                    <h1 className="text-6xl mb-2 text-center md:text-left">Subscribe to HogMail</h1>
                    <h4 className="font-semibold opacity-60 text-center md:text-left">
                        A newsletter about making better products
                    </h4>

                    <div className="max-w-lg -my-4">
                        <NewsletterForm compact />
                    </div>

                    <ul className="space-y-4 m-0 p-0">
                        <Benefit text="Never miss a PostHog blog post" />
                        <Benefit text="The latest PostHog tutorials and tips" />
                        <Benefit text="Curated advice on building great products" />
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default NewsletterPage
