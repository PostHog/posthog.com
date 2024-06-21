---
title: Product analytics for browser extensions
sidebar: Docs
showTitle: true
---

Do you have a Firefox or Chrome browser plugin with a user interface and want to understand how it's being used? PostHog is the perfect way to do just that.

## Setup for Firefox & Chrome plugins

### Installing PostHog inside your plugin

Open the HTML file used in your `default_popup` and add the PostHog `array.js` script. To do this you'll need to either:
1. Copy the latest version of `array.js` from [PostHog's static assets](https://us-assets.i.posthog.com/static/array.js) and import it locally using `<script src="array.js" />` before the `</head>` tag
2. If you're packaging your plugin automatically use the [npm module for posthog.js](https://www.npmjs.com/package/posthog-js)

All you need to do now is initialize PostHog, add the following code to a new js file and import it into your `default_popup` html file to initiate PostHog.

```js-web
posthog.init('your_project_token',{api_host:'<ph_client_api_host>',persistence:'localStorage'})
```

* `your_project_token` - This is the ``Project API key`` which can be found on PostHog under [Project Settings](https://app.posthog.com/project/settings)
* `api_host` - This is the URL to your PostHog instance (if you're not using PostHog Cloud)
* `persistence` - This indicates we should store user data in localStorage rather than cookies - there are issues with cookie persistence on Firefox plugins

### Tracking events

One of the best things about using PostHog is, all the interactions like clicks will automatically generate events in PostHog, so you don't need to do anything else to start analyzing.

If you'd like to instrument your own custom events, all you need to do is:

```js-web
posthog.capture('custom_event_name', {})
```

[See our browser JS library guide for](https://posthog.com/docs/integrate/client/js) more details

### Session replay

Due to the new [content security policies](https://developer.chrome.com/docs/extensions/develop/migrate/improve-security) in Manifest v3 about unsafe-eval and remote code execution, importing only `array.js` isn't enough since the `array.js` code will try to load the the recorder from the PostHog CDN. This will be blocked by the browser.

To fix this instead of importing the `array.js`, you can import the `array.full.js`, follow the install step 1. but instead of using the former use the latter from PostHog's [full static assets](https://us-assets.i.posthog.com/static/array.full.js), also remember to change the `script src` to `array.full.js` or follow the install step 2. and install the [npm module for posthog.js](https://www.npmjs.com/package/posthog-js).

Import the recorder to avoid the remote code execution if using the script from the step 1.

```js
import "posthog-js/dist/recorder.js"
```

Import the recorder to avoid the remote code execution if using the npm module from step 2.

```js
import rrwebRecord from "posthog-js/dist/recorder"
```
