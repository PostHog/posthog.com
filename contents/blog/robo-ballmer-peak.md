---
title: How agents let me unlock my robo-Ballmer peak
date: 2026-07-01
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - paul-dambra
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/Template_cover_14_0da4d45933.jpg
featuredImageType: full
category: Engineering
tags:
    - Engineering
    - Session replay
    - AI
---

## And stay on top of my 122 hours in Subnautica

Recently the session replay team were considering introducing a cap on the size of recordings that we'll capture.
The majority of recordings are small, the p50 over the last month is less than 1MB.
But the p90 is 6.8MB, p99 is 57MB, and max is 155GB.

We've improved the performance of ingestion multiple times over the last few years.
So now we can ingest these larger recordings, but users have a bad time trying to play them back.

Recording data is dense JSON that describes the user's session.
We've investigated the size in the past and found improvements but not enough.
And now we were considering adding a cap to protect user experience.

So, recently I found myself with great weather, a bottle of prosecco, and a copy of Subnautica, and a desire to relax.

But I couldn't put the idea down...
we're putting a limit on the user to protect them from our limitations... that's yucky

So, I couldn't relax... much wasted sun and Subnautica and prosecco.
but in this world of agents, you don't need to hit the meat Ballmer peak.

you can just drink and prompt an agent.
the robo Ballmer peak.

hacking my dopamine addicted brain could begin.

over the evening I sat in the sun, drank Aperol spritz and bounced between Subnautica and PostHog code

first you always have to ground the agent in reality. or you ask for words and the world machine gives you them.

we downloaded example data from the largest recordings and the top p75

and wrote scripts together to analyse them and assess where the data was coming from.

the main risk in this kind of work is that the agent will slurp in too much data and start to get stupid
so the main work was in prompting how to analyse in parts over just asking an open question
and then arguing with it about its statements to force it to fake think better

mostly what we discovered was that early assumptions about what would happen in reality were wrong

so over the next 48 hours we:

* stopped capturing response bodies that are not JSON or text
    * we don't display them, it was a silly oversight and for some recordings was 45% of the data captured :/
* stopped capturing canvases at full resolution (we capture at 0.6 by default and scale up at playback)
* extended capping of the size of inline base64 encoded images to ones wrapped in SVG containers (as well as those directly in IMG tags)
* skip capturing bodies of requests/responses to 3rd parties tools
* better enforcement of the 1MB max for request and response payload capture (still rolling out)

can the robo-Ballmer peak bring receipts?

for our customers already at the top of the pack in data ingested, they're now sending around 40% less data for exactly the same experience

across all customers we've reduced the size of the data we capture by around 9%

PostHog is growing super fast... today that's around 20TB of data a week. But the savings over time as we grow will be super sweet.

Subnautica? I'm down to the inactive lava zone now. Pretty close to finding the cure I think.
