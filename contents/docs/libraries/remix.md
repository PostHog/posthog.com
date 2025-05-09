---
title: Remix
icon: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/remix.svg
---

PostHog makes it easy to get data about traffic and usage of your [Remix](https://remix.run/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your Remix app using the [JavaScript Web SDK](/docs/libraries/js).

## Installation

Install `posthog-js`:

```bash
npm install --save posthog-js
```

Start by setting `posthog-js` and `posthog-js/react` as external packages in your `vite.config.ts` file.

```ts
// vite.config.ts
// ... imports and rest of config

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ["posthog-js", "posthog-js/react"],
  },
});
```

Next, create a `provider.tsx` file in the `app` folder. In it, set up the PostHog provider to initialize after hydration with `capture_pageview` set to `'history_change'`. You'll need both your API key and instance address (you can find these in your [project settings](https://us.posthog.com/project/settings)).

```ts
// app/provider.tsx
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    posthog.init("<ph_project_api_key>", {
      api_host: "<ph_client_api_host>",
      capture_pageview: "history_change"
    });
    setHydrated(true);
  }, []);

  if (!hydrated) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
```

Finally, import the `PHProvider` component in your `app/root.tsx` file and use it to wrap your app.

```ts
// app/root.tsx
// ... imports
import { PHProvider } from "./provider";

// ... links, meta, etc.

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PHProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </PHProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
```

When you run your app now, PostHog will automatically capture events and pageviews. You can also use the other features of PostHog by importing and using the `usePostHog` hook in your components.

## Next steps

For any technical questions for how to integrate specific PostHog features into Remix (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js/features) and [React](/docs/libraries/react) docs.

Alternatively, the following tutorials can help you get started:

- [How to set up Remix analytics, feature flags, and more](/tutorials/remix-analytics)
- [How to set up A/B tests in Remix](/tutorials/remix-ab-tests)
- [How to set up surveys in Remix](/tutorials/remix-surveys)
