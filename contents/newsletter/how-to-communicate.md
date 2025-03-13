---
title: Communication mistakes for engineers to avoid
date: 2025-03-13
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/choosetech_c01bfb0582.png
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---

### Subtitle: The do's and don'ts of communication for product engineers

Engineers spend most of their time doing two things: coding and communicating. The first has seemingly endless amounts written about it, but the second has relatively little.

To address this injustice, we're sharing the biggest mistakes we've seen engineers make when communicating and what we've done as a remote, async, engineering-led company to fix them.

## 1. Forgetting about your users

It is easy to get caught up in technical details of a project. You tunnel vision on overcoming constraints, optimizing performance, and following best practices. In the process of doing this, you lose what matters most: your user.

Remember, companies don't succeed based on their ability to solve technical problems. They succeed based on their ability to solve user problems. This should reflect in your communication.

At PostHog, our communication connects to users in one of two ways:

1. **It's about a user issue.** Top priorities for us include feature requests from customers, solving confusions about features, or fixing bugs affecting them. These often require coordination and collaboration. 

2. **It's backed by a user experience.** We build features because users want them. This means their specific needs are often our best guide for what to work on or how to implement it.

To give you a sense of what this actually looks like, a snapshot of the last 10 Slack messages in our `#team-product-analytics` channel include:

- Two bugs from support
- Two feature requests from other members of our team
- Four customer problems or requests
- One change needing a review
- One general team announcement

![Pie chart](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_13_at_14_51_31_2x_593239b0fd.png)

Of course, this user focus has tradeoffs. We spend less time discussing technical details, figuring out the best way to do things, and collecting input from stakeholders. We instead rely on:

- Hiring great people with experience solving the technical problems we are trying to solve.
- Making ownership clear. It lies with individuals (or at most, a small team).
- Focusing on shipping things users will actually see. We care about outcomes over implementation.

Although this means we aren't shipping a perfectly polished feature right away, it does mean we can get to something that users actually care about faster.

## 2. Going squirrel mode and hoarding information

People have a tendency to hoard information. They're scared that if they share it, they'll either look silly or lose the power they think it provides. If you want your organization to work well, this is a mistake. You aren't a squirrel.

![Squirrel](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_11_at_11_29_13_2x_d5fd501927.png)

Hoarding information privately causes three problems:

1. It creates unnecessary communication like people repeatedly asking about a process or policy. This blocks people from getting work done and breaks the flow of others.

2. It reduces discoverability of information. People can't find the knowledge and context they need immediately. This causes people to redo work others have already done.

3. It creates silos and reduces transparency and trust within the organization. It creates a negative feedback loop where sharing information is seen as a sign of weakness.

The solution is to make communication legible: write it down and work in public.

This means avoiding closed door meetings, private Slack conversations, and email threads whenever possible. Instead, move communication to public channels, have an accessible wiki or handbook, and default to giving everyone access to everything.

This starts by leading by example. At PostHog, leaders share details that are often private at other companies, like company finances or the reasons for letting people go. By doing this, they encourage everyone else to do the same. Hiding engineering knowledge looks trivial in comparison.

We also take "working in public" a step further by sharing as much as possible publicly, outside our company. This includes our code, roadmap, and even strategy. This gives our communication further bang for its buck and helps us build trust with our users.

![Work in public](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_04_at_09_59_36_ddc180f325.png)

We realize external openness doesn't work for everyone, but that doesn't mean you should return to hoarding information. Companies like Palantir, Pixar, and Apple are all secretive externally, but have internal openness. This has helped them build the massively successful companies they are today.

## 3. Vibe communicating (AKA lacking an opinion)

One of the most important forms of communication is sharing opinions. Opinions are direction. They are what your product and company become.

It is then critical to do the work to **form an opinion**. Relying on whatever comes to mind (or whatever ChatGPT tells you) will leave you directionless and undifferentiated.

![Self proclaimed free thinkers](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_13_at_14_58_45_2x_fd6326ed59.png)

When sharing an opinion, ask yourself:

1. Is this really true?
2. What evidence do I have to support this?

Steelmanning is a great way to do this. It means thinking about the best opposing arguments and ensuring your opinion is strong enough to hold up to them. I like to think of what my smartest coworkers (or competitors) might say in opposition and then ensure I back up my points with enough to stand up to them.

Our request for comments (RFC) process exemplifies this approach. When someone creates an RFC, they don't just say there is a problem, they propose a specific solution, take a stand on why it's right, mention alternatives, and invite feedback.

Being opinionated enables us to move faster and more autonomously. Teams don't wait to be assigned tasks or told what to do. They identify problems and go solve them.

> **Bonus point: Don't hedge.** Once you've done the work to form an opinion, be confident and direct in sharing it. Don't hedge by saying "maybe" or "I'm not sure." Vague, non-committal communication might feel safer, but it rarely leads to action.

## 4. Not giving the receiver the context they need

Everyone's been on the receiving end of a low context message like “this isn't working” or “what do you think of this?” It then becomes your responsibility to figure out the context so you can work towards a solution.

This sucks, and if you don't like being subjected to it, you shouldn't do it to others.

This problem is especially prevalent in remote companies. In-person, you can see the blank stares and distracted looks when you're losing people, but these are invisible remotely.

You need to account for this by including all the context a reader needs to succeed. This usually means sharing:

1. **Data.** Communication often includes the link to the query, insight, dashboard, or error trace. Say what metric you care about. Query performance, revenue churn, error volumes, and conversion are all common metrics at PostHog.

2. **Feedback.** It is common to see “X gave feedback that…” or "X is having trouble with Y" when communicating at PostHog. This often includes a link to the message from the user or the problem area in-app as well as a potential solution for it. 

Sharing the context gives the receiver more of the information they need to evaluate the problem as well as a jumping off point for finding a solution.

## 5. Being completely unstructured

People want to communicate. They want to distribute information with each other. Information wants to be free.

It can be tempting to let people do whatever they feel is best, but this can quickly devolve into one of two problems:

- **Overcommunication.** Noise and mess makes it difficult to find what's actually relevant and valuable.

- **Undercommunication.** Others become unnecessarily blocked or stuck because others don't know what you're working on and don't have all the information they need to succeed.

Fixing this requires giving people a time and place to communicate. You can think of these at "rituals," repeated, formatted moments to encourage communication. They help teams stay aligned and make sure everyone has what they need to succeed. 

Our most important ones at PostHog include:

1. **All hands.** Where the most important updates are shared with the team like revenue and hiring. A Q&A with our founders, James and Tim. Demos of what anyone built in the last week.

2. **Sprint planning.** A [review](https://github.com/PostHog/posthog/issues/28840) done by each product team every two weeks. Combines retrospective, planning for the next two weeks, and progress of quarterly goals.

3. **Daily huddles.** An optional meeting within small teams where each member shares what they did yesterday, what they're doing today, and any blockers.

4. **Request for comments.** The way we coordinate large, cross-team decisions async. A proposal that shares a problem, a potential solution, and gathers feedback. Team members share opinions and feedback, then the owner makes a decision. 

5. **Incidents.** When something bad and unexpected happens, a new Slack channel is created to identify the problem and bring together a small group to work towards a solution.

Rituals aren't unique to PostHog. Zapier requires [Friday Updates](https://zapier.com/blog/friday-updates-at-work/) from everyone on their internal blog. [Basecamp](https://github.com/basecamp/handbook/blob/master/how-we-work.md) has daily and weekly check-ins as well as kickoffs and heartbeats. [Linear](https://linear.app/method/introduction) works in 2 week cycles, writes project specs, and keeps an updated changelog.

All rituals, including ours, are downstream from the culture you want to create. For us, that means they are as async as possible and involve as few meetings as possible. This ensures that we have enough time to work on what's important.

## 6. Not making communication actionable

As organizations grow, they have a tendency to add process and structure which puts blockers in the way of shipping. Communication is one of the areas that this can pop up, so you need to be constantly fighting against this tendency.

We do this by:

1. **Prioritizing pull requests over anything else.** We have a hierarchy of communication with pull requests on the top and email on the bottom. Pull requests are very close to being shipped code and all other communication gets progressively further from that being the case. 
    
    ![Tier list](https://res.cloudinary.com/dmukukwp6/image/upload/image_aa634fbdf0.png)
    
2. **Having a clear owner, next steps, and deadline.** This makes it clear how progress is going to follow from communication. Without this purpose, communication is often wasted and becomes noise.

3. **Having empathy.** Take the perspective of the recipient into account. Communicate like you'd want to be communicated with. For example, you need to communicate differently with non-technical people than with technical ones.

4. **Being direct.** At PostHog, we assume positive intent and realize that feedback is essential (these are two of our communication values). If you're not direct, you're wasting time and doing more harm than good. 

Ideally, communication is a sort of funnel that guides people towards action like this:

![Funnel](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_27_at_15_45_54_2x_0acb51a9ec.png)

The goal of communication is to help us get something shipped. Although ideally, we would need little to no communication to do this, eventually it happens. The best we can do once this is the case is make it actionable.

## What happens when you avoid these mistakes?

- You create a culture of communication that prioritizes shipping features that users actually care about, rather than planning or theorizing them.

- Because the information you need is available at the right time, everyone can work more autonomously with fewer meetings and less back and forth.

- When making decisions, more perspectives are taken into account, not just the "highest paid person's opinion."

- Knowledge you've gained gets shared and built upon, rather than lost and forgotten.

Don't believe this is real? This is largely how communication works at PostHog and based on a recent internal survey, it seems to be working.

- 95% of people said PostHog has open and honest two-way communication
- 97% of people said leaders at PostHog keep people informed about what is happening.
- 98% of people said they understand PostHog's goals and can see how their work contributes to them.

Although communication can always be improved, avoiding these mistakes goes a long way in doing it as well as possible.