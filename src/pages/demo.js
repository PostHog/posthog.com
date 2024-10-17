import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction/index.tsx'
import { SEO } from 'components/seo'
import React from 'react'
import Layout from 'components/Layout'
import { SignupCTA } from 'components/SignupCTA'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

export default function BookADemo() {
    return (
        <Layout>
            <SEO title="Book a demo – PostHog" />
            <section className="px-4 lg:pb-8 py-4 max-w-6xl mx-auto flex flex-col">
                <header className="flex flex-col md:flex-row justify-between md:items-center pb-4 order-1">
                    <div>
                        <h1 className="text-4xl mt-0 mb-2">Watch a demo</h1>
                    </div>
                </header>
                <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded p-4 flex space-x-4 mb-4 order-3 md:order-2">
                    <span className="bg-blue rounded-full leading-none flex h-12 w-12 overflow-hidden shrink-0 basis-12">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/mine.png"
                            width={60}
                            height={60}
                            alt="Mine Kansu"
                            className="h-full w-full"
                        />
                    </span>

                    <div className="md:flex items-center md:space-x-4">
                        <p className="mb-2 md:mb-0 text-[15px]">
                            <Link to="/community/profiles/1727">Mine Kansu</Link>, from our Sales team, made this demo
                            video. If you're exploring a paid plan and have questions after checking it out, our team
                            are happy to chat!
                        </p>

                        <CallToAction type="secondary" to="/talk-to-a-human" className="whitespace-nowrap">
                            Talk to a helpful person
                        </CallToAction>
                    </div>
                </div>
                <iframe
                    src="https://www.youtube-nocookie.com/embed/2jQco8hEvTI"
                    className="rounded shadow-xl order-2 md:order-3"
                />
            </section>

            <section className="px-4 lg:pb-12 py-4 max-w-6xl mx-auto flex flex-col">
                <div className="lg:border border-light dark:border-dark lg:bg-accent dark:lg:bg-accent-dark rounded lg:py-6 lg:px-8 flex items-center mb-12 lg:mb-8">
                    <div className="w-full md:flex items-center md:space-x-4">
                        <div className="flex-1">
                            <h4 className="text-2xl mb-0">PostHog for startups</h4>
                            <p className="p-0 mb-3 lg:mb-0 text-sm lg:text-base">
                                Our startup program offers $50,000 in credits, plus other great benefits.
                            </p>
                        </div>
                        <CallToAction type="secondary" to="/startups" className="whitespace-nowrap">
                            Learn more
                        </CallToAction>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
