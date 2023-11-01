---
title: How to show a survey after a delay
date: 2023-11-01
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
tags: ['surveys']
---

To get the most accurate responses for your surveys, you want users to experience your site and product before asking. You want to wait and let them have their first impressions, instead of showing a survey right away.

To help you do this, you can delay your surveys and this tutorial shows you how. It goes over how to create a survey in PostHog and then implement a delay in your app for that survey.

## Create your delayed survey

First, we create our survey in PostHog by going to the [Surveys tab](https://app.posthog.com/surveys) and clicking "New survey." Choose any template or create a blank survey, fill out the details, and open the "Targeting" section. 

In the targeting section, switch from "All users" to "Users who match…". Add `.delayed-survey` under "Selector matches" (the **leading period** is important) and click "Save as draft." Our implementation will add this class to the page when want the survey to show.

Finally, click Launch. You don’t have to worry about this survey showing early, because the class selector won’t match anything until we implement it.

![Creating a survey video](../images/tutorials/delayed-survey/survey.mp4)

## Implement your delayed survey

Once installed in your app using the SDK or snippet, PostHog automatically shows your survey to targeted users. All we need to do is set up the logic to do the delay and add the class to our page.

As an example, we do this in a basic Next.js app with PostHog already installed, but you can use any app or site that can run client-side JavaScript, including no-code site builders like [Webflow](/tutorials/webflow) and [Framer](/tutorials/framer-analytics).

> Need help installing and setting up PostHog for Next.js? Check out our tutorial on [How to set up Next.js app directory analytics, feature flags, and more](/tutorials/nextjs-app-directory-analytics).

In our `app` directory, we create a `test` folder and a `page.js` file within it. This page will be a basic client component. We use a `useEffect` to set a 3000-millisecond delay, then select the `h1` component and add the `delayed-survey` class to it. This triggers our survey to show.

```js
// app/test/page.js
'use client'
import { useEffect } from 'react'

export default function Test() {

  useEffect(() => {
    setTimeout(() => {
      const h1 = document.querySelector('h1');
      if (h1) {
        h1.classList.add('delayed-survey');
      }
    }, 3000);
  }, []);

  return (
    <div>
      <h1>This is a basic Next.js page</h1>
    </div>
  );
};
```

Now, when we run `npm run dev` and go to `http://localhost:3000/test`, our survey pops up after a delay instead of right away.

![Delayed survey video](../images/tutorials/delayed-survey/delay.mp4)

## Further reading

- [Get feedback and book user interviews with surveys](/tutorials/feedback-interviews-site-apps)
- [How to write great product survey questions (with examples)](/product-engineers/product-survey-questions)
- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)