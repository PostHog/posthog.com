---
title: Glue teams vs back-office teams
date: 2025-08-19
author:
 - michael-matloka
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/glue_teams_blog_189aa95d56.png
featuredImageType: full
tags:
  - Culture
  - Product
  - People
  - Engineering
crosspost:
  - Founders
  - Product engineers
  - Blog
---

> *Michael Matloka is a product engineer at PostHog. He leads the [Max AI team](/teams/max-ai) and originally posted this on [his blog](https://matloka.com?utm_source=newsletter.posthog.com&utm_medium=post&utm_campaign=glue-teams), where he posts interesting things sometimes.*

In the early days of a startup, there’s clarity.

You’ve got a tight team. Everyone builds the product. Everyone’s “customer-obsessed”. Everyone is scrambling for product-market fit.

The org chart is a circle with a post-it note saying “build something people want”. A customer wants to pay the [SSO tax](https://sso.tax?utm_source=newsletter.posthog.com&utm_medium=post&utm_campaign=glue-teams)? Say no more.

But then you grow. Areas need to be split up for ownership. Some bits get chopped up cleanly, others turn into murky waters. This is where the problems start.

## Two types of teams

As product-focused companies scale, you’ll hear calls for two kinds of engineering teams: **back-office teams** and **glue teams.** [^1]

People think they’re the same because they both:

1. Span multiple product areas.  
2. Own features and problems no one else wants to own.  
3. (Theoretically) bring order to previously messy and opaque systems.

Spoiler: they’re worlds apart.

**Back-office teams serve other teams.** Period.

Their customers are on the same payroll. Like the back office of a bank, paying customers never see them.

They provide backend infrastructure, build developer tools, maintain component libraries, and run data platforms. It’s neat stuff. Stuff that makes developers happy.

But back-office teams are always one layer removed from real impact.

They make tools that help people who help users. There’s a layer of indirection, and an inevitable loss of context.

Blink, and that team just spent a week solving an internal problem with minimal impact. Useful? Sure. Valuable? Not so much.

**Glue teams serve users.** Directly.

These folks do [glue work](https://www.noidea.dog/glue?utm_source=newsletter.posthog.com&utm_medium=post&utm_campaign=glue-teams) at the level of the product. They’re product teams that just happen to cut horizontally across features instead of owning vertical slices.

Think, auth. Not flashy, not a standalone product line, yet it keeps the product together in one piece. It makes or breaks enterprise deals, or a user’s day.

[Billing](/teams/billing)? The ultimate glue. That’s systems, UI, and accounting, all in one. The spice must flow.

The folks owning these areas should be talking to users, they should be owning product metrics.

![glue teams at posthog](https://res.cloudinary.com/dmukukwp6/image/upload/glue_teams_20cb9dd81b.png)  
<Caption>Billing was one of our first glue teams, but we’re adding more as we grow. Infra and ClickHouse used to be one team, but split up as our needs grew.</Caption>

## Resist the calls for nice-to-haves

People want more back-office teams as you grow because it feels safer. They soothe anxiety. Reduce chaos. “It would be nice to have XYZ”, they say.

But here’s the uncomfortable truth: you can get away without back-office teams much longer than you think, and you should.

I know. Engineers are complaining about CI. Internal tools could be better. Still, keep that zero degrees of separation from customers for as long as you can.

The space of *possible* work is infinite; the set of tasks needed for success? Surprisingly narrow.

Distance from users makes it hard to see which is which, whether you’re an engineer, designer, or founder!

Distributed ownership is the name of the game for those internal aspects. It takes some healthy agency, for example:

* One person improves the dev environment as a side quest.  
* Someone else maintains the component library between feature work.  
* Another migrates you to the latest language version.

It’s not their full-time job, and it shouldn’t be yet. And, for the hairiest problems, you agree to spin up a **short-lived** project team to address that specifically.

Obviously, some back-office work is an early must-have. You won’t get far without a clear [owner of data infra](/teams/infrastructure), especially if you run a data-intensive SaaS like we do at [PostHog](/).[^2]

But, beyond the absolute essentials, only start a back-office team when you can honestly call its resources a rounding error compared to product development. Backend infra at 20 engineers, anything else at 50+.

Until then, a little bit of chaos is valuable: desirable, even. It teaches everyone which problems actually matter.

## Address must-have gaps

Meanwhile, it’s easy to set aside shared areas of the product and forget about them. Don’t mistake them for back-office functions. This is precisely where you need glue teams.

We’re talking about aspects users hit all the time. Customers using your SDKs across 10 platforms? Without dedicated owners, the quality of those SDKs plummets over time. Paying users suffer, and not only them, as the mess is *also* making other teams less productive.

Auth? Billing? You already know the story.

Those glue areas don’t bring product-market fit by themselves, but neglecting them sure as hell can lose you *product-user fit*.

## The bottom line

**Spin up back-office teams** when the ROI of such a team starts feeling *unreasonably* large – much later than you think.

**Spin up glue teams** when users run into pain in cross-cutting areas of the product – often earlier than you think. Keep building something people want this way.

And remember: an org that over indexes on back-office teams early will:

1. Optimize for fluffy internal goals more than real value.  
2. Create an approval culture that erodes autonomy and slows you down.

That’s a death sentence, so choose wisely.

*If you liked this, consider [sharing it on Hacker News](https://news.ycombinator.com/submitlink?u=https://newsletter.posthog.com/p/glue-teams-vs-back-office-teams), or your internet points provider of choice. You can [subscribe here](https://newsletter.posthog.com/subscribe) – it’s free and always will be.*

---

## **🧠 Good reads for people who build cool stuff**

* [**How we use PostHog's built-in data warehouse**](/blog/data-warehouse-at-posthog) **– Ian Vanagas**  
* [**Why LLMs Can't Really Build Software**](https://zed.dev/blog/why-llms-cant-build-software?utm_source=newsletter.posthog.com&utm_medium=post&utm_campaign=glue-teams) **– Conrad Irwin**  
* [**Everything I know about good system design**](https://www.seangoedecke.com/good-system-design?utm_source=newsletter.posthog.com&utm_medium=post&utm_campaign=glue-teams) **– Sean Goedecke**  
* [**If you're remote, ramble**](https://stephango.com/ramblings?utm_source=newsletter.posthog.com&utm_medium=post&utm_campaign=glue-teams) **– Steph Ango**

[^1]: This article is specifically about engineering teams. There are many non-engineering teams, such as support or customer success, that you could call glue teams, too.

[^2]: Still, with so much of hosting outsourced to cloud providers, infra is leaner than ever. More so if you run on Vercel + Supabase.

<NewsletterForm />