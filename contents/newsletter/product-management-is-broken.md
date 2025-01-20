---
title: Product management is broken. Engineers can fix it
date: 2024-12-03
author:
 - james-hawkins
 - lior-neu-ner
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/390823720_35b0d6be_f823_4c45_8e80_cfc0727e8827_128b8bbd57.jpg
featuredImageType: full
tags:
  - Engineering
  - Product
  - Culture
crosspost:
  - Founders
  - Blog
---
When Tim and I first started PostHog in 2020, I was adamant we would **never** hire a product manager. I wanted engineers to wrestle with hard product problems. Product managers, I believed, would just get in the way.

Four years on, I admit I was (partially) wrong. We need product managers. In fact, we couldn’t have shipped 8+ products, or hit our revenue goals without them.

But I was right about one thing: there is a better way.

Over the past two years, we've **redefined how PMs and engineers work together**, and optimized everything we do for speed and autonomy.

Here's our exact playbook.

## 1. PMs don’t control engineers

At many companies, product management looks something like this:

1. Get a list of features the founders or sales team wants.
2. Tell the engineering team the bare minimum they need to know.
3. Get them to build as many of these features as possible.

Obviously this isn’t how it’s supposed to work, but we’ve all seen it, right?

Too often product managers exist to control engineers, or shield them from organizational dysfunction. It sucks for everyone involved and it’s bad for the product.

You end up with a maze of half-baked features, and it’s just plain slow. PMs become the bottleneck and gatekeeper for all decisions, and engineers feel frustrated.

![Why engineers ship slowly](https://res.cloudinary.com/dmukukwp6/image/upload/445c908d_5612_4861_9161_f31463ee2023_1301x1040_069cae2754.png)

And, let me be clear: this isn’t the fault of product managers.

Leaders think _"we can give our engineers more time to code if we don’t bother them with other things."_ So, they create all this process that PMs are tasked with managing.

But this means engineers get a sanitized version of the truth, so they don’t have the right information to make the best decisions.

Instead, we offer an alternative…

## 2. Engineers make product decisions

The most important thing we've built at PostHog came from an engineer deciding what to build.

Back when PostHog only offered [product analytics](/product-analytics), an engineer named [Karl](https://www.linkedin.com/in/karlakselpuulmann/) noticed that many customers were asking for [session replays](/session-replay).

He wanted to build it, but I thought it was a terrible idea. I thought it would take him ages, and I didn't want to split the focus of the company on multiple products.

Karl disagreed and built it anyway. It ended up being wildly popular with customers, and changed our entire company strategy!

This success made me realize PostHog could be more than just product analytics. So we built [feature flags](/feature-flags), [experiments](/experiments), [surveys](/surveys), and we’re still extending it with [web analytics](/web-analytics), a [data warehouse](/data-warehouse), and error monitoring (currently in alpha).

And all this because a single engineer disagreed with the CEO.

![James Hawkins is an idiot](https://res.cloudinary.com/dmukukwp6/image/upload/c5daaeee_9c9c_4f55_a972_1b484e1e37f7_1648x400_17d59bddad.png)

The reason Karl was right – and why engineers are usually right – is they have the deepest understanding of what can be built. They understand the technical constraints, see patterns across features, and know exactly how to solve a problem.

So we decided to lean into this. At PostHog, PMs no longer own the roadmap, make product decisions, or shield engineers from users or the wider business goals.

Instead, our engineers run the show. They manage product teams. They have complete autonomy and drive our products forward. They even *gasp* [talk to users](/newsletter/talk-to-users).

This is why developers at PostHog are called [product engineers](/blog/what-is-a-product-engineer). We want them to be opinionated and customer obsessed, and that’s only possible if they have genuine autonomy and responsibility for product decisions.

However, if engineers are to make all the decisions, they still need support…

## 3. Product managers give engineers context

Engineers often don’t have the bandwidth to gather and distill all the information they need. This is where PMs can help. At PostHog, it’s their job to:

- Analyze product analytics
- Investigate opportunities
- Do competitor research
- Conduct user research (although engineers should still talk to users)
- Share industry news
- Track the results of the team's work

Notice that none of these responsibilities include managing the team, or defining the roadmap. At PostHog, PMs exist to empower the engineers, not control them.

We think of PMs as the team’s compass. They don’t decide the destination, but they provide information to let the team know if they’re headed in the right direction.

PMs can and should challenge the team’s decisions, but ultimately it’s the engineers who make the final call.

Of course, this requires an extremely high-level of trust in your engineer’s decision-making, which brings me to the next point…

## 4. Accountability through feedback loops

A giant checklist of processes and reviews is a tell-tale sign that a company doesn't trust their engineers. This is an anti-pattern. You drastically slow them down, the team gets frustrated, and the best people leave.

But it’s also a mistake to blindly trust engineers to always make the right decisions. No one is right 100% of the time. We’ve created a simple feedback loop that gives them more autonomy, but with the context and accountability they need to succeed.

Here’s how we approach it:

### a. Product engineers set their own quarterly goals

We used to do OKRs and metric-based goals, but we ran into two problems with it:

1. Teams wasted too much time coming up with the right metric to focus on.
2. Engineers focused on small quick wins to move those metrics, rather than building what our users actually wanted.

Now, the outcome of our quarterly planning sessions is a list of things teams are going to build. Here’s a simplified version of the process:

1. **Execs share the company's goals at a high level**, such as "we need to increase top of funnel adoption", or "we want to become an all-in-one tool, so we need to build more products". This happens before product teams decide their goals.

2. **Engineers brainstorm what they should build to achieve them**. If needed, they ask for advice or guidance from the exec team, but it’s ultimately up to engineers to decide what they build.

3. **Product teams meet to decide goals**. The output will be a list of things they want to build, and who is owning them. Here’s an example from our product analytics team’s Q4 objectives:

![Example of product analytics team's Q4 objectives](https://res.cloudinary.com/dmukukwp6/image/upload/d36eb308_0253_46b1_919e_cf0270cbf02d_1584x1818_b0379e47e4.png)

This approach works better because teams aren't stressed about hitting specific metrics. They can focus entirely on building and because engineers pick their own work, they're naturally more motivated.

As the CEO, I make the assumption that what the team has come up with is correct. That said, I do need to validate that the work they’re doing is having a meaningful impact. Enter the growth review…

### b. Product managers run monthly growth reviews

Growth reviews exist to evaluate the impact of each team’s work and PMs own them. First a team’s PM collects all available data, gathering insights from:

- **Revenue metrics:** e.g., MRR, month-on-month growth, revenue churn rate, total paying customers count.
- **Product analytics:** e.g., active users, user growth rate, organization growth rate, user retention rate.
- **User feedback:** e.g., NPS score, customer interviews, support tickets, any other requests.

They compile it and put it together in an easy to understand format – here's an [example template](https://docs.google.com/spreadsheets/d/1dxsZv2sYnGNI3sozJjO6rhlMnDheXdujn7Gvvu-BOtA/edit?gid=0#gid=0) you can copy. Next, they do a deep dive and highlight interesting findings we should discuss further.

- The PM, engineers and exec team then meet to discuss questions like:
- Are our 10 biggest customers happy users of the product?
- Do [high ICP](/newsletter/ideal-customer-profile-framework) and non-ICP customers use the product differently?
- Why was churn high last month? Can we identify any reasons?
- Can we find leading indicators that predict long-term product usage? (e.g. Facebook’s 7 friends in 10 days)
- Where in the onboarding funnel do new users struggle?

This paints a full picture of how the team and product are doing. It’s then up to the product team lead (an engineer) to decide if the team should continue on their course, or if something needs to change.

They can choose to reprioritize their projects, change their goals, or come up with new projects entirely. It’s the job of the CEO or senior leader to challenge assumptions, ask hard questions, and ultimately hold the team accountable.

This creates a healthy tension. Engineers maintain their autonomy in decision-making, but there's a clear feedback loop to ensure those decisions are delivering real value. Without this accountability, autonomy can become directionless. With it, teams are empowered to experiment, and pivot quickly based on real-time feedback.

## 5. Learn fast by optimizing for speed

These changes unblock engineers and free product managers from the (not very fun) gatekeeper role, but there’s one final step.

Most humans aren't as magical at product as Steve Jobs. They don't just "know" what to build from the start, or have a grand vision.

Instead, to build the best products you need to:

1. Ship things
2. Get it into the hands of users
3. Iterate on their feedback
4. Repeat

The faster you can do this, the better your product will be. It’s that simple.

To give you some ideas of how you can do this, here are actionable tips we’ve found that help our teams.

### a. No designer by default

The fewer dependencies a project has, the faster it moves.

Design is no exception to this rule, so we have no expectation that projects should start by running through design _first_.

Instead, we encourage engineers to identify the goals of their project and the stage that they're at, then decide how much design help they need.

It looks something like this:

![Design at PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/86068163_7f95_41cf_9028_5eb4aa799db9_1295x1040_9247e766ee.webp)

We also have a [design system](https://storybook.posthog.net/?path=/story/exporter-exporter--trends-bar-breakdown-insight) to help engineers self-serve their design needs and move faster.

### b. Radically transparent communication

We communicate [everything in the open](/founders/how-to-run-a-transparent-company).

This includes team roadmaps, sprint notes, board meeting notes, company finances, fundraising updates, and more. We even eliminated many 1-on-1s, since we found they were a breeding ground for information silos.

The benefits are countless. Not only does it help build context across teams, but it also cuts down on meetings, and speeds up decision making. It even reduces politics – you can't be sneaky if everything is public!

To do this, we set up [communication guidelines](/handbook/company/communication): everything should be done [asynchronously](https://newsletter.posthog.com/p/how-we-work-asynchronously), and there is a clear hierarchy for communication preferences.

![Communication guidelines at PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/1baf3af1_1c6d_4385_85fd_9215b01ff749_1681x1325_084cd4b44e.png)

### c. Small teams

No more than six people per team. Any more than that and it all goes to hell: more meetings, more process, more bottlenecks, and more bullshit. 💩

Here's how we [keep teams small](/newsletter/small-teams) and effective:

- Give them a clear mission – e.g. "Make PostHog the best experimentation platform for engineers"
- Put an engineer in charge
- Let them work however they want
- Split the team when it hits 6 people. No exceptions.

Want proof it works? Here's what a typical week looks like for an engineer at PostHog:

![Screenshot of an engineer's calendar at PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/a0d634a2_bd3e_4229_ae8f_f98269a6c4f7_2268x1473_06595e2e80.jpg)

The magic of small teams isn't just about speed – it's about ownership. When six or fewer people own a problem, there's nowhere to hide and no way to pass the buck. Everyone has to pull their weight, and everyone's contribution matters.

## In summary

This is our playbook in its simplest terms:

- **Great PMs don't control the team or roadmap**. They uncover insights that amplify the team’s impact, and ensure they don’t drift off course.
- **Great product engineers don't need instructions**. They drive product decisions using context PMs provide, and their knowledge of what’s possible.

Getting this dynamic right is how we ship fast, build right, and win


<NewsletterForm />

