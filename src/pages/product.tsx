import Layout from 'components/Layout'
import PostLayout, { TableOfContents } from 'components/PostLayout'
import WhatsNext from 'components/Product/WhatsNext'
import API from 'components/Product/API'
import CTA from 'components/Product/CTA'
import Apps from 'components/Product/Apps'
import DataWarehouse from 'components/Product/DataWarehouse'
import EventPipelines from 'components/Product/EventPipelines'
import { IProps, FeatureWrapperCol } from 'components/Product/FeatureWrapper'
import Hero from 'components/Product/Hero'
import SelfHosting from 'components/Product/SelfHosting'
import { ProductIcons } from 'components/ProductIcons/ProductIcons'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef, useState } from 'react'
import Scrollspy from 'react-scrollspy'
import { Link } from 'react-scroll'
import Slider from 'react-slick'
import { SEO } from 'components/seo'
import slugify from 'slugify'

const features: IProps[] = [
    {
        title: 'Product analytics',
        disclaimer: 'Alternative to Amplitude, Heap, Mixpanel',
        image: <StaticImage src="../components/Product/images/product-analytics.png" alt="Product analytics" />,
        features: [
            {
                title: 'Funnels',
                icon: ProductIcons?.funnels,
                url: '/product/funnels',
            },
            {
                title: 'Graphs & trends',
                icon: ProductIcons?.trends,
                url: '/product/trends',
            },
            {
                title: 'Path analysis',
                icon: ProductIcons?.pathAnalysis,
                url: '/product/user-paths',
            },
            {
                title: 'Dashboards',
                icon: ProductIcons?.dashboards,
                url: '/product/collaboration',
            },
        ],
    },
    {
        title: 'Session recording',
        cta: { title: 'Learn more', url: '/product/session-recording' },
        icon: ProductIcons.sessionRecording,
        subtitle: 'with console logs',
        image: <StaticImage src="../components/Product/images/session-recording.png" alt="Session recording" />,
        disclaimer: 'Alternative to Hotjar, Logrocket, Matomo',
    },
    {
        title: 'A/B testing & experiments',
        disclaimer: 'Alternative to Optimizely, VWO, Google Optimize',
        image: <StaticImage src="../components/Product/images/experimentation.png" alt="A/B testing & experiments" />,
        features: [
            {
                title: 'Experimentation Suite',
                icon: ProductIcons.experiments,
                url: '/product/experimentation-suite',
            },
            {
                title: 'Correlation analysis',
                icon: ProductIcons.correlationAnalysis,
                url: '/product/correlation-analysis',
            },
        ],
    },
    {
        title: 'Feature flags',
        cta: { title: 'Learn more', url: '/product/feature-flags' },
        icon: ProductIcons.featureFlags,
        subtitle: 'with multivariate testing',
        image: <StaticImage src="../components/Product/images/feature-flags.png" alt="Feature flags" />,
        disclaimer: 'Alternative to LaunchDarkly',
    },
]

const menu = [
    {
        name: 'Overview',
        url: 'overview',
        icon: ProductIcons.posthogMonochrome,
    },
    { name: 'Top features', url: 'top-features', icon: ProductIcons.topFeatures },
    { name: 'Apps', url: 'apps', icon: ProductIcons.appLibrary },
    { name: 'Event pipelines', url: 'event-pipelines', icon: ProductIcons.eventPipelines },
    { name: 'Data warehouse', url: 'data-warehouse', icon: ProductIcons.dataWarehouse },
    { name: 'Self-hosting', url: 'self-hosting', icon: ProductIcons.selfHosting },
    { name: 'API', url: 'api', icon: ProductIcons.api },
    { name: "What's next?", url: 'roadmap', icon: ProductIcons.experiments },
]

const Menu = () => {
    return (
        <Scrollspy
            className="list-none m-0 p-0 flex flex-col space-y-1"
            items={menu.map((navItem) => navItem.url)}
            currentClassName="bg-gray-accent-light"
            on
        >
            {menu.map(({ title, url, icon }) => {
                return (
                    <li key={title}>
                        <Link
                            smooth
                            duration={300}
                            to={url}
                            hashSpy
                            className="cursor-pointer flex items-center space-x-2 text-[17px] font-semibold px-3 py-2 rounded-md hover:bg-gray-accent-light text-black hover:text-black"
                            spy
                        >
                            <span className="w-[36px]">{icon}</span>
                            <span>{title}</span>
                        </Link>
                    </li>
                )
            })}
        </Scrollspy>
    )
}

const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,
    variableWidth: true,
}

export default function Product() {
    const sliderRef = useRef()
    const [activeSliderIndex, setActiveSliderIndex] = useState(0)
    return (
        <Layout>
            <SEO title={`Product - PostHog`} />
            <Hero />
            <PostLayout
                title="Product"
                hideSidebar
                hideSearch
                hideSurvey
                menu={menu}
                article={false}
                contentContainerClassName="w-full pb-12 md:px-12 md:-mt-8"
                menuType="scroll"
                menuWidth={{ left: 350, right: 350 }}
            >
                <div className="sticky top-0 z-10 bg-tan lg:hidden mb-6 py-2">
                    <div className="pl-5">
                        <Slider ref={sliderRef} {...sliderSettings}>
                            {menu.map(({ name, icon, url }, index) => {
                                return (
                                    <div key={name}>
                                        <Link
                                            smooth
                                            duration={300}
                                            offset={-57}
                                            to={url}
                                            hashSpy
                                            className={`mr-1 cursor-pointer flex items-center space-x-2 text-[14px] font-semibold px-3 py-2 rounded-md hover:bg-gray-accent-light text-black hover:text-black ${
                                                activeSliderIndex === index ? 'bg-gray-accent-light' : ''
                                            }`}
                                            spy
                                            onClick={() => sliderRef?.current?.slickGoTo(index)}
                                            onSetActive={() => {
                                                setActiveSliderIndex(index)
                                                sliderRef?.current?.slickGoTo(index)
                                            }}
                                        >
                                            <span className="w-[25px]">{icon}</span>
                                            <span>{name}</span>
                                        </Link>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
                <div id="top-features">
                    <div className="max-w-5xl mx-auto px-5 box-content">
                        <h1 className="text-4xl md:text-5xl m-0">Top features</h1>
                        <p className="text-xl text-black/50 font-semibold m-0 mt-3 max-w-[700px]">
                            Product analytics was the trojan horse, but PostHog also ships with session recording,
                            feature flags, A/B testing, and more.
                        </p>
                    </div>
                    {features.map((feature, index) => (
                        <FeatureWrapperCol id={slugify(feature.title, { lower: true })} key={index} {...feature} />
                    ))}
                </div>
                <Apps />
                <EventPipelines />
                <DataWarehouse />
                <SelfHosting />
                <API />
                <WhatsNext />
                <CTA className="mt-12 -mx-12 !px-20 !md:px-16 !-mb-12 md:!-mb-20" />
            </PostLayout>
        </Layout>
    )
}
