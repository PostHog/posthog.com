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
    description: 'Ask PostHog AI to check session replays and error logs, before you waste a sprint fixing the wrong feature.',
    features: [
      {
        title: 'Get a technical co-founder that never sleeps',
        description: "Can't wait two business days for analytics? PostHog AI answers your questions instantly so you can make the call.",
      },
      {
        title: "Know your growth loop before the board meeting",
        description: "PostHog AI analyzes user behavior patterns, surfaces the ‘aha’ moment, and hands you the playbook to ‘wow’ investors.",
      }
    ]
  },
  'product-engineers': {
    role: 'Product Engineers',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_engineer_0eebaf7af1.png',
    title: 'Ship faster without the context-switching tax',
    description: 'You know how to build. PostHog AI removes the friction between idea and execution.',
    features: [
      {
        title: "See outputs you can investigate",
        description: "See the exact queries being run. Click through to debug when the AI gets it wrong (and it will sometimes).Every decision links to something you can verify.",
      },
      {
        title: "Context that follows you everywhere",
        description: "You're debugging a session replay. Ask \"Are other users hitting this error ?\". PostHog AI knows which session you're looking at.",
      }
    ]
  },
  'product-managers': {
    role: 'Product Managers',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_pm_23749f3c26.png',
    title: 'Stop writing docs that nobody reads',
    description: "Skip the PRD ceremony. Ask PostHog AI what's actually happening, prototype a fix, ship it before standup.",
    features: [
      {
        title: "Run your own experiments",
        description: "Set up A/B tests, analyze results, iterate by asking in natural language. PostHog AI puts the full power of PostHog at your fingertips",
      },
      {
        title: "10x your investigation speed",
        description: "Ask for the data that matters to you. “why did signups drop”, “is NPS trending positive?”, “show me onboarding retention by acquisition channel”.",
      }
    ]
  },
  'growth-marketers': {
    role: 'Growth / Marketers',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_growth_5163e429b4.png',
    title: 'More leverage than you’ve ever had before',
    description: "You know what questions to ask. You shouldn't need an engineering degree to get answers.",
    features: [
      {
        title: "Build dashboards and insights by describing them",
        description: '"Which landing pages are highest converting?". “which shade of blue do users like best?”, PostHog AI combines context clues across your product.',
      },
      {
        title: "Surveys that write themselves",
        description: 'Ask PostHog AI to “create an NPS survey about pricing" → done, targeted, ready to ship. Get sentiment analysis without reading 1,000 responses.',
      }
    ]
  },
  'data-analysts': {
    role: 'Data Analysts',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_analyst_8bd707c7bf.png',
    title: 'Automate the boring stuff, answer harder questions',
    description: 'Everyone treats you like a BI bot. PostHog AI handles the repetitive stuff so you can do actual analysis.',
    features: [
      {
        title: "Your schema is now searchable in English",
        description: "Hundreds of sessions, thousands of events, patterns no (sane) human would catch - analyze at a scale you couldn't before.",
      },
      {
        title: '5+ hours freed from "quick questions"',
        description: 'Let PostHog AI field "can you pull DAUs by platform?" while you solve why retention is tanking.',
      }
    ]
  },
}

export default function CustomPersonasSlide(): JSX.Element {

  return (
    <div data-scheme="primary" className="h-full bg-primary text-primary p-4 @md:p-8 overflow-auto">

      <OSTabs
        border={false}
        padding={false}
        className=""
        orientation="horizontal"
        tabTriggerClassName="flex-1 h-full"
        tabs={Object.entries(content).map(([key, data]) => ({
          label: (
            <div className="flex flex-col justify-between w-full gap-2">
              <div className="flex-1">
                <CloudinaryImage src={data.image} width={120} />
              </div>
              <div className="text-2xl font-bold">{data.role}</div>
            </div>
          ),
          value: key,
          content: (
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-full @2xl:col-span-2">
                <h2 className="text-4xl mb-2">{data.title}</h2>
                <p className="text-2xl">{data.description}</p>
              </div>
              <div className="col-span-full @2xl:col-span-3">
                <ul>
                  {data.features.map((feature, index) => (
                    <li key={index}>
                      <strong className="text-2xl mb-2">{feature.title}</strong>
                      <p className="text-xl">{feature.description}</p>
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
