---
date: 2022-06-20
title: The magic of a Hacker News pre-mortem
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["CEO diaries", "Inside PostHog"]
author: ["james-hawkins"]
featuredImage: ../images/blog/ceo-diary.png
featuredImageType: full
---

Hacker News is a place for developers to discuss tech news. Getting to the front page of links is one of the most [stressful but valuable](https://twitter.com/james406/status/1506293206643785728) things that can happen to developer focussed startup.

The New Yorker [sums it up](https://www.newyorker.com/news/letter-from-silicon-valley/the-lonely-work-of-moderating-hacker-news) better than I can:

> "readers who visit the site to learn how engineers and entrepreneurs talk, and what they talk about, can find themselves immersed in conversations that resemble the output of duelling Markov bots trained on libertarian economics blogs"

When I build or give feedback on something at PostHog that is really important or could wind up going viral, I run a Hacker News pre-mortem either solo or with others.

This means I preempt all the criticism our thing could get if it went viral.

If you keep producing interesting stuff, this really can happen - we've had our [repo](https://github.com/posthog/posthog), [side projects](https://isgoogleanalyticsillegal.com/) and [blog](story-about-pivots) [posts](moving-to-sf/) all get to the front page.

Having read through lots of other launches, I've covered lots of the repeated criticisms that came up:

## I can't tell from your website what this does

Conventional marketing lore states "[features tell, benefits sell](https://www.helpscout.com/blog/benefits-sell/)".

This has created the rise of "marketing websites" (please [treat it like a product](ceo-diary-4#treat-your-website-as-a-product-but-not-at-first) instead) that use vague, high level benefit/marketing oriented language with no product details, and my personal least favorite - pricing pages without pricing information.

This is particularly frustrating for developers, who are often involved in figuring out if a product can be setup and integrated properly, and moreover, for anyone trying to compare products. Alas, tech vendor, the world doesn't revolve around you.

[Example 1](https://news.ycombinator.com/item?id=30617507) | [Example 2](https://news.ycombinator.com/item?id=30699795) | [Example 3](https://news.ycombinator.com/item?id=30698479) | [Example 4](https://news.ycombinator.com/item?id=30278384) | [Example 5](https://news.ycombinator.com/item?id=29895661) | [Example 6](https://news.ycombinator.com/item?id=29901915)

## I wouldn't use this

The opposite criticism to the above. This reader gets what it is, but they don't understand why it's useful. Maybe you went too far just listing out technical specs.

There should be some supporting positioning that explains why someone may want to use your product, but this should be feel secondary to short explanations of what it does.

Or, maybe you're just wrong. People don't agree with your reasoning why they should use your thing!

If this is universal feedback, you don't have product market fit. If it's from time to time, factor this into your Ideal Customer Profile ([see ours](../handbook/strategy/strategy#target-customers-for-2022) for reference).

[Example](https://news.ycombinator.com/item?id=30640487) | [Example 2](https://news.ycombinator.com/item?id=27503930) | [Example 3](https://news.ycombinator.com/item?id=27884669).

## I got stuck trying to use it

A lot of people will try your thing out, if they can.

Make sure someone else is using your product in production before you launch it. You'll get no end of edge cases. Or even "majority cases" cases like the first ever user of PostHog:

![user gets stuck because they cannot log into PostHog](../images/02/Screenshot-2020-02-25-at-21.52.15.png)

At least they liked the website. We had a handful of friends using PostHog first, then we ran some Twitter ads to get a further 20 ish companies using the product, then we put it on Hacker News. Do not let this slow you down though (just optimize for "does anyone care" early on) - it took us [a month of intense work](pivot-to-posthog), as one example.

[Example](https://news.ycombinator.com/item?id=30698771) | [Example 2](https://news.ycombinator.com/item?id=29892909) | [Example 3](https://news.ycombinator.com/item?id=29629604) | [Example 4](https://news.ycombinator.com/item?id=27885861)

## This doesn't seem like a sustainable business

[Example](https://news.ycombinator.com/item?id=28289988) | [Example 2](https://news.ycombinator.com/item?id=20107991) | [Example 3](https://news.ycombinator.com/item?id=20108075)

## I need to know how much it'll cost

Put pricing on there if you can. If you're not ready to create a paid version yet, then state your plans in this area (and create an easy way for people to get in touch so you can get all the signal you can).

If you do have pricing, be as clear as possible on how your plans work.

Fun fact: [PostHog's pricing page](../../pricing) is the second most popular place for homepage visitors to go, second only to logging in.

[Example](https://news.ycombinator.com/item?id=30618024) | [Example 2](https://news.ycombinator.com/item?id=28331535) | [Example 3](https://news.ycombinator.com/item?id=27974615) | [Example 4](https://news.ycombinator.com/item?id=26881171) | [Example 5](https://news.ycombinator.com/item?id=30357971) | [Example 6](https://news.ycombinator.com/item?id=22640023)

## I can't see the difference between this and X?

[Extreme exampe](https://news.ycombinator.com/item?id=30290722) | [Example 2](https://news.ycombinator.com/item?id=28120858) | [Example 3](https://news.ycombinator.com/item?id=28118240) | [Example 4](https://news.ycombinator.com/item?id=29262281)

## You can easily do this for free using X

[Example](https://news.ycombinator.com/item?id=30640693) | [Example 2](https://news.ycombinator.com/item?id=29267823)

## I don't trust you with my data, or I have a security concern

Firstly, signals that you know what you are doing are important. If you have an application that'll handle lots of personal data, you must have the basics in place where appropriate.

Transparency is a way to build on this. Explain exactly how you handle data, and what your business is aiming to be. If you've got VC funding, some users will assume you're somehow going to harvest and sell data if there's no clear businss model.

In the rush to get a Minimum Viable Product out, it's easy to overlook the importance of security. A little effort here can go a long way.

[Example](https://news.ycombinator.com/item?id=29898582) | [Example 2](https://news.ycombinator.com/item?id=28280362) | [Example 3](https://news.ycombinator.com/item?id=27978440) | [Example 4](https://news.ycombinator.com/item?id=30642077) | [Example 5](https://news.ycombinator.com/item?id=20109511)


## This title is misleading

Misleading / clickbaity titles land badly.

[Example](https://news.ycombinator.com/item?id=30543456) | [Example 2](https://news.ycombinator.com/item?id=29792628) | [Example 3](https://news.ycombinator.com/item?id=31490603) | [Example 4](https://news.ycombinator.com/item?id=31478760)

## I disagree with this approach

[Example](https://news.ycombinator.com/item?id=30594508) | [Example 2](https://news.ycombinator.com/item?id=30593513) | [Example 3](https://news.ycombinator.com/item?id=29845834) | [Example 4](https://news.ycombinator.com/item?id=29844670)

## This won't load on mobile

[Example](https://news.ycombinator.com/item?id=28087142)


## I could build this myself

It's an [in-joke](https://news.ycombinator.com/item?id=8863).

[Example](https://news.ycombinator.com/item?id=28090851)

_Enjoyed this? Subscribe to our [newsletter](/newsletter) to hear more from us twice a month!_

<NewsletterForm
compact
/>
