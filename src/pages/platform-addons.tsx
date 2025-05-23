import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import { pricingMenu } from '../navs'
import Layout from 'components/Layout'
import { usePlatform } from 'components/Pricing/Platform/usePlatform'
import { PricingTiers } from 'components/Pricing/Plans'
import { Link } from 'react-scroll'
import { CallToAction } from 'components/CallToAction'
import groupBy from 'lodash.groupby'
import { IconCheck, IconChevronDown } from '@posthog/icons'

const FeatureItem = ({ name, description, size }: { name: string; description: string; size: string }) => (
    <div className="flex gap-2">
        <div className="flex-1">
            <h4 className="text-base my-1">{name}</h4>
            <p
                className={`$${
                    size === 'small' ? 'text-sm [&_li]:text-sm' : 'text-[15px] [&_li]:text-[15px]'
                } text-primary/75 dark:text-primary-dark/75 mb-0`}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    </div>
)

const Features = ({ title, addonName, features }: { title: string; addonName: string; features: any[] }) => {
    return (
        <React.Fragment>
            <div className="md:col-span-2 pt-8 first:pt-0">
                <h3 className="text-xl pt-1 mb-0">{title}</h3>
            </div>
            {features.map((feature: any, itemIndex: number) => (
                <FeatureItem key={`${addonName}-${title}-${itemIndex}`} size="small" {...feature} />
            ))}
        </React.Fragment>
    )
}

const Addons = (): JSX.Element => {
    const platform = usePlatform()
    console.log('platform', platform)
    const platformAddons = platform.addons.filter((addon: any) => !addon.inclusion_only)

    const [showComparison, setShowComparison] = useState(false)

    const allFeatureNames: string[] = Array.from(
        new Set(platformAddons.flatMap((addon: any) => (addon.features || []).map((f: any) => f.name)))
    )

    console.log('allFeatureNames', allFeatureNames)
    return (
        <Layout parent={pricingMenu}>
            <section className="xl:w-11/12 mx-auto px-4 md:px-8 2xl:px-12 py-8 relative">
                <div className="flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex-1">
                        <h1 className="text-4xl xl:text-5xl mb-2">Platform add-ons</h1>
                        <p className="text-[17px] 2xl:text-lg font-semibold opacity-75">
                            Our platform add-ons are designed to help you manage your teams securely and efficiently on
                            PostHog as you grow.
                        </p>
                        <div className="max-w-sm rounded border border-light dark:border-dark bg-accent dark:bg-accent-dark p-4">
                            <div className="font-semibold opacity-70 mb-1">Jump to:</div>
                            <ol className="pl-6">
                                {platformAddons.map((addon: any) => (
                                    <li key={addon.name}>
                                        {/* @ts-expect-error: Link type issue */}
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
                        />
                    </aside>
                </div>

                {/* Plan comparison toggle */}
                <p
                    className="text-red dark:text-yellow font-bold cursor-pointer flex items-center justify-start mb-0 mt-4"
                    onClick={() => setShowComparison(!showComparison)}
                >
                    {showComparison ? (
                        <>
                            <IconChevronDown className="w-8 rotate-0 transition-all" />
                            Hide full plan comparison
                        </>
                    ) : (
                        <>
                            <IconChevronDown className="w-8 -rotate-90 transition-all" />
                            Show full plan comparison
                        </>
                    )}
                </p>

                {showComparison && (
                    <div className="overflow-x-auto my-6">
                        <table className="min-w-full border border-light dark:border-dark bg-white dark:bg-accent-dark text-sm">
                            <thead>
                                <tr>
                                    <th className="border border-light dark:border-dark px-3 py-2 text-left bg-accent/50 dark:bg-black/75 font-semibold text-primary/75 dark:text-primary-dark/75">
                                        Feature
                                    </th>
                                    {platformAddons.map((addon: any) => (
                                        <th
                                            key={addon.name}
                                            className="border border-light dark:border-dark px-3 py-2 bg-accent/50 dark:bg-black/75 font-semibold text-primary/75 dark:text-primary-dark/75 text-center min-w-[160px]"
                                        >
                                            {addon.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {allFeatureNames.map((featureName: string, rowIdx: number) => (
                                    <tr
                                        key={featureName}
                                        className={rowIdx % 2 === 0 ? 'bg-accent/20 dark:bg-black/10' : ''}
                                    >
                                        <td className="border border-light dark:border-dark px-3 py-2 font-semibold text-primary/75 dark:text-primary-dark/75 text-left align-middle">
                                            {featureName}
                                        </td>
                                        {platformAddons.map((addon: any) => {
                                            const feature = addon.features.find((f: any) => f.name === featureName)
                                            console.log('feature', feature)
                                            return (
                                                <td
                                                    key={addon.name}
                                                    className="border border-light dark:border-dark px-3 py-2 text-center align-middle min-w-[160px]"
                                                >
                                                    {feature ? (
                                                        <div className="flex flex-col items-center justify-center min-h-[24px] gap-y-1">
                                                            {/* Note (primary) */}
                                                            {feature.note && (
                                                                <span className="text-[15px] opacity-80">
                                                                    {feature.note}
                                                                </span>
                                                            )}
                                                            {/* Limit and unit (secondary) */}
                                                            {feature.limit && (
                                                                <span className="opacity-75 text-[13px]">
                                                                    {feature.limit} {feature.unit}
                                                                </span>
                                                            )}
                                                            {/* If neither note nor limit/unit, show checkmark */}
                                                            {!feature.note && !feature.limit && (
                                                                <IconCheck className="w-5 h-5 text-green" />
                                                            )}
                                                        </div>
                                                    ) : null}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {platformAddons.map((addon: any) => {
                    const { name, description, plans, unit, type, features } = addon
                    const plan = plans[plans.length - 1]
                    const freeAllocation = plan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to
                    const featuresByCategory = groupBy(features, (feature: any) => feature.category || 'Features')

                    return (
                        <div
                            key={name}
                            className="grid md:grid-cols-12 gap-x-12 gap-y-4 mt-12"
                            id={name.toLowerCase().replace(/\s+/g, '-')}
                        >
                            <div className="md:col-span-12 border-b border-light dark:border-dark pb-2">
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
                                            {
                                                plan?.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')
                                                    ?.unit_amount_usd
                                            }
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
                                <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
                                    {Object.keys(featuresByCategory)
                                        .sort((feature: string) => (feature === 'Features' ? -1 : 1))
                                        ?.map((category: string) => {
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
                                        <div className="border border-light dark:border-dark rounded divide-y divide-light dark:divide-dark bg-accent/50 dark:bg-accent-dark">
                                            <PricingTiers plans={plans} type={type} unit={unit} test />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
                <div className="my-12 border-t border-light dark:border-dark pt-6 flex flex-col items-center">
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
