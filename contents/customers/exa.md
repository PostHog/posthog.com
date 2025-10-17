---
title: Why Exa loves PostHog’s Max AI
customer: Exa
logo: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/lovable_dark_png_bf5d7c603c.png
logoDark: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/lovable_light_png_cb215659ae.png
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/exa_c102c1d824.jpg
industries:
    - AI
users:
    - Engineering
toolsUsed:
    - Product analytics
    - Session replay
    - Max AI
date: 2025-08-19
---

Founded in 2021 and already trusted by teams such as Cursor, Vercel, and Notion, Exa is a company with a crystal clear vision of what they want to build: the next generation of AI-powered search.

“Our AI search engine crawls and indexes the whole web in an entirely new way,” explains Exa’s Liam Hinzman. “Conventional search engines like Google are largely keyword driven, but our approach is semantic. Using LLMs to understand the meaning and intent behind a query enables us to give much better results.”

Despite having a clear view of what they were building, the underlying stack that enabled the team to fulfil it was often fragmented. The team used PostHog for feature flags but did product analytics in Streamlit and revenue analytics in Stripe Sigma.

“Our analytics efforts were quite scattered,” admits Liam. “We were often having to switch between tools and dealing with inconsistencies because the data lived in a ton of different places. Whenever we wanted to analyze something we had to question where we pulled data from and what we could infer from it or how much we could trust it.”

Eventually, frustrated with a scattered stack, the team decided to centralize as much as possible around a single tool — PostHog.

<OSQuote
  customer="exa"
  author="liam_hinzman"
  product="max_ai"
 />

## Using PostHog for an AI-assisted engineering loop

Now, with analytics centralized into PostHog, the team can much more flexibly and reliably interrogate data from multiple sources using a mix of ready-made visualization tools ([funnels](/docs/product-analytics/funnels), [paths](/docs/product-analytics/paths), etc.) and [SQL](/docs/data-warehouse/sql) when needed.

“The best thing for me is [Max AI](/max),” says Liam. “It’s really nice to have it help with SQL queries when you’re like 80-90% of the way there and it can finish them for you. If I get something wrong with one of my SQL operations, Max AI can just fix it up for me.”

Exa didn’t stop at just bringing analytics into PostHog, however. Tools such as session replay have also enabled the team to debug errors and even ship code faster than before.

“For me, a lot of product engineering work is less about implementation, and more about aligning myself to a truth,” explains Liam. “Session replay really helps with that. You can see where people get confused. You can quickly validate hypotheses by using it with analytics. Then, I can work with an AI to deploy a fix — it’s an incredibly efficient way for me to work and there are still so many features in PostHog we haven’t adopted yet, like [surveys](/surveys) and [revenue analytics](/revenue-analytics).”
