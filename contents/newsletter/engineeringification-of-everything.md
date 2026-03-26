---
title: "The engineeringification of everything"
date: 2026-02-23
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/space_hog_meme1_586f6b5aed.png
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Blog
---

Engineering has escaped the codebase. The tools, mindset, and identity increasingly shape every function.

Spend enough time in startup circles and you’ll hear this engineeringification of everything:

> “Oh, I’m a design engineer”
>
> “We’re following best practice of GTM engineering”
>
> “I need to talk to their sales engineer about implementation”

This raises two questions:

1. Why is every role becoming an engineering one?

2. Should I be worried?

This post answers both of these.

## The engineeringification loop

The spread of engineering tools, skills, and identity into non-engineering roles, AKA “engineeringification,” is driven by a feedback loop that looks like this:


![Engineeringification loop](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/image_8_74db483529.jpg)

Take the role of design engineer as a specific example:

- **Design tools get more powerful.** They’re not just for wireframing. Tools like Figma, Tailwind, and design systems baked into frameworks mean decisions shape production code. A button goes from being “just a rectangle” to a set of responsive, accessible variants that fit with your existing system.

- **Using them is complicated.** Fully leveraging a design tool like Figma or a framework like Tailwind requires understanding product features, configurations, syntax, hotkeys, best practices, limitations, and constraints. At some point, you might even need to read the code.

- **Non-technical people learn anyway.** Because engineering time is scarce and iteration speed matters, designers learn enough to ship. LLMs make this easier: they can generate Tailwind components, UIs, or even prototypes rather than hand-coding them.

- **Skills accumulate and identity shifts.** At some point, the designers stop handing off work and do it themselves. They ship product code, debug layouts, and make tradeoffs between design and performance. Calling this just “design” makes less sense.

- **A new identity emerges and startups latch onto it.** The label appears: design engineer. Power users adopt it, companies like Vercel start [hiring for it](https://vercel.com/careers/design-engineer-us-5709080004), and tools begin marketing to it. The loop restarts, now with a clearer identity to build around.

Tools change skills, skills reshape identity, and identity demands new tools.

<NewsletterForm />

## Why is engineeringification happening now?

People have been building powerful tools for many roles for a long time now. What makes this time different?

### 1. LLMs make it possible

LLMs make complex, domain-specific tools more accessible. Seemingly every tool has an [AI assistant](/ai), an [MCP server](/docs/model-context-protocol), or an AI-powered alternative.

Non-technical people can learn how to use the powerful tools once exclusive to engineers faster and easier. With them, they can:

- Generate apps and prototypes with tools like [Lovable](/customers/lovable), [v0](/blog/vercel-integration), and [Claude Code](/newsletter/ai-coding-mistakes).

- Automate and optimize go-to-market with tools like Clay, Pocus, Vitally, and Lemlist.

- Build and configure workflows with [PostHog](/docs/workflows), [Make](/docs/cdp/destinations/make), and [n8n](/docs/libraries/n8n).


![LLM help me](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/image_9_4c302baa4d.jpg)

### 2. Capital makes it inevitable

Engineeringification is a good business (we know because we’re in it). It’s where B2B SaaS is heading as companies are willing to pay for it, VCs are willing to invest in it, and [playbooks for success exist](/newsletter/marketing-for-devs).

You can see this reflected in the growth and valuation of AI-powered B2B SaaS startups serving non-engineers like [Sierra](https://sierra.ai/blog/year-two-in-review), [Lovable](https://lovable.dev/blog/series-b), [Fin.ai](http://fin.ai/), [Bolt.new](https://www.growthunhinged.com/p/boltnew-growth-journey), [Decagon](https://decagon.ai/resources/series-c-announcement), [Clay](https://www.clay.com/blog/100m-arr), and [Replit](https://replit.com/news/funding-announcement).

The capital flooding into the space improves the tools, provides users more capabilities, encourages new startups entrants, and increases marketing toward the engineeringification of identities.

### 3. Identity makes it permanent

The final driver of engineeringification is identity. Once people start seeing themselves as engineers, the loop becomes self-sustaining.

You don’t have to look far to see this shift in action. [YC job posts](https://www.ycombinator.com/jobs) show how non-technical roles are increasingly engineering focused:

![YC job posts](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/image_10_4329cffcf6.jpg)

Engineeringification gives individuals new autonomy while saving engineers time. Success encourages non-technical people to expand their skills and use the tools more. As they spend more time on engineering-like work, they begin to identify less with their old role as it undersells the value of their work and how technical they are.

Instead, people identify more with what they’re building and the people who build (AKA engineers). This new identity eventually crystallizes often via blog post, conference talk, meetup or even tweet. Think Andrej Karpathy on [vibe coding](https://twitter.com/karpathy/status/1886192184808149383), Anthropic hiring a [prompt engineer](https://www.bloomberg.com/news/articles/2023-03-29/ai-chatgpt-related-prompt-engineer-jobs-pay-up-to-335-000), and Vercel promoting [design engineering](https://vercel.com/blog/design-engineering-at-vercel).

New identities compound the loop: people adopt it, tools are built for them, and marketing reinforces it. This feeds the cycle all over again.

## The meaning of engineer is changing

What it means to call yourself an “engineer” is a sensitive topic. It’s literally illegal to call yourself one without accreditation [where I’m from](https://www.egbc.ca/complaints-discipline/unauthorized-practice-or-title/unauthorized-practice-misuse-of-title).

Engineering once meant a specific set of skills in a bounded domain reinforced with formal training and gatekeeping. This remains true in physical domains as failure has physical consequences, but software’s low cost of failure makes gatekeeping harder to sustain. Boundaries are eroding.

The defining line of engineering is moving away from “who is allowed to build” toward “who has the ideas and dedication to actually build it.” It’s less about knowing all the theory and more putting it into practice.

To some, this looks like a loss. Engineering feels deprofessionalized: more self-taught practitioners, less depth, titles lose meaning.

For many more, it’s a gain: more autonomy, faster iteration, increased leverage and a better ability to ship solutions to real, valuable problems.

![Engineer meaning](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/image_11_14080a2346.jpg)

## Should you be worried?

The line between technical and non-technical work isn’t disappearing, it’s being redrawn. Whether you’re an engineer or not, the winners will be those who think like builders:

- For **non-technical people**, don’t be afraid to take on more “engineering” tasks. Tools have become more powerful and specialized and people like you are succeeding in using them. The combination of LLMs and MCP have made it easier to both learn and interact with more tools.

- For **engineers**, congrats! The world is investing a ton in making YOU more powerful. Use these same tools to turn yourself into a full stack shipping machine AKA a [product engineer](/blog/what-is-a-product-engineer). For example, you can use [Exa](https://exa.ai/) for competitive research, [BuildBetter](https://buildbetter.ai/) for user interviews, Figma Make to design a UI, and [PostHog AI](/ai) to analyze your product usage.

For **startups**, build for these new types of engineers. At a minimum, let people do engineering: have an API, make your docs [machine readable](/docs/ai-engineering/markdown-llms-txt) (I love a “Copy as Markdown” button), publish an MCP server, and connect with other tools.

Those who embrace the engineeringification of everything will find themselves riding the wave it is creating. The billions trillions invested here has to benefit someone. Why not you?

*Words by <TeamMember name="Ian Vanagas" /> who, after all this, is still a bit skeptical of the “content engineer” role.*

<NewsletterForm />
