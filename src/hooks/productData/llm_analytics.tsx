import React from 'react'
import { IconBell, IconClockRewind, IconDashboard, IconGraph, IconHandMoney, IconLightBulb, IconListTreeConnected, IconLlmAnalytics, IconPiggyBank, IconRewindPlay, IconShield, IconSparkles, IconTarget, IconTrends, IconUser, IconWarning, IconGlobe, IconListCheck } from '@posthog/icons'
import { IconAnthropic, IconGemini, IconGrid, IconLangChain, IconOpenAI, IconOpenRouter, IconTag, IconVercel } from 'components/OSIcons'

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
      'Analyze traces, spans, per-user costs, latency, and usage of your AI features',
    textColor: 'text-white',
    layout: 'overlay',
  },
  screenshots: {
    overview: {
      src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_overview_desktop_2399cc57d6.png',
      srcMobile: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_overview_mobile_b9565d0690.png',
      alt: 'LLM analytics dashboard',
      classes: '',
      // imgClasses: 'rounded-tl-md shadow-2xl',
      classesMobile: '',
      imgClassesMobile: '',
    },
    home: {
      src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_light_a436da72f7.png',
      srcDark:
        'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_dark_d8f32c249b.png',
      alt: 'LLM Analytics screenshot',
      classes: 'justify-end items-end pl-4 @lg:pl-6',
      imgClasses: 'rounded-tl-lg shadow-2xl',
    },
  },
  // hog: {
  //   src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
  //   alt: 'AI-powered hedgehog',
  //   classes: 'absolute bottom-0 right-4 max-w-lg',
  // },
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
      title: 'Trace monitoring',
      handle: 'trace_monitoring',
      template: 'split',
      headline: 'Trace monitoring',
      description:
        'Debug entire conversations, not just individual calls',
      images: [
        {
          src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_light_e4cea319cb.png',
          srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_dark_f49aa4dd89.png',
          alt: 'LLM trace',
          className: 'rounded-tl-md shadow-2xl justify-end items-end @2xl:mt-8 ml-8 @2xl:ml-0',
        },
      ],
      features: [
        {
          icon: <IconListTreeConnected />,
          title: 'Multi-turn conversation history',
          description: 'Track prompts, completions, and token counts for every interaction',
        },
        {
          icon: <IconUser />,
          title: 'User attribution',
          description: 'Trace AI interactions to specific users and organizations',
        },
        {
          icon: <IconRewindPlay />,
          title: 'Integrated session recordings',
          description: 'Observe any changes to your UI based on the LLM\'s response',
        },
        {
          icon: <IconTag />,
          title: 'Metadata tracking',
          description: 'Add custom properties like conversation ID, session, or feature',
        },
        {
          icon: <IconShield />,
          title: 'Privacy mode',
          description: 'Optionally exclude sensitive prompt and completion data',
        },
      ],
      // children: (<></>)
    },
    {
      title: 'Cost analysis',
      handle: 'cost_analysis',
      template: 'split',
      headline: 'Cost analysis',
      description:
        'Track costs by model, user, feature, and time period to optimize spending and pricing',
      images: [
        {
          src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_light_f2794e4e13.png',
          srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_dark_d1efde15fd.png',
          alt: 'LLM cost analysis',
          className: 'justify-center items-center',
        },
      ],
      features: [
        {
          icon: <IconTrends />,
          title: 'Model comparison',
          description: 'Compare costs across different models and providers',
        },
        {
          icon: <IconTarget />,
          title: 'Cost per user',
          description: 'See which users or organizations are driving your LLM costs',
        },
        {
          icon: <IconSparkles />,
          title: 'Feature-level costs',
          description: 'Understand the economics of each AI-powered feature',
        },
        {
          icon: <IconPiggyBank />,
          title: 'ROI analysis',
          description: 'Connect AI costs to revenue data and user engagement metrics',
        },
      ],
    },
    {
      title: 'Performance monitoring',
      handle: 'performance_monitoring',
      template: 'split',
      headline: 'Performance monitoring',
      description:
        'Monitor latency, error rates, and model performance',
      images: [
        {
          src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_light_d986541535.png',
          srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
          alt: 'LLM performance monitoring',
          className: 'justify-center items-center',
        },
      ],
      features: [
        {
          icon: <IconDashboard />,
          title: 'Latency tracking',
          description: 'Monitor response times and identify performance bottlenecks',
        },
        {
          icon: <IconWarning />,
          title: 'Error monitoring',
          description: 'Track API errors, rate limits, and model failures',
        },
        {
          icon: <IconTrends />,
          title: 'Model performance',
          description: 'Compare speed and reliability across different models',
        },
        {
          icon: <IconBell />,
          title: 'Real-time alerts',
          description: 'Get notified of latency spikes or error rate increases',
        },
        {
          icon: <IconGlobe />,
          title: 'Geographic performance',
          description: 'See how performance varies by user location',
        },
      ],
    },
    {
      title: 'Native integrations',
      handle: 'native_integrations',
      template: 'grid',
      headline: 'Works with your AI stack',
      description: 'Simple SDKs for popular LLM providers and observability platforms.',
      features: [
        {
          icon: <IconOpenAI />,
          title: 'OpenAI SDK',
          description: 'Drop-in integration for GPT models with one line of code',
        },
        {
          icon: <IconAnthropic />,
          title: 'Anthropic SDK',
          description: 'Native support for Claude models',
        },
        {
          icon: <IconGemini />,
          title: 'Google Gemini',
          description: 'Native support for Gemini models',
        },
        {
          icon: <IconLangChain />,
          title: 'LangChain',
          description: 'Full observability for LangChain applications',
        },
        {
          icon: <IconVercel />,
          title: 'Vercel AI SDK',
          description: 'Track streaming responses and edge functions',
        },
        {
          icon: <IconOpenRouter />,
          title: 'OpenRouter',
          description: 'Native support for OpenRouter',
        },
        {
          title: 'Platform integrations',
          description: 'Works with Langfuse, Helicone, Traceloop, and Keywords AI',
        },
      ],
    },
    {
      title: 'Advanced analytics',
      handle: 'advanced_analytics',
      template: 'grid',
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
  presenterNotes: {
    overview:
      "<strong>Presenter notes:</strong> Track conversations, model performance, spans, costs, latency, and traces in LLM applications – all as regular PostHog events - roughly 10x cheaper than other LLM observability tools.",
  },
}
