---
title: What launching Experimentation taught us about running effective A/B tests
---

PostHog started off with simple product analytics. You want some data analysed, so you ingest this data. PostHog then lets you visualise this, slice it over multiple axes, and helps you answer any product questions you have.

Then came feature flags, which allow you to toggle features on and off, change what users see live.

It was a no brainer then to take the next step and introduce Experimentation. Since you're already analysing your data in PostHog, and are feature flagging new features, why not give the capability to test significant changes as well?

We recently launched Experiments, and there's a ton we learned about running successful experiments. That's what this post is about.

## The Peeking Problem is poorly named

Peeking isn't the problem, taking action without enough information is.

9. Peeking Problem isn't really a _problem_ for decent products. If anything, peeking is addictive :P

^Something we built into the product.

## The kind of experiment you run determines how much data you need

1. Some kinds of experiments need less data

## Choosing the right metric is hard

2. Choose the metric you want to track carefully

10. Why not run every experiment on this global metric? That way, you're testing if overall product gets better or not. Simple yes and no, takes into account all factors.

But also, since it's veryy hard to reliably move global metrics, focus on local metrics. (while ensuring global metrics don't take a dippp)

## Experiment results aren't set in stone

3. Bringing data to conversations, but also talking through causes.

4. Don't blindly trust data

## Control for control

5. Control groups? -> All experiments are relative.
  6. Selection bias

## There is no state when you can be 100% sure

7. What if new information invalidates all old information?

Multi armed bandits?

8. Clinical trials are very different from website changes -->>> hmm condense this. What am I trying to say?


