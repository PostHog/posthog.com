import React from 'react'
import { section, SectionLayout, SectionHeader, SectionColumns, SectionMainCol, SectionSidebar } from './Sections'
import Tabbed from '../PricingCalculator/Tabbed'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'

interface SidebarListProps {
    children: React.ReactNode
}

interface SidebarListItemProps {
    children: React.ReactNode
}

interface DiscountsProps {
    children?: React.ReactNode
}

interface CalculatorProps {
    SidebarList: React.FC<SidebarListProps>
    SidebarListItem: React.FC<SidebarListItemProps>
    Discounts: React.FC<DiscountsProps>
}

export const Calculator = ({ SidebarList, SidebarListItem, Discounts }: CalculatorProps): JSX.Element => {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(graphql`
        query {
            allProductData {
                nodes {
                    products {
                        description
                        docs_url
                        image_url
                        icon_key
                        inclusion_only
                        contact_support
                        addons {
                            contact_support
                            description
                            docs_url
                            image_url
                            icon_key
                            inclusion_only
                            name
                            type
                            unit
                            plans {
                                description
                                docs_url
                                image_url
                                name
                                plan_key
                                product_key
                                unit
                                flat_rate
                                unit_amount_usd
                                features {
                                    key
                                    name
                                    description
                                    category
                                    limit
                                    note
                                    entitlement_only
                                    is_plan_default
                                    unit
                                }
                                tiers {
                                    current_amount_usd
                                    current_usage
                                    flat_amount_usd
                                    unit_amount_usd
                                    up_to
                                }
                            }
                        }
                        name
                        type
                        unit
                        usage_key
                        plans {
                            description
                            docs_url
                            features {
                                key
                                name
                                description
                                category
                                limit
                                note
                                entitlement_only
                                is_plan_default
                                unit
                            }
                            free_allocation
                            image_url
                            included_if
                            name
                            plan_key
                            product_key
                            contact_support
                            unit_amount_usd
                            tiers {
                                current_amount_usd
                                current_usage
                                flat_amount_usd
                                unit_amount_usd
                                up_to
                            }
                            unit
                        }
                    }
                }
            }
        }
    `)

    return (
        <SectionLayout id="calculator" className="not-prose mb-12">
            <SectionHeader>
                <h2>Pricing calculator</h2>
            </SectionHeader>
            <div className="flex flex-col @6xl:flex-row @6xl:gap-8 items-start">
                <Tabbed />

                <div className="grid @2xl:grid-cols-2 @6xl:grid-cols-1 gap-8 mt-12 @6xl:mt-0 @6xl:max-w-xs sticky top-4">
                    <div>
                        <h4 className="text-lg mb-2">How our pricing works</h4>
                        <SidebarList>
                            <SidebarListItem>Only pay for products you use</SidebarListItem>
                            <SidebarListItem>
                                <strong className="bg-yellow/50 dark:bg-white/20 italic inline py-0.5">
                                    Generous free tier for each product (resets monthly)
                                </strong>
                            </SidebarListItem>
                            <SidebarListItem>
                                You can set billing limits per product so you never get a surprise bill
                            </SidebarListItem>
                            <SidebarListItem>
                                We also offer{' '}
                                <Tooltip content={() => <Discounts />} placement="top">
                                    <strong className="text-red dark:text-yellow border-b border-dashed border-primary cursor-help text-secondary">
                                        discounts
                                    </strong>
                                </Tooltip>{' '}
                                for startups and non-profits
                            </SidebarListItem>
                        </SidebarList>
                    </div>
                    <div>
                        <h4 className="text-lg mb-2">Estimating usage</h4>
                        <SidebarList>
                            <SidebarListItem>
                                Not sure what your volume looks like? Add the tracking code to your site and check back
                                in a few days – no credit card required.
                            </SidebarListItem>
                            <SidebarListItem>
                                If something stupid happens and you get an unexpected bill (like if{' '}
                                <Link href="/side-project-insurance">your side project unexpectedly goes viral</Link> or
                                you're unhappy), we'll pretty much always refund it!
                            </SidebarListItem>
                            <SidebarListItem>
                                We've also written{' '}
                                <Link href="/docs/billing/estimating-usage-costs">this handy guide</Link> to help!
                            </SidebarListItem>
                        </SidebarList>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}
