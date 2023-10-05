---
title: How to use PostHog without cookie banners
sidebar: Docs
showTitle: true
featuredImage: ../images//cookieless-tracking.png
featuredVideo: https://www.youtube-nocookie.com/embed/3V3fbz6sgPk
featuredTutorial: false
date: 2022-08-03
author: ['joe-martin']
tags: ['configuration', 'product os']
---

- **Level:** Medium 🦔🦔
- **Estimated reading time:** 5 minutes ☕️

Normally, PostHog collects information about your users and stores it in a cookie in the users’ browser. This approach is fairly typical and enables you to track users across sessions, but there are some situations where cookie-less tracking is preferable. 

These include:

- If you have concerns about user privacy or regulation such as [GDPR](/docs/integrate/gdpr) or [HIPPA](/docs/privacy/hipaa-compliance).
- If you have your own system for identifying users across multiple sessions, or if you don’t need to track user identities at all.

If you’re interested in trying cookie-less tracking, then this tutorial will explain how to do this by configuring posthog-js to use page memory instead.

<GDPRForm />

## Step 1: Decide where to store the data

It can be helpful first to know what data is being stored and why. Specifically, PostHog will usually store the following information in the user’s browser via a cookie:

- User ID
- Session ID
- Device ID 
- Active [feature flags](/docs/user-guides/feature-flags)
- [Super properties](/docs/integrate/client/js#super-properties)
- Configuration options (e.g., whether [session recording](/docs/user-guides/recordings) is enabled)

As for _why_, this information is tracked only so that PostHog can work optimally and deliver a consistent experience to users.

If you don’t want to store data in a cookie, you can store this data temporarily during the page view by setting `persistance` to `memory`. This stores all events within the page’s short-term memory. This is great for avoiding cookies, but data only persists for the duration of the page view. Returning users will be viewed as _new_ users. 

## Step 2: Configure persistence

If you’ve not set up the Javascript client yet, you’ll need to do that first. The quickest way to install the JS client is to include it using NPM, though [other options are available](/docs/integrate/client/js#installation). If you’re already using the Javascript client, you can skip this step. 

```
yarn add posthog-js
```

To finish installation, include it in your files:

```js
import posthog from 'posthog-js'
posthog.init('<ph_project_api_key>', { api_host: '<ph_instance_address>' })
```

With installation complete, it’s time to configure how you want data to persist. There are various configuration options you can use (a full list is available [here](https://github.com/PostHog/posthog-js/blob/96fa9339b9c553a1c69ec5db9d282f31a65a1c25/src/posthog-core.js#L933)), which are passed as an object to `posthog.init`.

Here’s how to do that if you want to store data in page memory:

```js
posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    persistence: 'memory',
    bootstrap: {
        distinctID: '[user unique id]', // (If you have it)
    },
    // ... more options
})
```

## Step 3: Remove your cookies acceptance banner

Now that your PostHog deployment isn’t using cookies you can, optionally and if you’re not using cookies for any other services, completely remove your GDPR-required cookies acceptance banner. Good for you — they only annoy most users anyway. 

## Limitations

Nothing comes for free and limiting what `posthog` can track between page loads does of course affect how the product works. Below are some of the likely consequences of cookie-less tracking:

* **Higher anonymous user count** - each pageload that is not ["bootstrapped"](/docs/libraries/js#bootstrapping-flags) with a known `distinctId` will count as a new user, and not a returning one
* **Session Recording count** - as we can't track a "session" (multiple pageloads over time), Session Recordings will only be as long as the in-memory session and will reset (i.e. start a new recording) whenever the browser reloads. In addition, multiple window tracking is not possible.
* **Cache optimizations** - we store some information in browser storage in order to load faster, for example using the last loaded values for Feature Flags. Without this optimization there will be an increased average delay between the page loading and things like Feature Flags being available to query. 


## Further reading

- [Building a tracking cookies opt out banner in React](/tutorials/react-cookie-banner)
