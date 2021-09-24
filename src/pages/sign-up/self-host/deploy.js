import React, { useState } from 'react'
import Layout from 'components/SignUp/Layout'
import { section, heading } from 'components/Home/classes'
import Logo from 'components/Logo'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import Sprites from 'components/Header/Sprites'
import { CallToAction } from 'components/CallToAction'
import { Slack } from 'components/Icons/Icons'
import Link from 'components/Link'
import DeployOption from 'components/DeployOption'
import cntl from 'cntl'

const styledNumbers = (className = '') => cntl`
    before:text-md
    md:before:text-xl
    before:font-bold
    md:before:absolute
    before:top-auto
    md:before:top-9
    before:left-auto
    md:before:left-0
    before:h-7
    before:w-7
    md:before:h-10
    md:before:w-10
    before:bg-gray-accent-light
    before:rounded-full
    before:flex
    before:items-center
    before:justify-center
    before:mb-2
    md:before:mb-0
    relative
    ${className}
`

export default function SelfHost({ location }) {
    const [open, setOpen] = useState(false)
    const { state } = location
    const scale = state?.scale
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
            <Sprites />
            <section className={section('px-4 md:px-10')}>
                <div className={section()}>
                    <Logo className="mx-auto" />
                    <h1 className={heading('md', 'primary', 'mt-16')}>Scale with PostHog</h1>
                </div>
                <div className="grid md:grid-cols-2 max-w-screen-xl mx-auto md:divide-x-1 divide-dashed divide-gray-accent-light border-b border-dashed border-gray-accent-light">
                    <Plan
                        style={
                            !scale
                                ? {
                                      gridColumn: '1 / -1',
                                      maxWidth: 600,
                                      width: '100%',
                                      margin: '0 auto',
                                      paddingTop: 0,
                                  }
                                : {}
                        }
                        title="Deploy to your infrastructure"
                        subtitle="Host your own instance of PostHog anywhere in the world."
                        className={scale && styledNumbers(`before:!content-['1']`)}
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
                            <CallToAction
                                size="sm"
                                type="outline"
                                className="bg-white flex space-x-2 items-center font-bold"
                                to="/slack"
                            >
                                <Slack className="w-4 h-4" />
                                <span>Join our Slack</span>
                            </CallToAction>
                        </div>
                    </Plan>
                    {scale && (
                        <div>
                            <Plan
                                title="Get a license key"
                                subtitle="After installation, you’ll be guided to acquire a license key."
                                className={styledNumbers(`before:!content-['2'] md:ml-14`)}
                            >
                                <CallToAction
                                    href="https://license.posthog.com/"
                                    size="sm"
                                    type="outline"
                                    className="text-dark-yellow hover:!text-dark-yellow self-start !text-opacity-100 mt-7"
                                >
                                    Get a license key now
                                </CallToAction>
                            </Plan>
                        </div>
                    )}
                </div>
            </section>
            <section className={section('px-4 md:px-10')}>
                <Plan
                    title="Questions?"
                    subtitle="Schedule a time to learn if Scale is right for you."
                    className="text-center pt-0 px-0"
                ></Plan>
            </section>
        </Layout>
    )
}
