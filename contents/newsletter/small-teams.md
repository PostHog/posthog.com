---
title: The magic of small engineering teams
date: 2024-07-03
author:
  - james-temperton
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/345390691_746f2b83_6290_4d68_b612_dd9360b43515_20e0f385a7.jpg
featuredImageType: full
tags:
  - Culture
  - People
crosspost:
  - Founders
  - Blog
---

Startups ship more per person than big companies – everyone knows this. But how do you retain that advantage as you scale?

Our answer is small teams – speedy, innovative, and autonomous one-pizza teams where individuals can still have an outsized impact. They enable us to scale, while retaining the culture and speed of an early-stage startup.

We'll explain how they work, why we chose this structure, and the tradeoffs we accept to enjoy the benefits of small teams.

## How small teams work at PostHog

Right now we're 47 people spread across ten countries working asynchronously and [shipping fast](/changelog/2024). And we’re organized into 15 small teams.

Most teams cover individual products, such as data warehouse, replay, pipeline, or product analytics, but we also have small teams covering people and operations, marketing, and growth.

When we launch a new product, or a project on an existing team becomes too large for the current team, we often spin out a new small team. This allows us to push forward with new ideas and keep shipping without sacrificing quality.

![Small teams](https://res.cloudinary.com/dmukukwp6/image/upload/small_team_1_cdceda04ab.png)

Right now, for example, we're in the process of scaling support by moving our support engineers out of the customer success team and into a new [support team](/teams/support). We're [recruiting support engineers](/careers/support-engineer) for that team, by the way.

We've also created a new team with the mission of making our customer data platform (CDP) a first-class product – a project spun out from a hackathon project at our recent all-company [offsite in Mykonos](/blog/mykonos-hackathon).

## The golden rules of small teams

The small teams structure is core to how we've [designed our company for speed](https://newsletter.posthog.com/p/how-to-design-your-company-for-speed), but it only works if you follow these rules.

### 1. They need to be genuinely small

Two to six people is ideal. More than this and you have a department, which is what we're trying to avoid. Less than two people and, well, you don’t have a team.

Small teams are effectively one-pizza teams, as opposed to the [two-pizza teams](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/two-pizza-teams.html) idea popularized by Amazon. They’re mostly comprised of [product engineers](/blog/what-is-a-product-engineer) – i.e. engineers who also talk to users, and own product decisions.

The overall goal of small teams is to own an area of the product or company, and behave like an early-stage startup. They don't have all the functions of a startup, but their spirit and approach to work should be exactly the same.

This startup-made-of-startups structure minimizes the number of centralized processes and the need for lots of layers of management. It biases to [the maker’s schedule](https://www.paulgraham.com/makersschedule.html) – and makers get shit done.

### 2. They run themselves

Each small team runs its own retrospective and sprint each week, with notes taken and shared in GitHub for the entire company to see.

Small teams also make the final call on which features get into production, with no need for external quality assurance or control. And they can [merge whenever](/handbook/engineering/development-process#merging).

Each quarter, every small team at PostHog outlines their goals and projects for that period. We prefer goals orientated around what teams will ship, rather than more abstract goals like "increase conversions by 10%". Our executive team will give feedback on this to keep everyone on track.

And, as each one is like a startup in its own right, they’ve got to cover everything. That means:

* Prioritizing their roadmap and talking to customers
* Monitoring relevant metrics, including those covering usage, quality, and revenue
* Triage and fix bugs related to the products or areas they’re responsible for
* Assist the support hero in answering related questions
* Collaborate with other small teams such as marketing

### 3. They have one leader

One of the purposes of the small team structure is to keep a startup’s structure flat even as it scales. That means [minimal layers of management](/handbook/company/management) and lots of autonomy.

Each small team has a team lead who is responsible for its performance. They’re not always the most experienced person on the team – we prefer to choose the person best-suited to leading the product the team is working on. Because we’re engineering-led, product teams are always led by an engineer.

Team leaders do not automatically equal managers. Team leads are responsible for making sure that teams perform well and for giving direct feedback. Managers have a different remit. They’re more focused on the happiness of direct reports and setting the right context for people to do their jobs, onboarding new hires, and discussing performance issues with the executive team.

A team lead’s remit is deliberately more product-focused.

<NewsletterForm />

### 4. They have their own mission

Regardless of size or scope, each team has its own mission that feeds into our overall company mission of equipping every developer to build successful products.

The [growth team’s mission](/teams/growth) is to maximize the number of people who get value out of PostHog, and help them realize and leverage all the value we offer. The [infrastructure team’s mission](/teams/infrastructure) is to make deploying, scaling, and managing PostHog easy, fast, and reliable.

As well as a main mission, each small team also sets:

* Long-term goals and key metrics
* What features or processes they own
* A target customer (they can be external or internal)

All of this information is in our [handbook](/handbook) and updated when changes are made and confirmed each quarter.

This keeps everyone on the same page and makes it easy for anyone in the company to quickly find out what other teams are working on, and why.

### 5. They’re flexible

We’d rather hire new people than keep moving people around to fill gaps.

That said, we’re happy for people to move between teams when needed, ideally no more often than every three to nine months.

There are two scenarios that could trigger a move:

1. A small team may realize they no longer need someone, or that they could use the help of someone internally on another small team.
2. Someone might want to move to another small team to develop their skills or experience.

Rather than the team lead making the call, it’s always the manager who decides if one of their direct reports should move between teams. But, once in a small team, you’re only in one team. Someone being in multiple small teams at once defeats the purpose of ownership.

If someone feels the need to be in more than one small team, that likely means we need to hire. That can mean we’re overstaffed at times, but ultimately good people will do good work to push our product forward. And it’s better to have slightly overstaffed small teams than to be perpetually understaffed, and for your product to suffer as a result.

Small teams are also able to work with other small teams on multidisciplinary projects, and members of one small team can and should attend meetings on other small teams to help with collaboration if needed.

## The tradeoffs of small teams

Small teams aren’t perfect. And sometimes, to make them work, we’ve had to create workarounds and accept some tradeoffs. Here are some examples:

### Overlap

Some overlap is inevitable, especially when teams work on features that are used across multiple products. We mitigate this by being [aggressively transparent](/founders/how-to-run-a-transparent-company). We also have a list of everything we do [and who owns it](/handbook/engineering/feature-ownership), so it's easy to see who someone should talk to about a shared problem.

### Fuzzy ownership

This isn’t unique to small teams, but we still mitigate against it. If a product or project doesn't have a clear owner, our [fuzzy ownership process](/handbook/company/fuzzy-ownership) encourages people to create a PR and find a solution. If a problem is big enough, and it doesn't have an owner, we sometimes form a temporary team just to solve that problem. We also [actively encourage](/handbook/values) people to step on toes in a low-ego way.

### Speed over seamlessness

Small teams allow us to ship fast. But the tradeoff here is that we tolerate some level of not-so-great integration in exchange for speed. This isn't a problem unique to PostHog. AWS is a great example of a very, very big company that favors speed over integration.

### You’ve got to hire right

Not everyone will embrace this way of working. It requires people who take extreme ownership of ideas, are self-starting, authentic, and low-ego. We've developed some [strong opinions](https://newsletter.posthog.com/p/hiring-and-managing-cracked-engineers) about the kind of people who work in this culture, and those that don't.

## Good reads 📖

* [What our team really thinks about working at PostHog](/blog/company-survey) – Do small teams really work? We conduct a company survey every six months and share the results.

* [How I give the right amount of context (in any situation)](https://newsletter.weskao.com/p/how-i-give-the-right-amount-of-context) – [Wes Kao](https://open.substack.com/users/4005715-wes-kao?utm_source=mentions) on why most people suck at managing up, and how to give the right amount of context to your manager, and colleagues.

* [Managing My Motivation, as a Solo Dev](https://mbuffett.com/posts/maintaining-motivation) Useful for tips for solo devs that are also useful for any developer.

<NewsletterForm />