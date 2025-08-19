---
title: Implementing AI features
sidebar: Handbook
showTitle: true
---

This guide provides technical guidance for implementing AI features at PostHog. For information on working with the Max AI team, see [Working with Max AI](/handbook/engineering/working-with-max-ai).

## We use LLMs to solve real problems

Use AI features to solve actual customer problems, or problems we experience ourselves. The shiny tech brings a little more temptation to build toy demos – keep that energy, but focus it on solving concrete customer needs.

LLMs are great for a few types of needs:

- Extracting information from major amounts of text (summarization, sentiment analysis, and such)
- Writing code and SQL
- Brainstorming and generic guidance (the models are trained on whole libraries of raw knowledge)
- Generally executing tasks based on natural language (using tool calling)

LLMs still struggle with: 1. coming up with original and novel ideas, 2. reasoning through complex problems (though reasoning is improved with models like R1 or o3), 3. making decisions.

## We're building a platform

PostHog's value is in the all-in-one approach, and this goes for our AI features as well, where our all-in-one approach is embodied by Max. Build your product's AI features as Max tools (see [README](https://github.com/posthog/posthog/tree/master/ee/hogai)) – this way, Max increasingly covers more ground across PostHog, and your users get a well-known pattern of getting things done.

The other benefit of building on top of Max is your development experience: you shouldn't have to spend time figuring out how to implement response streaming, or how to get AI processing consent from users. This is all handled when you use the existing platform.

## We use trusted frontier tech

We build with the latest models from OpenAI and Anthropic, with Perplexity used for web search in some places. These providers are consistently at the forefront of progress, and we have data processing agreements processing in place with them, regulating their processing of our customers' data.

> **Should we be fine-tuning models?**  
> Few-shot learning (i.e. a few examples of input and expected output in the prompt) is typically similarly effective as time-consuming fine-tuning. For reasoning models like OpenAI o3 or Claude Sonnet 4, even few-short learning is typically avoided, as it's better to let the model reason itself. Therefore, we rarely recommend fine-tuning.

## We eat our hog food

This goes for everything at PostHog – but in AI features specifically, we use [our own LLM analytics product](/docs/llm-analytics):

- With OpenAI and Anthropic libraries in Python, use LLM observability wrappers in `posthoganalytics.ai.openai` & `posthoganalytics.ai.anthropic`
- With LangChain, use the LLM observability callback handler in `posthoganalytics.ai.langchain.callbacks`

This will give you and the organization full visibility into your feature – see the [LLM analytics dashboard](https://us.posthog.com/project/2/llm-observability). Feel free to leave feedback with [#team-llm-observability](https://posthog.slack.com/archives/C087XQ7K9K7).
