---
title: How to set up cross domain tracking in PostHog
sidebar: Docs
showTitle: true
author: ['ian-vanagas']
date: 2022-11-08
featuredTutorial: false
featuredImage: ../images/tutorials/banners/tutorial-3.png
tags: ['configuration', 'persons', 'sessions', 'product analytics', 'product os']
---

Many companies use multiple domains for different parts of their products. A common structures include one domain for the marketing website and another (subdomain) for the app, multiple connected domains, and separate domains for documentation and community sections. This is great for having different content and ensuring no conflicts but causes issues when it comes to tracking.

The jump from one domain to another causes problems with the tracking. The first site identifies a user and tracks them, but the second site doesn’t always have access to that user and the related tracking information. To help solve this problem, there are some ways to set up cross domain tracking.

PostHog doesn’t automatically support cross domain tracking, but we do offer some options for implementing it yourself.

## Automatic first-party cookies

If you are using the JavaScript snippet or `posthog-js` to track a domain, PostHog automatically sets a first-party cookie that works between subdomains. For example, the same cookie works for `posthog.com` and `app.posthog.com`. If you use initiate `posthog-js` or the snippet in the client, you don’t need to do more work to make this happen.

First-party cookies ensure you get the most data possible, as third-party cookies often get blocked or removed. Similarly, you can [set up a reverse proxy to send events from your domain](/docs/integrate/proxy) so they aren’t intercepted by tracking blockers.

## Passing IDs in the URL

PostHog makes it easy to identify and alias users. You need a way to get both their old and new IDs in the same place. This is useful for cross domain tracking. 

One way to get both of these values is by passing their ID in the URL when they move between domains. For example, when a user goes to sign up or log in, you can include their identification in the link parameters. On another domain, you can check for link parameters and use them to connect the users tracking data on the new domain.

We can create a barebones example in React by getting the distinct ID on one domain and passing it in the URL hash to the second domain.

```js
import * as React from 'react';
import posthog from 'posthog-js';

function Domain1() {
  const link_with_id = `#id=${posthog.get_distinct_id()}`

  return (
    <>
      <h1>Hi from Domain 1</h1>
      <a 
        href={`https://example.com/${link_with_id}/`}
      >
        Go to Domain 2
      </a>
    </>
  );
}
```

On the second domain, we can check for the hash and use the distinct ID in the hash to identify the user.

```js
import posthog from 'posthog-js';

export function Domain2() {
  // If the hash is present, extract the id
  if (window.location.hash) {
    const id = window.location.hash.split('=')[1]
    // Send the id to PostHog
    posthog.identify(id)
  }
  return (
    <>
      <h1>Domain 2's Signup Page</h1>
      <p>Welcome to the Signup page for Domain 2</p>
    </>
  );
}
```

This connects the two users in PostHog, and you can customize the implementation for your needs. For example, you could pass IDs through requests and identify them on the backend (especially if you are server rendering the front end code). You can read more about [identifying users in our docs](/docs/integrate/identifying-users).

The downsides of this are that this requires sendig an ugly-looking string as a URL parameter every time you link to another domain (you could remove the hash once used). You also need to make sure the ID is valid or users might mess with your identification process by changing the hash.

## Using third-party cookies (or their equivalent)

Another way is using third-party cookies (or an equivalent method) to get the data from one domain to another. **This isn’t recommended**.

For example, you can add an iframe from one domain and pull tracking data into another. To apply cookies when viewing an iframe on another domain, your domain needs to set cookies with the following header:

```
Set-Cookie: session=your_session; 
SameSite=None; Secure
```

This effectively makes it a third-party cookie, which many browsers, sites, and extensions block and remove. You can try to use it, but we recommend you use other methods.

## Further reading

- [How to use PostHog without cookie banners](/tutorials/cookieless-tracking)
- [Building a tracking cookies opt out banner in React](/tutorials/react-cookie-banner)
- [How to build, analyze and optimize conversion funnels in PostHog](/tutorials/funnels)
