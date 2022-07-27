---
title: How to track users without using cookies
sidebar: Docs
showTitle: true
featuredImage: ../images/tutorials/banners/cookieless-tracking.png
featuredTutorial: false
date: 2022-06-28
author: ['joe-martin']
topics: ['tracking', ‘cookies', ‘gdpr']
---

Level: Medium 🦔🦔
Estimated reading time: 5 minutes ☕️

Normally, PostHog collects information about your users and stores it in a cookie in the users’ browser. This approach is fairly typical and enables you to track users across sessions, but there are some situations where cookie-less tracking is preferable. 

These include:

- If you have a lot of data stored in cookies, such as a (very) large number of [Feature Flags](/docs/user-guides/feature-flags), and run into [size limitation issues](https://www.thoughtco.com/cookie-size-limit-3466810).
- If you have concerns about user privacy or regulation such as [GDPR](/docs/integrate/gdpr) or [HIPPA](/docs/privacy/hipaa-compliance).
- If you have your own system for identifying users across multiple sessions, or if you don’t need to track user identities at all.

If you’re interested in trying cookie-less tracking, then this tutorial will explain how to do this by configuring posthog-js to use localStorage instead. If you’re interested in other options, such as storing data in page memory, please check [the posthog-js persistence docs](/docs/integrate/client/js#persistence).

## Step 1: Decide where to store the data

It can be helpful first to know what data is being stored and why. Specifically, PostHog will usually store the following information in the user’s browser via a cookie:

- User ID
- Session ID
- Device ID 
- Active [feature flags](/docs/user-guides/feature-flags)
- [Super properties](/docs/integrate/client/js#super-properties)
- Configuration options (e.g., whether [session recording](/docs/user-guides/recordings) is enabled)

As for _why_, this information is tracked only so that PostHog can work optimally and deliver a consistent experience to users.

If you don’t want to store data in a cookie, you have two other options for where data can be stored: localStorage, or page memory. 

- **localStorage:** This stores all information locally, with the user. The downside of this approach is that it cannot be used across subdomains — so if you have a project which requires this then we strongly recommend using cookies instead. 
- **Page memory:** This stores all events within the page’s short-term memory. This is great for avoiding cookies, but data only persists for the duration of the page view. Returning users will be viewed as _new_ users. 

## Step 2: Configure persistence

Once you’ve decided which option is best for you, it’s time to get started. Luckily, both options can be easily configured if you’re using the `persistence` parameter in [PostHog’s Javascript client](/docs/integrate/client/js).

If you’ve not set up the Javascript client yet, you’ll need to do that first. The quickest way to install the JS client is to include it using NPM, though [other options are available](/docs/integrate/client/js#installation). If you’re already using the Javascript client, you can skip this step. 

```
yarn add posthog-js
```

To finish installation, include it it in your files:

```
import posthog from 'posthog-js'
posthog.init('sTMFPsFhdP1Ssg', { api_host: 'https://app.posthog.com' })
```

With installation complete, it’s time to configure how you want data to persist. There are various configuration options you can use (a full list is available [here](https://github.com/PostHog/posthog-js/blob/96fa9339b9c553a1c69ec5db9d282f31a65a1c25/src/posthog-core.js#L933)), which are passed as an object to `posthog.init`.

Here’s how to do that if you want to to store data in localStorage:

```
posthog.init('sTMFPsFhdP1Ssg', {
    api_host: 'https://app.posthog.com',
    loaded: function (posthog) {
        posthog.identify('[user unique id]')
    },
    persistence: localStorage,
    // ... more options
})
```

And here’s how to do it if you want to store data in page memory:

```
posthog.init('sTMFPsFhdP1Ssg', {
    api_host: 'https://app.posthog.com',
    loaded: function (posthog) {
        posthog.identify('[user unique id]')
    },
    persistence: memory,
    // ... more options
})
```

## Step 3: Remove your cookies acceptance banner

Now that your PostHog deployment isn’t using cookies you can, optionally and if you’re not using cookies for any other services, completely remove your GDPR-required cookies acceptance banner. Good for you — they only annoy most users anyway. 

