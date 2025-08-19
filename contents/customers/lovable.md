---
title: How Lovable builds better agents with LLM analytics and experimentation
customer: Lovable
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/lovable_dark_png_bf5d7c603c.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/lovable_light_png_cb215659ae.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/lovable_ca8b63c28c.svg
industries:
  - Devtool
users:
  - Engineering
toolsUsed:
  - LLM analytics
  - Experimentation
  - Feature flags
date: 2025-08-19
---
As a software engineer focused on [Lovable](https://lovable.dev/)’s core agent loop, Viktor Eriksson asks himself the same questions every day:


- How can I improve the agentic workflow?
- How can I make this loop more efficient?
- How can I better integrate with external systems?
- _How can I make our agents smarter?_


He isn’t alone. Lovable’s engineer-led culture empowers everyone to ship faster and bolder, gathering the insights they need along the way. And that’s where PostHog comes in. 

“We started using PostHog very early on,” Viktor says. “We use feature flags to roll out releases gradually, experiments to test new ideas, and LLM analytics too. It’s a crucial part of how we debug traces and ask ourselves questions like, ‘Why is the LLM doing that?’”

That last capability has been especially valuable with the release of OpenAI’s new GPT-5 models. When OpenAI’s updates led to Lovable seeing unusual results, Viktor turned to PostHog to find the cause by inspecting traces and debugging. Eventually, the team realized the LLM was giving parts of the context window different amounts of attention.

This kind of debugging isn’t limited to new releases however. For Viktor, it’s a daily practice — honing efficiency, investigating odd behaviors, and pushing Lovable’s agents forward. It’s this drive which has led him to become one of the heaviest users of LLM analytics across the team, often comparing PostHog directly with other LLM analytics tools in their stack...

<BorderWrapper>
    <Quote
        imageSource="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/viktor_00c779a706.jpg"
        size="md"
        name="Viktor Eriksson"
        title="Software Engineer at Lovable"
        quote={`\"PostHog is super cool because it is such a broad platform. If you're building a new product or at a startup, it's a no-brainer to use PostHog. It's the only all-in-one platform like it for developers.\"`}
    />
</BorderWrapper>

## How _does_ PostHog stack up against other LLM analytics tools?

At first, paying for overlapping tools may seem like an expensive mistake. At Lovable, it’s intentional—a way to keep shipping quickly.

“We tend to have several vendors running at the same time,” Viktor explains. “It lets us get much more insight. We use two other LLM observability and analytics tools right now, alongside PostHog. We just have one thing that emits the events, but we can check the outputs in different ways. It’s actually a pretty efficient way for us to find what works best before we double down on a single vendor — and means we have access to the best tools available while we test.”

Among those tools is [a prompt playground feature](https://app.posthog.com/llm-observability/playground) that enables teams to test prompts and see how different models respond and compare. It’s a feature that Lovable first saw in Langfuse, but as the team gravitated towards PostHog’s LLM analytics beta they raised a feature request for it. Less than a month later, PostHog’s own LLM playground shipped and was specced to Lovable’s needs. 

“PostHog is definitely the best tool for LLM analytics,” Viktor says. “It’s not just about where the tool is today, but also the fact that you’re improving faster. That’s huge for us because it means PostHog covers so many use-cases and we have so many tools in one place.”

“It’s amazing that PostHog can ship so fast and add features like this so much faster than competitors.”
