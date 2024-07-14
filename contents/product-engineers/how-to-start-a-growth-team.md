---
date: 2023-08-09
title: "How to start a growth team (as an engineer)"
author: ['lior-neu-ner']
featuredImage: ../images/blog/athlete-hog.jpeg
featuredImageType: full
tags: 
  - Product metrics
  - Growth engineering
  - Product engineers
  - AB testing
crosspost:
  - Blog  
---
[Thomas Owers](https://www.linkedin.com/in/thomasowers/) knew nothing about [growth engineering](/blog/what-is-a-growth-engineer) when he started the first growth team at [Let's Do This](https://www.letsdothis.com/) – a Y Combinator startup with $80M in funding.

But, 2 years later, his team was so successful, the growth org had grown into four individual teams following their lead. We spoke to Thomas about navigating his journey from software engineer to growth team leader, and what it takes to build a successful growth team. Here’s what we learned.

## 1. The answer is in your data

Thomas' first move was to talk to growth engineers at other startups and they all said the same thing: "It's all about finding the right data." 

Taking this to heart, his team built dashboards to monitor essential metrics, funnels, and user flows impacting acquisition and retention. 

Let's Do This is a marketplace for discovering and signing up for endurance events, such as marathons or triathlons, so they used the dashboards to answer questions like:

- Where are bookings coming from? 
- What are the most common user journeys? 
- Where do users drop off in the journey? 
- What features are the most engaging for our users? 

Once they had this data, their next focus was on finding the significant drop-offs and improving them. This led Thomas to the next piece of advice...

## 2. Talk to your customers. Build what they need

Once the growth team knew where the drop-offs were, the next step was figuring out why they happened and what to do about it. 

In the case of Let's Do This, their target metric was *number of bookings*. They noticed a large drop-off during the booking flow and decided to investigate. They sent emails to the customers who dropped off, offering Amazon gift cards in exchange for a 30-minute call.

They learned that when booking events like marathons, their customers need to be confident that it's right for them – they spend months training for them, after all. This lead to hesitation – "is this event _really_ the right one for me?"

Thomas and his team brainstormed solutions. Eventually, they built features to improve trust signals, and this significantly increased their bookings.

## 3. Experiment everything

Knowing what changes to make is one thing, but understanding how those changes affect your metrics is another. This led Thomas to the third piece of advice he received: Experiment *everything*. Each experiment builds knowledge on which strategies and features have the most impact.

For this reason, Thomas and his team ran 10 or more A/B tests each week! 

## 4. Embrace failure

The ability to *experiment everything* is only possible if each engineer is empowered to make mistakes. 

Thomas embedded this into the team culture by emphasizing two key points:

1. An experiment _isn't a failure_ if it doesn't produce the results you wanted or expected.
2. An experiment _is only a failure_ when the team doesn't learn anything from it. 

This created a safe space for engineers to explore, and ultimately resulted in a more innovative team.

## 5. Check yourself before you wreck yourself

Nothing slows a growth team down like running and waiting for pointless experiments – especially if they're never going to lead to significant results.

To ensure their experiments [avoided common mistakes](/blog/ab-testing-mistakes) and followed [best practices](/product-engineers/feature-flag-best-practices), their data scientist reviewed each experiment before launch – often pushing back on ones they thought would be too small or not yield significant insights.

> **New to experiments and A/B tests?** Check out our [software engineer's guide to A/B testing](/blog/ab-testing-guide-for-engineers).

## 6. Successful growth teams define their values

In Thomas's opinion, one of the most effective things they did was to create a set of core team values. They were the team's compass, guiding decisions, settling debates, and driving overall culture. They were:

### i) Data over debate

By focusing on hard numbers and concrete evidence, you can set aside biases and focus on effective solutions.

If data was not available, Thomas and his team would often ship a small experiment to gather data and keep the team moving forward. They realized that building and learning from a bare-bones MVP is much quicker than having frustrating debates over what to build.

### ii) Everything should be an experiment

We already mentioned the benefits of experimenting everything, and Thomas and his team anchored this into their values. Thomas stresses that this did not mean everything needed to be an A/B test, but rather that every feature or change should have a plan:

- What is the hypothesis of the change?
- Who is the change targeting?
- What metrics will you look at?
- How is the experiment going to be set up?
- How long will it run for?
- What do you plan to learn from it?
- What are the potential risks or downsides?

This way, every decision was backed by a thoughtful strategy – not just a shot in the dark. 

### iii) Deep empathy for customers

It's possible to achieve your goal yet harm your user experience. The most famous example of this is from **Booking.com**. They increased sales by showing anxiety-inducing messages, such as "*32 customers are looking at the same hotel as you*" and "*another person is considering booking a room at this accommodation*". Thankfully, they stopped this, but it took a [$7.5M fine](https://www.gvh.hu/en/press_room/press_releases/press-releases-2020/gigantic-fine-imposed-on-booking.com-by-the-gvh) to do so!

Let's Do This chose to avoid such pitfalls by putting their users at the heart of how they build – even if it meant sacrificing short-term gains.

## Thomas's Golden Rule: Make your code changes as small as possible

Growth engineering is all about learning quickly and iterating based on your findings. 

In Thomas' view, good growth engineers "need to get comfortable knowing their code will be deleted" because "80% of your tests will fail."

Applying this in practice means reducing the scope of your changes *while still* maximizing insights:

"An engineer may scope a project and say it will take 2 weeks. It's important to challenge that and frame the question differently.

"Instead of asking 'How long will it take?', ask 'What can you do in only 1 week? 3 days? Half a day?'. Often you'll find that you can reduce the scope of the change while still being able to validate your hypothesis".

## Further reading

- [When and how to run group-targeted A/B tests](/blog/running-group-targeted-ab-tests)
- [What is a growth engineer? (And why they're awesome)](/blog/what-is-a-growth-engineer)
- [The most useful product health metrics](/blog/product-health-metrics)