---
title: Remix
icon: ../../images/docs/integrate/frameworks/remix.svg
---

PostHog makes it easy to get data about traffic and usage of your [Remix](https://remix.run/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your Remix app using the [JavaScript Web SDK](/docs/libraries/js).

## Installation

Install `posthog-js` using your package manager:

```bash
yarn add posthog-js
# or
npm install --save posthog-js
```

Then, go to `app/entry.client.tsx` and initialize PostHog as a component. You'll need both your API key and instance address (you can find these in your [project settings](https://us.posthog.com/project/settings)).

```ts file=entry.client.tsx
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import posthog from "posthog-js";

function PosthogInit() {
  useEffect(() => {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_instance_address>',
    });
  }, []);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
        <RemixBrowser />
        <PosthogInit/>
    </StrictMode>
  );
});
```

## Next steps

For any technical questions for how to integrate specific PostHog features into Astro (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js).

Alternatively, the following tutorials can help you get started:

- [How to set up Remix analytics, feature flags, and more](/tutorials/remix-analytics)
- [How to set up A/B tests in Remix](/tutorials/remix-ab-tests)
- [How to set up surveys in Remix](/tutorials/remix-surveys)
