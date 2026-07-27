---
title: Customer industry segments
sidebar: Handbook
showTitle: true
---

We have thousands of customers in PostHog, many of which are in similar industries. As CSMs having an understanding of our customers' industries can help us better be an expert on how PostHog works best for their specific use cases. This page serves as a resource for us to be able to collect and share industry specific vocabulary, important metrics, PostHog best practices, etc. that allow us to quickly ramp up on the industry to better engage with those customers.

## Industry segment list

These segments can change as our customer data evolves, but the following serve as a starting point:

- [AI and data](#ai-and-data-description)
- Consumer software
- Developer tools
- [E-commerce](#e-commerce-description)
- Education
- Enterprise software
- Finance
- Healthcare
- Logistics
- Marketing

### Template for industry playbook

Eventually each industry listed above will be linked to its own playbook with details its specifics. The following is a template that can be used to create the playbook:

```
### Description (general overview of what the industry is and the businesses it consists of)
### What they care about (i.e. what is most important to their business success)
### Industry terminology
### Common software used
### Important business metrics and data
    #### Metrics
    #### Data (event taxonomy, person profiles, groups)
### PostHog products they should be using
    #### Product
    	##### Best practices
    	##### Common challenges
    	##### Cross product use cases
```

## Industry segment

Industry segment is a customer property that we use internally at PostHog.

<details>

<summary>AI and data playbook</summary>

### AI and data description

Companies that exist in different parts of the AI value chain. There is significant potential to develop further playbooks for each sub-segment.

### Sub-segments

| Sub-segment             | Examples                           | Description                                        |
|:------------------------|:-----------------------------------|:---------------------------------------------------|
| Hyperscalers            | AWS, GCP, Oracle, Azure            | AI services in the cloud                           |
| Frontier model labs     | OpenAI, Anthropic, Cohere, Mistral | Foundation models with proprietary architectures   |
| Generative              | ElevenLabs, Runware, Runway, Luma  | Product suites around output                       |
| Inference               | Replicate, fal\.ai, Together\.ai     | Host / serve other models, making them easy to run |
| AI-native applications  | Cursor, Perplexity                 | End-user tools where experience is driven by AI    |
| Data / machine learning | Databricks, Hugging Face           | Orchestration, system management                   |

### What they care about

They share a developer-centric focus on adoption and retention. The higher-order sub-segments (hyperscalers, frontier model labs, inference) care about competitive parity and platform stickiness. Generative and AI-native application segments care about feature adoption, generation metrics, unit economics, and retention.

Sub-segments differ on what they track as output. Generative customers measure the artifact itself, like whether a change increased how often users download an image after generating it. AI-native application customers measure task completion rates and time saved.

### Industry terminology

**Observability** – Monitoring model performance, token use, latency, unit economics, and hallucination rates in production. Most relevant to teams shipping features that interact directly with users.

**Feature store** – Centralized system for serving, storing, and managing machine learning features that are used in training and inference. These are more commonly found with mature data organizations.

**Tokens** – Units of processing/billing for LLMs. Can vary based on segment. Other variations would involve count, prediction, job, credit.

**RAG (Retrieval-Augmented Generation)** – An architecture pattern where an LLM pulls from external knowledge sources before generating a response. For segmentation, RAG-based products have unique infrastructure needs like accuracy of retrieval and context window usage.

**Benchmark** – A standardized test set for comparing model capabilities.

**Latency** – Time between sending a request and receiving a response.

**Throughput** – Number of requests/tokens processed per unit of time.

**NLP (Natural Language Processing)** – Branch of AI that enables computers to understand and generate human language.

**Embedding** – Representation of data (text, image, user actions) as vectors used for recommendation, search, and classification.

### Common software used

_Note: This list is incomplete, ongoing, and has overlap. It is meant to serve as a directional guide versus ground truth._

- Observability: LiteLLM, Helicone, Datadog, Langfuse, Splunk
- RAG: LangChain, Cohere, Haystack, Chroma
- Feature stores: Tecton, Databricks, SageMaker, Redis
- Data warehouse: Snowflake, Databricks, Firebolt, BigQuery
- Unit economics: FinOps tooling, Helicone, LiteLLM, OpenRouter
- Data pipeline: Atlan, Alation, dbt, FiveTran, Apache Airflow, Stitch

You should make yourself familiar with how each of these products stacks together in a customer's value chain. It's a "current events" practice that will allow you maximum ability to speak to how customers can turn a disparate system of tools into one AI and data centric Howitzer.

### Important business metrics and data

#### Metrics

|  Metric | Measurement  | Business context  |
|---|---|---|
|  Cost per action |  Infrastructure cost to serve a particular user action (cost per image generated, cost per second of video generated, cost per query, API call) | User interaction drives margin  |
|Feature margin|Revenue against how much it costs to run the feature  |  Can be complex if infrastructure does not support granular definition of feature |

#### Data

##### Event taxonomy

AI and data customers should be running AI Observability. It sets the taxonomy: with the SDK you get structured generation, trace, and cost events out of the box. Without it, taxonomy falls back to whatever the customer wires up by hand. Those structured events are also what PostHog's agentic products read, so clean instrumentation is the prerequisite for any self-driving analysis on top.

Without the AI Observability SDK:
- Autocaptured clicks and pageviews on AI features (button presses, route changes)
- Custom events the customer wired up by hand, like `chat_message_sent` or `prompt_submitted`
- Whatever properties a customer should choose to attach

With the AI Observability SDK:
- `$ai_generation` – one row per LLM call with model, input/output tokens, cost, latency, and provider
- `$ai_trace` and `$ai_span` – parent/child structure for multi-step agents and tool use
- `$ai_embedding`, `$ai_metric`, `$ai_feedback` – vector ops, eval scores, thumbs up/down

##### Person profiles

When companies look at their event data in this segment, they're trying to answer "who did this?" and "who are the power users?". Tie every generation to a person profile, and give that profile a defined `user_role` (`admin`, for example) alongside aggregations like `total_api_calls` or `total_tokens_used`. Without it, you can see that tokens are being burned but not who is burning them.

### PostHog products they should be using

Lead with AI Observability. It's the one product built for how these customers make money: it captures every model call as a structured event with cost, latency, tokens, and provider. That event stream is the foundation everything else builds on, from cost analysis to experimentation to the self-driving loop. Get the customer onto it first, then layer the rest.

#### AI Observability

##### Best practices

- Instrument model calls server-side with the AI Observability SDK, where the model actually runs, and identify on the same authenticated request so every `$ai_generation` ties to a person.
- Attach model, provider, and feature (or prompt version) as properties on the generation, so cost and latency can be sliced by what the customer ships.
- Capture cost on the generation event itself. Don't reconstruct it later from token counts.
- Set person properties from the server-side source of truth, not client state. Use `$set_once` for immutable values (signup date, acquisition channel) and `$set` for mutable ones (plan tier, role, last active feature).

##### Common challenges

- High event volume meets cost sensitivity. LLM apps are chatty and margin-conscious, so ingestion cost gets scrutinized. Lean on sampling, ingestion filters, and dropping high-cardinality properties they'll never query. Don't re-send person properties (`$set`) on every high-volume event, since that inflates ingestion for no analytical gain.
- The events that matter fire server-side. Client-only instrumentation misses the actual model calls, so identify on each authenticated server request.
- Environment density. Staging, eval, and simulation traffic pollute production data. Split by project or enforce a strict environment property.

##### Cross-product use cases

- **AI Observability** – join `$ai_generation` cost back to person properties for cost-per-segment, or to identify which plan or role is burning the most tokens.
- **Feature Flags and Experiments** – gate new models behind flags, run A/B tests on prompt changes, hold out high-value users from risky rollouts.
- **Surveys** – trigger feedback prompts after a generation, collect CSAT on AI features, run PMF surveys against power users.
- **Session Replay** – filter to recordings of users hitting prompt failures or specific `$ai_generation` errors.
  - **Replay Vision** (closed beta) – run scanners over those recordings to auto-flag dead ends and prompt failures, then query the results back as PostHog events.
- **Error Tracking** – group exceptions by plan, model, or role to see which segment hits a bug.
- **Data Warehouse** – sync events for joins against billing or model cost tables, then pipe insights back.
- **Self-driving** – point the self-driving loop at these signals: agents investigate the reports, open pull requests for fixes, and measure whether they worked.

</details>

<details>

<summary>E-commerce playbook</summary>

### E-commerce description

Online retail businesses including direct-to-consumer brands, marketplace platforms, and omnichannel retailers selling physical or digital goods through web and mobile.

### What they care about

- Conversion rate optimization across the entire funnel
- Cart abandonment reduction
- Customer acquisition cost (CAC) vs lifetime value (LTV) balance
- Site performance impact on sales
- Mobile vs desktop performance disparities
- Seasonal traffic and sales patterns
- Inventory turnover and demand forecasting
- Return rates and reasons
- Cross-sell/upsell effectiveness

### Industry terminology

- **AOV (Average Order Value)**: The average dollar amount spent each time a customer places an order.
- **PDP (Product Detail Page) / PLP (Product Listing Page)**: PDP is the individual product page with detailed information, images, and add-to-cart button. PLP is the category or search results page showing multiple products in a grid or list format.
- **SKU (Stock Keeping Unit)**: A unique identifier code assigned to each distinct product and its variants (size, color, etc.) for inventory tracking.
- **Drop-off rate / Abandonment rate**: The percentage of users who leave a process (like checkout) without completing it. Cart abandonment specifically tracks users who add items but don't purchase.
- **Retargeting / Remarketing**: Advertising strategy that shows ads to people who previously visited the company's website or app, aimed at bringing them back to complete a purchase.
- **Attribution window**: The time period after a user clicks or views an ad during which a conversion (purchase) will still be credited to that ad. Common windows are 1, 7, or 30 days.
- **ROAS (Return on Ad Spend)**: Metric measuring ad campaign effectiveness by dividing revenue generated by the cost of ads.

### Common software used

- **Platforms:** Shopify, WooCommerce, BigCommerce
- **Analytics:** Google Analytics 4, Contentsquare, Hotjar
- **A/B Testing:** Optimizely, VWO, Shoplift

### Important business metrics and data

#### Metrics

- **Conversion funnel:** Homepage > Category/PLP > PDP > Add to Cart > Checkout Started > Purchase Complete
- **Key rates:** Browse-to-buy rate, PLP>PDP rate, PDP>Cart rate, Cart>Purchase rate
- **Revenue metrics:** Revenue per visitor (RPV), items per order, repeat purchase rate
- **Engagement:** Pages per session, bounce rate by landing page, search-to-purchase rate
- **Performance:** Page load time correlation with conversion

#### Data

##### Event taxonomy

- **Core events:** `product_viewed`, `product_added_to_cart`, `checkout_started`, `order_completed`
- [**Detailed spec for Ecommerce event taxonomy**](/docs/data/event-spec/ecommerce-events)
- **Key event properties:** product_id, product_name, price, currency, quantity, category, brand, variant (size/color), cart_value

##### Person profiles

- Often anonymous until purchase or email capture
- Limited utility for one-time purchasers but valuable for subscription/replenishment businesses
- **Key properties:** `customer_type` (i.e. new/returning), `total_orders`, `total_spent`, `last_order_date`, `preferred_product_categories`

### PostHog products they should be using

#### Product Analytics

##### Best practices

- Build conversion funnels for each major product category
- Create cohorts based on acquisition channel to compare quality
- Track micro-conversions (newsletter signup, wishlist adds)
- Monitor search query performance and null results

##### Common challenges

- Shopify and other ecomm website builders can make installing PostHog properly difficult and cause unique bugs related to plug-ins, etc.
- Cookie/privacy restrictions affecting attribution

##### Cross-product use cases

- Use Session Replay to identify issues > Create experiment to test fix > Monitor with analytics
- Feature flag for seasonal promotions > Track performance in analytics > Watch customer interactions via replay
- Identify drop-off points in funnels > Watch those specific sessions > Run Experiments on improvements

</details>
