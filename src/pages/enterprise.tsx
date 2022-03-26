import Layout from 'components/Layout'
import { Structure } from './../components/Structure'
import { CallToAction } from './../components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import CheckIcon from '../images/check.svg'

import React from 'react'
import { SEO } from '../components/seo'

const category = {
    security: [{ feature: 'Project permissions' }, { feature: 'SSO, SAML' }],
    compliance: [{ feature: 'GDPR' }, { feature: 'HIPAA' }, { feature: 'SOC II' }],
    data: [{ feature: 'Configurable backups' }, { feature: 'Custom data retention' }],
    success: [
        { feature: 'Dedicated Slack channel' },
        { feature: 'Assisted dashboard configuration' },
        { feature: 'Team training' },
        { feature: 'Monitoring setup support' },
    ],
    support: [
        { feature: 'Instance monitoring' },
        { feature: 'Infrastructure management pairing' },
        { feature: 'Assisted upgrades' },
        { feature: 'SLA w/ downtime developer pairing' },
    ],
}

const EnterpriseLandingPage = (): JSX.Element => {
    return (
        <Layout>
            <SEO
                title="Enterprise analytics by PostHog"
                description="Extra requirements for your enterprise org? PostHog does that."
            />
            <Structure.Section width="4xl" className="text-base">
                <section className="px-5">
                    <div className="text-center relative mb-8 mt-12 inline-block">
                        <StaticImage
                            src="../../contents/images/cop-hog.png"
                            alt="'Roger that.'"
                            className="absolute -right-8 md:-right-24 -bottom-12 w-24 md:w-48 z-20"
                        />

                        <div
                            className="absolute w-full left-0 z-10"
                            style={{
                                backgroundImage: 'linear-gradient(to bottom, rgba(238,239,233,0), rgba(238,239,233,1))',
                                bottom: '-1rem',
                                height: '200px',
                            }}
                        ></div>

                        <div className="text-center">
                            <StaticImage
                                src="../../contents/images/enterprise-access-control.png"
                                alt="Access control in PostHog for Enterprise"
                                className="max-w-4xl shadow"
                            />
                        </div>
                    </div>

                    <h1 className="text-center mb-4 text-3xl md:text-4xl">
                        Extra security, compliance, and data management tools{' '}
                    </h1>
                    <p className="text-lg font-semibold text-center opacity-70">
                        (Plus proactive support for your PostHog instance, and for your teams using PostHog)
                    </p>

                    <div className="flex flex-col justify-center items-center gap-2">
                        <CallToAction type="primary" width="56" to="/book-a-demo">
                            Schedule a demo
                        </CallToAction>
                        <CallToAction type="outline" width="56" to="/signup/self-host/get-in-touch#contact">
                            Contact sales
                        </CallToAction>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 mt-16 px-8 md:px-0">
                    <div className="px-0 py-12 md:px-12 md:odd:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark odd:border-b border-b first:!border-b first:border-t md:first:border-t-0">
                        <h3>Security</h3>
                        <p>
                            Configure PostHog to meet your security and data policies with granular controls over
                            authentication and user data
                        </p>

                        <ul className="columns-2 gap-4 px-0">
                            {category.security.map((item) => (
                                <li key={item.feature} className="flex items-start pt-2 first:pt-0">
                                    <img
                                        src={CheckIcon}
                                        alt="Checked"
                                        width="18"
                                        height="18"
                                        className="h-5 w-5 text-green-500 mr-2 mt-0"
                                        aria-hidden="true"
                                    />
                                    {item.feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="px-0 py-12 md:px-12 md:odd:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark odd:border-b border-b first:!border-b first:border-t md:first:border-t-0">
                        <h3>Compliance</h3>
                        <p>
                            PostHog encrypts data and can be hosted on-premise, eliminating the extra steps involved in
                            bringing on a new third party sub-processor. User data controls make it easy to comply with
                            GDPR rules.
                        </p>

                        <ul className="grid px-0">
                            {category.compliance.map((item) => (
                                <li key={item.feature} className="flex items-center pt-2 first:pt-0">
                                    <img
                                        src={CheckIcon}
                                        alt="Checked"
                                        width="18"
                                        height="18"
                                        className="h-5 w-5 text-green-500 mr-2 mt-0"
                                        aria-hidden="true"
                                    />
                                    {item.feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="px-0 py-12 md:px-12 md:odd:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark odd:border-b border-b first:!border-b first:border-t md:first:border-t-0">
                        <h3>Data management</h3>
                        <p>
                            We’ll help you configure your data and backups to control cost, while making sure you retain
                            the data you need.
                        </p>

                        <ul className="grid px-0">
                            {category.data.map((item) => (
                                <li key={item.feature} className="flex items-center pt-2 first:pt-0">
                                    <img
                                        src={CheckIcon}
                                        alt="Checked"
                                        width="18"
                                        height="18"
                                        className="h-5 w-5 text-green-500 mr-2 mt-0"
                                        aria-hidden="true"
                                    />
                                    {item.feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="px-0 py-12 md:px-12 md:odd:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark odd:border-b border-b first:!border-b first:border-t md:first:border-t-0">
                        <h3>Success</h3>
                        <p>
                            With direct support from PostHog engineers, our success team will make sure your team
                            accomplishes your objectives - not just when you start using PostHog, but on an ongoing
                            basis.
                        </p>

                        <ul className="grid px-0">
                            {category.success.map((item) => (
                                <li key={item.feature} className="flex items-center pt-2 first:pt-0">
                                    <img
                                        src={CheckIcon}
                                        alt="Checked"
                                        width="18"
                                        height="18"
                                        className="h-5 w-5 text-green-500 mr-2 mt-0"
                                        aria-hidden="true"
                                    />
                                    {item.feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="px-0 py-12 md:px-12 md:odd:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark odd:border-b border-b first:!border-b first:border-t md:first:border-t-0">
                        <h3>Support</h3>
                        <p>
                            Proactive assistance from PostHog engineers makes sure your PostHog instance is reliable,
                            secure, and up to date.
                        </p>

                        <ul className="grid px-0">
                            {category.support.map((item) => (
                                <li key={item.feature} className="flex items-center pt-2 first:pt-0">
                                    <img
                                        src={CheckIcon}
                                        alt="Checked"
                                        width="18"
                                        height="18"
                                        className="h-5 w-5 text-green-500 mr-2 mt-0"
                                        aria-hidden="true"
                                    />
                                    {item.feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4 mt-16">
                    <CallToAction type="primary" width="56" to="/book-a-demo">
                        Schedule a demo
                    </CallToAction>
                    <CallToAction type="outline" width="56" to="/signup/self-host/get-in-touch#contact">
                        Contact sales
                    </CallToAction>
                </div>
            </Structure.Section>
        </Layout>
    )
}

export default EnterpriseLandingPage
