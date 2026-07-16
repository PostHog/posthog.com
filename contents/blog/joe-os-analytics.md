---
date: 2026-06-08
title: I didn't understand the OS I built with AI until the MCP gave it analytics
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - joe-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_analytics_fe722d85af.jpg
featuredImageType: full
category: Inside PostHog
tags:
  - AI
  - Guides
---

For my birthday this year I got a [Pimoroni Presto](https://shop.pimoroni.com/products/presto) — a little developer gadget with a 240×240 touchscreen and not much else. I also got an environment sensor which can track CO2, temperature, and humidity. I wanted to build something for it.

The thing is, I'm not an engineer. I'm a marketer. Until I joined PostHog [I couldn't code at all](/blog/a-non-coders-thoughts-on-everybody-codes-culture). I've made effort to learn and slowly got myself to the point where [I could ship product features](https://www.linkedin.com/feed/update/urn:li:activity:7311329717784096770/), but it wasn't until [DeskHog](/deskhog) came along that I saw how AI could supercharge my progress.

My goal was a desk dashboard that worked at any level of attention. Something I could glance at between meetings and read idly, but that also had deeper things to poke at while I waited for someone to join a call or had lunch.

## What I built

I call it Joe-OS, because naming things is the one part of this I'm actually qualified for.

The Presto runs MicroPython. The top two-thirds of the screen is a carousel of panels; the bottom third permanently shows temperature and CO2 from the sensor, with little sparklines of the last half hour. You move between panels by tapping the corners of the screen.

The panels are deliberately a mix of useful and useless:

- Three news readers that stream the latest RSS headlines from The Guardian, BBC News, and Rock, Paper, Shotgun.
- Oblique Strategies — Brian Eno's deck of creative prompts, plus a few dozen I wrote myself to build it out more.
- A rotating daily joke, a random fractal, and a Sky panel showing the current moon phase, sunrise, and sunset.

<ImageSlider>

![joke panel](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/06_joke_0b212d071d.png) 

![moon panel](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/08_sky_2a93713f2a.png) 

![rps panel](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/03_rps_eb3d967928.png)

![oblique panel](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/04_oblique_7558fce9eb.png)

</ImageSlider>

The most ambitious part of Joe-OS was Vigil

It's a tiny medieval roguelike text adventure about a knight keeping watch over a dying realm. Every turn something happens — a ghoul rises, a house burns, a bandit approaches — and you respond by choosing an Honorable or a Craven option. Sometimes you get a third choice based on your inventory or companions, each of which has their own simple personality.

It runs across five acts and 400+ hand-written events, with a two-and-a-half minute cooldown between choices during which the world breathes by giving you a slow trickle of flavour events.

When your knight finally dies, you choose their last words, and those words shape the knight who takes up the watch next. It is not a game you rush. It's something you keep half an eye on while you wait for meetings to start over the course of weeks.

<div className="flex justify-center">
<img src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/09_vigil_43101400fb.png" alt="vigil panel"/>
</div>

## Modern coding is mostly copy-and-paste

The whole thing was built in plain English, in conversation with Claude. I'd describe what I wanted — a new panel, a layout tweak, a bug to chase — and it would write the MicroPython, flash it to the device over USB, and read the logs back when something broke. For the bigger pieces, like expanding Vigil, I'd put it in plan mode first, but for everything small, I just said the thing and watched it land a few seconds later.

Initially my prompts were not precise. Most were vibes — _"make the moon panel a bit nicer and more in keeping with the aesthetic."_ Some were just _"the clock is five minutes slow,"_ with a photo of the screen attached. The rhythm never changed: ask, flash, see what it actually did, report back.

This was a necessary pattern because, while AI helped me ship this thing, I didn't always understand the thing I shipped and the AI is only as good as what you can tell it. "_It's broken_" isn't as powerful as "_It hangs at the weather fetch, here's the boot log for you to debug_"..

The bottleneck in non-technical building isn't building anymore — it's _diagnosis_. And diagnosis is just data you haven't collected yet.

So the more of my code an AI writes, the more I need something telling me — and it — what's actually happening. That's the opposite of what you'd assume. You'd think tools like Claude make analytics less necessary. For people like me, they make it _more_.

## Setting up PostHog

Which is why the last thing I added was PostHog.

There are a lot of ways to [install PostHog](/wizard), but I did this with one sentence: _"Add PostHog to track usage, games played, and errors."_

Claude wrote a small capture client that batches events in memory and ships them over WiFi without ever blocking the screen, then wired it through the whole OS. I pasted in a project key. That was the entirety of the install experience.

The more interesting part happened next, through the [PostHog MCP](/docs/model-context-protocol). With it, I never had to open the PostHog UI. I just asked, and Claude found my new project, confirmed events were arriving, built two pinned dashboards, and filled them with fifteen [insights](/docs/product-analytics/insights) – all from plain English.

AI collapsed the gap between having an idea and shipping it. The MCP collapsed the gap between shipping it and understanding it — which, for someone like me, is the harder of the two.

![Vigil dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/vigil_dashboard_1e866cdf61.png)

The device now reports boots, which panels I actually visit and for how long, every honour-or-craven choice my knights make, which companions I recruit, where they die, and a temperature and CO2 reading every five minutes. One dashboard tracks device health — errors grouped by where they fired, CO2 plotted against the same thresholds the OS uses to colour its own display. Another dashboard tracks interactions in Vigil.


## Shipping isn't maintaining

I'm not going to pretend I'm an engineer now. I do enough of that on LinkedIn. But the gap between "I have an idea" and "it's running on hardware on my desk" has collapsed, and it'll keep collapsing for people like me.

Analytics added via PostHog are part of how that happens. The dashboards and tracking I've implemented can function as just a curiosity — a scoreboard by which I can track my lifetime progress in Vigil and the temperature in my home office. But they also provide so much more as a way for me to enrich my prompts, gather insights, and build more features.

A few things that are already changing because of what I can now see in the data include re-ordering the panels and tweaking the UI. I knew this intuitively, but the data in PostHog showed I opened Vigil more often than anything else. So, I asked Claude to create a shortcut. Now, I can tap the clock from any panel and it'll take me straight back to my knights' dreary adventure. 

Further updates are coming too. Right now, the numbers in Vigil's dashboard suggest I choose the Honorable option far more often than not – which suggests the moral tension I was hoping for isn't landing. When I get time I plan to rewrite many of the story beats, remove the Honor and Craven labels, and make the positions randomize. That way there won't always be an obviously good choice to lean on.

In other words, while the way I build is changing thanks to AI tools like Claude, product analytics remains an important part of the process and helps me decide what I'll build. The instrumentation is what lets me, and the AI I build with, keep something alive that neither of us could have written alone.

Also, my desk now tells me when the CO2 in the room is too high, which explains an enormous amount about my sleepy afternoons.
