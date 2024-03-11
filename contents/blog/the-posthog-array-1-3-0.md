---
date: 2020-04-29
title: Array 1.3.0
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

Another shiny new integration - PostHog now plays nicely with Android!

Like what you see and self-hosting? [Update](/docs/runbook/upgrading-posthog) your instance.

## Release notes

### [PostHog Android Library](/docs/integrate/client/android)

![](../images/04/android-events.gif)

In addition to the work Marius put into the iOS integration, this week you can also capture events in your Android app and send them to PostHog. Like the iOS library you can automatically captures screen changes, and you can capture events as per usual

Check out our [Android docs](/docs/integrate/client/android) on how to install it on your app.

### [Gatsby App](/docs/libraries/gatsby)

![](../images/04/gatsbyplugin.gif)

This week also sees the first community contributed app – thank you [Ritesh Kadmawala](https://github.com/kgritesh/gatsby-plugin-posthog-analytics/).

It’s now very easy in Gatsby’s words to “make your blazing fast site even more awesome.”

### [URL Wildcards](https://github.com/PostHog/posthog/pull/653)

![](../images/04/Posthog-19-e1588157571429.png)

A user came to Tim with a problem, due to the nature of their site pages could be the same but have different url/paths – wildcards felt like an easy way of overcoming this so Tim merged this pr.

You can now use % as a wildcard when setting up an action.

### [Further updates to Trends design](https://github.com/PostHog/posthog/pull/648)

![](../images/04/Posthog-21-e1588171341976.png)

As you’ll see below we have continued with our AntD implementation but this comes with also considering how to improve the Trends page as we now [default to Trends](https://github.com/PostHog/posthog/pull/656) when you login.

Moving the bar to the left allows users to easily engage with the Trends graphs as they filter by Actions and Events.

### [Trends Hints](https://github.com/PostHog/posthog/pull/632)

![](../images/04/Fullscreen_4_29_20__12_09_PM-e1588158606164.png)

Eric mentioned when we added the stickiness explanation in Trends it was one of the most transformative updates in that release as he had to check the docs to remind himself of what he was measuring.

After a customer interview Aaron and Tim realized this was true for trends in general so we added Trends hints.

### [Sort events table by timestamp](https://github.com/PostHog/posthog/pull/626)

![](../images/04/timestampreverse.gif)

This is another PR this week that we have the community to thank for, [solnsubuga](https://github.com/solnsubuga) felt that clicking the table header for the timestamp should sort the events in reverse order, and we agreed.

## Performance updates

* [Eric](https://github.com/eLRuLL) added a [strict flake8](https://github.com/PostHog/posthog/pull/660) setup as well as improvements, laying the ground work for code linting and likely more prs regarding darker.
* [Upgraded](https://github.com/PostHog/posthog/pull/663) Kea to 2.0.0-beta.5.
* We continue to implement AntD as above in [Setup](https://github.com/PostHog/posthog/pull/621).

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## Favorite issue

### [Copy to clipboard feature for scripts/docs #661](https://github.com/PostHog/posthog/issues/661)

Thank you [sac0](https://github.com/sac0) for opening this issue then after a quick discussion with Tim [closed it](https://github.com/PostHog/posthog/pull/662).

Great to see updates built on the work we have done so far that ensures PostHog is better to use for the entire community.

## PR of the week

[Flake8 setup and improvements](https://github.com/PostHog/posthog/pull/660)

What makes it the PR of the week is the discussion it started in our repo, it was awesome to see an active discussion on how to make it easier to contribute, potential usage of [black](https://github.com/psf/black) and [darker](https://github.com/akaihola/darker) for code formatting and a resolution that improves the PostHog project.

## Repo round up

* [Qrcp](https://github.com/claudiodangelis/qrcp) (Transfer files over wifi from your computer to your mobile device by scanning a QR code without leaving the terminal.)
* [Uptoc](https://github.com/saltbo/uptoc) (A cli tool for deploying files to the cloud storage.)
* [Gitland](https://github.com/programical/gitland) (A multiplayer game controlled using GitHub.)

## PostHog news

We were all pretty excited at PostHog when we hit 2k stars on GitHub, we know it’s a vanity metric but we are pleased that we have started to build the foundations of a strong community thank you all!

<ArrayCTA />
