---
date: 2022-02-28
title: The pricing guide I never had
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["CEO diaries", "Inside PostHog"]
author: ["james-hawkins"]
featuredImage: ../images/blog/product-people.png
featuredImageType: full
---

Imagine being able to grow twice as fast with a few hours of work. Imagine the warm glow of dashboards showing annual recurring revenue growth, high five emojis in #general from your teammates, investors throwing term sheets at you like confetti etc.

Feels pretty good, right?

If you're already growing, changing the way you price has a real chance to accelerate things. 

Here is a breakdown of our counterintuitive lesson - the more we gave away for free, and the less we asked from users on day 1, the _more_ money we made.

## Don't let pricing get in the way of growth

Most companies agonize over how their product is adopted yet price on $x/month - focusing on the dollar amount, rather than the mechanism. Start by thinking about _how_ you charge.

For us, this meant making sure our pricing doesn't get in the way of adoption.

PostHog's most successful paying customers get there as follows:

* an individual engineer finds and implements the free product
* a very small team starts using us
* someone on that team needs a paid feature

So, how did we get pricing out of the way?

**A free for life tier** means users don't _ever_ have to part with cash (or user data) to use our product. We do this in two ways - (i) we offer an open source product with a huge range of features (ii) we offer a little free usage on cloud for free, forever. This means we can get into production and demonstrate value to users who need to build a business case and can't just pop in their card.

**Encourage users to upgrade**, since you need people to do exactly that! We encourage people to put in their cards - by offering our paid features for free (with a generous amount of free usage) if they do so. This lets users evaluate the paid product very easily, and it lets them upgrade with no friction if they're heavy users. This exchange feels fair to us - it helps us figure out who is serious versus playing around. Our numbers reflect that users feel the same way - over half our users enter their card details.

**No minimum spend**, so paying users can start small if they want to. This means a customer can gradually get more committed to you. If customers ask for trials, you can get them straight into a paying relationship "just keep the volume low", with a seamless way to upgrade - just use the product more. That makes it easier for customers to avoid some complex processes around pilots/proofs of concept, and it stops a jarring discussion around why someone is going from $0/month to $10k/month. Don't let your pricing generate a stressful decision point.

**No annual contracts**, unless a customer requests one. This cuts the risk down for customers, reducing the need for intensive evaluation periods. Ironically, the less commitment you ask for, the more you may get. Of course, some customers _will_ want you to do this, to lock in pricing, but don't default to this.

**Be transparent about pricing** so users don't have to 'talk to sales'. Is the best way to close a customer to signal to them that you're going to charge them as much as you can get away with? Many people think so.

**Be self serve** so users can start paying you to solve a problem they have _right now_. Defaulting to _not_ using a sales team, and providing transarent pricing, means you can get people in the moment.

## But don't lose the ability to do big contracts

* We differentiated on features
* Our usage grows with our customers' products. If we charged a flat fee, we couldn't do this so easily.

Just because it's easy to get started, doesn't mean your product has to be cheap.

## You don't have to do all these things immediately

Early on, optimize for learning. Later on, optimize for the best solution for your users.

**We didn't start with a $0 minimum**. Last summer, we worked on finding just five reference customers for our paid product (we now have X customers).

For these, we didn't offer $0 minimum - we charged $2k/month minimum. We simply couldn't support more than this, and we were already getting enough inbound interest.

**We didn't start with self-serve sales**, as we wanted to talk to users at first. This meant we grew more slowly to optimize for learning at the start. Once we had a reasonable formula, we could accelerate things by chopping out any manual sales process.

## Pricing to value is dumb

Conventional wisdom is to "price to value", which is broadly interpreted as you should charge a given customer the most you can.

This gives you no room - if the service is at all below initial expectations, the customer may churn. And given you likely don't know the precise dollar value for a given customer, you'll end up losing customers for pricing reasons, or at least being a pain to negotiate with. These are two good ways to get less growth. 

There are exceptions to this rule - relationship-driven enterprise sales, for example. But, long term, anyone pricing like this is asking to get disrupted.

## Make pricing work for your biggest customers

We implemented logarithmically-decling pricing with usage. This means something like - every time your volume goes up 10x, the incremental price decrease 5x.

## Don't try to make money off people that don't have money

This was one of our biggest lessons. We started by focussing on startups but realized our lowest churn teams were working on products that already had product market fit.

Trying to get money out of tiny startups would have been a mistake.

## We're not done yet

If you like what you're reading, you'll probably have had a peek at [PostHog's pricing](../pricing).

Before you copy paste, we've room for improvement. Here are a few things we're working on next.

* Transparent enterprise pricing. We're currently figuring out how to standardize this by talking to users.
* More clarity on about what you get if you upgrade.
* An enterprise cloud offering
* Some way of capturing market share for _extremely high volume_ but _low marginal value_ users

## The results

TODO: insert chart just showing shape of revenue growth

Enough said.

## Pricing as a product

Think of your pricing like a product - you want users to become paying customers. What problems do users have from where they are today, to becoming paying customers tomorrow?

Solve those.
