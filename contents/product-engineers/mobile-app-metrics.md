---
date: 2024-09-16
title: 25 best mobile app metrics to track
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

## Sign up and onboarding metrics

### 1. App downloads

**What it is:** The number of times your app has been downloaded.

**Why it's useful:** Provides a baseline metric for user acquisition and helps measure the effectiveness of marketing campaigns.

**Questions to ask:**
- How does the number of downloads vary across different platforms (iOS, Android, etc.)?
- Is there a correlation between the number of downloads and user engagement or retention?
- How do different marketing channels impact the number of downloads?

**Insight type:** [Trend](/docs/product-analytics/trends/overview)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726494646/posthog.com/contents/Screenshot_2024-09-16_at_2.49.24_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726494646/posthog.com/contents/Screenshot_2024-09-16_at_2.49.43_PM.png"
    classes="rounded"
    alt="Number of app downloads"
/>

### 2. App bounce rate

**What it is:** The percentage of users who view your home screen but don't view a second screen.

**Why it's useful:** Enables you to learn if your welcome messaging is resonating with news users.

**Good benchmark:** Below 9% is considered good – [Source](https://contentsquare.com/blog/app-metrics/)

**Questions to ask:**
- How does the bounce rate correlate with downloads from different marketing channels?
- Are users in specific countries more likely to bounce? How does localization correlate with bounce rate?
- How does the bounce rate vary across different devices and app versions?

**Insight type:** [Trend](/docs/product-analytics/trends/overview)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726495147/posthog.com/contents/Screenshot_2024-09-16_at_2.58.42_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726495147/posthog.com/contents/Screenshot_2024-09-16_at_2.58.56_PM.png"
    classes="rounded"
    alt="Home screen bounce rate"
/>

### 3. Permissions granted rate

**What it is:** The percentage of users who grant the necessary permissions to use your app.

**Why it's useful:** Indicates if users are comfortable with your app and the permissions its requesting.

**Good benchmark:** While there are no publicly available benchmarks, between 60-80% is considered good.

**Questions to ask:**
- Which permissions are most commonly granted, and which are least likely to be granted?
- How does the number correlate with user activation and retention?
- Which types of users ar more likely to trust your app and grant permissions?

**Insight type:** [Funnel](/docs/product-analytics/funnels)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726495658/posthog.com/contents/Screenshot_2024-09-16_at_3.07.30_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726495488/posthog.com/contents/Screenshot_2024-09-16_at_3.04.39_PM.png"
    classes="rounded"
    alt="Permissions granted rate"
/>

### 4. Activation rate

**What it is:** The percentage of users who reach the "aha" moment and experience your app's core value.

**Why it's useful:** Measures how effective your app's onboarding and messaging is.

**Good benchmark:** Above 8% – [Source](https://www.businessofapps.com/data/app-activation-rates/)

**Questions to ask:**
- Where are the largest drop-offs in the onboarding funnel before activation?
- How does activation correlate with retention and customer lifetime value?
- How do other external factors like marketing or app performance impact activation?

**Insight type:** [Funnel](/docs/product-analytics/funnels)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726495892/posthog.com/contents/Screenshot_2024-09-16_at_3.11.24_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726495787/posthog.com/contents/Screenshot_2024-09-16_at_3.09.34_PM.png"
    classes="rounded"
    alt="Activation rate"
/>

### 5. Average time to activation

**What it is:** The average time it takes for a user to reach activation.

**Why it's useful:** Gives you a sense of how long it takes for a user to get value from your app.

**Good benchmark:** Varies depending on the type of app.

**Questions to ask:**
- What are common characteristics of users who take shorter or longer to activate?
- Is there a correlation between the time to activation and churn?
- Is there a correlation between the speed of activation and long-term user retention?

**Insight type:** [Funnel](/docs/product-analytics/funnels)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726496863/posthog.com/contents/Screenshot_2024-09-16_at_3.24.37_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726496863/posthog.com/contents/Screenshot_2024-09-16_at_3.24.51_PM.png"
    classes="rounded"
    alt="Average time to activation"
/>

## Engagement metrics

### 6. App and feature stickiness

**What it is:** The number of users who open your app and/or performed a specific action repeatedly over a given time period.

**Why it's useful:** Shows you if your app has successfully created a habit among your users.

**Good benchmark** Varies depending on the type of app.

**Questions to ask:**
- What percentage of users have interacted with a specific feature at least 3 times in the last 7 days? 
- What are the characteristics of the users who adopt new features versus those who don't?
- How likely are users who try out a new feature to continue using it?

**Insight type:** [Stickiness](/docs/product-analytics/stickiness)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726499416/posthog.com/contents/Screenshot_2024-09-16_at_4.09.47_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726499416/posthog.com/contents/Screenshot_2024-09-16_at_4.10.01_PM.png"
    classes="rounded"
    alt="Feature stickiness"
/>

### 7. DAU / MAU ratio

**What it is:** The ratio of daily active users (DAU) to monthly active users (MAU).

**Why it's useful:** Highlights user loyalty and the app's ability to create daily habits.

**Good benchmark:** 20% is good, while above 25% is considered great – [Source](https://www.businessofapps.com/guide/mobile-app-retention/)

**Questions to ask:**
- How does this ratio change over time, and what factors might be influencing this trend?
- How does your DAU/MAU ratio compare to [industry standards](/tutorials/dau-mau-ratio#what-is-a-good-daumau-ratio)?
- Are users who are active daily more likely buy in-app purchases?

**Insight type:** [Trend with formula mode](/docs/product-analytics/trends/formulas)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726499870/posthog.com/contents/Screenshot_2024-09-16_at_4.16.21_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726499869/posthog.com/contents/Screenshot_2024-09-16_at_4.17.20_PM.png"
    classes="rounded"
    alt="DAU/MAU ratio"
/>

### 8. NPS score

**What it is:** [Net Promoter Score (NPS)](/product-engineers/nps-vs-csat-vs-ces#what-is-nps) measures how passionate users are about your product. You ask them how likely they are to recommend your product to a friend or coworker and they respond on a scale from 0 (not likely at all) to 10 (extremely likely). Your score is the percentage of promoters (people who respond with 9 or 10) minus the percentage of detractors (people who respond with 0-6).

**Why it's useful:** NPS is a strong indicator of product-market fit. It's also a leading indicator of future revenue.

**Good benchmark:**  Anything above 0 is good, above 20 is great, and above 50 is amazing – [Source](/product-engineers/nps-vs-csat-vs-ces#what-is-a-good-nps-score-for-saas)

**Questions to ask:**
- How does NPS score trend over time, especially after major updates or feature releases?
- What's the relationship between NPS scores and user retention rates at different time intervals (30, 60, 90 days)?
- Are there significant differences in NPS scores between users on different platforms (iOS vs Android) or subscription tiers?

**Insight type:** [Custom survey](/docs/surveys/implementing-custom-surveys) using the [PostHog API](/docs/api/surveys)
<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726500781/posthog.com/contents/Screenshot_2024-09-16_at_4.32.51_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726500705/posthog.com/contents/Screenshot_2024-09-16_at_4.31.28_PM.png"
    classes="rounded"
    alt="NPS score"
/>

### 9. In-app response rate

**What it is:** The percentage of users who respond to your in-app messages, surveys, or review requests.

**Why it's useful:** Indicates how engaged and vested users are with using your app.

**Good benchmark:** 28% for in-app prompts, 13% for in-app surveys – [Source](https://www.businessofapps.com/data/in-app-response-rates/)

**Question to ask:**
- How does the timing and frequency of in-app prompts affect response rates?
- Is there a correlation between response rates and user satisfaction or retention?
- What is the optimal length for in-app surveys to maximize completion rates?

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726753147/posthog.com/contents/Screenshot_2024-09-19_at_2.38.01_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726753147/posthog.com/contents/Screenshot_2024-09-19_at_2.38.08_PM.png"
    classes="rounded"
    alt="In app response rate"
/>

### 10. Average session length

**What it is:** The average length of time a user spends in your app during a single session.

**Why it's useful:** Helps you understand how long users are engaging with your app and identify opportunities to keep them engaged longer.

**Good benchmark:** Varies depending on app type. 443 seconds for entertainment apps, 69 seconds for business apps, and 64 seconds for tool apps – [Source](https://www.businessofapps.com/data/app-engagement-rates/)

**Questions to ask:**
- Is there a correlation between session length and user engagement or retention?
- How does the average session length vary across different user segments (e.g., new vs. long-term users)?
- What is the impact of push notifications or email campaigns on session length?

**Insight type:** [SQL](/docs/product-analytics/sql)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726753843/posthog.com/contents/Screenshot_2024-09-19_at_2.50.25_PM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726753843/posthog.com/contents/Screenshot_2024-09-19_at_2.50.32_PM.png"
    classes="rounded"
    alt="Average session length"
/>

## User Retention Metrics

### 11. N-day retention rate

**What it is:** The percentage of users who return to your app after their first visit within a specific time frame (e.g., 1-day, 7-day, 30-day retention).

**Why it's useful:** Helps you understand how well your app keeps users engaged over time.

**Good benchmark:** Above 20% for 1-day retention, 14% for 3-day, and 10% for 7-day – [Source](https://www.appsflyer.com/resources/reports/app-retention-benchmarks/)

**Questions to ask:**
- What features or actions are associated with higher retention rates?
- How does the onboarding experience impact long-term retention rates?
- What is the relationship between user feedback (e.g., ratings, reviews) and retention rates?

**Insight type:** [Retention](/docs/product-analytics/retention)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726569683/posthog.com/contents/Screenshot_2024-09-17_at_11.40.54_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726569683/posthog.com/contents/Screenshot_2024-09-17_at_11.41.11_AM.png"
    classes="rounded"
    alt="Retention rate chart"
/>


### 12. New user churn rate

**What it is:** The percentage of new users who stop using your app within a given time period.

**Why it's useful:** Identifies how quickly you're losing users and helps focus efforts on retention strategies.

**Good benchmark:** Less than 96% within 30 days – [Source](https://www.businessofapps.com/data/app-churn-rates/)

**Questions to ask:**
- Are there specific points in the user journey where churn is more likely to occur?
- How does churn rate correlate with feature adoption?
- How does the churn rate vary between different subscription tiers or pricing plans?

**Insight type:** [Trend with formula mode](/docs/product-analytics/trends/formulas)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726649288/posthog.com/contents/Screenshot_2024-09-18_at_9.47.23_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726649288/posthog.com/contents/Screenshot_2024-09-18_at_9.47.56_AM.png"
    classes="rounded"
    alt="Churn rate chart"
/>

### 13. Time between sessions

**What it is:** The average time between a user's app sessions.

**Why it's useful:** Helps you understand your app's usage patterns and identify opportunities to re-engage users.

**Good benchmark:** Varies depending on the app type.

**Questions to ask:**
- Is there a correlation between time between sessions and likelihood of churn?
- How do push notifications or email campaigns affect the time between sessions?
- How does the time between sessions compare to the time between engagement in specific features?

**Insight type:** [Stickiness](/docs/product-analytics/stickiness)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726650090/posthog.com/contents/Screenshot_2024-09-18_at_10.00.59_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726650090/posthog.com/contents/Screenshot_2024-09-18_at_10.01.14_AM.png"
    classes="rounded"
    alt="Time between sessions"
/>


### 14. Reactivation/Resurrection rate

**What it is:** The percentage of inactive users who return to your app after a period of inactivity.

**Why it's useful:** Measures the effectiveness of your re-engagement strategies and the app's ability to win back lapsed users.

**Good benchmark:** 9% for apps with weekly subscription plans, 12% for monthly, and 6% for annual – [Source](https://www.businessofapps.com/data/app-reactivation-rates/)

**Questions to ask:**
- What strategies or campaigns are most effective in reactivating users?
- How does the behavior of reactivated users compare to that of consistently active users?
- What is the long-term retention rate of reactivated users compared to new users?

**Insight type:** [Lifecycle](/docs/product-analytics/lifecycle)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726570223/posthog.com/contents/Screenshot_2024-09-17_at_11.50.01_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726570223/posthog.com/contents/Screenshot_2024-09-17_at_11.50.10_AM.png"
    classes="rounded"
    alt="Retention rate chart"
/>

### 15. User lifetime

**What it is:** The average length of time a user remains active before churning.

**Why it's useful:** Provides insight into the overall health of your app and helps in forecasting long-term user behavior.

**Good benchmark:** Retaining 24% or more of users after their first day, and more than 4% after their first month – [Source](https://www.businessofapps.com/data/app-retention-rates/)

**Questions to ask:**
- What actions or behaviors are associated with longer user lifetimes?
- How does user lifetime correlate with lifetime value (LTV)?
- What is the impact of customer support interactions on user lifetime?

**Insight type:** [SQL](/docs/product-analytics/sql)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726648872/posthog.com/contents/Screenshot_2024-09-18_at_9.40.16_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726648872/posthog.com/contents/Screenshot_2024-09-18_at_9.40.28_AM.png"
    classes="rounded"
    alt="Average time to first purchase"
/>


## Revenue metrics

### 16. Average time to first purchase

**What it is:** The time it takes for users to make their first purchase.

**Why it's useful:** Similar to activation time, it's a strong indication of how long it takes for users to understand your app's core value prop.

**Good benchmark:** Varies depending on the app type.

**Questions to ask:**
- Which marketing channels or user acquisition methods lead to faster first purchases?
- Are there specific in-app events or interactions that typically precede a user's first purchase?
- How does pricing strategy or promotional offers impact the time to first purchase?

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726569189/posthog.com/contents/Screenshot_2024-09-17_at_11.31.54_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726569189/posthog.com/contents/Screenshot_2024-09-17_at_11.31.35_AM.png"
    classes="rounded"
    alt="Average time to first purchase"
/>

### 17. Refund rate

**What it is:** The percentage of payments that are refunded.

**Why it's useful:** Highlights customer satisfaction and product quality issues. 

**Good benchmark:** Less than 3% – [Source](https://www.businessofapps.com/data/app-refund-rates/)

**Questions to ask:**
- Are there specific features or in-app purchases that have higher refund rates?
- How does the refund rate vary across different user segments (e.g., new vs. long-term users)?
- Is there a correlation between refund rates and specific app versions or updates?

**Insight type:** [Trend with formula mode](/docs/product-analytics/trends/formulas)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726649288/posthog.com/contents/Screenshot_2024-09-18_at_9.47.23_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726649288/posthog.com/contents/Screenshot_2024-09-18_at_9.47.56_AM.png"
    classes="rounded"
    alt="Refund rate"
/>

### 18. Revenue per paying user

**What it is:** Total revenue divided by the number of paying users.

**Why it's useful:** Shows you how much revenue on average each paying user is generating for you.

**Good benchmark:** A life-time value (LTV) of $80 or more for travel apps, $38 for e-commerce apps, and $2.50 for gaming apps – [Source](https://www.businessofapps.com/data/ltv-app-rates/)

**Questions to ask:**
- What are the differences between the top 10% who generate the most revenue versus the rest of the users?
- What is the impact of customer support interactions on revenue per paying user?

**Insight type:** [Trend with formula mode](/docs/product-analytics/trends/formulas), grouped by month

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726651534/posthog.com/contents/Screenshot_2024-09-18_at_10.25.02_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726651534/posthog.com/contents/Screenshot_2024-09-18_at_10.25.26_AM.png"
    classes="rounded"
    alt="Revenue per paying user"
/>

### 19. In-app purchase conversion rate 

**What it is:** The percentage of users who make an in-app purchase. 

**Why it's useful:** Indicates how appealing your app's premium features are.

**Good benchmark:** Above 2% – [Source](https://www.businessinsider.com/just-2-of-app-installs-lead-to-purchases-2017-2?)

**Questions to ask:** 
- How does the conversion rate vary for different types of in-app purchases? 
- What user behaviors or app interactions correlate with higher conversion rates? 
- How do promotional offers or discounts impact the conversion rate?

**Good benchmark:** Varies depending on the app type. 
https://www.businessofapps.com/data/app-conversion-rates/

**Insight type:** [Funnel](/docs/product-analytics/funnels)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726651727/posthog.com/contents/Screenshot_2024-09-18_at_10.28.36_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726651727/posthog.com/contents/Screenshot_2024-09-18_at_10.28.21_AM.png"
    classes="rounded"
    alt="Revenue per paying user"
/>

### 20. Revenue churn

**What it is:** The amount of revenue lost per month from canceled subscriptions.

**Why it's useful:** Measure customer loyalty and identify potential issues in your product or pricing strategy.

**Good benchmark:** 15% for weekly and monthly subscriptions, 41% for annual subscriptions – [Source](https://www.businessofapps.com/data/app-renewal-rates/)

**Questions to ask:**
- What are the key drivers of revenue churn? For example, price changes, product updates, or something else?
- Is there a correlation between the timing of subscription renewals and revenue churn rates?
- What is the impact of customer onboarding on reducing revenue churn?

**Insight type:** [Trend](/docs/product-analytics/trends/overview), grouped by month

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726652097/posthog.com/contents/Screenshot_2024-09-18_at_10.34.38_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726652098/posthog.com/contents/Screenshot_2024-09-18_at_10.34.48_AM.png"
    classes="rounded"
    alt="Revenue churn"
/>

## Performance and error metrics

### 21. API response time

**What it is:** The time it takes to receive a response from your API endpoints. 

**Why it's useful:** Helps identify performance bottlenecks and ensures your UX meets user expectations for responsiveness.

**Good benchmark:** Below 1 second is good. Anything above 1 second and users begin to notice some delay.

**Questions to ask:**
- What is the average latency for different types of API requests?
- How does latency vary across different devices and network conditions?
- Are there specific features or interactions that contribute to increased latency?

**Insight type:** [Trend](/docs/product-analytics/trends/overview)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726653011/posthog.com/contents/Screenshot_2024-09-18_at_10.48.50_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726653011/posthog.com/contents/Screenshot_2024-09-18_at_10.49.02_AM.png"
    classes="rounded"
    alt="API request latency"
/>

### 22. API request error rate

**What it is:** The percentage of network requests that result in errors.

**Why it's useful:** Enables you to pinpoint problematic flows in your app.

**Good benchmark:** Less than 1%.

**Questions to ask:**
- What is the overall error rate, and how does it break down into client-side versus server-side issues i.e 4xx and 5xx error codes?
- What are the most common errors, and what are their causes?
- Are there specific features or scenarios that are more prone to errors?

**Insight type:** [Trend with formula mode](/docs/product-analytics/trends/formulas)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726649288/posthog.com/contents/Screenshot_2024-09-18_at_9.47.23_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726649288/posthog.com/contents/Screenshot_2024-09-18_at_9.47.56_AM.png"
    classes="rounded"
    alt="API request error rate"
/>

### 23. App launch time

**What it is:** The time it takes for your app to become responsive when opened.

**Why it's useful:** User's expect apps to be responsive, and a slow launch time can be off-putting to users.

**Good benchmark** [Apple](https://developer.apple.com/videos/play/wwdc2019/423/?time=305) recommends at most up to 400ms to render the first frame. [Google](https://developer.android.com/topic/performance/vitals/launch-time) recommends cold launches to be below 5 seconds and hot launches to be below 1.5 seconds.

**Questions to ask:**
- How does the app launch time vary across different devices and network conditions?
- What are the most common causes of slow app launch times, and how can they be addressed?
- How does app launch time correlate with user engagement and satisfaction?

**Insight type:** [Trend](/docs/product-analytics/trends/overview)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726653011/posthog.com/contents/Screenshot_2024-09-18_at_10.48.50_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726653011/posthog.com/contents/Screenshot_2024-09-18_at_10.49.02_AM.png"
    classes="rounded"
    alt="App launch time"
/>

### 24. Percentage of users who experience crashes or errors

**What it is:** How many of your overall users are affected by crashes and/or errors.

**Why it's useful:** Gives you a sense of how many of your users are having a bad experience with your app.

**Good benchmark:** Less than 1% –[Source](https://www.businessofapps.com/data/app-performance-rates/)

**Questions to ask:**
- How does the crash rate vary across different devices and app versions?
- Which features are most likely to cause errors?
- How does this rate correlate with user retention and churn?

**Insight type:** [Trend with formula mode](/docs/product-analytics/trends/formulas)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726649288/posthog.com/contents/Screenshot_2024-09-18_at_9.47.23_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726649288/posthog.com/contents/Screenshot_2024-09-18_at_9.47.56_AM.png"
    classes="rounded"
    alt="Percentage of users who experience crashes or errors"
/>

### 25. p95 errors per user

**What it is:** The number of errors experienced by the top 5% of users who encounter the most issues.

**Why it's useful:** Helps you identify the users who are most affected by errors.

**Questions to ask:**
- What are common characteristics of users who experience the most errors?
- Which features are the most problematic for these users?
- How do error rates change after app updates for these users?

**Insight type:** [Trend](/docs/product-analytics/trends)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726653590/posthog.com/contents/Screenshot_2024-09-18_at_10.59.41_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1726653590/posthog.com/contents/Screenshot_2024-09-18_at_10.59.34_AM.png"
    classes="rounded"
    alt="Percentage of users who experience crashes or errors"
/>

## Further reading

- [Best mobile app analytics tools](/blog/best-mobile-app-analytics-tools)
- [The 9 best mobile app A/B testing tools](/blog/best-mobile-app-ab-testing-tools)
- [7 best session replay tools for mobile apps (iOS & Android)](/blog/best-mobile-app-session-replay-tools)

<NewsletterForm />