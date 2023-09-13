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

as an industry, we don't spend enough time estimating. Like, we have an idea, and then, you know, we rice it, we say this is an L, or an N, then we just try to get the PM picks the roadmap from there.


### How to fix it

is you actually spend an hour per idea that you're thinking of doing, and you actually try to do a bottom sub estimate of the dollar impact that the idea will have.

You improve your win rate by adding fidelity to your estimates. 


https://www.drift.com/blog/secret-to-faster-growth/
From Darius: 
> Opportunity sizing do can be very hard to accurately. That’s part of the reason a lot of teams, even great growth teams, don’t go deep on opportunities, I think. Because they feel like it’s too much of a tax to getting something out the door. But what I’ve learned over my years doing it is that while it is a bit of a tax up front, it gets much easier over time. If you put in 10 units of effort to opportunity-size the first project, it ends up being three units for the second project and then two units for all following projects. Because it turns out that eight of the things you did for the first project are just the same for all the projects. It’s the same surface, it’s the same conversion rate, it’s the same data pool. It ends up that you just get really good at it really fast, you surprise yourself by how easy. Then, honestly, it becomes like flossing. The first few times you floss you’re like, “This is annoying.” When you floss, you’re like, “I feel dirty. I need to go floss.” You know?

Eventually, "Darius: Like, “Why are we running experiments that we don’t have opportunity sizes for?” Eventually, your team will be saying this."

e.g lets say you want to add paypal to your site

But, yeah, you come up with better ideas. You have a higher than rate by actually spending a little bit more time estimating your ideas by saying, hey, the example we use is if you're going to add PayPal to your site, how big a win do you think that's going to be?


Right? okay, let's go talk to some friends where PMs are similar companies, and let's see what their PayPal volume is.


Let's go cut that by US versus international. Let's go look at our conversion today. Like, what's the... There's a bunch more work that you can do that improves your linear. 

**Another example**

Like, by doing a little bit more research, like, for example, if you're thinking of doing something and all of your competitors, you have two ideas and all of your competitors do want to be a deal, but not the other. Like, probably they tested that, right? Yeah. So, like... Going to doing the research and saying, how common a pattern is this?

wow. And checking, like, hey, what is actually working for our competitors?


<!-- Share Airtable or include image on how to do it? -->

**Alexey shares an example of how his growth team actually pulled this off once, **

Real stories we can share
A lot of the interesting wins where the eng work is lower

This is a Masterclass was $180 a year 

We’re not capturing all the value for people who value it differently

But different pricing is multiple

We built the frontend and not the backend

Now we have a dollar amount

But biz ops says not credit card

But people didn’t have credit card

And now we have actual dollar amount. Now we can ask 2 months of all the eng time to support this project.
So now that was a much easier ask 

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

