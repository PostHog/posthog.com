import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState, useRef, useEffect } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from 'components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from 'components/seo'
import cntl from 'cntl'
import Link from 'components/Link'
import { Info } from 'components/Icons/Icons'
import { CloudIcon, SelfHostIcon } from 'components/Pricing/Calculator/index'
import { animateScroll as scroll, Link as ScrollLink } from 'react-scroll'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import EnterpriseOverlay from 'components/Pricing/Overlays/Enterprise'
import WhyCloud from 'components/Pricing/Overlays/WhyCloud'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { useActions, useValues } from 'kea'
import { CallToAction, TrackedCTA } from 'components/CallToAction'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import ProductIcons from 'components/ProductIcons'
import { PricingSlider } from 'components/Pricing/PricingSlider'
import Enterprise from './Modals/Enterprise'
import AllPlansTest from './AllPlansTest'
import { pricing, pricingLabels } from './constants'

const Benefit = ({ children, icon }) => {
    return (
        <li className="font-medium text-[15px] flex gap-x-2 items-center leading-tight">
            {icon && <span className="w-[24px] flex justify-center items-center flex-shrink-0 mt-[2px]">{icon}</span>}
            <span>{children}</span>
        </li>
    )
}

const Check = () => {
    return (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.9947 5.52548L6.4635 8.99428L14.7025 0.75528C15.2095 0.24824 16.0369 0.24824 16.5439 0.75528L17.3259 1.53732C17.833 2.04436 17.833 2.8717 17.3259 3.37872L7.46034 13.2443C6.95566 13.749 6.13534 13.7521 5.62674 13.2521L0.389145 8.10213C0.126645 7.84509 -0.00381509 7.52713 8.49096e-05 7.15995C0.00399111 6.79277 0.141491 6.47791 0.408685 6.22635L1.18056 5.49979C1.69306 5.01775 2.49696 5.02947 2.99462 5.52714L2.9947 5.52548Z"
                fill="#000"
            />
        </svg>
    )
}

export const section = cntl`
    max-w-6xl
    mx-auto
    px-4
    md:px-0
`

const Button = ({
    onClick,
    children,
    active,
}: {
    onClick?: () => void
    children: React.ReactNode
    active?: boolean
}) => {
    return (
        <button
            className={`text-lg font-bold flex items-center flex-grow sm:flex-grow-0 sm:w-[186px] justify-between px-4 py-2 bg-white rounded-sm shadow-sm text-black/70 hover:text-black/95 relative active:top-[1px] active:scale-[.97] active:border-[2.5px] active:border-red transition-none ${
                active ? 'border-red' : 'border-white'
            } border-[2.5px] transition-colors`}
            onClick={onClick}
        >
            <span>{children}</span>

            <svg
                className={`${active ? 'opacity-100' : 'opacity-0'} transition-none`}
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.9947 5.52548L6.4635 8.99428L14.7025 0.75528C15.2095 0.24824 16.0369 0.24824 16.5439 0.75528L17.3259 1.53732C17.833 2.04436 17.833 2.8717 17.3259 3.37872L7.46034 13.2443C6.95566 13.749 6.13534 13.7521 5.62674 13.2521L0.389145 8.10213C0.126645 7.84509 -0.00381509 7.52713 8.49096e-05 7.15995C0.00399111 6.79277 0.141491 6.47791 0.408685 6.22635L1.18056 5.49979C1.69306 5.01775 2.49696 5.02947 2.99462 5.52714L2.9947 5.52548Z"
                    fill="#F54E00"
                />
            </svg>
        </button>
    )
}

const B2C = () => {
    return (
        <div className="col-span-3 border-dashed border-gray-accent border py-2 mt-2 text-center px-4 bg-black bg-opacity-[2%]">
            B2C company with insane event volume?{' '}
            <Link to="/signup/b2c" className="font-bold text-orange inline-block">
                Apply for a discount
            </Link>
        </div>
    )
}

const features = [
    { title: 'Advanced product analytics', icon: ProductIcons.analytics },
    { title: 'Session recording', icon: ProductIcons.sessionRecording },
    { title: 'Multivariate feature flags', icon: ProductIcons.featureFlags },
    { title: 'API access', icon: ProductIcons.api },
    { title: 'Heatmaps', icon: ProductIcons.heatmaps },
    { title: 'A/B testing', icon: ProductIcons.abTesting },
    { title: 'Correlation analysis', icon: ProductIcons.correlationAnalysis },
    { title: 'Group analytics', icon: ProductIcons.groupAnalytics },
    { title: 'Advanced path analysis', icon: ProductIcons.pathAnalysis },
    { title: 'Event taxonomy', icon: ProductIcons.events },
    { title: 'Dashboard tagging', icon: ProductIcons.dashboards },
]

const Plan = ({ title, subtitle, features, limitations, pricing, cta, demo, setWhyCloudOpen, className = '' }) => {
    return (
        <div
            className={`relative flex flex-col lg:w-1/3 py-8 rounded-md border-[3px] ${
                title === 'PostHog Cloud' ? 'bg-white px-10 border-red' : 'border-transparent px-10 lg:px-0'
            } ${className}`}
        >
            <div className="mb-5">
                <h2 className="text-xl mb-1 flex items-center">
                    {title}
                    {title === 'PostHog Cloud' && (
                        <span className="absolute -top-[3px] right-3 bg-red inline-flex text-sm px-3 py-2 rounded-[3px] font-semibold ml-2 space-x-1">
                            <span className="text-white font-bold">Recommended</span>
                            <button onClick={() => setWhyCloudOpen(true)} className="text-white">
                                <Info />
                            </button>
                        </span>
                    )}
                </h2>
                <p className="mb-2 text-sm text-black/50 leading-tight">{subtitle}</p>
            </div>
            <div className="mb-5">
                <h3 className="mb-4 text-sm text-black/50 leading-tight">Features</h3>
                <ul className="list-none p-0 m-0 grid gap-y-2">
                    {features.map(({ title, icon }) => {
                        return (
                            <Benefit key={title} icon={icon}>
                                {title}
                            </Benefit>
                        )
                    })}
                </ul>

                {title === 'PostHog Open Source' && (
                    <div className="border border-dashed border-gray-accent-light p-3 rounded mt-4">
                        <p className="text-sm mb-1">
                            <strong>On a budget?</strong>
                        </p>
                        <p className="text-sm mb-1">
                            <em>PostHog Cloud</em> is cheaper* than <em>Open Source</em> since you don't have to pay
                            hosting costs.
                        </p>
                        <p className="text-xs mb-0">*Free up to 1 million events/mo</p>
                    </div>
                )}
            </div>
            <div className="!mt-auto pt-4">
                <div className="mb-5">
                    <h3 className="mb-4 text-sm text-black/50 leading-tight">Project limitations</h3>
                    <ul className="list-none p-0 m-0 grid gap-y-3">
                        {limitations.map((limitation, index) => {
                            return <Benefit key={index}>{limitation}</Benefit>
                        })}
                    </ul>
                </div>
                <h3 className="mb-2 text-sm text-black/50 leading-tight">Pricing</h3>
                {pricing}
                <div className="mt-4">
                    <TrackedCTA
                        event={{
                            name: `clicked ${cta.children}`,
                            type: 'cloud',
                        }}
                        width="full"
                        className="shadow-md"
                        to="https://app.posthog.com/signup"
                        {...cta}
                    />
                    <TrackedCTA
                        event={{
                            name: `clicked ${demo.children}`,
                            type: 'cloud',
                        }}
                        state={{ demoType: 'scale' }}
                        type="secondary"
                        width="full"
                        className="shadow-md mt-2"
                        to="/book-a-demo"
                        {...demo}
                    />
                </div>
            </div>
        </div>
    )
}

const Breakdown = ({ planName, ctas }) => {
    const breakdown = pricing[planName]
    const { cloudCost, cloudEnterpriseCost } = useValues(pricingSliderLogic)
    return (
        <div className="mt-auto">
            <h4 className="text-base m-0 pb-2 font-bold">
                Pay per event <span className="font-normal">(monthly)</span>
            </h4>

            <ul className="grid gap-y-1 m-0 p-0">
                {breakdown.map((price, index) => {
                    const label = pricingLabels[price[0]]
                    return (
                        <li
                            key={index}
                            className="flex items-center space-x-2 justify-between opacity-50 border-b border-dashed border-gray-accent-light pb-2 last:pb-0 last:border-b-0"
                        >
                            <p className="text-[14px] font-medium m-0">{label || '100 million - 1 billion'}</p>
                            <p className="text-[14px] font-medium m-0">
                                {price[1] === 0
                                    ? planName === 'cloud-enterprise'
                                        ? '$450 (flat fee)'
                                        : 'Free'
                                    : `$${price[1]}`}
                            </p>
                        </li>
                    )
                })}
            </ul>
            <div className="flex justify-between pt-2 mt-4">
                <div className="flex flex-col">
                    <strong className="text-[16px]">Monthly estimate</strong>
                    <span className="text-sm text-black/60">for 1,000,000 events/mo</span>
                </div>
                <div>
                    <strong className="text-[18px] text-black">
                        ${planName === 'cloud-enterprise' ? cloudEnterpriseCost || 450 : cloudCost}
                    </strong>
                    <span className="text-sm text-black/60">/mo</span>
                </div>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
                {ctas.map((cta, index) => (
                    <TrackedCTA
                        key={index}
                        event={{
                            name: `clicked ${cta.children}`,
                        }}
                        size="sm"
                        {...cta}
                    />
                ))}
            </div>
        </div>
    )
}

const PricingBreakdown = () => {
    return (
        <section className={`${section} mt-12 md:px-4`}>
            <h2
                id="pricing-breakdown"
                className="text-2xl m-0 flex items-center mb-4 pb-4 border-b border-gray-accent-light border-dashed"
            >
                Pricing breakdown
            </h2>
            <div className="flex lg:space-x-8 lg:space-y-0 space-y-4 items-start lg:flex-row flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 flex-grow sm:gapy-y-0 gap-y-8 sm:gap-x-8">
                    <div className="flex flex-col">
                        <div>
                            <h4 className="text-base m-0 font-semibold text-black/50">Self-serve plans</h4>
                            <ul className="list-none m-0 p-0 mt-2 mb-5 space-y-1">
                                <li className="flex items-center text-base font-bold space-x-2">
                                    <CloudIcon className="w-5 h-5 opacity-50 ml-1" />
                                    <span>PostHog Cloud</span>
                                </li>
                                <li className="flex items-center text-base font-bold space-x-1">
                                    <SelfHostIcon className="w-5 h-5 inline-block opacity-50 mx-1" />
                                    <span>PostHog Self-Hosted</span>
                                </li>
                            </ul>
                        </div>
                        <Breakdown
                            planName="cloud"
                            ctas={[
                                {
                                    children: 'Try PostHog Cloud',
                                    to: 'https://app.posthog.com/signup',
                                },
                                {
                                    children: 'Try PostHog Self-Hosted',
                                    to: 'https://license.posthog.com/',
                                },
                            ]}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <h4 className="text-base m-0 font-semibold text-black/50">For enterprises</h4>
                            <div className="mt-2 mb-5">
                                <p className=" text-base font-bold m-0">
                                    <CloudIcon className="w-5 h-5 inline-block opacity-50" /> or{' '}
                                    <SelfHostIcon className="w-5 h-5 inline-block opacity-50 mx-1" />
                                    with Enterprise package
                                </p>
                                <p className="text-sm text-black/50 m-0 mt-2">
                                    Adds{' '}
                                    <strong className="font-semibold">
                                        SSO, advanced permissions, and dedicated Slack support
                                    </strong>{' '}
                                    to PostHog Cloud or PostHog Self-Hosted
                                </p>
                            </div>
                        </div>
                        <Breakdown
                            planName="cloud-enterprise"
                            ctas={[
                                {
                                    children: 'Enterprise Cloud - Get in touch',
                                    to: '/signup/cloud/enterprise',
                                },
                                {
                                    children: 'Try Enterprise Self-Hosted',
                                    to: 'https://license.posthog.com/?price_id=price_1L1AeWEuIatRXSdzj0Y5ioOU',
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className="lg:max-w-[280px] w-full flex-shrink-0 bg-white p-5 rounded-md box-border">
                    <h4 className="text-base m-0 pb-1">Estimate your cost</h4>
                    <div>
                        <p className="text-sm font-bold m-0 text-black/60">Monthly event volume</p>
                        <div className="font-bold text-lg">999,999,999</div>
                        <div className="mb-8 mt-3">
                            <PricingSlider
                                marks={[1000000, 2000000, 10000000, 100000000, 1000000000]}
                                min={1000000}
                                max={1000000000}
                            />
                        </div>
                        <p className="text-sm pb-0 m-0">
                            Need help estimating your event volume?{' '}
                            <Link className="font-semibold" to="/blog/calculating-events-from-users">
                                Read this handy guide
                            </Link>
                        </p>
                        <p className="mt-4 pt-4 border-t text-sm border-gray-accent-light border-dashed mb-0">
                            B2C company with insane event volume? <br className="lg:hidden" />
                            <Link to="/signup/b2c" className="font-bold text-red inline-block">
                                Apply for a discount
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Test = (): JSX.Element => {
    const [selfHost, setSelfHost] = useState(false)
    const [enterprise, setEnterprise] = useState(false)
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [showVolumeDiscounts, setShowVolumeDiscounts] = useState(false)
    const [showPlanBuilder, setShowPlanBuilder] = useState(false)
    const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false)
    const [whyCloudOpen, setWhyCloudOpen] = useState(false)
    const builderRef = useRef<HTMLDivElement>()

    const [enterpriseMode, setEnterpriseMode] = useState(false)
    const { setPricingOption } = useActions(pricingSliderLogic)

    const limitations = {
        cloud: [
            'Unlimited projects',
            'User permissions',
            <>
                <button className="text-red font-semibold" onClick={() => setCurrentModal('enterprise')}>
                    Enterprise package
                </button>{' '}
                available
            </>,
        ],
        selfHosted: [
            'Unlimited projects',
            'User permissions',
            <>
                <button className="text-red font-semibold" onClick={() => setCurrentModal('enterprise')}>
                    Enterprise package
                </button>{' '}
                available
            </>,
        ],
        openSource: ['1 project', 'User permissions'],
    }

    const handleEnterpriseModeChange = (checked: boolean) => {
        setPricingOption(checked ? 'cloud-enterprise' : 'cloud')
        setEnterpriseMode(checked)
    }

    const handleInfo = (currentModal: string) => {
        setCurrentModal(currentModal)
    }

    useEffect(() => {
        if (showPlanBuilder) builderRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [showPlanBuilder])

    return (
        <Layout>
            <SelfHostOverlay open={currentModal === 'self host'} setOpen={setCurrentModal} />
            <EnterpriseOverlay open={currentModal === 'enterprise'} setOpen={setCurrentModal} />
            <WhyCloud open={whyCloudOpen} setOpen={setWhyCloudOpen} />
            <Enterprise open={enterpriseModalOpen} setOpen={setEnterpriseModalOpen} />
            <SEO title="PostHog Pricing" description="First 1 million events are free - every month" />
            <section>
                <div
                    className={`grid lg:grid-cols-2 lg:mt-12 md:mt-18 lg:gap-x-4 gap-y-3 lg:gap-y-0 mb-4 md:px-4 md:mb-16 ${section}`}
                >
                    <div className="lg:order-2">
                        <StaticImage
                            alt="The cutest hedgehog you've ever seen driving a red tractor"
                            src="./images/tractor-hog.png"
                            className="lg:-mt-4 xl:-mt-12 max-w-screen-sm"
                            loading="eager"
                            placeholder="none"
                        />
                    </div>
                    <div className="lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl mt-0 mb-6">
                            All versions of PostHog come with:
                        </h1>
                        <div className="inline-grid grid-cols-2 gap-4">
                            <ul className="m-0 p-0 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="w-6 h-6 shrink-1">{ProductIcons.eventPipelines}</span>
                                    <span className="grow-1 text-sm">Event pipelines</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-6 h-6 shrink-1">{ProductIcons.eventAutocapture}</span>
                                    <span className="grow-1 text-sm">Event autocapture</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-6 h-6 shrink-1">{ProductIcons.dataWarehouse}</span>
                                    <span className="grow-1 text-sm">Data warehouse sync</span>
                                </li>
                            </ul>
                            <ul className="m-0 p-0 space-y-2">
                                <li className="flex items-center gap-2 h-6">
                                    <span className="w-4 shrink-1 opacity-50">
                                        <Check />
                                    </span>
                                    <span className="grow-1 text-sm">Unlimited tracked events</span>
                                </li>
                                <li className="flex items-center gap-2 h-6">
                                    <span className="w-4 shrink-1 opacity-50">
                                        <Check />
                                    </span>
                                    <span className="grow-1 text-sm">Unlimited tracked users</span>
                                </li>
                                <li className="flex items-center gap-2 h-6">
                                    <span className="w-4 shrink-1 opacity-50">
                                        <Check />
                                    </span>
                                    <span className="grow-1 text-sm">Unlimited seats</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex px-4 lg:space-x-6 lg:space-y-0 space-y-4 max-w-6xl mx-auto lg:flex-row flex-col">
                <Plan
                    className="lg:order-none order-last"
                    title="PostHog Open Source"
                    subtitle="You host, free forever"
                    features={[
                        { title: 'Basic product analytics', icon: ProductIcons.analytics },
                        { title: 'Session recording', icon: ProductIcons.sessionRecording },
                        { title: 'Basic feature flags', icon: ProductIcons.featureFlags },
                        { title: 'API access', icon: ProductIcons.api },
                    ]}
                    limitations={['1 project', 'No user permissions', ' ', ' ', ' ']}
                    cta={{
                        children: 'Deployment options',
                        to: '/signup/self-host/deploy',
                    }}
                    demo={{
                        children: 'Join a group demo',
                        state: { demoType: 'group' },
                        to: '/book-a-demo',
                    }}
                    pricing={
                        <>
                            <p className="m-0">
                                <strong>Free</strong>
                            </p>
                            <p className="m-0 inline-block text-sm mb-4 lg:mb-[32px]">
                                <span className="opacity-70">Hosting not included.</span>{' '}
                                <Link to="/docs/self-host/deploy/hosting-costs">Estimate your cost</Link>
                            </p>
                            <p className="my-1 text-sm hidden lg:block">&nbsp;</p>
                        </>
                    }
                />
                <Plan
                    setWhyCloudOpen={setWhyCloudOpen}
                    title="PostHog Cloud"
                    subtitle="SaaS solution managed by the PostHog core team"
                    features={features}
                    limitations={limitations['cloud']}
                    cta={{
                        children: 'Get started - free',
                        to: 'https://app.posthog.com/signup',
                    }}
                    demo={{
                        children: 'Book a demo',
                        state: { demoType: 'scale' },
                        to: '/book-a-demo',
                    }}
                    pricing={
                        <>
                            <p className="m-0">
                                <strong>$0.00045</strong>
                                <span className="text-[13px] opacity-50">/event</span>
                            </p>
                            <p className="bg-yellow/50 m-0 mt-1 inline-block px-2 py-1 rounded-sm font-semibold text-sm">
                                First 1 million events free - every month
                            </p>
                            <p className="m-0 mt-2 font-semibold text-sm">
                                <ScrollLink smooth to="pricing-breakdown" className="cursor-pointer">
                                    See pricing breakdown and volume discounts
                                </ScrollLink>
                            </p>
                            <p className="m-0 inline-block text-sm">&nbsp;</p>
                        </>
                    }
                />
                <Plan
                    title="PostHog Self-Hosted"
                    subtitle="Customer data never leaves your infrastructure"
                    features={features}
                    limitations={limitations['selfHosted']}
                    cta={{
                        children: 'Get started - free',
                        to: 'https://license.posthog.com/',
                    }}
                    demo={{
                        children: 'Book a demo',
                        state: { demoType: 'scale' },
                        to: '/book-a-demo',
                    }}
                    pricing={
                        <>
                            <p className="m-0">
                                <strong>$0.00045</strong>
                                <span className="text-[13px] opacity-50">/event</span>
                            </p>
                            <p className="bg-yellow/50 m-0 mt-1 inline-block px-2 py-1 rounded-sm font-semibold text-sm">
                                First 1 million events free - every month
                            </p>
                            <p className="m-0 mt-2 font-semibold text-sm">
                                <ScrollLink smooth to="pricing-breakdown" className="cursor-pointer">
                                    See pricing breakdown and volume discounts
                                </ScrollLink>
                            </p>

                            <p className="m-0 inline-block text-sm">
                                <span className="opacity-70">Hosting not included.</span>{' '}
                                <Link to="/docs/self-host/deploy/hosting-costs">Estimate your cost</Link>
                            </p>
                        </>
                    }
                />
            </section>
            <PricingBreakdown />
            <section className={`${section} mb-12 mt-12 md:mt-24 md:px-4`}>
                <h2 className="text-2xl m-0 flex items-center border-b border-dashed border-gray-accent-light pb-4">
                    Full plan comparison
                </h2>
                <AllPlansTest />
            </section>
            <section className={`${section} my-12  md:px-4`}>
                <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-gray-accent-light border-dashed">Questions</h2>
                <FAQs />
            </section>
            <section className="bg-primary my-12 md:px-4">
                <Quote
                    className="py-12 md:py-16 px-5 bg-primary"
                    name={<span className="text-white">Jonathan Hyde</span>}
                    title={<span className="text-white">Former Head of Product, Legl</span>}
                    image={
                        <StaticImage
                            width={100}
                            height={100}
                            alt="Jonathan Hyde - Former Head of Product, Legl"
                            src="../../images/jonathan-hyde-plain.png"
                            placeholder="none"
                        />
                    }
                    quote={
                        <span className="text-white">
                            PostHog is the first analytics platform where{' '}
                            <span className="text-yellow">I can be 100% confident in the data.</span> I've finally got
                            the data insight platform I've always wanted as a Product person.
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
        </Layout>
    )
}

export default Test
