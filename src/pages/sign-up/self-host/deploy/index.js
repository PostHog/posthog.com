import { TrackedCTA } from 'components/CallToAction/index.js'
import Contact from 'components/Contact'
import DeployOption from 'components/DeployOption'
import { section } from 'components/Home/classes'
import { Slack } from 'components/Icons/Icons'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import Deploy from 'components/SignUp/Deploy'
import Layout from 'components/SignUp/Layout'
import React from 'react'

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
            <Deploy title="Deploy PostHog">
                <Plan
                    title="Deploy to your infrastructure"
                    subtitle="Host your own instance of PostHog anywhere in the world."
                    className="col-span-full max-w-xl w-full mx-auto border border-dashed border-gray-accent-light rounded-md"
                >
                    <ul className="list-none p-0 grid grid-cols-2 gap-1 mb-6 mt-3">
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
                    <div className="flex justify-between items-center bg-gray-accent-light px-[18px] py-[16px] rounded-md flex-col xl:flex-row space-y-2 sm:space-y-0 ">
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
            </Deploy>
            <section className={section()}>
                <Plan
                    title="Questions?"
                    subtitle="Schedule a time to learn if PostHog is right for you."
                    className="text-center pt-0 px-0"
                >
                    <Contact />
                </Plan>
            </section>
        </Layout>
    )
}
