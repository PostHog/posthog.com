---
title: Route censor
github: 'https://github.com/PostHog/posthog-route-censor-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=route-censor'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/censor-app
  - route-censor
---

This app enables you to censor variables from URLs that are passed to PostHog. This is useful because PostHog tracks certain URLs automatically, so if your app contains sensitive data within the URLs (such as sensitive IDs, addresses, etc.), then this offers away to censor that data before it is stored in the PostHog database. 

## Requirements

This app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Configuration

First, install the app from the PostHog app library within your PostHog instance.

The list of properties censored by the app can be configured directly within PostHog.

Information and examples of the properties which can be configured are found in [the app readme](https://github.com/PostHog/posthog-route-censor-plugin). 

To provide routes, attach a JSON file, similar to the example at `./src/assets/exampleRoutes.json`, that matches the Routes type defined in `./src/types/index.ts`.

The routes JSON includes an array of all pathnames that you would like to censor. The routes should match the pattern defined by the first parameter of the React Router V6 matchRoutes function, with an extra attribute included. Includes should contain a list of variables from the path pattern that you wish to censor.

All properties in these lists should contain either a full URL (ex: "https://www.example.com/super-secret-id/1234") or a pathname (ex: "/super-secret-id/1234"). The default values should already include all properties with URLs that PostHog tracks by default, but more can be added to this list when configuring your plugin if needed.

Any properties previously defined for a user by $set_once cannot be overwritten by this plugin. It can only overwrite $set_once properties when they are initially set.

The routes JSON must be updated whenever a new route is added to your app.

## FAQ

### Where can I find out more?

More [information is available in the app repo](https://github.com/PostHog/posthog-route-censor-plugin). 

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
