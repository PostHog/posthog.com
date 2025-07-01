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
- Writing code (especially snippets)
- Brainstorming and general guidance (the models are trained on whole libraries of raw knowledge)
- Executing tasks based on natural language (typically using tool calling)
- Translation (both between human and programming languages)

LLMs still struggle with: 1. coming up with original and novel ideas, 2. reasoning through complex problems (though reasoning is improved with models like R1 or o3), 3. making decisions.

## We use whatever tech that gets the job done

OpenAI's offerings are typically at the frontier of progress, and scale well. There is no OpenAI monopoly though. Feel free to build with Anthropic (Claude), Perplexity (Sonar), or whatever models and tools that fit the task best. Use the latest releases, as the field moves fast.

> **Should we be fine-tuning models?**  
> According to our experience, few-shot learning (i.e. a few examples of input and expected output in the prompt) is typically similarly effective as time-consuming fine-tuning. For reasoning models like DeepSeek R1 or OpenAI o3, even few-short learning is typically avoided, as it's better to let the model reason itself. Therefore, we rarely recommend fine-tuning.

## We eat our hog food

This goes for everything at PostHog, but in AI features specifically, we use [our own LLM observability product](/docs/ai-engineering/observability):

- With OpenAI and Anthropic libraries in Python, use LLM observability wrappers in `posthoganalytics.ai.openai` & `posthoganalytics.ai.anthropic`
- With LangChain, use the LLM observability callback handler in `posthoganalytics.ai.langchain.callbacks`

This will give you and the organization full visibility into your feature – see the [LLM observability dashboard](https://us.posthog.com/project/2/llm-observability). Feel free to leave feedback with [#team-llm-observability](https://posthog.slack.com/archives/C087XQ7K9K7).

## We ask for third-party processing consent

Query results can contain identifying data of our customers' users, and some of our customers rely on that data firmly staying in PostHog. Thus, AI-based data analysis features _must_ be gated on the organization `is_ai_data_processing_approved` setting. With that setting falsy, such features must state a `disabledReason` of "Please accept AI-based data analysis".

Use the `<AIConsentPopoverWrapper ...>` component to smoothly integrate this consent into your flow. Look for examples in the codebase.

## Our AI gets to be quirky

It's okay to show a little personality in our AI features. Just like Max, who is instructed to be quirky in line with our brand, PostHog Intelligence can be a little more whimsical than regular UX.
