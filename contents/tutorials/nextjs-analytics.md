---
title: 'How to set up Next.js analytics, feature flags, and more'
date: 2025-08-13
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - configuration
  - feature flags
  - persons
  - events
---

Next.js is one of the web's most popular frameworks. Built on React, it provides optimizations and abstractions to help developers build fast and performant apps and sites. 

To make sure you get the most out of Next.js, you can use PostHog to track events, identify users, use feature flags, and more. To help you get started, this tutorial walks you through:

1. Building a basic Next.js (pages router) blog with user authentication
2. Adding PostHog to it
3. Setting up the features of PostHog like custom event capture, user identification, and feature flags


import { CalloutBox } from 'components/Docs/CalloutBox'

<CalloutBox type="info" title="Looking for the app router?">

  If you use Next.js with the **app router**, check out our other [Next.js app router analytics tutorial](/tutorials/nextjs-app-directory-analytics).
    
</CalloutBox>

## Creating our Next.js app

First, [install Node](https://nodejs.dev/en/learn/how-to-install-nodejs/) (18.18 or newer) and then run:

```bash
npx create-next-app@latest pages-tutorial
```

Press **y** to install `create-next-app` if needed, name your app (I chose `pages-tutorial`), select **No** for using TypeScript using the arrow keys, select **No** for using the app router, and then press enter to select the defaults for the rest.

Once installed and created, go into the new folder with the app name you chose (mine is `pages-tutorial`) and start the server:

```bash
cd pages-tutorial
npm run dev
```

At your [localhost](http://localhost:3000/), you should see a basic webpage like this:

![Next](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_09_30_48_2x_703d826b50.png)

## Adding blog functionality to our Next.js app

The structure of our blog will be:

- An index home page showing all the blog posts.
- Detail pages for each of the posts

We'll set up the blog posts as a static JSON file that we can fetch. To do this, create a `blog.json` file in the main app (`pages-tutorial`) folder and add the details of your blog. We need an `id`, `title`, `content`, and `author`. You can customize or add details to this if you want.

```json
{
  "posts": [
    {
      "id": 1,
      "title": "Hello World",
      "content": "This is my first post",
      "author": "Ian Vanagas"
    },
    {
      "id": 2,
      "title": "PostHog is awesome",
      "content": "PostHog is so cool",
      "author": "Ian Vanagas"
    }
  ]
}
```

Next, the main app (`pages-tutorial`) folder, remove all the existing code in the `pages/index.js` file. Replace it with a component that uses the `getStaticProps()` method Next.js provides to get the posts from the `blog.json` file, then use `map()` to loop through and link to them. This looks like this:

```js
// pages/index.js
import Head from 'next/head'
import Link from 'next/link'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>My blog</title>
      </Head>
      <main>
        <h1>Welcome to my blog</h1>
        <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <p>{post.title}</p>
            </Link>
          </li>
        ))}
        </ul>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const { posts } = await import('../blog.json')
  return {
    props: {
      posts,
    },
  }
}
```

This gives us a basic page with a list of links to the posts:

![Index](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_13_at_09_46_13_2x_ecb79e08ad.png)

Each of these posts also needs their own page. We can use dynamic routes to do this.

To set them up, go to the `pages` directory and create a `posts` directory. In the `posts` directory, create a file named `[id].js`. This file is similar to our `index.js` file, but will:

1. Handle the paths by calling the `getStaticPaths()` method.
2. Pass the ID as a string to `getStaticProps()` to get the right blog for the route.
3. Pass the post data to the component and render the data in HTML.

This looks like this:

```js
// pages/posts/[id].js
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <p>{post.content}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const { posts } = await import('../../blog.json')

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { posts } = await import('../../blog.json')
  const post = posts.find((post) => post.id.toString() === params.id)
  return {
    props: {
      post,
    },
  }
}
```

Going back to our app, clicking on the links now brings us to a page that looks like this:

![Post](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_13_at_09_55_36_2x_3f16c95db7.png)

We now have our basic blog all set up.

## Adding authentication

Next, we want to add user authentication with a basic login and logout. This provides us information on users so we can identify and connect events to them with PostHog later. 

[NextAuth](https://next-auth.js.org/) makes it easy to set up authentication with a provider like GitHub. To do so, first, install `next-auth`:

```bash
npm i next-auth
```

Next, create an API route for `next-auth` to use. To do this, in our `pages/api` folder, create a folder named `auth`, then a file named `[...nextauth].js` inside it. Inside the file, set up the GitHub provider like this:

```js
// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
	secret: process.env.NEXTAUTH_SECRET
})
```

Next, get these details from GitHub by going to [developer settings](https://github.com/settings/developers). Click **New OAuth App**, add a name, set the homepage URL to `http://localhost:3000`, the authorization callback URL to `http://localhost:3000/api/auth/callback/github`, and then click **Register application**.

Create a new OAuth app and get the client ID and client secret.

![GitHub](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_10_08_00_2x_d38cb2039c.png)

Copy the client ID and generate and copy a new client secret. With these, create a `.env.local` file in the main app (`pages-tutorial`) folder and set them as `GITHUB_ID` and `GITHUB_SECRET`. You'll also need to add a `NEXTAUTH_URL` ([`http://localhost:3000`](http://localhost:3000/) for now) and `NEXTAUTH_SECRET` (which you can generate on [this site](https://generate-secret.vercel.app/32) or by creating a random 32-character string) value.

```bash
GITHUB_ID=<github_client_id>
GITHUB_SECRET=<github_client_secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random_32_character_string>
```

### Setting up sessions

With NextAuth and GitHub set up, we have the infrastructure to authenticate users. Now, we can implement user sessions to let them log in and out as well as get their details. 

The first step to doing this is adding a `SessionProvider` from `next-auth/react` to `_app.js` like this:

```js
// pages/_app.js
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

Next, add the session details, and the ability to sign in and out to our `index.js` page. We can do this with the NextAuth `useSession()` hook as well as its methods for signing in and out.

We set up a check to see if there is a session and show details about the user and a button to sign out. If there isn’t a session, we show a button to sign in. Together, it looks like this:

```js
// pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({ posts }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>My blog</title>
      </Head>
      <main>
        <h1>Welcome to my blog</h1>
        {!session ? (
          <button onClick={() => signIn()}>Sign in</button>
        ) : (
          <div>
            <p>Welcome {session.user.name}!</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )}
//... posts map and getStaticProps
```

When you click sign in, you go through the sign in flow with GitHub, and get redirected back to the app with an active session.

![Signed in](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_13_at_10_18_27_2x_67dab4aa67.png)

Once this is working, we have all the functionality we want in our Next.js app and it’s time to add PostHog.

## Adding PostHog

At this point, you need a PostHog instance (it's [free to sign up](https://app.posthog.com/signup)). Once created, get your project API key and instance address from [your project settings](https://us.posthog.com/settings/project) and add it to your `.env.local` file.

```shell file=.env.local
NEXT_PUBLIC_POSTHOG_KEY=<ph_project_api_key>
NEXT_PUBLIC_POSTHOG_HOST=<ph_client_api_host>
```

Next, install [`posthog-js`](https://github.com/posthog/posthog-js):

```shell
npm install --save posthog-js
```

Afterwards, create an `instrumentation-client.js` file in the base `pages-tutorial` directory. This is where you initialize PostHog like this:

```js
// instrumentation-client.js
import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24'
});
```

<details>
<summary>Using Next.js 15.2 or older?</summary>

  Older versions of Next.js don't support `instrumentation-client` so you'll need to set up a `PostHogProvider` manually. See our [Next.js docs](/docs/libraries/next-js?tab=Pages+router) for details on how to do this.

</details>

Once saved, restart your app and click around, you should see pageviews and events start to populate in your PostHog instance.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_10_45_16_2x_02219846fd.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_10_44_57_2x_906cd11232.png"
  alt="Events in PostHog"
  classes="rounded"
/>

PostHog autocaptures clicks, inputs, session recordings (if enabled), pageviews, exceptions, and more. You can also use all the features of [`posthog-js`](/docs/integrate/client/js) which we will set up during the rest of this tutorial.

## Capturing custom events

You can use PostHog's `capture()` method to capture custom events in your other components. For example, in `posts/[id].js` we can add a like button that includes the article details as properties. 

To do this, create a button and connect it to a function that captures a `post_liked` event with the post title and author like this:

```js
// pages/posts/[id].js
import { usePostHog } from 'posthog-js/react'

export default function Post({ post }) {
  const posthog = usePostHog()
  
  function likePost() {
    posthog.capture(
      'post_liked',
      {
        post: post.title,
        author: post.author,
      })
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <p>{post.content}</p>
      <button onClick={likePost}>Like</button>
    </div>
  )
}
//...
```

Go to a post, click **Like**, and then check your PostHog instance to see the custom event show up.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_10_50_18_2x_133f683a95.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_10_50_29_2x_4a26182b1f.png"
  alt="Post liked in PostHog"
  classes="rounded"
/>

## Identifying users

Even though you are logged in, you are still treated as an anonymous user by PostHog. This is because we haven’t set up user identification yet. 

To connect anonymous user IDs with logged in user IDs, use an `identify` call with the email from their session. To do this, we must do a few things:

1. Add a param to the `signIn` method to redirect back to a URL with a param telling us the user just signed in.
2. Check for that param using the router.
3. Identify using `posthog.identify` with `session.user.email`
4. Clear the params from the URL

Once we implement these changes, our `index.js` file now looks like this:

```js
// pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import { usePostHog } from 'posthog-js/react'

export default function Home({ posts }) {
  const { data: session } = useSession();
  const posthog = usePostHog()
  const router = useRouter()

  const newLoginState = router.query.loginState
  if (newLoginState == 'signedIn' && session) {
    posthog.identify(session.user.email);
    router.replace('/', undefined, { shallow: true });
  }

  return (
    <>
      <Head>
        <title>My blog</title>
      </Head>
      <main>
        <h1>Welcome to my blog</h1>
        {!session ? (
          <button onClick={() => signIn('github', { callbackUrl: '/?loginState=signedIn' })}>Sign in</button>
        ) : (
          <div>
            <p>Welcome {session.user.name}!</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )}
//...
```

Now, when you sign in, this triggers an `identify` event in PostHog and events from the anonymous user connect with the identified person.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_11_13_12_2x_c2197f4d0b.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_11_12_55_2x_d4debfa27e.png"
  alt="Identify in PostHog"
  classes="rounded"
/>

### Resetting identification

Because of how identification works, logging out in the app does not automatically disconnect the person events are connected to. Events sent after you log out are still connected to your identified user, even if you log in as a new one. To reset identification, we must call `reset()` when a user logs out.

To set this up, we do something similar to what we did with user identification. We redirect to a URL with a `signedOut` param and then call reset if that param exists. This looks like this:

```js
// pages/index.js
//... imports, hooks, etc.

const newLoginState = router.query.loginState
if (newLoginState) {
  if (newLoginState === 'signedIn' && session) {
    posthog.identify(session.user.email);
  }
  if (newLoginState === 'signedOut') {
    posthog.reset();
  }
  router.replace('/', undefined, { shallow: true });
}

return (
  <>
    <Head>
      <title>My blog</title>
    </Head>
    <main>
      <h1>Welcome to my blog</h1>
      {!session ? (
        <button onClick={() => signIn('github', { callbackUrl: '/?loginState=signedIn' })}>Sign in</button>
      ) : (
        <div>
          <p>Welcome {session.user.name}!</p>
          <button onClick={() => signOut({ callbackUrl: '/?loginState=signedOut' })}>Sign out</button>
        </div>
      )}
//...
```

When you log out now, PostHog connects events to a new anonymous person. This person is disconnected from your old anonymous and identified person.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_11_20_17_2x_91e619d2d1.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_11_20_32_2x_6f1d2e68b4.png"
  alt="Resetting"
  classes="rounded"
/>

<CalloutBox type="warning" title="Only reset on logout">

  Be careful to only reset when a user logs out, **not** on every request. If you reset on every request, you create an excess of new anonymous users and new session recordings.
    
</CalloutBox>

## Setting up and using feature flags

The final feature of PostHog we are going to set up is feature flags. 

There are multiple ways to implement feature flags in Next.js. We’re going to cover the two most important ways here: **client-side rendering** and **server-side rendering**. For both, we use them to show a call to action on our blog pages.

To start, create a feature flag in your PostHog instance. Go to the [Feature flags tab](https://us.posthog.com/feature_flags), click the **New feature flag**, enter `blog-cta` as the key, set **Release conditions** to 100% of users, and press save.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_11_28_03_2x_22a3d37647.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_13_at_11_27_46_2x_585e2b1b29.png"
  alt="Feature flag in PostHog"
  classes="rounded"
/>

This gives us a basic flag to add to our app.

### Client-side rendering feature flags

We can use PostHog's `isFeatureEnabled()` method to check the flag and show the CTA, but we need to do this in a `useEffect()` to avoid hydration errors. This looks like this
```js
// pages/posts/[id].js
import { usePostHog } from 'posthog-js/react'
import { useState, useEffect } from 'react'

export default function Post({ post }) {

  const posthog = usePostHog()
  const [ctaState, setCtaState] = useState(false)

  useEffect(() => {
    setCtaState(posthog.isFeatureEnabled('blog-cta'))
  }, [])

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <p>{post.content}</p>
      {ctaState && 
        <p><a href="http://posthog.com/">Go to PostHog</a></p>
      }
    </div>
  )
}
//...
```

When the `blog-cta` flag is enabled, you should see a call to action on your blog page.

![CTA](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_08_13_at_11_47_59_2x_5c43454ece.png) 

<CalloutBox type="info" title="What about using PostHog's React hooks?">

  PostHog provides [React hooks](/docs/libraries/react#method-1-using-hooks) like `useFeatureFlagEnabled` and `useFeatureFlagPayload`, but we can't use them because they return false or undefined on the server but may return true immediately on the client. This causes a mismatch and hydration errors.

  If you want to use them, you can either set up a mounted state check or wrap the component in a dynamic component.
    
</CalloutBox>

### Server-side rendering feature flags

When you reload the page, you might see that the CTA takes time to load. This flickering is because it takes time:

1. For PostHog to load and initialize
2. To request and evaluate the feature flags 
3. For the React client to update

The code we wrote in the client-side rendering section did all of this after the page initially loads, but there is a way to remove this and have the CTA display immediately on page load.

This is done by moving the flag evaluation to the server-side. And because flag evaluation happens on the server-side, we need to install the `posthog-node` library:

```bash
npm i posthog-node
```

We then replace `getStaticProps` in `[id].js` with `getServerSideProps`. This enables us to both get the post details and evaluate feature flags on the server-side. In it, we use `posthog-node` to create a client that we use to `getAllFlags` using the `session.user.email` for the user. This means the user needs to be signed in for this to work.

Once we have the flag and post data, we pass it all to the component so it is ready before the client loads like this:

```js
// pages/posts/[id].js
import { getServerSession } from "next-auth/next"
import { PostHog } from 'posthog-node'

export default function Post({ post, flags }) {

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <p>{post.content}</p>
      {flags && flags['blog-cta'] && 
        <p><a href="http://posthog.com/">Go to PostHog</a></p>
      }
    </div>
  )
}

export async function getServerSideProps(ctx) {

  const session = await getServerSession(ctx.req, ctx.res)
  let flags = null

  if (session) {
    const client = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY,
      { host: process.env.NEXT_PUBLIC_POSTHOG_HOST }
    )
    flags = await client.getAllFlags(session.user.email);
  }
  
  const { posts } = await import('../../blog.json')
  const post = posts.find((post) => post.id.toString() === ctx.params.id)
  return {
    props: {
      post,
      flags
    },
  }
}
```

Now, once you reload your post page (while signed in), the CTA loads right away. If you wanted to, you could  also set up anonymous distinct ID creation to evaluate flags for users who aren't signed in like we do in the [flag bootstrapping tutorial](/tutorials/nextjs-bootstrap-flags#getting-feature-flags-with-nextjs-middleware).

Once done, you've successfully set up a basic Next.js app with user authentication and many of the features of PostHog set up. You’re ready to customize your app or add more of PostHog’s features like [error monitoring](/tutorials/nextjs-error-monitoring), [surveys](/tutorials/nextjs-surveys), or [experiments](/tutorials/nextjs-ab-tests).

## Further reading

- [How to set up Next.js app router analytics, feature flags, and more](/tutorials/nextjs-app-directory-analytics)
- [How to use Next.js middleware to bootstrap feature flags](/tutorials/nextjs-bootstrap-flags)
- [An introductory guide to identifying users in PostHog](/tutorials/identifying-users-guide)

<NewsletterForm />