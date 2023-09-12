---
title: Why your growth team isn't winning (and how to fix it)
date: 2023-08-22
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

[Alexey Komissarouk](https://alexeymk.com/), former head of growth engineering at [MasterClass](https://www.masterclass.com/), has seen it all. In this post, Alexey shares his advice on how to get your growth team winning again.
// todo : add more cred to alexey

TLDR; there are 3 areas to investigate:

1. Your team's velocity.
2. Your experiment win rate.
3. Your experiment win size.


## Problem 1: Your team is moving too slowly

Your PM complains that the team is moving slow. The engineering team says there is too much technical debt. Sound familiar?

this is caused by mindset. Eng nee
"engineers hate doing growth."

And the reason they hate doing growth is because it's sort of a nap them up to the way that they've been taught, right, in two ways.


first of all, they've been taught that, like, in class, they've all part engineering problems, right? You go to school and you're like, I've got this algorithm down to, like, end log in, and it's beautiful.

**And so, the first thing that happens is they just have a slow velocity because their quality is too high, right?**

Or, like, I wrote this operating system code and it's, like, really complicated, like, know, it's all the requirements and the code is really, like, elegant.


Yeah. so, like, all their career, they're looking solve hard problems. And then they get into the industry and then, like, they, you know, they do Google or whatever their first job is, and they're taught that you get promoted for, like, creating a complicated system, right?

Like, there's sort of this reward that, like, you can't get the senior level unless you, like, deliver a submission, like, you know, like,

### How to fix it

Start with engineers
Asked them to prioritize things (he has blog newsletter)
And you say, okay, what is actually the technical? What is actually slowing it down? Let's prioritize it. Let's vote on what we think is going to be used.

Growth eng requres different mindset.
At the same time, look at the last 20 experiments and find shortcuts. 
At the same time, let's go look at the last 20 experiments that we wanted to run. Oh, this one, you could just take this shortcut.

every time the P.N. asking for a feature, you don't need You just need to estimate what takes the validate, whether that feature is a good idea, which is a different thing than building features, which is the only thing you've ever done before if you haven't worked on a growth.

2 way compromise. Get team team to list out problems. Assigned 10% of time 


"I have never met an eng team that hasnt complained about tech debt

---
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

## Problem 2: Increasing you experiment win-rate

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

<!-- Share Airtable or include image on how to do it? -->


**Another example**

Like, by doing a little bit more research, like, for example, if you're thinking of doing something and all of your competitors, you have two ideas and all of your competitors do want to be a deal, but not the other. Like, probably they tested that, right? Yeah. So, like... Going to doing the research and saying, how common a pattern is this?

wow. And checking, like, hey, what is actually working for our competitors?




## Problem 3: Increasing your experiment win-size

Start with:
"Its been a few quarters, and you got all low hanging and easy effort fruit". Now what?

Youve found your local maxima

In size of bet and impact. So in an ideal world, find a small change and it's computer. But you find it relatively quickly.




Usually, by the time you've been working on things for a couple of quarters, the big wins are going to come from big changes.


And big changes will usually take more effort.

Advice usually depends on company stage: https://jwegan.com/growth-hacking/managing-growth-teams-portfolio-step-step-guide/ 

### How to fix it

https://jwegan.com/growth-hacking/managing-growth-teams-portfolio-step-step-guide/

From John Egan: Lever 2: Increase the number of high quality project ideas
Once you have a good process to select projects, the second lever is to increase the pool of good projects you have to select from. To do this you need to make sure it is not just the Product Manager’s job to come up with ideas for the roadmap,

That means every engineer, every designer, every analyst, should be required to contribute experiment ideas

When it is everyone’s job to contribute to experiment ideas, the number and pipeline of experiment ideas will dramatically increase. With proper training and feedback you can ensure that those ideas are high quality -> Lever 1: Increase the rigor of your project selection process

---
maybe:

Lever 3: Maximize impact of every experiment you ship

The final lever is to make sure you are really maximizing the impact of every experiment you ship. The way to do this is related to lever 2 of building a bottoms-up culture. Every engineer should have ownership over experiments they are assigned to work on, even if it wasn’t originally their idea. What ownership means is that they should be striving to figure out how to make the experiment as impactful as possible by improving on the initial idea or by coming up with additional variants to test. Doing this will help make sure you are squeezing as much juice as possible out of every experiment. If a team of 10 engineers works on 120 experiments/quarter there is no way a single person can think deeply about each and every one of the 120 experiment ideas. Taking a bottoms-up model where the people spending the most time working on an experiment idea are empowered to come up with suggestion and figure out how to maximize that idea will help make sure you’re not leaving any money on the table.

---
**Not growths problem?**

Just like, just crank on the optimization that you'll be fine. And eventually, you find the local maxima there where you're like, cool, I need to go, you know, I need to be able to be or either partnership panel, like, now you need to more in the big best.


But when I do that, I would do that at the quarter level, not at the team level, like, like, I would at planning, I would say, Hey, from now on, we're going to be taking one or two big bets a quarter.


going to staff a different team of like maybe two or three engineers. And they're going to have a whole quarter and maybe a second quarter to go like chase this.


But we're going to treat them as the new business line. We're not going to treat them as like, you know, another part of the growth team.


Like growth is funded by the local max on the team, right? It's given the things work like this, I can get you to last 10, 20, 30, 40% of this.


If you start using growth teams to do to go zero to one on a bunch of things, or you're taking bigger swings, you can do that.


It's a little bit, it's a little bit like, it's not as close to the fit, right? It's one of those things where...


You know, if you do a bunch of big projects, the only small number of them, first of all, like, if you spend six weeks on something and it doesn't work, it's much harder to decide if you're going to do a meal or two or not.

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

