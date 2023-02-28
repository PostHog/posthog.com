---
title: Next.js
icon: ../../../images/docs/integrate/frameworks/nextjs.svg
---

PostHog makes it easy to get data about traffic and usage of your [Next.js](https://nextjs.org/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide will walk you through an example integration of PostHog using Next.js and the [posthog-js library](/docs/integrate/client/js).

You can see a working example of this integration in our [Next.js demo app](https://github.com/PostHog/posthog-js/tree/master/playground/nextjs)

## Prerequisites

To follow this tutorial along, you need:

1. a PostHog account (either [Cloud](/docs/getting-started/cloud) or [self-hosted](/docs/self-host))
2. a running Next.js application

## Install posthog-js

import ReactInstall from "../../sdks/react/\_snippets/install.mdx"

<ReactInstall />

### Tracking custom events

Now that PostHog is setup and initialized PostHog, you can use it to capture events where you want to track user behavior. For example, if you want to track when a user clicks a button, you can do it like this:

```jsx
import Head from 'next/head'
import { usePostHog } from 'posthog-js/react'

export default function Home() {
    const posthog = usePostHog()

    return (
        <>
              <div className="buttons">
                    { /* Fire a custom event when the button is clicked */ }
                    <button onClick={() => posthog?.capture('Clicked button')}>Capture event</button>
                    { /* This button click event is autocaptured by default */ }
                    <button data-attr="autocapture-button">Autocapture buttons</button>
                    { /* This button click event is not autocaptured */ }
                    <button className="ph-no-capture">Ignore certain elements</button>
                </div>
        </>
    )
}
```

## Feature flags

Feature flags are a powerful way to test new features and roll them out to a subset of your users. You can use feature flags to enable/disable features, change the behavior of a feature, or even change the UI of a feature.

```jsx
import Head from 'next/head'
import { useFeatureFlagEnabled } from 'posthog-js/react'

export default function Home() {
    // showWelcomeMessage is true if the feature flag is enabled
    const showWelcomeMessage = useFeatureFlagEnabled('show-welcome-message') 

    return (
                <>
                {
                    showWelcomeMessage ? (
                        <div className="welcome-message">
                            <h2>Welcome!</h2>
                            <p>This is a feature flag.</p>
                        </div>
                    ) : <div>
                        <h2>Not welcome message</h2>
                        <p>Because the feature flag evaluated to false.</p>
                    </div>
                }
        </>
    )
}
```

## Further reading

- [Complete guide to event tracking](/tutorials/event-tracking-guide)
- [Tracking pageviews in single page apps (SPA)](/tutorials/spa)
- [How (and why) our marketing team uses PostHog](/blog/posthog-marketing)
