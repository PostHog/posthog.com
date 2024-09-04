import React from 'react'
import { pricingMenu } from '../navs'
import Layout from 'components/Layout'
import { IconAdvanced } from '@posthog/icons'
import { usePlatform } from 'components/Pricing/Platform/usePlatform'
import useProducts from 'components/Pricing/Products'
import { PricingTiers } from 'components/Pricing/Plans'
import Link from 'components/Link'

const FeatureItem = ({ icon: Icon, name, description, size }) => (
    <div className="flex gap-2">
        <div className="shrink-0">
            <Icon className="size-8" />
        </div>
        <div className="flex-1">
            <h4 className="text-base my-1">{name}</h4>
            <p
                className={`${size === 'small' ? 'text-sm [&_li]:text-sm' : 'text-[15px] [&_li]:text-[15px]'} text-primary/75 dark:text-primary-dark/75 mb-0`}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    </div>
)

const addons = [
    {
        name: 'Teams',
        features: [
            {
                group: 'Features',
                items: [
                    {
                        name: 'Unlimited projects',
                        description:
                            'Create silos of data within PostHog. All data belongs to a single project and all queries are project-specific.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Managed reverse proxy',
                        description:
                            'Use our managed proxy service to send events through your own domain. Capture more usage data that might otherwise be intercepted by ad blockers without needing to set up and maintain the proxy yourself.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'White labeling',
                        description: 'Use your own branding on surveys, shared dashboards, shared insights, and more.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Ingestion taxonomy',
                        description:
                            'Mark events as verified or unverified to help you understand the quality of your data.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Dashboard tags',
                        description: 'Organize dashboards with tags.',
                        icon: IconAdvanced,
                    },
                ],
            },
            {
                group: 'Security',
                items: [
                    {
                        name: 'Enforce SSO login',
                        description:
                            'Users can only sign up and log in to your PostHog organization with your specified SSO provider.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Enforce 2FA',
                        description: 'Require all users in your organization to enable two-factor authentication.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Automatic provisioning',
                        description:
                            'Verify your domains to enforce SSO and automatically add users with matching email addresses to your organization.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Project permissions',
                        description: 'Restrict access to data within the organization to only those who need it.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Advanced permissions',
                        description: 'Control who can access and modify data and features within your organization.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Security assessment',
                        description: 'Security assessment',
                        icon: IconAdvanced,
                    },
                ],
            },
            {
                group: 'Compliance',
                items: [
                    {
                        name: 'Audit logs',
                        description: 'See who in your organization has accessed or modified entities within PostHog.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'HIPAA BAA',
                        description:
                            'Get a signed HIPAA Business Associate Agreement (BAA) to use PostHog in a HIPAA-compliant manner.',
                        icon: IconAdvanced,
                    },
                ],
            },
            {
                group: 'Support',
                items: [
                    {
                        name: 'Priority support',
                        description:
                            'Get help from our team faster than other customers with a 12-hour response time target',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Personalized onboarding',
                        description:
                            'Get help from our team to create dashboards that will help you understand your data and your business.',
                        icon: IconAdvanced,
                    },
                ],
            },
        ],
    },
    {
        name: 'Data pipelines',
        features: [
            {
                group: 'Benefits',
                items: [
                    {
                        name: 'Send event data to a data warehouse',
                        description:
                            'If you have a data lake or data warehouse, you can use destinations to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Enforce event schemas',
                        description:
                            'By default, PostHog does not enforce schemas on events it receives. However, a transformation could do so, preventing ingestion of events that do not match the specified schema in order to keep your data clean and following specific guidelines you need it to follow.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Label events',
                        description:
                            'To facilitate sorting through your events, you can use transformations to determine arbitrary logic to label an event (e.g. by setting a label property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data elsewhere.',
                        icon: IconAdvanced,
                    },
                ],
            },
        ],
    },
    {
        name: 'Group analytics',
        features: [
            {
                group: 'Examples of how to use groups',
                items: [
                    {
                        name: 'B2B SaaS app',
                        description:
                            'Aggregate events at an account-level. Calculate metrics like:<ul><li>number of daily active companies</li><li>company churn rate</li><li>How many companies have adopted a new feature.</li></ul>',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Collaborative, project-based services',
                        description:
                            'For project-based products like Notion, Jira, or Figma, create a project group type to calculate:<ul><li>metrics at a project level</li><li>users per project</li><li>project engagement</li></ul>',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Communication-based apps',
                        description:
                            'For a product like Slack, you can create a channel group type to measure:<ul><li>the average number of messages per channel</li><li>the number of monthly active channels</li><li>total number of channel participants</li></ul>',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Social media apps',
                        description:
                            'For a social network-type product, create a post group type to measure:<ul><li>average number of replies per post</li><li>total count of unique posters per month</li></ul>',
                        icon: IconAdvanced,
                    },
                ],
            },
        ],
    },
    {
        name: 'Person profiles',
        features: [
            {
                group: 'What can I do with person profiles?',
                items: [
                    {
                        name: 'Merge anonymous users with their eventual identified user',
                        description:
                            'Like when they sign up for your product or use different devices - enables analyzing the user\'s path',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Store custom properties on users',
                        description:
                            'Use these properties in cohorts, session replay, experiments, and feature flags',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Create user-specific insights in Product analytics',
                        description:
                            '<ul><li>How many times specific users click an element on a page</li><li>Group cohorts of users by device type, location, or property</li><li>Filter to interactions on a specific page by specific users</li></ul>',
                        icon: IconAdvanced,
                    },
                ],
            },
        ],
    },
]

const Addons = (): JSX.Element => {
    const platform = usePlatform()
    const products = useProducts()
    const platformAddons = platform.addons.filter((addon) => !addon.inclusion_only)
    const productAddons = products.flatMap((product) => product.addons)
    const allAddons = [...platformAddons, ...productAddons]

    return (
        <Layout parent={pricingMenu}>
            <section className="w-11/12 mx-auto px-4 2xl:px-12 py-8">
                <h1 className="text-4xl 2xl:text-5xl mb-1">Addons</h1>
                <p className="text-lg font-semibold opacity-75">
                    We've moved specialized functionality into add-ons so you never pay for things you don't need.
                </p>
                <div className="max-w-sm rounded border border-light dark:border-dark bg-accent dark:bg-accent-dark p-4">
                    <div>Table of contents</div>
                    <ul>
                        {allAddons.map((addon) => (
                            <li key={addon.name}>
                                <Link to={`#${addon.name.toLowerCase().replace(/\s+/g, '-')}`}>{addon.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {allAddons.map((addon) => {
                    const { name, description, plans, unit, type } = addon
                    const plan = plans[plans.length - 1]
                    const freeAllocation = plan?.tiers?.find((tier) => tier.unit_amount_usd === '0')?.up_to

                    return (
                        <div key={name} className="grid md:grid-cols-12 gap-12 pt-16">
                            <div className="md:col-span-4 md:sticky top-[120px] self-start">
                                <h2 id={name.toLowerCase().replace(/\s+/g, '-')}>{name}</h2>
                                <p className="text-[15px]">{description}</p>
                                {plan?.flat_rate ? (
                                    <div className="flex items-baseline">
                                        <strong className="text-xl">${plan.unit_amount_usd.replace('.00', '')}</strong>
                                        <span className="text-[15px] opacity-60">/mo</span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="opacity-70 text-sm">Pricing starts at</span>{' '}
                                        <strong>
                                            $
                                            {plan?.tiers?.find((tier) => tier.unit_amount_usd !== '0')?.unit_amount_usd}
                                        </strong>
                                        <span className="opacity-70 text-sm">/{unit}</span>
                                    </>
                                )}
                                {freeAllocation && (
                                    <p className="m-0 text-green text-sm">
                                        First <strong>{freeAllocation?.toLocaleString()}</strong> {unit}s/mo free
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-8">
                                <div className={`grid gap-x-8 gap-y-4 ${name === "Teams" ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                                    {addons
                                        .find((addon) => addon.name === name)
                                        ?.features?.map((featureGroup, groupIndex) => (
                                            <React.Fragment key={groupIndex}>
                                                <div className={name === "Teams" ? 'md:col-span-2' : ''}>
                                                    <h3 className="text-lg pt-1 mb-0">{featureGroup.group}</h3>
                                                </div>
                                                {featureGroup.items.map((feature, itemIndex) => (
                                                    <FeatureItem key={`${groupIndex}-${itemIndex}`} size={name === "Teams" ? 'small' : ''} {...feature} />
                                                ))}

                                            </React.Fragment>
                                        ))}
                                </div>
                                {!plan?.flat_rate && (
                                    <div className="max-w-[400px] mt-8">
                                        <h5 className="m-0">Price</h5>
                                        <div className="-ml-2 lg:-ml-4">
                                            <PricingTiers plans={plans} type={type} unit={unit} test />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </section>
        </Layout>
    )
}

export default Addons
