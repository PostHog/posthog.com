import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import useProduct from '../../hooks/useProduct'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import { AppIcon, AppIconName, AppLink } from 'components/OSIcons/AppIcon'
import { Accordion } from 'components/RadixUI/Accordion'
import ZoomHover from 'components/ZoomHover'
import { IconPresentation } from 'components/OSIcons'
import { productMenu } from '../../navs'
import { PRODUCT_COUNT } from '../../constants'

// Create selectOptions for the address bar
const selectOptions = [
    {
        label: 'Products',
        items: [
            { value: 'products', label: 'Products', icon: productMenu.icon, color: productMenu.color },
            ...productMenu.children.flatMap((item) => {
                // Skip items without valid slugs
                if (!item.slug) return []

                // Add the base product
                return [
                    {
                        value: item.slug,
                        label: item.name,
                        icon: item.icon,
                        color: item.color,
                    },
                ]
            }),
        ],
    },
]

export default function Products(): JSX.Element {
    const allProducts = useProduct() as any[]

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
                showTitle={false}
                selectOptions={selectOptions}
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"

                leftSidebarContent={[
                    {
                        title: 'About PostHog',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    <strong>We have {PRODUCT_COUNT}+ products today</strong> (and loads more in
                                    development) – but even if we don't have it yet, we will eventually. We are going to
                                    build every piece of SaaS you need to make your product successful.
                                </p>
                                <p className="text-sm mb-2">Why picking PostHog is a no-brainer?</p>
                                <p className="text-sm mb-0">
                                    <OSButton
                                        variant="underline"
                                        asLink
                                        align="left"
                                        width="full"
                                        size="md"
                                        to="/why"
                                        state={{ newWindow: true }}
                                        icon={<Icons.IconArrowRight className="text-salmon" />}
                                        iconPosition="right"
                                        className="font-semibold !px-0"
                                    >
                                        Read about it
                                    </OSButton>
                                </p>
                            </>
                        ),
                    },
                    {
                        title: 'Product OS',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    Build and scale your product with our complete open source product operating system.
                                </p>
                                <p className="text-sm mb-2">
                                    All our products are built on it, and it offers many features available to all of
                                    our products, like:
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
                        ),
                    },
                    {
                        title: 'Add-ons',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    Our a-la-carte model means you can pick and choose the features you need without
                                    paying for anything you don't.
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
                        ),
                    },
                ]}
            >
                {(() => {
                    // Filter out products without a category, then group by category
                    const categoryOrder = ['analytics', 'product', 'data', 'engineering', 'marketing', 'product_os']

                    // Category display names
                    const categoryDisplayNames: Record<string, string> = {
                        analytics: 'Analytics',
                        product: 'Product',
                        data: 'Data',
                        engineering: 'Engineering',
                        marketing: 'Marketing',
                        product_os: 'Product OS tools',
                    }

                    // Custom product order by category - if not specified, products will be sorted alphabetically
                    const productOrder: Record<string, string[]> = {
                        analytics: ['web-analytics', 'product-analytics', 'revenue-analytics', 'llm-analytics'],
                        product: ['session-replay', 'experiments', 'surveys', 'user-interviews', 'early_access'],
                        data: ['data-warehouse', 'cdp', 'sql', 'api', 'webhooks'],
                        engineering: ['feature-flags', 'error-tracking'],
                        marketing: ['heatmaps', 'broadcasts'],
                        product_os: ['max', 'dashboards', 'notebooks', 'activity', 'toolbar'],
                    }
                    const productsWithCategory = allProducts.filter((product: any) => product.category)
                    const groupedProducts = productsWithCategory.reduce((acc: Record<string, any[]>, product: any) => {
                        const category = product.category
                        if (!acc[category]) {
                            acc[category] = []
                        }
                        acc[category].push(product)
                        return acc
                    }, {} as Record<string, any[]>)

                    // Sort products by custom order if specified, otherwise alphabetically
                    Object.keys(groupedProducts).forEach((category) => {
                        const customOrder = productOrder[category]
                        if (customOrder && customOrder.length > 0) {
                            groupedProducts[category].sort((a: any, b: any) => {
                                const aIndex = customOrder.indexOf(a.slug)
                                const bIndex = customOrder.indexOf(b.slug)

                                // If both products are in custom order, sort by that order
                                if (aIndex !== -1 && bIndex !== -1) {
                                    return aIndex - bIndex
                                }
                                // If only one is in custom order, prioritize it
                                if (aIndex !== -1) return -1
                                if (bIndex !== -1) return 1
                                // If neither is in custom order, sort alphabetically
                                return a.name.localeCompare(b.name)
                            })
                        } else {
                            // Fall back to alphabetical sorting
                            groupedProducts[category].sort((a: any, b: any) => a.name.localeCompare(b.name))
                        }
                    })

                    return (
                        <div className="@container not-prose space-y-2">
                            {categoryOrder.map((category) => {
                                const products = groupedProducts[category]
                                if (!products || products.length === 0) return null

                                const count = products.length

                                return (
                                    <Accordion
                                        skin={false}
                                        key={category}
                                        triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:top-1/2 [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:bg-border [&>span]:after:content-['']"
                                        items={[
                                            {
                                                value: category,
                                                trigger: (
                                                    <span className="bg-primary pr-2 relative z-10">
                                                        {categoryDisplayNames[category] ||
                                                            category.charAt(0).toUpperCase() + category.slice(1)}{' '}
                                                        ({count})
                                                    </span>
                                                ),
                                                content: (
                                                    <div className="@md:pl-4 grid grid-cols-[repeat(auto-fit,minmax(7rem,7rem))] gap-x-1 gap-y-4 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center">
                                                        {products.map((product) => (
                                                            <ZoomHover
                                                                key={product.slug}
                                                                className={`w-28 justify-center ${
                                                                    product.status == 'WIP'
                                                                        ? 'opacity-50 hover:opacity-100'
                                                                        : ''
                                                                }`}
                                                            >
                                                                <AppLink
                                                                    label={product.name}
                                                                    url={`/` + product.slug}
                                                                    Icon={<IconPresentation />}
                                                                    background="bg-primary"
                                                                    className={`size-12 [&_.bg-front]:fill-${product.color} [&_.bg-rear]:fill-${product.colorSecondary}`}
                                                                >
                                                                    {product.Icon &&
                                                                        React.createElement(product.Icon, {
                                                                            className: `size-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-.125rem]`,
                                                                        })}
                                                                    {product.status == 'beta' && (
                                                                        <span className="absolute bg-yellow top-0 left-1/2 -translate-1/2 uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold text-black leading-none">
                                                                            Beta
                                                                        </span>
                                                                    )}
                                                                    {product.status == 'WIP' && (
                                                                        <span className="absolute bg-salmon text-white top-0 left-1/2 -translate-1/2 uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold leading-none">
                                                                            WIP
                                                                        </span>
                                                                    )}
                                                                </AppLink>
                                                            </ZoomHover>
                                                        ))}
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        defaultValue={category}
                                    />
                                )
                            })}
                        </div>
                    )
                })()}
            </Explorer>
        </>
    )
}
