---
title: You need to find product-market fit again (sorry)
date: 2026-08-25
author:
  - cleo-lant
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/disrupt_yourself_8dec0b9e12.png
featuredImageType: full
tags:
  - Product-market fit
  - Founders
  - Product
crosspost:
  - Founders
  - Blog
seo:
  metaTitle: You need to find product-market fit again (sorry)
  metaDescription: >-
    A case study in disrupting yourself – nine lessons from building PostHog
    Desktop, our pre-product-market fit bet against our own flagship product.
---

If a team powered by AI rebuilt your flagship product today, what would they build and what would they skip? PostHog Desktop is our work-in-progress answer to that open question.

It came from a simple reality no company can escape: the [product-market fit game](/founders/product-market-fit-game) never really ends. Whether it’s frontier labs attacking your territory, or the hundreds of scrappy two-person teams determined to build “[Your App] for 2026”, now is the time to disrupt yourself.

I’ve had the job of marketing our in-house disruption through every shape it’s taken. It started as [PostHog Code](/blog/self-driving-product), an agentic coding tool and product editor. Then the most valuable thing that grew inside it, [self-driving](/self-driving), got de-bundled and shipped into PostHog Web.

The container it left behind became [PostHog Desktop](/desktop): a different product shape entirely, built around multiplayer spaces, generative UI artifacts, and the thesis that shared business context is key to a product that [builds itself.](/blog/what-if-your-product-built-itself)

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/desktop_surveys_canvas_light_160e744e82.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/desktop_surveys_canvas_dark_085ef34c25.png"
  alt="A canvas open in a PostHog Desktop space, showing charts for pull request activity, product adoption, and survey delivery"
  classes="rounded"
/>

<Caption>This canvas captures the state of self-driving development. Because it's generative UI, we can visualize whatever data we want on it.</Caption>

This isn’t advice from someone who’s run the PMF playbook and won – PostHog Desktop is now in open beta and doesn’t have product-market fit (yet). It’s mid-game observations that might help if you’re post product-market fit, and pre-whatever comes next.

## 1. Write down how you die

Disrupting yourself is about playing a good offense, but you still need to understand what you’re defending against. Write down the threats as three or four one-liners: who or what makes your product unnecessary? (we’ll counterattack later, so just speculate the future for now).

For example, Vercel built its agent tooling by running its own agents in production and shipping the gaps as products: [AI Gateway](https://vercel.com/ai-gateway), [Chat SDK](https://chat-sdk.dev/), and the [Agent Stack](https://vercel.com/blog/agent-stack). Your cause of “death” doesn’t have to be a villain. AI models getting so good that everyone can ship software is arguably utopia, but you don’t need me to tell you how disruptive that’s been.

<NewsletterForm />

## 2. Fund the attacker yourself

Give the “death-page” to a small team with big ideas – plus a blank slate to build something where your existing users won’t trip over it. 3-5 people, reporting to a founder rather than to the department they’re disrupting. You get to be the incumbent and the seed investor at once! (startups attacking you would kill for this setup).

## 3. Score it like a seed bet, not a business unit

In all likelihood, the new thing you build will have lower margins, worse retention, and more pivots than you expect. Don’t compare the metrics of your pre-PMF bet to those of your current PMF product (not yet, at least).

Write down, in advance, what the experiment will be judged on, the resources it’s allocated, and the runway it has before you even *think* about killing it. This is your defense against pulling the plug too early, and subsidized infinity.

## 4. Look for customers doing cool things with your product

With the PostHog MCP, you never have to open the web app at all – and that’s fine by us. Whether people reach PostHog through the [MCP](/docs/model-context-protocol), the [Slack app](/slack), Desktop, or the [CLI](/docs/cli), our job stays the same: give them tools they need to build successful products.

One of our largest customers took us up on that in a way we didn’t expect. They wired our MCP to Claude (plus a few other tools), and built their own working prototype of PostHog 2.0. This is the yellow flag every founder should watch for: when your users start assembling the next version of your product themselves, the demand is proven.

## 5. Build first, validate later

Your users are a great source of insight about how to improve your existing product. A good product team is obsessed with pleasing them, and every signal they send you compounds to growth.

The opposite is true when taking a bet on something new. Ask this amplification machine whether you should build a strange new thing for a strange new market (maybe even a whole new category) and it’ll probably say: “uh… no? Why risk what’s working?”

You can win these people round, but only after you’ve built something real, so don’t get hung up on validating your idea with them beforehand. We launched PostHog Code as a closed beta and validated it with real users, which led us to integrating its core ideas into PostHog Web.

## 6. Ask the disappointment question early and often

Once you have a prototype, dogfood it internally. The [classic Sean Ellis PMF survey](/founders/measure-product-market-fit#indicator-2-pmf-survey): “how disappointed would you be if this disappeared?” works on your own team (especially if they’re your [ICP](/newsletter/ideal-customer-profile-framework)).

We did this before a recent product launch and scored 23%. The industry PMF benchmark is ~40%, so obviously this was painful. Your team will tell you the truth before your churn does, but only if you ask them.

## 7. Let usage overrule everyone, including you

Building a product runs on a mix of data (user interviews, [session replays](/session-replay), [product analytics](/product-analytics)) and, honestly, some plain vibes. Vibes are fine for deciding what to try – not what to keep on building. We set up a [Replay Vision](/blog/replay-vision) agent that watches session recordings of PostHog Desktop users and posts a daily summary in Slack. It contradicts our vibes *constantly*.

**One thing to keep in mind:** people who love your current product will land in the new version carrying assumptions. They’ll judge it against the workflow they already have, and read every change as something taken away. Net-new users have no map, and will show you what the new thing actually invites people to do. Both signals matter, but don’t try to average them.

## 8. Build the new thing on the asset your attackers can’t copy

Every incumbent has something a newcomer can’t copy – usually data, distribution, or both. Find a way to give your pre-PMF team that family advantage without the generational baggage.

In our case, Desktop shares almost no interface code with PostHog Web. What it shares is the data, including the same MCP we hand to customers. And because it’s a new app, long-time users keep the interface that works for them, while new users get to choose their own PostHog adventure.

GitHub did the same with Copilot: a brand-new product built on the two things only it and Microsoft had: the world’s largest pile of code, and distribution to millions of developers.

## 9. Ship before you’re ready

When you hop back on the PMF treadmill, it will feel bad in very specific ways. The new thing will lose in almost every comparison your company knows how to make. You’ll change the name too many times. You’ll kill features you were proud of two weeks after shipping them. And your own people will tell you they don’t “get” what you’re doing.

If none of that is happening, you’re probably not disrupting yourself.

But you’ve done this once before, so you’re better armed than any first-timer. You have revenue funding the experiment, real users telling you the truth, years of data to build on – and now agents doing half the building.

[PostHog Desktop](/desktop) is our version of this, and it’s out now for you to try (no waitlist). Come use it in ways we never imagined, and tell us what you’d fight to keep. If it all goes sideways, we’ll write the post-mortem post too (those are usually pretty popular).

<NewsletterForm />
