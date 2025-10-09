import React, { useState, useEffect } from 'react'
import PricingExperiment from 'components/Pricing/PricingExperiment'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { Calculator } from 'components/Pricing/Test/Calculator'
import { SidebarList, SidebarListItem, Discounts } from 'components/Pricing/PricingExperiment'
import { Addons } from 'components/Pricing/Test/Addons'
import { SimilarProducts } from 'components/Pricing/Test/SimilarProducts'
import { Reviews } from 'components/Pricing/Test/Reviews'
import { FAQ } from 'components/Products/FAQ'
import { FAQs } from 'components/Pricing/FAQs'
import CTA from 'components/Home/CTA.js'
import Philosophy from './philosophy'
import { useLocation } from '@reach/router'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'

import PurchasedWith from 'components/Pricing/Test/PurchasedWith'
import { SectionLayout } from 'components/Pricing/Test/Sections'

export default function Pricing() {
    const [activePlan, setActivePlan] = useState('free')
    const [animateFreeTiers, setAnimateFreeTiers] = useState(false)
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const [defaultTab, setDefaultTab] = useState('plans')
    const { search } = useLocation()

    const pricingTableOfContents = [
        { url: 'cloud', value: 'PostHog Cloud', depth: 0 },
        { url: 'rates', value: 'Usage-based pricing', depth: 0 },
        { url: 'plans', value: 'Plans', depth: 0 },
        { url: 'calculator', value: 'Pricing calculator', depth: 0 },
        { url: 'addons', value: 'Add-ons', depth: 0 },
        // { url: 'g2-reviews', value: 'Reviews', depth: 0 },
        { url: 'faq', value: 'FAQ', depth: 0 },
        { url: 'cta', value: 'Shameless CTA', depth: 0 },
    ]

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

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const plan = params.get('plan')
        if (plan === 'free' || plan === 'paid') {
            setActivePlan(plan)
        }
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(search)
        const tab = params.get('tab')
        if (tab) {
            setDefaultTab(tab)
        }
    }, [search])

    return (
        <ReaderView
            hideLeftSidebar
            tableOfContents={pricingTableOfContents}
            showQuestions={false}
            hideMobileTableOfContents
        >
            <SEO
                title="PostHog Pricing – Transparent, usage-based, generous free tier"
                description="Find out exactly how much it costs to use PostHog. Start free and scale affordably with usage-based pricing. Get $50K in credits if you’re an eligible startup."
            />

            <PricingExperiment
                activePlan={activePlan}
                setActivePlan={setActivePlan}
                animateFreeTiers={animateFreeTiers}
                setAnimateFreeTiers={setAnimateFreeTiers}
                currentModal={currentModal}
                setCurrentModal={setCurrentModal}
                billingProducts={billingProducts}
            />

            <Philosophy />

            <Calculator SidebarList={SidebarList} SidebarListItem={SidebarListItem} Discounts={Discounts} />

            <Addons addons={billingProducts.flatMap((product: any) => product.addons || [])} />

            <SimilarProducts />

            <PurchasedWith />

            {/* <Reviews /> */}

            <SectionLayout id="faq" className="mb-12">
                <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-primary">Pricing FAQ</h2>
                <FAQs />
                <p className="my-6 pt-6 relative before:w-48 before:absolute before:top-0 before:left-0 before:border-t before:border-light before:dark:border-dark before:h-px">
                    Have another pricing-related question?{' '}
                    <Link to="/questions/topic/pricing" state={{ newWindow: true }}>
                        Ask in our community forum.
                    </Link>
                </p>
            </SectionLayout>

            <CTA />
        </ReaderView>
    )
}
