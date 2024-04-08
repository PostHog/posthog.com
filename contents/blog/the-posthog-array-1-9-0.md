---
date: 2020-06-18
title: Array 1.9.0
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

First, learn [how PostHog raised $3M for our open source project](/blog/raising-3m-for-os). We could not have done it without this community - thank you for all your issues, feedback, usage and support!

So, what have we been doing with the money?

Since last time - AWS marketplace deployment, docusaurus integration, much better testing, a shiny new user sessions view, and see a ton of bug fixes and improvements to our testing. This Array is almost emoji-worthy. Almost.

If you're self hosting and desire these features - [update your PostHog](/docs/runbook/upgrading-posthog).

## Release notes

### [Sessions view](https://github.com/PostHog/posthog/pull/926)

We kept getting requests to group events by user session, so we listened! We're proud to announce this is now merged:

![sessions overview](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/sessions-overview.png)

You can then see exactly how a user interacted with your app:

![sessions more detail](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/session-broken-out.png)

This should really help with debugging, or just trying to get a detailed view of what users are up to.

Want to try it? Find Sessions under the Events menu on the left hand navigation.

### Far better testing

We put a huge amount of work into our tooling this week - to get an overview, see [our blog post on Cypress end-to-end tests](/blog/cypress-end-to-end-tests).

What's new? We:

* [Fixed Cypress tests](https://github.com/PostHog/posthog/pull/1015)
* Enabled [running cypress in parallel](https://github.com/PostHog/posthog/pull/959), which saved a minute.
* [Fixed cypress linting errors and sped up tests further](https://github.com/PostHog/posthog/pull/865)
* [Cached PostHog's yarn builds](https://github.com/PostHog/posthog/pull/927), which took e2e tests down by around 30%.
* Finally, we now [wait for PostHog to start serving requests](https://github.com/PostHog/posthog/pull/920) rather than the 60 second sleep when running Cypress.

### [Docusaurus integration](/docs/libraries/docusaurus)

If you're using Docusaurus for your own docs, there's now a [PostHog Docusaurus integration](/docs/libraries/docusaurus) for that!

### [AWS marketplace - 1-click install](https://aws.amazon.com/marketplace/pp/B089QN5DZM)

![PostHog on AWS Marketplace](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/aws-posthog-marketplace.jpg)

You can now install PostHog in just a click or two via AWS' marketplace.

This is just as easy as Heroku and fractionally less expensive!

### [Management command for millions of events](https://github.com/PostHog/posthog/pull/475)

It's a delight to see another community PR. Thank you [Bhavish](https://github.com/bhavish-agarwal)!

This feature means you can test your PostHog setup at scale. No more guesswork if your server setup is correct.

### [Set properties to anonymous users](https://github.com/PostHog/posthog-js/pull/43)

You were already able to set properties on users you had previously identified, but now you can even set properties if the user is anonymous.

This is especially useful for doing a/b testing. Make sure you upgrade posthog-js if you're using it via npm. If you're using the snippet this should automatically work.

## Bug fixes and performance improvements

* We worked hard on improving caching to speed things up. We [fixed cache refreshing](https://github.com/PostHog/posthog/pull/1035) in a few areas, we made a few [caching adjustments](https://github.com/PostHog/posthog/pull/1023) to fix [#1022](https://github.com/PostHog/posthog/issues/1022). Finally, we now use [redis to cache results](https://github.com/PostHog/posthog/pull/972).
* Save time! You can now [create actions from the trends page](https://github.com/PostHog/posthog/pull/990).
* [Upgrade to posthog-js 1.2.0 to support dynamic params](https://github.com/PostHog/posthog/pull/957).
* We fixed long href inserts - the href [can now go up to 2048 characters](https://github.com/PostHog/posthog/pull/1027) before truncation. Someone must have had some funky urls going on…
* [We prevented intermittent issues with yarn build](https://github.com/PostHog/posthog/pull/1026)
* We [fixed a bug](https://github.com/PostHog/posthog/pull/1021) that caused cohorts to fail when actions were deleted
* We [solved a problem](https://github.com/PostHog/posthog/pull/980) with comparing trend sessions distribution
* We [added a limit to number of returned entities for breakdowns](https://github.com/PostHog/posthog/pull/1008) so queries don't time out
* We [created a fix](https://github.com/PostHog/posthog/pull/1013) for an issue with heartbeats
* We [made it clearer](https://github.com/PostHog/posthog/pull/1014) that PostHog SaaS users are on the latest version
* We [slashed CPU consumption for VSCode](https://github.com/PostHog/posthog/pull/1007) by excluding a folder
* Generated a [performance improvement for element stats](https://github.com/PostHog/posthog/pull/991)
* We [stopped giving way too many decimal points](https://github.com/PostHog/posthog/pull/984) on our graphs!
* Trends page [UX improvement](https://github.com/PostHog/posthog/pull/919)
* [Improved filtering](https://github.com/PostHog/posthog/pull/986) on elements
* We fixed [a race condition](https://github.com/PostHog/posthog/pull/973/commits/953af2326dff94e8ae1d75cd6ea0fc2c64567857)
* [We don't rely](https://github.com/PostHog/posthog/pull/949) on $ to separate PostHog's events
* We [removed the redundant math selector](https://github.com/PostHog/posthog/pull/950) on funnels - it didn't do anything!
* [Django upgraded to 3.0.7](https://github.com/PostHog/posthog/pull/932)
* We [made HTTPS work locally](https://github.com/PostHog/posthog/pull/910) - we had lots of community issues raised, so that should make it easier to get started with!
* We [improved the setup overlay layout](https://github.com/PostHog/posthog/pull/904)
* We [sped up the events endpoint](https://github.com/PostHog/posthog/pull/903) by just hitting the current week's partitions
* We solved a problem [with temporary tokens](https://github.com/PostHog/posthog/pull/909)
* We added [webpack HMR](https://github.com/PostHog/posthog/pull/878) and hashes to chunk filenames. (#878)

## Favorite issue

### [Blog header design](https://github.com/PostHog/posthog.com/issues/128)

We had a lot of fun this week thinking about how the PostHog brand looks and feels, and welcomed Lottie - our new designer - to the team!

## Weekly round up

From our own blog:

* [How we raised $3M for an open source project](/blog/raising-3m-for-os) - we hope this helps other open source projects.
* [Super fast testing with Cypress and GitHub actions](/blog/cypress-end-to-end-tests) - an example of the focus we have on investing in dev tooling.

Other cool stuff from around the web:

* [Funding for moonshots](https://apolloprojects.com/) - get your own $3M.
* [Strandbeest](https://www.strandbeest.com/) - wooden, walking sculptures… they're pretty weird.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## PostHog news

We've had a wonderful two weeks.

The PostHog team is growing - we're now 6 people, both our ability to ship and our product plans are bigger and better than ever.

The seed round we raised is just the start of us making sure we create a full product experimentation platform with you, the community. Now is a great time if you have any ideas for ambitious feature requests to put them into the repo as issues. If you'd like to build something cool *with* us, we're open to some pair programming - [get in touch](https://app.posthog.com/home#supportModal)! :)

### Open roles

There are two roles we'd love to talk to you or your friends about:

* We are looking for a CSS wizard to help work with Lottie on our website and docs overhaul.
* We're also trying to find a growth engineer. Someone technical that can help us with our own product-led growth.

<ArrayCTA />

