# Using AI tools at PostHog

AI has changed the way people work and we are no exception. Augmenting your product development, support and debugging workflows with AI tools can help you ship faster, solve customer issues better and scale yourself to solve a wider range of problems.

Unlike traditional tooling however, AI tools come with data processing risks to consider, as these tools generally operate in a 3rd party cloud environment (Anthropic, OpenAI, etc.) and not just on your local machine or PostHog's private infrastructure.

Not all AI usage is equal. The guidance below is split into three categories based on the type of data involved and the relationship to our product.

---

## 1. Product development with general data

**What this covers:** Using AI tools to write code, generate tests, brainstorm architecture, draft documentation, review PRs, refactor, or any other development task that doesn't involve real customer data.

**This is encouraged.** Use whatever tools make you productive — Claude Code, Cursor, Copilot, ChatGPT, etc. When you're working with your own code, PostHog's open source codebase, synthetic/test data, or general technical questions, there are no special restrictions.

**Guidelines:**
- Don't paste API keys, secrets, credentials, or internal infrastructure details into AI tools
- Be mindful of what context your tool is sending automatically (e.g. IDE extensions that send surrounding files) — make sure it's not pulling in `.env` files or similar
- You can try different providers and models as long as you are not connecting them to any PostHog or PostHog customer data sources (e.g. PostHog API, Clickhouse etc.). For those cases, see below.

## 2. Debugging, support, and internal tooling

**What this covers:** Using AI tools to help debug customer issues, analyse support queries, investigate errors, or any workflow where you might encounter or use real data about our customers (eg customer organization names, user emails, etc) or real data about our customers' customers/users (eg for the latter, event data, user properties, session recordings, error traces, PII, etc.).

**An important distinction:** There is a difference between *our* customer data and *our customers' customers'* data. Data about our customers (organization names, billing info, user emails of people who signed up to PostHog, etc.) is fine to share with our approved AI providers when the task is clear and necessary — e.g. debugging an issue, handling a support request, or improving our product for them. However, data belonging to our customers' customers (the end users of products built on PostHog — their event data, user properties, session recordings, PII, etc.) should **never** be sent to these tools. We don't have a relationship with those end users and they have no expectation that their data would be processed by our AI vendors. For those cases, see section 3 where we act as a subprocessor.

**Guidelines:**

- **Share only what is necessary to get the job done:** Exclude anything that isn't relevant or useful to provide a good result.
- **Only use LLMs that guarantee privacy & non-training:** Examples include accounts tied to our enterprise subscriptions for OpenAI and Anthropic, or self-hosted models on our infrastructure. Do not use personal accounts for this purpose.
- **Use MCP integrations thoughtfully.** Connecting tools like Grafana or our Logs API to your AI assistant is powerful but means the model can now pull real production data. Be conscious of what queries you're running through it and be certain that the model is coming from a vendor as mentioned in the point above.

**The key principle: data minimisation.** Don't send customer data, in the vast majority of cases it's not needed to get the job done. If you need to send customer data, make sure it's only to a vendor that doesn't train on model inputs or that we host; chat with #legal about your particular use-case if you are unsure.

## 3. Product features that use AI (subprocessor relationship)

**What this covers:** Building PostHog product features where customer data is sent to a third-party LLM as part of the feature's core functionality — e.g. AI-powered error analysis, natural language querying, AI summaries of session recordings, etc.

**This is where formal subprocessor obligations apply.** When an LLM processes customer data as a necessary part of delivering the PostHog product, the LLM provider becomes a subprocessor under our Data Processing Agreements with customers.

**Requirements:**
- The LLM provider **must be listed as a subprocessor** in our DPA before the feature ships to customers (we already have Anthropic and OpenAI listed for example)
- If you are considering an additional provider, their data processing terms **must be reviewed by legal** — specifically around data retention, training exclusions, and processing locations
- **Customers must be able to understand** that the feature uses a third-party AI provider (this doesn't necessarily mean an opt-in modal on every click, but it should be clear and documented)
- **Data sent to the LLM should be minimized** to what the feature actually needs — don't send an entire event stream if the feature only needs a summary
- Any new LLM provider integration for product features should go through a review with legal before launch

**If you're building a feature that sends customer data to an LLM as part of how the feature works, talk to legal early.** It's much easier to get the data handling right from the start than to retrofit it.