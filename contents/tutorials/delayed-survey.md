---
title: How to show a survey after a delay
date: 2023-11-08T00:00:00.000Z
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - surveys
---

When asking for feedback, timing is everything. You want users to **actually use your app** before asking them about it. A survey that pops up immediately can annoy users and receive worse responses.

To help you get feedback at the right time, this tutorial shows you how to set up a [PostHog survey](/docs/surveys) that shows after a delay.

## Create your delayed survey

First, we create our survey in PostHog by going to the [Surveys tab](https://app.posthog.com/surveys) and clicking "New survey." Choose any template or create a blank survey, fill out the details, and open the "Targeting" section. 

In the targeting section, start by switching from "All users" to "Users who match…". Under "Selector matches," add `.delayed-survey` (the **leading period** is important). 

This means our survey **only shows when an HTML element with the class `delayed-survey` is on the page.** In the next step, we'll add code to only show this class after a delay. This way, our survey will show after a delay.

Finally, click "Save as draft" and then "Launch." You don’t have to worry about this survey showing early because the class selector won’t match anything until we implement it.

![Creating a survey video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/delayed-survey/survey.mp4)

## Implement your delayed survey

Once installed in your app, PostHog automatically shows your surveys to users when the `.delayed-survey` class is present. All we need to do is set up the logic to add this class to the page after a delay.

As an example, we do this in a basic Next.js app with PostHog already installed, but you can use any app or site that can run client-side JavaScript, including no-code site builders like [Webflow](/tutorials/webflow) and [Framer](/tutorials/framer-analytics).

> Need help installing and setting up PostHog for Next.js? Check out our tutorial on [How to set up Next.js app router analytics, feature flags, and more](/tutorials/nextjs-app-directory-analytics).

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

![Delayed survey video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/delayed-survey/delay.mp4)

## Further reading

- [Get feedback and book user interviews with surveys](/tutorials/feedback-interviews-site-apps)
- [How to write great product survey questions (with examples)](/product-engineers/product-survey-questions)
- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
