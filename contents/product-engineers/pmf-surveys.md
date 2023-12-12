---
date: 2023-11-29
title: "How product-market fit surveys can ACTUALLY improve your app (with examples)"
author:
  - lior-neu-ner
featuredImage: ../images/blog/posthog-marketing/marketing-hog.jpg
featuredImageType: full
tags:
  - Product engineers
  - User research
---

https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit

In a startup, the only objective that matters before you have product-market fit, is finding product-market fit. (from https://posthog.com/founders/product-market-fit-game)




✔ Can help guide product development in the right direction
✔ Easy to break down into multiple cohorts to understand your ICP
✔ Can be systematized to improve product-market fit over time
✔ Useful for tracking how your product-market fit changes over time	
✔ Will help you understand why you do or don't have product-market fit


If you're familiar with it, jump straight to how to use it section


Vohra suggests the following:

**To measure the product/market fit of each new version of the product, you should send the survey to new users who have experienced the key value of the product.**

You need to segment users to understand the portrait of those who are most interested (users who will be very disappointed if the product ceases to exist). It is necessary to deeply explore their needs and understand what attracts them to the product.

You should also work with the feedback from users who have something holding them back from getting the maximum value from the product (users who would be somewhat disappointed if they would no longer be able to use your product). But it is important to listen only to users who share the values ​​and needs of the target audience (see the previous paragraph). If you remove the blocking elements that stop them, you will increase the conversion from new to loyal users.
Do not pay attention to the feedback of users who won’t be disappointed if they could no longer use your product. Also, do not pay attention to the feedback of users who will be somewhat disappointed if they will no longer be able to use your product but do not share the values and needs of the target audience. This is not your audience, and at this stage, there is no point in further exploring their needs.
Build a roadmap around investing in the things people already love about your product. Also focus on those people who share the values and needs of your target audience but are faced with barriers to getting the maximum value of your product. Removing those barriers should be part of your roadmap. 



## What is a PMF survey?

![NPS survey](../images/blog/pmf-surveys/pmf-survey.png)

Created by entrepreneur Sean Ellis, the core question (among others) it asks is:

"How would you feel if you could no longer use [product name]?"

- a) Very disappointed
- b) Somewhat disappointed
- c) Not disappointed

Sean [recommends](https://blog.growthhackers.com/using-product-market-fit-to-drive-sustainable-growth-58e9124ee8db) learning everything you can about the people who answer "very disappointed". With this information, you can hone your product targeting, positioning, onboarding, and even the long term product roadmap.

### How to calculate PMF score

![How to calculate PMF score](../images/blog/pmf-surveys/pmf-score.png)

Your PMF score is the percentage of "very disappointed" responses out of the total number of responses.

For example, let's say you survey `100` people. `50` people respond with "very disappointed", your PMF score would be '50 / 100 = 50%`.


### What is a good PMF score?

Based on his research of 100+ startups, Ellis believes 40% answering "very disappointed" is a strong signal of product-market fit. The more responses you get, the more reliable the signal. 

Ellis recommend a minimum of 30 responses is before the survey becomes directionally useful, and that 100+ responses is ideal.

### Drawbacks of PMF surveys

Calcuating your PMF score is not enough. You need to follow up with your users by asking more survey questions or conducting interviews. Then, the *real* insights come from segmenting their answers based on how disappointed they would be if they could no longer use your product.

Here are five follow-up questions you can ask:

1. Why did you select this answer? (after responding to the main survey question)
   
2. What is the primary benefit that you have received from our product?

3. What would you use as an alternative to our product?

4. What type of person do you think would benefit most from FYI?

5. How can we improve our product?

You may find answers to these questions surprising since how you view your product might not be how yours users do.


### When to use PMF surveys

PMF surveys are best for startups that want to understand if their product truly resonates with their target market and fulfills a genuine need. With this in mind, Ellis recommends sending the PMF survey to users that meet all the following criteria:

- Have experienced the core value-prop of your product.
- Have used your product at least twice.
- Have used your product in the last two weeks.

## How to use PMF to improve your app

Rahul Vohra, founder of [Superhuman](https://superhuman.com), famously used PMF surveys to build an [engine to find product-market fit](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit). At a high-level, here's are the steps to follow (we'll dive into his case study later [below](#case-study-superhuman)):

1. First, send the PMF survey to your users.

2. Identify your best supporters i.e., those who answered "very disappointed".

3. Paint a clear picture of who these people are by creating a [user persona](/product-engineers/how-to-create-user-personas) of them.

4. Find out why they love your product. You can do this by asking `"What is the main benefit you receive from our product"` as follow-up question in your survey.

5. Next, look at your "somewhat disappointed" users that match the same user persona as your best supporters. Of these users, focus only those who say the main benefit from your app is the same as your best supporters. 

  It's clear that your app resonates with them but something is holding them back from *loving* you.

1. Find out what's missing or annoying for them. You can do this by looking at their response to the question `How can we improve our app for you?`. By fixing this, you'll be able to turn them from on-the-fence users into fanatics! (rephrase on the fence and fanatics)

![How to improve your app with PMF survey](../images/blog/pmf-surveys/pmf-survey-steps.png)

### Case study: Superhuman


Superhuman story?


1. How would you feel if you could no longer use Superhuman? A) Very disappointed B) Somewhat disappointed C) Not disappointed

2. What type of people do you think would most benefit from Superhuman?

3. What is the main benefit you receive from Superhuman?

4. How can we improve Superhuman for you?

When email app Superhuman started using the survey in 2017, 22% of users answered "very disappointed". 52% answered "somewhat disappointed".4

After the initial survey, Superhuman created a four-step process to convert the 52% and doubled-down on what the 22% loved.

Segmenting users: They assigned user personas to everyone who responded (e.g. founder, engineer, customer success) and created a cohort of those who appeared in the 22%. In this cohort, 32% of people responded "very disappointed", and they created a more detailed Ideal Customer Profile based on these users.

Gathering feedback: They analyzed feedback from "on-the-fence" users, and asked "how can we improve Superhuman for you?" They ignored users who answered "not disappointed". The most common thing the on-the-fence users wanted? A mobile app. They did the same for their strong supporters.

Building a roadmap: Armed with this feedback, Superhuman built a roadmap of new features. Half dedicated to improvements for their "very disappointed" cohort, the other for the users they wanted to convert.

Rinse and repeat: Superhuman continued to survey users, tracking progress towards the 40% mark. The score became the primary OKR for the product team and, after three quarters, Superhuman had doubled the score to 58%.



### Slack Example
https://hitenism.com/slack-product-market-fit-survey/
 
An open research project[^3] run by Hiten Shah, co-founder of KISSmetrics, used the PMF Survey on 731 Slack users, the results showed:

- 51% responded they would be very disappointed if they couldn't use Slack
- These users believed it increased productivity and improved collaboration
- All groups said video conferencing was a must-have addition

It's no coincidence Slack has since added video conferencing.



## Further reading 📖