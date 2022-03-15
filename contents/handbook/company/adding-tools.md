---
title: Adding tools
sidebar: Handbook
showTitle: true
---

## What is it?

In [the software section of our spending money page](/handbook/people/spending-money#software) we say:

> There needs to be a very significant upside to introducing a new piece of software to outweigh its cost.

This is our mechanism for making decisions where we need to assess the cost of introducing a new piece of software.  

It is inspired by [this post on "fad resilience" from Slack](https://slack.engineering/how-big-technical-changes-happen-at-slack/). We want to be able to introduce new tools and services, without introducing overlapping tools and unnecessary complexity.

What makes us fed resilient is that you are free (and encouraged) to try new things. But by introducing new things, you become responsible for rolling them out. And for replacing anything they make obsolete.

# What is it *not*?

This isn't a way to make "cheap decisions". A cheap decision is one that can be easily completed or reversed. Or one that only affects your work not other people's. 

## How does it work?

If you find yourself saying something like:

* "we should use Notion, not Google Docs"
* or "(Haskell|Rust|Chicken) would be a better programming language for us"

Then you need to do the following:

1) Use the tool in a context where it is easily replaced. Similar to [a spike](https://wiki.c2.com/?SpikeSolution). 
   1) This lets you check if it works as well as you think. 
   2) Gives you a way to understand more of the consequences of using the new thing.
   3) And gives others a way to see the thing in action
2) At the same time open an issue in [Company Internal](https://github.com/PostHog/company-internal) describing why we should use it. This should include some of these items:
   1) why use it now?
   2) what problem does it solve?
   3) what things does it replace, and how will we replace them?
   4) what new cost does it introduce, and how will we pay them?
   5) what competitors or alternatives should we consider at the same time?

Many choices will not make it past this stage. That's good. We don't want a stack that changes frequently. But we also don't want one that never changes.