import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import { CallToAction } from 'components/CallToAction'
import { IconLightBulb } from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'
import { docsMenu } from '../../navs'
import * as Icons from '@posthog/icons'

const ProductLink = ({ icon, name, url, color }) => {
    const Icon = Icons[icon]
    return (
        <Link to={url} className="flex items-center border border-light dark:border-dark hover:border-black/50 dark:hover:border-white/50 px-1 py-0.5 rounded-sm text-primary/75 dark:text-primary-dark/75 hover:text-primary dark:hover:text-primary-dark relative hover:top-[-.5px] active:top-[.5px] hover:scale-[1.01] active:scale-[.995]">
            <Icon className={`w-4 h-4 mr-1 text-${color}`} />
            <span className="text-sm">{name}</span>
        </Link>
    )
}

const ProductItem = ({ product }) => {
    const Icon = Icons[product.icon]
    return (
        <li className="flex flex-col @lg:flex-row justify-between gap-4 py-5">
            <div className="flex gap-2">
                <div>
                    <Icon className={`w-6 h-6 text-${product.color}`} />
                </div>
                <div className="flex-1">
                    <strong>{product.name}</strong>
                    <p className="mb-0 text-[15px] opacity-75">{product.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {product.children
                            .filter((child) => child.featured)
                            .map((child, index) => (
                                <ProductLink key={index} {...child} />
                            ))}
                    </div>
                </div>
            </div>
            <aside className="@lg:pt-1">
                <CallToAction to={product.url} type="outline" size="md" className="!w-full sm:!w-auto">
                    Visit
                </CallToAction>
            </aside>
        </li>
    )
}

const ProductList = () => {
    const products = docsMenu.children
        .filter((item) => item.name !== 'Product OS')
        .concat(docsMenu.children.find((item) => item.name === 'Product OS'))

    return (
        <ul className="list-none p-0 m-0 max-w-4xl divide-y divide-light dark:divide-dark">
            {products.map((product, index) => (
                <ProductItem key={index} product={product} />
            ))}
        </ul>
    )
}

export const DocsIndex = () => {
    return (
        <Layout>
            <SEO title="Documentation - PostHog" />

            <PostLayout article={false} title={'Docs'} hideSidebar hideSurvey>
                <section className="mb-8 flex flex-col-reverse lg:flex-row gap-4 bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md p-4 md:p-8 lg:pr-0 shadow-xl">
                    <div className="@container flex-1 text-center sm:text-left">
                        <h2>New to PostHog?</h2>
                        <p className="text-[15px]">
                            The getting started guide covers adding PostHog to your app or site, sending events,
                            identifying users, creating actions and insights, and assigning properties to users and
                            users to groups.
                        </p>
                        <CallToAction
                            to="/docs/getting-started/install"
                            type="primary"
                            size="md"
                            className="!w-full sm:!w-auto"
                        >
                            Get started
                        </CallToAction>

                        <div className="flex gap-1 justify-center @md:justify-start lg:justify-start @sm:items-center mt-6">
                            <IconLightBulb className="w-6 h-6 text-primary dark:text-primary-dark opacity-50" />
                            <p className="text-sm m-0 text-left @sm:text-center">
                                <strong>Tip:</strong> Open search with <KeyboardShortcut text="/" /> , then{' '}
                                <KeyboardShortcut text="Tab" size="sm" /> to search docs
                            </p>
                        </div>
                    </div>
                    <aside>
                        <figure className="m-0">
                            <CloudinaryImage
                                objectFit="contain"
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/adventure-hog.png"
                                alt="This hog knows where he's headed"
                                width={342}
                                placeholder="blurred"
                                className="w-full sm:w-[345px]"
                            />
                        </figure>
                    </aside>
                </section>

                <section className="@container">

                    <h4 className="mb-0">Product documentation</h4>

                    <ProductList />

                    <div className="flex flex-col @3xl:grid md:grid-cols-3 gap-4 mt-8">
                        <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">Data</h3>
                            <p className="text-[15px]">
                                Learn how to manage events and customer data for use with all PostHog products.
                            </p>
                            <CallToAction to="/docs/data" type="outline" size="md" className="!w-full sm:!w-auto">
                                Explore
                            </CallToAction>
                        </div>
                        <div className="@container border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">Templates</h3>
                            <p className="text-[15px]">
                                Instantly analyze data and collect feedback with dashboard and survey templates.
                            </p>
                            <div className="flex flex-col @[14rem]:flex-row  items-start @[14rem]:items-center gap-4">
                                <CallToAction to="/templates" type="outline" size="md" className="!w-full sm:!w-auto">
                                    Browse templates
                                </CallToAction>
                            </div>
                        </div>
                        <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">API</h3>
                            <p className="text-[15px]">
                                Push or pull data to build custom functionality or create bespoke views for your
                                business needs.
                            </p>
                            <CallToAction to="/docs/api" type="outline" size="md" className="!w-full sm:!w-auto">
                                Explore
                            </CallToAction>
                        </div>
                    </div>
                </section>


            </PostLayout>
        </Layout>
    )
}

export default DocsIndex
