---
date: 2022-01-09
title: Things I learned last year
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["CEO diaries"]
author: ["james-hawkins"]
featuredImage: ../images/blog/ceo-diary.png
featuredImageType: full
---

2021 went well for us - especially given we're not even two years old yet.

- 7,000 customers across our range of products (!)
- 800% increase in organic traffic (!)
- 300% net revenue retention (!)
- 0.41 years CAC payback (!)

What we learned - good and bad...

# We let people go when we had to, but we didn't re-hire quickly when this happened

We hired world class people, and we let people go quickly when it wasn't working (paying them much greater severance than normal when this happened).

Tim and I believed that people working with great people is a huge motivator - talent compounds is one of our values. Feedback from our team surveys have since confirmed our team value this. 

However, when things didn't work out, we often didn't re-hire for the role quickly, or at all. We got scar tissue! We must've been hiring for the role in the first place for a reason.

The end result? Lost time - and that has a lot of opportunity cost. There must have been a reason to hire in the first place.

# Acheived focus by making it outcome-based

It was midway through last year when it clicked.

We had thousands of companies deploying, but some companies just felt like they were a better fit than others. PostHog's platform is exceptionally broad - we have multiple traditional products built in. We had doubled the team size too. Those things combined makes knowing where to focus particularly challenging!

We were getting a lot of inbound paid demand, so we felt we should figure out how to get product market fit for our paid product. This would force us to have a clear split between our free and paid products.

We did this:

* Aimed to get 5 reference customers.
  * Reference = paying list price, genuinely delighted, using the product a lot
* Wrote out what they had in common along the way
  * Needs
  * Haves

# How to do product

Speaking as a founder, product can feel really unappealing to invest in.

I mean - isn't it all about prioritizing, and aren't the founders supposed to do that?

At our first offsite in 2020, we ran a 360 feedback dinner. This is quite a unique experience:

- Everyone sits around a table
- You pass from one person to the next
- The person who's turn it is, gets feedback from everyone else in the team
- This feedback is moderated to be 70% constructive

Tim and I were both given the feedback that we've scar tissue around product done badly in our previous careers, and it's causing us not to build this discipline at all into the company.

Compellingly, Paolo - one of our engineers at the time, had proactively acted like a product manager. He gathered deep feedback from dozens of users, which he summarised at the start of the offsite to everyone. It was incredibly useful (and influenced us going board with our product, giving us a much better strategy).

We thought about it, and realized this was something we needed to act on. We put Paolo into a full time product role, and we hired Marcus into a VP Product role in 2021. The focus they gave us, was a key part of getting to five reference customers.

# How to do design

I often looked up to other companies, blown away by the quality of design work - from aesthetics to product. Tim and I could get something built to an ok standard very very fast, but it never got to the level others were achieving.

We learned that great designers for early stage design teams:

- iterate very quickly
- are quite broad - yes this means they may be able to code _and_ work in Figma (although we found many people believe finding people like this is unicorn-hunting

The implementation also matters. We didn't just think about design for our platform, we invested heavily in posthog.com - our marketing and docs website, which we also treat as a product. This was justified because it's our storefront - we don't do any outbound sales.

# Having a founder do a bunch of the first sales was pretty useful

We had to make a lot of changes to get the first deals done, in a very short space of time.

# How to really focus on those you build for

Open source gives you lots of growth. Last time I checked, 7,014 companies use PostHog.

This makes it hard to know who to listen to.

We released our paid products this year.

# Our cloud product has been bizarrely successful

We've had 

# Bus transfers in Portugal = hell no

If you ever do a trip to Portugal, avoid lots of bus transfers.
=======
categories:
    - CEO diaries
author: ["james-hawkins"]
featuredImage: ../images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
---

"How come your website is so nice?"

I've been asked this three times today, so I thought I'd explain it from a founder's perspective. This is what I've learned so far.

## Figure out if design matters

PostHog follows bottom-up adoption. This means our users find us online, install, hopefully add their team and then reach out to buy our paid version. We're very different from our competitors in this way.

This means that design is key. Our website and product are our storefront - not a sales team. It needs to be one of our core competencies.

Good design for product-led companies on your "marketing" website (for lack of a better word) signifies a high quality product experience. Accept that you'll be judged, and use this to your advantage.

## Hiring the right people - what Stripe taught me

One of my most memorable moments as a founder was a 30 minute chat with [Malthe Sigurdsson](https://twitter.com/malthe/) - he used to run design at [Stripe](https://stripe.com/). For the uninitiated - people drool over Stripe's design quality - especially their [docs](https://stripe.com/docs). I wanted to know how they got there.

Apart from him telling me that he'd be a bad hire for us when we met originally, he also told me:

* Great designers iterate quickly. You won't get it perfect in Figma first.
* Hire generalists early on.

We followed his advice. We made sure we had people that could work in Figma or CSS, and who'd be able to understand our audience. We got some pushback in the hiring process that we were unicorn hunting, and it took months, but we'd do everything the same way all over again.

## Treat your website as a product, but not at first

We see so many websites, it's easy to build on autopilot... Before you know it you're Googling "how to center a div in a div", and adding testimonials and calls to action.

This is a good way to get something mediocre built very fast - which is exactly what you want on day one.

Once you've got some consistency and a sense of brand, start thinking from a user's perspective. This is what we did to think of our website and docs as a product:

1. **Start with why**: We thought about [our mission](/handbook/strategy/strategy) and our motivation for building a website and docs to help us achieve it.
2. **Ask who it's for**: We broke down the people who might come to our website/docs into segments and prioritized the biggest opportunities, trying to use qualitative and quantitative data where we could.
3. **Consider what they need:** We looked at the focus segment and what their needs from our website and docs were. We asked which needs were the most important to solve, again using qualitative and quantitative data where we had it.
4. **Plan how to solve needs:** We brainstormed potential solutions to the highest priority needs.

You can go even further - what do [acquisition, activation, retention, referral and revenue](/docs/tutorials/aarrr-framework) look like for your website or your docs? Then you know you're actually solving needs.

This exercise is taking us in some [really innovative directions](https://github.com/PostHog/posthog.com/issues/2568).

## Think about patterns carefully

We provide open source product analytics. That means our users have to put some work in to try out PostHog. Do you want to put work into flakey software? No.

Therefore the first version of our website avoided these patterns:

* Stock doodles that every startup uses (we avoided this, and hired a graphic designer as early as we could).
* Single landing-page where the links take you to an anchor link on the same page (we had >50 pages when we launched).

## Don't treat implementation as a second-class citizen

Great design is irrelevant without implementation. The better you are at getting things merged easily, the more steps you'll take and the further you'll go. 

As we got stronger at implementation, we found we could push for far more - we have complete confidence we can execute. Get design to show off what they're working on internally, just as engineering would.

## Iterate

You aren't going to get it right on the first go. Be happy [chopping and changing](https://github.com/PostHog/posthog.com/issues/2479) - the long term result will be better, and no one cares about brand consistency in your first year. You'll create a better brand by doing, and applying what you learn about your users.

## Get comfortable

Many of the best things you can work on are hard to measure - that's why they're opportunities; no one else wants to do them. Investing in design is like this.