---
title: How we do dogfooding at PostHog (with examples)
date: 2024-06-28
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/dogfood_0015adbb54.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
  - Feature management
crosspost:
  - Blog
---

Dogfood is not on PostHog's roadmap, but it sure does shape it. 

Dogfooding is the process of using your product internally. This helps you to get fast feedback, ship a higher-quality product, and maintain customer empathy.

At PostHog, we dogfood a lot and find it works well because we're our [own ideal customer](/newsletter/ideal-customer-profile-framework). We  build tools for companies that look like ours. Not all companies are in this situation though, meaning dogfooding can lead you in the wrong direction if you aren't careful.

To help you figure out if dogfooding is right for your company and how to do it well, this post covers our experiences, how we implement dogfooding, and pitfalls to avoid.

## What does dogfooding look like at PostHog?

As a high-growth startup making a tool for high-growth startups, we end up using our product a lot. Dogfooding doesn't just happen with the product we've already built, but also what is in progress too. In this way, it is part of our entire product development process.

To give you an idea of how dogfooding shapes PostHog, here are some examples:

### How booking user interviews led to surveys

Our product team found booking user interviews laborious. They needed to identify users, send them emails, and coordinate a time before getting any feedback. Across hundreds of interviews, this takes up a significant amount of time.

To solve this, they decided to leverage our site app functionality to [build a popup](/tutorials/feedback-interviews-site-apps) that used feature flags to target the right users with a button to book a meeting in Calendly.

![Surveys](https://res.cloudinary.com/dmukukwp6/image/upload/survey_c020075d73.png)

This saved them a massive amount of time while also validating an important use case for what is now [surveys](/surveys). In this way, dogfooding helped us both at that moment and guided our roadmap in the longer term.

### HogQL maximalism

For a time, you couldn't query your PostHog data directly with SQL. That changed with [HogQL](/docs/hogql), our version of SQL (and an entire querying service). 

The development of HogQL was largely driven by dogfooding for two reasons:

1. **It's advanced.** Because HogQL is a tool for power users, it was tougher to get initial adoption. We were the primary ones using it meaning we were the ones finding issues and limitations. 

2. **We use it elsewhere.** HogQL is now the underlying query engine for all insights. Improvements to functionality and performance we created internally end up benefiting external users too.

For example, HogQL was missing `OFFSET` support until Michael discovered that limitation when wanting to calculate the average number of times a dashboard is viewed. 

![Michael dogfooding](https://res.cloudinary.com/dmukukwp6/image/upload/dogfood_2b527fee65.png)

### Everyone needs to query external sources

Like any startup, we rely on payment processes and CRMs to sell our product and communicate with users. These create and capture useful data, but don't provide good ways to combine and query that data. We needed to rely on a mixture of native, monitoring, and business intelligence tools to accomplish our goals. 

Improving this is the inspiration behind the data warehouse. We realized if we wanted to be the source of truth for customer data, we needed to get this data into PostHog. Now, we provide the ability to [link](/docs/data-warehouse/setup) and [query](/docs/data-warehouse/query) data from sources like Stripe, Hubspot, and S3. 

Beyond inspiration, dogfooding also guides the development of the data warehouse:

- The first connectors were for the tools we use (Stripe, Hubspot, Zendesk).
- Functionality is guided by the queries our engineering, sales, and product teams want to write (and write elsewhere)
- A majority of feedback about issues and usability came from internal teams during alpha.

![Data warehouse feedback](https://res.cloudinary.com/dmukukwp6/image/upload/me_7c76189301.png)

## How to dogfood well

From our experiences with dogfooding, we've learned a bit about how to do it well. Importantly, we've created a culture where dogfooding is expected and encouraged. We've also put into place the tools and processes that help us get good feedback and act on it, improving our product.

To do this yourself is a two step process:

### 1. Create a culture of dogfooding

A hot take: forcing your team to dogfood your product is a bad sign. This means there is a fundamental mismatch between the work your team wants to do and the product you are building. There are a few potential reasons for this:

1. Your team isn't the ideal user for your product.
2. Your product isn't good enough for your team to use.
3. You haven't created the right culture to support dogfooding.

The first two are major problems beyond the focus of this article (they require a rethinking of your entire strategy). The third is the most common and fixable.

To create a culture of dogfooding, first, you need buy-in from the top. The responsibility to dogfood does not belong to one person or team. The entire organization needs to be bought into using the product, providing feedback, and continuously improving the product. 

Everyone at PostHog, from the cofounders to the marketing team, uses PostHog and provides feedback on their usage.  

![Tim dogfooding](https://res.cloudinary.com/dmukukwp6/image/upload/cofounder_ec648e21d3.png)

For feedback is critical to the dogfooding process and to make people comfortable with giving feedback, you need trust.  Your team must trust each other to give and [receive feedback](/handbook/people/feedback). Assume positive intent, acknowledge it, and do with it what you want. This might be uncomfortable, but dogfooding doesn't work without it.

### 2. Implement dogfooding into product development

After creating the culture to support dogfooding, it must be integrated into your process for improving your product. When done right, it can have an impact on multiple stages from ideation to testing to post-release. 

We've found three details are key to getting the most out of dogfooding:

1. **Treat your team like a customer.** [Interview them](/newsletter/talk-to-users), ask them for feedback on what you built, use this to guide your next iteration, and repeat. For the best results, go out of your way to ask for feedback and make your ask specific.

2. **Create tighter feedback loops.** At PostHog, we have [product engineers](/blog/what-is-a-product-engineer) who take full ownership of a product. They both figure out what to build and build it. This means they dogfood and can implement the improvements from dogfooding, iterating rapidly. If you never action feedback, your dogfooding is going to waste.

3. **Separate deployment from release.** Doing this enables you to dogfood a change without releasing it to all your users. Using [feature flags](/feature-flags), you can [test in production](/product-engineers/testing-in-production), fix issues, and ship a polished product to users. 

## The benefits of dogfooding

So after all of this work to get dogfooding right, what do you actually get out of it?

- **Fast feedback.** Getting feedback from your teammates is a lot easier and faster than getting it from users. This guides product development and helps you iterate rapidly.

- **Reveals issues and bugs.** When we dogfood, we almost always discover usability issues or bugs that we can fix before they impact user experience. This helps you ship a polished product.

- **Increases product knowledge.** Our whole team uses PostHog. This helps us fix cross-functional issues, discover use cases, and promote PostHog better.

- **Spirit.** If your product is good, it helps your team become confident in it. If your product is bad, it motivates the team to make it better. As a dramatic example of this, Apple banned typewriters. They were either going to manifest the future of computing or die trying.

![Apple](https://res.cloudinary.com/dmukukwp6/image/upload/apple_fd647f303d.png)

## Avoid falling into the dog bowl (aka the pitfalls of dogfooding)

If you dogfood too much, you might forget what the taste of real food is like. You think you are building what users want, but in reality, are only building you want. To ensure this doesn't happen, here are some pitfalls to avoid: 

- **Dogfooding as a silver bullet.** Dogfooding shouldn't be the only strategy you use to develop your product. Your goal should be to build something your users want, not just yourself. To do this, talk to users, research your industry and competitors, build, get feedback, and iterate.

- **Overly dogfooding.** Dogfooding too much can slow you down. You must be comfortable with shipping features before they are fully ready. Real-world feedback is the most valuable.

- **Maintain a view for the bigger picture.** Because dogfooding makes giving feedback easy, there ends up being a lot of it, whether it is valuable or not. This can cause teams to focus on small, easy fixes rather than big important ones.

- **Biases.** Your team is (hopefully) a tiny portion of users representing a small portion of use cases. Relying on dogfooding can bias you towards these use cases and limit the full potential of your product. Not everyone is an engineer building in B2B SaaS.

If you decide that dogfooding is right for you and manage to avoid the pitfalls listed here, you've unlocked a superpower for getting fast feedback and building a better product. We know this because we've heavily relied on it and recommend leveraging it when possible.

## Further reading

- [How we build features users love (really fast)](/product-engineers/measuring-feature-success)
- [How we do trunk-based development (and why you should too)](/product-engineers/trunk-based-development)
- [How we designed our company for speed](/founders/how-come-we-ship-so-much)