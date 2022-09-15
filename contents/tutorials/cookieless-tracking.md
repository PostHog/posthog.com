---
title: How to use PostHog without cookie banners
sidebar: Docs
showTitle: true
featuredImage: ../images/tutorials/banners/cookieless-tracking.png
featuredTutorial: false
date: 2022-08-03
author: ['joe-martin']
topics: ['configuration']
---

- **Level:** Medium 🦔🦔
- **Estimated reading time:** 5 minutes ☕️

Normally, PostHog collects information about your users and stores it in a cookie in the users’ browser. This approach is fairly typical and enables you to track users across sessions, but there are some situations where cookie-less tracking is preferable. 

These include:

- If you have concerns about user privacy or regulation such as [GDPR](/docs/integrate/gdpr) or [HIPPA](/docs/privacy/hipaa-compliance).
- If you have your own system for identifying users across multiple sessions, or if you don’t need to track user identities at all.

If you’re interested in trying cookie-less tracking, then this tutorial will explain how to do this by configuring posthog-js to use pgae memory instead.

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

```
import posthog from 'posthog-js'
posthog.init('<ph_project_api_key>', { api_host: '<ph_instance_address>' })
```

With installation complete, it’s time to configure how you want data to persist. There are various configuration options you can use (a full list is available [here](https://github.com/PostHog/posthog-js/blob/96fa9339b9c553a1c69ec5db9d282f31a65a1c25/src/posthog-core.js#L933)), which are passed as an object to `posthog.init`.

Here’s how to do that if you want to store data in page memory:

```
posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    loaded: function (posthog) {
        posthog.identify('[user unique id]')
    },
    persistence: 'memory',
    // ... more options
})
```

## Step 3: Remove your cookies acceptance banner

Now that your PostHog deployment isn’t using cookies you can, optionally and if you’re not using cookies for any other services, completely remove your GDPR-required cookies acceptance banner. Good for you — they only annoy most users anyway. 

<NewsletterTutorial compact/>

