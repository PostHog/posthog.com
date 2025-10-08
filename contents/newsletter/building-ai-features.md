---
title: What we’ve learned about building AI-powered features
date: 2025-09-09
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/hero_9791aaf820.jpg
featuredImageType: full
tags:
  - Product engineers
crosspost:
  - Founders
  - Blog
---

AI feels like a gold rush.

Everyone’s staking claims and panning for quick wins. A minority are building mines that create long-term value, but most of the shiny demos are fool’s gold: bolted-on, rarely used, and quick to tarnish.

We took our time entering this gold rush. In 2023, when many started adding AI-powered features, we tinkered but felt the model capabilities weren't good enough.

A year later, in an August 2024 hackathon, we built a trends generator agent and it was obvious things had changed. Given the proper context, models were now good enough to generate useful insights.

That was 12 months ago. Since then, we shipped [Max AI](/max), our AI-powered product analyst, and we’ve learned a bunch of lessons along the way.

The first one? Don’t make your product worse.

## Choosing what to build

Yes, AI really can make your product worse if you choose to build the wrong thing, either because it’s too slow, unreliable, or it solves a problem no one cares about.

There are three key lessons here:

### 1. Learn the patterns AI is good at

You don’t need to reinvent the wheel.

A bunch of smart people have already figured out effective AI patterns you can copy. These have the advantage of being [UX patterns](/newsletter/vibe-designing) that users are familiar with, while also being functionality AI is actually good at.

First is the classic “chat with your docs/data/PDF.” AI is great at search and summarization, and can use this to build reports and recommendations.

![Intercom's Fin](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/6d97f7ea_c67e_4805_a1fa_ea8b7eda825a_676x487_04ace87dcc.png)

<Caption>Intercom’s Fin, or Mintlify’s docs chat, are great examples of using AI to search and summarize data.</Caption>

Second are generators of various kinds: titles, code, documents, SQL, images, and filters. [App builders](/newsletter/vibe-designing) like [Lovable](/customers/lovable) and Bolt.new are the most notable examples, but numerous companies, such as Figma, Rippling, and Notion, have integrated generation features into their products.

![Lovable's app builder](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/lovable_cac0926e58.png)
<Caption>Lovable’s code generation features have made it one of the fastest growing software startups on record.</Caption>

Third, and finally, is tool use. AI can use well-defined tools. This is what [MCP servers](/blog/machine-copy-paste-mcp-intro) are all about. Companies like [Zapier, Atlassian](/newsletter/the-companies-that-shaped-posthog), Asana, and many more have used this to automate and improve workflows. And yes, there’s a [PostHog MCP server](/docs/model-context-protocol), too.

![Zapier's workflow builder](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/zapier_67c35e020b.png)

<Caption>Zapier’s workflow builder gives AI a bunch of tools that users want it to use.</Caption>

Knowing the common AI patterns helps you identify where you can use them in your product. [Max AI](/max) uses several of these, including:

- Chat with your data and our docs

- Generate [SQL insights](/docs/data-warehouse/query) and filters

- Use tools, like [creating surveys](/docs/surveys/creating-surveys#maxai-and-surveys) and analytics insights.

Soon, Max AI will go further in its tool use by watching and analyzing session recordings for you, among other (somewhat secret) things.

### 2. Identify problems that AI might solve

> Ask not what you can do with AI, but what AI can do for you. — JFK (I think)

With the patterns AI is good at in mind, go through your product and figure out the jobs to be done that AI could potentially do, such as:

- A well-defined single task that takes more than 30 seconds to do, like filling a long form, manually entering data, setting up an integration, or [installing an SDK](/docs/getting-started/install).

- Instances where users need to use a language or interface they don’t understand, such as a complex UI, [SQL queries](/docs/data-warehouse/query), or building an app.

- Something users do more than 20 times, such as writing descriptions, summaries, or creating an entry.

As Stephen Whitworth of incident.io said in [Lenny's Newsletter](https://www.lennysnewsletter.com/p/counterintuitive-advice-for-building):

> Look less at “what cool new things could AI do” but more at “what’s the thing our users do 100 times a day that AI could make better.”
>
> An example for us is writing a summary for an incident. It turns out that users vastly, vastly prefer automatically generated summaries to writing these themselves; 75% of incident summaries are now AI-generated.

We’ve applied this thinking in many ways, such as:

1. Creating an [AI install wizard](/blog/envoy-wizard-llm-agent), which lowers the time to install PostHog from ~10 minutes to 90 seconds – perfect for vibe coders or anyone frequently starting new projects.

2. Max AI makes writing complex SQL queries easy by acting as a natural language translator. This especially helps less technical users of PostHog [who aren’t familiar with SQL](/product-engineers/sql-for-analytics) create more customized insights.

### 3. Validate the problem is specific and valuable

Now that you have some patterns and problems, narrow them down to the ones that are both specific and valuable.

![Specific and valuable](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/specificvaluable_f91bec523d.png)

Avoid these traps:

1. **Using an existing pattern on a problem that isn’t valuable.** You probably don’t need a “chat to your docs” feature in a simple, early-stage product. It might even be a negative as it could hide core usability issues.

2. **Trying to solve too large a problem with AI.** An AI can’t one-shot making you a billion dollars. It’s better to solve a narrow problem first before expanding outward. If you’re stuck, try enhancing something that already exists.

When building Max, we quickly realized answering questions like “How do I increase revenue?” were too broad. Instead, we focused on building specific functionality that leverages its advantage of being integrated into PostHog with your PostHog context.

![Max](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/max_2ba566d25d.png)

<Caption>Max can generate many insights faster than a user could because it understands the schema and the tools it can use.</Caption>

For example, Max can write better SQL because it knows which tables are available, and answer product questions with native visualizations because it’s built-in and understands the tools available.

## Implementing your idea

Now that you have an idea of what you want to build, you need to make sure it actually works. Here are some core bits to focus on getting right:

### 4. Your app’s context and state are critical

Everyone can call the OpenAI API, but your app's context is unique. This can include data like:

- What a user is trying to do

- Who is doing it

- Their account status

- Where they are in the app

- The app’s data schema looks like

When a user asks Max why signups dropped last week, for example, the API receives information on the:

- Current page (dashboard, visible insights, applied filters, user role)

- Data schema (available events, event properties, person properties)

- Account (organization tier, timezone, retention)

The code for this literally looks like this:

```python
# From root/nodes.py - Context gets formatted into the AI prompt
def _format_ui_context(self, ui_context: MaxUIContext) -> str:
  if ui_context.dashboards:
    dashboard_context = f"""
    Current dashboard: "{dashboard.name}"
    Visible insights: {[insight.name for insight in dashboard.tiles]}
    Applied filters: {dashboard.filters}
    Date range: {dashboard.date_from} to {dashboard.date_to}
    """

  if ui_context.insights:
    insight_context = f"""
    Current insight: "{insight.name}" 
    Query type: {insight.query.kind}
    Events analyzed: {insight.query.events}
    Breakdown: {insight.query.breakdown}
    """

  return f"User context: {dashboard_context}\n{insight_context}"
```

You also need to handle “context” within the workflow (aka state). As the conversation progresses, you don’t want that context to be lost, and this is especially likely to happen when you have multiple sub-agents. To get this right, we store and include context through every part of the workflow like this:

```python
class AssistantState(TypedDict):
  messages: list[BaseMessage]
  intermediate_steps: list[AgentAction]
  plan: str | None
  current_query: SupportedQueryTypes | None
  visualization_result: dict | None
  # ... plus error handling, retry counts, etc.
```

We find doing this, combined with optimizing our model choice, is more effective and useful than fine tuning a model would be.

### 5. Steer AI to success with query planning and conditional routing

AI will run off and [do all sorts of crazy things](/newsletter/ai-coding-mistakes) if you let it. It needs guidance to be successful.

We do this by orchestrating and chaining together multiple steps like query planning → data retrieval → visualization.

Beyond state management, this requires:

- The AI knowing what tools and data it has at its disposal.

- Being able to select the correct tools and data based on the intended task.

- Making sure those tools, like query execution and formatting, actually work.

In PostHog, at the highest level, this functionality comes from a router like this:

```python
# From root/nodes.py
def router(self, state: AssistantState) -> Literal["insights", 
"search_documentation", "billing"]:
  if self._should_generate_insight(state):
    return "insights"
  elif self._should_search_docs(state):
    return "search_documentation"
  # ... etc
```

Each node of the router then has its own conditions to route through to get to the right data and tools for the job. This ensures the AI has the pieces it needs to complete the task and makes successfully completing that task more likely.

### 6. Plan for failure by adding monitoring, guardrails, and error handling

Ideally all the structure you’ve built up to this point prevents failure, but you still need to [give the AI guardrails](/blog/envoy-wizard-llm-agent) because it *will* inevitably smash into them.

First, you need to know when something goes wrong, so [implement monitoring](/docs/llm-analytics/start-here) from the beginning. [Georgiy](/community/profiles/30798) from our [Max AI](/teams/max-ai) team relayed how important this is:

> Monitoring production traces is essential. We even built a [monitoring tool](/llm-analytics) for [dogfooding](/product-engineers/dogfooding), and I wish we had that tool from the beginning. It becomes harder to monitor traces at scale (we’re here), so online evaluations will be helpful (our next priority).
>
> It’s hard to review 100 conversations. It’s impossible to review 1,000 conversations per day. Those conversations are real-world user questions and struggles, and provide all the insights you need to build the agent.

Second, anything an AI can hallucinate, it will hallucinate. To prevent this, we are explicit about the data that needs to be set directly, and the rules it needs to follow.

In [our AI installation wizard](/blog/envoy-wizard-llm-agent), for example, we include rules like:

- Never hallucinate an API key. Instead, always use the API key populated in the .env file.

- Do not add placeholder comments like "// In a real app..."

- Do not modify the existing business logic or add simulation code

- Never import new packages or libraries that aren't already used

- Do not assume any authentication library (Clerk, Auth.js, etc.) is available

![Hallucination](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hallucinate_4c3ef2b132.webp)

You also need guardrails for *people*. When people see an empty text box, they get scared and forget everything.

The solution? Add suggestions for how they can use your AI-powered features, nudge them in the right direction, and help them remember what’s possible.

![Panik vs Kalm](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/kalm_cdfe76c440.webp)

Beyond issues with humanity and hallucination, sometimes your workflows just break. You need to be able to handle these gracefully with retries and rate limiting.

For real pros, you can also set up [LLM analytics](/llm-analytics), [error tracking](/docs/error-tracking), and [feature flags](/docs/feature-flags) to help. Conveniently we provide all three, which is a weird coincidence.

## Improving your feature
AI models are evolving rapidly and in unpredictable ways, so your AI-powered features require more maintenance and continual improvement than you might expect.

From experience, here's what we've found is most important when trying to do this:

### 7. Avoid AI knowledge silos

Building AI-powered features shouldn’t be the responsibility of some “AI guy” on your team. AI should be deeply integrated into your product and this means you need the expertise of the people [talking to users](/newsletter/talk-to-users) and building something for them.

There are a few ways you can encourage this:

- **Build primitives and make your AI functionality composable**, so teams don’t need to re-invent prompts, streaming, consent, evals, and [analytics](/llm-analytics). This helps teams focus on unique and value-added AI functionality.

- **Have a consistent UX pattern across your app.** For us, that’s [Max](/max). This prevents death by a thousand AI widgets.

- **Get your AI experts to embed in teams temporarily** to help those teams build AI functionality ([our Max AI team](/teams/max-ai) does this). This helps AI-powered features get built faster while distributing AI knowledge throughout the organization.

### 8. Focus on speed

One of the big challenges with AI-powered features, especially complex ones, is that they are **slow**. A workflow can often mean multiple calls to LLM providers, which can add up to a lot of time waiting for responses. This can be especially frustrating when alternative ways to complete a task exist in an app or website.

As the founder of Superhuman, Rahul Vohra, noted in [Lenny’s Newsletter](https://www.lennysnewsletter.com/p/counterintuitive-advice-for-building):

> The thing we’ve learned: speed wins.
>
> Take, for example, Instant Reply or Auto Summarize. Gmail and Outlook have similar features, but you have to generate the replies and summaries on demand—and then wait for them to finish generating.
  >
> In Superhuman, we pre-compute them, so they are always instantaneous. That simple difference is a massive lever on the user experience.

Some ways to improve this:

- **Be aware of model benchmarks and new model releases.** When a better, faster model releases, test it out and use it. This can often have the biggest boost to both functionality and speed. Use [LLM analytics](/llm-analytics) to test this.

- **Mix fast and slow models depending on the task.** We use fast models, like `gpt-4.1-mini` and `gpt-4.1-nano`, for title generation, session replay filters, survey summarization, and insight search. We use slow models (like `gpt-4.1`) for schema generation, conversation handling, and context management.

- **Use async processing.** Complex AI operations, such as session summaries and pattern extraction, run asynchronously via Temporal workflows to avoid blocking user interactions. These are then cached in Redis to support retries without recomputation.

### 9. Constantly monitor and evaluate effectiveness
Your new feature shouldn’t be judged less strictly just because it’s ✨ AI ✨.

Not only can the wrong idea make your product worse, changes in models can negatively impact the experience without your knowledge.

There are multiple methods we found work best for evaluating effectiveness:

- **Add evals early.** We found even small golden or synthetic datasets were giving insane performance boosts compared to the typical development cycle. Even at our scale, implementing this was an easier task than expected. This makes building future features faster too.

- **A/B test AI-powered features vs the normal experience** as well as different prompts, contexts, workflows, and more.

- **Check AI usage rates for different types of customers** – e.g. free users vs enterprise, or product vs sales. We found product managers and marketers were using Max more often than our ideal customer profile of product engineers, which led us to reconsider our roadmap.

- **Let users rate AI responses as good or bad.** When users rate responses poorly, ask them for more details. Use this to tweak context, prompts, and workflows.

- **Compare AI vs non-AI usage using your existing activation and retention metrics.** This helps you understand where AI ideally fits into your product and user lifecycle, and whether it’s having a positive impact.

![Retention](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/retention_0491dd6fc2.webp)

## Wrapping up

These nine lessons are not isolated takeaways, they work in tandem. It’s a mistake to skip to the end and think that optimizing evals = building a great product.

Remember, you’re aiming to build something valuable to users, not shiny tech demos. Just because it’s AI does not mean users will find it valuable.

All the lessons you’ve learned about building great products still apply. [Talk to users](/newsletter/talk-to-users), [ship fast](/newsletter/this-is-why-youre-not-shipping), [run experiments](/product-engineers/ab-testing-mistakes), and repeat.

*Words by [Ian Vanagas](http://x.com/ianvanagas), who wrote this newsletter by hand as much as he would have liked to one-shot it with AI.*