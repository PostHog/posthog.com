import React, { useRef, useState } from 'react'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import { useValues } from 'kea'
import { SEO } from '../components/seo'
import Layout from 'components/Layout'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider'
import Logo from 'components/Logo'
import Slider from 'react-slick'
import { SliderNav } from 'components/Icons/Icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Quote } from 'components/Pricing/Quote'
import outlinedChart from '../images/outlined-chart.svg'
import Highlight, { defaultProps } from 'prism-react-renderer'
import factoBlurb from '../images/facto-blurb.svg'
import AnimateIntoView from 'components/AnimateIntoView'
import cntl from 'cntl'

const exampleCode = `SELECT entrance_period_start,
       reached_from_step_count,
       reached_to_step_count,
       if(reached_from_step_count > 0, round(reached_to_step_count / reached_from_step_count * 100, 2), 0) AS conversion_rate
  FROM (
        SELECT entrance_period_start,
               countIf(steps_completed >= 1) AS reached_from_step_count,
               countIf(steps_completed >= 2) AS reached_to_step_count
          FROM (
                SELECT person_id,
                       toStartOfDay(timestamp) AS entrance_period_start,
                       max(steps) AS steps_completed
                  FROM (
                        SELECT *,
                               if(latest_0 < latest_1 AND latest_1 <= latest_0 + INTERVAL 14 DAY, 2, 1) AS steps ,
                               if(isNotNull(latest_1) AND latest_1 <= latest_0 + INTERVAL 14 DAY, dateDiff('second', toDateTime(latest_0), toDateTime(latest_1)), NULL) step_1_conversion_time
                          FROM (
                                SELECT person_id,
                                       timestamp,
`

const Icon = ({ name, className }) => (
    <svg className={className}>
        <use xlinkHref={`/images/home-sprite.svg#${name}`}></use>
    </svg>
)

const Feature = ({ title, icon }) => {
    return (
        <div className="flex whitespace-nowrap py-4 md:py-6 space-x-1 md:space-x-4  font-bold text-almost-black hover:text-almost-black items-center justify-center border-r-2 border-dashed border-gray-accent-light">
            <Icon className={'w-6 h-6'} name={icon} />
            <span className="text-[12px] md:text-[16px]">{title}</span>
        </div>
    )
}

const Customer = ({ company }) => {
    return (
        <li>
            <svg className="icon w-full h-[10vw] py-[2vw] px-[2vw] xl:py-0 xl:h-auto xl:px-8 border-t-2 border-l-2 border-dashed border-gray-accent-light">
                <use xlinkHref={`/images/home-sprite.svg#${company}`}></use>
            </svg>
        </li>
    )
}

const SliderItem = ({ image, description, icon, feature }) => {
    return (
        <div>
            <div className="p-6 sm:p-10 border-r-2 border-dashed max-w-lg md:max-w-2xl lg:max-w-4xl w-full border-gray-accent-light">
                {image}
                <p className="font-semibold text-almost-black mt-2 before:border-l-4 before:border-gray before:rounded before:mr-2 mb-0">
                    {description} <Icon className="w-8 h-8 inline-block" name={icon} /> {feature}
                </p>
            </div>
        </div>
    )
}

const PlatformFeatures = () => {
    const sliderRef = useRef(null)
    const [activeFeature, setActiveFeature] = useState(0)
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 639,
                settings: {
                    variableWidth: false,
                },
            },
        ],
    }

    const handleChange = (oldIndex, newIndex) => {
        setActiveFeature(newIndex)
    }

    const FeatureButton = ({ title, index }) => {
        const borderColor = index === activeFeature ? 'red' : 'gray'
        const textColor = index === activeFeature ? 'red' : 'almost-black'
        const handClick = () => {
            sliderRef.current.slickGoTo(index)
        }
        return (
            <button className={`border-b-4 border-${borderColor} text-${textColor}`} onClick={handClick}>
                {title}
            </button>
        )
    }

    return (
        <section className={section()}>
            <div>
                <h2 className={heading('lg', 'almost-black', 'max-w-[1100px] mx-auto')}>
                    Everything product-led teams need <span className="text-yellow">in one place</span>
                </h2>
                <h3 className="text-base md:text-2xl text-center mt-4 md:mt-8">
                    One platform for <FeatureButton index={0} title="funnel analysis" />,{' '}
                    <FeatureButton index={1} title="product usage trends" />,{' '}
                    <FeatureButton title="session recordings" index={2} /> &{' '}
                    <FeatureButton index={3} title="feature flags" />
                </h3>
            </div>

            <div className="flex justify-center space-x-2 my-8">
                <button onClick={() => sliderRef.current.slickPrev()}>
                    <SliderNav className="transform rotate-180" bgColor="#E5E7E0" arrowColor="#BFBFBC" />
                </button>
                <button onClick={() => sliderRef.current.slickNext()}>
                    <SliderNav bgColor="black" arrowColor="#EEEFE9" />
                </button>
            </div>
            <div className="max-w-screen-2xl mx-auto border-t-2 border-b-2 border-dashed border-gray-accent-light">
                <Slider beforeChange={handleChange} ref={sliderRef} {...settings}>
                    <SliderItem
                        image={<StaticImage quality={100} height={500} width={890} src="../images/funnels-slide.jpg" />}
                        description="Identify dropoff and prioritize product changes with"
                        icon="funnels"
                        feature="Funnels"
                    />
                    <SliderItem
                        width={890}
                        image={<StaticImage quality={100} height={500} width={890} src="../images/trends-slide.jpg" />}
                        description="See changes in product usage with"
                        icon="trends"
                        feature="Trends"
                    />
                    <SliderItem
                        width={890}
                        image={
                            <StaticImage
                                quality={100}
                                height={500}
                                width={890}
                                src="../images/session-recordings-slide.jpg"
                            />
                        }
                        description="Understand why with"
                        icon="session-recordings-with-bg"
                        feature="Session recordings"
                    />
                    <SliderItem
                        width={890}
                        image={
                            <StaticImage
                                quality={100}
                                height={500}
                                width={890}
                                src="../images/feature-flags-slide.jpg"
                            />
                        }
                        description="Roll out changes safely with"
                        icon="feature-flags-with-bg"
                        feature="Feature flags"
                    />
                </Slider>
            </div>
            <div className="px-4 text-center my-16">
                <h4 className="text-3xl font-bold mb-8">
                    <span className="text-almost-black opacity-40">Plus</span> cohorts, user paths, retention, session
                    browsing
                    <br />{' '}
                    <span className="text-xl">
                        & synced annotations{' '}
                        <span className="text-almost-black opacity-40">across every view in the platform</span>
                    </span>
                </h4>
                <CallToAction
                    type="button"
                    outline
                    to="/pricing"
                    className="bg-tan text-almost-black hover:text-almost-black"
                >
                    Explore all features
                </CallToAction>
            </div>
        </section>
    )
}

const Chip = ({ icon, title, className }) => {
    return (
        <div className={`bg-gray-accent-light flex space-x-2 py-2 px-4 rounded-lg items-center mt-2 ${className}`}>
            <Icon className="w-5 h-5" name={icon} />
            <span className="text-sm sm:text-base font-bold text-almost-black">{title}</span>
        </div>
    )
}

const PipelineGraphic = () => {
    return (
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-3 mt-16 col-span-3 w-1/4 lg:w-auto">
            <div className="flex justify-center items-center lg:flex-col">
                <Icon className="h-5 w-5" name="bullet" />
                <div className="lg:w-[1px] w-full lg:h-28 h-[1px] relative border-t-2 lg:border-l-2 border-gray-accent-light border-dashed" />
                <div className="h-1/2 lg:w-1/2  w-[1px] lg:h-[1px] border-l-2 lg:border-t-2 self-end border-gray-accent-light border-dashed" />
            </div>
            <div className="flex justify-center items-center lg:flex-col">
                <Icon className="h-5 w-5" name="bullet" />
                <div className="lg:w-[1px] w-full lg:h-28 h-[1px] relative border-t-2 lg:border-l-2 border-gray-accent-light border-dashed" />
                <div className="lg:w-full w-[1px] lg:h-[1px] h-full lg:border-t-2 border-l-2 self-end lg:self-start border-gray-accent-light border-dashed" />
            </div>
            <div className="flex justify-center items-center lg:flex-col">
                <Icon className="h-5 w-5" name="bullet" />
                <div className="w-full lg:w-[1px] h-1[px] lg:h-28 relative border-t-2 lg:border-l-2 border-gray-accent-light border-dashed" />
                <div className="w-[1px] lg:w-1/2 h-full lg:h-[1px] border-l-2 lg:border-t-2 self-start border-gray-accent-light border-dashed" />
            </div>
            <div className="flex justify-center items-center lg:flex-col relative lg:col-span-3">
                <div className="absolute left-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full -top-8 z-10">
                    <Icon name="logo-bullet" className="w-16 h-16 mx-auto" />
                    <h5 className="text-2xl font-bold lg:block hidden">
                        Self-serve product analytics for 90% of your product questions
                    </h5>
                </div>

                <div className="w-full lg:w-[1px] h-[1px] lg:h-28 relative border-t-2 lg:border-l-2 border-gray-accent-light border-dashed" />
                <div className="block lg:hidden w-[1px] lg:w-1/2 h-1/2 lg:h-[1px] border-l-2 lg:border-t-2 self-start border-gray-accent-light border-dashed" />
                <Icon className="h-5 w-5 order-first lg:order-last" name="bullet" />
            </div>
        </div>
    )
}

const CommunityStat = ({ title, description }) => {
    return (
        <li className="p-6">
            <div className="text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-almost-black to-white">
                {title}
            </div>
            <div className="text-17px mt-2 font-semibold">{description}</div>
        </li>
    )
}

const CodeBlock = () => {
    return (
        <Highlight {...defaultProps} code={exampleCode} language="sql">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className}`} style={{ background: '#24292E', margin: 0 }}>
                    {tokens.map((line, i) => (
                        <div className="table-row" key={i} {...getLineProps({ line, key: i })}>
                            <span className="table-cell pr-4">{i + 1}</span>
                            <span className="table-cell">
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </span>
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}

const heading = (size = 'lg', color = 'almost-black', classes = '') => {
    console.log(size, color, classes)
    const options = {
        lg: 'text-4xl md:text-6xl',
        md: 'text-3xl lg:text-5xl',
        sm: 'text-base md:text-xl font-semibold mt-2 lg:mt-4',
    }
    return cntl`
        m-0
        text-center
        ${options[size]}
        text-${color}
        ${classes}
    `
}

const section = (className = '') => cntl`
    max-w-screen-2xl
    mx-auto
    my-16
    md:my-32
    px-4
    ${className}
`

const IndexPage = () => {
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1090,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    }
    const breakpoints = useBreakpoint()
    useValues(posthogAnalyticsLogic) // mount this logic
    return (
        <Layout>
            <SEO
                title="PostHog - Open-Source Product Analytics"
                description="Self-hosted product analytics stack, to deploy on your infrastructure."
            />
            <section className="md:h-[calc(100vh-87px)] flex flex-col justify-center items-center">
                <div className="text-center mt-6 md:mt-auto px-4">
                    <h1 className="text-4xl md:text-6xl m-0">
                        Host your own
                        <br /> product analytics suite
                    </h1>
                    <h2 className={heading('sm', 'almost-black', 'my-6')}>
                        With our open source platform, customer data never has to leave your infrastructure
                    </h2>
                    <div className="flex flex-col justify-center items-center space-y-2 md:space-y-4">
                        <CallToAction width="56" to="/pricing">
                            Get started
                        </CallToAction>
                        <CallToAction
                            type="button"
                            width="56"
                            outline
                            to="/pricing"
                            className="bg-tan text-almost-black hover:text-almost-black"
                        >
                            Schedule a demo
                        </CallToAction>
                    </div>
                </div>
                <p className="md:mt-auto my-10 md:mb-12">
                    Don’t need to self host? Try <Link to="/sign-up">PostHog Cloud</Link>
                </p>
                <div className="bg-[#DFE0DA] bg-opacity-70 w-full">
                    <Slider {...settings} className="list-none m-0 p-0">
                        <Feature icon="event-pipelines" title="Event pipelines" />
                        <Feature icon="analytics" title="Analytics" />
                        <Feature icon="session-recordings" title="Session recordings" />
                        <Feature icon="feature-flags" title="Feature flags" />
                        <Feature icon="data-warehouse" title="Export to data warehouse" />
                    </Slider>
                </div>
            </section>
            <section className={section()}>
                <h2 className={heading('md')}>
                    These industry leaders <span className="text-blue">self-host</span> their product analytics
                </h2>
                <div className="mt-8 md:mt-20">
                    <ul className="list-none m-0 p-0 grid grid-cols-4 border-b-2 border-r-2 border-dashed border-gray-accent-light">
                        <Customer company="y-combinator" />
                        <Customer company="staples" />
                        <Customer company="spacex" />
                        <Customer company="landmark" />
                        <Customer company="hasura" />
                        <Customer company="grafana" />
                        <Customer company="outbrain" />
                        <Customer company="tinkoff" />
                    </ul>
                </div>
            </section>
            <section className="px-4">
                <div className={section('bg-almost-black rounded-lg p-4 lg:p-12 lg:pt-32')}>
                    <div className="flex items-center flex-col md:flex-row space-x-4">
                        <div className="relative">
                            <AnimateIntoView className="absolute -right-16">
                                <img src={factoBlurb} />
                            </AnimateIntoView>
                            <StaticImage className="max-w-[200px] md:max-w-full" src="../images/facto-home.png" />
                        </div>
                        <div>
                            <h2 className="text-white m-0 text-2xl sm:text-4xl md:text-3xl leading-none xl:text-6xl">
                                <span className="text-red">Quit writing SQL</span>
                                <br /> to answer product questions
                            </h2>
                            <h3 className="m-0 mt-2 md:mt-4 text-base sm:text-lg  xl:text-2xl text-gray">
                                PostHog can answer 90% of them, out of the box.
                            </h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 text-center dark mb-4 md:mb-8 mt-12 md:mt-24 items-center">
                        <h4 className="text-white text-xs sm:text-base md:text-xl m-0">Before PostHog</h4>
                        <h4 className="text-white flex items-center space-x-1 sm:space-x-4 justify-center text-xs sm:text-base md:text-xl m-0">
                            <span>With</span> <Logo className="max-w-[25px] sm:max-w-[40px] md:w-auto" light noText />{' '}
                            <span>PostHog</span>
                        </h4>
                    </div>
                    <ReactCompareSlider
                        handle={
                            <ReactCompareSliderHandle
                                buttonStyle={{ background: 'black', backdropFilter: 'none', width: 36, height: 36 }}
                            />
                        }
                        itemOne={
                            <div className="w-full">
                                <CodeBlock />
                            </div>
                        }
                        itemTwo={
                            <div className="w-full">
                                <img className="float-right" src={outlinedChart} />
                            </div>
                        }
                    />
                </div>
            </section>
            <PlatformFeatures />
            <section className={section('text-center')}>
                <h2 className={heading()}>Event pipelines</h2>
                <h3 className={heading('sm')}>
                    Reliably ingest data at any scale to build a holistic view of your customers.
                </h3>
                <div className="lg:block flex">
                    <div className="grid lg:grid-cols-3 mt-8 lg:mt-16 mb-8 gap-8 lg:gap-0 w-full sm:w-3/4 lg:w-auto">
                        <div>
                            <h4 className="text-2xl m-0 text-blue">Push from data warehouse</h4>
                            <p className="text-base">from BigQuery, Snowflake, S3 or Redshift</p>
                            <div className="flex space-x-2 justify-center items-center flex-wrap max-w-xs mx-auto">
                                <Chip icon="snowflake" title="Snowflake" />
                                <Chip icon="bigquery" title="BigQuery" />
                                <Chip icon="s3" title="S3" />
                                <Chip icon="redshift" title="Redshift" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-2xl m-0 text-red">Push from data warehouse</h4>
                            <p className="text-base">JavaScript, server-side and mobile SDKs</p>
                            <div className="flex space-x-2 justify-center items-center flex-wrap">
                                <Chip icon="pageviews" title="Pageviews" />
                                <Chip icon="clicks" title="Clicks" />
                                <Chip icon="tap" title="Taps" />
                                <Chip icon="mobile-sdk" title="Mobile SDKs" />
                                <Chip icon="react" title="React" />
                                <Chip icon="forms" title="Forms" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-2xl m-0 text-yellow">Integrate your ecosystem</h4>
                            <p className="text-base">PostHog plugins pipe data between your stack</p>
                            <div className="flex space-x-2 justify-center items-center flex-wrap">
                                <Chip icon="hubspot" title="HubSpot" />
                                <Chip icon="salesforce" title="Salesforce" />
                                <Chip icon="sendgrid" title="Sendgrid" />
                            </div>
                        </div>
                        {!breakpoints.md && <PipelineGraphic />}
                        <div className="lg:mt-6 lg:col-span-3">
                            <h4 className="text-2xl m-0 text-blue">Push to data warehouse</h4>
                            <p className="text-base">An actionable data schema sets you up for further analysis</p>
                            <div className="flex space-x-2 justify-center items-center flex-wrap max-w-xs mx-auto">
                                <Chip icon="snowflake" title="Snowflake" />
                                <Chip icon="bigquery" title="BigQuery" />
                                <Chip icon="s3" title="S3" />
                                <Chip icon="redshift" title="Redshift" />
                            </div>
                        </div>
                    </div>
                    {breakpoints.md && <PipelineGraphic />}
                </div>
            </section>
            <Quote
                className={section('text-left')}
                name="Ben White"
                title="@benjackwhite"
                image={
                    <StaticImage
                        width={100}
                        height={100}
                        alt="Ben White - @benjackwhite"
                        src="../images/ben-white.png"
                    />
                }
                quote={
                    <span>
                        PostHog is what I always wanted a Product Analytics SaaS to be.{' '}
                        <span className="text-red">Private cloud option</span> so GDPR becomes way more manageable,{' '}
                        <span className="text-red">
                            features built based on direct community feedback, focus on simplicity and usefulness
                        </span>{' '}
                        over vanity features...Great job people!
                    </span>
                }
            />
            <section className={section('text-center')}>
                <div className="bg-almost-black w-full rounded-lg px-4 py-16">
                    <h2 className={heading('md', 'white')}>
                        Join our <span className="text-red">huuuuge*</span> open source community
                    </h2>
                    <h3 className={heading('sm', 'tan')}>*4,600+ stars on GitHub</h3>
                    <ul className="grid sm:grid-cols-3 text-white m-0 p-0 list-none my-8 sm:my-20 divide-gray-accent-light divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-dashed">
                        <CommunityStat title="15k+" description="Developer community" />
                        <CommunityStat title="140" description="Contributors" />
                        <CommunityStat title="10b" description="Events tracked" />
                    </ul>
                    <CallToAction outline className="bg-almost-black text-white">
                        Browse on GitHub
                    </CallToAction>
                </div>
            </section>
            <section className={section('text-center')}>
                <div className="bg-blue w-full rounded-lg px-4 py-28">
                    <h2 className={heading('lg', 'white')}>Give it a try</h2>
                    <h3 className={heading('sm', 'white')}>Join 5,500 companies already using PostHog.</h3>
                    <div className="mt-12 flex flex-col space-y-4 items-center justify-center">
                        <CallToAction type="button" width="56" className="bg-white text-blue border-2 border-white">
                            Get started
                        </CallToAction>
                        <CallToAction
                            type="button"
                            width="56"
                            className="bg-blue text-white border-2 rounded-full border-white"
                        >
                            Schedule a demo
                        </CallToAction>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default IndexPage
