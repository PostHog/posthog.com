---
title: Customer industry segments
sidebar: Handbook
showTitle: true
---

We have thousands of customers in PostHog, many of which are in similar industries. As CSMs having an understanding of our customers' industries can help us better be an expert on how PostHog works best for their specific use cases. This page serves as a resource for us to be able to collect and share industry specific vocabulary, important metrics, PostHog best practices, etc. that allow us to quickly ramp up on the industry to better engage with those customers.

## Industry segment list

These segments can change as our customer data evolves, but the following serve as a starting point:

- AI & Data
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

<summary>AI & Data Playbook</summary>

### AI & Data Description

Companies that exist in different parts of the AI value chain. There is significant potential to develop further playbooks for each sub-segment.

### Sub-Segments

| Sub-Segment             | Examples                           | Description                                        |
|:------------------------|:-----------------------------------|:---------------------------------------------------|
| Hyperscalers            | AWS, GCP, Oracle, Azure            | AI Services in the cloud                           |
| Frontier Model Labs     | OpenAI, Anthropic, Cohere, Mistral | Foundation models with proprietary architectures   |
| Generative              | ElevenLabs, Runware, Runway, Luma  | Product suites around output                       |
| Inference               | Replicate, fal\.ai, Together\.ai     | Host / serve other models, making them easy to run |
| AI-Native Applications  | Cursor, Perplexity                 | End-user tools where experience is driven by AI    |
| Data / Machine Learning | Databricks, Hugging Face           | Orchestration, system management                   |

### What They Care About

Commonly, they share developer-centric focus on adoption and retention. The higher order sub-segments (hyperscalers, frontier model labs, inference) will primarily focus on competitive parity and platform stickiness. Generative and AI-Native Application segments may primarily focus on feature adoption rates, generation metrics, unit economics, and retention. They'll also differ by output: whereas Generative segment customers may focus on literal output (i.e. how did this change affect how users download images after generating them), AI-Native Application segment customers' focus on output may be around task completion rates, or time savings.

### Industry Terminology

*Observability* - Monitoring model performance, token use, latency, unit economics, and hallucination rates in environments. Primarily related to teams who ship features that directly interact with human users. 

*Feature Store* - Centralized system for serving, storing, and managing machine learning features that are used in training and inference. These are more commonly found with mature data organizations.

*Tokens* - Units of processing/billing for LLMs. Can vary based on segment. Other variations would involve count, prediction, job, credit.

*RAG (Retrieval-Augmented Generation)* - An architecture pattern where an LLM pulls from external knowledge sources before generating a response. For segmentation, RAG-based products have unique infrastructure needs like accuracy of retrieval and context window usage.

*Benchmark* - A standardized test set for comparing model capabilities.

*Latency* - Time between sending a request and receiving a response.

*Throughput* - Number of requests/tokens processed per unit of time.

*NLP (Natural Language Processing)* - Branch of AI that enables computers to understand and generate human language.

*Embedding* - Representation of data (text, image, user actions) as vectors used for recommendation, search, and classification. 

### Common Software Used

_Note: This list is incomplete, ongoing, and has overlap. It is meant to serve as a directional guide versus ground truth._

- Observability: LiteLLM, Helicone, Datadog, Langfuse
- RAG: LangChain, Cohere, Haystack, Chroma
- Feature Stores: Tecton, Databricks, SageMaker, Redis
- Data Warehouse: Snowflake, Databricks, Firebolt, BigQuery
- Unit Economics: FinOps tooling, Helicone, LiteLLM, OpenRouter
- Data Pipeline: Atlan, Alation, dbt, Fivetran, Apache Airflow, Stitch

Software can be indicative of maturity of the organization. For example, teams using Helicone and Langfuse are likely early-stage, developer-heavy orgs that are in PostHog's ICP. Teams using dbt/Airflow will be very interested in the value of PostHog's warehouse integrations and batch exports. 

### Important Business Metrics & Data

#### Metrics

|  Metric | Measurement  | Business Context  |
|---|---|---|
|  Cost per action |  Infrastructure cost to serve a particular user action (cost per image generated, cost per second of video generated, cost per query, API call) | User interaction drives margin  |
|Cost per feature|Revenue against how much it costs to run the feature  |  Can be complex if infrastructure does not support granular definition of feature |


#### Data

##### Event Taxonomy

Using Generation sub-segment as an example: `[object]_[action]` would look something like `image_generated`. 

- Should always described what happened, and ideally down to the sub-segment specific unit of importance. `image_generated` not `images_generated`, which implies that there was aggregation done.

Event properties might look like:

```
event: image_generated
properties:
  model: "flux2.0"
  input_tokens: 1230
  output_tokens: 6089
  latency_ms: 12
```

##### Person Profiles

- Developer-centric, often driven by API key generation.
- Important parts of the persona might be `user_role` (developer, analyst, admin), `total_api_calls`, `total_tokens_used`.

### PostHog Products Examples

#### Product Analytics

##### Best Practices

- Develop and maintain funnels around how users are interacting with models
- Separate cohorts by model or particular feature
- Potentially capture conversions based on initial resource consumption (first API call, for example)

##### Common Challenges

- High event volume &rarr; cost aversion
- Server-side complexity with most meaningful events happening in the backend
- Environment density (staging, test, development, simulation in addition to production)

##### Cross-Product Use Cases

- LLM Analytics could be used to identify data quality issues and heavy experimentation on different models which are constantly changing
- New models pushed under feature flags, where performance can be tracked and usage correlated

</details>

<details>

<summary>E-commerce Playbook</summary>

### E-commerce Description 

Online retail businesses including direct-to-consumer brands, marketplace platforms, and omnichannel retailers selling physical or digital goods through web and mobile.

### What They Care About

- Conversion rate optimization across the entire funnel
- Cart abandonment reduction
- Customer acquisition cost (CAC) vs lifetime value (LTV) balance
- Site performance impact on sales
- Mobile vs desktop performance disparities
- Seasonal traffic and sales patterns
- Inventory turnover and demand forecasting
- Return rates and reasons
- Cross-sell/upsell effectiveness

### Industry Terminology

- **AOV (Average Order Value)**: The average dollar amount spent each time a customer places an order.
- **PDP (Product Detail Page) / PLP (Product Listing Page)**: PDP is the individual product page with detailed information, images, and add-to-cart button. PLP is the category or search results page showing multiple products in a grid or list format.
- **SKU (Stock Keeping Unit)**: A unique identifier code assigned to each distinct product and its variants (size, color, etc.) for inventory tracking.
- **Drop-off rate / Abandonment rate**: The percentage of users who leave a process (like checkout) without completing it. Cart abandonment specifically tracks users who add items but don't purchase.
- **Retargeting / Remarketing**: Advertising strategy that shows ads to people who previously visited the company's website or app, aimed at bringing them back to complete a purchase.
- **Attribution window**: The time period after a user clicks or views an ad during which a conversion (purchase) will still be credited to that ad. Common windows are 1, 7, or 30 days.
- **ROAS (Return on Ad Spend)**: Metric measuring ad campaign effectiveness by dividing revenue generated by the cost of ads.

### Common Software Used

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

##### Event Taxonomy

- **Core events:** `product_viewed`, `product_added_to_cart`, `checkout_started`, `order_completed`
- [**Detailed spec for Ecommerce event taxonomy**](/docs/data/event-spec/ecommerce-events)
- **Key event properties:** product_id, product_name, price, currency, quantity, category, brand, variant (size/color), cart_value

##### Person Profiles

- Often anonymous until purchase or email capture
- Limited utility for one-time purchasers but valuable for subscription/replenishment businesses
- **Key properties:** `customer_type` (i.e. new/returning), `total_orders`, `total_spent`, `last_order_date`, `preferred_product_categories`

### PostHog Products They Should Be Using

#### Product Analytics

##### Best Practices

- Build conversion funnels for each major product category
- Create cohorts based on acquisition channel to compare quality
- Track micro-conversions (newsletter signup, wishlist adds)
- Monitor search query performance and null results

##### Common Challenges 

- Shopify and other ecomm website builders can make installing PostHog properly difficult and cause unique bugs related to plug-ins, etc.
- Cookie/privacy restrictions affecting attribution

##### Cross-Product Use Cases

- Use session replay to identify issues > Create experiment to test fix > Monitor with analytics
- Feature flag for seasonal promotions > Track performance in analytics > Watch customer interactions via replay
- Identify drop-off points in funnels > Watch those specific sessions > Run experiments on improvements

</details> 
