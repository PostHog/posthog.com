---
title: How to set up A/B tests in Astro
date: 2024-01-29
author: ["lior-neu-ner"]
tags: ['experimentation']
---

import { ProductScreenshot } from 'components/ProductScreenshot'
import EventsInPostHogLight from '../images/tutorials/astro-ab-tests/events-light.png'
import EventsInPostHogDark from '../images/tutorials/astro-ab-tests/events-dark.png'
import TestSetupLight from '../images/tutorials/astro-ab-tests/experiment-setup-light.png'
import TestSetupDark from '../images/tutorials/astro-ab-tests/experiment-setup-dark.png'

A/B tests help you make your Astro app better by enabling you to compare the impact of changes on key metrics. To show you how to set one up, we create a basic Astro app, add PostHog, create an A/B test, and implement the code for it.

## 1. Create an Astro app

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer). Then, create a new Astro app:

```bash
npm create astro@latest
```

When prompted in the command line, name your new project directory (we chose `astro-ab-test`), start your new project `Empty`, choose `No` for TypeScript, install dependencies, and `No` for git repository.


Next, replace the code in `src/pages/index.astro` with a simple heading and button:

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
		<h1>Astro A/B tests</h1>
		<button class="main-button">Click me!</button>
	</body>
</html>
```

Run `npm run dev` and navigate to http://localhost:4321 to see your app in action.

![Basic Astro app](../images/tutorials/astro-ab-tests/basic-app.png)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

Once done, go back to your Astro project and create a new `components` folder in the `src` folder. In this folder, create a `posthog.astro` file

```bash
cd ./src
mkdir components
cd ./components
touch posthog.astro
```

In this file, add your `Web snippet` which you can find in [your project settings](https://us.posthog.com/settings/project#snippet).

```astro file=posthog.astro
---

---
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(
    '<ph_project_api_key>',
    {
      api_host:'<ph_client_api_host>',
    }
  )
</script>
```

The next step is to a create a [Layout](https://docs.astro.build/en/core-concepts/layouts/) where we will use `posthog.astro`. Create a new folder `layouts` in `src` and then a new file `Layout.astro`:

```bash
cd .. && cd .. # move back to your base directory if you're still in src/components/posthog.astro
cd ./src
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
			<h1>Astro A/B tests</h1>
			<button class="main-button">Click me!</button>
		</body>
	</html>
</Layout>
```

Once you’ve done this, reload your app and click the button a few times. You should see events appearing in the [PostHog events explorer](https://us.posthog.com/events).

## 3. Capture a custom event

The first part of setting up our A/B test in PostHog is setting up the goal metric. We'll use the number of clicks on the button as our goal.

To measure this, we [capture a custom event](/docs/product-analytics/capture-events) `home_button_clicked` when the button is clicked. To do this, update the code in `posthog.astro` to add a `<script>` and call `posthog.capture()` when the button is clicked.

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
			<h1>Astro A/B tests</h1>
			<button class="main-button">Click me!</button>

			<script>
				const button = document.querySelector('.main-button');
				button.addEventListener('click', () => {
					window.posthog.capture('home_button_clicked')
				});
			</script>	
		</body>
	</html>
</Layout>
```

With this set up, refresh your app and click the button a few times to see the event captured in PostHog.

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Events captured in PostHog" 
  classes="rounded"
/>

## 4. Create an A/B test in PostHog

If you haven't done so already, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include A/B testing. This requires entering your credit card, but don't worry, we have a [generous free tier](/pricing) of 1 million requests per month – so you won't be charged anything yet.

Next, go to the [A/B testing tab](https://us.posthog.com/experiments) and create an A/B test by clicking the **New experiment** button. Add the following details to your experiment:

1. Name it "My cool experiment".
2. Set "Feature flag key" to `my-cool-experiment`.
3. Under the experiment goal, select the `home_button_clicked` event we created in the previous step.
4. Use the default values for all other fields.

Click "Save as draft" and then click "Launch".

<ProductScreenshot
  imageLight={TestSetupLight} 
  imageDark={TestSetupDark} 
  alt="Experiment setup in PostHog" 
  classes="rounded"
/>

## 5. Implement the A/B test code

When it comes to implementing our experiment code, there are two options:

1. Client-side rendering
2. Server-side rendering

We'll show you how to implement both.

### Client-side rendering

To implement the A/B test, we fetch the `my-cool-experiment` flag when the page component is mounted using [`posthog.onFeatureFlags`](/docs/libraries/js#ensuring-flags-are-loaded-before-usage). Then, we update the button text based on whether the user is in the `control` or `test` variant of the experiment.

Update the code in the existing `<script>` to implement `posthog.onFeatureFlags`:

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
			<h1>Astro A/B tests</h1>
			<button class="main-button">Click me!</button>

			<script>
				const button = document.querySelector('.main-button');
				button.addEventListener('click', () => {
					window.posthog.capture('home_button_clicked')
				});

				window.posthog.onFeatureFlags(() => {
					if (posthog.getFeatureFlag('my-cool-experiment') === 'control') {
						button.innerText = 'Control variant';
					} else if (posthog.getFeatureFlag('my-cool-experiment') === 'test') {
						button.innerText = 'Test variant';
					}
				});
    	</script>	
		</body>
	</html>
</Layout>
```

Now if you refresh your app, you should see the button text updated to either `Control variant` or `Test variant`.  Users are automatically split between the two, PostHog continues to track button clicks, and you can view the results of the A/B test in PostHog.

### Server-side rendering

Notice that when you refresh the page, the button text flickers between `Click me!` and `Control/Test variant`. This is because it takes time for PostHog to load and make the feature flag request.

Server-side rendering is a way to avoid this. This fetches the feature flag before the page loads on the client.

To set this up, we must install and use [PostHog’s Node library](/libraries/node) (because we are making server-side requests).

```bash
npm install posthog-node
```

In the `src` folder, create a `posthog-node.js` file. This is where we set up the code to create the PostHog Node client. You can find both your API key and instance address in your [project settings](https://us.posthog.com/project/settings).

```js file=src/posthog-node.js
import { PostHog } from 'posthog-node';

let posthogClient = null;

export default function PostHogNode() {
  if (!posthogClient) {
    posthogClient = new PostHog('<ph_project_api_key>', {
      host: '<ph_client_api_host>',
    });
  }
  return posthogClient;
}
```

Next, we import `posthog-node.js` into `pages/index.astro`. Then we use it to fetch the feature flag and update the button text:

```astro file=index.astro
---
import Layout from '../layouts/Layout.astro';
import PostHogNode from '../posthog-node.js';

let buttonText = 'No variant'
try {
  const distinctId = 'placeholder-user-id'
  const enabledVariant = await PostHogNode().getFeatureFlag('my-cool-experiment', distinctId);
  if (enabledVariant === 'control') {
		buttonText = 'Control Variant';
	} else if (enabledVariant === 'test') {
		buttonText = 'Test Variant';
	}
} catch (error) {
  buttonText = 'Error';
}
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
			<h1>Astro A/B tests</h1>
			<button class="main-button">{buttonText}</button>

			<script>
				const button = document.querySelector('.main-button');
				button.addEventListener('click', () => {
					window.posthog.capture('home_button_clicked')
				});
    	</script>	
		</body>
	</html>
</Layout>
```

Now, when you refresh the page, the button text is already set when the page loads. 

#### Setting the correct `distinctId`

You may notice that we set `distinctId = 'placeholder-user-id'` in our flag call above. In production apps, to ensure you fetch the correct flag value for your user, `distinctId` should be set to their unique ID. 

For logged-in users, you typically use their email as their `distinctId`. However, for logged-out users, you can use the `distinct_id` property from their PostHog cookie:

```astro file=index.astro
---
import Layout from '../layouts/Layout.astro';
import PostHogNode from '../posthog-node.js';

const projectAPIKey = '<ph_project_api_key>';
const cookie = Astro.cookies.get(`ph_${projectAPIKey}_posthog`);
let buttonText = 'No variant'
if (cookie && cookie.json().distinct_id) {
	try {
		const distinctId = cookie.json().distinct_id;
		const enabledVariant = await PostHogNode().getFeatureFlag('my-cool-experiment', distinctId);
		if (enabledVariant === 'control') {
			buttonText = 'Control Variant';
		} else if (enabledVariant === 'test') {
			buttonText = 'Test Variant';
		}
	} catch (error) {
		buttonText = 'Error';
	}
}
---

<!-- reset of your code -->
```

Note that `Astro.request.headers` is not available for static sites. If you want to access the request cookies, you need to set your `output` to `server` or `hybrid` in `astro.config.mjs`:

```js file=astro.config.mjs
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: "server",
});
```

## Further reading

- [How to set up Astro analytics, feature flags, and more](/tutorials/astro-analytics)
- [How to set up surveys in Astro](/tutorials/astro-surveys)
- [A software engineer's guide to A/B testing](/product-engineers/ab-testing-guide-for-engineers)