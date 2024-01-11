---
title: How to set up surveys in Vue.js
date: 2023-10-18
author: ["lior-neu-ner"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-12.png
tags: ['surveys']
---

import { ProductScreenshot } from 'components/ProductScreenshot'
import EventsLight from '../images/tutorials/vue-surveys/events-light.png'
import EventsDark from '../images/tutorials/vue-surveys/events-dark.png'

[Surveys](/docs/surveys) are a great way to get feedback from your users. In this guide, we show you how to add a survey to your Vue.js app.

We'll create a basic Vue app, add PostHog, create a survey, and then show you how to display the survey in the app and get responses.

## 1. Create a Vue app

For this tutorial, we create a basic `Vue 3` app with a simple button to run our test on.

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 14.6.0 or newer). Then install `@vue/cli` and create a new Vue app:

```bash
npm install -g @vue/cli
vue create vue-surveys
```

Make sure to select `[Vue 3] babel, eslint` as the Vue version.

Next, replace the code in `src/App.vue` with the following:

```vue file=App.vue
<template>
  <div id="app">
    <h1>This is our Vue.js survey tutorial</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

Run `npm run serve` to start your app.

![Basic Vue app](../images/tutorials/vue-ab-tests/basic-app.png)

## 2. Add PostHog

> This tutorial shows how to integrate PostHog with `Vue 3`. If you're using `Vue 2`, see [our Vue docs](/docs/libraries/vue-js) for how to integrate PostHog.

We use PostHog to create and control our survey as well as monitor results. If you don't have a PostHog instance, you can [sign up for free here](https://app.posthog.com/signup). 

First install `posthog-js`:

```bash
npm install posthog-js
```

Create a new [plugin](https://vuejs.org/guide/reusability/plugins) by creating a new folder in your base directory called `plugins` and then a new file `posthog.js`:

```bash
mkdir plugins
cd plugins 
touch posthog.js
```

Add the following code to your `posthog.js` file:

```js file=plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      "<ph_project_api_key>",
      {
        api_host: "<ph_instance_address>",
      }
    );
  },
};
```

Replace `<ph_project_api_key>` and `<ph_instance_address>` with your your PostHog API key and host. You can find these in your [project settings](https://app.posthog.com/settings/project).

Finally, activate your plugin in `main.js`:

```js file=main.js
import { createApp } from 'vue'
import App from './App.vue'
import posthogPlugin from '../plugins/posthog';

const app = createApp(App);
app.use(posthogPlugin);
app.mount('#app')
```

Once you’ve done this, reload your app. You should begin seeing events in the [PostHog events explorer](https://app.posthog.com/events).

<ProductScreenshot
  imageLight={EventsLight} 
  imageDark={EventsDark} 
  alt="Events in PostHog" 
  classes="rounded"
/>

## 3. Create a survey

There are two options for displaying a survey using PostHog:

1. Use PostHog's prebuilt survey UI.
2. Implement your own survey UI.

This tutorial will cover how to implement both options:

### Option 1: Use PostHog's prebuilt survey UI

This is the simplest option. PostHog has a variety of [survey templates](/templates?filter=type&value=survey) to choose from, and handles all the display logic and response capture for you. You can also customize the questions, branding, and targeting as needed – see our [survey docs](/docs/surveys/creating-surveys) for more details on how to do so.
 
To create a survey with a prebuilt UI, go to the [surveys tab](https://app.posthog.com/surveys) and click "New survey". 

<ProductScreenshot
  imageLight={ImgSurveyTemplatesLight} 
  imageDark={ImgSurveyTemplatesDark} 
  alt="PostHog survey templates" 
  classes="rounded"
/>

Select any template, or you can create your own by clicking "Create blank survey". Then, configure your survey with the following details:

1. Ensure `Presentation` is set to **Popover**.
2. Set the targeting to `All users`.
3. Use the default values for everything else.

Then, click "Save as draft" and then "Launch". Your survey is now live and you should see it in your app!  After submitting responses, you can [view results in PostHog](#4-view-results).

![Popover survey in app](../images/tutorials/vue-surveys/popover-survey.png)

### Option 2: Implement your own survey UI

If you prefer to have complete control of your survey UI and logic, you can still use PostHog to keep track of and analyze your results.

p
First, create a Rating survey in PostHog like in option 1 above, except set the display mode to `API`.

![Custom survey set up](../images/tutorials/nextjs-surveys/create-api-survey.png)

Then, there are four parts to adding code for our custom survey:

1. Create the survey UI.
2. Fetch the survey from PostHog.
3. Add the logic for displaying and hiding it.
4. Capture interactions from it.

#### 1. Create the survey UI

We've created a sample survey UI for this tutorial. To use it, create a new file in `app` folder called `Survey.js` and paste the following code:

```js-web
// app/Survey.js
import { useState } from 'react'
import styles from './page.module.css'

function Survey({ title, onDismiss, onSubmit }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
  }

  const handleSubmit = () => {
    onSubmit(selectedValue);
  }

  return (
    <div className={styles.survey}>
      <h2>{title}</h2>
      <div>
        {[...Array(10)].map((_, i) => (
          <button className={styles.button} key={i + 1} onClick={() => handleSelect(i + 1)}>{i + 1}</button>
        ))}
      </div>
      <div>
        <button className={styles.button} onClick={onDismiss}>Dismiss</button>
        <button className={styles.button} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Survey;
```

Then, replace the CSS code in `page.module.css` with the following:

```css
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
}

.survey {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1000;
}

.button {
  margin: 5px;
  padding: 5px;
}
```

Finally, integrate the component into `page.js`:

```js-web
// app/page.js
'use client'

import { useState } from 'react'
import styles from './page.module.css'
import Survey from './Survey';

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(true);

  const handleDismiss = () => {
    setShowSurvey(false);
  };

  const handleSubmit = (value) => {
    setShowSurvey(false);
  };

  return (
    <main className={styles.main}>
      <div className="App">
        <h1>This is our Next.js survey tutorial</h1>
        {showSurvey && (
        <Survey
          title={"Rate our service"}
          onDismiss={handleDismiss}
          onSubmit={handleSubmit}
        />)}
      </div>
    </main>
  )
}
```

This shows a survey popup every time you visit your app's homepage.

![Custom survey UI](../images/tutorials/nextjs-surveys/sample-survey-ui.png)

#### 2. Fetch the survey from PostHog

PostHog keeps track of all active surveys for a user (this is especially helpful if you have set up [custom targeting options](/docs/surveys/creating-surveys#targeting)). 

To fetch the active surveys, we use the `usePostHog` hook to call `posthog.getActiveMatchingSurveys()` using `useEffect()`:

```js-web
// app/page.js
'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import Survey from './Survey';
import { usePostHog } from 'posthog-js/react';

export default function Home() {
  // ... rest of your code ...

  const posthog = usePostHog()
  useEffect(() => {
    posthog.getActiveMatchingSurveys((surveys) => {
    }); 
  }, [posthog]);
  
  // ... rest of your code ...
}
```

`posthog.getActiveMatchingSurveys()` returns a surveys object that looks like this:

```JSON
[
   {
      "id":"018ad0e0-0de6-0000-6a56-033975bd0c68",
      "name":"my-first-survey",
      "description":"",
      "type":"api",
      "questions":[
         {
            "type":"rating",
            "scale":10,
            "display":"number",
            "question":"How likely are you to recommend us to a friend?",
            "description":"",
            "lowerBoundLabel":"Unlikely",
            "upperBoundLabel":"Very likely"
         }
      ],
      "conditions":null,
      "appearance":{
         "textColor":"black",
         "whiteLabel":false,
         "backgroundColor":"white",
         "submitButtonText":"Submit",
         "ratingButtonColor":"#e0e2e8",
         "submitButtonColor":"#2c2c2c",
         "descriptionTextColor":"#4b4b52",
         "thankYouMessageHeader":"Thank you for your feedback!",
         "displayThankYouMessage":true
      },
      "start_date":"2023-09-26T09:44:31.844000Z",
      "end_date":null
   }
]
```

We can use this survey object to configure our `Survey` component:

```js-web
  // ... rest of your code ...
  const [surveyTitle, setSurveyTitle] = useState(false);
  const [surveyID, setSurveyID] = useState(false);
  useEffect(() => {
    posthog.getActiveMatchingSurveys((surveys) => {
      if (surveys.length > 0) {
        const survey = surveys[0];
        setSurveyID(survey.id);
        setSurveyTitle(survey.questions[0].question)
      }
    }); 
  }, [posthog])
  
  // ... rest of your code ...
  return (
    <main className={styles.main}>
      <div className="App">
        <h1>This is our Next.js survey tutorial</h1>
        {showSurvey && (
        <Survey
          title={surveyTitle}
          onDismiss={handleDismiss}
          onSubmit={handleSubmit}
        />)}
      </div>
    </main>
  )
```

#### 3. Add the logic for displaying and hiding it.

We want to make sure we don't show the survey again to users who have either submitted or dismissed it. We use [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to store this data and use it to check whether to show the survey or not.

```js-web
  // ... rest of your code ...

  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    // Check local storage to see if the user has already seen this particular survey
    const hasInteractedWithSurvey = localStorage.getItem(`hasInteractedWithSurvey_${surveyID}`);
    setShowSurvey(!hasInteractedWithSurvey);
  }, [surveyID]);

  const handleDismiss = () => {
    setShowSurvey(false);
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
  };

  const handleSubmit = (value) => {
    setShowSurvey(false);
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');  
  };

  // ... rest of your code ...
```

#### 4. Capture interactions from it.

The final step in setting up our survey is capturing interactions. This enables us to analyze the results in PostHog. 

There are 3 events to capture:

1. `"survey shown"`
2. `"survey dismissed"`
3. `"survey sent"` (for responses)

You can capture these events using `posthog.capture()`:

```js-web
  // ... rest of your code ...

  const handleDismiss = () => {
    setShowSurvey(false);
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
    posthog.capture("survey dismissed", {
      $survey_id: surveyID // required
    })
  };

  const handleSubmit = (value) => {
    setShowSurvey(false);
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');  
    posthog.capture("survey sent", {
      $survey_id: surveyID, // required
      $survey_response: value // required
    })
  };

  useEffect(() => {
    if (posthog && surveyID && showSurvey) {
      posthog.capture("survey seen", {
        $survey_id: surveyID // required
      })
    }
  }, [showSurvey, surveyID, posthog])

 // ... rest of your code ...
```

Altogether, your code should look like this:

```js-web
// app/page.js
'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import Survey from './Survey';
import { usePostHog } from 'posthog-js/react';

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(false);

  const posthog = usePostHog()
  const [surveyTitle, setSurveyTitle] = useState(false);
  const [surveyID, setSurveyID] = useState(false);
  useEffect(() => {
    posthog.getActiveMatchingSurveys((surveys) => {
      if (surveys.length > 0) {
        const survey = surveys[0];
        setSurveyID(survey.id);
        setSurveyTitle(survey.questions[0].question)
      }
    }); 
  }, [posthog])

  useEffect(() => {
    // Check local storage to see if the user has already seen this particular survey
    const hasInteractedWithSurvey = localStorage.getItem(`hasInteractedWithSurvey_${surveyID}`);
    setShowSurvey(!hasInteractedWithSurvey);
  }, [surveyID]);

  const handleDismiss = () => {
    setShowSurvey(false);
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
    posthog.capture("survey dismissed", {
      $survey_id: surveyID // required
    })
  };

  const handleSubmit = (value) => {
    setShowSurvey(false);
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');  
    posthog.capture("survey sent", {
      $survey_id: surveyID, // required
      $survey_response: value // required
    })
  };

  useEffect(() => {
    if (posthog && surveyID && showSurvey) {
      posthog.capture("survey seen", {
        $survey_id: surveyID // required
      })
    }
  }, [showSurvey, surveyID, posthog])

  return (
    <main className={styles.main}>
      <div className="App">
        <h1>This is our Next.js survey tutorial</h1>
        {showSurvey && (
        <Survey
          title={surveyTitle}
          onDismiss={handleDismiss}
          onSubmit={handleSubmit}
        />)}
      </div>
    </main>
  )
}
```

Our survey is now ready to go! The next step is ship the changes, get responses, and view your results.

## 4. View results

After interacting with your survey, you can view results by selecting the survey from the [surveys tab](https://app.posthog.com/surveys). You'll see data on:

- How many users have seen the survey.
- How many users have dismissed the survey.
- Responses.

You can also filter these results based on [user properties](/docs/product-analytics/user-properties), [cohorts](/docs/data/cohorts), [feature flags](/docs/feature-flags/creating-feature-flags) and more.

![Viewing survey results](../images/tutorials/nextjs-surveys/survey-results.png)

## Further reading

- [How to write great product survey questions (with examples)](/blog/product-survey-questions)
- [Get feedback and book user interviews with surveys](/tutorials/feedback-interviews-site-apps)