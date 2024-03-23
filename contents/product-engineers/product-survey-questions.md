---
title: How to write great product survey questions (with examples)
date: 2023-08-23
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-blog-image.png
featuredImageType: full
tags:
  - Surveys
  - User research
  - Product engineers
  - Product
crosspost:
  - Founders
  - Blog
---

Product surveys help you understand what users are thinking and feeling, but they're useless if you don't ask the right questions. In this guide, we'll cover:

1. How to set product survey goals
2. The 5 principles of good product survey questions
3. Example product survey questions you can use
4. How Amazon, Stripe, and Uber use surveys 
5. Using surveys to find product-market fit

## Why are you running a product survey?

It's tempting just to ask "What do you think of our product?" and go from there, but you won't get useful responses that way. Like [successful A/B tests](/blog/ab-testing-guide-for-engineers), product surveys need a goal, such as improving a feature, optimizing critical flows, or guiding your product roadmap.

Unlike A/B tests, however, survey goals don’t need to be specific – i.e. improving a single metric. Surveys provide open, qualitative feedback from users, so it's more important to align your survey goal with your broader product or company goals.

Setting a goal also helps you to decide how the survey runs and who it targets. For example, if your goal is improving an onboarding flow, your survey should:

1. Run soon after users complete the flow
2. Exclude long-time users who won't remember it

This ensures you only ask people who've recently completed the flow and have it fresh in their minds.

![Onboarding](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-survey-questions/onboarding.png)

Targeting users using PostHog's [surveys feature](/docs/surveys/manual) is easy because it connects to user identification you set up for product analytics. This means you can target users based on their properties, connect survey responses to real usage data, and get session replays of those same users using your product.

## The 5 principles of good product survey questions

Once you have your goal, it's time to write your question(s). These are the five principles of good survey questions:

1. **Don’t ask questions you know the answer to.** You can tell how often someone uses your product or feature by looking at usage metrics, so don't ask them. Get insights from analytics if you can. 

2. **Be specific.** Specific questions create specific answers. "How was onboarding?" or "Any feedback?" leads to general responses or non-answers.  "What about the onboarding process was confusing?" leads to specific feedback.

3. **Avoid leading questions.** Your opinion can corrupt the true feelings of your users, and make results inaccurate. "What do you love about our product?" likely generates positive responses. Use subjective language instead, such as "How do you use our product?"

4. **Respect your users.** Ask questions at the right time, keep surveys short, and make it easy to respond. A top complaint about surveys is their length. Ask users for permission to follow up.

5. **Use an appropriate format** Make it easy for the user to answer. Don’t use an open text box for a question you expect to be a yes or no. Avoid asking repeated multiple open text questions in a row.

## Product survey question examples

![Surveys](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-survey-questions/surveys.png)

With those principles in mind, here are some example product survey questions as inspiration. We've broken them down into four categories based on the type of goals they help achieve.

### 1. Usage

**Goal:** Understand how users use the product in ways that aren’t clear from the data.

- Why do you use [feature]?
- What is your use case for [feature]?
- What problem are you trying to solve?
- Why did you choose [product]?

### 2. Opinion

**Goal:** Understand what users are thinking and feeling about your product or feature.

- What’s frustrating about [feature]?
- What do you like/dislike about [feature]?
- How would you feel if you could no longer use [product]?
- How likely are you to recommend [product] to a friend or colleague?
- How easy/difficult is [product] to use?

### 3. Roadmap

**Goal:** Understand what to prioritize in your feature roadmap.

- What is missing from [product]?
- How can we improve [feature]?
- What prevents you from achieving your goal?
- How useful would [new feature] be to you?
- What new features do you want to see the most?

### 4. Comparative

**Goal:** Gather qualitative data about your competitors to position your product better.

- What similar products have you used?
- How does [product] compare to similar products you've used?
- Why did you choose [product] over alternatives?
- What features do you wish [product] would build that others have?

> **Want to run surveys?** See our tutorial on [how to create custom surveys](/tutorials/survey) with options such as open text, multiple choice, or custom components.

## How do other companies use product surveys? 

- [Amazon](https://www.eugenewei.com/blog/2018/5/21/invisible-asymptotes#:~:text=We%20had%20two,shop%20from%20Amazon) asked customers "Why didn’t you purchase more often from Amazon?" in a pop-up right after users placed their orders. They found that people hated shipping fees which led to the creation of Amazon Prime.

- [Superhuman](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit) asked "How would you feel if you could no longer use the product?" and measured the percent who answer "very disappointed" as a leading indicator of product-market fit.

- [Stripe](https://www.opinionx.co/blog/customer-problem-stack-ranking) asked questions like "What is frustrating about X?" to stack rank custom problems and prioritize improvements to their product.

- [Uber](https://uber.app.box.com/s/ilxsiqy0bkfhgum8o15n6k6bqi2rqn9c?uclick_id=4bd0d002-01d8-48cd-8064-3bb2af4847f2) asked a series of questions to all drivers including "Overall, how would you rate your driving or delivery experience with Uber in X areas" like app performance and features, then added an open text field for details.

- [Zola](https://review.firstround.com/heres-why-zola-cherishes-its-nps-detractors-as-much-as-its-promoters) sent [NPS surveys](/product-engineers/nps-vs-csat-vs-ces) every month since its launch. They focused on feedback from detractors over promoters to guide product changes.

This shows the diversity of questions, companies, and use cases for product surveys. Each of them utilized surveys to prioritize future development, monitor user satisfaction, and ultimately, make data-informed decisions to improve their product.

## Using surveys to find product-market fit

The companies above are tech giants with product-market fit, but surveys are also a critical tool for startups still searching for it.

In fact, when searching for product-market fit, surveys are often more helpful than analytics. Why? Because:

1. Analytics show you what is happening, while surveys help you understand why it is happening. 

2. Analytics are often lagging indicators of product-market fit, they improve after you have it. Surveys are leading indicators, feedback hints that you have it.

3. Surveys help you identify and prioritize the next steps to improving your product. They are more actionable than stats at the early stage.

Using levels two, three, and four of [the product-market fit game](/blog/product-market-fit-game), we can identify example questions you can use to advance to the next level:

**Validate the problem by talking to users**

- What is the problem you’re trying to solve?
- What do you currently do to solve this problem?
- What are your frustrations with the current solutions?

**Get users to use your product**

- What's your use case for our product?
- What's missing from our product?
- What prevents you from achieving your goal with our product?

**Keep users coming back**

- What is painful/frustrating about our product?
- Why did you choose our product?
- How can we improve [feature]?
- How would you feel if you could no longer use the product?

There's even a dedicated survey for finding product-market fit: the PMF Survey. Read more about the PMF Survey in our [guide to measuring product-market fit](/blog/measure-product-market-fit).

## Using your survey results

Once you [implement your product survey](/tutorials/survey) and get all the data from it, you must put it to work. You can: 

1. **Do more research** – In PostHog, it's easy to connect respondents to their usage data, or look into usage trends based on responses. You can also use the responses to [identify users for interviews](/tutorials/feedback-interviews-site-apps) and dig into details further.

2. **Start monitoring customer satisfaction** – Run repeated surveys asking the same questions to give you an idea of user perceptions over time. You can use this to track the impact of changes and identify areas requiring change.

3. **Update your product roadmap** – Finally, you can prioritize future development and make data-driven decisions. Ultimately, the goal of product tools (and PostHog) is to help you build better products. Knowing what users think about your product and what they want to see next is a great way to do that.

As an all-in-one platform, PostHog is uniquely placed to do all of the above. In addition to surveys, we also do product analytics, session replay, feature flags, and A/B testing. If this sounds useful to you, [check us out](https://app.posthog.com/signup).

## Further reading

- [In-depth: How to measure product-market fit](/blog/measure-product-market-fit)
- [10x engineers talk to users](/blog/10x-engineers-do-user-interviews)
