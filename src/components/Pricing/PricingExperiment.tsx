import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState, useEffect } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from 'components/Pricing/Quote'
import { SEO } from '../seo'
import cntl from 'cntl'
import { animateScroll as scroll } from 'react-scroll'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import { CTA as PlanCTA } from './Plans'
import Link from 'components/Link'
import { IconCode, IconHandMoney, IconRocket } from '@posthog/icons'
import * as Icons from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import Tabbed from './PricingCalculator/Tabbed'
import { PlanColumns } from './Test/PlanColumns'
import PlanContent from './Test/PlanContent'
import { section, SectionLayout, SectionHeader, SectionColumns, SectionMainCol, SectionSidebar } from './Test/Sections'
import { PaidPricing } from './Test/PaidPricing'
import { SimilarProducts } from './Test/SimilarProducts'
import { Reviews } from './Test/Reviews'
import ImageSlider from './Test/ImageSlider'
import Header from './Test/Header'
import { Link as ScrollLink } from 'react-scroll'
import PurchasedWith from './Test/PurchasedWith'
import { PRODUCT_COUNT } from '../../constants'
import { Calculator } from './Test/Calculator'
import PricingHero from './Test/PricingHero'
import CTA from 'components/Home/CTA.js'

export const SidebarList = ({ children }: { children: React.ReactNode }) => (
    <ul className="tw-chevron-bullets flex flex-col gap-1 pl-4">{children}</ul>
)

export const SidebarListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="leading-snug text-[15px]">{children}</li>
)

export const Discounts = () => (
    <div className="max-w-sm">
        <h4>Discounts</h4>
        <ul className="list-none m-0 p-0 divide-y divide-primary">
            <li className="relative pl-7">
                <IconRocket className="size-5 absolute left-0 top-0.5 opacity-50" />
                <strong>Startups</strong>
                <p className="text-[15px]">
                    If your startup has raised less than $5 million and is less than 2 years old, you may be interested
                    in our startup program.{' '}
                    <Link to="/startups" className="text-red dark:text-yellow font-semibold">
                        Learn more
                    </Link>
                </p>
            </li>
            <li className="relative pl-7 pt-4">
                <IconHandMoney className="size-5 absolute left-0 top-4.5 opacity-50" />
                <strong>Non-profits</strong>
                <p className="text-[15px] mb-2">
                    Most non-profits are eligible for a discount. Get in touch through the app after signing up.
                </p>
            </li>
            <li className="relative pl-7 pt-4">
                <IconCode className="size-5 absolute left-0 top-4.5 opacity-50" />
                <strong>Small OSS projects without corporate backing</strong>
                <p className="text-[15px] mb-2">
                    If you have an open source project without corporate backing that has less than $200k annual
                    revenue, you can get up to $50k credits per year to use PostHog for free, subject to approval. Get
                    in touch through the app after signing up to see if you qualify!
                </p>
            </li>
        </ul>
    </div>
)

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
    @5xl:mb-0 
    pb-4
    xl:pb-8
    rounded-b-md
`

interface FreeTierItemProps {
    icon: React.ReactNode
    icon2?: React.ReactNode
    name: string
    allocation: string
    description?: string
}

const FreeTierItem = ({ icon, icon2, name, allocation, description }: FreeTierItemProps) => {
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

const images = [
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_os_df65018ac1.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_os_thumb_8a0a4b86c7.png',
        alt: 'PostHog 3000',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_analytics_091434830d.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_analytics_thumb_0e75317413.png',
        alt: 'Product analytics',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_d744f3a91b.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_thumb_6af44e8607.png',
        alt: 'Web analytics',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/session_replay_40fdbb06e4.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/session_replay_thumb_6334319e64.png',
        alt: 'Session replay',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/feature_flags_3c90797dd6.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/feature_flags_thumb_b4bc2d6df1.png',
        alt: 'Feature flags',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ab_testing_0c3f4b82f8.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/ab_testing_thumb_8729e68844.png',
        alt: 'Experiments',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_224b1c8aaa.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_thumb_1ed78c7676.png',
        alt: 'Surveys',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_3303d90bcc.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_thumb_0fc6126f10.png',
        alt: 'Data warehouse',
    },
]

interface PricingExperimentProps {
    activePlan: string
    setActivePlan: (plan: string) => void
    animateFreeTiers: boolean
    setAnimateFreeTiers: (animate: boolean) => void
    currentModal: string | boolean
    setCurrentModal: (modal: string | boolean) => void
    billingProducts: any // TODO: Add proper type
}

const PricingExperiment = ({
    activePlan,
    setActivePlan,
    animateFreeTiers,
    setAnimateFreeTiers,
    currentModal,
    setCurrentModal,
    billingProducts,
}: PricingExperimentProps): JSX.Element => {
    return (
        <>
            <SelfHostOverlay open={currentModal === 'self host'} setOpen={setCurrentModal} />

            <div id="cloud" className="@xl:grid grid-cols-16 mb-6 @5xl:mb-12">
                <div className="not-prose col-span-8 @5xl:col-span-4 mb-4 @xl:mb-0 @5xl:border-b border-primary">
                    <div className="@xl:hidden mb-2">
                        <Header />
                    </div>
                    <ImageSlider images={images} showDisclaimer={true} className="aspect-square" id="pricing-slider" />
                </div>

                <div className="@container col-span-8 @5xl:col-span-7 @6xl:col-span-8 @5xl:border-b border-primary @xl:pl-4 @3xl:pl-6 @4xl:pl-8 @5xl:mr-6 pb-4">
                    <PricingHero activePlan={activePlan} setActivePlan={setActivePlan} />
                </div>

                <aside className="hidden @5xl:block not-prose @5xl:col-span-5 @6xl:col-span-4">
                    <div className="bg-light dark:bg-accent rounded-md border border-primary py-4 px-6 h-full">
                        <div className="flex flex-col @xl:grid grid-cols-2 @5xl:flex justify-between h-full">
                            <PlanContent activePlan={activePlan} onFreeTierClick={() => setAnimateFreeTiers(true)} />
                        </div>
                    </div>
                </aside>
            </div>

            <PaidPricing />

            <PlanColumns billingProducts={billingProducts} highlight="free" />

            <SectionLayout>
                <div
                    data-scheme="secondary"
                    className="bg-primary p-4 @xl:pb-4 rounded border border-primary flex flex-col @xl:flex-row justify-between @xl:items-center gap-8 -mt-4"
                >
                    <div>
                        <h3 className="m-0">Give PostHog a try</h3>
                        <p className="text-[15px] mb-0">
                            No need to pick a plan - try our free version and decide if you want advanced features
                            later!
                        </p>
                    </div>
                    <div>
                        <PlanCTA />
                    </div>
                </div>
            </SectionLayout>

            <SectionLayout id="quote" className="not-prose">
                <Quote
                    className="py-12 px-8 bg-black dark:bg-accent rounded"
                    name={<span className="text-white">Cat Li</span>}
                    title={<span className="text-white">Product & Engineering Lead, Y Combinator</span>}
                    image={
                        <CloudinaryImage
                            width={100}
                            height={100}
                            alt="Cat Li, Y Combinator"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/cat.jpeg"
                            placeholder="none"
                            className="rounded-full overflow-hidden"
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
            </SectionLayout>
        </>
    )
}

export default PricingExperiment
