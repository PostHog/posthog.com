import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { productMenu } from '../../navs'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import { AppIcon } from 'components/OSIcons'
export default function Products(): JSX.Element {
    return (
        <>
            <SEO
                title="Products - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="products"
                title="Products"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                accentImage={<CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-product-analytics.png"
                    alt="Screenshot of PostHog Product Analytics"
                    className="w-full"
                    placeholder="none"
                />}
                sidebarContent={[
                    {
                        title: "About PostHog",
                        content: <>
                            <p className="text-sm mb-2">
                                <strong>We have 10+ products today</strong> – but even if we don’t have it yet, we will
                                eventually. We are going to build every piece of SaaS you need to make your product
                                successful.
                            </p>
                            <p className="text-sm mb-2">
                                Why picking PostHog is a no-brainer?
                            </p>
                            <p className="text-sm mb-0">
                                <OSButton
                                    variant="underline"
                                    asLink
                                    align="left"
                                    width="full"
                                    size="md"
                                    to="/why"
                                    icon={<Icons.IconArrowRight className="text-salmon" />}
                                    iconPosition="right"
                                    className="font-semibold !px-0"
                                >
                                    Read about it
                                </OSButton>
                            </p>

                        </>
                    },
                    {
                        title: "Product OS",
                        content: <>
                            <p className="text-sm mb-2">
                                Build and scale your product with our complete open source product operating system.
                            </p>
                            <p className="text-sm mb-2">
                                All our products are built on it, and it offers many features available to all of our
                                products, like:
                            </p>
                            <ul className="pl-4 mb-4 [&_li]:text-sm">
                                <li>Autocapture</li>
                                <li>Webhooks</li>
                                <li>Reverse proxy</li>
                                <li>API</li>
                                <li>SQL access</li>
                            </ul>
                            <OSButton
                                variant="underline"
                                asLink
                                align="left"
                                width="full"
                                size="md"
                                to="/product-os"
                                icon={<Icons.IconStack className="text-salmon" />}
                            >
                                Learn about Product OS
                            </OSButton>
                        </>
                    },
                    {
                        title: "Add-ons",
                        content: <>
                            <p className="text-sm mb-2">
                                Our a-la-carte model means you can pick and choose the features you need without paying
                                for anything you don't.
                            </p>
                            <p className="mb-2">
                                <strong>Available add-ons:</strong>
                            </p>
                            <ul className="pl-4 mb-4 [&_li]:text-sm">
                                <li>Teams features</li>
                                <li>Person profiles (identify users)</li>
                                <li>Group analytics</li>
                                <li>Data pipelines</li>
                            </ul>
                            <OSButton
                                variant="underline"
                                asLink
                                align="left"
                                width="full"
                                size="md"
                                to="/addons"
                                icon={<Icons.IconPuzzle className="text-purple" />}
                            >
                                Learn about add-ons
                            </OSButton>
                        </>
                    }
                ]}
            >

                <p className="max-w-lg">
                    PostHog is an entire suite of products you can use to make your software successful.
                </p>

                <Link
                    to="/session-replay"
                    className="inline-flex flex-col items-center w-32 justify-center text-primary hover:text-primary"
                    state={{ newWindow: true }}
                >
                    <span className="relative inline-block -mt-1 size-16">
                        <AppIcon name="presentation" className="size-16" />
                        <Icons.IconRewindPlay className="-mt-1 size-5 text-yellow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </span>
                    <div className="text-center font-medium text-sm leading-tight">Session replay<span className="opacity-75">.pslides</span></div>

                </Link>

                <div className="grid grid-cols-2 @sm:grid-cols-3 gap-2 p-2 relative max-w-3xl">
                    {productMenu.children.map((product) => (
                        <OSButton
                            key={product.slug}
                            variant="underline"
                            asLink
                            align="left"
                            width="full"
                            size="xl"
                            icon={React.createElement(Icons[product.icon as keyof typeof Icons], { className: `text-${product.color}` })}
                            to={`/${product.slug}`}
                            className="text-primary hover:text-primary flex-col"
                            state={{ newWindow: true }}
                        >
                            <span>{product.name}<span className="opacity-75">.pslides</span></span>
                        </OSButton>
                    ))}
                </div>
            </Explorer>
        </>
    )
}
