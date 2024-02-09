---
date: 2022-06-30
title: The magic of a Hacker News Pre-Mortem
author:
  - james-hawkins
featuredImage: ../images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
tags:
  - Marketing
  - Founders
  - Growth
crosspost:
  - Blog  
---

Imagine you're working on something for other developers that you really, _really_ want to be great.

Perhaps you're creating a new startup, perhaps you're creating a blog post, or perhaps you're working on a side project that you want to share with the world.

Enter, the Hacker News Pre-Mortem.

[Hacker News](https://news.ycombinator.com) is a place for developers to discuss tech news - it's a list of interesting links, each with discussion. Getting to the front page is one of the most [awesome but terrifying](https://twitter.com/james406/status/1506293206643785728) things that can happen to a developer focused startup.

The New Yorker [sums it up](https://www.newyorker.com/news/letter-from-silicon-valley/the-lonely-work-of-moderating-hacker-news) better than I can:

> "readers who visit the site to learn how engineers and entrepreneurs talk, and what they talk about, can find themselves immersed in conversations that resemble the output of duelling Markov bots trained on libertarian economics blogs"

A Hacker News Pre-Mortem is a term I just made it up, for when you do your best to preempt the criticism your thing could get if it got to the front page of Hacker News.

> This is _not_ a 'how to go viral' guide. If you want to do that, ironically don't focus on it. Instead, create unusually helpful content and share it. I mainly write about topics other founders ask me, or interesting things I observe first hand about our company), since I am in a unique position to write about those topics.

We've had our [repo](https://github.com/posthog/posthog), [side projects](https://isgoogleanalyticsillegal.com/) and [several](what-to-ask-in-interviews) [blog](story-about-pivots) [posts](moving-to-sf/) all get to the front page.

So, what are the basic criticisms that come up over and over for projects posted there?

## I can't tell from your website what this does

Conventional marketing lore states "[features tell, benefits sell](https://www.helpscout.com/blog/benefits-sell/)".

This has created the rise of "marketing websites" (please [treat it like a product](ceo-diary-4#treat-your-website-as-a-product-but-not-at-first) instead) that use vague, high level benefit/marketing oriented language with no product details, and my personal least favorite - pricing pages without pricing information.

This is particularly frustrating for developers, who are often involved in figuring out if a product can be setup and integrated properly, and moreover, for anyone trying to compare products. Alas, tech vendor, the world doesn't revolve around you.

[Example 1](https://news.ycombinator.com/item?id=30617507) | [Example 2](https://news.ycombinator.com/item?id=30699795) | [Example 3](https://news.ycombinator.com/item?id=30698479) | [Example 4](https://news.ycombinator.com/item?id=30278384) | [Example 5](https://news.ycombinator.com/item?id=29895661) | [Example 6](https://news.ycombinator.com/item?id=29901915)

## I wouldn't use this

The opposite criticism to the above. This reader gets what it is, but they don't understand why it's useful. Maybe you went too far just listing out technical specs.

There should be some supporting positioning that explains why someone may want to use your product, but this should be feel secondary to short explanations of what it does.

Or, maybe you're just wrong. People don't agree with your reasoning why they should use your thing!

If this is universal feedback, you don't have product market fit. If it's from time to time, factor this into your Ideal Customer Profile ([see ours](../handbook/strategy/overview#target-customers-for-2022) for reference).

[Example](https://news.ycombinator.com/item?id=30640487) | [Example 2](https://news.ycombinator.com/item?id=27503930) | [Example 3](https://news.ycombinator.com/item?id=27884669).

## I got stuck trying to use it

One of the things we've learned about working with developers is that a lot of technical people will try your thing out, if they can.

Make sure someone else is using your product in production before you launch it. You'll get no end of edge cases. Or even "majority cases" cases like the first ever user of PostHog:

![user gets stuck because they cannot log into PostHog](../images/02/Screenshot-2020-02-25-at-21.52.15.png)

Hey, at least they liked the website.

We had a handful of friends using PostHog first, then we ran some Twitter ads to get a further 20 ish companies using the product, then we put it on Hacker News.

Do not let this slow you down though (just optimize for "does anyone care" early on) - it took us just [a month of intense work](pivot-to-posthog) to do this, as one example. See some other [things that are fast](https://patrickcollison.com/fast).

[Example](https://news.ycombinator.com/item?id=30698771) | [Example 2](https://news.ycombinator.com/item?id=29892909) | [Example 3](https://news.ycombinator.com/item?id=29629604) | [Example 4](https://news.ycombinator.com/item?id=27885861)

## This doesn't seem like a sustainable business

If your thing looks unsustainable, then no one wants to rely on it.

The basics here are:

i) there's some way of making money from the thing that is obvious to readers
ii) _if_ the target marget is super niche, then it has an obvious (or explained) path to expanding beyond this

[Example](https://news.ycombinator.com/item?id=28289988) | [Example 2](https://news.ycombinator.com/item?id=20107991) | [Example 3](https://news.ycombinator.com/item?id=20108075)

## I need to know how much it'll cost

Put pricing on there if you can.

If you're not ready to create a paid version yet, then state your plans in this area (and create an easy way for people to get in touch so you can get all the signal you can).

If you do have pricing, be as clear as possible on how your plans work.

Fun fact: [PostHog's pricing page](../../pricing) is the second most popular place for homepage visitors to go, second only to logging in.

[Example](https://news.ycombinator.com/item?id=30618024) | [Example 2](https://news.ycombinator.com/item?id=28331535) | [Example 3](https://news.ycombinator.com/item?id=27974615) | [Example 4](https://news.ycombinator.com/item?id=26881171) | [Example 5](https://news.ycombinator.com/item?id=30357971) | [Example 6](https://news.ycombinator.com/item?id=22640023)

## I can't see the difference between this and X?

If you're building something in a crowded space, like - say - an analytics product, people need a very good reason to use a tiny new startup's thing, over a better established competitor,

Reasons they feel this way:

- your thing won't have many features
- it will be buggy
- people may not trust you with their data

These can all be offset by early adopters if there is something important that is different about what you're working on.

[Extreme example](https://news.ycombinator.com/item?id=30290722) | [Example 2](https://news.ycombinator.com/item?id=28120858) | [Example 3](https://news.ycombinator.com/item?id=28118240) | [Example 4](https://news.ycombinator.com/item?id=29262281)

## I don't trust you with my data, or I have a security concern

Small signals that you know what you are doing are the creator of a technical product are important. A privacy policy, for example, or no obvious security flaws. No typos, nice design - the details all add up here.

Transparency is a way to build on this. Explain exactly how you handle data, and what your business is aiming to be. If you've got VC funding, some users will assume you're somehow going to harvest and sell data if there's no clear businss model.

In the rush to get a Minimum Viable Product out, it's easy to overlook the importance of security. A little effort here can go a long way.

[Example](https://news.ycombinator.com/item?id=29898582) | [Example 2](https://news.ycombinator.com/item?id=28280362) | [Example 3](https://news.ycombinator.com/item?id=27978440) | [Example 4](https://news.ycombinator.com/item?id=30642077) | [Example 5](https://news.ycombinator.com/item?id=20109511)

## This title is misleading

Misleading / clickbaity titles get called out.

Clearly, your title _must_ [be interesting](writing-for-developers) ("would I read this"), but it has to be truthful.

[Example](https://news.ycombinator.com/item?id=30543456) | [Example 2](https://news.ycombinator.com/item?id=29792628) | [Example 3](https://news.ycombinator.com/item?id=31490603) | [Example 4](https://news.ycombinator.com/item?id=31478760)

## I disagree with this approach

So, you've built something different. Just make sure you've got some early user feedback, and have thought it through.

_If_ you have done those things, polarizing people is better than invoking no feelings at all. Your project will die if it's forgetful.

[Example](https://news.ycombinator.com/item?id=30594508) | [Example 2](https://news.ycombinator.com/item?id=30593513) | [Example 3](https://news.ycombinator.com/item?id=29845834) | [Example 4](https://news.ycombinator.com/item?id=29844670)

## This won't load on mobile

Lots of people reading news websites are using mobile devices. We hit the front page [on Hacker News recently](https://news.ycombinator.com/item?id=31906933) and had 27k visitors on desktop, 21k on mobile (and 347 on tablets). Fact.

[Example](https://news.ycombinator.com/item?id=28087142)

## I could build this myself

It's an [in-joke](https://news.ycombinator.com/item?id=8863).

[Example](https://news.ycombinator.com/item?id=28090851)

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_
