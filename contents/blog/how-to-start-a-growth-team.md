---
date: 2023-07-26
title: "How to start a growth team (as an engineer)"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ['lior-neu-ner']
featuredImage: ../images/blog/experiment-hog.jpg
featuredImageType: full
category: Product growth
tags: 
  - Guides
  - Product metrics
---

Fast-growing startups are like rocket ships. In these rocket ships, it's the job of the growth team to provide the fuel for the journey by igniting user acquisition and retention. 

In this post, we speak to [Thomas Owers](https://www.linkedin.com/in/thomasowers/), former lead software engineer at [Let's Do This](https://www.letsdothis.com/) (a Y Combinator backed startup with $80M in funding), on how he started the company's first growth team and, upon their initial success, grew the growth org into 4 teams – despite having no prior experience in working on a growth team in the first place!

## Background

Let's Do This is a marketplace for discovering and signing up for endurance events such as marathons or triathlons. 

In 2020, a new VP of product joined the team. One of their new initiatives was to create a growth team focusing on user acquisition and retention. Thomas was intrigued by this. He previously had some experience working in SEO and marketing but not in *growth* per se. Nonetheless, he jumped at the opportunity, and after a chat with the VP of product, Thomas became the first member of the growth team.

The team consisted of a few engineers, a product designer, and a data scientist, but no one really had any growth experience. Their first job was to hire a growth PM to lead the team, which they soon did. However, two months after hiring this person, it was clear they weren't a good fit and were let go. Noticing a gap in the team, Thomas stepped up to become the de facto "half PM - half tech lead" of the team.

His first step was figuring out what to do. To do this, he tapped into his network and had calls with growth experts at other startups. The advice from them was consistent:

## 1. The answer is in your data

"It's all about finding the right data," Thomas was told. Taking this to heart, they built dashboards to monitor essential metrics. These dashboards tracked channels, funnels, and user flows on the website. They used these dashboards to answer questions such as:

- Where are bookings coming from? 
- What are the most common user journeys? 
- Where do users drop off in the journey? 
- What features are the most engaging for our users? 

Once they had this data, their next focus was on finding the significant drop-offs in their user journeys and improving them. This led Thomas to the next piece of advice:

## 2. Talk to your customers and build what they want

Once the growth team knew where the drop-offs were, the next step was figuring out why they happened and what to do about it. 

In the case of Let's Do This, their target metric was *number of bookings*. They noticed a large drop-off in the signup page during the booking flow and decided to investigate. They sent emails to the customers who dropped off and offered them Amazon gift cards in exchange for a 30-minute call.

They learned from these calls that booking events like marathons is a **big deal** for their customers – they train for months for it! So they need to be confident that the event would be right for them, and this is why people would often hesitate when booking events. 

Thomas and his team brainstormed solutions to this. They came up with features to improve trust signals on the event page, as well as adding an "event save" flow that let users save an event and receive reminders about it (without having to register).

## 3. Experiment everything

Knowing what changes to make is one thing, but understanding how those changes affect your metrics is another. This led Thomas to the third piece of advice he received: Experiment *everything*. By doing so, Thomas and his team were able to build up knowledge on which strategies and features had the most impact.

During any given week, his team ran 10 or more A/B tests. Thomas created this culture of experimentation by encouraging his team to embrace a mindset of curiosity. He emphasized that **failure should not be feared but rather seen as an opportunity to learn and improve** – in fact, 80% of their experiments failed! But each one provided valuable insights.

To ensure experiments followed best practices and [avoided common mistakes](/blog/ab-testing-mistakes), their data scientist reviewed each experiment before launch – often pushing back on ones they thought would be too small or not yield significant insights.

> **New to experiments and A/B tests?** Check out our [software engineer's guide to A/B testing](/blog/ab-testing-guide-for-engineers).

## Why it's essential to define your team values

Nine months after the start of the growth team, Let's Do This was finally able to hire a PM. In Thomas's opinion, the most impactful thing they did was to create a set of team values.

These values were the team's compass: guiding decisions, behaviors, and the overall culture. They helped settle debates and disagreements and enabled the team to move faster.

Their values were:

### 1. Data over debate

By focusing on hard numbers and concrete evidence, the team could set aside biases and disagreements, leading to more effective strategies and solutions.

When data was not available, Thomas and his team would often ship a small experiment to gather data and keep the team moving forward quickly. They realized that building and learning from a bare-bones MVP is much quicker and cheaper than having frustrating debates over what to build.

### 2. Everything should be an experiment

We already mentioned the benefits of experimenting everything above, and Thomas and his team anchored this into their core values. Thomas stresses that this did not mean everything needed to be an A/B test, but rather that every feature or change would require a plan consisting of the following:

- What is the hypothesis of the change?
- Who is the change targeting?
- What metrics you will you look at?
- How is the experiment going to be set up?
- How long will it run for?
- What do you plan to learn from it?
- What are the potential risks or downsides?

This way, every decision was backed by a thoughtful strategy, not just a shot in the dark. These questions ensure that every change is purposeful, targeted, measurable, and accounted for in terms of potential impact - both positive and negative.

### 3. Deep empathy for customers

Finally, putting the user first is at the heart of how they build. 

It's possible that a feature can increase your target metrics but still have a detrimental effect on your user experience. The most famous example of this is how Booking.com applied dark patterns to increase sales by using text such as "*32 customers are looking at the same hotel as you*" or "*another person is considering booking a room at this accommodation*". They were later [fined $7.5M](https://www.gvh.hu/en/press_room/press_releases/press-releases-2020/gigantic-fine-imposed-on-booking.com-by-the-gvh) for doing this!

By putting their customer experience first, Let's Do This avoids such pitfalls – even if it means sacrificing sacrificing short term gains in their key metrics.

## Thomas's parting advice to growth engineers: Make your code changes as small as possible

Growth engineering is all about learning quickly and iterating based on your findings. It's this mindset that Thomas feels is the most important for growth engineers to have. 

He often repeated the following advice to his engineers:

> "80% of your tests will fail, so you need to get comfortable knowing your code will be deleted. Applying this in practice means reducing the scope of your changes while still maximizing insights.
>
> For example, an engineer may scope a project and say it will take 2 weeks. It's then important to challenge that and frame the question differently: Instead of asking 'How long will it take?', ask 'What can you do in only 1 week? 3 days? Half a day?". Often you'll find that you can reduce the scope of the change while still being able to validate your hypothesis.

## Further reading

- [When and how to run group-targeted A/B tests](/blog/running-group-targeted-ab-tests)
- [How to measure product engagement](/blog/how-to-measure-product-engagement)
- [The most useful product health metrics](/blog/product-health-metrics)