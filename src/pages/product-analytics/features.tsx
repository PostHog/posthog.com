import React, { useState } from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'components/RadixUI/Accordion'
import { Tabs } from 'radix-ui'
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
    const productAnalytics = products.find(product => product.type === 'product_analytics')
    const featuresContent = productAnalytics?.features || []

    const [currentTab, setCurrentTab] = useState(0)
    const totalTabs = featuresContent.length

    const handleNext = () => {
        setCurrentTab((prev) => (prev + 1) % totalTabs)
    }

    const handlePrevious = () => {
        setCurrentTab((prev) => (prev - 1 + totalTabs) % totalTabs)
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
                sidebarContent={<ProductSidebar type="product_analytics" />}
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
                            variant="ghost"
                            className="previous-button"
                            icon={<IconArrowLeft className="rotate-90" />}
                            onClick={handlePrevious}
                            disabled={currentTab === 0}
                        >
                            Previous
                        </OSButton>
                        <OSButton
                            variant="ghost"
                            className="next-button"
                            icon={<IconArrowRight className="rotate-90" />}
                            iconPosition="right"
                            onClick={handleNext}
                            disabled={currentTab === totalTabs - 1}
                        >
                            Next
                        </OSButton>
                    </div>
                    <Tabs.Root
                        className="flex items-start w-full"
                        defaultValue={`tab-${currentTab}`}
                        value={`tab-${currentTab}`}
                        onValueChange={(value) => setCurrentTab(parseInt(value.split('-')[1]))}
                        orientation="vertical"
                    >
                        <Tabs.List className="flex flex-col shrink-0 p-1 gap-0.5 min-w-52" aria-label="Features">
                            {featuresContent.map((item, index) => (
                                <Tabs.Trigger
                                    className={`flex h-[45px] flex-1 gap-2 cursor-default select-none items-center bg-white text-[15px] leading-none text-primary rounded outline-none hover:text-primary hover:bg-accent data-[state=active]:font-bold data-[state=active]:bg-accent data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black group ${item.icon ? `p-1 bg-${item.icon}` : 'px-3 py-2'
                                        }`}
                                    key={index}
                                    value={`tab-${index}`}
                                >
                                    {item.icon && (
                                        <span
                                            className={`bg-${item.color}/10 p-1 rounded size-7 text-${item.color} group-hover:bg-${item.color}/25 group-data-[state=active]:bg-${item.color} group-data-[state=active]:text-white`}
                                        >
                                            {item.icon}
                                        </span>
                                    )}
                                    {item.title}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        {featuresContent.map((item, index) => (
                            <Tabs.Content
                                className="grow rounded bg-white px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
                                key={index}
                                value={`tab-${index}`}
                            >
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
