---
date: 2025-03-27
title: 8 ways PostHog works differently
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/happy-hog.png
author:
  - david-newell
featuredImageType: full
category: Engineering
tags:
  - Product engineers
  - Product
crosspost:
  - Product engineers
  - Blog
---

Often when I give candidates an opportunity to ask questions during an interview they don’t have that many. They reference the handbook and our open source ethos as the reason their questions have already been answered. I had the same experience and yet after joining I was still surprised at just how different PostHog works. When onboarding <TeamMember name="Hugues Pouillot" /> to the [Error tracking](https://posthog.com/error-tracking) team in London last week I organised a session covering some of those differences. This is that list.

### Run don’t walk

Startups often move fast as their advantage over incumbents. PostHog moves fast, like really fast. If it helps, try to be in the mindset that we’re already behind. When I joined <TeamMember name="James Hawkins" /> told me he’d rather see people sprint and stumble over hurdles on track than he would watch everyone walk to the finish line. We do this by cutting out as much company middleware as possible. The best example is possibly how team changes are proposed as messages in Slack. We skip out a ton of meetings usually organised to decide this stuff while maintaining transparency and openness throughout. Often those involved are not even consulted in advance. I was the last person to read when it was suggested I lead the new Error tracking team.

### Plan to prioritise 

We’re relatively light on planning processes. Quarterly planning is an hour long meeting, our two week sprints are decided in standup. We prefer when people say exactly what they’re going to work on rather than an expected outcome. It’s why we changed the company value from “bias for impact” to “bias for action”. We’d prefer people increased their chances of success by building more than spending time hypothesising what might work.

We’re willing to throw our plans out the door if something more important presents itself. It comes from the belief that we haven’t built our defining feature yet. It is your responsibility to make the call as to what you work on. If you’re looking for guidance on whether something is a priority try to focus on the key elements of our strategy. If it is something that helps us get in first with customers or would be used by developers then it’s probably worth doing.

### Try to self serve

PostHog hires full stack engineers, a disproportionate number being senior. We also tend to bias for former founder. These are all intentional decisions to find people wanting and able to work autonomously. We have the #ask-posthog-anything Slack channel but don’t be lazy and post there straight away. Read the handbook first (and update it afterwards), try reading the code, write a query in Metabase, search for the data you need in PostHog, reach out to customers of your own accord.

### Embrace directness

People really care about PostHog as a product and a company. Prepare for them to be direct in their feedback as a result. It’s up to you what you do with that feedback. As <TeamMember name="Paul D'Ambra" /> describes it, feedback is as a gift and some gifts are best placed at the bottom of the wardrobe never to be looked at again. Remember we are ultimately responsible for our small team and product.

On the converse, we expect people to be opinionated about their own work. We want you to own it and see it through. <TeamMember name="Ben White" /> told me early on that “if you haven’t ruffled some feathers in your first few months you haven’t pushed the bounds hard enough”.

### Be technical in support replies

Our mission is to equip every developer with the tools to build better products. That means the majority of the time you’re talking to customers they will be engineers just like you. Our customers are curious developers just like you, they will appreciate if you explain things. Don’t be afraid to get technical and give them the full context on the issue. Plus it’s often more fun to explain the actual problem than to give some bland canned response like "I've forwarded this onto the appropriate team who will investigate". Lean into how open we are as a company. Share the offending line of code causing their bug and link the PR to fix it.

### People have atypical roles

People work across many different things. <TeamMember name="Fraser Hopper" /> is a great example of someone who touches compliance through SOC2, recruitment through interview screeners, and finances through budgeting (all while still making time to attend Celtic games). This allows us to have a smaller team and thus be super efficient as a business. This applies to engineers too. You will be expected to organise your own customer interviews, answer support tickets and decide the roadmap for our product, on top of your normal work building features, fixing bugs and managing infrastructure. By not needing separate researchers, support staff and product managers teams we can keep teams super small and give them autonomy over their entire product. We like to hire people who enjoy this expansive a role like ex-founders.

### Async first

Look at anyones calendar. They’re all empty. We have two no meetings day every week and encourage people to cancel as many meetings as possible, especially recurring ones. Don’t expect us to have 1:1s beyond your first couple of weeks. When you do need something try to do it async first. People are busy and don’t necessarily have the bandwidth to dedicate 100% of their time to a meeting. There should be minimal coordination needed outside our team because of the autonomy we give each small team. If you do need something outside our team it’s better to bias for action and step on toes. Shipping a PR and tagging the other team for review will often get you what you need faster than asking them to implement something for you.

### Be customer obsessed

Being unreasonably helpful to customers should be the default. Some things you can do:

- Reply as quickly as possible to tickets when on support
- Offer every alternative or workaround possible if you don’t have an immediate solution to their problem
- Try to ship a fix rather than filing a bug report for someone else to fix. Small teams means there is no one else, you might as well save yourself the paperwork. Look at <TeamMember name="Paul D'Ambra" />. He is the master of delighting customers with a quick turnaround on a bug fix or feature request. 

### Do things that scale

The Y Combinator adage is to “do things that don’t scale”. When it comes to organisation design, PostHog has taken the opposite approach. When a team starts struggling because they are working on too many things the naturally tendency is to add more people. We take the opposite view and look split the team. The thinking being that fewer more focused people end up making progress. Another example is the AI responses to community questions that engineers couldn’t keep up with. By not needing to add people to solve problems we can scale the company non-linearly.

