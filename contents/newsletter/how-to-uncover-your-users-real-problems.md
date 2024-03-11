---
title: How to uncover your users' real problems
date: 2023-09-27T00:00:00.000Z
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/prodhog.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Product engineers
  - Blog
---

Users are like kids at Christmas. They say they really want this one thing, but that one thing won't keep them happy for long. 

What will make them happy? Solving their unspoken problems, the problems they can't quite articulate. And the best way uncover them is to ask really good questions.

In this issue, we share what we've learned about asking user's questions, and what you can learn from how companies like Amazon, Stripe, and Uber do it.

**This week's theme is:** Discovering your way to a successful product

> This post was first published in our Substack newsletter, [Product for Engineers](https://newsletter.posthog.com/). It's all about helping engineers and founders build better products by learning product skills. We send it (roughly) every two weeks. [Subscribe here](https://newsletter.posthog.com/subscribe).

## 1. Start with “who” not “what” 🙋

Why? Because even great questions are useless if you're asking the wrong people.

Emmett Shear, former CEO of Twitch 👾, [recommends tailoring your approach](https://www.ycombinator.com/library/JQ-how-to-start-a-startup-talking-to-users/) based on the stage of your product:

- **When you're forming a product**, expand your circle. Talk to the broadest group you possibly can. For example, if you're creating a product for college students, you should talk to college IT administrators and parents as well. Students might be the user, but they probably won't be the buyer (because they have no money 😔).

- **As the product develops**, figure out your target user (aka [ideal customer profile](/newsletter/ideal-customer-profile-framework)) and ask them. Asking the wrong user can lead you in the wrong direction. Twitch, for example, focused on talking to and building for streamers rather than viewers because they realized streamers were their real customers.

If you think you're asking the right questions but getting poor answers, reconsider who you're talking to.

> **Read [The Product-Market Fit Game](/blog/product-market-fit-game), our guide to finding product-market fit, for more**

## 2. Find the right time and place ⏳

Product discovery questions are like real estate. Location is often the most important factor. Getting it right can make all the difference between useful and useless answers.

Take [Amazon](https://www.eugenewei.com/blog/2018/5/21/invisible-asymptotes#:~:text=We%20had%20two,shop%20from%20Amazon) as an example of how to do it right. They asked customers "Why don't you purchase more often from Amazon?" in a pop-up right after users placed their orders. They found that people hated shipping fees, which led to the creation of Amazon Prime.

The lesson here? The best time to time ask a question is when users have the context to answer well.

Let's apply that logic to an onboarding survey…

![Onboard](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/newsletter/how-to-uncover-your-users-real-problems/onboard.jpeg)

It makes no sense to ask users about their onboarding experience after they've become a regular user. They've probably forgotten what it was like, or their opinion is based on experiences unrelated to onboarding.

Instead, ask them shortly after they've completed a key onboarding action (e.g. a product tour), or in the early stages of exploration, when the context is still fresh in their minds.

## 3. Get below the surface 🧐

Asking surface-level questions like “what do you think of our product?” or “what feature is missing from our product?” might seem valuable, but they have a hidden cost.

Surface-level questions create the **XY problem**. Answers provide solutions (X), but those solutions don't solve the underlying issue (Y). Digging deeper into [jobs to be done](https://jtbd.info/2-what-is-jobs-to-be-done-jtbd-796b82081cca) helps prevent this.

![Iceberg](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/newsletter/how-to-uncover-your-users-real-problems/ice.jpg)

To discover your user's jobs to be done and pain points, **Y Combinator** recommends asking questions like:

- Tell me how you do X today?

- What is the hardest thing about doing X?

- Why is it hard?

- How often do you have to do X?

- Why is it important for your company to do X?

- What do you do to solve this problem for yourself?

YC's poster child Stripe takes this to heart. When prioritizing what to build, **Stripe** teams:

1. Focus on the problems of users.

2. Turn questions into problem statements

3. Ask users to stack rank those problems.

Finally, they use the ranking to figure out what to build next.

> **Read [How Stripe Validates New Product Ideas](https://www.opinionx.co/blog/customer-problem-stack-ranking) for more on how it stack ranks user problems.**

## 4. Make questions easy to answer 🙌

Assume your user has little time and attention to answer your questions. How do you maximize it?

- **Don't ask unnecessary questions.** Try answering your question through analytics and research first.

- **Make it easy to respond.** Give specific options or use surveys. Not everything needs to be a free text form, or user interview.

- **Be precise.** Rewrite and edit your questions. Use good grammar.

As a programmer, [Julia Evans](https://jvns.ca/blog/good-questions/) says “good questions are easy to answer.”

[Uber](https://uber.app.box.com/s/ilxsiqy0bkfhgum8o15n6k6bqi2rqn9c) achieves this by combining quick and easy multiple choice questions with open text follow-ups:

![Uber](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/newsletter/how-to-uncover-your-users-real-problems/uber.jpeg)

**Bottom line:** “What could we improve?” is an easy question to ask, but it doesn't encourage good responses. Every ounce of effort you spend making your question east to answer will lead to a similar improvement in responses.

> **Read [How to write great product survey questions](/blog/product-survey-questions) for example questions you can use.**

## 5. Ask repeatedly 🔁

Products change. There's no reason you can't ask the same questions repeatedly to ensure you are on the right track. In reality, many successful companies do this.

[Superhuman](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit) asked its users "How would you feel if you could no longer use the product?" and measured the percentage who answered "very disappointed".

They created a loop of iterating new features and then asking again until 40% of users responded “very disappointed” – a key indicator of product-market fit.

> **Read [How to measure product-market fit](/blog/measure-product-market-fit) for more on Superhuman's story, and several other ways to measure product-market fit.**

Another example is Zola, an online wedding registry, which has sent Net Promoter Score (NPS) surveys every month since its launch.

Zola's team focused on feedback from detractors over promoters to guide product changes. They found building features for detractors turned them into early adopters. On top of other successes, this led to a 50% increase in Zola's NPS.

> **Read [Why Zola Cherishes its NPS Detractors as Much as its Promoters](https://review.firstround.com/heres-why-zola-cherishes-its-nps-detractors-as-much-as-its-promoters) for more.**

## 6. Share what you learn. Make a plan 📝

All this discovery work is wasted if it doesn't benefit you and your team. Once you've collated your feedback, you need to:

### Share discoveries with those who can benefit
- Build insights, dashboards, [notebooks](/docs/notebooks) to combine responses and analytics.

- Create [shareable interview cards](https://posthog.com/blog/interview-snapshot-guide) to make feedback easy to digest for your team and encourage debate about improvements.

### Decide on next steps
- Use [weighted scoring](https://medium.com/walmartglobaltech/product-management-101-8-steps-to-design-better-products-b3a4436da27b) to evaluate impact, reach, effort, risk, and confidence in potential new features and prioritize accordingly.

- [Stack rank problems](https://www.opinionx.co/blog/customer-problem-stack-ranking) and potential solutions.

- Repeat the process. Ask more questions. Run more surveys and user interviews.
