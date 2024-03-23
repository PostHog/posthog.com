---
date: 2020-09-03
title: Array 1.14.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/default.png
featuredImageType: standard
category: PostHog news
tags:
  - Product updates
  - Release notes
---


Over the past three weeks, there was one word on everyone's mind: feedback.

We did a bunch of interviews with users and had a lot of discussions with the community around one key question: **How can we make PostHog better for you?**

The result is a release with new features and a ton of bug fixes, aimed at making PostHog better, faster, and more secure for our users. 

If you're self-hosting and want to upgrade for a better experience with nicer features, remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

## Release Notes

### [Insight History](https://github.com/PostHog/posthog/pull/1379)

![Insight History Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/insight-history.png)

Eric really killed this one with a massive pull request where 55 files were modified. 

As a result, PostHog now allows you to look through a history of the charts you've made on 'Insights', so that you don't have to worry about forgetting the exact filters you used to reach a certain conclusion, or feeling bad about not having saved that perfect chart from a week ago.

Experiment with insights all you want, now without the fear of losing your work. 

### [Personal API Keys](https://github.com/PostHog/posthog/pull/1281)

![API Key Screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/personal-api.png)

We also merged another huge PR (58 files changed!) from Michael that's been a long time in the making because we wanted to get this just right. 

To facilitate integrations with external services, as well as make the experience of using our API simpler and safer, we have now introduced Personal API Keys. They can be generated and deleted on the PostHog setup page. It's worth noting that this is a private API Key, compared to your public 'Team API Key' used in the snippet. 

Lastly, because of this change, we have deprecated authentication with username and password for API endpoints.

### [Public Roadmap](https://github.com/orgs/PostHog/projects/1)

![Public Roadmap](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/public-roadmap.png)

At PostHog, one of our core values is transparency. As a result, we try to make as much information public as we can, from what we're working on to how we operate. 

As such, it felt important to us to release a public roadmap where our entire community can view what we're up to, what we'll work on next, and what our objectives are for the future. For a long time we have had a rough roadmap available in our Handbook, but, by now having our roadmap on GitHub, we can directly link issues to the board, and community members can also vote (with emojis 👍) on issues they believe to be important.

Furthermore, we have always encouraged members of our community to open issues for bugs, feature requests, or just anything at all they want to see changed. Now, issues opened by the community can be incorporated on the roadmap, so you can have an idea of how your suggestions fit in with our development process. 

Keep the tickets coming!

### [PostHog FOSS](https://github.com/PostHog/posthog-foss)

As an open core company, we have to conciliate our open source efforts with our ability to generate revenue. Generating revenue is how we're able to continue to sustain our extensive work in the open source space. 

Thus, after a lot of brainstorming and [calls with the likes of Sid Sijbrandij](/blog/a-chat-with-sid), CEO of multibillion dollar [open core company GitLab](https://about.gitlab.com/install/ce-or-ee/), we settled on a business model that allows PostHog to be a sustainable company in the open source space. 

This led to the creation of two key things: an `ee` subdirectory on our [main repo](https://github.com/PostHog/posthog), and a new repository called [posthog-foss](https://github.com/PostHog/posthog-foss). We'll be explaining these in more detail in the future, but, for now, you should know that to run fully MIT-licensed software, you can either clone the main repo and delete the `ee` subdirectory (without any consequences), or clone our posthog-foss repo, which is a mirror of the main repository without proprietary code.

In addition, if you're an enterprise customer looking for added functionality and improved performance, contact us at _[sales@posthog.com](mailto:sales@posthog.com)_ or via [this form](https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u) to discuss the license for using our proprietary features. 

### [Secret Key Requirement](https://github.com/PostHog/posthog/pull/1426)

To ensure the security of your PostHog instance, it's important that you use a randomly-generated unique `SECRET_KEY`. This key is used by Django to encrypt cookies, calculate hashes, and generate tokens, making it of high importance. 

Prior to this version, we denoted the importance of this in our Docs, but did not enforce it in our software. Now, to enhance security, PostHog will not allow you to run the server without setting it.

Many of our deployments generate and set this key by default, so that you will not need to worry about it. This is the case with our [Heroku One-Click deployment](/docs/self-host/deploy/heroku), for example. However, other methods may not automatically do this (we're working on it!). As such, if you run into any issues when updating PostHog, make sure you have a unique `SECRET_KEY` set. 

You can find more information about this on our ['Securing PostHog' page](/docs/self-host/configure/securing-posthog#secret-key) and should always feel welcome to ask any questions on our [our community page](/posts).


## Bug Fixes and Performance Improvements

* We [disabled our own snippet](https://github.com/PostHog/posthog/pull/1539) on DEBUG instances and [improved tracking](https://github.com/PostHog/posthog/pull/1519)
* We [started using `django_extensions`](https://github.com/PostHog/posthog/pull/1541)
* Tim added a test to PRs to [check if our Docker image builds](https://github.com/PostHog/posthog/pull/1515/files)
* [Michael](https://github.com/PostHog/posthog/pull/1537/files) and [a bot](https://github.com/PostHog/posthog/pull/1527) helped us keep dependencies up-to-date
* Marius made the Toolbar UX better by [fixing its element detection](https://github.com/PostHog/posthog/pull/1424), [making the info window follow the mouse](https://github.com/PostHog/posthog/pull/1472), and [correcting other minor things](https://github.com/PostHog/posthog/pull/1470)
* Paolo [made user metrics better](https://github.com/PostHog/posthog/pull/1508)
* Eric [updated our /insights endpoint](https://github.com/PostHog/posthog/pull/1498)
* We changed the [color on some tabs](https://github.com/PostHog/posthog/pull/1485) and the [tone on some buttons](https://github.com/PostHog/posthog/commit/35e604e031da43b49da0afb0e7a854ecd93c95b8) to improve our UI
* We [fixed](https://github.com/PostHog/posthog/pull/1514) and then [added tests for our multitenancy environment](https://github.com/PostHog/posthog/pull/1533/)
* Michael [fixed a UI bug on our URL list](https://github.com/PostHog/posthog/pull/1526)
* We overhauled our README, which was really in need of updating. It now [looks better](https://github.com/PostHog/posthog/pull/1410), [reads better](https://github.com/PostHog/posthog/pull/1492), and has better info about [deployment](https://github.com/PostHog/posthog/pull/1525) and [our Enterprise Edition](https://github.com/PostHog/posthog/pull/1428). 
* We improved the [command description for `setup_review`](https://github.com/PostHog/posthog/commit/6b209413e9a6ee33b1e21b261ef72593da2b912a)
* Tim made our [testing of PR environments easier](https://github.com/PostHog/posthog/pull/1496)
* We made the ['Launch Toolbar' links open on a new page](https://github.com/PostHog/posthog/pull/1524)
* We [updated our CHANGELOG](https://github.com/PostHog/posthog/pull/1522/files) and bumped versions [here](https://github.com/PostHog/posthog/pull/1421) and [there](https://github.com/PostHog/posthog/pull/1517)(and in a lot of other places)
* We crushed a bug regarding [rest hooks for Docker images](https://github.com/PostHog/posthog/pull/1516/files)
* We [improved our syntax highlighting for code snippets](https://github.com/PostHog/posthog/pull/1490)
* [License issues](https://github.com/PostHog/posthog/pull/1511/files) and [disappearing user paths on Firefox](https://github.com/PostHog/posthog/pull/1513) are now bugs of the past
* [@J0](https://github.com/J0), a community member, introduced a [feature for disabling link sharing](https://github.com/PostHog/posthog/pull/1475)
* Michael removed a [useless release drafter action](https://github.com/PostHog/posthog/pull/1476)
* We had a [small refactor done](https://github.com/PostHog/posthog/pull/1489/files) on PostHog's `head` template 
* Yakko [fixed our Cypress tests](https://github.com/PostHog/posthog/pull/1486) and made them faster
* We [allowed Sentry in DEBUG mode](https://github.com/PostHog/posthog/pull/1480)
* We demolished issues with [Safari's funnels](https://github.com/PostHog/posthog/pull/1477) and [IDs for our CohortPeople class](https://github.com/PostHog/posthog/pull/1478)
* Paolo set up an [awesome Preflight page](https://github.com/PostHog/posthog/pull/1473)
* We [upgraded the Sentry SDK](https://github.com/PostHog/posthog/pull/1439)
* We made our [action for syncing FOSS and non-FOSS repositories beautiful](https://github.com/PostHog/posthog/commit/12eeaf999ec7a1594a971ead5fda6dc82adc3c1a)("using prettier")
* We set up an [action for syncing our FOSS and main repo](https://github.com/PostHog/posthog/pull/1423) then updated it [again](https://github.com/PostHog/posthog/commit/534c25686e1a9fc261230ef669df557cc69fb293) and [again](https://github.com/PostHog/posthog/commit/e9e6e39c189cdf261f91d56267335170c793e52e)
* We added [regex and action hints for the Toolbar](https://github.com/PostHog/posthog/pull/1457)
* We [migrated to `BigInteger` IDs](https://github.com/PostHog/posthog/pull/1471/)
* We changed the Toolbar heatmap to [display number of clicks instead of page rank](https://github.com/PostHog/posthog/pull/1459)
* We fixed our [bottom notice warning](https://github.com/PostHog/posthog/pull/1467) for PostHog running on HTTP
* We set up a [workflow for auto-updating the version](https://github.com/PostHog/posthog/pull/1452/)
* We [improved the description for DAUs](https://github.com/PostHog/posthog/pull/1454)
* Michael added a [warning bar for production PostHog instances running on HTTP](https://github.com/PostHog/posthog/pull/1437)
* Anna [fixed a bug with action deletion](https://github.com/PostHog/posthog/pull/1448/)
* We fixed [an issue with licensing](https://github.com/PostHog/posthog/pull/1438) and [another one](https://github.com/PostHog/posthog/pull/1450)
* We [fixed our Docker images](https://github.com/PostHog/posthog/pull/1443) to account for changes in Kea and Django's SECRET_KEY 
* Marius upgraded us to [use the newest version of Kea Typegen](https://github.com/PostHog/posthog/pull/1427)
* Eric pulverized a [bug about empty conditions on Trends](https://github.com/PostHog/posthog/pull/1416)
* We added a [column to denote when actions were created](https://github.com/PostHog/posthog/pull/1415)
* We [made the Toolbar easy to launch for all users](https://github.com/PostHog/posthog/pull/1345)

## Favorite Issue

### [Allow creations and management of multiple teams](https://github.com/PostHog/posthog/issues/1540)

Based on user feedback, we determined that it was essential to allow multiple teams to be managed under the same PostHog account. We're happy to announce we have a PR open for it! Keep an eye out for when it gets merged 👀. 

## Weekly Round Up

- [We offered custom fanny packs](https://www.linkedin.com/feed/update/urn%3Ali%3Aactivity%3A6702530259822157824/) to contributors who submitted PRs over a weekend
- Lottie, our designer, moved to Dakar, Senegal. She packed the day before.
- We [launched a merch store](https://merch.posthog.com/) which includes a PostHog shower curtain

## PostHog News

We made a significant progress with our migration to ClickHouse on the Enterprise Edition. Stay tuned for more news about this.

Two of our engineers, Marius and Karl, have welcomed a new member into their families! We wish them and their families all the best. 

Sam Burton has joined us to help with video editing as we venture into YouTube. You can now [hear about why PostHog was built](https://www.youtube.com/watch?v=TIxxIEEvczM) from James, our CEO. 

### Open roles

Are you a Fullstack Engineer? [We want you!](https://posthog.com/careers) 

Bonus points if you can tell us what sound a hedgehog makes.

<ArrayCTA />

