---
date: 2022-03-17
title: Counterintuitive lessons about our pricing
author:
  - james-hawkins
featuredImage: ../images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
tags:
  - Founders
  - Revenue
  - Sales & CS
crosspost:
  - Blog  
---

Imagine being able to grow twice as fast with just a few hours of work. Changing your pricing has a real chance to get you there. 

Here is a breakdown of the counterintuitive lesson I've learned as a cofounder at PostHog - the more we give away for free, and the less we ask from users on day 1, the _more_ money we make.

## Don't let pricing get in the way of adoption

Most software companies agonize over how their product is adopted yet when it comes to pricing, they default to charging a certain recurring amount per month. They only consider how _much_ to charge, not _how_ to charge.

We realized that our pricing shouldn't get in the way of adoption, because we don't sell top-down into companies. Instead, our most successful paying customers get there as follows:

* an individual engineer finds and implements the free product
* a very small team starts using us
* someone on that team needs a paid feature

So, how did we get pricing out of the way?

**A free-for-life tier** means users don't _ever_ have to part with cash (or user data) to use our product. We do this in two ways - (i) we offer an open source product with a huge range of features; (ii) we offer a little free usage on cloud for free, forever. This means we can get into production and demonstrate value to users who need to build a business case and can't just pop in their card.

**Encourage users to upgrade**, since you need people to do exactly that! We encourage people to put in their credit card by offering our paid features starting at $0 (with a generous amount of free usage) if they do so. This lets users evaluate the paid product very easily, and upgrade with no friction if they're heavy users. This exchange feels fair to us - it helps us figure out who is serious versus playing around. Our numbers reflect that users feel the same way - over half our users enter their card details.

**No minimum spend**, so paying users can start small if they want to. This means a customer can gradually get more committed to you. If customers ask for trials, you can get them straight into a paying relationship ("just keep the volume low"), with a seamless way to upgrade - use the product more. That makes it easier for customers to avoid some complex processes around pilots/proofs of concept, and it stops a jarring discussion around why someone is going from $0/month to $10k/month. Don't let your pricing generate a stressful decision point.

**No annual contracts**, unless a customer requests one. This cuts the risk down for customers and reduces the need for intensive evaluation periods. Ironically, the less commitment you ask for, the more you may get. Of course, some customers _will_ want you to do this, to lock in pricing, but don't default to this.

**Be transparent about pricing** so users don't have to 'talk to sales'. Is the best way to close a customer to signal to them that you're going to charge them as much as you can get away with? Many people think so. Disclaimer: we started non-transparent so we could speak to some users to figure out the right model first (and we still do this - see our non-transparent enterprise pricing)... but we make it transparent as soon as we've reasonable confidence.

**Be self serve** so users can start paying you to solve a problem they have _right now_. Defaulting to _not_ using a sales team, and providing transarent pricing, means you can get people in the moment.

## But don't lose the ability to do big contracts

* We differentiated on features
* Our usage grows with our customers' products. If we charged a flat fee, we couldn't do this so easily.

Just because it's easy to get started, doesn't mean your product has to be cheap.

Some companies with usage pricing get criticized for the escalating costs at scale. If it takes just one extra engineer to self build in a large company, you theoretically should be able to charge >$100K annually. If you've competition, it depends what they charge. 

## You don't have to do all these things immediately

Early on, optimize for learning. Later on, optimize for the best solution for your users.

**We didn't start with a $0 minimum**. Last summer, we worked on finding just five reference customers for our paid product.

For these, we didn't offer $0 minimum - we charged $2k/month minimum. We simply couldn't support more than this, and we were already getting enough inbound interest.

**We didn't start with self-serve sales**, as we wanted to talk to users at first. This meant we grew more slowly to optimize for learning at the start. Once we had a reasonable formula, we could accelerate things by chopping out any manual sales process.

## Pricing to value is short sighted

Conventional wisdom is to "price to value", which is broadly interpreted as you should charge a given customer the most you can.

This gives you no room - if the service is at all below initial expectations, the customer may churn. And given you likely don't know the precise dollar value for a given customer, you'll end up losing customers for pricing reasons, or at least being a pain to negotiate with. As a VC-backed company, I'd prefer happy customers, momentum and more growth.

There are exceptions to this rule - relationship-driven enterprise sales, for example. But, long term, anyone pricing like this is asking to get disrupted.

## Make pricing work for your biggest customers

Your biggest customers won't appreciate being gouged as their usage increases. We implemented logarithmically-declining pricing with usage. This means something like - every time your volume goes up 10x, the incremental price decreases 5x.

## Don't try to make money off people that don't have money

This was one of our biggest lessons. We started by focussing on startups but realized our lowest churn teams were working on products that already had product market fit.

Trying to get money out of tiny startups would have been a mistake.

## We're not done yet

If you like what you're reading, you'll probably have had a peek at [PostHog's pricing](../pricing).

Before you copy paste, we've room for improvement. Here are a few things we're working on next:

* Transparent enterprise pricing. We're currently figuring out how to standardize this by talking to users.
* Greater clarity about what you get if you upgrade.
* An enterprise cloud offering
* Some way of capturing market share for _extremely high volume_ but _low marginal value_ users

## Pricing as a product - results

Think of your pricing like a product - you want users to become paying customers. What problems do users have from where they are today, to becoming paying customers tomorrow?

It worked for us:

![PostHog's revenue going sharply up and to the right](../images/blog/pricing-lesson/revenue-pricing.png)

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

