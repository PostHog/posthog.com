import React, { useState, useEffect } from 'react'
import { PRODUCT_COUNT } from '../../../constants'
import { section, SectionLayout, SectionHeader, SectionColumns, SectionMainCol, SectionSidebar } from './Sections'
import Header from '../Test/Header'
import { graphql, useStaticQuery } from 'gatsby'
import { Link as ScrollLink } from 'react-scroll'
import * as Icons from '@posthog/icons'
import FreeTierItem from './FreeTierItem'
import PlanContent from './PlanContent'

interface PricingHeroProps {
    activePlan: string
    setActivePlan: (plan: string) => void
}

const PricingHero = ({ activePlan, setActivePlan }: PricingHeroProps): JSX.Element => {
    const handleFreePlanClick = () => {
        setActivePlan('free')
        window.history.pushState(null, '', '?plan=free')
    }

    const handlePaidPlanClick = () => {
        setActivePlan('paid')
        window.history.pushState(null, '', '?plan=paid')
    }
    const [animateFreeTiers, setAnimateFreeTiers] = useState(false)
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(graphql`
        query {
            allProductData {
                nodes {
                    products {
                        description
                        docs_url
                        image_url
                        icon_key
                        inclusion_only
                        contact_support
                        addons {
                            contact_support
                            description
                            docs_url
                            image_url
                            icon_key
                            inclusion_only
                            name
                            type
                            unit
                            plans {
                                description
                                docs_url
                                image_url
                                name
                                plan_key
                                product_key
                                unit
                                flat_rate
                                unit_amount_usd
                                features {
                                    key
                                    name
                                    description
                                    category
                                    limit
                                    note
                                    entitlement_only
                                    is_plan_default
                                    unit
                                }
                                tiers {
                                    current_amount_usd
                                    current_usage
                                    flat_amount_usd
                                    unit_amount_usd
                                    up_to
                                }
                            }
                        }
                        name
                        type
                        unit
                        usage_key
                        plans {
                            description
                            docs_url
                            features {
                                key
                                name
                                description
                                category
                                limit
                                note
                                entitlement_only
                                is_plan_default
                                unit
                            }
                            free_allocation
                            image_url
                            included_if
                            name
                            plan_key
                            product_key
                            contact_support
                            unit_amount_usd
                            tiers {
                                current_amount_usd
                                current_usage
                                flat_amount_usd
                                unit_amount_usd
                                up_to
                            }
                            unit
                        }
                    }
                }
            }
        }
    `)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const plan = params.get('plan')
        if (plan === 'free' || plan === 'paid') {
            setActivePlan(plan)
        }
    }, [setActivePlan])

    return (
        <>
            <div className="hidden md:block">
                <Header />
            </div>

            <p className="mb-4">
                PostHog is designed to grow with you. Our <strong>{PRODUCT_COUNT}+ products</strong> (and counting) will
                take you from idea to product-market fit to IPO and beyond. 🚀
            </p>

            <p className="mb-4">
                Our generous free tier means{' '}
                <strong>
                    <em>more than 90% of companies use PostHog for free.</em>
                </strong>{' '}
                Only add a card if you need more than the free tier limits, advanced features, or want more projects.
                You still keep the same monthly free volume, even after upgrading.
            </p>

            <div className="not-prose max-w-xs @sm:min-w-2xs @md:max-w-none @md:inline-block">
                <div className="flex justify-between items-end gap-4">
                    <div>
                        {activePlan === 'free' ? (
                            <>
                                <h3 className="mb-0 text-xl">Free</h3>
                                <p className="text-sm mb-4">No credit card required</p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm mb-0">From</p>
                                <h3 className="mb-4 text-xl">
                                    $0<span className="opacity-70 font-normal text-base">/mo</span>
                                </h3>
                            </>
                        )}
                    </div>
                    <div>
                        <a href="#plans" className="inline-block mb-4">
                            <button className="cursor-pointer text-sm font-semibold underline">Compare plans</button>
                        </a>
                    </div>
                </div>

                <ul className="list-none flex flex-col @md:flex-row gap-2 p-0 -mx-4 px-4 md:mx-0 pb-1 md:pb-0 md:px-0 md:mb-6 overflow-x-auto">
                    <li>
                        <button
                            onClick={handleFreePlanClick}
                            className={`w-full flex flex-col py-2 px-4 rounded-md border-2 items-start @md:min-w-56 ${
                                activePlan === 'free'
                                    ? 'border-yellow bg-white dark:bg-white/5'
                                    : 'border-primary bg-transparent'
                            }`}
                        >
                            <strong className="whitespace-nowrap">Free</strong>
                            <span className="text-sm opacity-75 whitespace-nowrap">Free - no credit card required</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handlePaidPlanClick}
                            className={`w-full flex flex-col py-2 px-4 rounded-md border-2 items-start @md:min-w-56 ${
                                activePlan === 'free'
                                    ? 'border-primary bg-transparent'
                                    : 'border-yellow bg-white dark:bg-white/5'
                            }`}
                        >
                            <strong className="whitespace-nowrap">Pay-as-you-go</strong>
                            <span className="text-sm opacity-75 whitespace-nowrap">Usage-based pricing</span>
                        </button>
                    </li>
                </ul>
            </div>

            <div className="@5xl/reader-content:hidden not-prose border border-primary rounded-md p-4 mb-4 bg-light dark:bg-accent">
                <PlanContent activePlan={activePlan} onFreeTierClick={() => setAnimateFreeTiers(true)} isMainColumn />
            </div>

            <div className="hidden @5xl/reader-content:block border-t border-primary pt-4 h-px"></div>

            <div
                className={`not-prose @container transition-all rounded-md border ${
                    animateFreeTiers
                        ? 'animate-flash bg-[#FAE9CE] dark:bg-[#463B2A] border-yellow -mx-2 -mt-1 px-2 pt-1'
                        : 'bg-transparent border-transparent'
                }`}
                onAnimationEnd={() => setAnimateFreeTiers(false)}
            >
                <div className="flex items-baseline gap-1 mb-3">
                    <h4 className="mb-0 text-lg">Free tier on all plans</h4>
                    <span className="opacity-75 text-sm">(resets monthly)</span>
                </div>

                <div className="grid grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 mb-2 gap-4 @lg:gap-x-2 @lg:gap-y-2">
                    <FreeTierItem
                        name="Analytics"
                        allocation="1M events"
                        icon={<Icons.IconGraph className="text-blue size-5" />}
                        icon2={<Icons.IconPieChart className="text-green size-5" />}
                    />
                    <FreeTierItem
                        name="Session replay"
                        allocation="5K recordings"
                        icon={<Icons.IconRewindPlay className="text-yellow size-5" />}
                    />
                    <FreeTierItem
                        name="Feature flags"
                        allocation="1M requests"
                        icon={<Icons.IconToggle className="text-seagreen size-5" />}
                    />
                    <FreeTierItem
                        name="Experiments"
                        description="Billed with feature flags"
                        icon={<Icons.IconFlask className="text-purple size-5" />}
                    />
                    <FreeTierItem
                        name="Error tracking"
                        allocation="100K exceptions"
                        icon={<Icons.IconWarning className="text-orange size-5" />}
                    />
                    <FreeTierItem
                        name="Surveys"
                        allocation="1500 responses"
                        icon={<Icons.IconMessage className="text-red size-5" />}
                    />
                    <FreeTierItem
                        name="Data warehouse"
                        allocation="1M rows"
                        icon={<Icons.IconDatabase className="text-purple size-5" />}
                    />
                </div>
            </div>
        </>
    )
}

export default PricingHero
