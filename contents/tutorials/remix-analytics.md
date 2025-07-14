---
title: 'How to set up Remix analytics, feature flags, and more'
date: 2025-05-09
author:
  - ian-vanagas
tags:
  - product analytics
  - web analytics
  - feature flags
---

Remix is a full stack web framework built on [React](/docs/libraries/react) with a specific focus on following web standards. 

In this tutorial, we show you how to add PostHog to your Remix app (on both the client and server side), implement custom event capture, capture pageviews, and use feature flags.

## Creating a Remix app

First, make sure to [install a Node version](https://nodejs.org/en/download) greater than 20. After confirming, run the following command to create a basic app and choose the default options.

```bash
npx create-remix@latest remix-tutorial
```

Our app is going to be a basic blog with a few pages we can move between.

We start by creating a top-level `json` folder in our newly created `remix-tutorial` folder. Our list of blog posts lives in a `data.json` file in this folder. Each contains a slug, title, and content.

```json
{
  "posts": [
    {
      "slug": "my-first-post",
      "title": "My First Post",
      "content": "This is a test post, how exciting!"
    },
    {
      "slug": "posthog-is-cool",
      "title": "PostHog is cool",
      "content": "Go checkout PostHog for all your product tool needs!"
    }
  ]
}
```

Next, we rework the home page to show these posts. In `app/routes/_index.tsx`, we create a loader that gets the `data.json` file, reads it, and returns the posts. In the client component, we use a map to list and link to each of them.

```ts
// app/routes/_index.tsx
import { Link, useLoaderData } from "@remix-run/react";
import { promises as fs } from "fs";
import path from 'path';

type Post = {
  slug: string;
  title: string;
  content: string;
};

export const loader = async () => {
  const filePath = path.join(process.cwd(), 'json', 'data.json');

  const fileContents = await fs.readFile(filePath, 'utf8');
  const { posts } = JSON.parse(fileContents);

  return { posts };
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <ul className="space-y-4">
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link
              to={`/posts/${post.slug}`}
              className="text-blue-600 hover:text-blue-800 text-lg font-medium transition-colors"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Next, we add the pages for these blog posts. In the `app/routes` folder, create a `posts.$slug.tsx` file. In this folder, we use the same pattern to load the posts and add a filter to match the slug. In the component, we show the content for the post and a like button we will use later.

```ts
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { promises as fs } from "fs";
import path from 'path';

type Post = {
  slug: string;
  title: string;
  content: string;
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const filePath = path.join(process.cwd(), 'json', 'data.json');

  const fileContents = await fs.readFile(filePath, 'utf8');
  const posts: Post[] = JSON.parse(fileContents).posts;

  const post = posts.find(p => p.slug === params.slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return post;
};

export default function PostSlug() {
  const post = useLoaderData<Post>();

  const handleClick = () => {
    console.log('liked')
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <button 
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Like this post
      </button>
    </div>
  );
}
```

Finally, go into the project folder and run the dev server with the following command:

```bash
cd remix-tutorial
npm run dev
```

 Once done, your basic Remix blog is running locally.

![App](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_09_at_15_54_29_2x_9b14886006.png)

## Adding PostHog on the client side

Up next is adding PostHog, which you can install by running:

```bash
npm i posthog-js
```

Once done, you need your project API key and instance address from your PostHog [project settings](https://app.posthog.com/settings/project). You can [sign up for free](https://app.posthog.com/signup) if you haven’t already.

With these, create a `provider.tsx` file in the `app` folder. In it, set up the PostHog provider to initialize after hydration.

```tsx
// app/provider.tsx
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    posthog.init("<ph_project_api_key>", {
      api_host: "<ph_client_api_host>",
      defaults: "<ph_posthog_js_defaults>",
      debug: true,
    });

    setHydrated(true);
  }, []);

  if (!hydrated) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
```

Next, go to `root.tsx` and wrap your app in the `PHProvider`.

```ts
// app/root.tsx
// ... rest of imports
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

Finally, go to `vite.config.ts` and add `posthog-js` and `posthog-js/react` as external packages. This ensures you app builds correctly when you're ready to deploy.

```ts
// vite.config.ts
// ... imports and rest of config

export default defineConfig({
  plugins: [
    // ... plugins
  ],
  ssr: {
    noExternal: ["posthog-js", "posthog-js/react"],
  },
});
```

After relaunching your app, PostHog begins autocapturing pageviews, clicks, [session replays](/docs/session-replay) (if [you enable them](https://app.posthog.com/settings/project#replay)), and more.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_09_at_16_00_35_2x_2bd83b5dc8.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_09_at_16_00_56_2x_cf2ad1075c.png"
  alt="Autocapture"
  classes="rounded"
/>

## Capturing custom events

Although PostHog autocaptures clicks, we can set up custom events to capture more specific actions. For example, we can set up a `liked_post` event for the like button. 

To do this, go to `routes/posts.$slug.tsx`, import the `usePostHog` hook, and then set up a `posthog.capture()` call in place of the `console.log()`.

```ts
// app/routes/posts.$slug.tsx
// ... imports
import { usePostHog } from "posthog-js/react";

// ... type, loader

export default function PostSlug() {
  const post = useLoaderData<Post>();
  const posthog = usePostHog();
  const handleClick = () => {
    posthog.capture('liked_post', {
      post_id: post.slug,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <button 
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Like this post
      </button>
    </div>
  );
}
```

Now, every time a user clicks this button, it captures a `liked_post` event with a custom `post` property.

## Setting up feature flags

Next, we can add a [feature flag](/docs/feature-flags) to control a new version of the like button we want to try out. 

To this, start by going to the [feature flags tab](https://app.posthog.com/feature_flags) in PostHog and clicking **New feature flag**. Name it `new-button-text`, set the rollout to 100% of users, fill out any other details, and press **Save**.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_09_at_16_16_28_2x_fef9b82d61.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_09_at_16_16_14_2x_807359315f.png"
  alt="Flag creation"
  classes="rounded"
/>

In the `posts.$slug.tsx` file, set up a `useState` for the button content, and a `useEffect` for flag evaluation. We conditionally render the button text based on the flag response.

```ts
//... other imports
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { promises as fs } from "fs";
import path from 'path';
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

// ... type, loader

export default function PostSlug() {
  const post = useLoaderData<Post>();

  const [buttonText, setButtonText] = useState('Like this post');
  const posthog = usePostHog();
  const handleClick = () => {
    posthog.capture('liked_post', {
      post_id: post.slug,
    });
  };

  useEffect(() => {
    const flag = posthog.isFeatureEnabled('new-button-text');
    if (flag) {
      setButtonText('This is a very cool post')
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <button   
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
```

Our post page now shows the updated button, which you can toggle remotely with the flag in PostHog.

![Button text controlled by flag](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_09_at_16_19_19_2x_1e41d82f48.png)

## Adding PostHog on the server side

Remix is a full stack framework, parts of it run on both the client and server side. So far, we’ve only used PostHog on the client side and the [JavaScript Web library](/docs/libraries/js) we installed won’t work on the server side. Instead, we must use the [`posthog-node` SDK](/docs/libraries/node). We can start by installing it:

```bash
npm i posthog-node
```

Next, we create a `posthog.js` file in the `app` folder. In it, we set up an initialization of the `posthog-node` client. We also set up logic to return the existing client if it is already initialized. Again, you need your project API key and instance address from [your project settings](https://app.posthog.com/settings/project).

```js
// app/posthog.js
import { PostHog } from 'posthog-node';

let posthogClient = null;

export default function PostHogClient() {
  if (!posthogClient) {
    posthogClient = new PostHog('<ph_project_api_key>', {
      host: '<ph_client_api_host>',
    });
  }
  return posthogClient;
}
```

### Capturing an event with PostHog on the server side

To use this, we go back to `posts.$slug.tsx` and implement a server side event capture in the `loader` function. 

An important difference between the frontend and backend implementations is that the backend requires a `distinct_id` while the frontend automatically handles it. To get a backend `distinct_id`, we check for the `distinct_id` in the request’s cookies, and if it doesn’t exist, we create a new one. We then use this value to capture an event with the imported `PostHogClient()` as well as pass it in the posts JSON for future use on the client side.

```ts
// app/routes/posts.$slug.tsx
// ... imports
import PostHogClient from "../posthog"
import crypto from 'crypto';

type Post = {
  slug: string;
  title: string;
  content: string;
  distinctId: string; // new
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const filePath = path.join(process.cwd(), 'json', 'data.json');

  const fileContents = await fs.readFile(filePath, 'utf8');
  const posts: Post[] = JSON.parse(fileContents).posts;

  const post = posts.find(p => p.slug === params.slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }	

  const cookieString = request.headers.get('Cookie') || '';  
  const projectAPIKey = '<ph_project_api_key>';
  const cookieName = `ph_${projectAPIKey}_posthog`;
  const cookieMatch = cookieString.match(new RegExp(cookieName + '=([^;]+)'));
  let distinctId;

  if (!!cookieMatch) {
    const parsedValue = JSON.parse(decodeURIComponent(cookieMatch[1]));
    if (parsedValue && parsedValue.distinct_id) {
      distinctId = parsedValue.distinct_id;
    } else {
      distinctId = crypto.randomUUID();
    }
  } else {
    distinctId = crypto.randomUUID();
  }

  const phClient = PostHogClient();
  phClient.capture({
    distinctId: distinctId,
    event: 'server_side_event_name'
  });

  post['distinctId'] = distinctId;

  return json(post);
};
// ... rest of code
```

When you refresh the page now, you see a `server_side_event_name` event captured along with the others.

![Server side event](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/remix-analytics/server.png)

### Combining frontend and backend distinct IDs

Lastly, since PostHog automatically creates a `distinct_id` on the frontend, we must connect it to the backend `distinct_id` (if they are different). This ensures we are consistently tracking users and that they get a consistent experience. 

In the initial `useEffect` in our component, we check if the `distinct_id` values are different, and if so, use `posthog.identify` to combine them.

```ts
// app/routes/posts.$slug.tsx
// ... imports, type, loader

export default function PostSlug() {
  const post = useLoaderData<Post>();

  const [buttonText, setButtonText] = useState('Like this post');

  useEffect(() => {
    if (posthog.get_distinct_id() && posthog.get_distinct_id() !== post.distinctId) {
      posthog.identify(post.distinctId);
    }
    const flag = posthog.isFeatureEnabled('new-button-text');
    if (flag) {
      setButtonText('This is a very cool post')
    }
  }, []);
// ... rest of the component
```

## Using server side feature flags

Using PostHog on the server side enables us to evaluate flags before the page loads. This prevents the "flicker" of the flags loading and changing page elements.

To set this up, we use the server side `isFeatureEnabled()` method with the flag key and `distinctId` then add a new `buttonText` key and value to the post JSON like this:

```ts
// app/routes/posts.$slug.tsx
//... imports

type Post = {
  slug: string;
  title: string;
  content: string;
  distinctId: string;
  buttonText: string; // new
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	
	//... posts, cookies, distinctId	

  const phClient = PostHogClient();
  const flag = await phClient.isFeatureEnabled(
    'new-button-text',
    distinctId
  )

  post['buttonText'] = 'Like this post'
  if (flag) {
    post['buttonText'] = 'This is a very cool post'
  }
  
  post['distinctId'] = distinctId;

  return json(post);
};
//... rest of code
```

With the `buttonText` included in the post JSON, we can rework our component to remove the `buttonText` state and client side `isFeatureEnabled`. This simplifies our component, which now looks like this:

```ts
export default function PostSlug() {
  const post = useLoaderData<Post>();

  useEffect(() => {
    if (posthog.get_distinct_id() && posthog.get_distinct_id() !== post.distinctId) {
      posthog.identify(post.distinctId);
    }
  }, []);

  const handleClick = () => {
    posthog.capture("liked_post", { 'post': post.slug });
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.distinctId}</p>
      <button onClick={handleClick}>{post.buttonText}</button>
    </div>
  );
}
```

Now, when you reload your page, the button doesn’t flicker. This is especially useful when running A/B tests.

## Further reading

- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [How to set up A/B tests in Remix](/tutorials/remix-ab-tests)
- [How to set up surveys in Remix](/tutorials/remix-surveys)

<NewsletterForm />