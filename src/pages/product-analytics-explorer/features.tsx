import React, { useState } from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'components/RadixUI/Accordion'
import Tabs from 'components/RadixUI/Tabs'
import {
    IconTrends,
    IconFunnels,
    IconLifecycle,
    IconUserPaths,
    IconCorrelationAnalysis,
    IconRetention,
    IconStickiness,
    IconDashboard,
    IconHogQL,
    IconArrowLeft,
    IconArrowRight,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import ImageSlider from 'components/Pricing/Test/ImageSlider'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import useProducts from 'hooks/useProducts'

export default function ProductAnalyticsFeatures(): JSX.Element {
    const { products } = useProducts()
    const productAnalytics = products.find((product) => product.type === 'product_analytics')
    const featuresContent = productAnalytics?.features || []

    const [currentTab, setCurrentTab] = useState(0)
    const totalTabs = featuresContent.length

    const handleNext = () => {
        setCurrentTab((prev) => (prev + 1) % totalTabs)
    }

    const handlePrevious = () => {
        setCurrentTab((prev) => (prev - 1 + totalTabs) % totalTabs)
    }

    const handleChange = (value: string) => {
        setCurrentTab(parseInt(value.split('-')[1]))
    }

    return (
        <>
            <SEO
                title="Features – Product Analytics"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="product"
                slug="product-analytics"
                title="Features"
                leftSidebarContent={<ProductSidebar type="product_analytics" />}
            >
                <div className="@xl:hidden">
                    <Accordion
                        items={featuresContent.map((feature, index) => ({
                            trigger: feature.title,
                            content: feature.description,
                            value: `item-${index}`,
                        }))}
                        defaultValue={`item-${currentTab}`}
                    >
                        {featuresContent.map((feature, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{feature.title}</AccordionTrigger>
                                <AccordionContent>{feature.description}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <div className="flex justify-between mt-4">
                        <button className="previous-button" onClick={handlePrevious} disabled={currentTab === 0}>
                            Previous!!
                        </button>
                        <button className="next-button" onClick={handleNext} disabled={currentTab === totalTabs - 1}>
                            Next
                        </button>
                    </div>
                </div>

                <div className="hidden @xl:block relative -mt-2">
                    <div className="flex gap-px -top-10 right-2 absolute">
                        <OSButton
                            className="previous-button"
                            icon={<IconArrowLeft className="rotate-90" />}
                            onClick={handlePrevious}
                            disabled={currentTab === 0}
                        >
                            Previous
                        </OSButton>
                        <OSButton
                            className="next-button"
                            icon={<IconArrowRight className="rotate-90" />}
                            iconPosition="right"
                            onClick={handleNext}
                            disabled={currentTab === totalTabs - 1}
                        >
                            Next
                        </OSButton>
                    </div>
                    <Tabs.Root value={`tab-${currentTab}`} onValueChange={handleChange}>
                        <Tabs.List aria-label="Features">
                            {featuresContent.map((item, index) => (
                                <Tabs.Trigger
                                    key={index}
                                    value={`tab-${index}`}
                                    icon={(item as any).icon}
                                    color={(item as any).color}
                                >
                                    {item.title}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        {featuresContent.map((item, index) => (
                            <Tabs.Content key={index} value={`tab-${index}`}>
                                <div className="pb-4">
                                    <h2 className="text-xl mb-0">{item.headline}</h2>
                                    {item.description && <p className="mt-1">{item.description}</p>}
                                </div>

                                <div className="grid @3xl:grid-cols-2 gap-4 @4xl:gap-8 items-start">
                                    <div className="order-2 @3xl:order-1">
                                        {item.features &&
                                            item.features.map((feature, index) => (
                                                <div key={index}>
                                                    <h3 className="text-base mb-1">{feature.title}</h3>
                                                    <p className="text-sm">{feature.description}</p>
                                                </div>
                                            ))}
                                    </div>
                                    {item.images && item.images.length > 0 && (
                                        <div className="order-1 @3xl:order-2">
                                            <ImageSlider images={item.images} id={`feature-${index}`} />
                                        </div>
                                    )}
                                </div>
                            </Tabs.Content>
                        ))}
                    </Tabs.Root>
                </div>
            </Explorer>
        </>
    )
}
