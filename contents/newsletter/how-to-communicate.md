---
title: Communication mistakes for engineers to avoid
date: 2025-03-11
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

To address this injustice, we're sharing the biggest mistakes we've seen engineers make when communicating in a remote, async, engineering-led company (and what we've done to fix them).

## 1. Forgetting about your users

It is easy to get caught up in technical details of a project. You tunnel vision on overcoming constraints, optimizing performance, and following best practices. In the process of doing this, you lose what matters most: your user.

Remember, companies don't succeed based on their ability to solve technical problems. They succeed based on their ability to solve user problems. This should reflect in your communication.

At PostHog, our communication connects to users in one of two ways:

1. **It's about a user issue.** Top priorities for us include prioritizing feature requests from customers, solving confusions about a feature, or fixing a bug affecting them. Each of these potentially require coordination and collaboration. 

2. **It's backed by a user experience.** We build features because users want them and their specific needs often guide our implementation. The experiences of users are often our best guide when we're deciding what to work on or how to implement it.

![Facts](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_11_at_10_43_31_2x_9726c09b98.png)

To give you a sense of what this actually looks like, a snapshot of the last 10 Slack messages in our `#team-product-analytics` channel include:

- Two bugs from support
- Two feature requests from other members of our team
- Four customer problems or requests
- One change needing a review
- One general team announcement

Of course, this user focus has tradeoffs. We spend less time talking about technical details, figuring out the best way to do things, and collecting input from stakeholders. This means we need to rely on:

- Hiring great people with experience solving the technical problems we are trying to solve.
- Making ownership clear. It lies with individuals (or at most, a small team).
- Focusing on shipping things users will actually see. We care about outcomes over implementation.

Although this means we might not ship a perfectly polished feature right away, it does mean we can get to something that users actually care about faster.

## 2. Hiding communication in private

There is an old way of thinking that if you keep knowledge to yourself, you'll have more power. In well-functioning organizations, this doesn't work. It leads to silos and confusion. You don't need to hoard information, you're not a squirrel.

![Squirrel](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_11_at_11_29_13_2x_d5fd501927.png)

Hiding information in private causes three problems:

1. It creates unnecessary communication like people repeatedly asking about a process or policy. In a remote company, this can also block you from getting work done and break the flow of others.

2. It reduces discoverability of information. People can't find the knowledge and context they need immediately. 

3. It creates silos and reduces transparency and trust within the organization.

The solution is to make communication legible: write it down and work in public.

This means avoiding meetings, private Slack conversations, and email threads whenever possible. Instead, move communication to public channels, have an accessible wiki or handbook, and default to giving everyone access to everything. 

At PostHog, we take this a step further by making as much as possible public to people outside of our company, including our code, roadmap, and even strategy. 

![Work in public](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_04_at_09_59_36_ddc180f325.png)

This gives our communication further bang for its buck. It has helped us build a brand and trust with our users.

We realize this brand of external openness doesn't work for everyone, but that doesn't mean you need to hide information. Companies like Palantir, Pixar, and Apple are all secretive externally, but have internal openness. This has helped them build the massively successful companies they are today.

## 3. Not giving the receiver the context they need

Everyone's been on the receiving end of a low context message like “this isn't working” or “what do you think of this?” It then becomes your responsibility to figure out the context so you can work towards a solution.

This sucks, and if you don't like being subjected to it, you shouldn't do it to others.

This problem is especially prevalent in remote companies as you can't tell if people understand the context. When in-person, you can tell if you are losing people or if they don't understand.

The fix is to include all the context a reader needs to succeed. This usually means sharing:

1. **Data.** Messages often include the link to the query, insight, dashboard, or error trace. Say what metric you care about.

2. **Feedback.** A common sentence we see at PostHog is “X gave feedback that…” followed by a potential solution for that feedback.

3. **Experience.** We care about what the end user experience actually is. Examples and anecdotes from users are hugely valuable.

## 4. Being completely unstructured

People want to communicate. They want to distribute information with each other. Information wants to be free.

It can be tempting to let people do whatever they want, but this can quickly devolve into one of two things:

- **Overcommunication.** Noise and mess that makes finding the information you need difficult.

- **Undercommunication.** Not sharing information others need to succeed, getting unnecessary blocked or stuck because others don't know what you're working on.

Creating "rituals" help you communicate at the right time and place. They are repeated, formatted moments to encourage communication so you stay aligned and make sure everyone has what they need to succeed. 

Our most important ones at PostHog include:

1. **All hands.** Where the most important updates are shared with the team like revenue and hiring. A Q&A with our founders, James and Tim. Demos of what anyone built in the last week.

2. **Sprint planning.** A [review](https://github.com/PostHog/posthog/issues/28840) done by each product team every two weeks. Combines retrospective, planning for the next two weeks, and progress of quarterly goals.

3. **Daily huddles.** An optional meeting within small teams where each member shares what they did yesterday, what they're doing today, and any blockers.

4. **Request for comments.** A proposal related to a big decision that shares a problem, a potential solution, and gathers feedback. Team members share opinions and feedback, then the owner makes a decision. This is how we coordinate large, cross-team decisions async.

5. **Incidents.** When something bad and unexpected happens, a new Slack channel is created to identify the problem and bring together a small group to work towards a solution.

Rituals aren't unique to PostHog. Zapier requires [Friday Updates](https://zapier.com/blog/friday-updates-at-work/) from everyone on their internal blog. [Basecamp](https://github.com/basecamp/handbook/blob/master/how-we-work.md) has daily and weekly check-ins as well as kickoffs and heartbeats. [Linear](https://linear.app/method/introduction) works in 2 week cycles, writes project specs, and keeps an updated changelog.

All rituals, including ours, are downstream from the culture you want to create. For us, that means they are as async as possible and involve as few meetings as possible. This ensures that we have enough time to work on what's important.

## 5. Not making communication actionable

As organizations grow, they have a tendency to add process and structure which puts blockers in the way of shipping. Communication is one of the areas that can pop up, but thinking about the actionability of your communication can prevent this.

We do this by:

1. **Prioritizing pull requests over anything else.** We have a hierarchy of communication with pull requests on the top and email on the bottom. Pull requests are very close to being shipped code and all other communication gets progressively further from that being the case. 
    
    ![Tier list](https://res.cloudinary.com/dmukukwp6/image/upload/image_aa634fbdf0.png)
    
2. **Have a clear owner, next steps, and deadline.** This makes it clear how progress is going to lead from communication. Without this, communication is often wasted and becomes noise. If you send a message without a purpose, you are creating noise.

3. **Be understood.** You must communicate differently depending on the context your recipient has. You need to communicate differently with non-technical people than with technical ones. Avoid acronyms whenever possible. 

4. **Be direct.** At PostHog, we assume positive intent and realize that feedback is essential (these are two of our communication values). If you're not direct, you're wasting time and doing more harm than good. 

Ideally, communication is a sort of funnel that guides people towards action like this:

![Funnel](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_27_at_15_45_54_2x_0acb51a9ec.png)

The goal of communication is to help us get something shipped. Although ideally, we would need little to no communication to do this, eventually it happens. The best we can do once this is the case is make it actionable.

## What happens when you avoid these mistakes?

- It creates a culture of communication that prioritizes shipping features that users actually care about, rather than planning or theorizing them.
- Because the information you need is available at the right time, everyone can work more autonomously with fewer meetings and less back and forth.
- When making decisions, more perspectives are taken into account, not just the "highest paid person's opinion."
- Knowledge you've gained gets shared and built upon, rather than lost and forgotten.

Don't believe this is real? This is largely how communication works at PostHog and based on a recent internal survey, it seems to be working.

- 95% of people said PostHog has open and honest two-way communication
- 97% of people said leaders at PostHog keep people informed about what is happening.
- 98% of people said they understand PostHog's goals and can see how their work contributes to them.

Although communication can always be improved, avoiding these mistakes goes a long way in doing it as well as possible.