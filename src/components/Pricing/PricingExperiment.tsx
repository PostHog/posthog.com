import { StaticImage } from 'gatsby-plugin-image'
import React, { useState, useEffect, useRef } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from 'components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from '../seo'
import cntl from 'cntl'
import { animateScroll as scroll } from 'react-scroll'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import tractorHog from '../../../static/lotties/tractor-hog.json'
import Lottie from 'react-lottie'
import Plans, { CTA as PlanCTA, PricingTiers } from './Plans'
import Link from 'components/Link'
import CTA from 'components/Home/CTA.js'
import { IconCheck, IconHandMoney, IconInfo, IconRocket, IconStarFilled, IconStar } from '@posthog/icons'
import * as Icons from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import useProducts from './Products'
import { graphql, useStaticQuery } from 'gatsby'
import { BillingProductV2Type, BillingV2FeatureType, BillingV2PlanType } from 'types'
import Tabs from 'components/Tabs'
import { CallToAction } from 'components/CallToAction'
import Tabbed from './PricingCalculator/Tabbed'
import { usePlatform } from './Platform/usePlatform'
import { motion } from 'framer-motion'
import { PlanColumns } from './Test/PlanColumns'
import { FreePlanContent, PaidPlanContent } from './Test/PlanContent'
import { section, SectionLayout, SectionHeader, SectionColumns, SectionMainCol, SectionSidebar } from './Test/Sections'
import { PaidPricing } from './Test/PaidPricing'
import { Addons } from './Test/Addons'
import { SimilarProducts } from './Test/SimilarProducts'
import { Reviews } from './Test/Reviews'
import ImageSlider from './Test/ImageSlider'
import Header from './Test/Header'

const SidebarList = ({ children }) => <ul className="tw-chevron-bullets flex flex-col gap-1 pl-4">{children}</ul>

const SidebarListItem = ({ children }) => <li className="leading-snug text-[15px]">{children}</li>

const Discounts = () => (
    <div className="max-w-sm">
        <h4>Discounts</h4>
        <ul className="list-none m-0 p-0 divide-y divide-light dark:divide-dark">
            <li className="relative pl-7">
                <IconRocket className="size-5 absolute left-0 top-0.5 opacity-50" />
                <strong>Startups</strong>
                <p className="text-[15px]">
                    If your startup has raised less than $5 million and is less than 2 years old, you may be interested
                    in our startup program.{' '}
                    <Link href="/startups" className="text-red dark:text-yellow font-semibold">
                        Learn more
                    </Link>
                </p>
            </li>
            <li className="relative pl-7 pt-4">
                <IconHandMoney className="size-5 absolute left-0 top-4.5 opacity-50" />
                <strong>Non-profits</strong>
                <p className="text-[15px] mb-2">
                    Most non-profits are eligible for 50% off. Get in touch through the app after signing up.
                </p>
            </li>
        </ul>
    </div>
)

const getPlanPriceData = (plan) => {
    const data = {
        price: undefined,
        freeTier: undefined,
    }
    if (plan.flat_rate) {
        data.price = plan.unit_amount_usd
    } else {
        for (const [index, tier] of plan.tiers.entries()) {
            if (index === 0) {
                if (parseFloat(tier.flat_amount_usd) <= 0) {
                    data.freeTier = `First ${tier.up_to.toLocaleString()} ${plan.unit}s free every month`
                } else {
                    data.price = tier.unit_amount_usd
                    break
                }
            }
            if (index > 0) {
                data.price = tier.unit_amount_usd
                break
            }
        }
    }
    return data
}

const AddonContent = ({ name, description, plans }) => {
    const plan = plans[plans.length - 1]
    const { price, freeTier } = getPlanPriceData(plan)
    return (
        <div>
            <h5 className="m-0">{name}</h5>
            <p className="my-2">{description}</p>
            <h6 className="text-[15px] opacity-70 font-semibold m-0">Pricing</h6>
            <p className="m-0">
                <strong>${price}</strong>
                <span className="opacity-70 text-sm">/{plan.unit}</span>
            </p>
            {freeTier && <p className="opacity-70 text-sm m-0">{freeTier}</p>}
        </div>
    )
}

const AllAddons = () => {
    const platform = usePlatform()
    const products = useProducts()
    const platformAddons = platform.addons.filter((addon) => !addon.inclusion_only)
    const productAddons = products.flatMap((product) => product.addons)
    const allAddons = [...platformAddons, ...productAddons]
    const [activeTab, setActiveTab] = useState(0)
    const activeAddon = allAddons[activeTab]

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <Tabs
                vertical
                activeTab={activeTab}
                onClick={(_tab, index) => setActiveTab(index)}
                tabs={allAddons.map(({ name, icon_key, description }) => {
                    const Icon = Icons[icon_key]
                    return {
                        title: name,
                        icon: <Icon className="w-5 opacity-75" />,
                        tooltip: description,
                    }
                })}
            />
            <AddonContent {...activeAddon} />
        </div>
    )
}

export const gridCell = cntl`
    bg-white
    flex 
    flex-col 
    px-4
    xl:px-8
    shadow-xl 
`

export const gridCellTop = cntl`
    bg-white/40
    rounded-t-md
    pt-4 
    xl:pt-8 
`

export const gridCellMid = cntl`
    pt-4
    xl:pt-6
    pb-8 
`

export const gridCellBottom = cntl`
    mb-12 
    lg:mb-0 
    pb-4
    xl:pb-8
    rounded-b-md
`

export const allProductsData = graphql`
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
                                description
                                key
                                name
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
                            description
                            key
                            limit
                            name
                            note
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
`

const Pricing = ({ type, plans, unit, className = '' }) => {
    return (
        <div className={`${className} w-full mx-auto max-w-[500px]`}>
            <h3 className="text-lg mb-3">Monthly pricing</h3>
            <div className="flex flex-col divide-y divide-light dark:divide-dark gap-0.5">
                <PricingTiers plans={plans} unit={unit} type={type} test={true} />
            </div>
        </div>
    )
}

const TabAddons = (props) => {
    const addons = props.addons
    const [activeTab, setActiveTab] = useState(0)
    const activeAddon = addons[activeTab]
    return (
        <div className={props.className ?? ''}>
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-3">
                <h3 className="text-lg mb-0">{props.title ?? 'Add-ons'}</h3>
                <aside>
                    <span
                        className="text-red dark:text-yellow font-bold text-sm cursor-pointer"
                        onClick={() =>
                            window.scrollTo({
                                top:
                                    document.querySelector('#add-ons')?.getBoundingClientRect().top +
                                    window.pageYOffset -
                                    128,
                                behavior: 'smooth',
                            })
                        }
                    >
                        Learn more about add-ons
                    </span>
                </aside>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div>
                    <Tabs
                        onClick={(_tab, index) => setActiveTab(index)}
                        activeTab={activeTab}
                        vertical
                        size="sm"
                        className=""
                        tabs={addons.map(({ name, icon_key, description }) => {
                            const Icon = Icons[icon_key]
                            return { title: name, icon: <Icon className="w-5" />, tooltip: description }
                        })}
                    />
                </div>
                <div className="flex-grow divide-y divide-light dark:divide-dark gap-0.5">
                    <PricingTiers
                        plans={activeAddon.plans}
                        unit={activeAddon.unit}
                        type={activeAddon.type}
                        key={activeAddon.type}
                        test={true}
                    />
                </div>
            </div>
        </div>
    )
}

const TabPA = (props) => {
    return (
        <div className="flex flex-col @5xl:flex-row gap-8 lg:gap-16">
            <Pricing {...props} className="flex-shrink-0" />
            <TabAddons
                addons={props.addons}
                className="flex-grow max-w-3xl mx-auto"
                title="Product analytics add-ons"
            />
        </div>
    )
}

const TabSR = (props) => {
    return (
        <div>
            <Pricing {...props} />
        </div>
    )
}

const TabFF = (props) => {
    return (
        <div>
            <Pricing {...props} />
        </div>
    )
}

const TabSurveys = (props) => {
    return (
        <div>
            <Pricing {...props} />
        </div>
    )
}

const tabContent = {
    'Product analytics': TabPA,
    'Session replay': TabSR,
    'Feature flags': TabFF,
    'A/B testing': TabFF,
    Surveys: TabSurveys,
}

const ProductTabs = ({ billingProducts }) => {
    const [activeTab, setActiveTab] = useState()
    const products = useProducts()
    const activeProduct = products[activeTab ?? 0]
    const productData = billingProducts.find(({ type }) => type === activeProduct?.type)

    return (
        <div>
            <div className="text-center font-semibold text-[15px] border-t border-light dark:border-dark">
                <div className="relative -top-3 bg-tan dark:bg-dark inline-block px-3 text-primary/75 dark:text-primary-dark/75">
                    Starts at <strong>$0</strong>
                    <span className="font-normal opacity-75">/mo</span> with a{' '}
                    <span className="text-green">generous monthly free tier*</span>
                </div>
            </div>
            <Tabs
                activeTab={activeTab}
                onClick={(_tab, index) => setActiveTab(index)}
                size="sm"
                className="overflow-x-auto w-screen md:w-auto -mx-4 px-4"
                tabs={products.map(({ name, icon, price, denomination, freeLimit, message }) => ({
                    title: name,
                    subtitle: price ? (
                        <>
                            <span className="text-green font-semibold">
                                {freeLimit} {denomination}s free,
                            </span>{' '}
                            <br />
                            then <strong>${price}</strong>
                            <span className="opacity-75 text-sm font-semibold">/{denomination}</span>
                        </>
                    ) : (
                        message
                    ),
                    icon: icon,
                }))}
            />
            {activeTab !== undefined && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="@container -mt-[2px] bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md p-4 overflow-hidden h-0"
                >
                    <div key={activeProduct.name}>{tabContent[activeProduct.name]({ ...productData })}</div>
                </motion.div>
            )}
            <div className="text-center mt-4 flex flex-col gap-1 justify-center">
                {activeTab == undefined && (
                    <p className="m-0 text-sm opacity-60">
                        *Free tier resets monthly. Prices descrease exponentially with volume.
                    </p>
                )}

                <div
                    className={`text-center font-semibold text-[15px] mt-4 ${
                        activeTab === undefined && 'border-t'
                    } border-light dark:border-dark`}
                >
                    <div className="relative -top-3 bg-tan dark:bg-dark inline-block px-3">
                        <button
                            onClick={() => setActiveTab(activeTab === undefined ? 0 : undefined)}
                            className="text-red dark:text-yellow font-semibold text-sm cursor-pointer"
                        >
                            {activeTab === undefined ? 'Show' : 'Hide'} pricing breakdown
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PlansTabs = () => {
    const plans = [
        {
            name: 'Totally free',
            description: <span className="font-normal">No credit card required</span>,
            html: (
                <>
                    <h4>Use PostHog free forever, with some limits</h4>
                    <div className="grid grid-cols-3 @xl:grid-cols-5 pb-4 text-[15px] [&>*:nth-child(3)]:opacity-60">
                        <div className="px-2 pb-2 border-b border-light dark:border-dark">&nbsp;</div>
                        <div className="@xl:col-span-2 pl-1 pb-2 border-b border-light dark:border-dark">
                            <strong>Totally free</strong>
                            <br />
                            <span className="text-green font-semibold text-sm">(This plan)</span>
                        </div>
                        <div className="@xl:col-span-2 pl-2 pb-2 border-b border-light dark:border-dark text-opacity-70">
                            <strong>Ridiculously cheap</strong>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 @xl:grid-cols-5 gap-x-4 gap-y-2 text-[15px] [&>*:nth-child(3n+1)]:opacity-70 [&>*:nth-child(3n+3)]:opacity-70">
                        <div>Price</div>
                        <div className="@xl:col-span-2">Free forever</div>
                        <div className="@xl:col-span-2">Starts at $0/mo</div>

                        <div>Volume limits</div>
                        <div className="@xl:col-span-2">
                            Limited to free monthly allowance{' '}
                            <Tooltip
                                content={() => (
                                    <div className="max-w-[250px]">
                                        Usage is capped at the free tier limits for each product and resets monthly.
                                    </div>
                                )}
                                placement="top"
                            >
                                <IconInfo className="size-4 inline-block" />
                            </Tooltip>
                        </div>
                        <div className="@xl:col-span-2">Unlimited</div>

                        <div>Product features</div>
                        <div className="@xl:col-span-2">
                            Almost all the features{' '}
                            <Tooltip
                                content={() => (
                                    <div className="max-w-[320px]">
                                        <p className="mb-2 text-sm">
                                            Use each product for free without advanced features. Compare functionality
                                            limitations on each product page.
                                        </p>
                                        <p className="mb-0 text-sm">
                                            For full functionality, just enter a credit card and you'll be on the{' '}
                                            <em>Ridiculously cheap</em> plan. PostHog is still free up to the monthly
                                            free tier limits, and you can set a billing limit as low as $0.
                                        </p>
                                    </div>
                                )}
                                placement="top"
                            >
                                <IconInfo className="size-4 inline-block" />
                            </Tooltip>
                        </div>
                        <div className="@xl:col-span-2">All features</div>

                        <div>Support</div>
                        <div className="@xl:col-span-2">Standard support</div>
                        <div className="@xl:col-span-2">Priority support</div>

                        <div>
                            Add-ons{' '}
                            <Tooltip
                                content={() => (
                                    <div className="max-w-[300px]">
                                        Add-ons extend functionality of products and are priced separately.
                                    </div>
                                )}
                                placement="top"
                            >
                                <IconInfo className="size-4 inline-block" />
                            </Tooltip>
                        </div>
                        <div className="@xl:col-span-2">
                            Limited
                            <br />
                            <div className="pt-2">
                                <PlanCTA intent="free" />
                            </div>
                        </div>
                        <div className="@xl:col-span-2">Available</div>
                    </div>
                </>
            ),
        },
        {
            name: 'Ridiculously cheap',
            description: <span className="font-normal">Starts at $0/mo</span>,
            html: (
                <>
                    <h4 className="mb-0">The "ridiculously cheap" plan</h4>
                    <p className="text-sm inline-flex rounded-sm bg-yellow/25 py-0.5 px-1">
                        86% of customers use this plan
                    </p>
                    <ul className="tw-check-bullets @lg:columns-2 pb-2">
                        <li>Usage-based pricing</li>
                        <li>Generous monthly free tier</li>
                        <li>Up to 6 projects</li>
                        <li>7-year data retention</li>
                        <li>Email and community support</li>
                        <li>Unlimited team members</li>
                        <li>Unlimited tracked users</li>
                    </ul>
                    <PlanCTA intent="paid" />
                </>
            ),
        },
        {
            name: 'Enterprise mode',
            description: <span className="font-normal">$20k/yr minimum spend</span>,
            html: (
                <>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="mb-2">
                                <strong>
                                    Everything in <em>Ridiculously cheap</em> plus:
                                </strong>
                            </div>
                            <ul className="tw-check-bullets">
                                <li>SAML SSO enforcement</li>
                                <li>Custom MSA</li>
                                <li>Priority training, support</li>
                                <li>Advanced permissions</li>
                                <li>Audit logs</li>
                            </ul>
                        </div>
                        <div className="relative pb-20 md:pb-0">
                            <div className="mb-2">
                                <strong>How it works</strong>
                            </div>
                            <ul className="tw-chevron-bullets [&_li]:text-sm">
                                <li>Starts at $20k/year w/ fixed annual terms</li>
                                <li>Annual contract with minimum commitment</li>
                                <li>No upcharge on usage-based prices</li>
                            </ul>
                            <div className="pt-4 md:mb-20 xl:mb-0 relative z-20">
                                <CallToAction
                                    href="/talk-to-a-human"
                                    size="md"
                                    event={{
                                        name: `clicked Talk to a helpful person`,
                                        type: 'cloud',
                                        intent: 'enterprise',
                                    }}
                                >
                                    Talk to a helpful person
                                </CallToAction>
                            </div>
                            <div className="absolute -bottom-4 -right-4">
                                <div className="relative flex">
                                    <Tooltip
                                        content={() => (
                                            <div className="max-w-sm">
                                                <Link
                                                    href="/community/profiles/28895"
                                                    className="text-red dark:text-yellow text-[15px]"
                                                >
                                                    <strong className="block">Simon Fisher</strong>
                                                </Link>
                                                <p className="mb-0 text-sm opacity-75">Customer Success</p>
                                            </div>
                                        )}
                                        placement="top"
                                    >
                                        <div className="relative size-20 top-0 hover:top-[-.3rem] hover:scale-[1.1] transition-all">
                                            <StaticImage
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1688575173/simon_bb4af1b047.png"
                                                quality={100}
                                                alt="Simon Fisher, Customer Success"
                                                placeholder="none"
                                                objectFit="contain"
                                                className=""
                                            />
                                        </div>
                                    </Tooltip>

                                    <Tooltip
                                        content={() => (
                                            <div className="max-w-sm">
                                                <Link
                                                    href="/community/profiles/28622"
                                                    className="text-red dark:text-yellow text-[15px]"
                                                >
                                                    <strong className="block">Cameron DeLeone</strong>
                                                </Link>
                                                <p className="mb-0 text-sm opacity-75">Customer Success</p>
                                            </div>
                                        )}
                                        placement="top"
                                    >
                                        <div className="relative size-[5.5rem] -ml-7 -mr-8 -mt-2 top-0 hover:top-[-.3rem] hover:scale-[1.1] transition-all">
                                            <StaticImage
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1685570037/cameron_bc0de38765.png"
                                                quality={100}
                                                alt="Cameron DeLeone, Customer Success"
                                                placeholder="none"
                                                objectFit="contain"
                                                className=""
                                            />
                                        </div>
                                    </Tooltip>

                                    <Tooltip
                                        content={() => (
                                            <div className="max-w-sm">
                                                <Link
                                                    href="/community/profiles/29862"
                                                    className="text-red dark:text-yellow text-[15px]"
                                                >
                                                    <strong className="block">Mine Kansu</strong>
                                                </Link>
                                                <p className="mb-0 text-sm opacity-75">Customer Success Manager</p>
                                            </div>
                                        )}
                                        placement="top"
                                    >
                                        <div className="relative size-20 top-0 hover:top-[-.2rem] hover:scale-[1.075] transition-all">
                                            <StaticImage
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1704468198/Mine_dc7d915835.png"
                                                quality={100}
                                                alt="Mine Kansu, Customer Success Manager"
                                                placeholder="none"
                                                objectFit="contain"
                                                className=""
                                            />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
    ]

    const [activeTab, setActiveTab] = useState(0)
    const activePlan = plans[activeTab]

    return (
        <div>
            <div className="overflow-x-auto w-screen md:w-auto -mx-4 md:mx-0 px-4 md:px-3 relative z-10">
                <Tabs
                    activeTab={activeTab}
                    onClick={(_tab, index) => setActiveTab(index)}
                    size="sm"
                    className="transition-all w-[fit-content] md:w-full md:!px-3"
                    tabs={plans.map(({ name, description, html }) => ({
                        title: name,
                        subtitle: description,
                        html: html,
                    }))}
                />
            </div>
            {activeTab !== undefined && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="@container -mt-[2px] bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md p-4 overflow-hidden"
                >
                    {[activePlan.html]}
                </motion.div>
            )}
        </div>
    )
}

const FreeTierItem = ({ icon, icon2, name, allocation, description }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-1 items-center leading-none">
                {icon}
                {icon2 && <>+ {icon2}</>}
            </div>
            <strong className="text-[15px] text-center leading-none mt-2 mb-1">{name}</strong>
            <div
                className={`text-sm text-center text-balance leading-none ${description ? 'opacity-75' : 'text-green'}`}
            >
                {description ? description : allocation}
            </div>
        </div>
    )
}

const PricingExperiment = ({
    groupsToShow,
    currentProduct,
}: {
    groupsToShow: undefined | string[]
    currentProduct?: string | null
}): JSX.Element => {
    const [animateFreeTiers, setAnimateFreeTiers] = useState(false)
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const products = useProducts()
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const platformAndSupportProduct = billingProducts.find(
        (product: BillingProductV2Type) => product.type === 'platform_and_support'
    )
    const highestSupportPlan = platformAndSupportProduct?.plans?.slice(-1)[0]

    const [isPlanComparisonVisible, setIsPlanComparisonVisible] = useState(false)

    const [activePlan, setActivePlan] = useState('free')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const plan = params.get('plan')
        if (plan === 'free' || plan === 'paid') {
            setActivePlan(plan)
        }
    }, [])

    const handleFreePlanClick = () => {
        setActivePlan('free')
        window.history.pushState(null, '', '?plan=free')
    }

    const handlePaidPlanClick = () => {
        setActivePlan('paid')
        window.history.pushState(null, '', '?plan=paid')
    }

    return (
        <>
            <SelfHostOverlay open={currentModal === 'self host'} setOpen={setCurrentModal} />
            <SEO title="PostHog pricing" description="Find out how much it costs to use PostHog" />

            {!currentProduct && (
                <>
                    <div className="md:flex md:flex-wrap md:w-full mdlg:grid grid-cols-16 my-8 px-4 2xl:px-12">
                        <div className="col-span-3 lg:col-span-4 mb-4 md:mb-0 md:border-b border-light dark:border-dark">
                            <div className="md:hidden mb-2">
                                <Header />
                            </div>

                            {/* <div className="aspect-square bg-accent dark:bg-accent-dark w-full flex items-center justify-center">
                                image
                            </div> */}
                            <ImageSlider />
                        </div>

                        <div className="@container md:flex-1 col-span-8 lg:col-span-7 lgxl:col-span-8 md:border-b border-light dark:border-dark md:pl-8 md:mr-8">
                            <div className="hidden md:block">
                                <Header />
                            </div>

                            <p className="mb-4">
                                PostHog is designed to grow with you. With 8 products (and counting), go from idea to
                                product/market fit to IPO and beyond. 🚀
                            </p>

                            <p className="mb-4">
                                Our generous free tier means{' '}
                                <strong>
                                    <em>98% of companies use PostHog for free.</em>
                                </strong>{' '}
                                Only add a card if you need more than the free tier limits or want more projects.
                            </p>

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

                            <ul className="list-none flex flex-col @md:flex-row gap-2 p-0 -mx-4 px-4 md:mx-0 pb-1 md:pb-0 md:px-0 mb-6 overflow-x-auto">
                                <li>
                                    <button
                                        onClick={handleFreePlanClick}
                                        className={`w-full flex flex-col py-2 px-4 rounded-md border-2 @md:min-w-56 ${
                                            activePlan === 'free'
                                                ? 'border-yellow bg-white dark:bg-white/5'
                                                : 'border-light hover:border-dark/50 dark:border-dark dark:hover:border-light/50 bg-transparent'
                                        }`}
                                    >
                                        <strong className="whitespace-nowrap">Totally free</strong>
                                        <span className="text-sm opacity-75 whitespace-nowrap">
                                            Free - no credit card required
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handlePaidPlanClick}
                                        className={`w-full flex flex-col py-2 px-4 rounded-md border-2 @md:min-w-56 ${
                                            activePlan === 'free'
                                                ? 'border-light hover:border-dark/50 dark:border-dark dark:hover:border-light/50 bg-transparent'
                                                : 'border-yellow bg-white dark:bg-white/5'
                                        }`}
                                    >
                                        <strong className="whitespace-nowrap">Ridiculously cheap</strong>
                                        <span className="text-sm opacity-75 whitespace-nowrap">
                                            Usage-based pricing
                                        </span>
                                    </button>
                                </li>
                            </ul>

                            <div className="@container border-t border-light dark:border-dark mt-4 py-4">
                                <div className="flex items-baseline gap-1 mb-3">
                                    <h4 className="mb-0 text-lg">Free tier on all plans</h4>
                                    <span className="opacity-75 text-sm">(resets monthly)</span>
                                </div>

                                <div
                                    className={`grid grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 mb-2 gap-4 @lg:gap-x-2 @lg:gap-y-2 ${
                                        animateFreeTiers ? 'animate-flash' : ''
                                    }`}
                                    onAnimationEnd={() => setAnimateFreeTiers(false)}
                                >
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
                                        name="A/B testing"
                                        description="Billed with feature flags"
                                        icon={<Icons.IconFlask className="text-purple size-5" />}
                                    />
                                    <FreeTierItem
                                        name="Surveys"
                                        allocation="250 responses"
                                        icon={<Icons.IconMessage className="text-red size-5" />}
                                    />
                                    <FreeTierItem
                                        name="Data warehouse"
                                        allocation="1M rows"
                                        icon={<Icons.IconDatabase className="text-purple size-5" />}
                                    />
                                </div>
                            </div>
                        </div>

                        <aside className="col-span-5 lgxl:col-span-4">
                            <div className="bg-white dark:bg-white/5 rounded-md border border-light dark:border-dark py-4 px-6 h-full">
                                <div className="flex flex-col justify-between h-full">
                                    {activePlan === 'free' ? (
                                        <FreePlanContent
                                            onFreeTierClick={() => {
                                                setAnimateFreeTiers(true)
                                            }}
                                        />
                                    ) : (
                                        <PaidPlanContent
                                            onFreeTierClick={() => {
                                                setAnimateFreeTiers(true)
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </aside>
                    </div>

                    <PaidPricing />

                    <PlanColumns billingProducts={billingProducts} highlight="free" />

                    <Addons />
                    <SimilarProducts />
                    <Reviews />

                    <SectionLayout>
                        <SectionHeader>
                            <h3 id="calculator">Pricing calculator</h3>
                        </SectionHeader>
                        <Tabbed />

                        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-7xl mx-auto">
                            <div>
                                <h4 className="text-lg mb-2">How our pricing works</h4>
                                <SidebarList>
                                    <SidebarListItem>Only pay for products you use</SidebarListItem>
                                    <SidebarListItem>
                                        <strong className="bg-yellow/50 dark:bg-white/20 italic inline py-0.5">
                                            Generous free tier for each product (resets monthly)
                                        </strong>
                                    </SidebarListItem>
                                    <SidebarListItem>
                                        You can set billing limits per product so you never get a surprise bill
                                    </SidebarListItem>
                                    <SidebarListItem>
                                        We also offer{' '}
                                        <Tooltip content={() => <Discounts />} placement="top">
                                            <strong className="text-red dark:text-yellow border-b border-dashed border-light dark:border-dark cursor-help text-primary/75 dark:text-primary-dark/75">
                                                discounts
                                            </strong>
                                        </Tooltip>{' '}
                                        for startups and non-profits
                                    </SidebarListItem>
                                </SidebarList>
                            </div>
                            <div>
                                <h4 className="text-lg mb-2">Estimating usage</h4>
                                <SidebarList>
                                    <SidebarListItem>
                                        Not sure what your volume looks like? Add the tracking code to your site and
                                        check back in a few days – no credit card required.
                                    </SidebarListItem>
                                    <SidebarListItem>
                                        If something stupid happens, like you get an unexpected bill and you’re unhappy,
                                        we’ll pretty much always refund it!
                                    </SidebarListItem>
                                </SidebarList>
                            </div>
                        </div>
                    </SectionLayout>

                    <SectionLayout>
                        <div className="bg-accent dark:bg-accent-dark p-4 pb-6 md:pb-4 rounded border border-light dark:border-dark flex flex-col md:flex-row justify-between md:items-center gap-4 -mt-4">
                            <div>
                                <h3 className="mb-1 text-xl">Give PostHog a try</h3>
                                <p className="mb-0 text-[15px]">
                                    No need to pick a plan - try our free version and decide if you want advanced
                                    features later!
                                </p>
                            </div>
                            <div>
                                <PlanCTA />
                            </div>
                        </div>
                    </SectionLayout>

                    <section className="bg-white text-dark shadow-xl rounded pt-6 pb-2 md:py-8 px-8 md:px-12 mx-6 md:mx-auto w-[calc(100%_-_3rem)] md:w-full max-w-3xl -rotate-1">
                        <SectionHeader>
                            <p className="opacity-60 text-[15px] mb-2">A note from our co-founder</p>
                            <h3>Our pricing is designed to make you happy</h3>
                        </SectionHeader>

                        <p className="mt-4">Here's what you should know about our pricing:</p>
                        <ul className="space-y-1 mb-4 [&_li]:leading-7 pl-4 md:pl-8">
                            <li>
                                <strong>We make a profit with every product.</strong> This means we don’t have
                                loss-leader products that will go up in pricing later or get retired.
                            </li>
                            <li>
                                <strong>We aim to be the cheapest for each product at every scale</strong> compared to
                                every major competitor.{' '}
                                <Link
                                    iconClasses="!text-dark"
                                    href="https://twitter.com/intent/tweet?text=@posthog%20Your%20pricing%20is..."
                                    external
                                >
                                    <em>Tell us if we're not!</em>
                                </Link>{' '}
                                (Note: This doesn't include your buddy's two person startup.)
                            </li>
                            <li>
                                The company in general has significant revenue, over 60,000 customers, runs{' '}
                                <Link href="/newsletter/the-companies-that-shaped-posthog#our-takeaways-2">
                                    default alive
                                </Link>
                                , and aims to IPO rather than sell. This means{' '}
                                <strong>we don’t rely on investors to grow, and we’re stable.</strong> Of course we
                                aren’t perfect, but this goes a long way to avoiding the average dumb vc-backed company
                                stuff in general - like running out of money or selling to a lame bigger company who
                                just kills off our products.
                            </li>
                            <li>
                                We have an open source product too - so if you must, you can self host. It is MIT
                                licensed if you want to use it in a big organization that isn’t ready to move to PostHog
                                Cloud yet.
                                <Tooltip
                                    content={() => (
                                        <div className="max-w-sm">
                                            <strong className="block">A disclaimer about self-hosting</strong>
                                            <p className="mb-2 text-sm">
                                                Being upfront, self-hosting PostHog has limitations and is usually a
                                                worse experience (and more expensive) than PostHog Cloud.
                                            </p>
                                            <p className="mb-0 text-sm">
                                                Main benefits of PostHog Cloud include our large, shared infrastructure
                                                and lack of separate hosting costs, required maintenance, and upgrades
                                                that come with self-hosting.
                                            </p>
                                        </div>
                                    )}
                                >
                                    <IconInfo className="size-4 inline-block relative left-0.5 -top-0.5" />
                                </Tooltip>
                            </li>
                        </ul>
                        <p className="mb-4">If this makes you happy – like most people - just start here:</p>
                        <p>
                            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                                <PlanCTA />
                                <em className="opacity-75 text-sm">No credit card required</em>
                            </div>
                        </p>
                        <p>
                            Or if you need more info,{' '}
                            <button
                                className="text-red dark:text-yellow font-semibold"
                                onClick={() =>
                                    window.scrollTo({
                                        top:
                                            document.querySelector('#faq')?.getBoundingClientRect().top +
                                            window.pageYOffset -
                                            128,
                                        behavior: 'smooth',
                                    })
                                }
                            >
                                read our FAQ
                            </button>
                            , <Link href="/questions/topic/pricing">ask a question</Link>, or{' '}
                            <Link href="/talk-to-a-human">talk to a human</Link>.
                        </p>

                        <div className="flex gap-2 items-center">
                            <Link
                                href="/community/profiles/27732"
                                className="rounded-full overflow-hidden size-12 border border-border hover:border-bg-dark/30 dark:border-dark dark:hover:border-light/50 p-0.5 bg-light dark:bg-dark"
                            >
                                <StaticImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/v1683655764/james_b841adce96.png"
                                    quality={100}
                                    alt="James Hawkins, CEO, Co-founder"
                                    placeholder="none"
                                    objectFit="contain"
                                    className="bg-yellow rounded-full"
                                />
                            </Link>
                            <p className="leading-tight mb-0">
                                <Link href="/community/profiles/27732" className="flex">
                                    <strong>James Hawkins</strong>
                                </Link>
                                <span className="text-sm opacity-70">Co-founder</span>
                            </p>
                        </div>
                        <p className="pl-14 text-sm opacity-75 italic">
                            When James isn't thinking about how to cut prices (again), you'll likely find him changing a
                            diaper.
                        </p>
                    </section>
                </>
            )}

            {currentProduct && (
                <section className={`${section} mb-12 mt-8 md:px-4 overflow-auto`}>
                    <Plans showTitle groupsToShow={groupsToShow} />
                </section>
            )}

            {!currentProduct && (
                <>
                    <section id="faq" className={`${section} mb-20 mt-12 md:px-4`}>
                        <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-light dark:border-dark">Pricing FAQ</h2>
                        <FAQs />
                        <p className="my-6 pt-6 relative before:w-48 before:absolute before:top-0 before:left-0 before:border-t before:border-light before:dark:border-dark before:h-px">
                            Have another pricing-related question?{' '}
                            <Link href="/questions/topic/pricing">Ask in our community forum</Link>
                        </p>
                    </section>

                    <section className="relative">
                        <CTA />
                    </section>
                </>
            )}

            <section className="bg-primary my-12 md:px-4">
                <Quote
                    className="py-12 md:py-16 px-5 bg-primary"
                    name={<span className="text-white">Cat Li</span>}
                    title={<span className="text-white">Product & Engineering Lead, Y Combinator</span>}
                    image={
                        <StaticImage
                            width={100}
                            height={100}
                            alt="Cat Li, Y Combinator"
                            src="../../images/cat.jpeg"
                            placeholder="none"
                            className="rounded-full"
                        />
                    }
                    quote={
                        <span className="text-white">
                            You always need to find ways to improve.{' '}
                            <span className="text-yellow">
                                PostHog is central to how we do that at{' '}
                                <span className="inline-block">Y Combinator</span>.
                            </span>{' '}
                            It helps us try ideas, measure results, and build better products.
                        </span>
                    }
                />
            </section>
            <section className={`${section} mb-12 mt-16`}>
                <div className="sm:flex-row flex-col-reverse flex items-center sm:items-start justify-center">
                    <StaticImage src="./images/vacation-hog.png" alt="Vacation Hog" width={252} placeholder="none" />
                    <div className="text-center bg-[#2D2D2D] p-4 rounded-md relative sm:rotate-6 sm:-mr-8 flex-shrink-0">
                        <p className="text-white m-0 text-[18px] font-bold font-comic">
                            Looking for the signup button?
                        </p>
                        <p className="text-[15px] mt-0 mb-2 text-white font-comic">(I’ll take you there.)</p>
                        <button
                            onClick={() => scroll.scrollToTop()}
                            className="mx-auto flex space-x-2 items-center bg-red text-[15px] font-bold text-white px-3 py-2 rounded-sm relative active:top-[1px] active:scale-[.97]"
                        >
                            <span>Beam me up!</span>
                            <svg
                                width="17"
                                height="23"
                                viewBox="0 0 17 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.7211 16.9033V4.24645L14.1749 6.70024C14.6354 7.14428 15.366 7.13788 15.8183 6.6865C16.2697 6.23421 16.2761 5.50358 15.832 5.04306L11.3787 0.58972C10.9209 0.132854 10.1793 0.132854 9.72153 0.58972L5.26819 5.04306C4.82415 5.50358 4.83055 6.23421 5.28284 6.6865C5.73514 7.13789 6.46576 7.14428 6.92537 6.70024L9.37729 4.24645V16.9033C9.37729 18.5989 8.00301 19.9742 6.30636 19.9742C4.61072 19.9742 3.23637 18.599 3.23637 16.9033H0.892505C0.892505 18.8379 1.92434 20.6251 3.5999 21.592C5.27447 22.5597 7.33906 22.5597 9.01375 21.592C10.6892 20.6251 11.7211 18.8379 11.7211 16.9033H11.7211Z"
                                    fill="white"
                                />
                                <path d="M3.04878 15.0117V15.9493H0.70492V15.0117H3.04878Z" fill="white" />
                                <path d="M3.04878 13.1367V14.0743H0.70492V13.1367H3.04878Z" fill="white" />
                                <path d="M3.04878 7.51123V8.44878H0.70492V7.51123H3.04878Z" fill="white" />
                                <path d="M3.04878 9.38672V10.3243H0.70492V9.38672H3.04878Z" fill="white" />
                                <path d="M3.04878 11.2617V12.1993H0.70492V11.2617H3.04878Z" fill="white" />
                            </svg>
                        </button>
                        <svg
                            className="absolute right-2 sm:left-2 sm:right-auto -bottom-5 -scale-x-1"
                            width="35"
                            height="29"
                            viewBox="0 0 35 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M34.0329 28.7305L28.9422 2.03952L0.169405 0.617765C0.169405 0.617765 12.4378 8.50347 18.738 13.9774C25.0381 19.4513 34.0329 28.7305 34.0329 28.7305Z"
                                fill="#2D2D2D"
                            />
                        </svg>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PricingExperiment
