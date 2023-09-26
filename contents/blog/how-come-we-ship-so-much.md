---
date: 2023-09-26
title: "Why we ship faster than your company, probably"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-hawkins
featuredImage: ../images/blog/super-hog-pink.png
featuredImageType: full
category: CEO diaries
tags:
  - Guides
  - Product engineers
---

Clearly there are exceptions, but we ship a _lot_ faster than the average company.

Our first line of code was January 22nd, 2020, after a pivot during a YC batch. From zero on that day, we have built

* product analytics
* session replay
* feature flags
* a/b testing
* heatmaps
* SDKs for all of the above
* a basic CDP to stream data to warehouses
* data warehouse MVP
* a wildly extensive website
* ... and those are things that have worked

All of the above are being used a lot too - we're ingesting 10s of billions of events a month, have 10s of thousands of companies regularly using our service and over 100K user sign ups.

One of the most common questions I get asked is how do we manage to build so much so quickly.

## We designed the company around speed

We provide an all-in-one platform to help engineers build better products. We have a list of 25+ products we want to build.

That means we had to design our company primarily for speed.

## These ideas may _suck_ for you

Before you start making changes, think hard about what your product should be optimized for.

For example, if you are shipping the latest iPhone, complete design control is _more_ important to your users than having all the features. Likewise, if you are building software and are building a tiny product that has better UX than an incumbent, design and control matters.

I _suspect_ that you could still get higher quality with more autonomy - my approach would probably be having lots of designers and engineers collaborating with relatively few product managers, but I cannot speak to the above as well since my experience is building a multi product platform.

## No product management by default

The responsibilities of a product manager still exist, but our engineers (the concept internally is a "product engineer"):

* decide what to build within their product (and they often suggest new products - but the decision on this is made by my cofounder and me)
* talk to users
* have complete access to metrics (especially for their own product - ie revenue, hosting cost, staff cost)

We have one product manager who happily steps in reactively if a small team needs more support.

The above _requires_ a lot of context setting from the company. We are _particularly transparent_ - sharing board slides, financial information, fundraising progress before, during and after it happens, and much more. See our public handbook for a lot of this stuff.

## No design by default

When we started, we felt that if product designers dictate to engineers, the best engineers would eventually quit as they'd want more freedom.

As we grew, we realized that engineers _can_ design the UX of a product. Especially if we hire people that have this skillset.

We have people that can help engineers with design, but they are very happy to work reactively and fast - and they don't block merging work during QA. This means we _do_ ship work where the design isn't perfect, but we won't drop things that are important and will keep improving them.

For example, we've redesigned this entire website ~5 times.

## Hiring is key

I think 90%+ of an organization's problems are solved by hiring right.

We have found it invaluable to pay people during our hiring process to do some actual work. We've refined this down to a one day task, which gives us a good sense of how much someone can get done and the quality of their actual code.

We tend to hire people with more experience, who we find tend to work better with more autonomy. (Sidenote: we are working on ways to get better at growing people who are earlier in their careers). I think this is the magic combo when you're an all remote company.

## Small teams

I went to a superb talk by Jeff Lawson (who runs Twilio), who felt the greatest innovation at Amazon was how it felt like thousands of small startups. Simply speaking, a startup gets more done per person than a big corporate.

PostHog works like a group of startups. For each of our products, there is a team of up to 6, who can ship with minimal intereference from the rest of the company. We hire a lot of ex technical founders to help here.

## Nearly everyone is an engineer

It's simple, but if you have lots of spending and focus outside of engineering, you won't get as much built.

We are around 45 people, 38 of whom are engineers.

We don't do outbound sales, our marketing team is very small, we only have one product manager, our exec team only has 3 people. These things are all by design (and were possible because of our market - the majority of engineers generally want docs and to try something instead of demos and salespeople to deal with).

## No meeting Tuesdays/Thursdays

We want a culture where people can deep work. We push back on unnecessary meetings (and yes, there are _definitely_ some that are necessary, we have learned - often painfully).

## We are a late mover

I've had lots of founders tell me that they can't pursue idea X because some other startups are tackling it. This makes me laugh because we simply won't build a new product unless there is a $1bn+ competitor already offering it. We _love_ competition. It shows you that there will be demand. The magic in our platform (after an individual product is working well for our users) is then integrating everything together.

For non-God tier product people, such as me, I think it's easier to build a better version of X than it is to create something entirely new.

## We raised venture capital

Obviously, this matters. We didn't raise a ridiculous amount - we have done a $3M seed, $9M series A and a $15M series B. We have a lot of it left and will be profitable next year.

Raising money does let build more stuff, but if you _should_ is very questionable and a topic for another time.

## Trust and feedback over process

This is one of our values. It's simply up to the person building in most situations. Building and scaling something people want is a nuanced problem, so we let people use their judgement. When they get it wrong, we are direct and give feedback.

To quote one of our team "process is scar tissue" - it often overcorrects, but because humans are risk adverse it feels natural to implement them when a company starts growing 

## There are plenty of problems

As a company with high autonomy and low coordination, shipping

At scale, this has meant performance has, well, um, been a performance to solve.
