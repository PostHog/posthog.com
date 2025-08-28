import React from 'react'
import { IconClockRewind, IconLlmAnalytics } from '@posthog/icons'

export const llmAnalytics = {
  name: 'LLM Analytics',
  Icon: IconLlmAnalytics,
  description: 'Track costs, performance, and usage of your AI features',
  handle: 'llm_analytics',
  slug: 'llm-analytics',
  color: 'purple',
  colorSecondary: 'green-2',
  category: 'analytics',
  slider: {
    marks: [100000, 1000000, 10000000, 100000000],
    min: 100000,
    max: 100000000,
  },
  volume: 100000,
  seo: {
    title: 'LLM analytics - PostHog',
    description:
      'Track every conversation, model performance, costs, and errors in your LLM applications. 10x cheaper than other LLM observability tools.',
  },
  overview: {
    title: 'Monitor and debug your AI products',
    description:
      'Track conversations, model performance, spans, costs, latency, and traces in LLM applications – all as regular PostHog events - roughly 10x cheaper than other LLM observability tools',
    textColor: 'text-white',
    layout: 'overlay',
  },
  screenshots: {
    overview: {
      src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_desktop_51e40f58bb.png',
      alt: 'LLM analytics dashboard',
      classes: 'justify-end items-end pl-4 @lg:pl-6',
      imgClasses: 'rounded-tl-md shadow-2xl',
    },
    home: {
      src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_light_a436da72f7.png',
      srcDark:
        'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_dark_d8f32c249b.png',
      alt: 'LLM Analytics screenshot',
      classes: 'justify-end items-end pl-4 @lg:pl-6',
      imgClasses: 'rounded-tl-md shadow-2xl',
    },
  },
  hog: {
    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
    alt: 'AI-powered hedgehog',
    classes: 'absolute bottom-0 right-4 max-w-lg',
  },
  customers: {
    elevenlabs: {
      headline: 'uses LLM analytics with session replays (and everything else)',
      description: 'PostHog is amazing. It reins in the chaos to have everything in one place. Otherwise it’s quite overwhelming to try and understand what’s working and what’s not.',
    },
    lovable: {
      headline: 'compared us to every other observability tool, just to be sure',
      description: "If you're building a new product, just use PostHog.It's a no-brainer. It's the only all-in -one platform like it for developers.",
    },
  },
  features: [
    {
      title: 'Conversation tracking',
      headline: 'Track every LLM interaction',
      description:
        'Capture inputs, outputs, tokens, and metadata for every conversation in your application.',
      images: [
        {
          src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1713967763/posthog.com/contents/docs/langfuse-dash.png',
          alt: 'Conversation tracking',
        },
      ],
      features: [
        {
          icon: <IconClockRewind />,
          title: 'Full conversation history',
          description: 'Track prompts, completions, and token counts for every interaction',
        },
        {
          title: 'User attribution',
          description: 'Connect AI interactions to specific users and organizations',
        },
        {
          title: 'Privacy mode',
          description: 'Optionally exclude sensitive prompt and completion data',
        },
        {
          title: 'Metadata tracking',
          description: 'Add custom properties like conversation ID, session, or feature',
        },
        {
          title: 'Multi-turn conversations',
          description: 'Track entire conversation threads, not just individual calls',
        },
      ],
      children: (<>
        <em>hello</em> world!
      </>)
    },
    {
      title: 'Cost analytics',
      headline: 'Understand your AI economics',
      description:
        'Track costs by model, user, feature, and time period to optimize spending and pricing.',
      features: [
        {
          title: 'Cost per user',
          description: 'See which users or organizations are driving your LLM costs',
        },
        {
          title: 'Model comparison',
          description: 'Compare costs across different models and providers',
        },
        {
          title: 'Feature-level costs',
          description: 'Understand the economics of each AI-powered feature',
        },
        {
          title: 'Cost trends',
          description: 'Monitor how costs change over time and with usage patterns',
        },
        {
          title: 'ROI analysis',
          description: 'Connect AI costs to revenue and user engagement metrics',
        },
      ],
    },
    {
      title: 'Performance monitoring',
      headline: 'Keep your AI fast and reliable',
      description:
        'Monitor latency, error rates, and model performance to ensure great user experiences.',
      features: [
        {
          title: 'Latency tracking',
          description: 'Monitor response times and identify performance bottlenecks',
        },
        {
          title: 'Error monitoring',
          description: 'Track API errors, rate limits, and model failures',
        },
        {
          title: 'Model performance',
          description: 'Compare speed and reliability across different models',
        },
        {
          title: 'Real-time alerts',
          description: 'Get notified of latency spikes or error rate increases',
        },
        {
          title: 'Geographic performance',
          description: 'See how performance varies by user location',
        },
      ],
    },
    {
      title: 'Native integrations',
      headline: 'Works with your AI stack',
      description: 'Simple SDKs for popular LLM providers and observability platforms.',
      features: [
        {
          title: 'OpenAI SDK',
          description: 'Drop-in integration for GPT models with one line of code',
        },
        {
          title: 'Anthropic SDK',
          description: 'Native support for Claude models',
        },
        {
          title: 'LangChain',
          description: 'Full observability for LangChain applications',
        },
        {
          title: 'Vercel AI SDK',
          description: 'Track streaming responses and edge functions',
        },
        {
          title: 'Platform integrations',
          description: 'Works with Langfuse, Helicone, Traceloop, and Keywords AI',
        },
      ],
    },
    {
      title: 'Advanced analytics',
      headline: 'Go beyond basic metrics',
      description: "Use PostHog's full analytics suite to understand AI feature adoption and impact.",
      features: [
        {
          title: 'Correlation analysis',
          description: 'See how AI usage correlates with retention, revenue, and engagement',
        },
        {
          title: 'Funnel analysis',
          description: 'Track conversion through AI-powered features',
        },
        {
          title: 'Cohort analysis',
          description: 'Compare heavy vs light AI users behavior',
        },
        {
          title: 'Custom dashboards',
          description: 'Build dashboards combining AI and product metrics',
        },
        {
          title: 'SQL access',
          description: 'Query raw LLM data with HogQL for custom analysis',
        },
      ],
    },
  ],
  questions: [
    {
      question: 'What are my LLM costs by customer?',
    },
    {
      question: 'Which AI features have the highest error rates?',
    },
    {
      question: 'Are there latency spikes in my LLM calls?',
    },
    {
      question: 'Do AI features improve user retention?',
    },
    {
      question: 'Which prompts are most expensive?',
    },
    {
      question: 'How many tokens does each feature consume?',
    },
    {
      question: "What's the ROI of our AI features?",
    },
    {
      question: 'Which model gives the best cost/performance ratio?',
    },
  ],
  comparison: {
    summary: {
      them: [
        {
          title: 'Expensive specialized tools',
          subtitle: 'Most LLM observability tools charge premium prices',
        },
        {
          title: 'Limited analytics capabilities',
          subtitle: 'Basic dashboards without correlation to product metrics',
        },
        {
          title: 'Separate from your product data',
          subtitle: "Can't connect AI usage to business outcomes",
        },
      ],
      us: [
        {
          title: '10x cheaper than alternatives',
          subtitle: 'Same pricing as regular events, not premium LLM pricing',
        },
        {
          title: 'Full analytics platform',
          subtitle: 'Connect AI metrics to retention, revenue, and engagement',
        },
        {
          title: 'Privacy-first options',
          subtitle: 'Exclude sensitive data with built-in privacy mode',
        },
        {
          title: 'All major LLMs supported',
          subtitle: 'OpenAI, Anthropic, LangChain, and more',
        },
        {
          title: 'No proxy or latency',
          subtitle: "Async tracking that doesn't slow down your app",
        },
      ],
    },
    features: [
      {
        feature: 'Conversation tracking',
        companies: {
          Langfuse: true,
          Helicone: true,
          DataDog: true,
          PostHog: true,
        },
      },
      {
        feature: 'Cost tracking',
        companies: {
          Langfuse: true,
          Helicone: true,
          DataDog: false,
          PostHog: true,
        },
      },
      {
        feature: 'Product analytics',
        companies: {
          Langfuse: false,
          Helicone: false,
          DataDog: false,
          PostHog: true,
        },
      },
      {
        feature: 'Privacy mode',
        companies: {
          Langfuse: true,
          Helicone: false,
          DataDog: false,
          PostHog: true,
        },
      },
      {
        feature: '10x cheaper',
        companies: {
          Langfuse: false,
          Helicone: false,
          DataDog: false,
          PostHog: true,
        },
      },
      {
        feature: 'Open source',
        companies: {
          Langfuse: true,
          Helicone: false,
          DataDog: false,
          PostHog: true,
        },
      },
      {
        feature: 'SQL access',
        companies: {
          Langfuse: false,
          Helicone: false,
          DataDog: false,
          PostHog: true,
        },
      },
    ],
  },
  pairsWith: [
    {
      slug: 'product-analytics',
      description: 'Correlate AI usage with user behavior and business metrics',
    },
    {
      slug: 'dashboards',
      description: 'Build custom dashboards combining LLM and product metrics',
    },
    {
      slug: 'session-replay',
      description: 'Watch how users interact with AI features in real sessions',
    },
    {
      slug: 'feature-flags',
      description: 'Roll out AI features gradually and test different models',
    },
  ],
  worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
}
