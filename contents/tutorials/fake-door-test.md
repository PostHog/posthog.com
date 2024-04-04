---
title: How to run a fake door test
date: 2023-08-17
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - surveys
  - actions
---

A fake door test is when you create a "fake" UI or experience for a product or feature you are thinking of building. When users interact with it, you tell them it isn't available (yet). This enables you determine if your users would actually be interested in your new feature.

This tutorial shows you how to set up a fake door test with PostHog. We'll build a basic app, set up a fake door test, and then implement surveys to get more feedback.

> **Note:** Fake door tests have risks. Showing users something non-existent could disappoint them and hurt your reputation. Make sure to be honest and transparent with users about what you are doing.

## Creating an app and adding PostHog

We are going to build a basic app to run our fake door test on. We do this with Next.js, which requires installing Node. After doing so, run the command below, select **No for TypeScript**, **Yes for `use app router`**, and the defaults for every other option.

```bash
npx create-next-app@latest fake-door
```

After doing this, go into your newly created `fake-door` folder and install `posthog-js`.

```bash
cd fake-door
npm i posthog-js
```

After installing `posthog-js`, set up the PostHog initialization. This requires going to our `app` folder, creating a `providers.js` file, adding our PostHog initialization behind a window check with `opt_in_site_apps: true` (for later), and creating a provider component like this:

```js-web
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    opt_in_site_apps: true
  })
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

With our `PHProvider` component created, we can import it and wrap our main app in it in `layout.js`.

```js-web
// app/layout.js
import './globals.css'
import { PHProvider } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>{children}</body>
      </PHProvider>
    </html>
  )
}
```

With this done, PostHog starts [autocapturing](/docs/product-analytics/autocapture) events and our app is ready for a fake door test.

## Creating our fake door test

Our fake door test is simple. We'll add a button to our app that says "Try our new feature" and it takes you to a page that says "This feature is coming soon" which we will create later.

```js-web
// app/page.js
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Welcome to our app!</h1>
      <button>Sign in</button>
      <span> - </span>
      <Link href="/new">
        <button>Try our the new feature</button>
      </Link>
    </div>
  )
}
```

With just this set up, we can run the development server with the command `npm run dev`, go to our app, and click the button a few times. This captures events in PostHog.

Once we capture that data in PostHog, we can set up an [action](/docs/data/actions) for our fake door test. To do this: 

1. Go to the data management, click the action tab, and then click "[New action](https://app.posthog.com/data-management/actions/new)." 
2. Select option to create "From event or pageview."
3. Name your action "shown new feature interest." 
4. Select "Autocapture" as our "Match Group #1," and then match the element text "Try our new feature" exactly. 
5. Press save.

![Action](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/fake-door-test/action.png)

This tracks the number of button clicks, enabling you to track the success of your fake door test and interest in your feature.

> **Bonus idea:** You can use [feature flags](/docs/feature-flags/manual) to show your fake door test to a targeted subset of users. This lowers reputation risk and enables you to get more targeted feedback.

## Adding a survey to our fake door test

Since the goal of a fake door test is to validate interest, we can get even more feedback by adding a survey.

We'll implement this in our example by navigating the user to a new page when they click the button and asking them a survey question.

To do this, create another folder named `new` in our `app` folder and a file named `page.js` in this folder. In this file, we'll create a basic page with our survey question. 

```js-web
// app/new/page.js

export default function New() {
  return (
    <div>
      <h1>This feature is coming soon</h1>
      <p>Let us know what you think by answering the survey below.</p>
    </div>
  )
}
```

Next, we can set up the survey we mention. To do this, go to the [surveys tab in PostHog](https://app.posthog.com/surveys) and click "New survey." Here you can fill out the details of your survey:

1. Add a name like "New feature."
2. Add a question like "What are you looking for in this new feature?"
3. Add a target on URLs containing `/new`.
4. Click "Save as draft."

Because we set `opt_in_site_apps: true` in our PostHog initialization earlier, all we need to do is enable the survey site app. Either click the link on your draft survey page or go to the [apps tab](https://app.posthog.com/project/apps) and search for "Surveys app," enable it, and press save.

> **Don’t want a popover?** You can learn how to implement an integrated, custom survey component in our "[How to create custom surveys](/tutorials/survey)" tutorial.

Once done, we can go back to our draft survey and press "Launch." Now, users who visit the `/new` page get a survey so we can get further validation on our fake door test. PostHog saves survey responses which you can use to guide your feature development.

![Survey on the new page](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/fake-door-test/survey.png)

## Further reading

- [The Product-Market Fit Game](/blog/product-market-fit-game)
- [Get feedback and book user interviews with surveys](/tutorials/feedback-interviews-site-apps)
- [How we build features users love (really fast)](/blog/measuring-feature-success)
