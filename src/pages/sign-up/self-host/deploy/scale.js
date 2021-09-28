import cntl from 'cntl'
import { TrackedCTA } from 'components/CallToAction/index.js' // TEMP
import Contact from 'components/Contact'
import DeployOption from 'components/DeployOption'
import { section } from 'components/Home/classes'
import { Slack } from 'components/Icons/Icons'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import Deploy from 'components/SignUp/Deploy'
import Layout from 'components/SignUp/Layout'
import React from 'react'

const styledNumbers = (className = '') => cntl`
    before:font-bold
    before:top-auto
    md:before:top-0
    md:before:translate-x-[calc(-100%-20px)]
    md:before:absolute
    before:mr-2
    md:before:mr-0
    before:h-10
    before:w-10
    before:bg-gray-accent-light
    before:rounded-full
    before:flex
    before:items-center
    before:justify-center
    before:flex-shrink-0
    before:scale-75
    md:before:scale-100
    before:transform
    relative
    flex
    items-center
    ${className}
`

export default function SelfHost({ location }) {
    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                    url: '/sign-up',
                },
                {
                    title: 'Self-host',
                    url: '/sign-up/self-host',
                },
                {
                    title: 'Deploy',
                },
            ]}
        >
            <SEO title="Deploy - PostHog" />
            <Deploy title="Scale with PostHog">
                <Plan
                    title="Deploy to your infrastructure"
                    subtitle="Host your own instance of PostHog anywhere in the world."
                    titleClassName={styledNumbers(`before:!content-['1']`)}
                    className="border-b border-dashed border-gray-accent-light"
                >
                    <ul className="list-none p-0 grid grid-cols-2 gap-1 my-7">
                        <DeployOption title="Amazon AWS" icon="aws" url="/docs/self-host/deploy/aws" />
                        <DeployOption title="Google Cloud" icon="gcs" url="/docs/self-host/deploy/gcp" />
                        <DeployOption title="Helm Chart" icon="helm chart" url="/docs/self-host/deploy/other" />
                        <DeployOption
                            title="Digital Ocean"
                            icon="digital ocean"
                            url="/docs/self-host/deploy/digital-ocean"
                        />
                        <DeployOption title="Source" icon="github" url="https://github.com/PostHog/posthog" />
                    </ul>
                    <div className="flex justify-between items-center bg-gray-accent-light px-5 py-4 rounded-md flex-col xl:flex-row space-y-2 sm:space-y-0 ">
                        <p className="m-0 font-bold">Deployment questions?</p>
                        <TrackedCTA
                            size="sm"
                            type="outline"
                            className="bg-white flex space-x-2 items-center font-bold"
                            to="/slack"
                            event={{ name: 'deploy: clicked Join Slack' }}
                        >
                            <Slack className="w-4 h-4" />
                            <span>Join our Slack</span>
                        </TrackedCTA>
                    </div>
                </Plan>
                <div className="md:border-b border-dashed border-gray-accent-light">
                    <Plan
                        title="Get a license key"
                        subtitle="After installation, you’ll be guided to acquire a license key."
                        className="md:ml-14"
                        titleClassName={styledNumbers(`before:!content-['2']`)}
                    >
                        <TrackedCTA
                            href="https://license.posthog.com/"
                            size="sm"
                            type="outline"
                            className="text-dark-yellow hover:!text-dark-yellow self-start !text-opacity-100 mt-7"
                            event={{ name: 'deploy: clicked Get license key' }}
                        >
                            Get a license key now
                        </TrackedCTA>
                    </Plan>
                </div>
            </Deploy>
            <section className={section('md:my-0 my-0')}>
                <Plan
                    title="Questions?"
                    subtitle="Schedule a time to learn if Scale is right for you."
                    className="text-center !py-0 !px-0"
                >
                    <Contact demoType={'personal'} />
                </Plan>
            </section>
        </Layout>
    )
}
