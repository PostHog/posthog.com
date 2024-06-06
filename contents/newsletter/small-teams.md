---
title: Why and how we built our startup around small teams
date: 2024-05-28
author:
  - james-temperton
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1711656184/posthog.com/contents/images/newsletter/remote-work/remote_hog.png
featuredImageType: full
tags:
  - Culture
crosspost:
  - Founders
  - Blog
---
Startups ship more per person than big companies – everyone knows this. But how do you retain that advantage as you scale?

Our answer is small teams – speedy, innovative, and autonomous teams where individuals can still have an outsized impact. They enable us to scale, while retaining the culture and speed of an early-stage startup. 

This week we're sharing how they work, why we chose this structure, and the tradeoffs we accept to enjoy the benefits of small teams.

## How small teams work at PostHog

Right now we're 47 people spread across ten countries working asynchronously and [shipping fast](changelog/2024). They're organized into 15 small teams. 

Most teams cover individual products, such as data warehouse, replay, pipeline, or product analytics, but we also have small teams covering people and operations, marketing, and growth.

When we launch a new product, or a project on an existing team becomes too large for the current team, we often spin out a new small team. This allows us to push forward with new ideas and keep shipping without sacrificing quality.

Right now, for example, we're in the process of scaling support by moving our support engineers out of the Customer Success team and into a new team focused on customer communications and community. [link to team page]. We're recruiting support engineers for that team [link to job], btw.

We're also creating a new team with the mission of making our customer data platform (CDP) a first-class product [link to team page] – a project spun out from a Hackathon project at our recent all-company offsite in Mykonos. [link]


## The golden rules of small teams

The small teams structure is core to how we've [designed our company for speed](https://newsletter.posthog.com/p/how-to-design-your-company-for-speed), but they only work if you follow these rules. 

### 1. They need to be genuinely small

The first rule of small teams? They’ve got to be small – two to six people. More than this and you have a department, which is what we're trying to avoid. Less than two people and, well, you don’t have a team. 

Small teams are effectively one pizza teams, as opposed to the [two-pizza teams](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/two-pizza-teams.html) idea popularized by Amazon. 

The overall goal of small teams is to own an area of the product or company and be structured like an early-stage startup. Sure, these small teams don't have all the functions of a startup, but their spirit and approach to work is exactly the same. 

At PostHog, we’ve got [14 small teams](https://posthog.com/teams) ranging in size from one person (we’re working on that) to six people. These teams cover everything from product analytics, to session replay, data warehouse, pipeline, and so on. What does owning an area of the product mean? Simply put, everything related to that product. But with a particular focus on:

1. Usage
2. Quality
3. Revenue

A lot of the people on our small teams are product engineers – i.e. engineers who also talk to users, and own product decisions. And small teams aren't just for product – our marketing team is a small team, as are customer success, and people and operations. 

This startup-made-of-startups structure minimizes the number of centralized processes and the need for lots of layers of management. It biases to [the maker’s schedule](https://www.paulgraham.com/makersschedule.html) – and makers get shit done.

### They run themselves

Each small team runs its own retrospective and sprint each week, with notes taken and shared in GitHub for the entire company to see.

Small teams also make the final call on which features get into production, with no need for external quality assurance or control. And they can [merge whenever](https://posthog.com/handbook/engineering/development-process#merging).

Each quarter, every small team at PostHog creates objectives and key results, or OKRs. Our executive team will give feedback on this to keep everyone on track. Beyond that, during each quarter each small team is tasked with maintaining a prioritized roadmap to help them achieve their objectives. Each small team is also tasked with speaking to customers. 

And, as each one is like a startup in its own right, they’ve got to cover everything. That means:

* Monitoring relevant metrics, including those covering usage, quality, and revenue
* Triage and fix bugs related to the products or areas they’re responsible for
* Assist the support hero in answering related questions
* Collaborate with other Small Teams such as marketing
* Become power users of their area of PostHog and use PostHog in their processes

### They have one leader

One of the purposes of the small team structure is to keep a startup’s structure flat even as it scales. That means [minimal layers of management](https://posthog.com/handbook/company/management) and lots of autonomy. 

Each small team has a team lead who is responsible for its performance. It’s not a given that the lead is the most experienced person on the team, but rather the person best-suited to leading the product the team is working on. 

At PostHog, we’ve got an engineering-led culture. And that means that our small teams are normally led by the person with overall responsibility for that product. And that person is very likely to be an engineer.

Team leaders do not automatically equal managers. Team leads are responsible for making sure that teams perform well and for giving direct feedback. Managers have a different remit and are focused on the happiness of direct reports and setting the right context for people to do their jobs, onboarding new hires, and discussing performance issues with the executive team. A team lead’s remit is deliberately more product-focused.


### They don’t clash

Creating a startup full of startups sounds like a recipe for people duplicating work or stepping on toes, right? Wrong. If you combine a small team structure with a transparent culture where everything is as public as possible and, ideally, written down, then everyone should have more than enough context of what others are working on and why. 

At PostHog, we have a list of everything we do [and who owns it](/handbook/engineering/feature-ownership). This helps avoid clashes by clearly establishing feature ownership. If a product or project doesn't have a clear owner, our [fuzzy ownership process](/handbook/company/fuzzy-ownership) encourages people to create a PR and find a solution.


Giving clear ownership over products and projects to individuals or individual teams also lessens the risk of overlap.

We’ve got a small number of product managers who help small teams prioritize, create and update dashboards, conduct competitor analysis, and speak to customers. But we also expect product engineers to be true experts of the product they’re building and understand our customers. Product managers also ensure cross-team alignment, an important task in a completely remote, asynchronous company.

So what about stepping on toes? Well, we [actively encourage that](https://posthog.com/handbook/values). Everyone at PostHog should be raising pull requests in GitHub or proposing changes to stuff that doesn't have anything to do with your small team. Why? Because it shows they really care and they really understand the product.


### They have their own mission

Regardless of size or scope, each team has its own mission that feeds into our overall company mission of equipping every developer to build successful products.

On the [marketing team](https://posthog.com/teams/marketing), the mission is to make PostHog a place for product engineers to learn and collaborate. The [infrastructure team’s mission](https://posthog.com/teams/infrastructure) is to make deploying, scaling, and managing PostHog easy, fast, and reliable. But a charter is more than a mission. Small team charters also need to include:

* Long-term goals
* A description of what the team does
* A target customer
* Details of who’s on the team
* Key metrics

All of this information is in our [handbook](https://posthog.com/handbook) and updated when changes are made and confirmed each quarter. This keeps everyone on the same page and makes it easy for anyone within the company to quickly find out what other teams are working on and why.

### They're not just engineers

Yes, the vast majority of our small teams are stuffed full of engineers shipping new features. Right now, 70% of our team is engineers. But everyone at PostHog is on a small team. That means we run our marketing team like a mini startup, and our people and operations team. 

What does this mean in practice? It means adopting a startup mentality, regardless of what role you do. Our [marketing team](/marketing) has a mission, just like our [growth team](/growth). And all of our small teams, engineering-focused and non-engineering focused, regularly ship new products and features. Structuring all functions of a company as small teams has helped us maintain speed, autonomy, and innovation across the board.
### They’re flexible

We’d rather hire new people than keep moving people around to fill gaps. That said, we’re happy for people to move between teams when needed, ideally no more often than every three to nine months. There are two scenarios that could trigger a move:

* A small team may realize they no longer need someone, or that they could use the help of someone internally on another small team.
* Someone might want to move to another small team to develop their skills or experience.

Rather than the team lead making the call, it’s always the manager who decides if one of their direct reports should move between teams. But, once in a small team, you’re only in one team. Someone being in multiple small teams at once defeats the purpose of ownership.

If someone feels the need to be in more than one small team, that likely means we need to hire. That can mean we’re ‘overstaffed’ at times, but ultimately good people will do good work to push our product forward. And it’s better to have slightly overstaffed small teams than to be perpetually understaffed and for your product to suffer as a result.

Small teams are also able to work with other small teams on multidisciplinary projects and members of one small team can and should attend meetings on other small teams to help with collaboration if needed.

### 

### The tradeoffs of small teams

Our small teams structure is a success because we work hard on making it one. There are tradeoffs. 

Working as a series of startups within a startup risks creating silos and there could be whole teams or individual team members who drift away from our mission or feel disconnected from the company. 

To help alleviate this, all of our small teams have annual off-sites in addition to our big company get-together. Everyone also has a generous quarterly travel budget and people are encouraged to go work with colleagues either on the same small team as them or in another part of the company. We mix things up and spend time together IRL to work on problems and get things shipped.

Small teams also require that everyone is very good at written communication, be it a Slack message, or a Github pull request or issue. This helps everyone at the company to both see and understand what's being worked on and why.

You also need to hire the right people to work on small teams. Not everyone will embrace this way of working. It requires people who take extreme ownership of ideas, are self-starting, authentic, and low-ego. We call them cracked engineers. And we have some [strong thoughts](https://newsletter.posthog.com/p/hiring-and-managing-cracked-engineers) on what makes an engineer cracked.