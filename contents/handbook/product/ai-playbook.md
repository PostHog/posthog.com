---
title: In-product AI playbook
sidebar: Handbook
showTitle: true
---

Throughout the 2020s, LLM-enabled products will eat those which stay in the past – just see Cursor vs. JetBrains. LLM-based PostHog features already are advancing [our mission](/handbook/why-does-posthog-exist), but this journey has just begun. New use cases are becoming viable as models improve in reliability and cost, and YC _will_ fund every AI-oriented founder with the ambition to overtake us. We can't be any less ambitious.

This doc describes how PostHog goes on to thrive, instead of being eaten. You're not looking at a high-level exec strategy. You're looking at the **in-product AI playbook** for every team at PostHog.

There are two angles to our in-product AI:

## 1. PostHog Max – the world's first artificial product manager

Product-minded developers want to build the right thing. They already can _build_, and AI dev tooling – like Cursor's agent – helps build faster.

PostHog's agent helps build _the right thing_. Named Max, this is our core AI product. It's [deep research](https://openai.com/index/introducing-deep-research/) for product questions, with knowledge of data and tools living in PostHog.

Max is owned by the [AI Product Manager team](/teams/ai-product-manager) – see its page for this product's roadmap.

## 2. PostHog Intelligence - acceleration throughout

Max, the agentic assistant over chat, is not the be-all and end-all. AI features can be found embedded throughout PostHog products in targeted ways. We call this PostHog Intelligence.

The principles behind PostHog Intelligence are:

### Everyone can build AI features

While the AI PM team owns Max as the one LLM-powered _product_, **every product team has the mandate to solve problems with AI**.

As you build, just keep the AI PM team in the loop, so that they can offer expertise and later integrate your work into Max. (Max becomes more capable with every new skill we give it.)

### We use LLMs to solve real problems

Use AI features to solve actual customer problems, or problems we experience ourselves. The shiny tech brings a little more temptation to build toy demos – keep that energy, but focus it on solving concrete customer needs.

LLMs are great for a few types of needs:

- Extracting information from major amounts of text (summarization, sentiment analysis, and such)
- Writing code (especially snippets)
- Brainstorming and general guidance (the models are trained on whole libraries of raw knowledge)
- Executing tasks based on natural language (typically using tool calling)
- Translation (both between human and programming languages)

LLMs still struggle with: 1. coming up with original and novel ideas, 2. reasoning through complex problems (though reasoning is improved with models like R1 or o3).

### We use whatever tech that gets the job done

OpenAI's offerings are typically at the frontier of progress, and scale well. There is no OpenAI monopoly though. Feel free to build with Anthropic (Claude), Perplexity (Sonar), or whatever models and tools that fit the task best. Use the latest releases, as the field moves fast.

> **Should we be fine-tuning models?**  
> According to research, few-shot learning (i.e. a few examples of input and expected output in the prompt) is typically similarly effective as time-consuming fine-tuning. For reasoning models like DeepSeek R1 or OpenAI o3, even few-short learning is typically avoided, as it's better to let the model reason itself. Therefore, we rarely recommend fine-tuning.

### We eat our dog food

This goes for everything at PostHog, but in AI features specifically, we use [our own LLM observability product](https://posthog.com/docs/ai-engineering/observability):

- With OpenAI and Anthropic libraries in Python, use LLM observability wrappers in `posthoganalytics.ai.openai` & `posthoganalytics.ai.anthropic`
- With LangChain, use the LLM observability callback handler in `posthoganalytics.ai.langchain.callbacks`

This will give you and the organization full visibility into your feature – see the [LLM observability dashboard](https://us.posthog.com/project/2/llm-observability). Feel free to leave feedback with [#team-llm-observability](https://posthog.slack.com/archives/C087XQ7K9K7).

### We ask for third-party processing consent

Query results can contain identifying data of our customers' users, and some of our customers rely on that data firmly staying in PostHog. Thus, AI-based data analysis features _must_ be gated on the organization `is_ai_data_processing_approved` setting. With that setting falsy, such features must state a `disabledReason` of "Please accept AI-based data analysis".

Use the `<AIConsentPopoverWrapper ...>` component to smoothly integrate this consent into your flow. Look for examples in the codebase.

### Our AI gets to be quirky

It's okay to show a little personality in our AI features. Just like Max, who is instructed to be quirky in line with our brand, PostHog Intelligence can be a little more whimsical than regular UX.
