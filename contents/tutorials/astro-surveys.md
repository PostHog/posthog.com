---
title: How to set up surveys in Astro
date: 2024-01-30
author:
  - lior-neu-ner
showTitle: true
sidebar: Docs
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/banners/tutorial-12.png
tags:
  - surveys
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/astro-surveys/events-light.png"
export const EventsDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/astro-surveys/events-dark.png"
export const ImgSurveyResultsLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/astro-surveys/survey-results-light.png"
export const ImgSurveyResultsDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/astro-surveys/survey-results-dark.png"
export const ImgSurveyTemplatesLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/astro-surveys/survey-templates-light.png"
export const ImgSurveyTemplatesDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/astro-surveys/survey-templates-dark.png"

[Surveys](/docs/surveys) are a great way to get feedback from your users. In this guide, we show you how to add a survey to your Astro app.

We'll create a basic Astro app, add PostHog, create a survey, and then show you how to display the survey in the app and get responses.

## 1. Create an Astro app

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer). Then, create a new Astro app:

```bash
npm create astro@latest
```

When prompted in the command line, name your new project directory (we chose `astro-survey`), start your new project `Empty`, choose `No` for TypeScript, `Yes` for install dependencies, and `No` for git repository.

Next, replace the code in `src/pages/index.astro` with a simple heading:

```js file=index.astro
---

---
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>Astro</title>
	</head>
	<body>
		<h1>Astro Surveys</h1>
	</body>
</html>
```

Run `npm run dev` and navigate to `http://localhost:4321` to see your app in action.

![Basic Astro app](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/astro-surveys/basic-app.png)

## 2. Add PostHog

We use PostHog to create and control our survey as well as monitor results. If you don't have a PostHog instance, you can [sign up for free here](https://us.posthog.com/signup). 

To start, create a new `components` folder in the `src` folder. In this folder, create a `posthog.astro` file

```bash
cd ./src
mkdir components
cd ./components
touch posthog.astro
```

In this file, add your PostHog `Web snippet`. You can find this in [your project settings](https://us.posthog.com/settings/project#snippet).

```astro file=posthog.astro
---

---
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(
    '<ph_project_api_key>',
    {
      api_host:'<ph_instance_address>',
    }
  )
</script>
```

The next step is to a create a [Layout](https://docs.astro.build/en/core-concepts/layouts/) where we will use `posthog.astro`. Create a new folder `layouts` in `src` and then a new file `Layout.astro`:

```bash
cd ../../src
mkdir layouts
cd ./layouts
touch Layout.astro
```

Add the following code to `Layout.astro`:

```astro file=Layout.astro
---
import PostHog from '../components/posthog.astro'
---
<head>
	<PostHog />
</head>
```

Lastly, update `index.astro` to use the new Layout:

```astro file=index.astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout>
	<html lang="en">
		<head>
			<meta charset="utf-8" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<meta name="viewport" content="width=device-width" />
			<meta name="generator" content={Astro.generator} />
			<title>Astro</title>
		</head>
		<body>
			<h1>Astro Surveys</h1>
		</body>
	</html>
</Layout>
```

Once you’ve done this, reload your app and you should see events appearing in the [PostHog events explorer](https://us.posthog.com/events).

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

This is the simplest option. PostHog has a variety of [survey templates](/templates?filter=type&value=survey) to choose from, handles all the display logic, and captures responses for you. You can also customize the questions, branding, and targeting as needed – see our [survey docs](/docs/surveys/creating-surveys) for more details on how to do so.
 
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

![Popover survey in app](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/astro-surveys/popover-survey.png)

### Option 2: Implement your own survey UI

If you prefer to have complete control of your survey UI and logic, you can still use PostHog to keep track of and analyze your results.

First, create a survey in PostHog like in option 1 above (for this tutorial, we use a Net Promoter Score survey template). The only difference is you must set `Presentation` to **API**.

Then, there are four parts to adding code for our custom survey:

1. Create the survey UI.
2. Fetch the survey from PostHog.
3. Add the logic for displaying and hiding it.
4. Capture interactions from it.

To show you how to do this, we've created a sample survey UI for this tutorial. Although it's written in pure HTML + JavaScript, the same concepts apply if you're using any UI frameworks in your Astro project – such as [React](/tutorials/react-surveys) or [Vue](/tutorials/vue-surveys).

#### 1. Create the survey UI

First create a new file in your `components` directory called `CustomSurvey.astro`:

```bash
cd ../components
touch CustomSurvey.astro
```

Paste the following code into `CustomSurvey.astro`

```astro file=src/components/CustomSurvey.astro
---

---
<div class="survey">
  <h2 id="survey-title">Survey Title</h2>
  <div>
    {Array.from({ length: 10 }, (_, i) => i + 1).map(i => (
      <button key={i} class="button" id={`button-${i}`}>{i}</button>
    ))}
  </div>
  <div>
    <button class="button" id="dismiss-button">Dismiss</button>
  </div>
</div>

<script>
  function emitDismiss() {
    const event = new CustomEvent('dismiss_survey');
    window.dispatchEvent(event);
  }

  function emitSubmit(value) {
    const event = new CustomEvent('submit_survey', { detail: value });
    window.dispatchEvent(event);
  }

  document.getElementById('dismiss-button').addEventListener('click', emitDismiss);

  for (let i = 1; i <= 10; i++) {
    document.getElementById(`button-${i}`).addEventListener('click', function() {
      emitSubmit(i);
    });
  }
</script>

<style>
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

Then, in `src/pages/index.astro`, import your new component and add the button event handlers in a `<script>` in the body:

```astro file=index.astro
---
import Layout from '../layouts/Layout.astro';
import CustomSurvey from '../components/CustomSurvey.astro';
---
<Layout>
	<html lang="en">
		<head>
			<meta charset="utf-8" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<meta name="viewport" content="width=device-width" />
			<meta name="generator" content={Astro.generator} />
			<title>Astro</title>
		</head>
		<body>
			<h1>Astro Surveys</h1>
			<CustomSurvey class="survey" />
			
			<script>
				function toggleSurveyDisplay(show) {
				  const surveyElement = document.querySelector('.survey');
				  if (surveyElement) {
				    surveyElement.style.display = show ? 'block' : 'none';
				  }
				}

				function handleDismiss() {
					toggleSurveyDisplay(false);
				}

				function handleSubmit(event) {
					toggleSurveyDisplay(false);
				}

				if (typeof window !== 'undefined') {
				  window.addEventListener('dismiss_survey', handleDismiss);
				  window.addEventListener('submit_survey', handleSubmit);
				}
			</script>

		</body>
	</html>
</Layout>
```

This shows a survey popup every time you visit your app's homepage.

![Custom survey UI](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/astro-surveys/sample-survey-ui.png)

#### 2. Fetch the survey from PostHog

PostHog keeps track of all active surveys for a user. This is especially helpful if you set up [custom targeting options](/docs/surveys/creating-surveys#targeting). 

To fetch the active surveys, we use `posthog.getActiveMatchingSurveys()`. This returns an array of survey objects that looks like this:

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

To fetch this array and integrate it with your survey UI, update your `<script>` in `index.astro`:

```astro file=index.astro
---
import Layout from '../layouts/Layout.astro';
import CustomSurvey from '../components/CustomSurvey.astro';
---
<Layout>
	<html lang="en">
		<head>
			// your existing code
		</head>
		<body>
			// your existing code
      			
			<script>
				let surveyID = '';
				document.addEventListener('DOMContentLoaded', async () => {
					window.posthog.getActiveMatchingSurveys((surveys) => {
						if (surveys.length > 0) {
							const survey = surveys[0];
							document.getElementById('survey-title').textContent = survey.questions[0].question;
							surveyID = survey.id;
						}
					});
				});

				// your existing code
				
			</script>

		</body>
	</html>
</Layout>
```

#### 3. Add the logic for displaying and hiding it.

We want to make sure we don't show the survey again to users who have either submitted or dismissed it. We use [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to store this data and use it to check whether to show the survey or not.

```astro file=index.astro
---
import Layout from '../layouts/Layout.astro';
import CustomSurvey from '../components/CustomSurvey.astro';
---
<Layout>
	<html lang="en">
		<head>
			// your existing code
		</head>
		<body>
			// your existing code
			
			<script>
				let surveyID = '';
				document.addEventListener('DOMContentLoaded', async () => {
					window.posthog.getActiveMatchingSurveys((surveys) => {
						if (surveys.length > 0) {
							const survey = surveys[0];
							document.getElementById('survey-title').textContent = survey.questions[0].question;
							surveyID = survey.id;

							// Check if user has already interacted with the survey
							const hasInteractedWithSurvey = localStorage.getItem(`hasInteractedWithSurvey_${surveyID}`);
							toggleSurveyDisplay(!hasInteractedWithSurvey);
						}
					});
				});

				function toggleSurveyDisplay(show) {
 					// your existing code
				}

				function handleDismiss() {
					toggleSurveyDisplay(false);
					localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
				}

				function handleSubmit(event) {
					toggleSurveyDisplay(false);
					localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
				}

				// your existing code
			</script>

		</body>
	</html>
</Layout>
```

Lastly, update the CSS in `CustomSurvey.astro` so that the survey is hidden by default:

```astro file=CustomSurvey.astro
---

---
// Your existing code

<style>
  .survey {
    display: none; /* add this line */
    /* rest of your CSS */ 
  }

  /* rest of your CSS */ 
<style>
```

#### 4. Capture interactions from it.

The final step in setting up our survey is capturing interactions. This enables us to analyze the results in PostHog. 

There are 3 events to capture:

1. `"survey shown"`
2. `"survey dismissed"`
3. `"survey sent"` (for responses)

You can capture these events using `posthog.capture()`:

```astro file=index.astro
---
import Layout from '../layouts/Layout.astro';
import CustomSurvey from '../components/CustomSurvey.astro';
---
<Layout>
	<html lang="en">
		<head>
			// your existing code
		</head>
		<body>
			// your existing code
			
			<script>
				// your existing code

				function toggleSurveyDisplay(show) {
				  const surveyElement = document.querySelector('.survey');
				  if (surveyElement) {
						surveyElement.style.display = show ? 'block' : 'none';

						if (show) {
						  window.posthog.capture("survey shown", {
						    $survey_id: surveyID // required
						  })
						}
					}
				}

				function handleDismiss() {
					toggleSurveyDisplay(false);
					localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
					window.posthog.capture("survey dismissed", {
						$survey_id: surveyID // required
					})
				}

				function handleSubmit(event) {
					toggleSurveyDisplay(false);
					localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
					window.posthog.capture("survey sent", {
						$survey_id: surveyID, // required
						$survey_response: event.detail // required. Convert numbers to string
					})
				}

				// your existing code
			</script>

		</body>
	</html>
</Layout>
```

Altogether, your `index.astro` should look like this:

```astro file=index.astro
---
import Layout from '../layouts/Layout.astro';
import CustomSurvey from '../components/CustomSurvey.astro';
---
<Layout>
	<html lang="en">
		<head>
			<meta charset="utf-8" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<meta name="viewport" content="width=device-width" />
			<meta name="generator" content={Astro.generator} />
			<title>Astro</title>
		</head>
		<body>
			<h1>Astro Surveys</h1>
			<CustomSurvey class="survey" />
			
			<script>
				let surveyID = '';
				document.addEventListener('DOMContentLoaded', async () => {
					window.posthog.getActiveMatchingSurveys((surveys) => {
						if (surveys.length > 0) {
							const survey = surveys[0];
							document.getElementById('survey-title').textContent = survey.questions[0].question;
							surveyID = survey.id;

							// Check if user has already interacted with the survey
							const hasInteractedWithSurvey = localStorage.getItem(`hasInteractedWithSurvey_${surveyID}`);
							toggleSurveyDisplay(!hasInteractedWithSurvey);
						}
					});
				});

				function toggleSurveyDisplay(show) {
				  const surveyElement = document.querySelector('.survey');
				  if (surveyElement) {
				    surveyElement.style.display = show ? 'block' : 'none';

						if (show) {
							window.posthog.capture("survey shown", {
							  $survey_id: surveyID // required
							})
						}
				  }
				}

				function handleDismiss() {
					toggleSurveyDisplay(false);
					localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
					window.posthog.capture("survey dismissed", {
						$survey_id: surveyID // required
					})
				}

				function handleSubmit(event) {
					toggleSurveyDisplay(false);
					localStorage.setItem(`hasInteractedWithSurvey_${surveyID}`, 'true');
					window.posthog.capture("survey sent", {
						$survey_id: surveyID, // required
						$survey_response: event.detail // required. Convert numbers to string
					})
				}

				if (typeof window !== 'undefined') {
				  window.addEventListener('dismiss_survey', handleDismiss);
				  window.addEventListener('submit_survey', handleSubmit);
				}
			</script>

		</body>
	</html>
</Layout>
```

Our survey is now ready to go! The next step is to ship the changes, get responses, and view your results.

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

- [How to set up A/B tests in Astro](/tutorials/astro-ab-tests)
- [How to set up Astro analytics, feature flags, and more](/tutorials/astro-analytics)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)
