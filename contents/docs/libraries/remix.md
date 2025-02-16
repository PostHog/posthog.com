---
title: Remix
icon: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/remix.svg
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

First, you'll need to pass both your project API key and instance address from your [project settings](https://us.posthog.com/project/settings) to your client through Remix. We recommend placing the project API key on `window.ENV` like Remix recommends in [this guide](https://remix.run/docs/en/main/guides/envvars#browser-environment-variables).


```ts file=app/root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

//... other imports, links, etc.

export const loader = () => {
  return json({
    ENV: {
      POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
    },
  });
};

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
```

Next, create a new PostHog context in `app/contexts/posthog-context.tsx`. This is necessary because of a [missing export statement](https://github.com/PostHog/posthog-js/issues/908) in `posthog-js`'s `package.json`. 

```ts file=app/contexts/posthog-context.tsx
import posthog from "posthog-js";
import React, { createContext, useContext, useRef } from "react";

type PosthogType = typeof posthog | undefined;

const PosthogContext = createContext<PosthogType>(undefined);

interface PosthogProviderProps {
  children: React.ReactNode;
}

export function PosthogProvider({ children }: PosthogProviderProps) {
  const posthogInstanceRef = useRef<PosthogType>(undefined);

  // https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
  // Note that in StrictMode, this will run twice.
  function getPosthogInstance() {
    if (posthogInstanceRef.current) return posthogInstanceRef.current;
    if (!window.ENV.POSTHOG_API_KEY) return undefined;

    posthogInstanceRef.current = posthog.init(window.ENV.POSTHOG_API_KEY, {
      api_host: '<ph_client_api_host>',
      person_profiles: 'identified_only',
    });
    return posthogInstanceRef.current;
  }

  return (
    <PosthogContext.Provider value={getPosthogInstance()}>
      {children}
    </PosthogContext.Provider>
  );
}

export const usePosthog = () => useContext(PosthogContext);
```

Lastly, we need to add this context to your React tree. Go to `app/entry.client.tsx` and add the following: 

```ts file=app/entry.client.tsx
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { PosthogProvider } from "./contexts/posthog-context";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <PosthogProvider>
        <RemixBrowser />
      </PosthogProvider>
    </StrictMode>,
  );
});
```

### Identifying Users 

To [identify users](/docs/product-analytics/identify) call `posthog?.identify()` when you have a distinct ID. 

```ts
import { usePosthog } from "./contexts/posthog-context";

function SomeAuthedComponent() {
  const posthog = usePosthog();
  useEffect(() => {
    posthog?.identify(user.distinctId);
  }, [posthog, user.distinctId]);
 
  // ...
}
```

### Setting up Pageviews

Because Remix is a single-page app that uses client-side routing, we need to track pageviews whenever the page location changes. In `app/root.tsx`: 

```ts file=app/root.tsx

export default function App() {
  const location = useLocation();
  const posthog = usePosthog();

  useEffect(() => {
    posthog?.capture('$pageview');
  }, [posthog, location]);

  return (
    <html lang="en">
//... rest of code
```

## Next steps

For any technical questions for how to integrate specific PostHog features into Remix (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js).

Alternatively, the following tutorials can help you get started:

- [How to set up Remix analytics, feature flags, and more](/tutorials/remix-analytics)
- [How to set up A/B tests in Remix](/tutorials/remix-ab-tests)
- [How to set up surveys in Remix](/tutorials/remix-surveys)
