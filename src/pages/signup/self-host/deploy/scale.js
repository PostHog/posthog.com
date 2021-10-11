import { TrackedCTA } from 'components/CallToAction/index.js' // TEMP
import Contact from 'components/Contact'
import { Title } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import { section } from 'components/SignUp/classes'
import DeploymentOptions from 'components/SignUp/DeploymentOptions'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import React from 'react'

const ListNumber = ({ children }) => {
    return (
        <span className="flex-shrink-0 font-bold w-7 h-7 md:h-9 md:w-9 bg-gray-accent-light rounded-full flex items-center justify-center text-base md:text-lg">
            {children}
        </span>
    )
}

const ListItem = ({ children, className = '' }) => {
    return <li className={`flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 ${className}`}>{children}</li>
}

export default function SelfHost({ location }) {
    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                    url: '/signup',
                },
                {
                    title: 'Self-host',
                    url: '/signup/self-host',
                },
                {
                    title: 'Deploy',
                },
            ]}
        >
            <SEO title="Deploy - PostHog" />
            <section className={section('max-w-full md:border-b border-dashed border-gray-accent-light')}>
                <Intro title="Scale with PostHog" />
                <ol className="grid md:grid-cols-2 max-w-screen-xl mx-auto md:divide-x-1 divide-y-1 md:divide-y-0 divide-dashed divide-gray-accent-light p-0 m-0 list-none">
                    <ListItem>
                        <ListNumber>1</ListNumber>
                        <DeploymentOptions className="!pt-0 !pl-0 pr-0 flex-grow" />
                    </ListItem>
                    <ListItem className="md:pl-14 pt-6 md:pt-0">
                        <ListNumber>2</ListNumber>
                        <div>
                            <Title
                                className="flex-grow"
                                title="Get a license key"
                                subtitle="After installation, you’ll be guided to acquire a license key."
                            />
                            <TrackedCTA
                                href="https://license.posthog.com/"
                                size="md"
                                type="outline"
                                className="text-dark-yellow hover:!text-dark-yellow self-start !text-opacity-100 mt-7"
                                event={{ name: 'deploy: clicked Get license key' }}
                            >
                                Get a license key now
                            </TrackedCTA>
                        </div>
                    </ListItem>
                </ol>
            </section>
            <section>
                <Title
                    title="Questions?"
                    subtitle="Schedule a time to learn if Scale is right for you."
                    className="text-center"
                />
                <Contact demoType={'personal'} />
            </section>
        </Layout>
    )
}
