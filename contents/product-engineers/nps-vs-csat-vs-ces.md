---
date: 2023-11-17
title: "NPS vs CSAT vs CES: Which is best for SaaS"
author:
  - lior-neu-ner
featuredImage: ../images/blog/posthog-marketing/marketing-hog.jpg
featuredImageType: full
tags:
  - Product analytics
  - Product metrics
  - Product engineers
  - Surveys
---

Here's the short version of what you need to know about NPS, CSAT, and CES:

- **NPS** measures long-term user sentiment about your product.
- **CSAT** tells you how users feel about your product _right now_.
- **CES** shows how difficult your product is to use.


In this post, we'll go into the specifics of each [survey](/surveys) and how to use them in your SaaS app.

## What is NPS?

Net promoter score (NPS) measures user loyalty by asking how likely users are to recommend your product to a friend or coworker. Responses are on a scale from 0 (not likely at all) to 10 (extremely likely).

![NPS survey](../images/blog/nps-csat-ces/nps-survey.png)

NPS gives you insight into who your loyal customers are and which are at risk of churning.

### How to calculate NPS score

NPS survey responses are grouped into three categories:

- **Promoters** – people who respond with 9 or 10. They're extremely happy with your product.
- **Passives** – people who respond with 7 or 8. They aren't unhappy, but they're not overly excited either.
- **Detractors** – people who respond with 6 or below. These people have had a bad experience and are likely to complain to others.

![NPS scale](../images/blog/nps-csat-ces/nps-score.png)

Your NPS score is the `% of promoters - % of detractors`. The scores range between -100 (100% negative) and +100 (100% positive).

For example, let's say you survey `100` people. `50` are promoters, `30` are passives, and `20` are detractors. Your NPS would be `50% - 20% = 30`.

### What is a good NPS score for SaaS?

Anything above 0 is good, above 20 is great, and above 50 is amazing. According to [Satmetrix](https://www.satmetrix.com/wp-content/uploads/2023/07/NICE-Net-Promoter-Benchmarks-2023.pdf), the average NPS score for software and apps is 27.

Below is a table with a benchmark of NPS scores from well-known SaaS products.

| Product | NPS score |
|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [Snowflake](https://www.snowflake.com/blog/customer-experience-report-2022/) | 72 |
| [Square](https://d1g145x70srn7h.cloudfront.net/documents/investor-relations/presentations/05-11-2018-overview.pdf) | 70 |
| [Zoom](https://blog.zoom.us/zooms-nps-dominates-video-conferencing/) | 69 | 
| [DocuSign](https://www.docusign.com/why-docusign) | 66 |
| [Zapier](https://www.comparably.com/brands/zapier) | 64 |
| [Slack](https://www.comparably.com/brands/slack) | 53 |
| [Mailchimp](https://www.comparably.com/brands/mailchimp) | 47 |
| [Netflix](https://www.comparably.com/brands/netflix) | 46 |
| [Twilio](https://www.comparably.com/brands/twilio) | 34 |
| [Dropbox](https://www.comparably.com/brands/dropbox) | 27 | 

### Drawbacks of NPS

NPS can be tricky because it's often contextless. It gives you an indication of your users' sentiment toward your product but not much else.

To counteract this, it's best to ask follow-up questions in your NPS survey, like:

- Which features do you find most useful?
- What are you finding difficult to do?
- Is there a feature or aspect of the product that particularly disappoints you?
- What would it take to improve your score to a 9 or 10?
- Would you be open to a follow-up call to discuss your feedback in more detail?

### When to use NPS surveys

NPS is particularly handy for understanding long-term user satisfaction – as opposed to immediate or short-term feedback.

With this in mind, it's best to wait for users to properly experience your app. Then, you should run NPS surveys every month or quarter to understand how their experience changes over time. 

This enables you to identify trends in how your product changes are affecting your user experience.

## What is CSAT?

Customer satisfaction (CSAT) score measures how satisfied your users are with a specific feature or product.

Responses typically range from 1-5 or 1-10 on an "extremely dissatisfied – extremely satisfied" scale.

![CSAT survey](../images/blog/nps-csat-ces/csat-survey.png)

CSAT can target specific parts of your app, helping you identify where exactly users feel satisfied and where they don't. This makes it easy to find out where you can improve your UX.

### How to calculate CSAT score

Responses are grouped into two categories:

- **Positive responses** – people who respond with 4 or 5 if your scale is from 1-5 (or 8, 9, or 10 if your scale is from 1-10).
- **Everyone else**

![CSAT scale](../images/blog/nps-csat-ces/csat-score.png)

Your CSAT score is the `Total number of positive responses / Total responses = % of satisfied customers`.

For example, let's say you survey `100` people. `70` people give a positive score, your CSAT would be '70 / 100 = 70%`.

Naturally, a higher CSAT indicates that users are likely to continue using your product. Conversely, low CSAT scores correlate with high churn rates.

### What is a good CSAT score for SaaS?

A good score is typically 75-85%. Anything higher is amazing, and anything lower is poor. 

According to [fullview](https://www.fullview.io/blog/csat-benchmarks-by-industry#toc-csat-benchmarks-for-software-companies), the average CSAT score for SaaS apps is 78.

### Drawbacks of CSAT

Since CSAT survey questions are specific to a feature, you may miss broader issues with your product.

It's also important to note that a high CSAT score doesn't necessarily translate to user loyalty. Users might be satisfied with certain aspects of your product but could still switch to a competitor for reasons not covered in the survey – like pricing or other features. 

Thus, while CSAT is useful for understanding short-term sentiment, it should be paired with other feedback methods to understand the long-term.

### When to use CSAT surveys

CSAT surveys are most effective when you need real-time feedback after specific interactions with your product.

With this in mind, try to use CSAT surveys after key interactions in your user journey. For example:

- **After onboarding –** to understand if your onboarding was effective and engaging.
- **During [beta testing of a new feature](/tutorials/beta-feedback) –**  to see if it meets your users' expectations.
- **After major app updates –** to understand whether your UX has improved or if there are new issues to address.
- **Before subscription renewal –** to allow you to address any issues beforehand.
- **After customer support interaction –** to see if customers feel their issue has been resolved.

## What is CES?

Customer effort score (CES) measures how easy it is to use your product or feature. 

Users are asked "How easy was it to use `<name of feature>`" and a response scale ranging from 1 (very difficult) to 5 (very easy).

![CES survey](../images/blog/nps-csat-ces/ces-survey.png)

CES is great for debugging UX problems in your app and pinpointing problem areas.

### How to calculate CES score

To find your CES score, calculate the average score of all your responses. That is: `sum of all responses / number of responses = CES score`

![CES score](../images/blog/nps-csat-ces/ces-score.png)

For example, let's say you survey `100` people. If the sum of all their responses is `450`, your CES score is `4.5`.

### What is a good CES score for SaaS?

While there are no published benchmarks for CES scores, you should aim for a score of 4 or higher. Any lower is a sign that users are struggling to use your app and this will lead to churn.

### Drawbacks of CES

CES surveys focus on a single feature interaction and are very narrow in scope. So, while they help you debug UX issues, they don't give you insights into overall satisfaction with your feature.

Additionally, CES only tells you if a feature is difficult to use, but it doesn't tell you _why_. To counteract this, you need to ask follow-up questions, such as:

- What makes `<feature name>` difficult to use?
- What could we do to make it easier to use?

### When to use CES surveys

To best debug UX problems, you should use CES surveys after key interactions such as:

- **After using a feature for the time** – to understand how intuitive it is.
- **After a major UI update** – to confirm users can still navigate through your app effectively.
- **When a user is migrating from a competitor's product to yours** – to highlight areas for improvement in onboarding.

## NPS vs CSAT vs CES: Which one is best?

In an ideal world, you could use all three survey types. However, survey fatigue means that it's not possible to send surveys to your users constantly, so you need to prioritize which ones to use.

Our recommendation is to use CSAT before you have [product-market fit](/founders/measure-product-market-fit), and NPS after you do:

Before product-market fit, your app is constantly changing, so it makes sense to focus on the short-term only and thus use CSAT. Conversely, once you've achieved product-market fit, you can focus on the long-term and use NPS.

Lastly, we prefer to avoid using CES as its scope is too narrow. There are other ways to understand if a feature is easy to use, like interviews or user testing. CSAT or NPS surveys generate far better insights, so we prefer to avoid fatiguing users with CES surveys.

Here's a table summarizing the differences between the three:

|           | NPS                                   | CSAT                                       | CES                                           |
|-----------------|---------------------------------------|--------------------------------------------|-----------------------------------------------|
| **Timeframe**   | Long-term                             | Short-term                                 | Short-term                                    |
| **Focus**       | Broad – overall user sentiment        | Granular – specific features  | Very granular – ease of using a specific feature |
| **When to ask**    | At regular intervals (e.g., monthly, quarterly) to existing users           | Immediately after using a feature                | Immediately after using a feature      |
| **Product-market fit**         | After PMF               | Before PMF                          | Useful at both stages                 |

## Further reading 📖

- [How to create a great user persona (with examples)](/product-engineers/how-to-create-user-personas)
- [How to write great product survey questions (with examples)](/product-engineers/product-survey-questions)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)

