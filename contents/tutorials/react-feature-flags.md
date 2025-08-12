---
title: How to set up React feature flags with Vite
date: 2025-03-07
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - feature flags
---

[Feature flags](/docs/feature-flags) help you release features and conditionally show content in your React apps. This tutorial shows you how to create a React app with Vite, add PostHog, create a feature flag, and then implement the flag to control content in your app.

## Create your React app with Vite

First, we create our React app using Vite and go into the newly created `react-flags` folder.

```bash
npm create vite@latest react-flags -- --template react
cd react-flags
npm install
```

We then remove the boilerplate code in `src/App.jsx` to simplify it to just a title.

```jsx
// src/App.jsx
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Welcome to my React app</h1>
    </div>
  )
}

export default App
```

Finally, run `npm run dev` and go to `http://localhost:5173` to see our new homepage.

![App homepage](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_07_at_10_26_45_2x_f2c1cdb8eb.png)

## Adding PostHog

Since PostHog handles the management and evaluation of feature flags, we must set it up in our app. To do this, start by installing the `posthog-js` library to get access to the [React SDK](/docs/libraries/react).

```bash
npm install posthog-js
```

Once installed, import PostHog into `src/main.jsx` and set it up using your project API key and host from [your project settings](https://us.posthog.com/settings/project). Wrap your app in the React `PostHogProvider` to access PostHog in any component.

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
)
```

Once done, start your app again with `npm run dev` and you should see an event autocaptured into PostHog.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_07_at_10_39_45_2x_d42f3e8b87.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_07_at_10_39_27_2x_2bfdbac1b1.png"
  alt="Events in PostHog"
  classes="rounded"
/>

## Creating a feature flag

With PostHog set up, your React app is ready for feature flags. 

To create one, go to the [feature flags tab](https://app.posthog.com/feature_flags) in PostHog and click **New feature flag**. Enter a flag key (like `cool-react-homepage`), set the release condition to roll out to 100% of users, and press **Save**.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_07_at_10_34_56_2x_5ccc746eef.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_07_at_10_35_17_2x_7a736cad45.png"
  alt="Creating a feature flag in PostHog"
  classes="rounded"
/>

You can customize your conditions with percentage and person or group properties to fit your needs.

## Adding our feature flag

Once created, we can add our feature flag to our React app. We do this using the `useFeatureFlagEnabled` hook to conditionally show new content in our component.

```jsx
// src/App.jsx
import './App.css'
import { useFeatureFlagEnabled } from 'posthog-js/react'

function App() {
  
  const flagEnabled = useFeatureFlagEnabled('cool-react-homepage')

  return (
    <div className="App">
      {flagEnabled ? 
        <h1>Welcome to my cool new React app</h1> 
        : 
        <h1>Welcome to my React app</h1>
      }
    </div>
  )
}

export default App
```

With the flag enabled, our app now shows "Welcome to my cool new React app."

![New app after adding the flag](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_07_at_10_37_26_2x_063e62f039.png)

> **Want to remove the flicker while loading?** Read our tutorial on [How to bootstrap feature flags in React with Vite and Express](/tutorials/bootstrap-feature-flags-react).

### Using the PostHog feature component

An alternate way to implement feature flags is to use the `PostHogFeature` React component. This simplifies the logic of using flags as well as captures related usage automatically (such as a `$feature_view` event). We set the old content as the fallback for the component.

```jsx
// src/App.jsx
import './App.css'
import { PostHogFeature } from 'posthog-js/react'

function App() {
  
  return (
    <div className="App">
      <PostHogFeature 
        flag='cool-react-homepage' 
        match={true} 
        fallback={<h1>Welcome to my React app</h1>}
      >
        <h1>Welcome to my cool new React app</h1> 
      </PostHogFeature>
    </div>
  )
}

export default App
```

These are basic implementations of React feature flags setup. From here, you can set up [A/B tests](/experiments), a [public beta program](/tutorials/public-beta-program), or [canary releases](/tutorials/canary-release).

## Further reading

- [Testing frontend feature flags with React, Jest, and PostHog](/tutorials/test-frontend-feature-flags)
- [How to add popups to your React app with feature flags](/tutorials/react-popups)
- [How to bootstrap feature flags in React with Vite and Express](/tutorials/bootstrap-feature-flags-react)

<NewsletterForm />