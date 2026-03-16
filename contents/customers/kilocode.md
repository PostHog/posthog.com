---
title: How Kilo Code uses PostHog as the connective tissue behind a hyper-fast product team
customer: KiloCode
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/kilocode_customer_story_0e3f1f21b8.png
date: 2026-01-28
---

[Kilo Code](https://kilo.ai/) is an open source, developer-first AI coding platform that lets teams access 500+ LLMs, including top models from OpenAI, Anthropic, xAI, Gemini, and MiniMax. Developers can use Kilo everywhere they work, such as in their coding editor of choice, the terminal, or a web interface. 

In addition to the language models, the team also operates fast. In a matter of months, they have shipped multiple products, expanded headcount aggressively, and built a platform that serves both registered users and developers who never create an account at all. That pace leaves very little room for fragmented tooling or slow feedback loops.

From the start, PostHog became the system that made this speed sustainable. 

Job Rietbergen joined Kilo Code shortly after the company was founded. While PostHog was already in place, he quickly expanded how it was used, turning it into a shared foundation for product, growth, and engineering decisions.

What mattered most wasn’t just analytics. It was having **one place where experimentation, behavior, and outcomes could be understood together.**

<OSQuote
  customer="kilocode"
  author="job_rietbergen"
  product=""
 />

## One source of truth for a highly technical team

The Kilo team is deeply technical across the board. Engineers, growth, DevRel, and marketing are all comfortable working directly with data – writing queries, building dashboards, and exploring insights on their own. That made PostHog a natural fit.

Instead of a single data owner or a slow request process, insights are created and acted on by anyone who needs them. [Product experiments](/experiments), feature launches, and behavioral analysis all happen in the same environment, which removes friction and shortens decision cycles.

PostHog effectively became the company’s source of truth – not because it was enforced, but because it was fast and flexible enough that everyone wanted to use it.

## Acting on product data without bottlenecks

For Job, one of the most valuable parts of PostHog is the ability to turn product data into action without depending on multiple tools or teams. 

He regularly creates product events in PostHog and routes them directly to ad platforms or Customer.io using [destinations](/cdp). This allows Kilo to experiment quickly with onboarding flows, activation campaigns, and new segments – often without engineering involvement.

This setup matches how the company operates: ideas move fast, and tooling needs to keep up without introducing delays or long-term commitments.

## Understanding users when metrics aren’t enough

Because Kilo ships so frequently, traditional funnel analysis isn’t always enough to explain what’s working and what isn’t. Multiple changes often go live at once, which makes it hard to isolate impact purely through numbers. [Session replay](/session-replay) fills that gap.

When launching new pricing or product pages, the team combines light user testing with large-scale session review to understand how users actually navigate, where they hesitate, and what causes confusion. Those qualitative insights then feed directly into design and messaging changes.

This approach helped refine Kilo’s pricing, subscription, team, and enterprise offerings, including the newly launched [Kilo Pass](https://kilo.ai/features/kilo-pass), in ways that would have been difficult to spot through aggregate metrics alone. They even [used PostHog to set up product banners for this launch](https://blog.kilo.ai/p/how-i-use-kilo-for-slack-and-code-reviewer). 

## Telemetry for users who never sign up

A large portion of Kilo’s product can be used without creating an account. Developers can bring their own API keys and start immediately through IDE extensions like VS Code and JetBrains.

PostHog is used to power analytics across those environments, giving the team visibility into usage patterns, model adoption, and errors. That data is critical for understanding real-world behavior and for working closely with model providers on partnerships and launches.

## PostHog as the connective tissue

Rather than pointing to a single metric improvement, Job describes PostHog as infrastructure that quietly supports everything else the team does – from abuse detection and alerts to activation tracking and experimentation.

_“PostHog is really the connective tissue behind a lot of what we’re doing. So many things depend on it, and it adapts as fast as the product does.”_

This adaptability matters at Kilo’s pace. During a recent off-site, the company hired five engineers, flew them in, and had each ship a working product in under a week. Multiple products were released shortly after – a pace that would be difficult to sustain without tooling that removes friction instead of adding it. The team calls it “[Kilo Speed](https://kilo.ai/manifesto).”

_“Everything we do is about speed. PostHog helps us move fast without losing visibility into what’s actually happening.”_
