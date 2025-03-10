---
title: How to communicate like a product engineer
date: 2025-03-04
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

### Subtitle: Non-obvious lessons from how engineers communicate at PostHog

Engineers spend a majority of their time doing two things: coding and communicating. The first has seemingly endless amounts written about it, but the second has relatively little.

To help change this, we’re sharing how our team of product engineers communicate effectively as a fully remote and async team. 

Unlike other posts on communication, we’re only including the strategies and tactics we actually use. No elaborate frameworks to help you say “no blockers from me” in your daily standup.

## Start with the user in mind

Underlying every interaction at PostHog is a user focus. Our mission is to equip every developer to build successful products and communication should help us do this.

This means a majority of communication is directly connected to users in one of two ways:

1. **It’s about a user issue.** Solving customer confusion about a feature, fixing a bug affecting them, or prioritizing a feature request for a customer. Each of these potentially require coordination and collaboration. 

2. **It’s backed by a user experience.** We build features because users want them and their specific needs often guide our implementation. We decide what to work on or how to implement something, the experience of a user is often our best guide.

To get a better sense of what this actually looks like, we can look at the actual Slack messages of one of our product teams. For example, the last 10 messages for `#team-product-analytics` look like:

- Two bugs from support
- Two feature requests from other members of our team
- Four customer problems or requests
- One change needing a review
- One general team announcement

This focus on information from users really sets product engineers apart from more traditional software engineering teams.

![Information sources](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_04_at_09_54_13_ae899358ee.png)

### What’s the tradeoff to this user focus?

Of course, this user focus isn’t without tradeoffs. Simply, we spend less time talking about technical details, figuring out the best way to do things, and collecting input from stakeholders. Less communication is better here.

Instead, we rely on:

- Hiring great people who have experience solving the technical problems we are trying to solve.
- Making ownership clear. It lies with individuals (or at most, a small team).
- Focusing on shipping things users will actually see (repeatedly). We focus on outcomes, not implementation.

Although this means we might not ship a perfectly polished feature right away, it does mean we can get to something that users actually care about faster.

## Work in public

There is a saying teachers tell you in school: “If you have a question, ask it, because it’s very likely others have the same question too.” Well, it turns out this is true in real life as well, and a key part in communicating effectively.

Communicating publicly has a lot of benefits:

1. It prevents unnecessary communication like people repeatedly asking about a process or policy.
2. Improves discoverability of information. Helps people find the knowledge and context they need immediately. 
3. Creates transparency and trust within the organization.

For most companies, communicating publicly means avoiding private Slack conversations and using an internal repo, but we take it a step further than this by making as much as possible public, including our code, roadmap, and even strategy. 

![Work in public](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_04_at_09_59_36_ddc180f325.png)

This gives our communication further bang for its buck. It has helped us build a brand and trust with our users.

## Give the full context

When you have smart, talented people around you, lazy thinking won’t do it. You can’t make baseless claims, you will get called out. You need to back what you’re saying and your opinion with evidence. This is why one of our communication values is **form an opinion.**

And once you’ve done the work to form that opinion, you might as well share it. Sharing this context can save a significant amount of time for the ones receiving the information and help them form their own opinion.

This usually means sharing:

1. **Data.** Messages often include the link to the query, insight, dashboard, or error trace. Say what metric you care about. ****

2. **Feedback.** A common sentence we see at PostHog is “X gave feedback that…” followed by a potential solution for that feedback.

3. **Experience.** We care about what the end user experience actually is. Examples and anecdotes from users are hugely valuable.

The opposite of this is just saying “this isn’t working” or “what do you think of this?” Low context communication like this puts all of the work onto the receiver, leaves more room for ambiguity, and is simply less effective. 

## Have rituals

People want to communicate. They want to distribute information with each other. Information wants to be free. 

Rituals help you communicate at the right time and place. They help structure communication so you stay aligned and make sure everyone has what they need to succeed. Our most important ones at PostHog:

1. **All hands.** Where the most important updates are shared with the team. Q&A with James and Tim. Demos of what anyone built in the last week.

2. **Sprint planning.** A [bi-weekly review](https://github.com/PostHog/posthog/issues/28840) combination of retrospective and planning done by each team. 

3. **Daily huddles.** Within small teams, each member shares what they did yesterday, what you’re doing today, and gets any support they need.

4. **Request for comments.** A large document related to a big decision that shares a problem, a potential solution, and gathers feedback. This is how we coordinate big problems across teams.

5. **Incidents.** When something bad and unexpected happens, anyone can start an incident where a channel is created, the problem is identified, and the team works towards a solution.

Broadly, these aren’t unique to PostHog. Zapier requires [Friday Updates](https://zapier.com/blog/friday-updates-at-work/) from everyone on their internal blog. [Basecamp](https://github.com/basecamp/handbook/blob/master/how-we-work.md) has daily and weekly check-ins as well as kickoffs and heartbeats. [Linear](https://linear.app/method/introduction) works in 2 week cycles, writes project specs, and keeps an updated changelog.

All rituals, including ours, are downstream from the culture you want to create. For us, that means they are as async as possible and involve as few meetings as possible. This ensures that we have enough time to work on what’s important.

## Make communication actionable

The goal of communication is to help us get something shipped. Although ideally, we would need little to no communication to do this, eventually it happens. The best we can do once this is the case is make it actionable. 

We do this by:

1. **Prioritizing pull requests over anything else.** We have a hierarchy of communication with pull requests on the top and email on the bottom. Pull requests are very close to being shipped code and all other communication gets progressively further from that being the case. 
    
    ![Tier list](https://res.cloudinary.com/dmukukwp6/image/upload/image_aa634fbdf0.png)
    
2. **Have a clear owner, next steps, and deadline.** This makes it clear how progress is going to lead from communication. Without this, communication is often wasted and becomes noise. If you send a message without a purpose, you are creating noise.

3. **Be understood.** You must communicate differently depending on the context your recipient has. ****You need to communicate differently with non-technical people than with technical ones. Avoid acronyms whenever possible. 

4. **Be direct.** At PostHog, we assume positive intent and realize that feedback is essential (these are two of our communication values). If you’re not direct, you’re wasting time and doing more harm than good. 

Ideally, communication is a sort of funnel that guides people towards action like this:

![Funnel](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_27_at_15_45_54_2x_0acb51a9ec.png)

This is important to always keep in mind. As organizations grow, they have a tendency to add process and structure which puts blockers in the way of shipping. Communication is one of the areas that can pop up, but thinking about the actionability of your communication can prevent this.