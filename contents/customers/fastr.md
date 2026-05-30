---
title: How Fastr ships a custom experimentation dashboard to every customer with PostHog Endpoints
customer: Fastr
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/FASTR_afcc31057f.png
date: 2026-03-10
---

Most conversion rate optimization (CRO) platforms hand every customer the same dashboard. [Fastr](https://getfastr.com/) does the opposite. Each of its customers logs into a dashboard built specifically for their business, with only the metrics they care about, segments tailored to how they think about their audience, and an AI interface that turns business questions into answers in plain English.

That model only works because Fastr can spin up new analytics infrastructure for every customer on demand. With a four-person engineering team, [PostHog Endpoints](/endpoints), materialized views, and AI wiring it all together; Fastr can serve major e-commerce customers.

<OSQuote
  customer="Fastr"
  author="ryan_breen"
  quote={0}
/>

A new product, built developer-first
------------------------------------

When Fastr started designing Fastr Optimize, its CRO and A/B testing product, the question was which backend could keep up with a four-person team that runs almost entirely on AI-driven development. Ryan Breen, Fastr's CTO, was exploring tools and PostHog stood out for him immediately.

"You’re nerds, and you’re building a developer-friendly back end for us to build whatever sort of data-powered interfaces we want to build on top of," says Ryan. "I think PostHog are the gold standard for a tool you would want to build on top of."

A different shape of dashboard for every customer
-------------------------------------------------

Every Fastr customer has their own dashboard. Two examples Ryan gave are major e-commerce retailers, the first gets around 200,000 hits a day, runs heavy traffic and needs aggressive caching for multi-dimensional experiment results. And the second, who care most about their loyalty-program members. Each question requires differently shaped data behind the scenes.

One feature that Fastr has repeatedly used is a session browser that enables a customer to scroll through every session their site has seen and slice them on whether someone added to cart, hit an error, or has a session replay attached. This feature is entirely backed by Endpoints. The data behind it runs to millions of rows a month and the team at Fastr want to keep the surface clean and the infrastructure simple for themselves and their customers.

"Endpoints cache well, give us a nice clean surface in front of the data, and we don't have to think about everything we'd need to set up around it if we built a custom API ourselves," says Ryan.

Agentic development first
-------------------------

<OSQuote
  customer="Fastr"
  author="ryan_breen"
  quote={1}
/>

Ryan explains. "When we started consuming endpoints, we needed a lifecycle for managing them, spin them up, spin them down, change them, whatever you need. But now when I tell Claude to build a dashboard it creates all the Endpoints it needs.” 

The reason it works without breaking is that PostHog ships every feature in public, and Claude can keep up with it. "It’s easy for us to ask Claude, go find the bleeding-edge documentation for how this feature works today. That's the nice thing about you guys being so damn transparent about everything you do on GitHub."

An analytics platform without data engineers
--------------------------------------------

Fastr's customers don't have data engineers waiting to slice their AB test results. They have a marketing team that wants to know whether the last test worked.

<OSQuote
  customer="Fastr"
  author="ryan_breen"
  quote={2}
/>

Ryan says, "There should never be a number that we put in front of you that doesn't have some context, or that wouldn't be a number you care about.” 

This model lines up with where Fastr's customers are economically. "A lot of really big businesses don't have a big data team anymore. Where in the past they had 14 data people, now they have two, but they still need a system,'" Ryan says. "I've got a job to do, and that job shouldn't be 'learn your stupid data platform.'"

Fastr Optimize is out of early access and onboarding more brands every week. The team is leaning further into per-customer customization, and every new customer means more endpoints spun up by Claude on top of PostHog.

For Ryan, the bet on PostHog is about giving a small, AI-native team room to move fast without owning the analytics infrastructure underneath. PostHog handles the back end; Claude wires it up; customers get a dashboard that looks like it was custom-built for their business, because it was.
