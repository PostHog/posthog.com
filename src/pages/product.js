import { Autocapture, Compliance, OpenSource, Pipelines, SelfHost, Warehouse } from 'components/Icons/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Slider from 'react-slick'
import Layout from '../components/Layout'
import { SEO } from '../components/seo'
import './styles/features.scss'

function ProductPage() {
    const sliderSettings = {
        dots: false,
        infinite: true,
        arrows: false,
        autoplay: true,
        slidesToShow: 5,
        speed: 10000,
        autoplaySpeed: 1,
        cssEase: 'linear',
        pauseOnHover: false,
        accessibility: false,
        draggable: false,
    }

    const features = [
        {
            title: 'Event pipelines',
            icon: <Pipelines />,
        },
        {
            title: 'Export to data warehouse',
            icon: <Warehouse />,
        },
        {
            title: 'Open source',
            icon: <OpenSource />,
        },
        { title: 'Self-hostable', icon: <SelfHost /> },
        {
            title: 'Autocapture',
            icon: <Autocapture />,
        },
        {
            title: 'Compliance-friendly',
            icon: <Compliance />,
        },
    ]

    return (
        <Layout>
            <SEO title="Product • PostHog" />
            <section>
                <Slider {...sliderSettings} className="text-[#5B5B5B] font-bold my-7">
                    {features.map(({ title, icon }, index) => {
                        return (
                            <div key={index}>
                                <span className="flex items-center justify-center space-x-2">
                                    {icon}
                                    <p className="m-0">{title}</p>
                                </span>
                            </div>
                        )
                    })}
                </Slider>
            </section>
            <section className="grid grid-cols-2 gap-14 items-center">
                <div className="w-[480px] justify-self-end">
                    <h1 className="text-gray text-[20px] mb-0">What is PostHog?</h1>
                    <h2 className="text-[48px] mt-0 font-bold">
                        An ever-expanding suite of tools to <span className="text-red">build better products</span>
                    </h2>
                    <ul className="text-[20px] font-semibold">
                        <li className="text-[20px]">Measure performance</li>
                        <li className="text-[20px]">Diagnose & build context</li>
                        <li className="text-[20px]">Test & roll out improvements</li>
                    </ul>
                    <p>PostHog is open source, and a radically different approach to building better products.</p>
                    <p>
                        Host on your own infrastructure and capture up to 30% more events, compared to cloud-based
                        analytics tools.
                    </p>
                </div>
                <div className="justify-self-end">
                    <StaticImage quality={100} src="../images/product-hero.png" />
                </div>
            </section>
        </Layout>
    )
}

export default ProductPage
