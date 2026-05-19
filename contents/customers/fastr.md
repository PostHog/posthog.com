title: How Fastr ships a custom experimentation dashboard to every customer with PostHog Endpoints
customer: Fastr
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/cloudpeek_0b047d9eab.png
date: 2026-03-10
---

Most conversion rate optimization platforms hand every customer the same dashboard. [Fastr](https://getfastr.com/) does the opposite. Each of its customers logs into a dashboard built specifically for their business, with only the metrics they care about, segments tailored to how they think about their audience, and an AI interface that turns business questions into answers in plain English.

That model only works because Fastr can spin up new analytics infrastructure for every customer on demand. With a four-person engineering team, [PostHog Endpoints](/endpoints), materialized views, and AI wiring it all together; Fastr can serve customers that include Express and Bonobos.

<OSQuote
  customer="fastr"
  author="Ryan Breen"
  quote={0}
/>

## A new product, built developer-first

When Fastr started designing Fastr Optimize, its conversion rate optimization (CRO) and A/B testing product, the question was which back end could keep up with a four-person team that runs almost entirely on AI-driven development. Ryan Breen, Fastr's CTO, was exploring tools, PostHog stood out for him immediately.

"You’re nerds, and you’re building a developer-friendly back end for us to build whatever sort of data-powered interfaces we want to build on top of," says Ryan. "I think PostHog are the gold standard for a tool you would want to build on top of."

## A different shape of dashboard for every customer

Fastr's product flips the usual analytics relationship. Instead of one platform with one dashboard that every customer learns to navigate, every Fastr customer has their own.

Two examples Ryan gave are: Express, getting around 200,000 hits a day, runs heavy traffic and needs aggressive caching for multi-dimensional experiment results. And Bonobos, who care most about their loyalty-program members. Each question requires differently shaped data behind the scenes.

One feature that Fastr has repeatedly used is a session browser that lets a customer scroll through every session their site has seen and slice them on whether someone added to cart, hit an error, or has a session replay attached. This feature is entirely backed by Endpoints. The data behind it runs to millions of rows a month and the team at Fastr want to keep the surface clean and the infrastructure simple for themselves and their customers.

"Endpoints cache well, give us a nice clean surface in front of the data, and we don't have to think about everything we'd need to set up around it if we built a custom API ourselves," says Ryan.

## Spinning up an Endpoint

The reason Fastr can stamp out a custom dashboard for every customer is their agentic pipeline. Fastr's engineers don't click around the PostHog UI. They write Claude skills that go figure out the current PostHog API, generate the endpoints and materialized views a feature needs, and deploy them.

Ryan explains. "When we started consuming endpoints, we needed a lifecycle for managing them, spin them up, spin them down, change them, whatever you need. But now when I tell Claude to build a dashboard it creates all the Endpoints it needs.” 

The reason it works without breaking is that PostHog ships every feature in public, and Claude can keep up with it. "It’s easy for us to ask Claude, go find the bleeding-edge documentation for how this feature works today. That's the nice thing about you guys being so damn transparent about everything you do on GitHub. It’s easy for us to ask Claude, go find the bleeding-edge documentation for how this feature works today, or new configurations that have just been released."

## An analytics platform without data engineers

Fastr's customers don't have data engineers waiting to slice their AB test results. They have a marketing team that wants to know whether the last test worked.

That's what shapes the Fastr UI. Instead of a chart library, Fastr drops customers into an AI conversation. They describe the question and the system pulls the answer out of the PostHog data Fastr has wired up for them. Ryan says, "There should never be a number that we put in front of you that doesn't have some context, or that wouldn't be a number you care about.” 

Thia model lines up with where Fastr's customers are economically. "A lot of really big businesses don't have a big data team anymore. Where in the past they had 14 data people, now they have two, but they still need a system,'" Ryan says. "T've got a job to do, and that job shouldn't be 'learn your stupid data platform.'"

## What's next for Fastr

Fastr Optimize is out of early access and onboarding more brands every week. The team is leaning further into per-customer customization, and every new customer means more endpoints spun up by Claude on top of PostHog.

For Ryan, the bet on PostHog is about giving a small, AI-native team room to move fast without owning the analytics infrastructure underneath. PostHog handles the back end; Claude wires it up; customers get a dashboard that looks like it was custom-built for their business, because it was.
