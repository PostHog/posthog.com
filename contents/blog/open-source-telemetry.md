---
date: 2020-07-29
title: Open source telemetry
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
---

A topic that strikes fear into the hearts of many working on open source projects - telemetry. So much so, I was a little nervous about writing this piece!

## Is telemetry in open source projects ethical?

Not always, often no but sometimes yes. If this were a Facebook relationship status, "it's complicated".

Open source projects are zero expectation - they may contain bugs, security risks, or have confusingly outdated documentation. Remember that time you lost hours on a project that just didn't work in the first place?

The fact it's acceptable for open source software not to work is a _great_ thing - it makes it easier for anyone to contribute. Mistakes, or half-baked projects included. You can't have innovation without a lot of people being able to contribute and make mistakes, or give up.

Anyone using open source software *could*, _technically_, work out if they're being tracked, but this doesn't mean that they have the ability to do this, or - more likely - they may assume they're not being tracked. Misleading people just feels wrong.

However, we don't think that makes it ethical to mislead users deliberately, so you should be upfront in your docs about telemetry.

## How personal is the tracking info?

### Nothing

Nada, zilch. You've no idea what's going on.

It's actually not possible to do this with GitHub; you get quite a few basic bits of intel:

_INSERT IMAGE OF WHAT GITHUB SHOWS_


### Aggregated tracking



### Anonymized tracking


### Full user tracking

Asking permission proactively here feels like the only acceptable way.

## Can you avoid sending user data to 3rd parties?

There are several ways this can happen.

There are lots of software tools