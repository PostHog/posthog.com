import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'components/RadixUI/Accordion'
import { Tabs } from "radix-ui";
import { IconTrends, IconFunnels } from '@posthog/icons'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'

const featuresContent = [
    {
        title: "Funnels",
        headline: "Find drop-off across a series of actions",
        description: "Blah  filters for individual steps – or the entire funnel – by person property, group or cohort, or event property",
        images: [
            <CloudinaryImage
                key="funnel-basic"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-basic.png"
                className="w-full shadow-xl"
                height={335}
            />,
            <CloudinaryImage
                key="funnel-grouped"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-grouped.png"
                className="w-full shadow-xl"
                height={335}
            />
        ],
        features: [
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
            },
            {
                title: "Granular controls",
                description: "Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step"
            }
        ],
        icon: <IconFunnels />,
        color: "blue"
    },
    {
        title: "Graph & trends",
        headline: "Visualize user data with graphs, tables, charts, maps, and more",
        description: "Blah",
        icon: <IconTrends />,
        color: "yellow",
        images: [
            <CloudinaryImage
                objectPosition="left"
                height={420}
                objectFit="cover"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-bar.png"
                className="shadow-xl h-full"
            />,
            <CloudinaryImage
              objectPosition="left"
              height={420}
              objectFit="cover"
              src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-multiple-sparklines.png"
              className="shadow-xl h-full"
          />
        ],
        features: [
            {
                title: "Trends",
                description: "Plot any event over time, such as a feature being used. You can even do math and multiple series."
            },
            {
                title: "Advanced filtering",
                description: "Apply however many filters you need to or breakdown by any event, user or group property with advanced logic."
            },
            {
                title: "Breakout tables",
                description: "Break out your trends by any event property."
            },
            {
                title: "Sampling",
                description: "Speed up long running queries across large datasets in one click."
            }
        ]
    },
    {
        title: "Step ordering",
        description: "Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion",
        icon: <IconTrends />,
        color: "yellow"
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
            className="flex items-start w-full border border-primary rounded p-1"
            defaultValue="tab-0"
            orientation="vertical"
          >
            <Tabs.List
              className="flex flex-col shrink-0 p-1 gap-0.5"
              aria-label="Features"
            >
              {featuresContent.map((item, index) => (
                <Tabs.Trigger
                  className={`flex h-[45px] flex-1 gap-2 cursor-default select-none items-center bg-white text-[15px] leading-none text-primary rounded outline-none hover:text-primary hover:bg-accent data-[state=active]:font-bold data-[state=active]:bg-accent data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black group ${item.icon ? `p-1 bg-${item.icon}` : 'px-3 py-2'}`}
                  key={index} value={`tab-${index}`}
                >
                  {item.icon && <span className={`bg-accent p-1 rounded size-7 text-${item.color} hover:text-white group-hover:bg-${item.color} group-data-[state=active]:bg-${item.color} group-data-[state=active]:text-white`}>{item.icon}</span>}
                  {item.title}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {featuresContent.map((item, index) => (
            <Tabs.Content
              className="grow rounded bg-white p-5 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
              key={index} value={`tab-${index}`}
            >
              <h2>{item.headline}</h2>
              {item.description}
              <hr />
              {item.images && item.images.map((image, index) => (
                <div key={index}>
                  {image}
                </div>
              ))}
              {item.features && item.features.map((feature, index) => (
                <div key={index}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}

            </Tabs.Content>
            ))}
            
          </Tabs.Root>
        </Explorer>
      </>
    )
}
