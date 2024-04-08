import React, { useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'

export const Intro = ({ image = true }) => {
    return (
        <>
            <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded flex flex-col items-center md:flex-row gap-8 pt-2 mb-8">
                <div className="p-4 md:p-8">
                    <h1 className="text-4xl mt-0 mb-2 flex items-center space-x-2">
                        <span>Data warehouse</span>
                    </h1>
                    <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                        A single source for all your important data
                    </h3>
                    <CallToAction to="/docs/data-warehouse/setup">Link your first source</CallToAction>
                </div>

                {image && (
                    <figure className="m-0 p-0">
                        <StaticImage
                            alt=""
                            placeholder="none"
                            quality={100}
                            className=""
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/data-warehouse.png"
                        />
                    </figure>
                )}
            </div>
        </>
    )
}

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && <QuickLinks items={docsMenu.children[7].children} />}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Article"
                        title="Linking a source"
                        description="Get started by adding your first external source to PostHog"
                        Image={
                            <StaticImage
                                alt=""
                                objectPosition="right"
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png"
                            />
                        }
                        url="/docs/data-warehouse/setup"
                    />
                    <ResourceItem
                        type="Article"
                        title="Query your source"
                        description="Once you have a source linked, learn how to query it using HogQL"
                        Image={
                            <StaticImage
                                alt=""
                                objectPosition="right"
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png"
                            />
                        }
                        url="/docs/data-warehouse/query"
                    />
                    <ResourceItem
                        type="Guide"
                        title="The power of HogQL’s sum() aggregation"
                        description="Unlock a new level of aggregation customization"
                        Image={
                            <StaticImage
                                alt=""
                                objectPosition="right"
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png"
                            />
                        }
                        url="/tutorials/hogql-sum-aggregation"
                    />
                </ul>
            </section>
        </>
    )
}

const DataWarehouse: React.FC = () => {
    return (
        <Layout>
            <SEO title="Data warehouse - Docs - PostHog" />

            <PostLayout title={'Data warehouse'} hideSurvey hideSidebar>
                <Intro />
                <Content />
                <CallToAction to="/docs/data-warehouse/setup" width="full">
                    Visit the manual
                </CallToAction>
            </PostLayout>
        </Layout>
    )
}

export default DataWarehouse
