---
title: What we've learned about building AI-powered features
date: 2025-08-11
author:
 - ian-vanagas
tags:
 - feature flags
---

AI feels like a gold rush. Everyone’s staking claims and panning for quick wins. Few are building mines that create long-term value. Shiny demos are everywhere, but many are fool’s gold: bolted-on, rarely used, and quick to tarnish.

We took our time entering this gold rush. Two years ago, when many started adding AI-powered features, we felt the model capabilities weren't good enough to create the experience we wanted to provide. A year later, they got there and we started building.

Since then, we've learned a lot about what works and what doesn't when building AI-powered features. This post shares that with you in an effort to help you build something users will use and love.

## Choosing the right AI features (in the right spot)

One of the biggest risks of adding AI to your product is making it worse. AI can often provide a worse experience than what already exists.

This happens because teams build the wrong features in the wrong places. Avoiding this requires the following three steps:

### 1. Learn the patterns AI is good at

Just because AI companies seem to be reinventing the wheel doesn’t mean you need to too. 

A bunch of smart people have already figured out AI patterns that work which you can copy to your product. These have the advantage of being UX patterns that users are familiar with while also being functionality AI is actually good at.

First is the classic “chat with your docs/data/PDF.” AI is great at search and summarization and can use this to build reports and recommendations. Intercom’s Fin or Mintlify’s docs chat are examples of this.

![Chat with your docs](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_11_at_12_20_38_2x_60d5ceaccf.png)

Second are generators of various kinds. Titles, code, documents, SQL, images, and filters. Of course, AI app builders like Lovable or Bolt.new have been the biggest beneficiaries of this, but all sorts of companies from Rippling to Figma to Notion have added generation capacities too.

![Generators](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_11_at_12_21_06_2x_994a085f7e.png)

Third, and finally, is tool use. AI can use well-defined tools. This is what [MCP servers](/blog/machine-copy-paste-mcp-intro) are all about. Companies like [Zapier, Atlassian](/newsletter/the-companies-that-shaped-posthog), Asana, and many more have used this to automate and improve workflows.

![Tool users](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_11_at_12_21_35_2x_82b8a095db.png)

Knowing the common AI patterns helps you identify where you can use them in your product.

### 2. Identify problems that maybe AI could solve

> Ask not what you can do with AI, but what AI can do for you. - JFK (I think) 

With the patterns in mind, go through your product and figure out the jobs to be done that AI could potentially do. Some examples of these:

- It’s a well defined single task that takes more than 30 seconds to do like filling a long form, manually entering data, setting up an integration,or installing an SDK.

- Users need to use a language or interface they don’t understand, such as a complex UI, SQL queries, or building an app.

- Users do it more than 20 times like writing descriptions, summaries, or creating an entry. As Stephen Whitworth of incident.io said in [Lenny's Newsletter](https://www.lennysnewsletter.com/p/counterintuitive-advice-for-building):

> Look less at ‘what cool new things could AI do’ but more at ‘what’s the thing our users do 100 times a day that AI could make better.’ An example for us is writing a summary for an incident. It turns out that users vastly, vastly prefer automatically generated summaries to writing these themselves; 75% of incident summaries are now AI-generated.

### 3. Make sure that work is specific and valuable

Now that you have some patterns and problems, narrow them down to the ones that are both specific and valuable. 

![Specific and valuable](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_08_at_16_39_26_2x_d30ab8c160.png)

Two common traps here are:

1. **Using an existing pattern on a problem that isn’t valuable.** For example, if your product is early, you probably don’t need a “chat to your docs” feature. It might even be a negative as it could hide core usability issues.

2. **Trying to solve too large a problem with AI.** Be honest with yourself. Having the AI one-shot making you a billion dollars is unrealistic. It’s better to solve a narrow problem first before expanding outward. If you’re stuck, try enhancing something that already exists. 

## Implementing your AI-powered feature the right way

Now that you have an idea of what you want to build, you need to make sure it actually works. Here are some core bits to focus on getting right.

### 1. Context and state

Everyone can call the OpenAI API, but your app's context is unique. This can include data like what a user is trying to do, who is doing it, what their account status is, where they are in the app, and what the app’s data schema looks like. 

For example, when a user asks Max, our AI product analyst, why signups dropped last week, Max receives information on the:

- Current page (dashboard, visible insights, applied filters, user role)
- Data schema (available events, event properties, person properties)
- Account (Organization tier, timezone, retention)

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

Beyond this, you also need to handle “context” within the workflow AKA state. As the conversation progresses, you don’t want that context to be lost. We store and include context through every part of the workflow like this:

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

### 2. Query planning and conditional routing

Because there is so much AI can do, it needs guidance. It will run off and do all sorts of crazy things if you let it. This means orchestrating and chaining together multiple steps like query planning → data retrieval → visualization.

Beyond state management, this requires:

- AI to know what tools and data it has at its disposal.
- Being able to select the correct tools and data based on the intended task users want to complete.
- Making sure those tools, like query execution and formatting actually work.

In PostHog, at the highest level, functionality comes from a router that looks like this:

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

### 3. Plan for failure by adding guardrails and error handling

Ideally all the structure you’ve built up to this point prevents failure, but you still want to give the AI guardrails because they *will* inevitably smash into them. 

Anything an AI can hallucinate, it will hallucinate. To prevent this, we are explicit about the data that needs to be set directly and the rules it needs to follow. For example, in our AI installation wizard, we include rules like:

- Never hallucinate an API key. Instead, always use the API key populated in the .env file.
- DO NOT add placeholder comments like "// In a real app..."
- DO NOT modify the existing business logic or add simulation code
- NEVER import new packages or libraries that aren't already used
- DO NOT assume any authentication library (Clerk, Auth.js, etc.) is available

![Can't hallucinate API keys](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_11_at_12_22_26_2x_b75027dce9.png)

<Caption>You can’t hallucinate API keys if you set them yourself</Caption>

Another guardrail to put in place is one *for people*. This is because when people see an empty text box, they get scared and forget everything. 

To nudge users' memory and help them get the most out of your AI-powered features, you can provide suggestions of ways they can use it:

![Suggestions](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_08_at_17_52_21_2x_514e35df81.png)

Beyond issues with humanity and hallucination, sometimes your workflows just break. You need to be able to handle these gracefully with retries and rate limiting. 

For real pros, you can also set up observability, error tracking, and feature flags (conveniently we provide all three).

## Improving your AI-powered features once you've built them

The AI industry is undergoing continual, rapid, and unpredictable change. This means that the AI-powered features you build require a lot more maintenance and continual improvement than you might expect.

From experience, here's what we've found is most important when trying to improve your AI-powered features:

### 1. Help your team build AI-powered features

Building AI-powered features shouldn’t be the responsibility of some “AI guy” on your team. AI should be deeply integrated into your product and this means you need the expertise of the people talking to users and building something for them.

There are a few ways you can encourage this:

- Build primitives and make your AI functionality composable so teams don’t need to re-invent prompts, streaming, consent, evals, and observability. This helps teams focus on unique and value-added AI functionality.

- Have a consistent UX pattern across your app. For us, that’s Max. This prevents death by 1000 AI widgets.

- Get your AI experts to embed in teams temporarily to help those teams build AI functionality. This helps AI-powered features get built faster while distributing AI knowledge throughout the organization.

### 2. Make them faster

One of the big challenges with AI-powered features, especially complex ones, is that they are **slow**. A workflow can often mean multiple calls to LLM providers which can add up to a lot of time waiting for responses. This can be especially frustrating when alternative ways to complete a task exist in an app or website.

As the founder of Superhuman, Rahul Vohra, said in [Lenny’s Newsletter](https://www.lennysnewsletter.com/p/counterintuitive-advice-for-building):

> The thing we’ve learned: speed wins. Take, for example, Instant Reply or Auto Summarize. Gmail and Outlook have similar features, but you have to generate the replies and summaries on demand—and then wait for them to finish generating. In Superhuman, we pre-compute them so they are always instantaneous. That simple difference is a massive lever on the user experience.

Some ways to improve this:

- **Being aware of the model benchmarks and new model releases.** When a better, faster model releases, test it out and use it. This can often have the biggest boost to both functionality and speed.

- **Mixing fast and slow models depending on the task.** For example, we use fast models (like `gpt-4.1-mini` and `gpt-4.1-nano`) for title generation,session replay filters, survey summarization, and insight search. We use slow models (like `gpt-4.1`) for schema generation, conversation handling, and context management.

- **Async processing.** Complex AI operations, such as session summaries and pattern extraction, run asynchronously via Temporal workflows to avoid blocking user interactions. These are then cached in Redis to support retries without recomputation.

### 3. Monitor that they are actually useful

Remember I said one of the biggest risks of adding AI is having a negative impact? Once you’ve added AI, it’s time to look at its impact on the metrics you care about. 

Just because it is ✨ AI ✨ doesn’t mean it should be judged less strictly than any other addition. Like any other addition, there are plenty of ways to do this:

- A/B test AI-powered features vs the normal experience as well as different prompts, contexts, workflows, and more.

- Check AI usage rates for different types of customers (free users vs enterprise) and roles (product vs sales). For example, we found product managers and marketers were using Max more often than our ICP (product engineers), which led us to reconsider our AI roadmap.

- Let users rate AI responses as good or bad. When users rate responses poorly, ask them for more details. Use this to tweak context, prompts, and workflows.

- Compare AI vs non-AI usage, activation, and retention metrics. This helps you understand where AI ideally fits into your product and user lifecycle.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_11_at_09_56_34_2x_592bc995a2.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_11_at_09_56_06_2x_331d746db2.png"
  alt="AI feature usage metrics screenshot"
  classes="rounded"
/>

Optimizing your AI-powered features doesn’t work without each of the previous parts of this guide. Ultimately, you want to create real user value, not shiny tech demos or bolt-ons. This requires choosing the right features to build and building them in the right way, which we hope, if you’ve actually read this guide, you’ll be equipped to do. Only then does optimizing them really matter.