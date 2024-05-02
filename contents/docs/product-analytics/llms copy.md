**Answers to frequently asked questions**

Don’t forget to [check the docs](/docs/llm-analytics) for more info. If you have a question which isn’t answered here, please post in the forum for community support!

**How do I capture insights from my LLM?**

There are two way to do this:

1. Add [PostHog event capturing](/docs/product-analytics/capture-events) in your code. We have tutorials for [OpenAI](/tutorials/chatgpt-analytics), [Anthropic](/tutorials/anthropic-analytics), and [Cohere](/tutorials/cohere-analytics) that show you how to do this.
2. Set up [Langfuse](https://langfuse.com/) or [Helicone](https://www.helicone.ai/) integrations to do this automatically for you.

**Which metrics should I track?**

We've a post with more details on the [best product metrics to track for LLM apps](/product-engineers/llm-product-metrics), but a high level here's what you should track:

1. Cost-related metrics, like cost per model and cost per user.
2. Debugging-related metrics, like model generation latency, error rate, and timeouts.
3. Feature-related metrics, like number of interactions per user, retention, and user feedback score.=

**I'm using an LLM engineering platform but you don't have an integration for it.**

Let us know which one you're using and we'll work on adding an integration!