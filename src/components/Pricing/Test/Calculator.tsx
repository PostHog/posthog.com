import React from 'react'
import { SectionLayout, SectionHeader } from './Sections'
import Tabbed from '../PricingCalculator/Tabbed'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import { IconCode, IconHandMoney, IconRocket } from '@posthog/icons'
import AgentEstimateLink, {
    AI_PRICING_EXPERIMENT_VARIANTS,
    AI_PRICING_FLAG,
} from 'components/Pricing/AgentEstimateLink'
import { RenderInClient } from 'components/RenderInClient'

// The sidebar sits inside a `not-prose` section, so prose's link styling doesn't reach it and
// `Link` ships no styles of its own — inline links read as plain text without this. Matches the
// link treatment used elsewhere on the pricing page.
const sidebarLinkClasses = 'font-semibold text-red dark:text-yellow underline'

const SidebarList = ({ children }: { children: React.ReactNode }) => (
    <ul className="tw-chevron-bullets flex flex-col gap-1 pl-4">{children}</ul>
)

const SidebarListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="leading-snug text-[15px]">{children}</li>
)

/** Tooltip content for the "discounts" link in the sidebar. */
const Discounts = () => (
    <div className="max-w-sm">
        <h4>Discounts</h4>
        <ul className="list-none m-0 p-0 divide-y divide-primary">
            <li className="relative pl-7">
                <IconRocket className="size-5 absolute left-0 top-0.5 opacity-50" />
                <strong>Startups</strong>
                <p className="text-[15px]">
                    If your startup has raised less than $5 million and is less than 2 years old, you may be interested
                    in our startup program.{' '}
                    <Link to="/startups" className="text-red dark:text-yellow font-semibold">
                        Learn more
                    </Link>
                </p>
            </li>
            <li className="relative pl-7 pt-4">
                <IconHandMoney className="size-5 absolute left-0 top-4.5 opacity-50" />
                <strong>Non-profits</strong>
                <p className="text-[15px] mb-2">
                    Most non-profits are eligible for a discount. Get in touch through the app after signing up.
                </p>
            </li>
            <li className="relative pl-7 pt-4">
                <IconCode className="size-5 absolute left-0 top-4.5 opacity-50" />
                <strong>Small OSS projects without corporate backing</strong>
                <p className="text-[15px] mb-2">
                    If you have an open source project without corporate backing that has less than $200k annual
                    revenue, you can join our PostHog for Startups program to claim $50,000 of PostHog credits.{' '}
                    <Link
                        to="/startups"
                        className="text-red dark:text-yellow font-semibold"
                        state={{ newWindow: true }}
                    >
                        Apply here
                    </Link>{' '}
                    and reach out to our support to get the 12 month credit expiry limit waived.
                </p>
            </li>
        </ul>
    </div>
)

interface CalculatorProps {
    /**
     * Drops the "Pricing calculator" heading, for callers that already introduce the
     * calculator themselves (see Redesign/CalculatorReveal).
     */
    hideHeader?: boolean
    /** Anchor id. Pass `''` when an outer element already owns `#calculator`. */
    id?: string
}

export const Calculator = ({ hideHeader = false, id = 'calculator' }: CalculatorProps): JSX.Element => {
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
        <SectionLayout id={id} className="not-prose mb-12">
            {!hideHeader && (
                <SectionHeader>
                    <h2>Pricing calculator</h2>
                </SectionHeader>
            )}
            <div className="flex flex-col @6xl:flex-row @6xl:gap-8 items-start">
                <Tabbed />

                <div
                    id="discounts"
                    className="grid @2xl:grid-cols-2 @6xl:grid-cols-1 gap-8 mt-12 @6xl:mt-0 @6xl:max-w-xs sticky top-4"
                >
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
                                <Link href="/side-project-insurance" className={sidebarLinkClasses}>
                                    your side project unexpectedly goes viral
                                </Link>{' '}
                                or you're unhappy), we'll pretty much always refund it!
                            </SidebarListItem>
                            <SidebarListItem>
                                We've also written{' '}
                                <Link href="/docs/billing/estimating-usage-costs" className={sidebarLinkClasses}>
                                    this handy guide
                                </Link>{' '}
                                to help!
                            </SidebarListItem>
                            <RenderInClient
                                render={() => {
                                    const variant = window.posthog?.getFeatureFlag?.(AI_PRICING_FLAG)
                                    return variant && variant !== AI_PRICING_EXPERIMENT_VARIANTS.control ? (
                                        <SidebarListItem>
                                            Coming from another tool?{' '}
                                            <AgentEstimateLink
                                                label="Create an estimate"
                                                source="pricing-page-estimating-usage"
                                                className={sidebarLinkClasses}
                                            />{' '}
                                            using your real usage there.
                                        </SidebarListItem>
                                    ) : (
                                        <></>
                                    )
                                }}
                            />
                        </SidebarList>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}
