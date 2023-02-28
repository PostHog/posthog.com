---
title: Next.js
icon: ../../../images/docs/integrate/frameworks/nextjs.svg
---

PostHog makes it easy to get data about traffic and usage of your [Next.js](https://nextjs.org/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide will walk you through an example integration of PostHog using Next.js and the [posthog-js library](/docs/integrate/client/js). 

## Prerequisites

To follow this tutorial along, you need:

1. a PostHog account (either [Cloud](/docs/getting-started/cloud) or [self-hosted](/docs/self-host))
2. a running Next.js application

## Install posthog-js

1. Install [posthog-js](https://github.com/posthog/posthog-js) using your package manager:

<MultiLanguage selector="tabs">

```shell file=Yarn
yarn add posthog-js
```

or

```shell file=NPM
npm install --save posthog-js
```

</MultiLanguage>

2. Add your environment variables to your `.env.local` file and to your NextJS environment variables. You can find your project API key in the PostHog app under Project Settings > API Keys.

```shell file=.env.local
NEXT_PUBLIC_POSTHOG_KEY=<ph_project_api_key>
NEXT_PUBLIC_POSTHOG_HOST=<ph_instance_address>
```

3. Integrate PostHog to your `pages/_app.js` file. This is the top-level component that will be common across all the different pages in your application.

```jsx
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// Check that PostHog is client-side
if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        // Disable in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
        }
    })
}

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()

    useEffect(() => {
        // Track page views
        const handleRouteChange = () => posthog.capture('$pageview')
        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])

    return (
        <PostHogProvider client={posthog}>
            <Component {...pageProps} />
        </PostHogProvider>
    )
}
```

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
