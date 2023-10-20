import {
    IconBadge,
    IconBrackets,
    IconCheckbox,
    IconClock,
    IconColumns,
    IconDownload,
    IconFilter,
    IconFunnels,
    IconGear,
    IconGridMasonry,
    IconLifecycle,
    IconMagicWand,
    IconPalette,
    IconPeople,
    IconPulse,
    IconRetention,
    IconRewind,
    IconShare,
    IconStickiness,
    IconTarget,
    IconTerminal,
    IconTestTube,
    IconTrends,
    IconUserPaths,
} from '@posthog/icons'
import Link from 'components/Link'
import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { feature } from 'components/Pricing/PricingTable/classes'
import { CallToAction } from 'components/CallToAction'

const Title = ({ title }) => {
    return <h3 className="text-lg lg:text-3xl mb-1 md:block hidden">{title}</h3>
}

const Subtitle = ({ subtitle, className = '' }) => {
    return <h4 className={`text-lg opacity-70 mb-3 font-semibold leading-tight ${className}`}>{subtitle}</h4>
}

const Description = ({ description, className = '' }) => {
    return <p className={`text-sm lg:text-base opacity-70 !leading-5 mb-1 ${className}`}>{description}</p>
}

const ContentContainer = ({ children, className = '' }) => {
    return (
        <div
            className={`md:flex items-center order-1 md:order-2 md:p-0 p-3 bg-accent md:bg-transparent dark:bg-accent-dark md:dark:bg-transparent z-10 relative text-black dark:text-white md:text-inherit dark:md:text-inherit ${className}`}
        >
            {children}
        </div>
    )
}

const Content = ({ children, className = '' }) => {
    return <div className={`relative z-10 mx-2 md:px-4 xl:px-8 py-4 ${className}`}>{children}</div>
}

const ImageContainer = ({ children, className = '' }) => {
    return <div className={`relative order-2 md:order-1 ${className}`}>{children}</div>
}

const FeatureList = ({ features, className = '' }) => {
    return (
        <ul className={`list-none m-0 p-0 flex flex-col gap-4 md:gap-1 lg:gap-2 lg:mt-2 pt-2 pb-4 ${className}`}>
            {features.map(({ title, Icon }) => {
                return (
                    <li
                        key={title}
                        className="flex gap-2 items-start md:items-center text-base md:text-sm xl:text-[15px]"
                    >
                        <span className="inline-flex p-1 rounded-sm bg-dark/10 dark:bg-white/10">
                            <Icon className="w-4 mdlg:w-6" />
                        </span>
                        <span className="opacity-70 font-semibold">{title}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export const ProductAnalytics = () => {
    const features = [
        { title: 'Funnels', Icon: IconFunnels },
        { title: 'Graphs & trends', Icon: IconTrends },
        { title: 'User paths', Icon: IconUserPaths },
        { title: 'Stickiness', Icon: IconStickiness },
        { title: 'Lifecycle', Icon: IconLifecycle },
        { title: 'Retention', Icon: IconRetention },
    ]
    return (
        <div className="md:bg-[#1371FF] rounded-md md:text-white flex items-end h-full">
            <div className="relative md:grid grid-cols-16 md:gap-8 w-full">
                <ImageContainer className="md:pl-8 col-span-10">
                    <div className="md:pt-4 mdlg:pt-0 mdlg:-mt-2 lg:-mt-2 xl:-mt-6 md:-mb-2">
                        <StaticImage
                            loading="eager"
                            alt="A funnel insight with 4 steps showing how many users dropped off during a sign-up flow"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className=":w-full md:max-w-[1029px] md:shadow-2xl md:-rotate-1"
                            src="../../../../contents/images/products/product-analytics/product-analytics.png"
                        />
                    </div>
                    <div className="absolute -bottom-2 right-0 md:hidden">
                        <div>
                            <StaticImage
                                loading="eager"
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[180px] lg:max-w-[230px] xl:max-w-[300px]"
                                src="./images/product-analytics-hog.png"
                                alt=""
                            />
                        </div>
                    </div>
                </ImageContainer>
                <ContentContainer className="col-span-6">
                    <Content>
                        <Title title={'Product analytics'} />
                        <FeatureList features={features} className="grid grid-cols-2 2xl:flex" />
                        <CallToAction
                            href="/product-analytics"
                            type="custom"
                            size="md"
                            className="md:!w-auto !w-full"
                            childClassName="!bg-[#1371FF]"
                        >
                            Explore
                        </CallToAction>
                    </Content>
                    <div className="absolute -bottom-2 right-0 hidden md:block">
                        <div>
                            <StaticImage
                                loading="eager"
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[180px] lg:max-w-[230px] xl:max-w-[300px]"
                                src="./images/product-analytics-hog.png"
                                alt=""
                            />
                        </div>
                    </div>
                </ContentContainer>
            </div>
        </div>
    )
}

export const SessionReplay = () => {
    const features = [
        { title: 'Event timeline', Icon: IconClock },
        { title: 'Console logs', Icon: IconTerminal },
        { title: 'Network requests', Icon: IconPulse },
    ]
    return (
        <div className="md:bg-[#F2AD46] rounded-md text-primary flex items-end h-full">
            <div className="relative md:grid grid-cols-16 gap-2 lg:gap-4 w-full">
                <ImageContainer className="md:pl-8 md:col-span-9 lg:col-span-10">
                    <div className="md:pt-4 mdlg:pt-0 mdlg:-mt-2 lg:-mt-2 xl:-mt-6 -mb-2">
                        <StaticImage
                            objectPosition="bottom"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full md:max-w-[1029px] md:shadow-2xl md:rotate-1"
                            src="../../../../contents/images/products/session-replay/session-replay.png"
                            alt="A session recording of a fake application called Hogflix"
                        />
                    </div>
                    <div className="absolute bottom-0 right-1 md:hidden">
                        <div>
                            <StaticImage
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[200px] mdlg:block lg:max-w-[230px] xl:max-w-[300px]"
                                src="./images/session-recording-hog.png"
                                alt=""
                            />
                        </div>
                    </div>
                </ImageContainer>
                <ContentContainer className="md:col-span-7 lg:col-span-6">
                    <Content className="">
                        <Title title={'Session replay'} />
                        <Description description="Watch users interacting with your app or website. Available for web and iOS." />
                        <p className="text-sm hidden xl:block opacity-60 pt-2 mb-1">(Android support coming soon.)</p>
                        <FeatureList features={features} className="grid md:grid-cols-2 lg:flex" />

                        <CallToAction
                            href="/session-replay"
                            type="custom"
                            size="md"
                            className="group !border-black/25 !bg-black/10 md:!w-auto !w-full"
                            childClassName="!bg-[#F2AD46] border-black !text-black group-hover:text-black"
                        >
                            Explore
                        </CallToAction>
                    </Content>
                    <div className="absolute bottom-0 right-1 hidden md:block">
                        <div>
                            <StaticImage
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[200px] mdlg:block lg:max-w-[230px] xl:max-w-[300px]"
                                src="./images/session-recording-hog.png"
                                alt=""
                            />
                        </div>
                    </div>
                </ContentContainer>
            </div>
        </div>
    )
}

export const FeatureFlags = () => {
    const features = [
        { title: 'Multivariate flags', Icon: IconTestTube },
        { title: 'JSON payloads', Icon: IconBrackets },
        { title: 'Instant rollbacks', Icon: IconRewind },
    ]
    return (
        <div className=" md:bg-[#29DBBB] rounded-md text-primary flex items-end h-full">
            <div className="relative md:grid grid-cols-16 gap-2 lg:gap-4 w-full">
                <ImageContainer className="md:pl-8 md:col-span-9 lg:col-span-10 min-h-[300px] lg:min-h-[400px]">
                    <div className="absolute right-0 -top-2 lg:top-4 xl:right-10 w-5/6 mdlg:w-3/4 lg:w-3/5 z-10">
                        <StaticImage
                            placeholder="none"
                            quality={100}
                            className="w-full -rotate-1 shadow-2xl"
                            src="./images/feature-flags-1.png"
                            alt="A code snippet to check if the feature flag 'nav' is enabled"
                        />
                    </div>
                    <div className="absolute left-8 bottom-1 xl:left-16 lg:bottom-4 xl:-bottom-4 w-5/6 mdlg:w-3/4 lg:w-3/5">
                        <StaticImage
                            placeholder="none"
                            quality={100}
                            className="w-full rotate-1 shadow-2xl"
                            src="./images/feature-flags-2.png"
                            alt="A filter for rolling out a feature flag to 50% of organizations in a cohort"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 md:hidden z-10">
                        <div>
                            <StaticImage
                                alt=""
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[200px] mdlg:block lg:max-w-[230px] xl:max-w-[300px]"
                                src="./images/feature-flags-hog.png"
                            />
                        </div>
                    </div>
                </ImageContainer>
                <ContentContainer className="md:col-span-7 lg:col-span-6">
                    <Content>
                        <Title title={'Feature flags'} />
                        <Subtitle className="text-[14px] md:text-[18px]" />
                        <Description description="Safely roll out features to select users or cohorts." />
                        <FeatureList features={features} className="" />

                        <CallToAction
                            href="/feature-flags"
                            type="custom"
                            size="md"
                            className="group !border-black/25 !bg-black/10 md:!w-auto !w-full"
                            childClassName="!bg-[#29DBBB] border-black !text-black group-hover:text-black"
                        >
                            Explore
                        </CallToAction>
                    </Content>
                    <div className="absolute bottom-0 right-0 md:block hidden">
                        <div>
                            <StaticImage
                                alt=""
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[200px] mdlg:block lg:max-w-[230px] xl:max-w-[300px]"
                                src="./images/feature-flags-hog.png"
                            />
                        </div>
                    </div>
                </ContentContainer>
            </div>
        </div>
    )
}

export const ABTesting = () => {
    const features = [
        { title: 'Goals & secondary metrics', Icon: IconBadge },
        { title: 'Targeting & exclusion rules ', Icon: IconTarget },
        { title: 'Dynamic cohort support', Icon: IconPeople },
    ]

    return (
        <div className="md:bg-[#9C19BD] rounded-md text-white flex items-end h-full">
            <div className="relative md:grid grid-cols-16 gap-2 lg:gap-4 w-full">
                <ImageContainer className="md:pl-8 md:col-span-9 lg:col-span-10 min-h-[300px] lg:min-h-[400px] ">
                    <div className="absolute left-2 top-5 w-[150%] md:w-3/4">
                        <StaticImage
                            alt="A graph depicting an increasing trend line showing improvement in an experiment over time"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full rotate-1 shadow-2xl"
                            src="./images/ab-testing-2.png"
                        />
                    </div>
                    <div className="absolute right-0 -top-2 w-[100%] md:w-3/4">
                        <StaticImage
                            alt="A slider set at 20% showing how long an experiment will need to be run in order to get the specified improvement"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full -rotate-1 shadow-2xl"
                            src="./images/ab-testing-1.png"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 md:hidden">
                        <div>
                            <StaticImage
                                alt=""
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[120px] lg:max-w-[120px] xl:max-w-[175px]"
                                src="./images/experiment-hog.png"
                            />
                        </div>
                    </div>
                </ImageContainer>
                <ContentContainer className="md:col-span-7 lg:col-span-6">
                    <Content>
                        <Title title={'A/B testing'} />
                        <Description description={'Run tests with statistical significance.'} />
                        <FeatureList features={features} />

                        <CallToAction
                            href="/ab-testing"
                            type="custom"
                            size="md"
                            className="md:!w-auto !w-full"
                            childClassName="!bg-[#9C19BD]
                    "
                        >
                            Explore
                        </CallToAction>
                    </Content>
                    <div className="absolute bottom-0 right-0 hidden md:block">
                        <div>
                            <StaticImage
                                alt=""
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[120px] lg:max-w-[120px] xl:max-w-[175px]"
                                src="./images/experiment-hog.png"
                            />
                        </div>
                    </div>
                </ContentContainer>
            </div>
        </div>
    )
}

export const Surveys = () => {
    const features = [
        { title: 'Five question types (Multiple choice, text, rating, NPS, emoji reaction)', Icon: IconCheckbox },
        { title: 'User targeting', Icon: IconTarget },
        { title: 'Customize the on-page popup', Icon: IconPalette },
        { title: 'No-code or API', Icon: IconMagicWand },
    ]

    return (
        <div className="md:bg-[#D42F18] rounded-md text-white flex items-end h-full">
            <div className="relative md:grid grid-cols-16 gap-2 lg:gap-4 w-full">
                <ImageContainer className="pl-8 md:col-span-6 lg:col-span-8 sm:min-h-[300px] lg:min-h-[400px]">
                    <div className="h-full">
                        <StaticImage
                            alt="A hog analyzing NPS results"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full h-full py-4 md:py-10 max-h-96"
                            src="../../../../contents/images/products/surveys/survey-hog.png"
                        />
                    </div>
                </ImageContainer>
                <ContentContainer className="md:col-span-10 lg:col-span-8">
                    <Content>
                        <Title title={'Surveys'} />
                        <Subtitle subtitle="Collect in-app feedback from your users" />
                        <FeatureList features={features} />

                        <CallToAction
                            href="/surveys"
                            type="custom"
                            size="md"
                            className="md:!w-auto !w-full"
                            childClassName="!bg-[#D42F18]"
                        >
                            Explore
                        </CallToAction>
                    </Content>
                </ContentContainer>
            </div>
        </div>
    )
}

export const Cdp = () => {
    const features = [
        { title: 'Sources', Icon: IconDownload },
        { title: 'Destinations', Icon: IconShare },
        { title: 'Transformations', Icon: IconGear },
    ]
    return (
        <div className="md:bg-[#FCC779] rounded-md text-primary flex items-end h-full">
            <div className="relative md:grid grid-cols-16 gap-2 lg:gap-4 w-full">
                <ImageContainer className="flex items-center pl-8 md:col-span-9 lg:col-span-10 min-h-[300px] lg:min-h-[400px]">
                    <div className="h-full">
                        <StaticImage
                            alt="A hedgehog standing in front of a leaky pipe of data"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full h-full"
                            src="../../../../contents/images/products/cdp/pipeline-hog.png"
                        />
                    </div>
                </ImageContainer>
                <ContentContainer className="md:col-span-7 lg:col-span-6">
                    <Content>
                        <Title title={'Customer data platform'} />
                        <Description description="60+ data connections available now. Full CDP coming soon." />
                        <FeatureList features={features} />

                        <CallToAction
                            href="/cdp"
                            type="custom"
                            size="md"
                            className="group !border-black/25 !bg-black/10 md:!w-auto !w-full"
                            childClassName="!bg-[#FCC779] border-black !text-black group-hover:text-black
                    "
                        >
                            Browse connections
                        </CallToAction>
                    </Content>
                </ContentContainer>
            </div>
        </div>
    )
}

export const DataWarehouse = () => {
    return (
        <div className="md:bg-[#29DBBB] rounded-md text-primary flex items-end h-full">
            <div className="relative md:grid grid-cols-16 gap-2 lg:gap-4 w-full">
                <ImageContainer className="md:pl-8 md:col-span-9 lg:col-span-10">
                    <div className="h-full">
                        <StaticImage
                            alt="An artist's depiction of a data warehouse"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full h-full py-10 max-h-96"
                            src="../../../../contents/images/products/data-warehouse/data-warehouse.png"
                        />
                    </div>
                    <div className="absolute bottom-0 right-4 md:hidden">
                        <div>
                            <StaticImage
                                alt=""
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[100px] mdlg:block lg:max-w-[130px] xl:max-w-[150px]"
                                src="../../../../contents/images/products/data-warehouse/warehouse-hog.png"
                            />
                        </div>
                    </div>
                </ImageContainer>
                <ContentContainer className="md:col-span-7 lg:col-span-6">
                    <Content>
                        <Title title={'Data warehouse'} />
                        <Subtitle subtitle="Full data warehouse product coming soon" />
                        <Description
                            description="Also syncs with Amazon S3, BigQuery, and Amazon Redshift using our API."
                            className="!text-sm pb-4"
                        />

                        <CallToAction
                            href="/docs/data-warehouse"
                            type="custom"
                            size="md"
                            className="group !border-black/25 !bg-black/10 md:!w-auto !w-full"
                            childClassName="!bg-[#29DBBB] border-black !text-black group-hover:text-black
                    "
                        >
                            Learn more
                        </CallToAction>
                    </Content>
                    <div className="absolute bottom-0 right-4 md:block hidden">
                        <div>
                            <StaticImage
                                alt=""
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[100px] mdlg:block lg:max-w-[130px] xl:max-w-[150px]"
                                src="../../../../contents/images/products/data-warehouse/warehouse-hog.png"
                            />
                        </div>
                    </div>
                </ContentContainer>
            </div>
        </div>
    )
}

export const Sql = () => {
    const features = [
        { title: 'Breakdowns', Icon: IconColumns },
        { title: 'Filters', Icon: IconFilter },
        { title: 'Aggregations', Icon: IconGridMasonry },
    ]

    return (
        <div className="md:bg-[#D42F18] rounded-md text-white flex items-end h-full">
            <div className="relative md:grid grid-cols-16 gap-2 lg:gap-4 w-full">
                <ImageContainer className="pl-8 md:col-span-9 lg:col-span-10 min-h-[300px] lg:min-h-[400px]">
                    <div className="h-full">
                        <StaticImage
                            alt="A hedgehog working on a laptop while standing, using some sort of internet link that connects to the stars..."
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full h-full py-10 max-h-96"
                            src="../../../../contents/images/products/sql/sql-hog.png"
                        />
                    </div>
                </ImageContainer>
                <ContentContainer className="md:col-span-7 lg:col-span-6">
                    <Content>
                        <Title title={'SQL'} />
                        <Subtitle subtitle="Directly query data stored in PostHog via SQL." />
                        <FeatureList features={features} />

                        <CallToAction
                            href="/docs/hogql"
                            type="custom"
                            size="md"
                            className="md:!w-auto !w-full"
                            childClassName="!bg-[#D42F18]"
                        >
                            Explore
                        </CallToAction>
                    </Content>
                </ContentContainer>
            </div>
        </div>
    )
}

export const Api = () => {
    return (
        <div className="bg-[#EB9D2A] rounded-md flex items-end h-full">
            <div className="relative grid grid-cols-16 gap-2 lg:gap-4 min-h-[300px] lg:min-h-[400px] w-full">
                <ImageContainer className="pl-8 md:col-span-9 lg:col-span-10">
                    <div className="h-full">
                        <StaticImage
                            alt="A hedgehog working on a laptop while standing, using some sort of internet link that connects to the stars..."
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full h-full py-10"
                            src="../../../../contents/images/products/api/coder-hog.png"
                        />
                    </div>
                </ImageContainer>
                <ContentContainer className="md:col-span-7 lg:col-span-6">
                    <Content>
                        <Title title={'API'} />
                        <Subtitle subtitle="Build custom functionality or create bespoke views specific to your business needs." />

                        <CallToAction
                            href="/docs/api"
                            type="custom"
                            size="md"
                            className="group !border-black/25 !bg-black/10"
                            childClassName="!bg-[#EB9D2A] border-black !text-black group-hover:text-black
                    "
                        >
                            Explore the API
                        </CallToAction>
                    </Content>
                </ContentContainer>
            </div>
        </div>
    )
}
