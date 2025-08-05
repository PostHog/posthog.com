---
title: How to think about building AI-powered features
date: 2025-08-05
author:
 - ian-vanagas
tags:
 - feature flags
---

AI feels like a gold rush. Everyone’s staking claims and panning for quick wins with few building mines that create long-term value. Shiny demos are everywhere, but many are fool’s gold: bolted-on, rarely used, and quick to tarnish.

We’ve all experienced poorly built AI-powered features. These can have a huge negative impact on user experience, hurting a company’s reputation and slowing adoption of future features.

How do you avoid this fate? We’re still figuring it out, but we’ve developed some principles for building AI-powered features at PostHog and we’re sharing them here.

## 1. Help users do more

AI is good at a lot of things, but it isn’t good at everything. 

AI is good at translating natural language into other forms. For example, LLMs are good at translating natural language into:

- Code like SQL
- Structured data like session replay filters
- Tool use like creating insights or surveys

Another area where it excels is summarization aka finding the relevant information in huge amounts of data. For us, this looks like: 

- Analyzing trends, tables, and funnels and giving basic recommendations
- Summarizing sessions to help you find the ones you want
- Searching the docs to help you answer product questions

Many people have found this combination of translation and summarization can provide massive value to users. They can do more things with less effort.

In both cases, you are replacing the need for someone to translate their thoughts into code, filters, search queries, actions, and more. This is especially helpful in a technical product (like PostHog) where some users might be less technical and unfamiliar with UX patterns or terminology.

Translation and summarization features were the first we built for [Max AI](/docs/max-ai), our AI-powered product analyst. He can generate SQL, create trends, do basic analysis, answer docs questions, and more.

![Max AI](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_01_at_11_52_292x_2c1b81457f.png)

Features like these are also the bulk of what we’re planning to add to Max. We’re aiming to have him help users with every part of the product, but this requires us to customize his functionality for each part as well. Simply giving him all the data and APIs will make him too slow and ineffective.

Ideally, Max becomes an alternative interface for PostHog, one that enables anyone to use natural language to accomplish their goals, regardless of their familiarity with our functionality. 

> **Takeaway:** Ask yourself what the most difficult and important areas of your product are, and then see if LLMs can help translate natural language into action in those areas. Aim to provide the average user with more capabilities. Measure growth in product usage, especially complex features.

## 2. Help users go faster

AI works best when given tight constraints. With constraints, it makes fewer mistakes and hallucinates less. This means they are more consistently able to complete tasks successfully.

Fortunately, if you look, many such areas already exist in your product. These are tasks like manually filling long forms, repeatedly entering data, or moving data from one format to another. Any area where a user spends more than 30 seconds doing a task is a prime candidate for AI.

The biggest example of this for us is **installation**. This is why we built an [AI setup wizard](/blog/envoy-wizard-llm-agent). Our thinking went like this:

- There are hundreds of people who install PostHog every day.
- We know what the installation should look like. We know the correct patterns and best practices, but an LLM might not. They might reference out-of-date docs or hallucinate API keys.
- When given the right constraints, we can guide the LLM to do the installation for users (very fast) with all the correct patterns and details.

This means setup has gone from minutes of jumping around different windows and pages to 90 seconds of pressing Enter in your terminal. Users can experience the value of PostHog a lot faster.

![AI wizard in action](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_07_31_at_14_56_492x_cb6622f3f5.png)

Other companies have found this pattern works for them too:

- Autocomplete from Cursor, Copilot, and other AI-powered code editors.
- Draft or outline generation from Notion and other word processors.
- [Website and app generation](/newsletter/vibe-designing) from Lovable, Bolt, and other AI-powered app builders
- Visual and design generation in Figma, Canva, and more design tools

For each of these, the user could probably create what the model generates, just a lot slower. Speeding up genmeration helps users realize the value of a product and accomplish their goals faster. As Stephen Whitworth of [incident.io](http://incident.io) said in [Lenny’s Newsletter](lennysnewsletter.com/p/counterintuitive-advice-for-building):

> Look less at ‘what cool new things could AI do’ but more at ‘what’s the thing our users do 100 times a day that AI could make better.’ An example for us is writing a summary for an incident. It turns out that users vastly, vastly prefer automatically generated summaries to writing these themselves; 75% of incident summaries are now AI-generated.

> **Takeaway:** Think of areas where users need to do a lot of manual work in your product and see if you can automate that with AI. It’s best if it’s along your onboarding and activation process. If something takes 30+ seconds to do, there is probably some way AI can help. Measure time-to-value as well as [activation rate](/newsletter/wtf-is-activation).

## 3. Recursively self-improve your product

At a meta-level, AI can also help us improve the experience of building with AI:

- We build products like [LLM observability](/docs/ai-engineering) because we needed it. We need to know how users are using our AI-powered features, how LLMs are performing, and how we can improve them. We have more of these features to come.

![LLM observability](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_01_at_11_59_122x_33ba1efda9.png)

- We’ve centralized primitives with Max AI so teams don’t need to re-invent prompts, streaming, consent, evals, and observability. This helps teams add AI features to their products more easily. We’ve also developed an AI design pattern to avoid death by random AI widgets.

- Because every team is responsible for adding Max AI to their product, its functionality is better tailored to that product. It can help users go faster and wider in it, rather than feeling like a bolt on.

- Teams get assistance from the [Max AI team](/teams/max-ai), who provide an engineer to help with the implementation. This helps the implementers get Max integrated faster while distributing AI knowledge throughout the organization.

- Because we use PostHog, we can use the AI tools PostHog provides to go further and faster. For example, our team loves using Max’s SQL generation to [build a bunch of insights](/blog/data-warehouse-at-posthog) that help us understand and make better decisions about PostHog.

Of course, we are also talking to users and figuring out and building what they need along the way. It is a trap to focus entirely on the functionality we want.

![Loop](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_01_at_14_39_482x_d0446c8de8.png)

> **Takeaway:** Make it easier for your team to build AI-powered features. Build primitives at the platform-level. Help AI knowledge spread through your organization by encouraging collaboration.