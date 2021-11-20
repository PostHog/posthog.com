import { Autocapture, Compliance, OpenSource, Pipelines, SelfHost, Warehouse } from 'components/Icons/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/seo'
import './styles/features.scss'

function ProductPage() {
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
            <section className="overflow-hidden mt-7 mb-12">
                <ul className="text-primary dark:text-white opacity-50 font-bold flex infinite-features-ticker list-none p-0">
                    {[...features, ...features].map(({ title, icon }, index) => {
                        return (
                            <li
                                className="w-[300px] flex-shrink-0 flex space-x-2 items-center justify-center"
                                key={index}
                            >
                                {icon}
                                <p className="m-0">{title}</p>
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className="my-12 lg:my-0 grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 items-center">
                <div className="lg:max-w-[480px] justify-self-end px-5 box-content">
                    <h1 className="text-primary dark:text-white opacity-50 text-[20px] mb-0">What is PostHog?</h1>
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
