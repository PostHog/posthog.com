import {
    Android,
    DiagonalArrow,
    Experimentation,
    Funnels,
    Ios,
    JS,
    Lifecycle,
    NodeJS,
    PathAnalysis,
    ReactIcon,
    Retention,
    RightArrow,
    Ruby,
    Stickiness,
    Trends,
} from 'components/Icons/Icons'
import Link from 'components/Link'
import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Title = ({ title }) => {
    return <h3 className="text-lg lg:text-2xl lg:mt-5 mb-0">{title}</h3>
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

export const ProductAnalytics = () => {
    const features = [
        { title: 'Funnels', Icon: Funnels, url: '/product/funnels' },
        { title: 'User paths', Icon: PathAnalysis, url: '/product/user-paths' },
        { title: 'Lifecycle', Icon: Lifecycle, url: '/product/correlation-analysis' },
        { title: 'Trends', Icon: Trends, url: '/product/trends' },
        { title: 'Stickiness', Icon: Stickiness, url: '/product/correlation-analysis' },
        { title: 'Retention', Icon: Retention, url: '/product/correlation-analysis' },
    ]
    return (
        <div className="relative grid grid-cols-4 lg:grid-cols-5 lg:gap-5 pt-5">
            <ImageContainer className="col-span-2 lg:col-span-3 px-8 pt-4 -ml-8 md:-ml-0">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
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
                    <ul className="list-none m-0 p-0 grid md:grid-cols-3 home-product-analytics-features lg:mt-2 mr-8 lg:mr-3">
                        {features.map(({ title, Icon, url }) => {
                            return (
                                <li key={title} className="p-[3px]">
                                    <Link
                                        to={url}
                                        className="text-black hover:text-black hover:bg-gray-accent/25 focus:bg-gray-accent/40 flex items-center space-x-2 text-[13px] lg:text-[14px] py-2 md:py-3 px-2 xl:px-2 md:border-b-0 border-b border-dashed border-gray-accent-light hover:bg-gray-accent-light rounded transition-all"
                                    >
                                        <span>
                                            <Icon className="w-[20px]" />
                                        </span>
                                        <span className="opacity-70">{title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <CTA url="/product" title="Explore" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="hidden md:block mb-3">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <Link
                            to="/blog/categories/comparisons"
                            className="text-primary/80 inline-block leading-tight text-[12px]"
                        >
                            Compare to Amplitude, Matomo, Mixpanel
                        </Link>
                    </div>
                    <div className="md:relative w-3/4">
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
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export const SessionRecording = () => {
    return (
        <div className="relative grid grid-cols-2 md:gap-7 pt-5">
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
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'Session recording'} />
                    <Subtitle subtitle="with console logs" />
                    <Description description="Watch a group of sessions for users in a cohort." />

                    <CTA url="/product/session-recording" title="Explore" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="mb-3 flex-grow md:px-0 px-5">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <Link
                            to="/product/session-recording"
                            className="text-primary/80 inline-block leading-tight text-[12px]"
                        >
                            Compare to Hotjar, Logrocket, Matomo
                        </Link>
                    </div>
                    <div className="md:relative w-1/2 md:w-3/4">
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
    return (
        <div className="relative grid grid-cols-2 gap-7 pt-5">
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
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'Feature flags'} />
                    <Subtitle className="text-[14px] md:text-[18px]" subtitle="with multivariate testing" />
                    <Description description="Roll out features to groups or specific users." />

                    <CTA url="/product/feature-flags" title="See how it works" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="md:px-0 px-5 mb-3 flex-grow w-full md:w-auto">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <Link
                            to="/product/feature-flags"
                            className="text-primary/80 inline-block leading-tight text-[12px]"
                        >
                            Compare to LaunchDarkly, Flagsmith, GrowthBook
                        </Link>
                    </div>
                    <div className="md:relative w-3/4">
                        <div className="absolute bottom-0 right-0">
                            <motion.div
                                transition={{ delay: 0.5 }}
                                initial={{ translateX: '100%' }}
                                animate={{ translateX: 0 }}
                            >
                                <StaticImage
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
        { title: 'Experimentation Suite', Icon: Experimentation, url: '/product/experimentation-suite' },
        { title: 'Correlation Analysis', Icon: DiagonalArrow, url: '/product/correlation-analysis' },
    ]

    return (
        <div className="relative grid grid-cols-2 gap-7 pt-5">
            <ImageContainer className="md:ml-4">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="absolute left-0 top-5 w-[150%] md:w-11/12"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
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
                    <Subtitle subtitle="with multivariate testing" />
                    <ul className="list-none m-0 p-0 inline-block">
                        {features.map(({ title, Icon, url }) => {
                            return (
                                <li className="odd:border-b border-gray-accent-light border-dashed" key={title}>
                                    <Link
                                        to={url}
                                        className="text-black hover:text-black flex items-center space-x-2 text-[14px] md:text-[14px] py-3"
                                    >
                                        <span>
                                            <Icon className="w-[16px] md:w-[20px]" />
                                        </span>
                                        <span className="opacity-70">{title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <CTA url="/product/experimentation-suite" title="See how it works" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="hidden md:block mb-3 flex-grow">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <Link
                            to="/product/experimentation-suite"
                            className="text-primary/80 inline-block leading-tight text-[12px]"
                        >
                            Compare to Mixpanel, Optimizely, VWO
                        </Link>
                    </div>
                    <div className="md:relative w-1/2">
                        <div className="absolute bottom-0 right-0">
                            <motion.div
                                transition={{ delay: 0.5 }}
                                initial={{ translateX: '100%' }}
                                animate={{ translateX: 0 }}
                            >
                                <StaticImage
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

export const EventPipelines = () => {
    const data = [
        { Icon: JS, url: '/docs/integrate/client/js' },
        { Icon: ReactIcon, url: '/docs/integrate/client/react-native' },
        { Icon: NodeJS, url: '/docs/integrate/server/node' },
        { Icon: Ruby, url: '/docs/integrate/server/ruby' },
        { Icon: Ios, url: '/docs/integrate/client/ios' },
        { Icon: Android, url: '/docs/integrate/client/android' },
    ]

    return (
        <div className="relative grid grid-cols-2 gap-7 pt-5">
            <ImageContainer>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
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
                    <Title title={'Event pipelines'} />
                    <Subtitle subtitle="Enrich customer profiles in sales and marketing clouds with event data you send to PostHog." />
                    <ul className="list-none m-0 p-0 mt-5 md:mt-0 grid grid-cols-3 md:flex md:space-x-3 space-y-2 md:space-y-0 items-center justify-center md:justify-start">
                        {data.map(({ Icon, url }, index) => {
                            return (
                                <li key={index} className="m-0 mr-2 md:mr-0 p-0">
                                    <Link className="text-primary hover:text-primary" to={url}>
                                        <Icon className="w-[22px]" />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <CTA url="/docs/integrate" title="Browse all libraries" />
                </Content>
                <div className="flex items-end mt-auto w-full">
                    <div className="hidden md:block mb-3 flex-grow">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <p className="text-[14px] m-0">Use another service?</p>
                        <Link className="text-[14px]" to="/docs/apps/build">
                            Build an app connector
                        </Link>
                    </div>
                    <div className="md:relative w-3/4">
                        <div className="absolute bottom-0 right-0">
                            <motion.div
                                transition={{ delay: 0.5 }}
                                initial={{ translateX: '100%' }}
                                animate={{ translateX: 0 }}
                            >
                                <StaticImage
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
        <div className="relative grid grid-cols-2 gap-7 pt-5">
            <ImageContainer>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
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
                    <Subtitle className="text-[14px] md:text-[18px]" subtitle="Sync with your warehouse." />
                    <Description description="Or keep customer data in-house by self-hosting and using PostHog’s built-in data warehouse." />

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

export const SelfHosting = () => {
    return (
        <div className="relative grid grid-cols-2 gap-7 pt-5">
            <ImageContainer>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/self-hosting.png"
                    />
                </motion.div>
            </ImageContainer>
            <ContentContainer>
                <Content>
                    <Title title={'Self-hosting'} />
                    <Subtitle className="text-[14px] md:text-[18px]" subtitle="Plus get full SQL access." />
                    <Description description="Hosting on-prem or private cloud means customer data never has to leave your infrastructure." />

                    <CTA url="/docs/self-host" title="Learn more" />
                </Content>
                <div className="mt-auto w-full">
                    <div className="w-full">
                        <motion.div
                            transition={{ delay: 0.5 }}
                            initial={{ translateY: '100%' }}
                            animate={{ translateY: 0 }}
                        >
                            <StaticImage
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[350px]"
                                src="./images/self-hosting-hog.png"
                            />
                        </motion.div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}
