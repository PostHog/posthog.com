import React, { useState } from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'components/RadixUI/Accordion'
import { Tabs } from "radix-ui";
import { IconTrends, IconFunnels, IconLifecycle, IconUserPaths, IconCorrelationAnalysis, IconRetention, IconStickiness, IconDashboard, IconHogQL, IconArrowLeft, IconArrowRight } from '@posthog/icons'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { ZoomImage } from 'components/ZoomImage'
const featuresContent = [
    {
        title: "Funnels",
        headline: "Find drop-off across a series of actions",
        images: [
            <CloudinaryImage
                key="funnel-basic"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-basic.png"
                className=""
                height={335}
                imgClassName="w-full max-h-40"
            />,
            <CloudinaryImage
                key="funnel-grouped"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-grouped.png"
                className=""
                height={335}
                imgClassName="w-full max-h-40"
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
        icon: <IconTrends />,
        color: "yellow",
        images: [
            <CloudinaryImage
                height={420}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-bar.png"
                className="h-full"
            />,
            <CloudinaryImage
              height={420}
              src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-multiple-sparklines.png"
              className="h-full"
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
        title: "Lifecycle",
        headline: "Track user engagement patterns over time",
        description: "Discover how your active users break down, highlighting those who have recently stopped being active or those who have just become active for the first time.",
        icon: <IconLifecycle />,
        color: "purple",
        images: [
            <CloudinaryImage
                key="lifecycle-chart"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-lifecycle.png"
                className="w-full"
                height={335}
            />
        ],
        features: [
            {
                title: "User categories",
                description: "Track new, returning, resurrecting, and dormant users to understand engagement patterns"
            },
            {
                title: "Time-based analysis",
                description: "Configure intervals (hour, day, week, month) to match your product's natural usage patterns"
            },
            {
                title: "Detailed breakdowns",
                description: "View individual users in each category and analyze their behavior through session recordings"
            },
            {
                title: "Integration",
                description: "Works with cohorts, feature flags, and other PostHog features for comprehensive analysis"
            }
        ]
    },
    {
        title: "User Paths",
        headline: "Understand user navigation patterns",
        description: "Track how users navigate through your product, identify where they get stuck, and discover why they aren't finding new features.",
        icon: <IconUserPaths />,
        color: "green",
        images: [
            <CloudinaryImage
                key="user-paths"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/user-guides/paths/example-light-mode.png"
                className="w-full"
                height={335}
            />
        ],
        features: [
            {
                title: "Path visualization",
                description: "See the most common paths users take through your product"
            },
            {
                title: "Drop-off analysis",
                description: "Identify where users are getting stuck or abandoning their journey"
            },
            {
                title: "Session recordings",
                description: "View recordings of user sessions to understand their behavior"
            },
            {
                title: "Cohort creation",
                description: "Create cohorts of users who follow specific paths for further analysis"
            }
        ]
    },
    {
        title: "Correlation Analysis",
        headline: "Discover factors affecting conversion",
        description: "Automatically identify significant factors that impact user behavior and conversion rates.",
        icon: <IconCorrelationAnalysis />,
        color: "red",
        images: [
            <CloudinaryImage
                key="correlation"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1716387676/posthog.com/contents/Screenshot_2024-05-22_at_3.20.17_PM.png"
                className="w-full"
                height={335}
            />
        ],
        features: [
            {
                title: "Automatic detection",
                description: "Automatically highlight significant factors affecting conversion"
            },
            {
                title: "Property analysis",
                description: "Analyze how different user properties impact behavior"
            },
            {
                title: "Event correlation",
                description: "Discover which events are most strongly correlated with success"
            },
            {
                title: "Cohort creation",
                description: "Create cohorts based on correlation analysis results"
            }
        ]
    },
    {
        title: "Retention",
        headline: "Track user return rates",
        description: "Measure how many users come back to your product over time and compare retention between different user segments.",
        icon: <IconRetention />,
        color: "blue",
        images: [
            <CloudinaryImage
                key="retention"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/retention_light_805120c74c.png"
                className="w-full"
                height={335}
            />
        ],
        features: [
            {
                title: "Cohort analysis",
                description: "Compare retention rates between different user cohorts"
            },
            {
                title: "Time-based tracking",
                description: "Track retention over hours, days, weeks, or months"
            },
            {
                title: "First-time vs recurring",
                description: "Analyze both first-time and recurring user retention"
            },
            {
                title: "Detailed breakdowns",
                description: "Break down retention by user properties and segments"
            }
        ]
    },
    {
        title: "Stickiness",
        headline: "Measure user engagement depth",
        description: "Track how frequently users engage with your product and identify your most engaged users.",
        icon: <IconStickiness />,
        color: "yellow",
        images: [
            <CloudinaryImage
                key="stickiness"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1716289464/posthog.com/contents/stickiness-light.png"
                className="w-full"
                height={335}
            />
        ],
        features: [
            {
                title: "Engagement frequency",
                description: "Track how many times users perform specific actions"
            },
            {
                title: "User segmentation",
                description: "Identify your most engaged users and their characteristics"
            },
            {
                title: "Feature analysis",
                description: "Determine which features drive the most engagement"
            },
            {
                title: "Time-based analysis",
                description: "Analyze engagement patterns over different time periods"
            }
        ]
    },
    {
        title: "Dashboards",
        headline: "Create custom analytics dashboards",
        description: "Build and customize dashboards to monitor key metrics and share insights with your team.",
        icon: <IconDashboard />,
        color: "green",
        images: [
            <CloudinaryImage
                key="dashboards"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_top_light_mode_2024_10_be53cf5325.png"
                className="w-full"
                height={335}
            />
        ],
        features: [
            {
                title: "Custom layouts",
                description: "Arrange insights in custom layouts to tell your data story"
            },
            {
                title: "Real-time updates",
                description: "See your metrics update in real-time as new data comes in"
            },
            {
                title: "Sharing",
                description: "Share dashboards with team members and stakeholders"
            },
            {
                title: "Templates",
                description: "Use pre-built templates for common analytics needs"
            }
        ]
    },
    {
        title: "SQL",
        headline: "Write custom SQL queries",
        description: "Create custom insights using SQL to analyze your data in ways that go beyond standard insights.",
        icon: <IconHogQL />,
        color: "purple",
        images: [
            <CloudinaryImage
                key="sql"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-sql.png"
                className="w-full"
                height={335}
            />
        ],
        features: [
            {
                title: "Custom queries",
                description: "Write SQL queries to analyze your data in any way you need"
            },
            {
                title: "Advanced analysis",
                description: "Perform complex calculations and data transformations"
            },
            {
                title: "Data export",
                description: "Export query results for further analysis"
            },
            {
                title: "Query templates",
                description: "Save and reuse common queries"
            }
        ]
    }
]


export default function ProductAnalyticsFeatures(): JSX.Element {
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
        <Explorer slug="product-analytics" title="Features">
          <div className="@xl:hidden">
            <Accordion
              items={featuresContent.map((feature, index) => ({
                trigger: feature.title,
                content: feature.description,
                value: `item-${index}`
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
              <button 
                className="previous-button" 
                onClick={handlePrevious}
                disabled={currentTab === 0}
              >
                Previous!!
              </button>
              <button 
                className="next-button" 
                onClick={handleNext}
                disabled={currentTab === totalTabs - 1}
              >
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
              <Tabs.List
                className="flex flex-col shrink-0 p-1 gap-0.5 min-w-52"
                aria-label="Features"
              >
                {featuresContent.map((item, index) => (
                  <Tabs.Trigger
                    className={`flex h-[45px] flex-1 gap-2 cursor-default select-none items-center bg-white text-[15px] leading-none text-primary rounded outline-none hover:text-primary hover:bg-accent data-[state=active]:font-bold data-[state=active]:bg-accent data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black group ${item.icon ? `p-1 bg-${item.icon}` : 'px-3 py-2'}`}
                    key={index} 
                    value={`tab-${index}`}
                  >
                    {item.icon && <span className={`bg-${item.color}/10 p-1 rounded size-7 text-${item.color} group-hover:bg-${item.color}/25 group-data-[state=active]:bg-${item.color} group-data-[state=active]:text-white`}>{item.icon}</span>}
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
                      {item.features && item.features.map((feature, index) => (
                        <div key={index}>
                          <h3 className="text-base mb-1">{feature.title}</h3>
                          <p className="text-sm">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                    {item.images && item.images.length > 0 && (
                      <div className="grid auto-cols-max @7xl:grid-cols-1 gap-1 order-1 @3xl:order-2">
                        {item.images.map((image, index) => (
                          <div key={index}>
                            <ZoomImage>
                              {image}
                            </ZoomImage>
                          </div>
                        ))}
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
