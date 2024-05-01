---
date: 2024-05-01
title: 'Product metrics to track for LLM apps'
author:
  - lior-neu-ner
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-marketing/marketing-hog.jpg
featuredImageType: full
category: Engineering
tags:
  - Guides
  - Product metrics
crosspost:
  - Blog
---

LLM-powered apps differ in three key ways when compared to regular SaaS apps:

1. Their costs increase as as app usage increases.
2. Request latency spikes and errors are more common.
3. Evaluation something something

This means that in addition to [regular product metrics](https://posthog.com/product-engineers/product-health-metrics), you need to monitor AI-specific ones too. This post lists the best metrics to keep track of. We've grouped them into three categories: [cost-related metrics](#cost-related-metrics), [usage metrics](#usage-metrics), and [debug metrics](#debug-metrics).

## Cost-related metrics

### Average cost per user

**What is it?** Your total LLM costs divided by the number of active users.

**Why it's useful:** This gives you an idea of how your costs will grow with your product. You can also compare this to revenue per user to understand if your profit margin is viable.

**Questions to ask:**
- Are average costs going up or down over time? 
- If they are increasing over time, is it because of increased product usage or increased generation costs?
- What specific features or types of interactions contribute to the cost per user?

### P95 cost per user

**What is it?** The top 5% of users who are consuming the most LLM costs.

**Why it's useful:** This helps determine if specific users disproportionately affect overall costs. You can then investigate whether these costs are justified by their usage or if there are inefficiencies to address.

**Questions to ask**
- What common characteristics or usage patterns do the top 5% of users have?
- Are there specific feature interactions that result in higher costs for these users?
- Is the high cost associated with these users sustainable, or does it suggest a need for pricing adjustments?

### Average cost per interaction

**What is it?** The cost associated with each request in your LLM feature.

**Why it's useful**: This enables you to pinpoint exactly which interactions are the most expensive.

**Questions to ask**
- How does this number compare for each model?
- Which specific requests are the most costly, and are there ways to reduce these costs?
- Are there noticeable spikes in cost per interaction, and what triggers them?
  
## Usage metrics

### Average usage per user

**What is it?** How frequently the average user interacts with your LLM features.

**Why it's useful:** Indicates if your features have good traction and provide value to your users.

**Questions to ask**
- How does usage vary among different [cohorts](/docs/data/cohorts) or [user personas](https://posthog.com/product-engineers/how-to-create-user-personas)?
- What are the most engaged users doing that the least engaged are not?
- Are there specific features that drive more interactions? Why?

### Generation count

**What is it** The total number of times your LLM generates outputs per day, week, or month.

**Why it's useful** Helps assess the workload and demand placed on your LLMs, which directly impacts costs and performance.

**Questions to ask**
- How has the generation count changed over time, and does this correlate with user growth or engagement?
- Are there specific times of day or days of the week when generation counts spike?
- How do different app features affect the generation count?

### User feedback score

**What is it?** That quality of the LLMs output, as rated by your users.

**Why is it useful:** Strongly correlated with important product-health metrics such as growth, churn, and [NPS score](/product-engineers/nps-vs-csat-vs-ces).

- Are there specific user segments that are more satisfied or dissatisfied with the LLM outputs?
- What are the specific input and output tokens of the best and worst scores?
- How likely are users to churn from your product following a bad LLM response?

## Debug metrics

### Average number of tokens per request

**What is it?** The sum of input and output tokens consumed in each request. Also known as request size.

**Why it's useful:** Essential for optimizing performance and cost. Larger requests lead to higher costs and longer processing times, while smaller requests may lead to more frequent requests.

**Questions to ask**
- What is the average number of tokens per request, and how has it changed over time?
- Are there specific features or types of interactions that typically involve larger or smaller requests?
- How do variations in request size impact the latency and costs of responses?

### Generation latency

**What is it?** The time it takes for the LLM to generate a response.

**Why it's useful:** Helps identify performance bottlenecks and ensures your UX meets user expectations for speed.

**Questions to ask**

- Are there specific types of requests that have higher latency, and what can be done to address them?
- Are there latency spikes, and what causes them?
- How does latency correlate with user satisfaction and retention rates?

### Error rate

**What is it?** The percentage of requests that result in errors.

**Why is it useful:** Enables you to pinpoint problematic LLM requests and API calls.

**Questions to ask**
- What is the overall error rate, and how does it break down into user-facing versus backend errors?
- What percentage of errors are caused by timeouts?
- Are there specific features or scenarios that are more prone to errors?
  

## Further reading

- [How to set up LLM analytics for ChatGPT](/tutorials/chatgpt-analytics) 
- [How to set up LLM analytics for Anthropic's Claude](/tutorials/anthropic-analytics) 
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)