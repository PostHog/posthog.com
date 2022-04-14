---
title: How the GitLab Release Tracker PostHog app works
showTitle: true
topics:
    - gitlab-release-tracker
---

## What does the GitHub Release Tracker app do?

The GitHub Release Tracker adds an [Annotation](/docs/user-guides/annotations) to PostHog whenever a specified repo launches a new GitHub release. This is useful for correlating the impact of new releases on other metrics, such as sign-ups, as well as other performance-related issues. 

## How do I install the GitHub Release Tracker for PostHog?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'GitLab Release Tracker' 
4. Select the app, press 'Install' and follow the on-screen instructions

## What are the requirements for this app?

The GitHub Release Tracker requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the GitLab Release Tracker](https://github.com/PostHog/currency-normalization-plugin) is available on GitHub. 

## Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri), [Tim Glaser](https://github.com/timgl), [Michael Matloka](https://github.com/Twixes) and [Marius Andra](https://github.com/mariusandra) for creating the GitLab Release Tracker. 

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.