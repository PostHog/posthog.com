import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { pricingMenu } from '../navs'
import Layout from 'components/Layout'
import { IconAdvanced } from '@posthog/icons'
import useProducts from 'components/Pricing/Products'
import { PricingTiers } from 'components/Pricing/Plans'
import { Link } from 'react-scroll'
import { CallToAction } from 'components/CallToAction'
import groupBy from 'lodash.groupby'

const FeatureItem = ({ name, description, size }) => (
    <div className="flex gap-2">
        <div className="flex-1">
            <h4 className="text-base my-1">{name}</h4>
            <p
                className={`${size === 'small' ? 'text-sm [&_li]:text-sm' : 'text-[15px] [&_li]:text-[15px]'
                    } text-secondary mb-0`}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    </div>
)

const addons = [
    {
        name: 'Data pipelines',
        features: [
            {
                group: 'Benefits',
                items: [
                    {
                        name: 'Send event data to a data warehouse!!',
                        description:
                            'If you have a data lake or data warehouse, you can use destinations to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Library of pre-built templates',
                        description:
                            'Choose from hundreds of pre-built templates, including Slack, Discord, Customer.io, and more.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Customizability with Hog',
                        description: 'Use our powerful Hog language to write completely custom destinations.',
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
                            "Like when they sign up for your product or use different devices - enables analyzing the user's path",
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Store custom properties on users',
                        description: 'Use these properties in cohorts, session replay, experiments, and feature flags',
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

const Features = ({ title, addonName, features }) => {
    return (
        <React.Fragment>
            <div>
                <h3 className="text-xl pt-1 mb-0">{title}</h3>
            </div>
            {features.map((feature, itemIndex) => (
                <FeatureItem key={`${addonName}-${title}-${itemIndex}`} {...feature} />
            ))}
        </React.Fragment>
    )
}

const Addons = (): JSX.Element => {
    const products = useProducts()
    const productAddons = products.flatMap((product) => product.addons)
    const allAddons = productAddons

    return (
        <Layout parent={pricingMenu}>
            <section className="xl:w-11/12 mx-auto px-4 md:px-8 2xl:px-12 py-8 relative">
                <div className="flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex-1">
                        <h1 className="text-4xl xl:text-5xl mb-2">Add-ons</h1>
                        <p className="text-[17px] 2xl:text-lg font-semibold opacity-75">
                            We've moved specialized functionality into add-ons so you never pay for things you don't
                            need.
                        </p>
                        <div className="max-w-sm rounded border border-primary bg-accent p-4">
                            <div className="font-semibold opacity-70 mb-1">Jump to:</div>
                            <ol className="pl-6">
                                {allAddons.map((addon) => (
                                    <li key={addon.name}>
                                        <Link
                                            to={addon.name.toLowerCase().replace(/\s+/g, '-')}
                                            smooth={true}
                                            duration={500}
                                            offset={-127}
                                            spy={true}
                                            hashSpy={true}
                                            className="cursor-pointer"
                                        >
                                            {addon.name}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <aside className="max-w-full -mt-6 md:mt-0 md:max-w-xs mdlg:max-w-sm lg:max-w-lg lg:-my-6 flex justify-end">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/add_ons_a700ab577f.png"
                            alt="Add-ons"
                            objectFit="contain"
                        />
                    </aside>
                </div>
                {allAddons.map((addon) => {
                    const { name, description, plans, unit, type, features } = addon
                    const plan = plans[plans.length - 1]
                    const freeAllocation = plan?.tiers?.find((tier) => tier.unit_amount_usd === '0')?.up_to
                    const featuresByCategory = groupBy(features, (feature) => feature.category || 'Features')
                    const customAddon = addons.find((a) => a.name === name)

                    return (
                        <div
                            key={name}
                            className="grid md:grid-cols-12 gap-x-12 gap-y-4 mt-12"
                            id={name.toLowerCase().replace(/\s+/g, '-')}
                        >
                            <div className="md:col-span-12 border-b border-primary pb-2">
                                <h2 className="mb-1">{name}</h2>
                            </div>
                            <div className="md:col-span-4 md:sticky top-[120px] self-start">
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
                                <div className="grid gap-x-8 gap-y-3 md:grid-cols-1">
                                    {customAddon
                                        ? customAddon.features?.map((feature) => {
                                            return (
                                                <Features
                                                    key={`${name}-${feature.group}`}
                                                    addonName={name}
                                                    features={feature.items}
                                                    title={feature.group}
                                                />
                                            )
                                        })
                                        : Object.keys(featuresByCategory)
                                            .sort((feature) => (feature === 'Features' ? -1 : 1))
                                            ?.map((category) => {
                                                const features = featuresByCategory[category]
                                                return (
                                                    <Features
                                                        key={`${name}-${category}`}
                                                        title={category}
                                                        addonName={name}
                                                        features={features}
                                                    />
                                                )
                                            })}
                                </div>
                                {!plan?.flat_rate && (
                                    <div className="max-w-[400px] mt-8">
                                        <h5 className="mb-2 text-lg">Pricing breakdown</h5>
                                        <div className="border border-primary rounded divide-y divide-primary bg-accent">
                                            <PricingTiers plans={plans} type={type} unit={unit} test />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
                <div className="my-12 border-t border-primary pt-6 flex flex-col items-center">
                    <p>Subscribe to add-ons after signing up.</p>

                    <CallToAction
                        type="primary"
                        size="lg"
                        width="64"
                        to={`https://app.posthog.com/signup`}
                        className="animate-grow-sm"
                    >
                        Get started
                    </CallToAction>
                </div>
            </section>
        </Layout>
    )
}

export default Addons
