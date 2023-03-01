---
title: How to set up Next.js A/B tests
date: 2023-02-28
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-2.png
topics: ['experimentation', 'feature flags', 'actions']
---

Many of the features of Next.js optimize for creating the best possible user experience. It automates and abstracts functionality like static page generation, image loading optimization, and optional server-side rendering, allowing you to focus on the content of your app.

A/B tests are a way to make sure this content is as good as possible. A/B tests are comparing two or more variations of content on an audience against a goal. The winner is the one who achieves the goal the best and then used to improve everyone's experience.

PostHog’s experimentation tool makes this entire process simple. This tutorial shows you how to build a basic Next.js app, add PostHog to it, and finally set up and run an A/B test experiment.

> Already have a Next.js app? [Skip to adding PostHog](#adding-posthog).

## Creating a Next.js app

We will create a basic Next.js app with a simple button to run our test on. Check out [our full Next.js tutorial](/tutorials/nextjs-analytics) if you’re looking for more details on building a multi-page app with authentication, user identification, event capture, and more.

First, make sure [Node is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (14.6.0 or newer), then create a Next.js app:

```bash
npx create-next-app@latest
```

Name it whatever you like (we call ours `next-ab`), select `No` for TypeScript, then press Enter to pick the defaults for the rest of the options.

Once created, go into the `next-ab` folder it creates, then go to `pages/index.js` and replace the code with just a heading and a button (which our A/B test runs on). 

```js
// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js A/B tests</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Next.js A/B tests</h1>
        <button id="main-cta">Click me</button>
      </main>
    </>
  )
}
```

After doing this, delete the default CSS in the `styles` folder and run `npm run dev` to get an extremely basic Next.js app we can run our A/B tests on. 

![Basic app](../images/tutorials/nextjs-ab-tests/button.png)

## Adding PostHog

Now, we can add PostHog (if you don't have a PostHog instance, you can [sign up for free here](https://app.posthog.com/signup)). To do this, get the code from your [JavaScript snippet](/docs/integrate?tab=snippet) (minus the script tags) and add it `_app.js` using the Next.js `Script` tag.

```js
// pages/_app.js
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init(<ph_project_api_key>,{api_host:'<ph_instance_address>'})
          `
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
```

Once you’ve done this, reload your app and click the button a few times. You should see captured in PostHog.

![Events](../images/tutorials/nextjs-ab-tests/events.png)

## Creating an action for our experiment goal

The first part of setting up our experiment in PostHog is setting up the goal. In this case, it is clicks of the main call to action button which has varying content.

To measure this, we can set up an [action](/manual/actions). We can use the PostHog toolbar to create this. To enable and launch the toolbar, go to the "Launch Toolbar" tab in PostHog, add `http://localhost:3000/` as an authorized URL, then click launch. This brings you to your app with a PostHog icon hovering on your screen.

To create an action with the toolbar, click:

1. the PostHog icon
2. "Inspect" 
3. the "Click Me" button, 
4. "Create New Action" in the modal. 

Name the action "Clicked Main CTA" and unselect the text match (because it changes), then scroll to the bottom of the modal to create an action.

![Action](../images/tutorials/nextjs-ab-tests/action.gif)

## Creating an experiment

With our Next.js app, PostHog, and our experiment goal set up, we can go into PostHog, and create a new experiment.

> Experiments are a paid feature, but if you are under 1M events and 15k session recordings per month, they are free.

In your PostHog instance, go to the experiments tab, click create a new experiment, and enter a name and key. We keep the defaults for variants and not use any filters (which means 100% of users see the experiment). Use the action we created earlier as our experiment goal. 

![Experiment](../images/tutorials/nextjs-ab-tests/experiment.gif)

> There must be at least one occurrence of the action for it to show as a goal, so make sure to click the button after creating the action.

Once we create the experiment, we can start to implement it. Come back and launch it later.

## Implementing our experiment

When it comes to implementing our experiment and its associated feature flags, there are a few options we can choose:

1. Bootstrap feature flags by using [`getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props) in `_app.js`
2. Server-side render feature flags in `index.js` using `posthog-node`.
3. Client-side render feature flags in `index.js` after waiting for the PostHog script to load.

Because `getInitialProps` disables [Automatic Static Optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization) for the entire app (one of the main benefits of Next.js), we aren’t going to bootstrap feature flags (option 1). Instead, we use a combination of server-side and client-side rendering. This ensures flags' accuracy and speed while still leveraging the unique benefits of Next.js.

### Client-side rendering feature flags

To client-side render the experiment using feature flags, we first must know when PostHog is loaded. If we try calling PostHog before loading it, we get an error.

To do this, create a PostHog state context that is initially set to `false`, then gets set to `true` once the script loads. Use a provider to add this state context to the rest of the app so we can access it everywhere.

```js
// pages/_app.js
import Script from 'next/script'
import { createContext, useState } from "react"

export const PostHogStateContext = createContext()

export default function App({ Component, pageProps }) {

  const [PostHogState, setPostHogState] = useState(false);

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_bkGVRyzJswgnxAfUwmnu83xtzSyGyqbWx0h6tQhhv3',{api_host:'https://app.posthog.com'})
          `
        }}
        onReady={() => {
          setPostHogState(true)
        }}
      />
      <PostHogStateContext.Provider value={PostHogState}>
        <Component {...pageProps} />
      </PostHogStateContext.Provider>
    </>
  )
}
```

Once done, set up `index.js` to use the `PostHogState` context and check for it to be ready with `useEffect()`. Once the state is ready, we then must wait for feature flags to load with the `posthog.onFeatureFlags()`. Once the feature flags are ready, we can check our `main-cta` flag for the `"test"` value and change the call to action if so.

> Use `posthog.feature_flags.override({'main-cta': 'test'})` to make sure it is working, but remove it when we go to release.

```js
// pages/index.js
import Head from 'next/head'
import { PostHogStateContext } from './_app'
import { useContext, useEffect, useState } from 'react'

export default function Home() {

  const PostHogState = useContext(PostHogStateContext)
  const [ ctaState, setCtaState ] = useState('Click me')

  useEffect(() => {
    if (PostHogState) {
      posthog.onFeatureFlags(() => {
        posthog.feature_flags.override({'main-cta': 'test'})
        if (posthog.isFeatureEnabled('main-cta')) {
          setCtaState('Learn more')
        }
      })
    }
  }, [PostHogState])

  return (
    <>
      <Head>
        <title>Next.js A/B tests</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Next.js A/B tests</h1>
        <button id="main-cta">{ctaState}</button>
      </main>
    </>
  )
}
```

If you’ve set everything up correctly, this changes the call to action to "Learn more"

![Learn call to action](../images/tutorials/nextjs-ab-tests/learn.png)

With this you’re ready to launch your experiment, but make sure to remove your override.

### Server-side rendering

Notice when you refresh the call to action flickers between "Click me" and "Learn more." This is because it takes time for React, the PostHog script, and feature flags to load. 

Server-side rendering the feature flag is a way to limit this. This is getting the data about the feature flag before the client loads, so the call to action only requires React to load on the client-side.

To set this up, first, we must install and use PostHog’s Node library (because we are making server-side requests).

```bash
npm i posthog-node
```

In `index.js` below our `Home()` function, use the `getServerSideProps` method that Next.js automatically provides to get the data for the feature flags for the experiment. Make sure to go back into PostHog and launch your experiment if you haven’t already. In our `getServerSideProps` method, we need:

- to check that cookies exist
- the user’s distinct ID which we can get from the cookies sent in the request
- their related feature flag data which we can get by calling the `posthog-node` `getAllFlags()`  method

```js
// pages/index.js
import { PostHog } from 'posthog-node'

//... rest of imports and Home() function

export async function getServerSideProps(ctx) {

  if (Object.keys(ctx.req.cookies).length === 0) {
    return {
      props: {
        flags: null
      },
    }
  }

  const ph_project_api_key = 'phc_bkGVRyzJswgnxAfUwmnu83xtzSyGyqbWx0h6tQhhv3'

  const user_id = JSON.parse(ctx.req.cookies[`ph_${ph_project_api_key}_posthog`]).distinct_id

  const client = new PostHog(
    ph_project_api_key,
    {
      api_host: 'https://app.posthog.com',
    }
  )
  const flags = await client.getAllFlags(user_id);

  return {
    props: {
      flags
    },
  }
}
```

We then use the `flags` props to set the `ctaState` in the `Home` component if they are available and the `main-cta` flag is set to `test`.

```js
// pages/index.js
//... imports

export default function Home({ flags }) {

  const PostHogState = useContext(PostHogStateContext)
  const [ ctaState, setCtaState ] = useState('Click me')

	useEffect(() => {
	    if (flags && flags['main-cta'] === 'test') {
	      setCtaState('Learn more')
	    }
  }, [])

//... rest of Home() and getServerSideProps()
```

Now, when you refresh the page, the call to action loads faster. 

> **Note:** This only works on subsequence visits to your app where the PostHog cookie is set. Using this method still requires waiting for PostHog and feature flags to load on the first visit.

## Further reading

- [How to set up Next.js analytics, feature flags, and more](/tutorials/nextjs-analytics)
- [How to run Experiments without feature flags](/tutorials/experiments)
- [Building and measuring a sign up funnel with Next.js, Supabase, and PostHog](/tutorials/nextjs-supabase-signup-funnel)
