---
date: 2023-04-19
title: How (and why) we treat pricing like a product
author:
  - raquel-m-smith
featuredImage: ../images/blog/happy-hog.png
featuredImageType: full
tags:
  - Founders
  - Product engineers
  - Product
  - Revenue
  - Growth Engineering
crosspost:
  - Product engineers
  - Blog

---
"Pricing is important" is common knowledge – price determines profit margin, which directly or indirectly determines nearly everything else. 

What isn't common knowledge is twofold:

1. Your pricing should be as much of a product as the thing you actually market and sell
2. How to go about treating your pricing like a product

Let’s start with number 1.

## Your pricing should be a product

I feel like this statement is easy to nod along with yet difficult to grok. What does it actually mean to treat your pricing like a product? What even is a product? Isn’t everything a product?

Yes, kind of. It's a "you know it when you see it" type thing with software products. 

Here’s a rough working version of how I might define a “product”:

- Products are akin to living, breathing things that are constantly being changed and improved. New features are added, unused features are (hopefully) removed, and the last commit isn't 4 years old.

- Products are tested – definitely from a code standpoint, and hopefully from a product standpoint. 

- Products have customers who require them to do a certain job, or problem. Those customers can be external or internal, and there is some sort of exchange of value for using the product.

It’s easy to see what the products are for nearly any company – at PostHog, our analytics suite, session replay, feature flagging, and A/B testing tools are all products. They fit the definition above perfectly. 

But pricing often doesn’t fit this definition. It’s often left unchanged for years at a time, it’s not tested from a code or product standpoint, and people don’t realize that they are customers of it because it feels so dead.

This is bad. If pricing is so important to a business that it somehow directly or indirectly determines nearly everything else, we simply cannot be okay with it being dead. 

And to keep it alive, we’ve got to treat it like a product.

But how? I’m glad you asked.

> 📖 **Further reading:** How do you price multiple, integrated products? PostHog CEO, James Hawkins, explores this in [What we've learned about multi-product pricing (so far)](/blog/multi-product-pricing)

## How to treat your pricing like a product

### 1. Hire or assign a team to own pricing
A product without an owner is as good as dead. Put someone – or a team of someones – in charge of your pricing and make it a significant portion of their responsibility. If the owner doesn’t have enough bandwidth to work on it, we’re essentially without an owner.

At PostHog, the Growth team (hi! 👋) owns pricing, and I’d estimate it encompasses more than half of our overall responsibility.

### 2. Understand who your customers are and their needs
Every product has customers, and your pricing product is no different. Who the customer is varies by business, but it essentially comes down to one question: which people need the pricing (and its tooling) to serve their specific needs?

For PostHog, our pricing product’s customers are:

- **Our users (external)**, who need to clearly see and understand our pricing model so they can decide if they want to sign up and subscribe.

- **Other product teams (internal)**, who need a system that makes it easy and reliable for them to track usage, gate features, subscribe new customers, upsell, etc.

- **Customer success (internal)**, who need a system that enables them to make custom packages for enterprise customers, anticipate invoices, manage accounts, and more.

It’s also important to determine how each customer will "pay" for or transfer value to your product. Since people aren’t paying for pricing as a product (unless, of course, the product you sell is pricing as a product) then the value transfer is murkier. It often comes down to usage, or even revenue on the other products. Whatever it is, understand and track it so you can gauge the usefulness of your efforts.

> 📖 **Further reading:** Creating an Ideal Customer Profile is one of the most important things we've ever done at PostHog, see [How we found our Ideal Customer Profile](/newsletter/ideal-customer-profile-framework) for more.

### 3. Build your tooling to satisfy the customers’ needs

Depending on the complexity of your business, and the other products you sell, the tooling might be simple or rather elaborate. Sometimes just a basic Stripe integration will do; other times, like at PostHog, it’s a large service that runs all sorts of important business logic to keep it all tracking properly, in sync, and up-to-date. 

Of course, based on my definition above, this tooling needs to be treated like a proper product by the engineers themselves. It needs to be tested, reliable, and have hands on it all the time. Code without testing or maintenance is, well, dead. And products that are dead are not products.

### 4. Build the tooling for experimenting

Nearly any good software product today wasn’t just built once and assumed to be the best possible version. There are always things to try. For a pricing product, this can be experimenting with things such as:

- How products and features are showcased on your pricing page
- What is included on the free version vs paid version
- How much to charge for each thing
- Letting users trial your paid product before buying

Trying these out can happen in one go (switch everyone over and see how it goes!), or in a proper experiment, with one cohort seeing version A and another cohort seeing version B. 

When we have the volume needed to run a proper experiment we almost always go that route – it allows us to see how much of an impact our changes make. For instance, we tested a more detailed feature comparison on our billing upgrade page and saw an over 30% improvement in conversion to paid over the control. Running experiments like this is super exciting – and helps us catch changes that might actually be detrimental, too.

Whether you just roll out new versions or run proper experiments with multiple variants, testing out different versions of your pricing will help you come up with the most efficient way for you to acquire new users and convert them to paying customers.

### 5. Repeat steps 2-4

Congrats! You built the first round of tooling for your pricing product. Great, now it’s time to go back to the customers, see how it’s working for them, and ask what else they need. You ran an experiment and got some results? Cool, time for another one!

Any good product manager will tell you that a product is (almost) never done. There are still more customers to talk to, the industry is always changing, your business is always changing. When you treat your pricing like a product, you need to have this mindset as well – rinse & repeat, over and over again.

## How "pricing as a product" works at PostHog

We've been on this journey for close to a year now. It started with realizing that our pricing wasn't serving the needs of both our internal and external customers, then hiring a growth engineer to own it. 

We built a completely new billing service from the ground up to satisfy those needs, and have gone through multiple iterations of how we price and sell to customers to align with our company strategy.

Thus far we've run some experiments on the pricing page, but the next step for us is to fully leverage feature flags and experiments in PostHog to try out different pricing models on different customers, simultaneously. 

We're excited to see how this really unlocks the potential in our pricing product to both give more value to our customers, while also getting more value ourselves. 

After all, when customer needs are met, this kind of mutually beneficial magic is what happens.

### Further reading

- [Counterintuitive lessons about our pricing](/blog/pricing-lessons): Imagine being able to grow twice as fast with just a few hours of work. Changing your pricing has a real chance to get you there. PostHog CEO, James Hawkins, shares what he's learned.

- [10x engineers talk to users](/blog/10x-engineers-do-user-interviews): PostHog's Head of Product, Luke Harries, on why "best way to become a 10x engineer is to zoom out and solve for user impact."
