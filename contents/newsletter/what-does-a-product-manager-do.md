---
title: "WTF does a product manager do? (and why engineers should care)"
date: 2026-03-11
author:
  - jina-yoon
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/WTF_18f252d2d3.png
featuredImageType: full
tags:
  - Engineering
  - Product
crosspost:
  - Product engineers
  - Blog
seo:
    metaTitle: 'What does a Product Manager do?  A practical guide for engineers'
    metaDescription: >-
        A breakdown of what product managers do, from gathering context to running feedback loops, and how engineers can apply these skills to build better products
---

In our last issue, <TeamMember name="Ian Vanagas" /> wrote about how [engineering has escaped the codebase](/newsletter/engineeringification-of-everything). How engineering tools, mindset, and identity increasingly shape every function, especially at startups.

We've seen this first-hand at PostHog, but it's not an isolated trend. The lines between product management and engineering are blurring, too.

Thanks to LLMs, figuring out what to build is now a greater bottleneck than how to build it, and it's forcing engineers to think more like [product managers](/newsletter/product-management-is-broken) (PMs).

In this issue, we'll help you take advantage of what product managers have already figured out by going over the top three skills in their playbook.

## 1. Gather the right context

Providing context is a product manager's most important job.

What exactly do we mean by context? In the same way that sailors used to navigate by the stars, engineers depend on **context** to make the right product decisions.

Good context points teams in the right direction; great context can change a company's entire trajectory.

Take Duolingo for example.

In [a guest edition of Lenny's Newsletter](https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth), Duolingo's Head of Product, Jorge Mazal, recounted how the company fixed its stalling growth problem. The team initially focused on friend referrals, premium trials, and in-game mechanics. Nothing worked, and [daily active users (DAU)](/newsletter/wtf-is-activation) continued to decline.

But then Mazal and the data science team discovered that current user retention rates (CURR) were **5x more impactful** on DAU than any other projected metric. That single piece of context completely shifted the product roadmap.

Instead of trying to acquire new users, the team invested in keeping **existing** learners hooked with leaderboards, daily streaks, and – of course – passive-aggressive push notifications from everybody's favorite lime green owl.

Four years later, Duolingo successfully exited with massive 4.5x DAU gainz.

Product metrics like CURR and DAU in Duolingo's story are just one form of context. There are many more, such as:

- **Competitor landscape.** What are our competitors doing, and should we do that, too? In an interview with TechCrunch, Instagram's CEO described how the company copied and outperformed Snapchat Stories in 2016.

- **User research.** What do prospective users say they want? Buffer interviewed 30+ content creators to discover what people actually want from creative AI assistants.

- **Industry news.** What's happening in the industry that we should pay attention to? When generative AI took off in 2023, Canva turned it into its core feature and doubled revenue in two years ($1.7B → $3.3B).

- **Customer feedback.** What do current customers say they want, and is it actually what they want? When Linear users requested "custom fields", they dug deeper and built [Customer Requests](https://linear.app/now/building-what-customers-need) to track support tickets, Slack messages, and calls.

![Duolingo gainz](https://res.cloudinary.com/dmukukwp6/image/upload/buff_duolingo_meme_4a9811129d.png)

Gathering context can be difficult since it's not always obvious what information is useful at any given point in time. You could spend weeks analyzing bug reports to improve feature adoption, only to realize after one user interview that it was a discoverability problem all along.

The good news is that you can develop an intuition for this by tracking what types of context led to measurable success through accountability loops (we'll cover what that looks like in the next section).

### Takeaway for engineers

Don't wait around for someone else to give you the right context for your product. Instead, generate it yourself by creating your own systems for discovery.

In addition to helping you ship faster, this gives you an unfiltered view of the data. For example, [talking to users](/newsletter/talk-to-users) provides clearer insight than reading secondhand notes from your PM since information gets lost at each step along the way.

![Information bottleneck](https://res.cloudinary.com/dmukukwp6/image/upload/v1713894881/posthog.com/contents/images/newsletter/talk-to-users/bottleneck3.png)

Another reason engineers should do this is that your teammates might not understand the technical options and constraints as well as you do. Sometimes only the person with the full context of a problem can ask the right questions.

> **Try this:** Book 2 user interviews per week. Run a feedback survey for your product and review survey data every sprint. Set up an LLM eval that detects when users struggle. Create a weekly email digest for competitor blogs.

<NewsletterForm />

## 2. Track success with feedback loops

All that context is useless if your team doesn't know if they're [winning](/newsletter/think-like-a-growth-engineer).

Product managers at PostHog track and ensure success by running [growth reviews](/handbook/product/per-product-growth-reviews): monthly meetings where they go over revenue trends, user feedback, usage metrics, and [quarterly goals](/newsletter/quarterly-planning-mistakes) with the engineers building the product.

If the numbers aren't moving in the right direction, the PM presents a well-researched explanation to the team so that they can come up with an informed hypothesis and solution.

When the team meets again in the following month, they'll review what worked and what didn't. Each iteration levels up the product – and the team's product sense, too.

Here's an example from our [Error Tracking](/docs/error-tracking) team:

1. **The problem:** <TeamMember name="Cory Slater" />, the PM, noticed that [churn rates](/product-engineers/churn-rate-vs-retention-rate) were disproportionately high, even though new customer acquisition was strong.

2. **The context:** A series of customer interviews all pointed to the same theme: trust. Users were leaving because of rough edges, such as missing recordings or unhandled stack trace edge cases.

3. **The hypothesis:** This is a product-quality problem, not a "missing features" problem. Systematically improving papercuts, ergonomics, and reliability will reduce churn.

4. **The solution:** The team catalogued every trust-related issue from customer feedback and shipped dozens of fixes. Churn improved from 21% to 10% in the following quarter.

Without Cory's investigation, the team could have easily spent months on new features that they **thought** would solve the churn problem, without addressing the root cause.

Feedback loops like these create accountability and, in turn, give developers more autonomy. Engineers at PostHog can make product decisions more freely (without PMs micromanaging roadmaps) since the system ensures they're always contributing to the company's bottom line.

![PM feedback loop](https://res.cloudinary.com/dmukukwp6/image/upload/Frame_143750_0c85431f48.png)

### Takeaway for engineers

You can turn every sprint into a mini growth review by setting aside time to define and [evaluate success](/handbook/engineering/development-process#evaluate-success) in each session.

We do this at PostHog by classifying each milestone with one of the following:

- **Nailed it:** We hit the goal spectacularly. High fives all round.

- **Scraped it:** We almost hit the goal, but we need to do a bit more to tidy up.

- **Failed it:** We were nowhere near hitting the goal, but we learned some valuable lessons. Back to the drawing board for this one.

This ensures we're learning from each cycle and [not just shipping mindlessly](/newsletter/50-product-learnings). It's way more useful than just marking tasks as "Completed".

> **Try this:** In your next sprint, apply the concept of feedback loops by defining and evaluating success for each task. Then in the next sprint, review if you met those goals (and if not, what you learned or how you'll follow up).
>
> You could [run an A/B test](/product-engineers/ab-testing-mistakes) to compare behavior between groups, [test early prototypes](/newsletter/how-we-decide-what-to-build#5-test-with-minimal-effort) to get user feedback, [dogfood your product](/product-engineers/dogfooding) to get internal data, or [message a customer](/newsletter/talk-to-users#7-talking-to-users-doesnt-stop-at-user-interviews) to see if you addressed their issue.

## 3. Communicate towards action

To make all of the above actually work, you need to [make communication actionable](/newsletter/communication-mistakes#6-not-making-communication-actionable). We know this sounds like classic PM fluff, but give us a minute to explain.

It's easy for anyone to state a problem:

> "We're losing enterprise deals to competitors because we're missing features."

But this doesn't help engineers understand what to build or why.

Communicating towards action looks like:

> "We've lost five deals worth $200k in the last three months over SSO, audit logs, and role-based permissions. We should prioritize these over shipping v2 of the MCP for our core segment since we already have strong retention there. The enterprise requests are more aligned with company-wide goals for Q2."

This is better, but why? It reduces friction by surfacing important information from the start:

- **Stating the impact.** Not "we are losing deals", but "we lost three enterprise contracts."

- **[Being specific.](/newsletter/how-to-give-feedback#3-youre-not-being-specific-enough)** They don't just state that features are missing; they investigate and list the top three.

- **Sharing relevant context.** The revenue loss, strong core retention, and the Q2 company-wide goal are all factors that will help make the decision.

- **Making trade-offs visible.** The former doesn't mention competing priorities; the latter points out exactly what to choose between.

- **[Having an opinion.](/newsletter/communication-mistakes#3-lacking-an-opinion)** Instead of just vaguely asking "Thoughts?", they express which option they think is better and why.

This is where all three skills come together. Product managers know **what** information to provide thanks to all the context they've gathered and feedback loops they've experienced. And **how** they deliver it – by communicating actionably – makes all the difference.

![PM chad communication](https://res.cloudinary.com/dmukukwp6/image/upload/chad_meme_a8478c5a08.png)

### Takeaway for engineers

Since action is the goal, it's best to default to shipping when you can. That's why pull requests are the [S-tier form of communication](/newsletter/communication-mistakes#6-not-making-communication-actionable) at PostHog. (Email is F-tier, obviously.)

But when the next step is unclear and you need to bring it up for discussion, **work backwards.** Think about what types of context and success criteria a PM would provide to make the information as actionable as possible.

> **Try this:** Next time you're about to post "should we do X?", make it actionable by including:
>
> 1. The specific problem and its impact
> 2. What you've already investigated
> 3. At least one other option and the trade-offs
> 4. Which one you'd pick and why

<NewsletterForm />
