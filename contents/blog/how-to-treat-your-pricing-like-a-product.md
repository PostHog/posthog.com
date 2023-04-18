---
date: 2023-04-09
title: How to treat your pricing like a product and why it matters
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - raquel-m-smith
featuredImage: ../images/blog/happy-hog.png
featuredImageType: full
category: 
tags:

---
It’s common knowledge that the way you price your product is extremely important to your business - price determines profit margin, which directly or indirectly determines nearly everything else. 

What’s less common knowledge is twofold:

1. The fact that your pricing should be just as much of a product as the thing you actually market and sell.
2. How to go about treating your pricing like a product.

Let’s start with number 1.

## Your pricing should be just as much of a product as the thing you actually market and sell.

I feel like this statement is easy to nod along with yet difficult to grok. What does it actually mean to treat your pricing like a product? What even is a product? Isn’t everything a product?

Yes, kind of. But we’re talking specifically about software products, and I bet you know them when you see them - even if you’re not paying attention to the specifics. 

Here’s a rough working version of how I might define a “product”:

- Products are akin to living, breathing things that are constantly being changed and improved. New features are being added, unused features are (hopefully) being removed, and the last commit wasn’t 4 years ago.
- Products are tested - definitely from a code standpoint, and hopefully from a product standpoint. 
- Products have customers who require them to do a certain job. Those customers may be external or internal and there is some sort of exchange of value for using the product.

For nearly any company it’s easy to see what the products are - for PostHog our Analytics suite, Session replay, Feature flag, Experimentation, and Apps tools are all products. They fit the definition above perfectly. 

Pricing is often something that doesn’t fit this definition. It’s often left static and unchanged for years at a time, it’s not tested from a code or product standpoint, and people don’t even realize that they are customers of this thing because it feels so dead.

This is bad. If pricing is so important to a business that it somehow directly or indirectly determines nearly everything else, we simply cannot be okay with it being dead. 

And to keep it alive, we’ve got to treat it like a product.

But how? I’m glad you asked.

## How to treat your pricing like a product. 

### 1. Hire or assign a team to own pricing
A product without an owner is as good as dead. Put someone - or a team of someones - in charge of your pricing and make it a significant portion of their responsibility. If the owner doesn’t have enough bandwidth to work on it, we’re essentially without an owner.

At PostHog, the Growth team (hi!) owns pricing, and I’d estimate it encompasses more than half of our overall responsibility.

### 2. Understand who your customers are and their needs
Every product has customers, and your pricing product is no different. Who is the customer will vary by business, but it essentially comes down to one question: which people need the pricing (and its tooling) to serve their specific needs?

For PostHog, our pricing product’s customers are:

- Our users (external) - they need to clearly see and understand our pricing model so they can decide if they want to sign up and subscribe.
- The other product teams (internal) - they need a system that makes it easy and reliable for them to track usage, gate features, subscribe new customers, upsell, etc.
- Customer success (internal) - they need a system that allows them to make custom packages for enterprise customers, anticipate invoices, manage accounts, and more.

It’s important to also determine how each customer will transfer value to your product. Since people aren’t paying for pricing as a product (unless, of course, the product you sell is pricing as a product) then the value transfer can be much more murky. It often comes down to usage or even revenue on the other products. Whatever it is, understand and track it so you can gauge the usefulness of your efforts.

### 3. Build your tooling to satisfy the customers’ needs

Depending on the complexity of your business and the other products you sell, the tooling might be simple or rather elaborate. Sometimes just a basic Stripe integration will do; other times, like at PostHog, it’s a fairly large service that runs all sorts of important business logic to keep it all tracking properly, in sync, and up to date. 

Of course, based on my definition above, this tooling needs to be treated like a proper product from the engineers themselves. It needs to be tested, it needs to be reliable, and it needs to have hands on it all the time. Code without testing or maintenance is, well, dead. And products that are dead are not products.

### 4. Build/integrate the tooling for experimenting

Nearly any good product built today wasn’t just built once and assumed to be the best possible version. There are always things to try. For a pricing product this can be experimenting with things such as:

- How products and features are showcased on your pricing page
- What is included on the free version vs paid version
- How much to charge for each thing
- Letting users trial your paid product before buying
- Etc

Trying out these things can either happen in one go (switch everyone over and see how it goes!) or in a truly experimental format with one cohort seeing version A and another cohort seeing version B. Either way, testing out different versions of your pricing will help you come up with the most efficient way for you to acquire new users and convert them to paying customers.

### 5. Repeat steps 2-4

Congrats! You built the first round of tooling for your pricing product. Great, now it’s time to go back to the customers and see how it’s working for them and what else they need. Maybe you ran an experiment and got some results? Cool, time for another one!

Any good product manager will tell you that a product is (almost) never done. There are still more customers to talk to, the industry is always changing, your business is always changing. When you’re treating your pricing like a product, you need to take this mindset as well - rinse & repeat, over and over again.

## How this works at PostHog

We've been on this "pricing as a product" journey at PostHog for close to a year now. It started with realizing that our pricing wasn't serving the needs of both our internal and external customers, then hiring a growth engineer to own it. We built a completely new billing service from the ground up to satisfy those needs and have gone through multiple iterations of how we price and sell to customers in order for it to align with our company strategy.

Thus far we've run some experiments on the pricing page, but the next step for us is to fully leverage feature flags and experiments in PostHog to try out different pricing models on different customers, simultaneously. We're excited to see how this really unlocks the potential in our pricing product to both give more value to our customers while also getting more value ourselves. After all, when customer needs are met, this kind of mutually beneficual magic is what happens.
