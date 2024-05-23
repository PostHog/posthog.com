---
title: Per-product growth reviews
sidebar: Handbook
showTitle: true
---

For products that have product-market fit and are generating revenue, we are doing monthly **per-product growth reviews**. These are separate from the [growth reviews](/handbook/growth/growth-engineering/growth-sessions) the [Growth team](/teams/growth) are doing. We recommend to do the growth reviews at the start of the month, to review the previous month. The growth reviews are attended by James (CEO), Tim (CTO), the Small Team Lead and the Product Manager. Apart from the Small Team Lead, the small team members currently don’t join the growth reviews, but all analysis is public, and they have the chance to participate async before and after the meeting. It’s the job of the Product Manager to schedule, prepare and lead the growth review.

## Objectives

The objective of the growth review is to review key product metrics and understand changes that have occurred over the preceding four weeks. By reviewing metrics on a schedule, we can spot issues faster than when reviewing them only sporadically. 

Looking at the same metrics regularly will increase our understanding how they relate to each other, whether metric changes are expected or exceptions, and will make efforts to improve them more successful.

The growth reviews should focus on analysing anomalies instead of expected metric behaviour, especially as teams become more familiar with their data.

Outside of the regular meetings, it’s the job of the Product Manager to regularly monitor these metrics, becoming an expert in their nuances. Should a metric deviate from the norm, they are responsible for presenting a well-researched explanation during the review.

## Contents

### Recurring analysis

During these meetings, we assess both input and output metrics. Input metrics, serving as leading indicators, significantly impact output metrics like revenue and retention.

Here are some examples:

- Input Metrics: Things customers care about and factors in our control, like onboarding, key product actions (such as `recording analyzed`), and performance
- Output Metrics: MRR, retention (revenue & usage), NPS score

As mentioned before, we aim to analyse the same set of metrics month over month, so we can see trends and anomalies. However, there can be cases where we decide to change a metric if it’s a better indicator of long-term success, particularly for product activation and key product actions.

We’ve found that the best way to review what is a quite long list of metrics is to combine all numbers (revenue as well as usage) in one spreadsheet with a new column for each month, and only open individual graphs where required. Below is a screenshot that shows a part of our growth review document. [Here](https://docs.google.com/spreadsheets/d/1Q_hibP9Pv4b8H_9guceKXNrTUP0B_5hWvmiM-EJ2LrU/edit#gid=541742743) is the link to the document for internal users. 

![Growth review template](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/handbook/growth-review-template.png)

### Deep dives

In each growth review, we usually do a couple of deep dives. Topics can be proposed in a preceeding growth review, by team members, or it is simply something the Product Manager finds worthwhile. Here are a couple of examples:

- Why was churn so high last month? Can we identify any reasons?
- Where in the onboarding funnel do new users struggle?
- Can we find leading indicators that predict long-term product usage? (e.g. Facebook’s 7 friends in 10 days)
- Are there any difference between [high ICP](/handbook/who-we-are-building-for) and non ICP customers in how they use the product?
- Are our 10 biggest customers happy users of the product?

## Structure

### During the meeting

- Metrics walkthrough
    - Led by PM
    - Participants note questions/comments they have
- Review of questions/comments that were made before or during the metrics walkthrough
- Walkthrough + discussion of deep dives
- If required: Ad-hoc analysis of questions that came up
- Agree on to dos for the next meeting

### Before the meeting

- PM prepares growth review
- PM shares summary + links to analysis as well as the growth review document with the participants as well as the small team, so everyone has the chance to review the document and add notes before the meeting

### After the meeting

- PM shares summary of meeting dicussion + outcome with the small team
- PM makes sure all to dos are completed by the next growth reviews

## Useful material (internal links)

- [Main growth review document](https://docs.google.com/document/d/1MgunwZ4_scm7RaEBocyQJzQUt48kTkiBX_529Do50F4/edit#heading=h.na8qqkjykso0) (Session Replay example)
- [Metrics overview spreadsheet](https://docs.google.com/spreadsheets/d/1Q_hibP9Pv4b8H_9guceKXNrTUP0B_5hWvmiM-EJ2LrU/edit#gid=541742743)
- [PostHog notebook with relevant usage graphs](https://us.posthog.com/project/2/notebooks/6FwGbwN5) (Session Replay example)
- [Metabase dashboard for per-product revenue](http://metabase-prod-us/dashboard/39-revenue-growth-by-product?product=session_replay)
