---
title: How to set up surveys in Nuxt
date: 2024-01-18
author: ["lior-neu-ner"]
showTitle: true
sidebar: Docs
tags: ['surveys']
---

import { ProductScreenshot } from 'components/ProductScreenshot'
import EventsLight from '../images/tutorials/nuxt-surveys/events-light.png'
import EventsDark from '../images/tutorials/nuxt-surveys/events-dark.png'
import ImgSurveyResultsLight from '../images/tutorials/nuxt-surveys/survey-results-light.png'
import ImgSurveyResultsDark from '../images/tutorials/nuxt-surveys/survey-results-dark.png'
import ImgSurveyTemplatesLight from '../images/tutorials/nuxt-surveys/survey-templates-light.png'
import ImgSurveyTemplatesDark from '../images/tutorials/nuxt-surveys/survey-templates-dark.png'

[Surveys](/docs/surveys) are a great way to get feedback from your users. In this guide, we show you how to add a survey to your Nuxt.js app.

We'll create a basic Nuxt app, add PostHog, create a survey, and then show you how to display the survey in the app and get responses.

## 1. Create a Nuxt app

For this tutorial, we create a basic `Nuxt 3` app. First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0.0 or newer). Then run the following command:

```bash
npx nuxi@latest init <project-name>
```

Name it whatever you like (we call ours `nuxt-surveys`), select `npm` as the package manager, and use the defaults for the remaining options.

Replace the code in `app.vue` with a simple heading:

```vue file=app.vue
<template>
  <main>
    <h1>Nuxt.js 3 Surveys</h1>
  </main>
</template>
```

Run `npm run dev` to start your app.

![Basic app](../images/tutorials/nuxt-surveys/basic-app.png)

## 2. Add PostHog

> This tutorial shows how to integrate PostHog with `Nuxt 3`. If you're using `Nuxt 2`, see [our Nuxt docs](/docs/libraries/nuxt-js) for how to integrate PostHog.

We use PostHog to create and control our survey as well as monitor results. If you don't have a PostHog instance, you can [sign up for free here](https://us.posthog.com/signup). 

To set it up with your Nuxt app, first install `posthog-js`:

```bash
npm install posthog-js
```

Then, add your PostHog API key and host to your `nuxt.config.ts` file. You can find your project API key in your [PostHog project settings](https://app.posthog.com/settings/project)

```ts file=nuxt.config.ts
export default defineNuxtConfig({
  // ...rest of your config
  
  runtimeConfig: {
    public: {
      posthogPublicKey: '<ph_project_api_key>',
      posthogHost: '<ph_instance_address>'
    }
  }
})
```

Create a new [plugin](https://nuxt.com/docs/guide/directory-structure/plugins) by first creating a new folder called `plugins` and then a new file `posthog.client.js`:

```bash
mkdir plugins
cd plugins 
touch posthog.client.js
```

Add the following code to your `posthog.client.js` file:

```js file=plugins/posthog.client.js
import { defineNuxtPlugin } from '#app'
import posthog from 'posthog-js'

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost,
  })

  
  return {
    provide: {
      posthog: () => posthogClient
    }
  }
})
```

Once you’ve done this, reload your app. You should begin seeing events in the [PostHog events explorer](https://us.posthog.com/events).

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
 
To create a survey with a prebuilt UI, go to the [surveys tab](https://us.posthog.com/surveys) in PostHog and click "New survey". 

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

Then, click "Save as draft" and then "Launch". Your survey is now live and you should see it in your app. After submitting responses, you can [view results in PostHog](#4-view-results).

![Popover survey in app](../images/tutorials/nuxt-surveys/popover-survey.png)

### Option 2: Implement your own survey UI

If you prefer to have complete control of your survey UI and logic, you can still use PostHog to keep track of and analyze your results.

First, create a survey in PostHog like in option 1 above (for this tutorial, we use a Net Promoter Score survey template). The only difference is you must set `Presentation` to **API**.

Then, there are four parts to adding code for our custom survey:

1. Create the survey UI.
2. Fetch the survey from PostHog.
3. Add the logic for displaying and hiding it.
4. Capture interactions from it.

#### 1. Create the survey UI

We've created a sample survey UI for this tutorial. To use it, create a new folder `components` in your base directory and then create a new file `CustomSurvey.vue` in it. Paste the following code in this file:

```vue file=components/CustomSurvey.vue
<template>
  <div class="survey">
    <h2>{{ title }}</h2>
    <div>
      <button v-for="i in 10" :key="i" class="button" @click="handleSelect(i)">
        {{ i }}
      </button>
    </div>
    <div>
      <button class="button" @click="emitDismiss">Dismiss</button>
      <button class="button" @click="emitSubmit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  onDismiss: Function,
  onSubmit: Function
});

const emit = defineEmits(['onDismiss', 'onSubmit']);

const selectedValue = ref(null);

function handleSelect(value) {
  selectedValue.value = value;
}

function emitDismiss() {
  emit('onDismiss');
}

function emitSubmit() {
  emit('onSubmit', selectedValue.value);
}
</script>

<style scoped>
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
</style>
```

Then, integrate the component into `app.vue`:

```vue file=app.vue
<template>
  <main>
    <div class="App">
      <h1>Nuxt.js 3 Surveys</h1>
      <CustomSurvey
        v-if="showSurvey"
        :title="surveyTitle"
        @onDismiss="handleDismiss"
        @onSubmit="handleSubmit"
      />
    </div>
  </main>
</template>

<script setup>

import { ref } from 'vue';

const showSurvey = ref(true);
const surveyTitle = ref('Placeholder title')

const handleDismiss = () => {
  showSurvey.value = false;
};

const handleSubmit = (value) => {
  console.log("Submitted value:", value);
  showSurvey.value = false;
};
</script>
```

This shows a survey popup every time you visit your app's homepage.

![Custom survey UI](../images/tutorials/nuxt-surveys/sample-survey-ui.png)

#### 2. Fetch the survey from PostHog

PostHog keeps track of all active surveys for a user (this is especially helpful if you set up [custom targeting options](/docs/surveys/creating-surveys#targeting)). 

To fetch the active surveys when the app is mounted, we call `$posthog().getActiveMatchingSurveys()`. This returns a surveys object that looks like this:

```JSON
[
   {
     "id": "018cfcd5-107e-0000-49a1-8e7c6b825947",
     "name": "Net promoter score (NPS) API Survey",
     "description": "",
     "type": "api",
     "linked_flag_key": null,
     "targeting_flag_key": null,
     "questions": [
       {
         "type": "rating",
         "scale": 10,
         "display": "number",
         "question": "How likely are you to recommend us to a friend?",
         "description": "",
         "lowerBoundLabel": "Unlikely",
         "upperBoundLabel": "Very likely"
       }
     ],
     "conditions": null,
     "start_date": "2024-01-12T08:41:20.614000Z",
     "end_date": null
   }
]
```

We can use this survey object to configure our `CustomSurvey` component:

```vue file=app.vue
<template>
  <!-- ... rest of your template ... -->
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const showSurvey = ref(true);
const surveyTitle = ref('');
const surveyID = ref('');

onMounted(async () => {
  await fetchActiveSurveys();
});

const fetchActiveSurveys = () => {
  const { $posthog } = useNuxtApp();
    $posthog().getActiveMatchingSurveys((surveys) => {
    if (surveys.length > 0) {
      const survey = surveys[0];
      surveyID.value = survey.id;
      surveyTitle.value = survey.questions[0].question;
    }
  });
};

// rest of your code

</script>
```

#### 3. Add the logic for displaying and hiding it.

We want to make sure we don't show the survey again to users who have either submitted or dismissed it. We use [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to store this data and use it to check whether to show the survey or not.

```vue file=app.vue
<template>
  <!-- ... rest of your template ... -->
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const showSurvey = ref(false); // updated to false

// rest of your code

const checkSurveyInteraction = () => {
  const hasInteractedWithSurvey = localStorage.getItem(`hasInteractedWithSurvey_${surveyID.value}`);
  showSurvey.value = !hasInteractedWithSurvey;
};

onMounted(async () => {
  await fetchActiveSurveys();
  checkSurveyInteraction();
});

const fetchActiveSurveys = () => {
  const { $posthog } = useNuxtApp();
    $posthog().getActiveMatchingSurveys((surveys) => {
    if (surveys.length > 0) {
      const survey = surveys[0];
      surveyID.value = survey.id;
      surveyTitle.value = survey.questions[0].question;
      checkSurveyInteraction();
    }
  });
};

const handleDismiss = () => {
  showSurvey.value = false;
  localStorage.setItem(`hasInteractedWithSurvey_${surveyID.value}`, 'true');
};

const handleSubmit = (value) => {
  showSurvey.value = false;
  localStorage.setItem(`hasInteractedWithSurvey_${surveyID.value}`, 'true');
};

</script>
```

#### 4. Capture interactions from it.

The final step in setting up our survey is capturing interactions. This enables us to analyze the results in PostHog. 

There are 3 events to capture:

1. `"survey shown"`
2. `"survey dismissed"`
3. `"survey sent"` (for responses)

You can capture these events using `this.$posthog.capture()`:

```vue file=app.vue
<template>
  <!-- ... rest of your template ... -->
</template>

<script setup>

// rest of your code

const fetchActiveSurveys = () => {
  const { $posthog } = useNuxtApp();
    $posthog().getActiveMatchingSurveys((surveys) => {
    if (surveys.length > 0) {
      const survey = surveys[0];
      surveyID.value = survey.id;
      surveyTitle.value = survey.questions[0].question;
      checkSurveyInteraction();
      if (showSurvey) {
        $posthog().capture("survey seen", {
          $survey_id: surveyID // required
        })
      }
    }
  });
};

const handleDismiss = () => {
  showSurvey.value = false;
  localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');

  const { $posthog } = useNuxtApp();
  $posthog().capture("survey dismissed", {
    $survey_id: surveyID // required
  });
};

const handleSubmit = (value) => {
  showSurvey.value = false;
  localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');

  const { $posthog } = useNuxtApp();
  $posthog().capture("survey sent", {
    $survey_id: surveyID, // required
    $survey_response: value // required
  });
};

</script>
```

Altogether, your code should look like this:

```vue file=app.vue
<template>
  <main>
    <div class="App">
      <h1>Nuxt.js 3 Surveys</h1>
      <CustomSurvey
        v-if="showSurvey"
        :title="surveyTitle"
        @onDismiss="handleDismiss"
        @onSubmit="handleSubmit"
      />
    </div>
  </main>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const showSurvey = ref(false); // changed to false
const surveyTitle = ref('');
const surveyID = ref('');

const checkSurveyInteraction = () => {
  const hasInteractedWithSurvey = localStorage.getItem(`hasInteractedWithSurvey_${surveyID.value}`);
  showSurvey.value = !hasInteractedWithSurvey;
};

onMounted(async () => {
  await fetchActiveSurveys();
  checkSurveyInteraction();
});

const fetchActiveSurveys = () => {
  const { $posthog } = useNuxtApp();
    $posthog().getActiveMatchingSurveys((surveys) => {
    if (surveys.length > 0) {
      const survey = surveys[0];
      surveyID.value = survey.id;
      surveyTitle.value = survey.questions[0].question;
      checkSurveyInteraction();
      if (showSurvey) {
        $posthog().capture("survey seen", {
          $survey_id: surveyID // required
        })
      }
    }
  });
};

const handleDismiss = () => {
  showSurvey.value = false;
  localStorage.setItem(`hasInteractedWithSurvey_${surveyID.value}`, 'true');
  
  const { $posthog } = useNuxtApp();
  $posthog().capture("survey dismissed", {
    $survey_id: surveyID // required
  });
};

const handleSubmit = (value) => {
  showSurvey.value = false;
  localStorage.setItem(`hasInteractedWithSurvey_${surveyID.value}`, 'true');

  const { $posthog } = useNuxtApp();
  $posthog().capture("survey sent", {
    $survey_id: surveyID, // required
    $survey_response: value // required
  });
};

</script>
```

Our survey is now ready to go! The next step is ship the changes, get responses, and view your results.

## 4. View results

After interacting with your survey, you can view results by selecting the survey from the [surveys tab](https://us.posthog.com/surveys). You'll see data on:

- How many users have seen the survey.
- How many users have dismissed the survey.
- Responses.

You can also filter these results based on [user properties](/docs/product-analytics/user-properties), [cohorts](/docs/data/cohorts), [feature flags](/docs/feature-flags/creating-feature-flags) and more.

<ProductScreenshot
  imageLight={ImgSurveyResultsLight} 
  imageDark={ImgSurveyResultsDark} 
  alt="Survey results" 
  classes="rounded"
/>

## Further reading

- [How to write great product survey questions (with examples)](/blog/product-survey-questions)
- [Get feedback and book user interviews with surveys](/tutorials/feedback-interviews-site-apps)
- [How to set up A/B tests in Nuxt](/tutorials/nuxtjs-ab-tests)