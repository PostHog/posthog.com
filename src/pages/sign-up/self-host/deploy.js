import React, { useState } from 'react'
import Layout from 'components/SignUp/Layout'
import { section, heading } from 'components/Home/classes'
import Logo from 'components/Logo'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import Sprites from 'components/Header/Sprites'
import { CallToAction } from 'components/CallToAction'
import { Slack } from 'components/Icons/Icons'

const DeployOption = ({ title, icon }) => {
    return (
        <li className="flex space-x-2 items-center text-sm font-bold">
            <svg className="w-5 h-5 text-black dark:text-white">
                <use xlinkHref={`#${icon}`}></use>
            </svg>
            <span>{title}</span>
        </li>
    )
}

export default function SelfHost() {
    const [open, setOpen] = useState(false)
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
            <section className="px-10">
                <div className={section()}>
                    <Logo className="mx-auto" />
                    <h1 className={heading('md', 'primary', 'mt-16')}>Scale with PostHog</h1>
                </div>
                <div className="grid grid-cols-2 max-w-screen-xl mx-auto divide-x-1 divide-dashed divide-gray-accent-light border-b border-dashed border-gray-accent-light">
                    <Plan
                        title="Deploy to your infrastructure"
                        subtitle="Host your own instance of PostHog anywhere in the world."
                        className="before:!content-['1'] before:text-xl before:font-bold before:absolute before:top-9 before:left-0 before:h-10 before:w-10 before:bg-gray-accent-light before:rounded-full before:flex before:items-center before:justify-center relative"
                    >
                        <ul className="list-none p-0 grid grid-cols-2 gap-6 my-7">
                            <DeployOption title="Amazon AWS" icon="aws" />
                            <DeployOption title="Heroku" icon="heroku" />
                            <DeployOption title="Google Cloud" icon="gcs" />
                            <DeployOption title="Docker" icon="docker" />
                            <DeployOption title="Microsoft Azure" icon="azure" />
                            <DeployOption title="Helm Chart" icon="helm chart" />
                            <DeployOption title="Digital Ocean" icon="digital ocean" />
                        </ul>
                        <div className="flex justify-between items-center bg-gray-accent-light px-5 py-4 rounded-md">
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
                    <div>
                        <Plan
                            title="Get a license key"
                            subtitle="After installation, you’ll be guided to acquire a license key."
                            className="before:!content-['2'] before:text-xl before:font-bold before:absolute before:top-9 before:left-0 before:h-10 before:w-10 before:bg-gray-accent-light before:rounded-full before:flex before:items-center before:justify-center relative ml-14"
                        >
                            <CallToAction
                                size="sm"
                                type="outline"
                                className="text-dark-yellow hover:!text-dark-yellow self-start !text-opacity-100 mt-7"
                            >
                                Get a license key now
                            </CallToAction>
                        </Plan>
                    </div>
                </div>
            </section>
            <section className={section('px-10')}>
                <Plan
                    title="Questions?"
                    subtitle="Schedule a time to learn if Scale is right for you."
                    className="text-center pt-0 px-0"
                ></Plan>
            </section>
        </Layout>
    )
}
