---
title: How to set up cross-domain tracking in PostHog
date: 2024-11-19
author:
 - ian-vanagas
tags:
 - configuration
 - persons
 - product analytics
---

Using multiple website domains or subdomains is a common way to split up a product. For example, a company might have a marketing website, a web app, and documentation, each with their own subdomain. 

We recommend using the same PostHog project across your product to ensure accuracy and consistency, but this can require tracking across domains and even across websites. To help with this, PostHog has both automatic cross-domain tracking and manual options for setting up cross-website tracking, and this tutorial shows how to set them up.

## Cross subdomain tracking with automatic first-party cookies

If you are using the [JavaScript snippet](/docs/getting-started/install?tab=snippet) or [`posthog-js`](/docs/libraries/js#option-2-install-via-package-manager), PostHog automatically sets a first-party cookie that works between subdomains. For example, the same cookie would work for `posthog.com`, `us.posthog.com`, and `merch.posthog.com`. If you use initialize `posthog-js` or the snippet with either `localStorage+cookie` (the default) or just `cookie`, you don’t need to do more work to make this happen.

First-party cookies ensure you get the most data possible, as third-party cookies often get blocked or removed. Similarly, you can [set up a reverse proxy to send events from your domain](/docs/integrate/proxy) so they aren’t intercepted by tracking blockers.

## Cross website tracking by passing IDs across domains

Tracking users across different domains, like `posthog.com` and `hogflix.com`, requires some extra work. You need to pass users' `distinct_id` and `session_id` between PostHog initializations to ensure they are connected. This not only ensures tracking is accurate and consistent, but [session replays](/docs/session-replay/installation#how-to-record-sessions-across-different-domains) and [feature flag evaluations](/docs/feature-flags/bootstrapping) work across domains too.

If you are using anonymous events, call `posthog.identify()` or `posthog.createPersonProfile()` before leaving the first site, to make sure that initial person properties like `$initial_referrer` are set correctly. 

### Getting IDs on the first website 

To do this, first, we need to get the `distinct_id` and `session_id` from the first website. To do this, we can call `posthog.get_distinct_id()` and `posthog.get_session_id()` and pass them in the URL hash to the second domain.

A barebones example in React looks like this:

```js
import React from 'react'
import { Link } from 'react-router-dom'
import { usePostHog } from '@posthog/react'

function FirstSite() {
  const posthog = usePostHog()

  const sessionId = posthog.get_session_id()
  const distinctId = posthog.get_distinct_id()

  return (
    <div className="card">
      <h1>First Site</h1>
      <p>This is the first site.</p>
      <Link to={`domain2.com#session_id=${sessionId}&distinct_id=${distinctId}`}>Go to Second Site</Link>
    </div>
  )
}

export default FirstSite
```

### Bootstrapping the IDs on the second website

On the second website, we can check for the `session_id` and `distinct_id` in the URL hash and then bootstrap those values in our PostHog initialization.

In our barebones React example, our second website's `main.jsx` file would look like this:

```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import posthog from 'posthog-js'
import { PostHogProvider} from '@posthog/react'

// Parse hash parameters
const hashParams = new URLSearchParams(window.location.hash.substring(1))
const distinct_id = hashParams.get('distinct_id')
const session_id = hashParams.get('session_id')

posthog.init("<ph_project_token>", {
  api_host: "<ph_client_api_host>",
  bootstrap: {
    sessionID: session_id,
    distinctID: distinct_id
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </StrictMode>,
)
```

This ensures that the `distinct_id` and `session_id` are the same on both domains.

### Identifying and merging users on the second website

We recommend bootstrapping the IDs if you need to track users across websites or domains. If you can't bootstrap, for instance if you can't access the window object, you can use a combination of `identify` and `alias` to merge the users instead. This requires a stable distinct ID like a username, app user ID, or email and won't connect the session replays and feature flag evaluations between the two sites.

The setup on the first website is the same: a link with the `distinct_id` in the URL hash (we don't use the `session_id`). 

On the second website, we need to use the stable distinct ID to: 

1. `identify` the anonymous distinct ID from the second website
2. `alias` the distinct ID from the first website

In our barebones React example, this looks like this:

```js
import React, { useState } from 'react'
import { usePostHog } from '@posthog/react'

function SignUpPage() {
  const [username, setUsername] = useState('')
  const posthog = usePostHog()
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const old_distinct_id = hashParams.get('distinct_id')

  const handleSubmit = (e) => {
    e.preventDefault()
    posthog.identify(username)
    if (old_distinct_id) {
      posthog.alias(old_distinct_id, username)
    }
  }

  return (
    <div className="card">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUpPage
```

This connects the events from both sites to the same user. See our docs on [identifying users](/docs/product-analytics/identify) and using [alias](/docs/product-analytics/identify#alias-assigning-multiple-distinct-ids-to-the-same-user) for more details.

## Tracking journeys through a site you don't control

The methods above assume you run `posthog-js` on both sites. Many journeys send the user to a partner site you cannot instrument, such as a ticketing service, a checkout host, or a payment provider. The user leaves your site, acts on the partner site, and comes back. You cannot see the partner leg, but you can keep the same person and session across the round trip, and you can measure the leg as a gap between two of your own events.

### Put the IDs on the return URL

You send the user to the partner site, so you cannot bootstrap PostHog there. Instead, put the `distinct_id` and `session_id` on the return URL that you hand the partner. Most partners let you set a redirect or callback URL. Add the IDs to that URL, and read them again when the user comes back.

```js
import { usePostHog } from '@posthog/react'

function CheckoutButton() {
  const posthog = usePostHog()

  const startCheckout = () => {
    const sessionId = posthog.get_session_id()
    const distinctId = posthog.get_distinct_id()

    // The partner returns the user to this URL after checkout.
    const returnUrl = `https://yoursite.com/return#session_id=${sessionId}&distinct_id=${distinctId}`

    posthog.capture('checkout_started')
    window.location.href = `https://partner.com/pay?return_url=${encodeURIComponent(returnUrl)}`
  }

  return <button onClick={startCheckout}>Pay</button>
}

export default CheckoutButton
```

On your return page, read the IDs from the hash and bootstrap them, the same way you do on a second site you own. Turn off automatic pageview capture at the same time, so you can set the correct referrer on the return pageview yourself (see below):

```js
const hashParams = new URLSearchParams(window.location.hash.substring(1))
const distinct_id = hashParams.get('distinct_id')
const session_id = hashParams.get('session_id')

posthog.init("<ph_project_token>", {
  api_host: "<ph_client_api_host>",
  capture_pageview: false,
  bootstrap: {
    sessionID: session_id,
    distinctID: distinct_id
  }
})
```

### Measure the partner leg with an event pair

You cannot capture events on the partner site. To measure the leg, capture one event when the user leaves and one event when the user comes back. In the example above, the events are `checkout_started` and a `checkout_returned` event on the return page.

```js
posthog.capture('checkout_returned')
```

Build a [funnel](/docs/product-analytics/funnels) with `checkout_started` as the first step and `checkout_returned` as the second step. The drop-off between the two steps is the share of users who left for the partner and did not come back. The time between the two steps is how long the partner leg took.

### Fix the referrer and session reset

The return redirect arrives with the partner as the `$referrer`. This breaks attribution, because PostHog reads the partner as the source of the visit. The redirect can also start a new session, which splits one journey into two.

The bootstrap above fixes the session reset, because it keeps the same `session_id` across the round trip.

The referrer needs one more step. When `posthog.init()` runs on the return page, it captures a `$pageview` automatically, and that pageview reads the partner as the `$referrer`. Setting the referrer on `checkout_returned` alone does not fix this, because the automatic pageview carries the partner value too. This is why the return-page `init` above sets `capture_pageview: false`. Capture the pageview and the return event yourself, with the correct referrer on both:

```js
posthog.capture('$pageview', {
  $referrer: 'https://yoursite.com/checkout',
  $referring_domain: 'yoursite.com'
})

posthog.capture('checkout_returned', {
  $referrer: 'https://yoursite.com/checkout',
  $referring_domain: 'yoursite.com'
})
```

## Using third-party cookies (or their equivalent)

Another way is using third-party cookies (or an equivalent method) to get the data from one site to another. **This isn’t recommended**.

For example, you can add an iframe from one website and pull tracking data into another. To apply cookies when viewing an iframe on another website, your website needs to set cookies with the following header:

```
Set-Cookie: session=your_session; 
SameSite=None; Secure
```

This effectively makes it a third-party cookie, which many browsers, sites, and extensions block and remove. You can try to use it, but we recommend you use other methods.

## Further reading

- [How to use PostHog without cookie banners](/tutorials/cookieless-tracking)
- [Building a tracking cookies opt out banner in React](/tutorials/react-cookie-banner)
- [The complete guide to event tracking](/tutorials/event-tracking-guide)

<NewsletterForm />