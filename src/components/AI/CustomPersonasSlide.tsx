import React from 'react'
import Markdown from 'components/Squeak/components/Markdown'
import { IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import OSTabs from "components/OSTabs"
import CloudinaryImage from 'components/CloudinaryImage'

const content = {
  'founders': {
    role: 'Founders',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_founder_adaf6ef8c1.png',
    title: 'Move fast and break (fewer) things',
    description: 'PostHog AI surfaces issues hiding in session recordings and error logs so you know about issues without users having to report them.',
    features: [
      {
        title: 'Get a technical co-founder that never sleeps',
        description: "Query your data in natural language and get insights instantaneously.",
      },
      {
        title: "See the patterns hiding in product data",
        description: "PostHog AI analyzes user behavior, surfaces the ‘aha,’ and helps write the playbook for what to build next.",
      }
    ]
  },
  'product-engineers': {
    role: 'Product Engineers',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_engineer_0eebaf7af1.png',
    title: 'Analyze product usage data where it lives',
    description: 'PostHog is AI-native, so there\'s no need to copy/paste or export data to third-party AI tools.',
    features: [
      {
        title: "Context-aware",
        description: "Whether you’re deep in a dashboard or dissecting a session, PostHog AI understands what you're looking at and responds in context.",
      },
      {
        title: "See how PostHog AI thinks",
        description: "Follow along with the chain of thought as your answer is generated. Click through to debug when the AI gets it wrong (and it will sometimes). Every decision links to something you can verify.",
      }
    ]
  },
  'product-managers': {
    role: 'Product Managers',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_pm_23749f3c26.png',
    title: 'From problem to plan – without the PRD',
    description: "PostHog AI pinpoints friction and helps ship an experiment before anyone utters ‘PRD'.",
    features: [
      {
        title: "Run your own experiments",
        description: "Set up A/B tests, analyze results, iterate by asking in natural language. PostHog AI is your thought partner in crime.",
      },
      {
        title: "10x your investigation speed",
        description: "Answer questions like, “Why did sign-ups drop?”, “Is NPS trending positive?”, or “What's my retention by acquisition channel?” – all without getting bogged down by taxonomy.",
      }
    ]
  },
  'growth-marketers': {
    role: 'Growth / Marketers',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_growth_5163e429b4.png',
    title: 'Bring data to the design debate',
    description: "Get answers with PostHog AI – no engineering degree required.",
    features: [
      {
        title: "Build dashboards and insights by describing them",
        description: 'PostHog AI combines context clues across your product to answer questions like, "Which landing pages are highest converting?" or the classic, “Which shade of blue do users like best?”',
      },
      {
        title: "Know what your users really think",
        description: 'PostHog AI summarizes sentiment, common themes, and must-fix issues from thousands of session recordings and survey responses.',
      }
    ]
  },
  'data-analysts': {
    role: 'Data Analysts',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_analyst_8bd707c7bf.png',
    title: 'Automate the boring stuff, answer harder questions',
    description: 'Skip the tedious asks and focus on signals that can make a bigger impact.',
    features: [
      {
        title: "Analyze at a greater magnitude",
        description: "PostHog AI digs through data at scale to surface patterns and larger problems worth investigating.",
      },
      {
        title: 'Save countless hours from "quick questions"',
        description: 'Skip the time sink of common analysis requests. PostHog AI offers teammates a way to self-serve the data instead.',
      }
    ]
  },
}

export default function CustomPersonasSlide(): JSX.Element {

  return (
    <div data-scheme="primary" className="h-full bg-primary text-primary p-4 @md:p-8 overflow-auto flex flex-col">
      <h2 className="text-5xl mb-8 text-center">What PostHog AI can do for <span className="text-red underline">[you]</span></h2>
      <OSTabs
        className="flex-1"
        centerTabs
        orientation="horizontal"
        tabTriggerClassName="flex-1 h-full"
        tabContainerClassName="[&>div>div]:items-baseline [&>div]:flex-row [&>div]:w-full [&>div]:space-evenly [&>div>div]:w-full"
        tabContentClassName="bg-primary"
        tabContentDataScheme="secondary"
        scrollAreaClasses="[&>div]:h-full [&>div>div]:h-full"
        tabs={Object.entries(content).map(([key, data]) => ({
          label: (
            <div className="flex flex-col justify-between w-full gap-2 py-4">
              <div className="flex-1">
                <CloudinaryImage src={data.image as `https://res.cloudinary.com/${string}`} imgClassName="h-[90px] @2xl:h-[120px]" />
              </div>
              <div className="text-xl text-[1.4rem] font-bold p-2">{data.role}</div>
            </div>
          ),
          value: key,
          content: (
            <div className="grid grid-cols-5 gap-8 @2xl:gap-16 p-4">
              <div className="col-span-full @2xl:col-span-2">
                <h2 className="text-5xl @2xl:text-4xl mb-4">{data.title}</h2>
                <p className="text-4xl @2xl:text-2xl leading-snug">{data.description}</p>
              </div>
              <div className="col-span-full @2xl:col-span-3">
                <ul className="space-y-8">
                  {data.features.map((feature, index) => (
                    <li key={index}>
                      <h3 className="text-4xl @2xl:text-2xl mb-2">{feature.title}</h3>
                      <p className="text-3xl @2xl:text-xl leading-snug">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ),
        }))}
      />

    </div>
  )
}
