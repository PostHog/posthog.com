import {
    Android,
    DiagonalArrow,
    Experimentation,
    Ios,
    JS,
    NodeJS,
    ReactIcon,
    RightArrow,
    Ruby,
} from 'components/Icons/Icons'
import {
    Badge,
    Brackets,
    Clock,
    Columns,
    Download,
    Filter,
    Funnels,
    Gear,
    GridMasonry,
    Lifecycle,
    Trends,
    Stickiness,
    Pulse,
    Retention,
    Rewind,
    People,
    Share,
    Target,
    Terminal,
    TestTube,
    UserPaths,
} from 'components/NewIcons'
import Link from 'components/Link'
import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { feature } from 'components/Pricing/PricingTable/classes'
import { CallToAction } from 'components/CallToAction'

const Title = ({ title }) => {
    return <h3 className="text-lg lg:text-3xl lg:mt-5 mb-0">{title}</h3>
}

const Subtitle = ({ subtitle, className = '' }) => {
    return <h4 className={`text-[18px] opacity-70 mb-3 font-semibold leading-tight ${className}`}>{subtitle}</h4>
}

const Description = ({ description, className = '' }) => {
    return <p className={`text-[16px] opacity-70 m-0 leading-tight ${className}`}>{description}</p>
}

const CTA = ({ url, title }) => {
    return (
        <Link className="text-[15px] flex space-x-1 items-center font-bold mt-4 group" to={url}>
            <span>{title}</span>
            <span className="text-gray-accent-light">
                <RightArrow className="w-[20px] bounce" />
            </span>
        </Link>
    )
}

const ContentContainer = ({ children, className = '' }) => {
    return <div className={`flex flex-col order-1 md:order-2 ${className}`}>{children}</div>
}

const Content = ({ children }) => {
    return <div className="max-w-[450px] md:py-0 pl-5 md:px-0 pb-5">{children}</div>
}

const ImageContainer = ({ children, className = '' }) => {
    return <div className={`relative h-[300px] xl:h-[400px] order-2 md:order-1 ${className}`}>{children}</div>
}

const FeatureList = ({ features }) => {
    return (
        <ul className="list-none m-0 p-0 space-y-2 lg:mt-2 pt-2 pb-4">
            {features.map(({ title, Icon }) => {
                return (
                    <li key={title} className="flex gap-2 items-center text-[15px]">
                        <span className="inline-flex p-1 rounded-sm bg-dark/10">
                            <Icon className="w-6" />
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
        { title: 'Funnels', Icon: Funnels },
        { title: 'Graphs & trends', Icon: Trends },
        { title: 'User paths', Icon: UserPaths },
        { title: 'Stickiness', Icon: Stickiness },
        { title: 'Lifecycle', Icon: Lifecycle },
        { title: 'Retention', Icon: Retention },
    ]
    return (
        <div className="bg-[#1371FF] text-white relative grid grid-cols-4 lg:grid-cols-5 lg:gap-5 pt-5">
            <ImageContainer className="col-span-2 lg:col-span-3 px-8 pt-4 -ml-8 md:-ml-0">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        alt="A funnel insight with 4 steps showing how many users dropped off during a sign-up flow"
                        placeholder="none"
                        quality={100}
                        objectFit="cover"
                        objectPosition="top left"
                        className="w-[200%] md:w-full h-full shadow-xl max-w-[907.5px] rotate-2"
                        src="./images/product-analytics.png"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer className="col-span-2">
                <Content>
                    <Title title={'Product analytics'} />
                    <FeatureList features={features} />
                    <CallToAction href="/product-analytics" type="outline" size="sm" color={false}>
                        Explore
                    </CallToAction>
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="md:relative w-3/4 ml-auto">
                        <div className="absolute -bottom-2 right-0">
                            <motion.div
                                transition={{ delay: 0.5 }}
                                initial={{ translateX: '100%' }}
                                animate={{ translateX: 0 }}
                            >
                                <StaticImage
                                    placeholder="none"
                                    quality={100}
                                    className="w-full max-w-[215px] xl:max-w-[360px]"
                                    src="./images/product-analytics-hog.png"
                                    alt=""
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export const SessionReplay = () => {
    const features = [
        { title: 'Event timeline', Icon: Clock },
        { title: 'Console logs', Icon: Terminal },
        { title: 'Network requests', Icon: Pulse },
    ]
    return (
        <div className="bg-[#F2AD46] text-primary relative grid grid-cols-2 md:gap-7 pt-5">
            <ImageContainer className="md:px-8 pt-4 pb-3">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full md:flex md:items-end"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        objectPosition="bottom"
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-[170%] md:w-full rotate-2 md:max-w-[754.5px] shadow-xl"
                        src="./images/session-recording.png"
                        alt="A session recording of a fake application called Hogflix"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'Session replay'} />
                    <Description description="Watch users interacting with your app or website. Available for web and iOS.*" />
                    <FeatureList features={features} />
                    <p className="text-sm">*Android coming soon</p>

                    <CTA url="/session-replay" title="Explore" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div></div>
                    <div className="md:relative w-1/2 md:w-3/4 ml-auto">
                        <div className="absolute bottom-0 right-0">
                            <motion.div
                                transition={{ delay: 0.5 }}
                                initial={{ translateX: '100%' }}
                                animate={{ translateX: 0 }}
                            >
                                <StaticImage
                                    placeholder="none"
                                    quality={100}
                                    className="w-full max-w-[250px] md:max-w-full"
                                    src="./images/session-recording-hog.png"
                                    alt=""
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export const FeatureFlags = () => {
    const features = [
        { title: 'Multivariate flags', Icon: TestTube },
        { title: 'JSON payloads', Icon: Brackets },
        { title: 'Instant rollbacks', Icon: Rewind },
    ]
    return (
        <div className="bg-[#29DBBB] text-primary relative grid grid-cols-2 gap-7 pt-5 rounded">
            <ImageContainer className="h-[40vw] md:h-[300px] xl:h-[400px] md:ml-4">
                <motion.div
                    transition={{ delay: 0.2 }}
                    className="absolute left-0 bottom-2 w-3/4"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        className="w-[150%] md:w-full rotate-1 shadow-xl"
                        src="./images/feature-flags-2.png"
                        alt="A filter for rolling out a feature flag to 50% of organizations in a cohort"
                    />
                </motion.div>
                <motion.div
                    transition={{ delay: 0.3 }}
                    className="absolute right-0 top-0 w-3/4"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        className="w-[150%] md:w-full -rotate-1 shadow-xl"
                        src="./images/feature-flags-1.png"
                        alt="A code snippet to check if the feature flag 'nav' is enabled"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'Feature flags'} />
                    <Subtitle className="text-[14px] md:text-[18px]" />
                    <Description description="Safely roll out features to select users or cohorts." />
                    <FeatureList features={features} />

                    <CTA url="/feature-flags" title="See how it works" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="md:relative w-3/4 ml-auto">
                        <div className="absolute bottom-0 right-0">
                            <motion.div
                                transition={{ delay: 0.5 }}
                                initial={{ translateX: '100%' }}
                                animate={{ translateX: 0 }}
                            >
                                <StaticImage
                                    alt=""
                                    placeholder="none"
                                    quality={100}
                                    className="w-full max-w-[250px] xl:max-w-[480px]"
                                    src="./images/feature-flags-hog.png"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export const ABTesting = () => {
    const features = [
        { title: 'Goals & secondary metrics', Icon: Badge },
        { title: 'Targeting & exclusion rules ', Icon: Target },
        { title: 'Dynamic cohort support', Icon: People },
    ]

    return (
        <div className="bg-[#9C19BD] text-primary-dark relative grid grid-cols-2 gap-7 pt-5 rounded">
            <ImageContainer className="md:ml-4">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="absolute left-0 top-5 w-[150%] md:w-11/12"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        alt="A graph depicting an increasing trend line showing improvement in an experiment over time"
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full rotate-1 shadow-xl"
                        src="./images/ab-testing-2.png"
                    />
                </motion.div>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="absolute right-5 top-0 w-[100%] md:w-3/4"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        alt="A slider set at 20% showing how long an experiment will need to be run in order to get the specified improvement"
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full -rotate-1 shadow-xl"
                        src="./images/ab-testing-1.png"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'A/B testing'} />
                    <Description description={'Run tests with statistical significance.'} />
                    <FeatureList features={features} />
                    <CTA url="/ab-testing" title="See how it works" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="md:relative w-1/2 ml-auto">
                        <div className="absolute bottom-0 right-0">
                            <motion.div
                                transition={{ delay: 0.5 }}
                                initial={{ translateX: '100%' }}
                                animate={{ translateX: 0 }}
                            >
                                <StaticImage
                                    alt=""
                                    placeholder="none"
                                    quality={100}
                                    className="w-full max-w-[200px] lg:max-w-[250px] xl:max-w-[480px]"
                                    src="./images/ab-testing-hog.png"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export const Cdp = () => {
    const features = [
        { title: 'Sources', Icon: Download },
        { title: 'Destinations', Icon: Share },
        { title: 'Transformations', Icon: Gear },
    ]
    return (
        <div className="bg-[#FCC779] text-primary relative grid grid-cols-2 gap-7 pt-5 rounded">
            <ImageContainer>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        alt="A grid of several logos for apps that are available in PostHog. Includes services such as Salesforce, Intercom, Rudderstack, Segment, Hubspot, and Slack"
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-[170%] md:w-full h-full"
                        src="./images/event-pipelines.png"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'Customer data platform'} />
                    <Description description="60+ data connections available now. Full CDP coming soon." />
                    <FeatureList features={features} />

                    <CTA url="/docs/integrations" title="Browse destinations" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="md:relative w-3/4 ml-auto">
                        <div className="absolute bottom-0 right-0">
                            <motion.div
                                transition={{ delay: 0.5 }}
                                initial={{ translateX: '100%' }}
                                animate={{ translateX: 0 }}
                            >
                                <StaticImage
                                    alt=""
                                    placeholder="none"
                                    quality={100}
                                    className="w-full max-w-[250px] xl:max-w-[480px]"
                                    src="./images/event-pipelines-hog.png"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export const DataWarehouse = () => {
    return (
        <div className="bg-[#29DBBB] text-primary relative grid grid-cols-2 gap-7 pt-5 rounded">
            <ImageContainer>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        alt="A network of different logos, showing lines coming from PostHog and going to S3, BigQuery, ClickHouse (PostHog's database), and Redshift."
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/data-warehouse.png"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'Data warehouse'} />
                    <Subtitle
                        className="text-[14px] md:text-[18px]"
                        subtitle="Full data warehouse product coming soon."
                    />
                    <Description description="Also syncs with Amazon S3, BigQuery, and Amazon Redshift using our API." />

                    <CTA url="/docs/api" title="Explore what you can do" />
                </Content>
                <div className="mt-auto w-full">
                    <div className="w-1/2 md:w-full md:relative absolute bottom-0 right-0">
                        <motion.div
                            transition={{ delay: 0.5 }}
                            initial={{ translateX: '100%' }}
                            animate={{ translateX: 0 }}
                        >
                            <StaticImage
                                alt=""
                                placeholder="none"
                                quality={100}
                                className="w-full"
                                src="./images/data-warehouse-hog.png"
                            />
                        </motion.div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export const Sql = () => {
    const features = [
        { title: 'Breakdowns', Icon: Columns },
        { title: 'Filters', Icon: Filter },
        { title: 'Aggregations', Icon: GridMasonry },
    ]

    return (
        <div className="bg-[#940DB6] text-primary-dark relative grid grid-cols-2 gap-7 pt-5 rounded">
            <ImageContainer>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        alt="A hedgehog working on a laptop while standing, using some sort of internet link that connects to the stars..."
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/open-source.png"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'SQL'} />
                    <Subtitle
                        className="text-[14px] md:text-[18px]"
                        subtitle="Directly query data stored in PostHog via SQL."
                    />
                    <FeatureList features={features} />

                    <CTA url="/docs/self-host" title="Learn more about self-hosting" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="md:relative w-3/4">
                        <motion.div
                            transition={{ delay: 0.5 }}
                            initial={{ translateY: '100%' }}
                            animate={{ translateY: 0 }}
                        ></motion.div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export const Api = () => {
    return (
        <div className="bg-[#EB9D2A] text-primary relative grid grid-cols-2 gap-7 pt-5 rounded">
            <ImageContainer>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        alt="A hedgehog working on a laptop while standing, using some sort of internet link that connects to the stars..."
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/open-source.png"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'API'} />
                    <Subtitle
                        className="text-[14px] md:text-[18px]"
                        subtitle="Build custom functionality or create bespoke views specific to your business needs."
                    />

                    <CTA url="/docs/self-host" title="Learn more about self-hosting" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="md:relative w-3/4">
                        <motion.div
                            transition={{ delay: 0.5 }}
                            initial={{ translateY: '100%' }}
                            animate={{ translateY: 0 }}
                        ></motion.div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}
