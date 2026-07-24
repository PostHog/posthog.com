---
title: Customer industry segments
sidebar: Handbook
showTitle: true
---

We have thousands of customers in PostHog, many of which are in similar industries. As CSMs having an understanding of our customers' industries can help us better be an expert on how PostHog works best for their specific use cases. This page serves as a resource for us to be able to collect and share industry specific vocabulary, important metrics, PostHog best practices, etc. that allow us to quickly ramp up on the industry to better engage with those customers.

## Industry segment list

These segments can change as our customer data evolves, but the following serve as a starting point:

- [AI and data](#AI-and-data-description)
- Consumer software
- Developer tools
- [E-commerce](#ecommerce-description)
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

## Segments in Vitally

Industry segment is a custom account trait in Vitally. You can find and edit your customer's industry on the side panel of their account page as a pinned trait. You can add a value or edit current value directly on the account page or add the industry segment as a column to any custom tables you have in Vitally.

<details>

<summary>AI and data playbook</summary>

### AI and data description

Companies that exist in different parts of the AI value chain. There is significant potential to develop further playbooks for each sub-segment.

### Sub-segments

| Sub-Segment             | Examples                           | Description                                        |
|:------------------------|:-----------------------------------|:---------------------------------------------------|
| Hyperscalers            | AWS, GCP, Oracle, Azure            | AI Services in the cloud                           |
| Frontier Model Labs     | OpenAI, Anthropic, Cohere, Mistral | Foundation models with proprietary architectures   |
| Generative              | ElevenLabs, Runware, Runway, Luma  | Product suites around output                       |
| Inference               | Replicate, fal\.ai, Together\.ai     | Host / serve other models, making them easy to run |
| AI-Native Applications  | Cursor, Perplexity                 | End-user tools where experience is driven by AI    |
| Data / Machine Learning | Databricks, Hugging Face           | Orchestration, system management                   |

### What they care about

Commonly, they share developer-centric focus on adoption and retention. The higher order sub-segments (hyperscalers, frontier model labs, inference) will primarily focus on competitive parity and platform stickiness. Generative and AI-Native Application segments may primarily focus on feature adoption rates, generation metrics, unit economics, and retention. They'll also differ by output: whereas Generative segment customers may focus on literal output (i.e. how did this change affect how users download images after generating them), AI-Native Application segment customers' focus on output may be around task completion rates, or time savings.

### Industry terminology

**Observability** – Monitoring model performance, token use, latency, unit economics, and hallucination rates in environments. Primarily related to teams who ship features that directly interact with human users.

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
- Feature Stores: Tecton, Databricks, SageMaker, Redis
- Data Warehouse: Snowflake, Databricks, Firebolt, BigQuery
- Unit Economics: FinOps tooling, Helicone, LiteLLM, OpenRouter
- Data Pipeline: Atlan, Alation, dbt, FiveTran, Apache Airflow, Stitch

Software can be indicative of maturity of the organization. For example, teams using Helicone and Langfuse are likely early-stage, developer-heavy orgs that are in PostHog's ICP. Teams using dbt/Airflow will be very interested in the value of PostHog's warehouse integrations and batch exports. 

### Important business metrics & data

#### Metrics

|  Metric | Measurement  | Business Context  |
|---|---|---|
|  Cost per action |  Infrastructure cost to serve a particular user action (cost per image generated, cost per second of video generated, cost per query, API call) | User interaction drives margin  |
|Feature margin|Revenue against how much it costs to run the feature  |  Can be complex if infrastructure does not support granular definition of feature |

#### Data

##### Event taxonomy

Taxonomy is generally dependent on the use of LLM Analytics. 

Without LLM Analytics SDK:
- Autocaptured clicks and pageviews on AI features (button presses, route changes)                                  
- Custom events the customer wired up by hand, like `chat_message_sent` or `prompt_submitted`
- Whatever properties a customer should choose to attach

With LLM Analytics SDK:
- `$ai_generation` – one row per LLM call with model, input/output tokens, cost, latency, and provider    
- `$ai_trace` and `$ai_span` – parent/child structure for multi-step agents and tool use
- `$ai_embedding`, `$ai_metric`, `$ai_feedback` – vector ops, eval scores, thumbs up/down

##### Person profiles

When companies look at their event data in this segment, they're usually trying to answer "who did this?". The person profile should carry a defined `user_role` (`admin`, for example) along with aggregations like `total_api_calls` or `total_tokens_used`.                                                                              
                  
**Best Practices**

- Define a stable `$distinct_id` (internal UUID, not email or username) as early as possible.                 
- Identify immediately after authentication, both client-side and server-side, with the same distinct ID.
- $set vs $set_once. Use $set_once for immutable values (signup date, acquisition channel). Use $set for mutable values (plan tier, role, last seen feature).                                                                        
- Set source-of-truth properties server-side from the database, not from client state.                              
- Capture conversions on initial resource consumption (first API call, first generation). 

##### Common challenges

- High event volume &rarr; cost aversion; lean on sampling (where relevant), ingestion filters, discipline on `$set`.
- Most meaningful events occur server-side, which can raise complexity. Make sure to identify on each authenticated request.
- Environment density (staging, test, development, simulation alongside production) leads to messy data. Use separate projects or strict environment properties.

##### Cross-product use cases

- **LLM Analytics** – join `$ai_generation` cost back to person properties for cost-per-segment, or to identify which plan or role is burning the most tokens.
- **Feature Flags and Experiments** – gate new models behind flags, run A/B tests on prompt changes, hold out high-value users from risky rollouts.
- **Surveys** – trigger feedback prompts after a generation, collect CSAT on AI features, run PMF surveys against power users.
- **Session Replay** – filter to recordings of users hitting prompt failures or specific $ai_generation errors.
- **Error Tracking** – group exceptions by plan, model, or role to see which segment hits a bug.
- **Data Warehouse** – sync events for joins against billing or model cost tables, then pipe insights back. 

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
