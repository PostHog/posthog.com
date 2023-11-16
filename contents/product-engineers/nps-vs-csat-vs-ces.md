---
date: 2023-05-09
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

Here's what you need to know about NPS, CSAT and CES:

// TODO write TLDR

## What is NPS?

Net promoter score (NPS) measures user loyalty by asking them how they are to recommend you to a friend or coworker. Users submit their response on a scale from 0 (not likely at all) to 10 (extremely likely).

![NPS survey](../images/blog/nps-csat-ces/nps-survey.png)

NPS is great as it give you insights to who your loyal customers are, and which of your customers are at risk of churning.

### How to calculate NPS score

Responses are grouped into 3 categories:

- **Promoters** – people who respond with 9 or 10. They're extremely happy with your product.
- **Passives** – people who respond with 7 or 8. They aren’t unhappy, but they’re not overly excited either.
- **Detractors** – people who respond with 6 or below. These are people who have had a bad experience and are likely to complain to others.

![NPS scale](../images/blog/nps-csat-ces/nps-score.png)

You NPS score is the `% of promoters - % of detractors`. The scores range between -100 (100% negative) and +100 (100% positive).

For example, let's say you survey `100` people. `70` people give a promoter score and `20` people give a detractor score. Your NPS would be `70% - 20% = 50%`.

### What is a good NPS score for SaaS?

Anything above 0 is good, above 20 is great, and above 50 is amazing. According to [Satmetrix](https://www.satmetrix.com/wp-content/uploads/2023/07/NICE-Net-Promoter-Benchmarks-2023.pdf), the average NPS score for SaaS apps is 27.

Below is table with a benchmark of NPS scores from well-known SaaS products.

| Product | NPS score |
|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [Snowflake](https://www.snowflake.com/blog/customer-experience-report-2022/) | 72 |
| [Square](https://d1g145x70srn7h.cloudfront.net/documents/investor-relations/presentations/05-11-2018-overview.pdf) | 70 |
| [Zoom](https://blog.zoom.us/zooms-nps-dominates-video-conferencing/) | 69 | 
| [DocuSign](https://www.docusign.com/why-docusign) | 66 |
| [Zapier](https://www.comparably.com/brands/zapier) | 64 |
| [Slack](https://www.comparably.com/brands/slack) | 53 |
| [Mailchimp](https://www.comparably.com/brands/mailchimp) | 47 |
| [NetFlix](https://www.comparably.com/brands/netflix) | 46 |
| [Twilio](https://www.comparably.com/brands/twilio) | 34 |
| [Dropbox](https://www.comparably.com/brands/dropbox) | 27 | 

### Drawbacks of NPS

NPS can be tricky because it's often contextless. It gives you an indication of your users' sentiment toward your product, but not much else.

To counteract this, it's best to ask follow up questions in your NPS survey:

- Which features do you find most useful?
- What are you finding difficult to do?
- Is there a feature or aspect of the product that particularly disappoints you?
- What would it take to improve your score to a 9 or 10?
- Would you be open to a follow-up call to discuss your feedback in more detail?

### When to use NPS surveys

Since NPS survey questions are broad, they are particularly useful for gauging long-term user satisfaction, rather than immediate or short-term feedback. 

It's best to wait for users to have a chance to properly experience your product, and so NPS surveys are best for existing users and not new ones.

With this in mind, it's a good idea to run NPS surveys to a group of users every month or quarter to get an understanding of how their experience is changing over time. This enables you to identify trends in how your product changes are affecting your user experience.

## What is CSAT?

Customer satisfaction (CSAT) score measure how satisfied your users are with a specific feature or product. The scale typically ranges from 1-5 or 1-10 on an "extremely dissatisfied – extremely satisfied" scale.

![CSAT survey](../images/blog/nps-csat-ces/csat-survey.png)

CSAT is great because it can be targeted to specific parts of your app, helping you to find out where exactly customers feel satisfied and where they don’t. This makes it easy to find out where your UX can be improved.

### How to calculate CSAT score

Responses are grouped into 3 categories:

- **Positive responses** – people who respond with 4 or 5 if your scale is from 1-5 (or 8, 9, or 10 if your scale is from 1-10).
- **Everyone else**

![CSAT scale](../images/blog/nps-csat-ces/csat-score.png)

The idea behind using the highest scores is it gives the most accurate predictor for customer retention, as customers who are likely to stick around will give higher scores.

You CSAT score is the `Total number of positive responses / Total responses = % of satisfied customers`.

For example, let's say you survey `100` people. `70` people give a postive score, your CSAT would be `70 / 100 = 70%`.

Naturally, higher CSAT indicates that users are likely to continue using your product. Conversely, low CSAT scores correlate with high churn rates.

### What is a good CSAT score for SaaS?

A good score is typically 75-85%. Anything higher is amazing, and anything lower is poor. According to [fullview](https://www.fullview.io/blog/csat-benchmarks-by-industry#toc-csat-benchmarks-for-software-companies), the average CSAT score for SaaS apps is 78.

### Drawbacks of CSAT

Since CSAT is specific, customers only answer about what's being asked – and nothing more. This means if you're only asking about one feature, you might miss broader issues with your product.

It's also important to note that a high CSAT score doesn't necessarily translate to customer loyalty or long-term engagement. Customers might be satisfied with certain aspects of your product but could still switch to a competitor for reasons not covered in the CSAT survey, like pricing or other features. 

Thus, while CSAT is a useful tool for understanding immediate user sentiment, it should be complemented with other feedback methods to get a full view of your long term customer loyalty. (Maybe different word for loyatly here)

### When to use CSAT surveys

CSAT surveys are most effective when you need real-time feedback after specific interactions with your product.

With this in mind, try to use a CSAT surveys after key interactions in your user journey such as:

- **After onboarding –** to understand if your onboarding was effective and engaging.
- **During [beta testing of a new feature](https://posthog.com/tutorials/beta-feedback) –**  to see if it meets your users' expectations.
- **After major app updates –** to understand understand whether your UX has improved or if there are new issues to address.
- **Before subscription renewal –** to give you a chance to address any issues beforehand.
- **After customer support interaction –** to see if customers feel their issue has been resolved.

## CES explained

"Is "product" easy to use?"

CES stands for Customer Effort Score. A good CES definition outlines it as a metric that’s used to measure customer satisfaction levels by focusing on the efforts customers make to interact with your business’ services and products.

The idea is for the survey to help you find out if customers have a hard time performing certain actions when interacting with your brand, and take the necessary actions according to the survey data to streamline processes.



The customer effort score (CES) is a metric that measures how easy it is for customers to interact and engage with your products or services.

Customer Effort Score (CES) is a metric that measures the effort required by a customer to interact with your business.
Measuring your CES allows you to identify where the problem lies, leading to less friction and better customer experience.


What could we do to make it easier to use
What makes it difficult to use? (better to ask this than easier to use, since users are bad at telling you what they want)

Measuring Customer Effort Score leads to less friction, as you can now identify where your users need help.

Are they facing issues engaging with a feature? How much effort does it take for them to contact support?

## When should you use a CES survey?
You can get the best output by using CES surveys after your customer:

Engages with a feature for the first time
Engages with customer support or success
Reaches a milestone in the customer journey
Has used the product for a long time
Here is how Nicereply uses the CES survey.

## How to measure customer effort score?
CES is measured using a survey that asks a specific question related to the user experience after engaging with parts of the product or your team. The survey either uses a numerical scale from 1 to 5 or 1 to 7 or emoticons with angry to happy faces to make it more engaging and easy for the user.

The most commonly used channels to send a CES survey are in-app and email.

### NPS vs CSAT vs CES: Which to use?

This difference is made clear with the built-in connotation of the words “satisfaction” and “recommendation.” **Satisfaction tends to be a more short-lived sentiment, while recommendation tends to be harder won and long term**. 
In short, just because someone is satisfied, doesn’t mean they’d recommend you to a friend.


xyz is better because. Then prioritize abc, then def

NPS is more broad. CSAt is more narrow and specific 
(see table in this blog - https://www.qualtrics.com/uk/experience-management/customer/csat-vs-nps/ )

WHich is short term. Which is long term e.g. NPS is more long term. CES is more short term. 

Good article: https://userpilot.com/blog/customer-effort-score/

When to use a CES vs. CSAT vs. NPS survey
Customer Effort Score (CES), Customer Satisfaction Score (CSAT), and Net Promoter Score (NPS) are the most known customer satisfaction surveys. Each of these comes with its unique benefits, and you should use all to collect different types of insights.

While the CES survey is a very useful tool, it can be too narrowly focused in a single interaction, causing you to ignore the big picture. But if you use it along with NPS and CSAT, you’ll get a better idea about the overall situation of customer experience for your product.

CES surveys
CES surveys can be used to assess the perceived effort in completing a specific task. It’s best for collecting more granular insights.

CES surveys are best sent:

After engaging with a feature for the first time
After engaging with customer support or success
After reaching a milestone in the customer journey
CSAT surveys
CSAT surveys assess the short-term satisfaction with either your product or the service offered. It can give you an overview of how happy the customer is, while CES tells you what’s making them happy or not.

CSAT surveys are best sent:

After reaching a milestone in the journey (for example, reaching the activation point)
After engaging with customer support (a most common practice in SaaS).

## How to run an NPS in PostHog

## How to run an NPS in CSAT in PostHog

## How to run a CES survey in PostHog


## Takeaways 👍

## Further reading 📖

