---
title: "Why engineers should do support: Everything we've learned about doing it well at PostHog"
date: 2024-08-05
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1713888662/posthog.com/contents/images/newsletter/talk-to-users/talk-to-users-big.png
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Blog
---

Engineers do support at PostHog. Yes, this means they log into Zendesk, respond to users, debug their issues, and ship fixes. If you interacted with our support team, it is more than likely that you've interacted with an engineer.

Support is not traditionally thought of as a task of engineers and most will be unhappy when you suggest it should be. Common pushback includes:

- "Doing support interrupts me and ruins my focus."
- "It takes up too much time and prevents me from building anything useful."
- "We don't need support. Our users should figure this out themselves or they are stupid."

These arguments are the consequence of the wrong priorities and processes. When corrected, you might appreciate the value of engineers doing support and how it can become a core part of building a successful product.

We know because we've done it. To help you do it too, this post covers why engineers do support at PostHog and everything we've learned about doing it well. 

## Why engineers do support at PostHog

Many companies simply don't care about support. To do it well takes a lot of time and effort. They see it as a chore that doesn't benefit you beyond fewer unhappy users. 

We disagree with this. Support is core to being a user-focused company. It is where you get the highest volume of feedback about your product experience. Having engineers involved in these interactions provides the following benefits:

### 1. It helps us build a great product

Building something people want starts with knowing what they want. When someone makes a support request, it is relatively clear what they want: they are trying to do something and it is not working the way they expect. This could be a knowledge issue, bug, or missing feature.

Whatever it is, solving the issue makes our product more usable, however small. Sometimes an issue only affects the requester, and other times, it impacts everyone. In either case, solving the issue means others won't run into it again.

Doing this repeatedly inches your product towards greatness. Solving support issues is the difference between a polished experience and a janky one.

### 2. Keeps feedback loops fast

Even if engineers aren't officially doing support at your company, it often ends up on their plate eventually anyway. The flow usually looks like:

1. Support teams create tickets.
2. Product managers prioritize those tickets.
3. Engineers implement them.

Engineers doing support shortcuts this. They can interact with the user, figure out what they need, and build it, with no waiting required. They have the context on what the issue might be and what it takes to fix it (pull requests are better than issues). This is both faster and requires less overhead.

A bonus benefit of fast feedback loops is that it sparks joy. Users love it when their issues are resolved fast and engineers are in a uniquely good position to do this. This creates good word of mouth and helps us get deals done.

![Good job Paul](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_08_02_at_10_09_40_4a2ce6dd87.png)

### 3. Encourages full cycle ownership

[Engineers at PostHog](/blog/what-is-a-product-engineer) own the entire product development cycle from ideation to implementation to ongoing maintenance. Doing support acts as both input and feedback on this and helps them do it better. For example:

- When ideating and validating, engineers can draw on real customer behavior and pain points. They can back their product decisions on support issues they dealt with and requests from large customers.
- When building, it encourages engineers to write reliable and maintainable code, because they will be the ones who need to fix it if it breaks.
- When doing support, they are familiar with the potential fixes because they were involved (or wrote) the code related to the issue.

## Creating a support process built for engineers

The second problem many companies run into is trying to smush engineers into an existing support process. Although our support process for engineers isn't wildly different from what you expect, we've done a lot of work to tailor it to them.

> **Looking for all the details?** Check out our [support hero handbook entry](/handbook/engineering/support-hero).

### 1. Have a rotation

The biggest complaint engineers have about doing support is that it breaks their flow. Constantly being interrupted by requests is a surefire way to get nothing done. To prevent this, engineers at PostHog rotate through being "support hero" for a week.

![Rotation](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_08_05_at_10_01_44_c6cbe40eae.png)

Originally, we had a single support hero for the entire company, but now each product team has someone dedicated to it. When it is their week, they answer tickets, talk with users, ship fixes, and work on feature requests. After the week, they rotate back to "normal" work.

This means they aren't working on the team's core roadmap, but the rest of the team is. When combined with our [async culture](https://newsletter.posthog.com/p/how-we-work-asynchronously), this enables everyone to have large blocks of time to work on important things.

### 2. Set expectations

Negative support experiences are the result of broken expectations. For example, a response within 12 hours is…

- Awesome if they expected a response within 48 hours.
- Awful if they expected a response right away.

To make sure expectations are clear, we include response times both before and after you submit a request.

![Expectations](https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_fb19b5f552.png)

Along with this, we have response targets and SLAs with our larger customers. We don't do support calls or respond on weekends (except for incidents). This helps us balance providing as good a support experience as possible with being always on-call. 

### 3. Documentation is your first line of support

Someone solving their problem themself is the most powerful support. If they can't figure it out from your product, your docs are next in line. 

Docs should cover basic setup, [popular use cases](/docs/feature-flags/tutorials), [frequently asked questions](/docs/feature-flags/common-questions), and troubleshooting. Link to them as a response whenever you can. If a support request relates to outdated docs, they should be updated. A single support request can represent an issue many users are facing but say nothing about

### 4. Sharpen your support tools

Engineers are great at optimizing repeatable processes. This means crafting and shaping purpose-built tools. These help us do support more effectively and efficiently. Examples of these include:

- **Zendesk.** Centralizing support from in-app, emails, Slack messages, and community questions into prioritized, team-specific queues.
- **Runbooks.** Although we document as much as possible publicly, we also have internal details in Docusauraus on common issues and solutions for all our services.
- **Django admin panel.** User and organization details with features for common support use cases like impersonating users and deleting data.
- **VIP lookup bot.** To help prioritize support, we built a Slack bot that takes an organization name or ID and returns their MRR, plans, links in Django admin, and more.
- **Monitoring.** Logs and metrics for all our services are captured and visualized with tools like Grafana, VictoriaMetrics, Metabase, and PostHog. Enables us to monitor services and dive into specific performance issues and errors.

## How to scale engineers doing support

As an engineer, you probably have one question in mind right now: "How does this scale?" Although we aren't a huge company, we're ~50 people supporting tens of thousands of users.

We've done a lot of work to continue to [ship fast](https://newsletter.posthog.com/p/how-to-design-your-company-for-speed) while having engineers do support. Luckily for you, we're sharing what we've figured out here. 

### 1. Prioritize

As you get larger, the amount of support surpasses the amount of time you have to do support. All companies prioritize whether they say so or not. Making prioritization clear ensures your work aligns with company goals. At the moment, our support priority looks like this:

1. Incidents
2. Sales and customer success requests
3. Priority organizations, trials, critical severity
4. Paying customers, startups, billing issues, high severity
5. Everything else

We try our best to get to everything, but there are always going to be tickets you want to prioritize more than others. You should be clear about this and automate prioritization as much as possible.

### 2. Support engineers

As we grew, even dedicated support heroes weren't enough to keep up with the support load. They couldn't get through high-priority support, let alone the rest of the queue. This was causing them to neglect longer-term improvements critical for reducing support load.

The fix for this was the introduction of [support engineers](/handbook/comms/customer-support) who are entirely dedicated to doing support. This role is not a traditional, non-technical, first-line support agent. They are expected to be able to figure out and fix issues, often by shipping code.

A majority of support is still done by engineers, but support engineers solve as much as they can and escalate when needed. This helps support heroes work on the most pressing and valuable fixes.

### 3. Community ≠ support

For a long time, we had a Slack community. Although we had visions of it as being a place where users talked and learned about PostHog, it ended up functionally being dedicated to support. On top of this, knowledge was lost due to free plan limits, it was disconnected from our support queues, and it wasn't publicly searchable. 

This led us to decide to [shut our Slack down](/blog/slack-closure).

To replace it, we built a [community forum](/community) on our website. It is the opposite of Slack: permanent, public, customizable, and connected to our support queue. This enables us to provide a better support experience while also enabling us to craft a [real community experience](/handbook/community) for our users. 

![Community forum](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_08_05_at_10_49_39_b1c6a55cfe.png)

### 4. Make your product easier to support

Supporting a self-hostable product is tricky. Not only do you need to support your product, but users also expect you to support them with infrastructure issues as well. For example, there was a situation where we were debugging a Kubernetes deployment through mobile screenshots of a user's AWS console. 

As our main product matured, it became too much to support complicated self-hosted setups. This is why [we sunset our self-hosted Kubernetes deployment](/blog/sunsetting-helm-support-posthog). It was causing an outsized support load from the 3.5% of users hosting that way.

Sunsetting it simplified the support requests we got. This enabled us to focus on improving the core product which benefited all users. It also taught us a lesson about the importance of building a product we were able to support. Controlling the infrastructure enables us to monitor and proactively fix issues as well as ship fixes quickly when something does happen.

## Good reads  📖

- [Serving 250k Developers with One Support Engineer](https://blog.railway.app/p/scaling-railway-automating-support)
- [Seven steps to remarkable customer service](https://www.joelonsoftware.com/2007/02/19/seven-steps-to-remarkable-customer-service/)
- [33 tips for giving great technical support at a small software company without being swamped](https://successfulsoftware.net/2012/08/21/tips-for-great-software-technical-support/)