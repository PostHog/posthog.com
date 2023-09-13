---
title: Why your growth team isn't winning (and how to fix it)
date: 2023-09-13
author: ["lior-neu-ner"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/athlete-hog.jpeg
featuredImageType: full
category: Product growth
tags: 
  - Guides
  - Product metrics
---

There are telltale signals when a growth team isn't succeeding: stagnating metrics, unmet KPIs, and burnt out engineers. Everyone is frustrated, but how do you fix it?

[Alexey Komissarouk](https://alexeymk.com/), former head of growth engineering at [MasterClass](https://www.masterclass.com/), has seen it all. He grew Masterclass xyz... In this post, Alexey shares his advice on how to get your growth team winning again.

TLDR; there are 3 areas to investigate:

1. Your team's velocity.
2. Your experiment win rate.
3. Your experiment win size.

## Problem 1: Your team is moving too slowly

Your PM complains that the team is moving slow. The engineering team says there is too much technical debt. Sound familiar? This is caused by engineers having the wrong mindset.

Slow velocity is usually a result of code quality being too high. "Engineers hate doing growth. They want to implement elegant solutions to complex problems. Growth engineering is the opposite of that", says Alexey.

### How to fix it

First, sit with the engineering team and prioritize your technical debt. Figure out what is actually slowing you down (or likely to), and by how much. Once you have a ranked list, assign 10%-20% of engineering time to cleaning this up.

Second (and more importantly), encourage your team to take shortcuts. The role of a growth engineer is not to necessarily build feature, but rather to validate whether building a feature is a good idea or not. 

With this in mind, a good team exercise for this is to look at your last 20 experiments and identify which ones you could have validated faster. Thomas Owers, former growth lead at [Let's Do This](https://www.letsdothis.com/), has [good advice](/blog/how-to-start-a-growth-team#thomass-golden-rule-make-your-code-changes-as-small-as-possible) on this:

"Instead of asking 'How long will a project take?', ask 'What can you do in only 1 week? 3 days? Half a day?'. Often you'll find that you can reduce the scope of the change while still being able to validate your hypothesis".

---

## Problem 2: Your team is afraid of causing outages

(This below might need to be another heading)

another cause is breakages and outages. Make sure you have alerting in place

Your goal as eng team is not to avoid accidents. If you have zero accidents, you're not moving fast enough

"Let's see. Yeah, I mean, really good business alerting is really important. I don't know if you run into this, but like, what lets me comfortably shift things without tests is if the business metric fails, I wanna detect it **immediately**.

**Writing tests are a waste of time for an experiment that may only live 1 week**. what are all the other layers of safety that you can get that allows you to move faster that improves your experiment velocity because it reduces the amount of busy work that you have to do as an engineer.

I want a page and I wanna roll back. Like, like, if you build the system. Nicely. Then it will say, hey, this feature flag got flipped or this rollout got released and then this metric immediately fell."

(On how to move faster). He talks about setting up the right tooling
Talked about Error Boundary components.
Know all of your critical errors becomes sev 2 -

Force parameters - Making sure you’re adding to the right variant. Making sure its easy to replicate
Really good component tests are valuable – reusable components be strongly tested. So nobody can be added to component framework and break your experiment


- Testing & Release
    - Testing Philosophy: Integration and Components, No Snapshot/FE tests for experiments
        - Test Plan
    - Review Apps
    - Force Parameters - making sure easy to repro
    - Chrome Extensions for Analytics Events
    - Advanced: Experiment Aware Tests (these are hard)
    - Error Boundaries

Anecdote: story of airbags. If you have your airbags, you can increase your spee

## Problem 3: Your experiment win rate is low

You keep trying new ideas, but none of experiments have the expected outcome. "You need better ideas", says Alexey, "and, counter-intuitively, the way to do this is to improve the estimates of your current ideas".

Typically teams prioritize their roadmaps by using frameworks such as [RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) and assigning t-shirt size estimates ("S", "M", "L"). This doesn't go deep enough, and leads to teams wasting time building pointless things. It doesn't make sense to spend only five minutes estimating something your team will spend weeks on.

### How to fix it 

Once you have shortlisted the ideas you want to work on, the next step is spend an additional hour on each one and estimate the dollar impact. The result is that you have a higher win rate, because you know **exactly** what to expect from your experiments.

This approach was made famous by Facebook Messenger's VP of growth Darius Contractor and his [EVELYN framework](https://www.drift.com/blog/secret-to-faster-growth/). He even shares a handy [airtable with real examples you can copy](https://airtable.com/appzs6HT2ggrJt9pN/shrInOxl0SL1Xmauk/tblTQFEMcXAaEgSpM/viwZessbXpiA8q2jd?blocks=bipMQFWTjqu0HI3wv).

Alexey says that one of their biggest wins from following this approach:

"At MasterClass, we had one-size-fits-all pricing. We knew we would eventually need to add tiered pricing, but this would be a huge, months-long company efforts. We struggled to prioritize it."

Enter EVELYN. Alexey knew they needed a dollar estimate of the impact.

"Instead of building the entire backend, we built a simple [fake door test](https://posthog.com/tutorials/fake-door-test) on the frontend. Users could select their preferred tier, but at checkout we let them know that they were being upgraded to the best tier and at the cheapest price. In reality, this was actually the existing one-size-fits-all pricing.

Now we knew how much money the company could make by implementing. Then it was incredibly easy to ask for the rest of the company to work on this for a few months!"

## Problem 4: Your experiment win size is low

Your growth team has been around for a few quarters and you've picked all the low hanging fruit. Your new experiments require more efforts AND have less impact. Now what?

[John Egan](https://jwegan.com/growth-hacking/managing-growth-teams-portfolio-step-step-guide/), former head of growth engineering at Pinterest, recommends two levers you can pull:

1. Increase the number of high quality project ideas.
2. Maximize the impact of every experiment you ship.

### Increase the number of high quality project ideas

The best way to do this is create a bottom-up culture where it's the job of **every single person** to come up with ideas. That means every engineer, designer, data scientist, sales rep, marketer etc.

When it's everyone's job to do this, the number of ideas increases dramatically. Then, by applying the estimation process mentioned above, you distill the list to only the best ideas.

> **💡 Tip:** To create an inclusive ideas culture, make your [brainstorms asynchronous](https://source.opennews.org/articles/redesigning-brainstorming-asynchronous/).

### Maximize the impact of every experiment you ship

The way to do this is also related to creating a bottom-up culture: Every engineer should own the experiments they are working on and be empowered to make it as impactful as possible – even if it wasn't originally their idea! 

They should be hypothesizing how to improve and iterate on their experiments. This ensures that you squeeze as much impact as possible from every idea.



---
Closing thoughts:

Growth eng can get tired. It makes sense to rotate them

You just got tired. Like, it's okay. That makes sense. That isn't a bad thing. But like, it's not just because one team is like starting to see diminishing returns doesn't mean that they aren't there.

And to rotate them between growth and core product or growth on the platform. Because sometimes you need to work on something else, right?

There's no shame, like, if they're bored of it, they don't like it at all, and they're willing to tolerate it and then, right?


Like, you know, I was a good soldier for a quarter or two, but like, I'm done with this, right?


Because they just legitimately need to change, like, they like it, but they want to do something else, right? Regardless, yeah, like, if an engineer is hired or something, and they're a good engineer, you should go find something else so they can do the

If youre seeing your win rate or win size is going down.
Or your team is tired and need to go somewhere 

At open-door I spent first 2 years top of funnel

When I came to manage the team

There are wins here you just got tired.

Just because one team cantf find, doesn’t mean its not their

It makes a lot of sense to rotate teams inside of growth . Sometimes 

## Further reading

