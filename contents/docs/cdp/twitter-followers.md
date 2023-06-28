---
title: Twitter Followers Tracker
github: https://github.com/PostHog/twitter-followers-plugin
installUrl: https://app.posthog.com/project/apps?name=Twitter+Followers
thumbnail: ../../cdp/thumbnails/twitter-followers.png
tags:
    - twitter-followers
---

The Twitter Followers Tracker requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need a Twitter account and, ideally, some followers.

## Installation

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Twitter'
4. Select the app, press 'Install' and follow the on-screen instructions

## How do I view my follower count in PostHog?

To view your follower count as a PostHog Insight, do the following:

1. In 'Trends', select the event `twitter_followers`
2. Where it says 'Total Volume' next to the event name, change this to 'Maximum'
3. A new dropdown will appear, titled 'Select property'. Select `follower_count`
4. Visualize your follower count over time!

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Twitter Followers Tracker](https://github.com/PostHog/twitter-followers-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra) for creating the Twitter Followers Tracker. Thank you, both!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

Or, if you see the feedback widget enabled, use that!

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 

