import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'components/RadixUI/Accordion'
import { Tabs } from "radix-ui";

const featuresContent = [
    {
        title: "Filtering",
        description: "Set filters for individual steps – or the entire funnel – by person property, group or cohort, or event property"
    },
    {
        title: "Graph types",
        description: "Track user progression between steps, conversion time between each step, and how a funnel's conversion rate changes over time"
    },
    {
        title: "Step ordering",
        description: "Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion"
    }
    // Add more content as needed
]


export default function ProductAnalyticsFeatures(): JSX.Element {
    return (
      <>
        <SEO
            title="Features – Product Analytics"
            description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
            image={`/images/og/product-analytics.jpg`}
        />
        <Explorer slug="product-analytics" title="Features">
            <Accordion
              items={featuresContent.map((feature, index) => ({
                trigger: feature.title,
                content: feature.description,
                value: `item-${index}`
              }))}
              defaultValue="item-0"
            >
              {featuresContent.map((feature, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{feature.title}</AccordionTrigger>
                  <AccordionContent>{feature.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
          <button className="next-button">Next</button>

          <Tabs.Root
            className="flex w-full shadow-[0_2px_10px] shadow-blackA2"
            defaultValue="tab-0"
            orientation="vertical"
          >
            <Tabs.List
              className="flex flex-col shrink-0 border-b border-mauve6"
              aria-label="Manage your account"
            >
              {featuresContent.map((feature, index) => (
              <Tabs.Trigger
                className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-mauve11 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
                key={index} value={`tab-${index}`}
              >
                {feature.title}
              </Tabs.Trigger>
                        ))}
            </Tabs.List>
            {featuresContent.map((feature, index) => (
            <Tabs.Content
              className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              key={index} value={`tab-${index}`}
            >
              {feature.description}

            </Tabs.Content>
            ))}
            
          </Tabs.Root>
        </Explorer>
      </>
    )
}
