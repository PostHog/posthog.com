---
title: What engineers get wrong about communication
date: 2025-03-23
author:
    - ian-vanagas
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/image_1_2594402957.png
featuredImageType: full
tags:
    - Engineering
crosspost:
    - Product engineers
    - Blog
---

Engineers spend most of their time doing two things: coding and communicating. The first has endless amounts written about it; the second much less so.

To address this injustice, we're sharing:

1. The biggest mistakes we see engineers make when communicating.

2. What we do as a [remote](/newsletter/remote-working), [async](/newsletter/how-we-work-async), [engineering-led](/newsletter/small-teams) company to eliminate them.

## 1. Forgetting about your users

It's easy to get caught up in the technical details of a project, such as overcoming constraints, optimizing performance, and following best practices.

But companies don't succeed based on their ability to solve [technical problems](/newsletter/choosing-technologies). They win when they solve their user's [most painful and valuable problems](/newsletter/how-to-uncover-your-users-real-problems).  
This should be reflected in your communication. At PostHog, our communication connects to users in one of two ways:

1. **It's about a user issue.** Top priorities for us include feature requests from customers, solving confusions about features, or fixing bugs affecting them. These often require coordination and collaboration.

2. **It's backed by a user experience.** We build features because users want them. This means their specific needs are often our best guide for what to work on or how to implement it.

To give you a sense of what this actually looks like, a snapshot of the last 10 Slack messages in our `#team-product-analytics` channel includes:

-   Two bug reports from support
-   Two feature requests from other members of our team
-   Four customer problems or requests
-   One change needing a review
-   One general team announcement

In other words, 80% of the communication was about problems customers had, or requests for features of changes to improve the experience.

![Pie](https://res.cloudinary.com/dmukukwp6/image/upload/pie_c45c71d96a.png)

This user focus does have tradeoffs: we spend less time discussing technical details, figuring out the best way to do things, and collecting input from stakeholders.  
Instead, we rely on:

-   [Hiring great people](/founders/cracked-manifesto) who can deal with technical problems as they arise.

-   Making ownership clear. It lies with individuals, or at most [a small team](/newsletter/small-teams).

-   Focusing on [shipping things](/handbook/engineering/development-process) users will actually see. Outcomes > implementation.

Sometimes this means we aren't shipping a perfectly polished feature right away, but the benefit is we can get to something that users actually care about faster.

> **Try this:** Include a link to the Zendesk issue, customer Slack thread, tweet, or [user interview note](/product-engineers/interview-snapshot-guide) in your next message about development. If you don't have access to these, the first step is changing that.

## 2. Hoarding information (aka Squirrel Mode)

People tend to hoard information. They are scared sharing it will make them look silly, or lose the power they think it provides.

But this attitude kills companies. Knowing things isn't a super power, sharing what you know is. You're not a squirrel.

![Squirrel mode](https://res.cloudinary.com/dmukukwp6/image/upload/image_1_2594402957.png)

Hoarding information causes three problems:

1. **It creates unnecessary communication**, like people repeatedly asking about a process or policy. Individuals with knowledge become bottlenecks to progress.

2. **It generates duplication of effort**. When information isn't freely available, people end up working on solved problems, or features that already exist.

3. **It creates silos and reduces trust**, and a negative feedback loop where sharing information is seen as a sign of weakness, and knowledge is wielded as a weapon.

The solution is to make communication legible: [write it down](/newsletter/remote-working#1-they-write-everything-down) and work in public.

This means avoiding closed door meetings, private Slack conversations, and email threads, whenever possible. Instead, move communication to public channels, have an accessible wiki or [handbook](/handbook), and default to giving everyone access to everything.

But this only works if it comes from the top. At PostHog, the [Blitzscale Team](/teams/blitzscale) shares details that are often private at other companies, like [company finances](/handbook/people/finance), slides from [board meetings](/handbook/exec/annual-planning), or the reasons for [letting people go](/handbook/strong-team#a-small-group-of-stronger-people-and-compensation). In doing this, they encourage everyone else to do the same. Hiding engineering knowledge looks trivial in comparison.

We also take "working in public" a step further by sharing as much as possible publicly, outside our company. This includes our [code](https://github.com/PostHog/), [roadmap](/roadmap), and even [strategy](/handbook/why-does-posthog-exist).

Sharing so much context publicly compounds its impact. It builds trust with customers, and means potential candidates and new starters arrive having already consumed the context they need to have an immediate impact.

![Transparent](https://res.cloudinary.com/dmukukwp6/image/upload/transparent_5e2a33f68d.png)

We realize external openness doesn't work for everyone, but that doesn't mean you should return to hoarding information. Companies like [Palantir](https://nabeelqu.substack.com/i/150188028/secrets), [Pixar](https://hbr.org/2008/09/how-pixar-fosters-collective-creativity), and [Meta](https://alvinwan.com/why-and-why-not-work-at-meta/) are all secretive externally, but have internal openness. This has helped them build the massively successful companies they are today.

> **Try this:** Write a guide or runbook on an undocumented process you're responsible for. Refer to it the next time someone asks you about it. We have a ton of public examples of these from [making schema changes safely](/handbook/engineering/databases/schema-changes) to [optimizing queries](/handbook/engineering/databases/query-performance-optimization) to [running growth reviews](/handbook/product/per-product-growth-reviews).

## 3. Lacking an opinion

Opinions are direction. They are what your product and company become. People who don't communicate in an opinionated way are easily ignored, and often resent their lack of influence.

To avoid this outcome, it's critical to do the work to actually **form an opinion**. Relying on whatever comes to mind (or whatever ChatGPT tells you) will leave you directionless and undifferentiated.

![Self proclaimed free thinkers](https://res.cloudinary.com/dmukukwp6/image/upload/self_proclaimed_b2e77537be.png)

When sharing an opinion, ask yourself:

1. Is this really true?
2. What evidence do I have to support this?

One way I do this is to anticipate what my smartest coworkers (or competitors) might say in opposition to an idea or opinion, and then ensure I back up my points with enough to stand them up. A process sometimes referred to as [steelmanning](https://en.wikipedia.org/wiki/Straw_man#Steelmanning).

Our [request for comments](/newsletter/choosing-technologies#4-we-make-decisions-asynchronously) (RFC) process exemplifies this approach. When someone creates an RFC, they don't just say there is a problem, they propose a specific solution, take a stand on why it's right, mention alternatives, and invite feedback.

Once you've done the work to form an opinion, be confident and direct in sharing it. Don't hedge by saying "this might be a good idea" or "maybe we could do this." Vague, non-committal communication might feel safer, but it rarely leads to action.

Being opinionated (and sharing those opinions clearly) enables us to move faster and more autonomously. Teams don't wait to be assigned tasks or told what to do. They identify problems and go solve them.

> **Remember this:** It's better to say “I need more time to think about this” than share a vague, uncommitted opinion. We prefer async communication precisely because it gives people the time to digest context and develop informed opinions.

## 4. Not including enough context

Low context messages like “this isn't working” or “what do you think of this?” suck. They burden the receiver with figuring out the context, so they can work towards a solution. They sap energy out of others.

This problem is common in [remote companies](/newsletter/remote-working), especially ones wedded to old habits formed from working in an office. In remote settings, you can't see the blank stares and distracted looks of people you're losing.

You need to account for this by including all the context a reader needs to succeed. This usually means sharing:

1. **Data.** Communication often includes the link to the [query](/docs/product-analytics/sql), [insight](/docs/product-analytics/insights), [dashboard](/docs/product-analytics/dashboards), or [error trace](/docs/error-tracking/monitoring). Say what metric you care about. Query performance, revenue churn, error volumes, and [conversion](/docs/product-analytics/funnels) are all common metrics at PostHog.

2. **Feedback.** It is common to see “[X gave feedback that…](/tutorials/feedback-interviews-site-apps)” or "X is having trouble with Y" when communicating at PostHog. This often includes a link to the message from the user, or the problem area in-app, and a potential solution for it.

Sharing the context gives the receiver more of the information they need to evaluate the problem as well as a jumping off point for finding a solution.

Likewise, when asking a question, provide both the question you have **AND** the reason you're asking. This can save a lot of back and forth, and often leads to a better solution than the one you assumed existed.

> **Remember this:** Put yourself in your recipient's shoes. Would you be able to accomplish what you want them to given the context you provide?

---

## 5. Being completely unstructured

People want to communicate. They want to distribute information with each other. Information wants to be free.  
It can be tempting to let people do whatever they feel is best, but this can quickly devolve into one of two problems:

-   **Over-communication.** Noise and mess makes it difficult to find what's actually relevant and valuable.

-   **Under-communication.** Others become blocked because they don't know what you're working on, or don't have all the information they need to succeed.

Fixing this requires giving people a time and place to communicate. You can think of these as "rituals," repeated, formatted moments to encourage communication. They help teams stay aligned and make sure everyone has what they need to succeed.

Our rituals include:

1. **Weekly all-hands.** A 30-minute call where the most important updates are shared with the team, like revenue, hiring, and a [topic of the day](/handbook/exec/all-hands-topics). A Q&A with our founders, James and Tim. Demos of what anyone built in the last week.

2. **Sprint planning.** A [review](https://github.com/PostHog/posthog/issues/28840) done by each product team every two weeks. Combines retrospectives, planning for the next two weeks, and progress towards quarterly goals.

3. **Growth reviews.** For products with product-market fit, we hold [monthly meetings](/handbook/growth/growth-engineering/growth-sessions) to review metrics like revenue, churn, usage, activation, and more. Teams then discuss how they can improve these and agree actions.

4. **Request for comments.** This is how we coordinate large, cross-team decisions async. [An RFC](/handbook/company/communication#requests-for-comment-rfcs) shares a problem, a potential solution, and gathers feedback. Team members share opinions and feedback, then the owner makes a decision.

5. **Quarterly planning.** Teams reflect before the meeting using our version of SWOT named [HOGS](/handbook/company/goal-setting) (Hopes, Obstructions, Growth Opportunity, Sneak Attack). We take an hour to brainstorm goals. These are focused on what we will ship over with owners, what we'll ship, and successful metrics.

Rituals aren't unique to PostHog. Zapier requires [Friday Updates](https://zapier.com/blog/friday-updates-at-work/) from everyone on their internal blog. [Basecamp](https://github.com/basecamp/handbook/blob/master/how-we-work.md) has daily and weekly check-ins as well as kickoffs and heartbeats. [Linear](https://linear.app/method/introduction) works in two-week cycles, writes project specs, and keeps an updated changelog.

All rituals, including ours, are downstream from the culture you want to create. For us, that means they are as async as possible and involve as few meetings as possible. This ensures that we have enough time to work on what's important.

> **Try this:** Write down the rituals you're a part of and reflect on their purpose. Do they overlap? Are they all necessary? Would they benefit from a bit more structure?

## 6. Not making communication actionable

Organizations tend to [add process](/handbook/values#4-trust-and-feedback-over-process) and structure as they grow, which slows them down. Communication is one of the areas that this can pop up, so you need to be constantly fighting against this tendency.

We do this by:

1. **Prioritizing pull requests over anything else.** We have a hierarchy of communication with pull requests on the top and email on the bottom. Pull requests are very close to being shipped code and all other communication gets progressively further from that being the case.

![Tier list](https://res.cloudinary.com/dmukukwp6/image/upload/tierlist_39eb9fd367.png)

2. **Having a clear owner, next steps, and deadline.** This makes it clear how progress is going to follow from communication. Without this purpose, communication is often wasted and becomes noise.

3. **Having empathy.** Take the perspective of the recipient into account. Communicate like you'd want to be communicated with. For example, you need to communicate differently with non-technical people than with technical ones.

4. **Being direct.** At PostHog, we [assume positive intent](/handbook/company/communication#our-communication-values) and realize that feedback is essential (these are two of our communication values). If you're not direct, you're wasting time and doing more harm than good.

A piece of communication that best represents this action-orientation is our team splits. Usually, a new team forming would take weeks (or months) of meetings and planning. At PostHog, it takes the form of a single message with a lot of 🪓 and 🚨 emojis.

![James axe](https://res.cloudinary.com/dmukukwp6/image/upload/james_f703debec3.jpg)

This is direct, gives only the important context, and provides clear owners and next steps. This helps everyone get back to what's important: shipping.

## What happens when you avoid these mistakes?

-   You create a culture of communication that prioritizes shipping features that users actually care about, rather than planning or theorizing them.

-   Because the information you need is available at the right time, everyone can work more autonomously with fewer meetings and less back and forth.

-   When making decisions, more perspectives are taken into account, not just the "highest paid person's opinion."

-   Knowledge you've gained gets shared and built upon, rather than lost and forgotten.

Don't believe this is real? This is largely how communication works at PostHog and based on a recent [internal survey](/handbook/people/feedback#team-surveys), it seems to be working.

-   95% of people said PostHog has open and honest two-way communication
-   97% of people said leaders at PostHog keep people informed about what is happening.
-   98% of people said they understand PostHog's goals and can see how their work contributes to them.

Although communication can always be improved, avoiding these mistakes goes a long way in doing it as well as possible.

<NewsletterForm />
