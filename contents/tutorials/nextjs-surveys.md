---
title: How to set up surveys in Next.js
date: 2023-10-09
author: ["lior-neu-ner"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/surveys-next-js-hog.png
tags: ['surveys']
---

[Surveys](https://posthog.com/docs/surveys) are an excellent way to get feedback from your users. In this guide, we show you how to add a survey to your Next.js app.

We'll create a basic Next.js app, add PostHog, create a survey, and then show you how to display the survey in the app and get responses.

> Already have a Next.js app? [Skip to adding PostHog and setting up the A/B test](#adding-posthog).

## Creating a Next.js app

First, make sure [Node is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (14.6.0 or newer). Then create a Next.js app:

```bash
npx create-next-app@latest
```

Name it whatever you like (we call ours `next-surveys`). Select **No** for TypeScript, **Yes** for `use app router`, **No** for Tailwind CSS and the defaults for every other option.

Next, replace the boilerplate code in app/page.js with the following:

```js
// app/page.js
'use client'

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="App">
        <h1>This is our Next.js survey tutorial</h1>
      </div>
    </main>
  )
}
```

Finally, run `npm run dev` and go to http://localhost:3000/ to see our new homepage.

![Basic Next.js app](../images/tutorials/nextjs-surveys/basic-app.png)

## Adding PostHog

We'll use PostHog to control our survey and monitor results (if you don't have a PostHog instance, you can [sign up for free here](https://app.posthog.com/signup)). 

First set up PostHog for use on the [client-side](/docs/libraries/next-js#app-router) by installing the [JavaScript react SDK](/docs/libraries/react):

```bash
npm install posthog-js
```

Then integrate PostHog by creating a `providers.js` file in your app folder and exporting a `PHProvider` component:

```js-web
// app/providers.js
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init("<ph_project_api_key>", {
    api_host: "<ph_instance_address>", // usually 'https://app.posthog.com' or 'https://eu.posthog.com'
    capture_pageview: false,
  })
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

Once created, you can import `PHProvider` into your `layout/js` file and wrap your app with it:

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

To test everything has been set up correctly, you can use `useEffect` and the `usePostHog` hook to capture an event:

```js-web
'use client'

import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const posthog = usePostHog()
  useEffect(() => {
    if (posthog) {
      posthog.capture('successfully_setup');
    }
  }, [posthog])

  return (
    <main className={styles.main}>
      <div className="App">
        <h1>This is our Next.js survey tutorial</h1>
      </div>
    </main>
  )
}
```

After reloading `localhost:3000`, you should see events appear in your [PostHog events explorer](https://app.posthog.com/events).

![Test events in the PostHog events explorer](../images/tutorials/nextjs-surveys/test-events.png)

## Creating a survey

There are two options for displaying a survey using PostHog:

1. Implement your own survey UI.
2. Use PostHog's prebuilt survey UI.

This tutorial will cover how to implement both options:

## Option 1: Implement your own survey UI

First, create a survey in PostHog by going to the [surveys tab](https://app.posthog.com/surveys) and clicking "New survey." Then, set up your survey with the following settings:

1. Add a name (like `my-first-survey`).
2. Set the display mode to `API`.
3. Select the `Rating` question type. Set the question title to `How likely are you to recommend us to a friend?`, display type to `number` and scale to `1-10`.
4. Leave the remaining optional properties blank (such as `Targeting` or `Thank you message`).

Click "Save as draft" and then on the next screen click "Launch". We're now ready to integrate this survey into our app.

![Custom survey set up](../images/tutorials/react-surveys/create-api-survey.png)

### Adding the survey code

There are four parts to adding code for our custom survey:

1. Create the survey UI.
2. Add the server-side logic for displaying it.
3. Capture interactions from it.

#### 1. Create the survey UI

We've created a sample survey UI for this tutorial. To use it, create a new file in `./app` folder called `Survey.js` and paste the following code:

```react
// app/Survey.js
function Survey({ title, onDismiss, onSubmit }) {
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
  }

  const handleSubmit = () => {
    onSubmit(selectedValue);
  }

  return (
    <div className="survey-popup">
      <h2>{title}</h2>
      <div>
        {[...Array(10)].map((_, i) => (
          <button key={i + 1} onClick={() => handleSelect(i + 1)}>{i + 1}</button>
        ))}
      </div>
      <div>
        <button onClick={onDismiss}>Dismiss</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Survey;
```

Then, add the following CSS styles to your `page.module.css` file:

```css
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

```react
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

This shows a survey popup every time you visit your app's homepage.

![Custom survey UI](../images/tutorials/react-surveys/survey-ui.png)

#### 2. Add the logic for displaying it.

The first part of handling our display logic is fetching the survey from PostHog. PostHog keeps track of all active surveys for a user (this is especially helpful if you have set up [custom targeting options](/docs/surveys/creating-surveys#targeting)). 

To fetch the active surveys, we use the `usePostHog` hook to retrieve our PostHog instance. Then, we call `posthog.getActiveMatchingSurveys()` using `useEffect()`:

```react
// src/App.js
import './App.css';
import { useEffect, useState } from 'react';
import Survey from './Survey';
import { usePostHog } from 'posthog-js/react';

function App() {
  // ... rest of your code ...

  const posthog = usePostHog()
  useEffect(() => {
    posthog.getActiveMatchingSurveys((surveys) => {
      // TODO: configure the survey
    }); 
  }, [posthog]); // posthog may be undefined until it's had a chance to initialize. Hence use it as a dependency for useEffect
  
  // ... rest of your code ...
}

export default App;
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

```react
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
  }, [posthog]); // posthog may be undefined until it's had a chance to initialize. Hence use it as a dependency for useEffect
  
  // ... rest of your code ...

 return (
 <div className="App">
   <h1>This is our survey tutorial</h1>
   {showSurvey && (
     <Survey
       title={surveyTitle}
       onDismiss={handleDismiss}
       onSubmit={handleSubmit}
     />
   )}
 </div>
```

Finally, we want to make sure we don't show the survey again to users who have either submitted or dismissed it. 

We use [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to store this data. Then, we'll add a check to show the survey based on whether the user has already interacted with it or not:

```react
// src/App.js

function App() {
  // ... rest of your code ...

  const [showSurvey, setShowSurvey] = useState(true);

  useEffect(() => {
    // Check local storage to see if the user has already seen this particular survey
    const hasInteractedWithSurvey = localStorage.getItem(`hasInteractedWithSurvey_${surveyID}`);
    setShowSurvey(!hasInteractedWithSurvey);
  }, [surveyID]);

  const handleDismiss = () => {
    setShowSurvey(false);
    console.log("Survey dismissed!");
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
  };

  const handleSubmit = (value) => {
    setShowSurvey(false);
    console.log("User submitted:", value);
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');  
  };

  return (
    <div className="App">
      <h1>This is our survey tutorial</h1>
      {showSurvey && (
        <Survey
          title={surveyTitle}
          onDismiss={handleDismiss}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
```

#### 3. Capture interactions from it.

The final step in setting up our survey is capturing interactions. This enables us to analyze the results in PostHog. 

There are 3 events to capture:

1. `"survey shown"`
2. `"survey dismissed"`
3. `"survey sent"` (for responses)

You can capture these events using `posthog.capture()`:

```react
  // ... rest of your code ...

  const handleDismiss = () => {
    setShowSurvey(false);
    console.log("Survey dismissed!");
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
    posthog.capture("survey dismissed", {
      $survey_id: surveyID // required
    })
  };

  const handleSubmit = (value) => {
    setShowSurvey(false);
    console.log("User submitted:", value);
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

```react
// src/App.js
import { usePostHog } from 'posthog-js/react';
import './App.css';
import { useEffect, useState } from 'react';
import Survey from './Survey';

function App() {
  const posthog = usePostHog()
  const [showSurvey, setShowSurvey] = useState(true);
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
  }, [posthog]); // posthog may be undefined until it's had a chance to initialize. Hence use it as a dependency for useEffect

  useEffect(() => {
    // Check local storage to see if the user has already seen this particular survey
    const hasInteractedWithSurvey = localStorage.getItem(`hasInteractedWithSurvey_${surveyID}`);
    setShowSurvey(!hasInteractedWithSurvey);
  }, [surveyID]);

  const handleDismiss = () => {
    setShowSurvey(false);
    console.log("Survey dismissed!");
    localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
    posthog.capture("survey dismissed", {
      $survey_id: surveyID // required
    })
  };

  const handleSubmit = (value) => {
    setShowSurvey(false);
    console.log("User submitted:", value);
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
    <div className="App">
      <h1>This is our survey tutorial</h1>
      {showSurvey && (
        <Survey
          title={surveyTitle}
          onDismiss={handleDismiss}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
```

That's it! Our survey is ready to go!



## Further reading