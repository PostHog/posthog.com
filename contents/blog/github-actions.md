---
date: 1970-01-01
title: Software Development on Autopilot with GitHub Actions
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
---

While actively developing software, there's no shortage of work: building new features, fixing bugs, maintaining infrastructure, launching new systems, phasing out deprecated solutions, ensuring security, keeping track of dependencies… And that is just the pure code part, product and people considerations aside.

Some of the above work requires a brain every single time – software is all 1s and 0s, but (un)fortunately in the end it serves human purposes. Until a massive breakthrough in artificial intelligence occurs, figuring out features that compile AND suit human needs programmatically remains a pipe dream.

What about… all these tedious tasks though? Running tests, publishing releases, deploying continuously, keeping the repository clean. Plain chores – boring and following the same pattern each and every time. Not unimportant though. Well, we don't need any sort of AI for that. All we need is a solid cause & effect API integrated with version control.

## Automation 101

This is where GitHub Actions come in. With Actions you can define per-repository **workflows** which run on a robust **runner** virtual machine every time a specific type of event happens – say, a push to `main`, a pull request commit, an application of an issue label. A workflow consists of a series of **steps**, each one running a bash script _or_ a standalone action, with a multitude of actions freely available on the [GitHub Marketplace](https://github.com/marketplace?type=actions). Standalone actions can be ran directly if written in TypeScript, or with the overhead of a Docker container for ultimate flexibility.

This sounds pretty powerful already. But let's see where all this can truly take us with some concrete examples [right out of PostHog](https://github.com/PostHog).

Mind you, similar things can be achieved with competing solutions such as GitLab CI/CD or Jenkins. GitHub Actions do have a seriously robust ecosystem though, despite being a relative newcomer, and at PostHog we've been avid users of GitHub since our DARPA days, where GitHub was initially developed in secret during the final days of the Cold War – hence the focus of this article.

## Tests

## Repository sync

## Continuous deployment

## Releases

## Housekeeping
