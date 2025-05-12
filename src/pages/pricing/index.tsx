import React, { useState, useEffect } from 'react'
import OSTabs from 'components/OSTabs'
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
import Sales from '../sales'
import { useLocation } from '@reach/router'

export default function Pricing() {
    const [activePlan, setActivePlan] = useState('free')
    const [animateFreeTiers, setAnimateFreeTiers] = useState(false)
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const [defaultTab, setDefaultTab] = useState('plans')
    const { search } = useLocation()

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

    const tabs = [
        {
            value: 'plans',
            label: 'Plans',
            content: (
                <PricingExperiment
                    activePlan={activePlan}
                    setActivePlan={setActivePlan}
                    animateFreeTiers={animateFreeTiers}
                    setAnimateFreeTiers={setAnimateFreeTiers}
                    currentModal={currentModal}
                    setCurrentModal={setCurrentModal}
                    billingProducts={billingProducts}
                />
            ),
        },
        {
            value: 'calculator',
            label: 'Calculator',
            content: (
                <div className="">
                    <Calculator SidebarList={SidebarList} SidebarListItem={SidebarListItem} Discounts={Discounts} />
                </div>
            ),
        },
        {
            value: 'addons',
            label: 'Add-ons',
            content: <Addons />,
        },
        {
            value: 'vs',
            label: 'PostHog vs...',
            content: <SimilarProducts />,
        },
        {
            value: 'reviews',
            label: 'Reviews',
            content: <Reviews />,
        },
        {
            value: 'philosophy',
            label: 'Pricing philosophy',
            content: <Philosophy />,
        },
        {
            value: 'sales',
            label: 'How we do "sales"',
            content: <Sales />,
        },
        {
            value: 'faq',
            label: 'FAQ',
            content: (
                <>
                    <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-light dark:border-dark">Pricing FAQ</h2>
                    <FAQs />
                    <p className="my-6 pt-6 relative before:w-48 before:absolute before:top-0 before:left-0 before:border-t before:border-light before:dark:border-dark before:h-px">
                        Have another pricing-related question?{' '}
                        <Link to="/questions/topic/pricing">Ask in our community forum</Link>
                    </p>
                </>
            ),
        },
        {
            value: 'cta',
            label: 'Shameless CTA',
            content: <CTA />,
        },
    ]

    useEffect(() => {
        const params = new URLSearchParams(search)
        const tab = params.get('tab')
        if (tab) {
            setDefaultTab(tab)
        }
    }, [search])

    return <OSTabs key={defaultTab} tabs={tabs} defaultValue={defaultTab} />
}
