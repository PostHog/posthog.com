import {
    IconBadge,
    IconBrackets,
    IconBrowser,
    IconCheckbox,
    IconClock,
    IconColumns,
    IconDownload,
    IconFilter,
    IconFunnels,
    IconGear,
    IconGlobe,
    IconGridMasonry,
    IconHogQL,
    IconLifecycle,
    IconLineGraph,
    IconMagicWand,
    IconMegaphone,
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

const Slide = ({
    containerClasses,
    bgColor,
    textColor,
    title,
    description,
    descriptionClasses,
    additionalText,
    flag,
    flagColor,
    features,
    featureListClasses,
    imageColumn,
    contentColumn,
    imageClasses,
    HogMobile,
    HogDesktop,
    contentOffset,
    buttonLabel,
    buttonUrl,
    buttonClasses,
    buttonChildClasses,
    Images,
}) => {
    return (
        <div className="overflow-hidden flex h-full items-end md:mt-3 mb-2 md:mb-6 mdlg:my-0">
            <div
                className={`bg-${bgColor} text-${textColor} md:rounded-tl-md md:rounded-tr-md mdlg:text-${textColor} flex items-center pt-4 mdlg:pt-0 mdlg:mt-4 w-full ${containerClasses}`}
            >
                <div className="relative mdlg:grid grid-cols-16 mdlg:gap-2 w-full">
                    <ImageContainer className={imageColumn}>
                        <div className={`h-full flex justify-center items-center xl:items-start ${imageClasses}`}>
                            {Images && <Images />}
                        </div>
                        <div className="absolute -bottom-2 right-0 mdlg:hidden">
                            <div>{HogMobile && <HogMobile />}</div>
                        </div>
                    </ImageContainer>
                    <ContentContainer className={contentColumn}>
                        {flag && (
                            <div
                                className={`inline-block mt-2 ml-2 md:m-0 md:absolute right-0 top-4 font-semibold bg-${flagColor} text-white uppercase text-sm`}
                            >
                                <div
                                    className={`
                                    relative py-1 
                                    before:w-0 before:h-0 before:content-[''] before:absolute

                                    pl-3
                                    md:pl-3
                                    pr-2
                                    md:pr-4
                                    
                                    before:border-[1rem] 
                                    before:border-${flagColor} 
                                    before:bottom-0 
                                    before:border-t-transparent
                                    before:border-r-transparent 

                                    md:before:border-b-${flagColor}
                                    md:before:border-t-transparent
                                    before:border-l-transparent
                                    before:-right-4
                                    md:before:-left-4 
                                    md:right-initial
                                    
                                    after:w-0 after:h-0 after:content-[''] after:absolute
                                    
                                    after:border-[1rem] 
                                    after:border-${flagColor} 
                                    after:border-r-transparent 
                                    after:border-b-transparent 
                                    md:after:border-t-${flagColor} 

                                    md:after:border-b-transparent
                                    after:border-l-transparent 
                                    after:top-0 
                                    after:md:top-initial
                                    after:md:bottom-0
                                    after:-right-4
                                    md:after:-left-4
                                    md:right-initial
                                `}
                                >
                                    {flag}
                                </div>
                            </div>
                        )}
                        <Content className={contentOffset}>
                            <Title title={title} />
                            {description && <Description description={description} className={descriptionClasses} />}
                            {additionalText && <>{additionalText}</>}
                            <FeatureList
                                features={features}
                                className={featureListClasses}
                                featureIconBackground={textColor}
                            />
                            <CallToAction
                                href={buttonUrl}
                                type="custom"
                                size="md"
                                className={buttonClasses}
                                childClassName={buttonChildClasses}
                            >
                                {buttonLabel}
                            </CallToAction>
                        </Content>
                        <div className="hidden mdlg:block absolute right-1 bottom-0">
                            <div>{HogDesktop && <HogDesktop />}</div>
                        </div>
                    </ContentContainer>
                </div>
            </div>
        </div>
    )
}

const Title = ({ title, label }) => {
    return (
        <>
            <h3 className="text-xl mdlg:text-lg lg:text-3xl mb-1">
                {title}
                {label && (
                    <span className="ml-1 relative -top-0.5 text-sm text-primary/60 dark:text-primary/60 font-semibold leading-tight border border-dark dark:border-dark px-1 py-0.5 rounded-sm uppercase">
                        {label}
                    </span>
                )}
            </h3>
        </>
    )
}

const Subtitle = ({ subtitle, className = '' }) => {
    return <h4 className={`text-lg opacity-70 mb-3 font-semibold leading-tight ${className}`}>{subtitle}</h4>
}

const Description = ({ description, className = '' }) => {
    return <p className={`text-sm lg:text-base opacity-70 !leading-5 mb-4 mdlg:mb-1 ${className}`}>{description}</p>
}

const ContentContainer = ({ children, className = '' }) => {
    return (
        <div
            className={`md:border border-t-0 border-light dark:border-dark mdlg:border-0 mdlg:flex items-center order-1 mdlg:order-2 mdlg:p-0 p-3 bg-accent mdlg:bg-transparent dark:bg-accent-dark mdlg:dark:bg-transparent z-10 relative text-black dark:text-white mdlg:text-inherit dark:mdlg:text-inherit ${className}`}
        >
            {children}
        </div>
    )
}

const Content = ({ children, className = '' }) => {
    return (
        <div
            className={`@container relative z-10 mdlg:mx-2 w-full px-2 mdlg:px-4 2xl:px-8 pt-2 mdlg:pt-4 md:pb-4 ${className}`}
        >
            {children}
        </div>
    )
}

const ImageContainer = ({ children, className = '' }) => {
    return <div className={`relative order-2 mdlg:order-1 ${className}`}>{children}</div>
}

const FeatureList = ({ features, featureIconBackground, className = '' }) => {
    return (
        <ul className={`list-none m-0 p-0 flex flex-col gap-4 mdlg:gap-1 lg:gap-2 lg:mt-2 mdlg:pt-2 pb-4 ${className}`}>
            {features.map(({ title, Icon }) => {
                return (
                    <li
                        key={title}
                        className="flex gap-2 items-start mdlg:items-center text-base mdlg:text-sm xl:text-[15px]"
                    >
                        <span
                            className={`inline-flex p-1 rounded-sm bg-primary/10 mdlg:bg-${featureIconBackground}/10`}
                        >
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
    const imageProps = {
        loading: 'eager',
        alt: 'A funnel insight with 4 steps showing how many users dropped off during a sign-up flow',
        placeholder: 'none',
        quality: 100,
        objectFit: 'contain',
        className: 'w-full -mb-2 mdlg:max-w-[753px] mdlg:shadow-2xl mdlg:-rotate-1',
    }
    const features = [
        { title: 'Funnels', Icon: IconFunnels },
        { title: 'Graphs & trends', Icon: IconTrends },
        { title: 'User paths', Icon: IconUserPaths },
        { title: 'Stickiness', Icon: IconStickiness },
        { title: 'Lifecycle', Icon: IconLifecycle },
        { title: 'Retention', Icon: IconRetention },
        { title: 'SQL', Icon: IconHogQL },
    ]
    return (
        <Slide
            bgColor="[#1371FF]"
            textColor="primary-dark"
            title="Product analytics"
            features={features}
            featureListClasses="@[240px]:grid grid-cols-2"
            imageColumn="mdlg:col-span-9 lg:col-span-10 xl:col-span-11 2xl:col-span-10"
            imageClasses="px-4 mdlg:pr-0"
            contentColumn="mdlg:col-span-7 lg:col-span-6 xl:col-span-5 2xl:col-span-6"
            Images={() => {
                return (
                    <>
                        <div className="block dark:hidden">
                            <StaticImage
                                {...imageProps}
                                src="../../../../contents/images/products/product-analytics/product-analytics-light.png"
                                alt="A funnel insight with 3 steps showing how many users dropped off during a sign-up flow"
                            />
                        </div>
                        <div className="hidden dark:block">
                            <StaticImage
                                {...imageProps}
                                src="../../../../contents/images/products/product-analytics/product-analytics-dark.png"
                                alt="A funnel insight with 3 steps showing how many users dropped off during a sign-up flow"
                            />
                        </div>
                    </>
                )
            }}
            HogMobile={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[180px] sm:max-w-[230px] md:max-w-[260px]"
                    src="./images/product-analytics-hog.png"
                    alt="A hedgehog looking at product analytics"
                />
            )}
            HogDesktop={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[180px] lg:max-w-[230px] xl:max-w-[300px]"
                    src="./images/product-analytics-hog.png"
                    alt="A hedgehog looking at product analytics"
                />
            )}
            contentOffset="mdlg:pb-6 lg:pb-8 xl:pb-20 2xl:pb-16"
            buttonLabel="Explore"
            buttonUrl="/product-analytics"
            buttonClasses="mdlg:!w-auto !w-full"
            buttonChildClasses="!bg-[#1371FF]"
        />
    )
}

export const WebAnalytics = () => {
    const imageProps = {
        loading: 'eager',
        alt: 'A screenshot of web analytics',
        placeholder: 'none',
        quality: 100,
        objectFit: 'contain',
        className: 'w-full border border-light dark:border-dark rounded md:max-w-[675px] md:shadow-2xl md:rotate-1',
    }
    const features = [
        { title: 'Pageviews, sessions, unique visitors', Icon: IconLineGraph },
        { title: 'Top pages & paths', Icon: IconBrowser },
        { title: 'Device & location', Icon: IconGlobe },
        { title: 'Channels', Icon: IconMegaphone },
    ]
    return (
        <Slide
            bgColor="lime-green"
            textColor="primary"
            title="Web analytics"
            flag="Beta"
            flagColor="yellow"
            description="Enable aggregate website analytics with one click if you're already using PostHog."
            descriptionClasses="mdlg:hidden lg:block"
            features={features}
            featureListClasses="sm:grid grid-cols-2 mdlg:flex"
            imageColumn="mdlg:col-span-9 lg:col-span-10 xl:col-span-10 lg:pl-4"
            imageClasses="px-4 mdlg:px-0 -mb-3"
            contentColumn="mdlg:col-span-7 lg:col-span-6 xl:col-span-6"
            Images={() => {
                return (
                    <>
                        <div className="block dark:hidden">
                            <StaticImage
                                {...imageProps}
                                src="../../../../contents/images/products/web-analytics/web-analytics-light.png"
                                alt="A screenshot of web analytics"
                            />
                        </div>
                        <div className="hidden dark:block">
                            <StaticImage
                                {...imageProps}
                                src="../../../../contents/images/products/web-analytics/web-analytics-dark.png"
                                alt="A screenshot of web analytics"
                            />
                        </div>
                    </>
                )
            }}
            HogMobile={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="max-w-[150px] sm:max-w-[203px] md:max-w-[203px]"
                    src="./images/web-analytics-hog.png"
                    alt="A hedgehog looking at product analytics"
                />
            )}
            HogDesktop={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[180px] 2xl:max-w-[203px]"
                    src="./images/web-analytics-hog.png"
                    alt="A hedgehog looking at product analytics"
                />
            )}
            contentOffset="mdlg:pb-6 lg:pb-8 lg:pr-8 xl:pb-12 2xl:pb-8"
            buttonLabel="Read the docs"
            buttonUrl="/docs/web-analytics"
            buttonClasses="group !border-black/25 !bg-black/10 md:!w-auto !w-full"
            buttonChildClasses="!bg-lime-green border-primary !text-primary group-hover:text-black"
        />
    )
}

export const SessionReplay = () => {
    const imageProps = {
        loading: 'eager',
        alt: 'A session recording of a fake application called Hogflix',
        placeholder: 'none',
        quality: 100,
        objectFit: 'contain',
        className: 'w-full border border-light dark:border-dark rounded md:max-w-full md:shadow-2xl md:rotate-1',
    }
    const features = [
        { title: 'Event timeline', Icon: IconClock },
        { title: 'Console logs', Icon: IconTerminal },
        { title: 'Network requests', Icon: IconPulse },
    ]
    return (
        <Slide
            bgColor="[#F2AD46]"
            textColor="primary"
            title="Session replay"
            description="Watch users interacting with your app or website. Available for web and iOS."
            additionalText={
                <p className="text-sm hidden xl:block opacity-60 pt-2 mb-1">(Android support coming soon.)</p>
            }
            features={features}
            featureListClasses="sm:grid grid-cols-2 mdlg:flex"
            imageColumn="md:pl-8 md:col-span-9 lg:col-span-10"
            imageClasses="px-4 mdlg:px-0 -mb-1.5"
            contentColumn="md:col-span-7 lg:col-span-6 lg:py-4"
            Images={() => {
                return (
                    <>
                        <div className="block dark:hidden">
                            <StaticImage
                                {...imageProps}
                                src="../../../../contents/images/products/session-replay/session-replay-light.png"
                                alt="A screenshot of a session recording"
                            />
                        </div>
                        <div className="hidden dark:block">
                            <StaticImage
                                {...imageProps}
                                src="../../../../contents/images/products/session-replay/session-replay-dark.png"
                                alt="A screenshot of a session recording"
                            />
                        </div>
                    </>
                )
            }}
            HogMobile={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[200px] mdlg:block lg:max-w-[230px] xl:max-w-[300px]"
                    src="./images/session-recording-hog.png"
                    alt="A hedgehog watching a session recording"
                />
            )}
            HogDesktop={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[180px] xl:max-w-[220px] 2xl:max-w-[275px]"
                    src="./images/session-recording-hog.png"
                    alt="A hedgehog watching a session recording"
                />
            )}
            contentOffset="mdlg:pb-6 lg:pb-8 lg:px-8 xl:pb-4"
            buttonLabel="Explore"
            buttonUrl="/session-replay"
            buttonClasses="group !border-black/25 !bg-black/10 md:!w-auto !w-full"
            buttonChildClasses="!bg-[#F2AD46] border-black !text-black group-hover:text-black"
        />
    )
}

export const FeatureFlags = () => {
    const image1Props = {
        loading: 'eager',
        alt: "A code snippet to check if the feature flag 'nav' is enabled",
        placeholder: 'none',
        quality: 100,
        objectFit: 'contain',
        className: 'w-full border border-light dark:border-dark rounded md:max-w-[840px] md:shadow-2xl md:-rotate-1',
    }
    const image2Props = {
        loading: 'eager',
        alt: 'A filter for rolling out a feature flag to 50% of organizations in a cohort',
        placeholder: 'none',
        quality: 100,
        objectFit: 'contain',
        className: 'w-full border border-light dark:border-dark rounded md:max-w-[840px] md:shadow-2xl md:rotate-1',
    }
    const features = [
        { title: 'Multivariate flags', Icon: IconTestTube },
        { title: 'JSON payloads', Icon: IconBrackets },
        { title: 'Instant rollbacks', Icon: IconRewind },
    ]
    return (
        <Slide
            bgColor="[#29DBBB]"
            textColor="primary"
            title="Feature flags"
            description="Safely roll out features to select users or cohorts."
            features={features}
            featureListClasses="sm:grid grid-cols-2 mdlg:flex"
            imageColumn="md:pl-8 md:col-span-9 lg:col-span-10 min-h-[12rem]"
            imageClasses="px-4 mdlg:px-0 -mb-1.5 flex-col xl:items-center"
            contentColumn="md:col-span-7 lg:col-span-6 lg:py-8"
            Images={() => {
                return (
                    <>
                        <div className="-rotate-1 -mr-6 -mt-2 mdlg:-mr-24 lg:-mr-52 w-3/4 mdlg:w-3/4 lg:w-3/5 z-10">
                            <div className="block dark:hidden">
                                <StaticImage
                                    {...image1Props}
                                    src="../../../../contents/images/products/feature-flags/feature-flags-1-light.png"
                                    className={`${image1Props.className}`}
                                />
                            </div>
                            <div className="hidden dark:block">
                                <StaticImage
                                    {...image1Props}
                                    className={`${image1Props.className}`}
                                    src="../../../../contents/images/products/feature-flags/feature-flags-1-dark.png"
                                />
                            </div>
                        </div>
                        <div className="rotate-1 -ml-20 mdlg:-ml-28 lg:-ml-60 w-3/4 mdlg:w-3/4 lg:w-3/5">
                            <div className="block dark:hidden">
                                <StaticImage
                                    {...image2Props}
                                    src="../../../../contents/images/products/feature-flags/feature-flags-2-light.png"
                                    className={`${image2Props.className}`}
                                />
                            </div>
                            <div className="hidden dark:block">
                                <StaticImage
                                    {...image2Props}
                                    className={`${image2Props.className} `}
                                    src="../../../../contents/images/products/feature-flags/feature-flags-2-dark.png"
                                />
                            </div>
                        </div>
                    </>
                )
            }}
            HogMobile={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[200px] mdlg:block lg:max-w-[230px] xl:max-w-[300px]"
                    src="./images/feature-flags-hog.png"
                    alt="A hedgehog toggling a feature flag"
                />
            )}
            HogDesktop={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[200px] mdlg:block lg:max-w-[230px] xl:max-w-[300px]"
                    src="./images/feature-flags-hog.png"
                    alt="A hedgehog toggling a feature flag"
                />
            )}
            contentOffset="mdlg:pb-6 lg:pb-8 lg:px-8 xl:pb-4"
            buttonLabel="Explore"
            buttonUrl="/feature-flags"
            buttonClasses="group !border-black/25 !bg-black/10 md:!w-auto !w-full"
            buttonChildClasses="!bg-[#29DBBB] border-black !text-black group-hover:text-black"
        />
    )
}

export const ABTesting = () => {
    const image1Props = {
        loading: 'eager',
        alt: 'A graph depicting an increasing trend line showing improvement in an experiment over time',
        placeholder: 'none',
        quality: 100,
        objectFit: 'contain',
        className: 'w-full dark:border dark:border-dark rounded md:max-w-[745px] md:shadow-2xl md:-rotate-1',
    }
    const image2Props = {
        loading: 'eager',
        alt: 'A slider set at 5% showing how long an experiment will need to be run in order to get the specified improvement',
        placeholder: 'none',
        quality: 100,
        objectFit: 'contain',
        className: 'w-full dark:border dark:border-dark rounded md:max-w-[400px] md:shadow-2xl md:rotate-1',
    }
    const features = [
        { title: 'Goals & secondary metrics', Icon: IconBadge },
        { title: 'Targeting & exclusion rules ', Icon: IconTarget },
        { title: 'Dynamic cohort support', Icon: IconPeople },
    ]

    return (
        <Slide
            bgColor="[#9C19BD]"
            textColor="primary-dark"
            title="A/B testing"
            description="Run experiments with statistical significance."
            features={features}
            featureListClasses="sm:grid grid-cols-2 mdlg:flex"
            imageColumn="md:pl-8 md:col-span-9 lg:col-span-10 min-h-[12rem]"
            imageClasses="px-4 mdlg:px-0 -mb-3"
            contentColumn="md:col-span-7 lg:col-span-6 lg:py-10"
            Images={() => {
                return (
                    <>
                        <div className="-rotate-1 mdlg:ml-4 lg:ml-8 mt-8 md:mt-0 md:mb-8 mdlg:m-0 w-3/4 mdlg:w-3/4 lg:w-3/5 z-10">
                            <div className="block dark:hidden">
                                <StaticImage
                                    {...image1Props}
                                    src="../../../../contents/images/products/ab-testing/ab-testing-1-light.png"
                                    className={`${image1Props.className} block dark:hidden`}
                                />
                            </div>
                            <div className="hidden dark:block">
                                <StaticImage
                                    {...image1Props}
                                    className={`${image1Props.className}`}
                                    src="../../../../contents/images/products/ab-testing/ab-testing-1-dark.png"
                                />
                            </div>
                        </div>
                        <div className="rotate-1 -mt-12 mdlg:mt-0 -ml-24 md:-ml-32 w-5/6 mdlg:w-3/4 lg:w-3/5 z-20">
                            <div className="block dark:hidden">
                                <StaticImage
                                    {...image2Props}
                                    src="../../../../contents/images/products/ab-testing/ab-testing-2-light.png"
                                    className={`${image2Props.className} `}
                                />
                            </div>
                            <div className="hidden dark:block">
                                <StaticImage
                                    {...image2Props}
                                    className={`${image2Props.className} `}
                                    src="../../../../contents/images/products/ab-testing/ab-testing-2-dark.png"
                                />
                            </div>
                        </div>
                    </>
                )
            }}
            HogMobile={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[120px] lg:max-w-[120px] xl:max-w-[175px] z-30"
                    src="./images/experiment-hog.png"
                    alt="A hedgehog running an experiment"
                />
            )}
            HogDesktop={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[120px] lg:max-w-[120px] xl:max-w-[175px]"
                    src="./images/experiment-hog.png"
                    alt="A hedgehog running an experiment"
                />
            )}
            contentOffset="mdlg:pb-6 lg:pb-8 lg:pr-8 xl:pb-12 2xl:pb-8"
            buttonLabel="Explore"
            buttonUrl="/ab-testing"
            buttonClasses="md:!w-auto !w-full"
            buttonChildClasses="!bg-[#9C19BD]"
        />
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
        <Slide
            bgColor="[#D42F18]"
            textColor="primary-dark"
            title="Surveys"
            description="Collect in-app feedback from your users"
            descriptionClasses="mdlg:hidden lg:block"
            features={features}
            featureListClasses=""
            imageColumn="md:col-span-6 lg:col-span-7 2xl:col-span-6"
            imageClasses="px-4"
            contentColumn="md:col-span-10 lg:col-span-9 2xl:col-span-10 lg:py-8"
            Images={() => {
                return (
                    <>
                        <StaticImage
                            alt="Survey widget example"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full h-full pb-8 mdlg:py-4 max-w-[337px] md:max-w-[287px] mdlg:max-w-[337px] rotate-1"
                            src="../../../../contents/images/products/surveys/survey.png"
                        />
                    </>
                )
            }}
            HogMobile={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[180px] sm:max-w-[230px] md:max-w-[260px]"
                    src="./images/surveys-hog.png"
                    alt="A hedgehog looking at product analytics"
                />
            )}
            HogDesktop={() => (
                <StaticImage
                    loading="eager"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[200px] mdlg:block lg:max-w-[250px] xl:max-w-[350px]"
                    src="./images/surveys-hog.png"
                    alt="A hedgehog looking at product analytics"
                />
            )}
            contentOffset=""
            buttonLabel="Explore"
            buttonUrl="/surveys"
            buttonClasses="md:!w-auto !w-full"
            buttonChildClasses="!bg-[#D42F18]"
        />
    )
}

export const DataPipeline = () => {
    const features = [
        { title: 'Sources', Icon: IconDownload },
        { title: 'Destinations', Icon: IconShare },
        { title: 'Transformations', Icon: IconGear },
    ]
    return (
        <Slide
            bgColor="[#43B6E7]"
            textColor="primary"
            title="Customer data platform"
            flag="Beta"
            flagColor="yellow"
            description="60+ data connections available now. Full CDP coming soon."
            features={features}
            featureListClasses="sm:grid grid-cols-2 mdlg:flex"
            imageColumn="flex items-center justify-center pl-8 py-4 md:col-span-9 lg:col-span-10"
            imageClasses="px-4 mdlg:px-0 -mb-3"
            contentColumn="md:col-span-7 lg:col-span-6 lg:py-8"
            Images={() => {
                return (
                    <>
                        <StaticImage
                            alt="Some hedgehogs fixing some data pipes"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full h-full max-w-[571px]"
                            src="../../../../contents/images/products/cdp/pipeline-scene.png"
                        />
                    </>
                )
            }}
            contentOffset="mdlg:pb-6 lg:pb-8 lg:pr-8 xl:pb-12 2xl:pb-8"
            buttonLabel="Browse connections"
            buttonUrl="/cdp"
            buttonClasses="group !border-black/25 !bg-black/10 md:!w-auto !w-full"
            buttonChildClasses="!bg-[#43B6E7] border-black !text-black group-hover:text-black"
        />
    )
}

export const DataWarehouse = () => {
    const features = []
    return (
        <Slide
            containerClasses="!pt-0"
            bgColor="[#8567FF]"
            textColor="primary-dark"
            title="Data warehouse"
            flag="Beta"
            flagColor="yellow"
            description="Full data warehouse product coming soon"
            additionalText={
                <p className="text-sm opacity-75 pt-2 mb-1">
                    Also syncs with Amazon S3, BigQuery, and Amazon Redshift using our API.
                </p>
            }
            imageColumn="flex md:col-span-9 lg:col-span-10"
            imageClasses="px-4 mdlg:px-0 -mb-3"
            contentColumn="md:col-span-7 lg:col-span-6 mdlg:py-8 lg:py-12 xl:py-16"
            features={features}
            Images={() => {
                return (
                    <>
                        <StaticImage
                            alt="An artist's depiction of a data warehouse"
                            placeholder="none"
                            quality={100}
                            objectFit="contain"
                            className="w-full h-full max-h-96 max-w-[826px]"
                            src="../../../../contents/images/products/data-warehouse/warehouse-scene.png"
                        />
                    </>
                )
            }}
            HogMobile={() => (
                <StaticImage
                    alt="Just another hedgehog"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[100px] mdlg:block lg:max-w-[130px] xl:max-w-[150px]"
                    src="../../../../contents/images/products/data-warehouse/warehouse-hog.png"
                />
            )}
            HogDesktop={() => (
                <StaticImage
                    alt="Just another hedgehog"
                    placeholder="none"
                    quality={100}
                    className="w-full max-w-[100px] mdlg:block lg:max-w-[130px] xl:max-w-[150px]"
                    src="../../../../contents/images/products/data-warehouse/warehouse-hog.png"
                />
            )}
            contentOffset="mdlg:pb-6 lg:pb-8 lg:pr-8 xl:pb-12 2xl:pb-8"
            buttonLabel="Learn more"
            buttonUrl="/docs/data-warehouse"
            buttonClasses="group !border-white/25 !bg-white/10 md:!w-auto !w-full"
            buttonChildClasses="!bg-[#8567FF] border-white !text-white group-hover:text-white"
        />
    )
}

export const Sql = () => {
    const features = [
        { title: 'Breakdowns', Icon: IconColumns },
        { title: 'Filters', Icon: IconFilter },
        { title: 'Aggregations', Icon: IconGridMasonry },
    ]

    return (
        <div className="md:bg-[#D42F18] rounded-md text-white flex items-end">
            <div className="relative md:grid grid-cols-16 gap-2 lg:gap-4 w-full">
                <ImageContainer className="pl-8 md:col-span-9 lg:col-span-10">
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
                        {features && <FeatureList features={features} />}
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
