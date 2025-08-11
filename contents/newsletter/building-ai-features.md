---
title: The ultimate guide to building AI-powered features
date: 2025-08-11
author:
 - ian-vanagas
tags:
 - feature flags
---

AI feels like a gold rush. Everyone’s staking claims and panning for quick wins. Few are building mines that create long-term value. Shiny demos are everywhere, but many are fool’s gold: bolted-on, rarely used, and quick to tarnish.

We’ve all experienced poorly built AI-powered features. These can have a huge negative impact on user experience, hurting a company’s reputation and slowing adoption of future features.

How do you avoid this fate? Choose the right AI-powered features to build, build them in the right way, and then continually work to improve them. This guide aims to help you do all three of these.

## Choosing how and where to add AI in your product

Assuming you already have a product, one of the biggest risks of adding AI to your product is making it worse. AI-powered experiences can often be worse than their alternatives. 

This happens because teams build the wrong features in the wrong places. Avoiding this requires the following three steps:

### 1. Learn the patterns AI is good at

Just because AI companies seem to be reinventing the wheel doesn’t mean you need to too. 

There are plenty of AI patterns a bunch of smart, rich people have already figured out which you can copy to your product. These have the advantage of being UX patterns that people are familiar with and also being functionality AI is actually good at.

First is the classic “chat with your docs/data/PDF.” AI is great at search and summarization and can use this to build reports and recommendations. Intercom’s Fin or Mintlify’s docs chat are examples of this.

![Chat with your docs](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_11_at_12_20_38_2x_60d5ceaccf.png)

Second are generators of various kinds. Titles, code, documents, SQL, images, and filters. Of course, AI app builders like Lovable or [Bolt.new](http://Bolt.new) have been the biggest beneficiaries of this, but all sorts of companies from Rippling to Figma to Notion have added generation capacities too.

![Generators](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_11_at_12_21_06_2x_994a085f7e.png)

Third, and finally, is tool use. AI can use well-defined tools. This is what MCP servers are all about. Companies like Zapier, Atlassian, Asana, and many more have used this to automate and improve workflows.

![Tool users](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_11_at_12_21_35_2x_82b8a095db.png)

Knowing the common AI patterns helps you identify where you can use them in your product.

### 2. Identify problems that maybe AI could solve

> Ask not what you can do with AI, but what AI can do for you. - JFK (I think) 

With the patterns in mind, it’s time to go through your product and figure out the jobs to be done that AI could potentially do. Some examples of how to find these:

- It’s a single task that takes more than 30 seconds to do like filling a long form, manually entering data, or installation.

- Users need a language or interface they don’t understand, such as a complex UI, SQL queries, or building an app.

- Users do it more than 20 times like writing descriptions, summaries, or creating an entry. As Stephen Whitworth of incident.io said in [Lenny’s Newsletter](lennysnewsletter.com/p/counterintuitive-advice-for-building):

> Look less at ‘what cool new things could AI do’ but more at ‘what’s the thing our users do 100 times a day that AI could make better.’ An example for us is writing a summary for an incident. It turns out that users vastly, vastly prefer automatically generated summaries to writing these themselves; 75% of incident summaries are now AI-generated.

### 3. Make sure that work is specific and valuable

Now that you have some patterns and problems, you need to narrow them down to the ones that are both specific and valuable. 

![Specific and valuable](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_08_at_16_39_26_2x_d30ab8c160.png)

Two common traps here are:

1. **Using an existing pattern on a problem that isn’t valuable.** For example, if your product is early, you probably don’t need a “chat to your docs” feature. It might even be a negative as it could hide core usability issues.

2. **Trying to solve too large a problem with AI.** Be honest with yourself. If you’re trying to have the AI one-shot making you a billion dollars, you are being unrealistic. It’s better to solve a narrow problem first before expanding outward. If you’re stuck, try enhancing something that already exists. 

## Implementing your AI-powered feature the right way

Now that you have an idea of what you want to build, you need to make sure it actually works. Here are some core bits to focus on getting right.

### 1. Context and state

Everyone can make a call to the OpenAI API. What your app has that’s unique is its context. This can include data like what a user is trying to do, who is doing it, what their account status is, where they are in the app, and what the app’s data schema looks like. 

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

We find doing this, combined with optimizing our model choice, is  more effective and useful than fine tuning a model would be. 

### 2. Query planning and conditional routing

Because there is so much AI can do, it needs guidance. It will run off and do all sorts of crazy things if you let it. This means orchestrating and chaining together multiple steps like query planning → data retrieval → visualization.

Beyond state management, this requires:

- AI to know what tools and data it has at its disposal.
- Being able to select the correct tools and data based on the intended task users want to complete.
- Making sure those tools, like query execution and formatting actually work.

In PostHog, at the highest level, this looks like this:

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

It then gets more specific in each of the tools, each of which have their own conditions to route through. 

### 3. Plan for failure by adding guardrails and error handling

Ideally all the structure you’ve built up to this point prevents failure. You basically want to give the AI guardrails because they *will* inevitably smash into them. 

Anything an AI can hallucinate, it will hallucinate. To prevent this, there is some data we set directly like API keys in our installation envoy. 

![Can't hallucinate API keys](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_11_at_12_22_26_2x_b75027dce9.png)

You can’t hallucinate API keys if you set them yourself

Another guardrail you might want to put in place is one for people. For example, when people see an empty text box, they get scared and forget everything. You can provide suggestions of ways people can use your AI-powered features to get the most out of them. 

![Suggestions](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_08_at_17_52_21_2x_514e35df81.png)

Beyond hallucination issues, sometimes your workflows just break. You need to be able to handle these gracefully with retries and rate limiting. For real pros, you can also set up observability, error tracking, and feature flags (conveniently we provide all three).

## Improving your AI features after you’ve built them

We found from experience that building AI-powered features requires a lot more maintenance and continual improvement, likely because of the continual and rapid improvements in the field of AI as well as the unpredictability of AI. 

### 1. Help your team build AI-powered features

Building AI-powered features shouldn’t be the responsibility of some “AI guy” on your team. AI should be deeply integrated into your product and this means you need the expertise of the people talking to users and building something for them.

There are a few ways you can encourage your team to do this:

- Build primitives and make your AI functionality composable so teams don’t need to re-invent prompts, streaming, consent, evals, and observability. This helps teams focus on unique and value-added AI functionality.

- Have a consistent UX pattern across your app. For us, that’s Max. This prevents death by 1000 AI widgets.

- Get your AI experts to embed in teams temporarily to help those teams build AI functionality. This helps AI-powered features get built faster while distributing AI knowledge throughout the organization.

### 2. Make them faster

One of the big challenges with AI-powered features, especially complex ones, is that they are slow. A workflow can often mean multiple calls to LLM providers which can add up to a lot of time waiting for responses. This can be especially frustrating when alternative ways to complete a task exist in an app or website.

As Rahul Vohra said in [Lenny’s Newsletter](https://www.lennysnewsletter.com/p/counterintuitive-advice-for-building):

> The thing we’ve learned: speed wins. Take, for example, Instant Reply or Auto Summarize. Gmail and Outlook have similar features, but you have to generate the replies and summaries on demand—and then wait for them to finish generating. In Superhuman, we pre-compute them so they are always instantaneous. That simple difference is a massive lever on the user experience.

Some ways to improve this 

- **Being aware of the model benchmarks and new model releases.** When a better, faster model releases, test it out and use it. This can often have the biggest boost to both functionality and speed.

- **Mixing fast and slow models depending on the task.** For example, we use fast models (like `gpt-4.1-mini`) for session replay filters, survey summarization, and insight search. We use slow models (like `gpt-4.1`) for schema generation, conversation handling, and context management.

- **Async processing.** Complex AI operations, such as session summaries and pattern extraction, run asynchronously via Temporal workflows to avoid blocking user interactions. These are then cached in Redis to support retries without recomputation.

### 3. Monitor that they are actually useful

Remember I said one of the biggest risks of adding AI is that it has a negative impact? Once you’ve added AI, it’s time to look at its impact on the metrics you care about. 

Just because it is ✨ AI ✨ doesn’t mean it should be judged less strictly than any other addition. Like any other addition, there are plenty of ways to do this:

- A/B test AI-powered features vs the normal experience as well as different prompts, contexts, workflows, and more.

- Check AI usage rates for different types of customers (free users vs enterprise) and roles (product vs sales). For example, our ICP is product engineers, but we found product managers and marketers were using Max more often, which led us to reconsider our AI roadmap.

- Let users rate AI responses as good or bad. When users rate responses poorly, ask them for more details.

- Compare AI vs non-AI usage, activation, and retention metrics. This helps you understand where AI ideally fits into your product and user lifecycle.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_11_at_09_56_34_2x_592bc995a2.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_11_at_09_56_06_2x_331d746db2.png"
  alt="AI feature usage metrics screenshot"
  classes="rounded"
/>

Optimizing your AI-powered features doesn’t work without each of the previous parts of this guide. Ultimately, you want to create real user value, not shiny tech demos or bolt-ons. This requires choosing the right features to build and building them in the right way, which we hope, if you’ve actually read this guide, you’ll be equipped to do. Only then does optimizing them really matter.