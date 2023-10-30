---
date: 2023-10-30
title: "Why we (probably) ship faster than your company"
author:
  - james-hawkins
featuredImage: ../images/blog/super-hog-pink.png
featuredImageType: full
tags:
  - Founders
  - Product engineers
  - Engineering
  - Culture
crosspost:
  - Product engineers
---

Clearly there are exceptions, but we ship a lot faster than the average company.

Our first line of code was January 22nd, 2020, after a pivot during a YC batch. Since then, we've shipped:

* [Product analytics](/product-analytics)
* [Session replay](/session-replay)
* [Feature flags](/feature-flags)
* [A/B testing](/ab-testing)
* [User surveys](/docs/surveys)
* Heatmaps
* [SDKs](/docs/libraries) for all the above
* A basic [CDP](/docs/cdp) to stream data to warehouses
* [Data warehouse](/docs/data-warehouse) MVP
* A wildly extensive website

...and those are just the things that worked.

All the above are being used a lot, too. We're ingesting 10s of billions of events a month, have 10s of thousands of companies regularly using our service, and over 100k user signups.

I often get asked how we build so much, so quickly. The answer is simple: we deliberately designed our company for speed.

## How we designed PostHog for speed

### 1. No design by default

When we started, we felt the best engineers would eventually quit if they felt dictated to by product designers. Product engineers need autonomy and freedom to enjoy their work.

As we grew, we realized that engineers can design the UX of a product. Especially if we hire people that have this skill set, and provide a framework for their work.

We invested considerable time getting our design *system* up and running, and worked with a designer to get it done. Then we moved onto this "no design by default" phase. Had we been in this phase from the beginning, the app would have been very inconsistent... at best.

Today, we have people that can help engineers with design, but they are very happy to work reactively and fast – and they don't block merging work during QA. This means we do ship work where the design isn't perfect, but we won't drop things that are important and will keep improving them.

For example, we've redesigned this entire website ~5 times.

### 2. No product management by default

The responsibilities of a product manager still exist, but our engineers:

* Talk to users.
* Decide what to build within their product (and sometimes pitch whole new products).
* Have complete access to metrics like revenue, hosting costs, and (soon) staff costs, for their product.

The concept internally is a "[product engineer](/blog/what-is-a-product-engineer)" – i.e. an engineer who is product-minded and autonomous, rather than mindlessly filing tickets.

We have one product manager who steps in reactively if a small team needs more support.

The above requires a lot of context setting from the company. To that end, we're *unusually transparent*. We share board slides, financial information, fundraising progress before, during and after it happens, and much more.

### 3. Hiring with intention

I think 90%+ of an organization's problems are solved by hiring right – see [what we've learned about hiring](https://newsletter.posthog.com/p/everything-weve-learned-about-hiring) in our Substack newsletter.

We've found it invaluable to pay people during our hiring process to do some actual work. Over time, we've refined this down to a one-day task, which gives us a good sense of how much someone can get done and the quality of their actual code.

We tend to hire people with more experience, who we find work better with more autonomy. I think this is the magic combo when you're an all remote company, though we're working on ways to get better at growing people who are earlier in their careers.

### 4. Each team is a mini startup

I went to a superb talk by [Jeff Lawson](https://www.linkedin.com/in/jeffiel), who runs [Twilio](https://twilio.com/). He described how the greatest innovation at [Amazon](https://www.amazon.com/) was that it felt like thousands of small startups. Simply speaking, a startup gets more done per person than a big corporate.

PostHog works like a group of startups with lots of [small teams](/handbook/company/small-teams). Each of our products has a team of up to 6 who can ship with minimal interference from the rest of the company. We hire a lot of former technical founders to help here.

### 5. Nearly everyone is an engineer

It's simple, but if you have lots of spending and focus outside of engineering, you won't get as much built.

At the time of writing, [we are 37 people](/team), only 11 of whom are in Go To Market or Operations roles (and 6 of those 11 have at least some engineering in their background).

We don't do outbound sales, our [marketing team](/handbook/small-teams/marketing) is very small, we only have one product manager, and our [exec team](/handbook/small-teams/exec) is only 3 people. These things are all by design. 

We're product-led because our ideal users, engineers, want to try something rather than sit on a call.

### 6. No meeting Tuesdays and Thursdays

We want a culture where people can deep work. We push back on unnecessary meetings. 

We have learned, often painfully, that some meetings are necessary, but we default to asynchronous communication and adapt where needed.

### 7. We are a late mover

I've had lots of founders tell me that they can't pursue idea X because some other startups are tackling it.

This makes me laugh because we simply won't build a new product unless there is a $1bn+ competitor already offering it. We *love* competition. It shows you there's demand.

The magic in our platform (after an individual product is working well for our users) is then integrating everything together.

For non-God tier product people, such as me, I think it's easier to build a better version of X than it is to create something entirely new.

### 8. We raised venture capital

Obviously, this matters. 

We didn't raise or spend a ridiculous amount compared to other companies we compete with – we have done a $3M seed, $9M series A and a $15M series B. We have a lot of it left and will be profitable next year.

Raising money does let you build more stuff, but whether you should is very questionable and [a topic for another time](/blog/vc-or-bootstrap).

### 9. Trust and feedback over process

This is one of [our values](/handbook/company/values). It's simply up to the person building in most situations. Building and scaling something people want is a nuanced problem, so we let people use their judgement. When they get it wrong, we are direct and give feedback.

To quote one of our team: "process is scar tissue" – it often overcorrects, but because [humans are risk-adverse](https://www.adamjuliangoldstein.com/blog/anxiety-algorithm/) it feels natural to implement it when a company starts growing. Humans overcorrect by default. That's why large corporations are (in more cases than not) irrationally-obstructive to getting work done.

## What are the drawbacks?

As a company with high autonomy and low coordination, shipping things that affect multiple teams is a lot harder than shipping something within a single team. You may need extra meetings, or to form a temporary project team, or you may just fail!

Since we handle a lot of data, at scale, this has meant performance has, well, um, been a performance to solve. Performance is a very broad area to solve for, ranging from our infrastructure all the way through to our UX, and thus involves a lot of coordination and dependencies.

## Should you optimize for speed?

Think hard about what your product should be optimized for before you start making changes. 

If you're shipping the latest iPhone, complete design control is more important to your users than having all the features.

Likewise, if you're building a small software product that has better UX than an incumbent, design and control matters. I suspect you could still get higher quality with more autonomy. I'd probably have lots of designers and engineers collaborating with relatively few product managers, but I can't speak to the above as confidently since my experience is building a multi-product platform.

The most important thing is to figure out if you value speed and autonomy over polish and control. Which path will help you achieve your company's mission better?

Once you've done that, optimize how your company works around that, and accept there are trade-offs! Just make them consciously.
