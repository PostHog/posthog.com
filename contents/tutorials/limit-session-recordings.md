---
title: How to only record the sessions you want
date: 2023-03-22
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-17.png
tags: ["session replay", "configuration"]
---

Session replays help you get a deep understanding of how users are using your product. We strongly recommend them for [early-stage startups](/blog/early-stage-analytics), but as you scale the number of recordings can go beyond what you need.

Instead of turning session replays off entirely, you can use PostHog’s configuration options to only record the sessions you want. This tutorial shows you three ways to do this. 

## Configuration and basic session replay controls

In order to follow this tutorial, you need to set `disable_session_recording` to `true` in PostHog's initialization. For example, in a Next.js app, this looks like this:

```js
// pages/_app.js
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    disable_session_recording: true,
  })
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
      </PostHogProvider>
    </>
  )
}
```

You can then use PostHog’s `startSessionRecording()` method to trigger a session replay at the right moment. As a basic example, we can use the initialization `loaded` method to start a session replay when the environment isn’t set to `development`.

```js
//...
if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    disable_session_recording: true,
    loaded: (posthog) => {
      if (process.env.NODE_ENV != 'development') posthog.startSessionRecording()
    }
  })
}
//...
```

## Control recordings with feature flags

Alternatively, you can use feature flags to control what sessions you record. This enables you to control the recording of sessions based on: 

- people properties
- group properties
- cohorts
- percentages of each of these (or all users)

For example, if you only want to record 50% of sessions for North American users, set up a feature flag where the continent code equals "NA" and roll it out to 50% of matching users like this:

![Flag](../images/tutorials/limit-session-recordings/flag.png)

You can then check this flag after you initialize PostHog, and start a recording if it is active for the current user. To ensure the correct user and flag details, you can use the `usePostHog` and `useFeatureFlagEnabled` hooks from `posthog-js/react` in a component like this:

```js
import { useFeatureFlagEnabled, usePostHog } from 'posthog-js/react'

export default function Home() {
  const posthog = usePostHog()
  
  if (useFeatureFlagEnabled('record-na')) {
    posthog.startSessionRecording()
  }

  return (
    <>
      <p>Record this page</p>
    </>
  )
}
```

### Evaluating the flag on load

If you want to evaluate flags as soon as PostHog loads, you can use the `loaded` method in the initialization options. Make sure to use the `onFeatureFlags` method to ensure flags are loaded before evaluating it.

```js
// pages/_app.js
if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    disable_session_recording: true,
    loaded: (posthog) => {
      posthog.onFeatureFlags((flags) => {
        if (posthog.isFeatureEnabled('record-na')) posthog.startSessionRecording()
      })
    }
  })
}
//...
```

> **Note:** When evaluating flags for a new user, person properties won't be available until ingestion. This means flags depending on person properties won't evaluate correctly if done in the `loaded` method. GeoIP properties (like continent code, country, and city name) will work because they don't depend on ingestion. To make flags with person properties work here, use bootstrapping.

## Record on specific pages

You can start recordings on specific pages by calling `startSessionRecording()` when those pages first load.

Using the router, you can check which page users are going to and set session replays to start once they route to the page you want.

```js
import { useEffect } from "react"
import { usePostHog } from "posthog-js/react"

export default function About() {
  const posthog = usePostHog()

  useEffect(() => {
    posthog.startSessionRecording()
  }, []);

  return (
    <>
      <p>Record this page</p>
    </>
  )
}
```

> **Note:** you could use the router, but `next/router` (and others) don’t trigger on the initial page load. The recording would trigger when a user goes to the page through the router, but not if they go to the page directly.

## Record after specific user behavior

Finally, you can have recordings start on any user action, such as button clicks, inputs, hovers, and even scrolling. This is as simple as calling `startSessionRecording()` when a user completes those actions.

```js
import { usePostHog } from 'posthog-js/react'

export default function Home() {
  const posthog = usePostHog()

  return (
    <>
      <p>Record this page</p>
      <button onClick={() => posthog.startSessionRecording()}>
        Start recording
      </button>
    </>
  )
```

This is useful if you want to record specific parts or paths on a page such as:

- signup, checkout funnels
- new or updated features
- smaller, specific components within a larger component.

## Further reading

- [How to capture fewer unwanted events](/tutorials/fewer-unwanted-events)
- [How to use session replays to get a deeper understanding of user behavior](/tutorials/explore-insights-session-recordings)
- [How to use session replays to improve your support experience](/tutorials/session-recordings-for-support)