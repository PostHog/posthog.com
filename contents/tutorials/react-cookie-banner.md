---
title: Building a tracking cookies consent banner in React
sidebar: Docs
showTitle: true
featuredVideo: 'https://www.youtube-nocookie.com/embed/KRW5jxZ4H-I'
featuredTutorial: false
date: 2022-10-03
author:
  - ian-vanagas
tags:
  - configuration
  - product os
---

- **Level:** Medium 🦔🦔
- **Estimated reading time:** 12 minutes ☕️☕️

If you’ve spent any time online, you’ve seen a cookie consent banner. Because of GDPR and other worldwide internet privacy regulations, some sites need to get consent to track users and use cookies. Providing visitors an easy way to opt in or out of tracking and cookies is often required.

PostHog uses cookies to identify and track users as well as manage user and application information across sessions. They enable us to provide more information to about your products and help you build better experiences for your users. 

PostHog provides a simple way to implement tracking and cookies opt out (or in). In this tutorial, we are going to build a simple banner with React, JavaScript, and HTML for users to opt out of (or allow) PostHog’s tracking and cookies.

To complete this tutorial, you’ll need to  a [PostHog instance](/docs/getting-started/cloud) as well as [Node installed](https://nodejs.org/en/download/) (to install, manage, and run React).

## Step 1: Setting up React

We are going to use the popular JavaScript framework [React](https://reactjs.org/) for this tutorial, but this works for other [JavaScript](/docs/integrate/client/js) frameworks as well. To get started with our React project, head into command line, create a folder for our project, then install and create the app (we are naming ours `client`).

```bash
mkdir react_cookie_banner
cd react_cookie_banner
npx create-react-app client
cd client
npm start
```

Running these commands gives us a working React app.

![React app](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/react-cookie-banner/react-app.png)

## Step 2: Setting up PostHog

Next, we want to set up PostHog to track activity on our site. To do this, first, we’ll install the `posthog-js` package.

```bash
npm install --save posthog-js
```

Next, we’ll go into our client code at `client/src/index.js` to get PostHog initiated. We’ll import PostHog and run `posthog.init` with our project key and instance address.

```js
// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import posthog from 'posthog-js'; // new

posthog.init( // new
  '<ph_project_api_key>', { api_host: '<ph_instance_address>' }
) 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Once done, we can visit our site running locally, and we’ll start to see events in our PostHog instance. For now, the captured events are only the [autocaptured](/docs/data/autocapture) ones. You can use the `posthog-js` library to capture many more as well as more information. Check out our [event tracking guide](/tutorials/event-tracking-guide) to learn more.

![Live events](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/react-cookie-banner/live-events.png)

When we head back to our local site, right-click, choose inspect, go to the Application tab, and check cookies, you’ll see we’ve created a tracking cookie with details about PostHog and the user. 

![App cookie](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/react-cookie-banner/app-cookie.png)

## Step 3: Building the banner component

Now that we have our site and PostHog library set up, it is time to create the banner. To start, we can create a `CookieBanner.js` file in our `src` folder (where the rest of our React code is).

```bash
cd src
touch CookieBanner.js
```

In the `CookieBanner.js` file, we’ll create a basic React component function with wording about cookies and accept or decline buttons.

```js
// CookieBanner.js

function CookieBanner() {
  return (
    <div>
      <p>
        We use tracking cookies to understand how you use the product 
        and help us improve it.
        Please accept cookies to help us improve.
      </p>
      <button type="button">Accept cookies</button>
      <button type="button">Decline cookies</button>
    </div>
  );
}

export default CookieBanner;
```

We’ll then add the new CookieBanner component into `App.js`.

```js
// App.js

import logo from './logo.svg';
import './App.css';
import CookieBanner from './CookieBanner'; // new

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <CookieBanner /> {/* new */}
    </div>
  );
}

export default App;
```

When we head back to the local site, we’ll see our cookie banner at the bottom of the site. We’ll not be winning any design awards with this one, but it does work. 

![Tutorial banner](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/react-cookie-banner/final-banner.png)

> 💯: For bonus points, you can click each of the buttons and go view the associated events in your PostHog instance.

## Step 4: Adding the opt out (or in) logic

Next, we’ll add the logic for accepting or declining the tracking cookies. We’ll head back to our `CookieBanner.js` component, import the PostHog library, and add click handlers for the buttons.

```js
// CookieBanner.js

import posthog from 'posthog-js' // new

function CookieBanner() {
  
  const acceptCookies = () => { 
    posthog.opt_in_capturing(); // new
  };

  const declineCookies = () => {
    posthog.opt_out_capturing(); // new
  };

  return (
    <div>
      <p>
        We use tracking cookies to understand how you use the product 
        and help us improve it.
        Please accept cookies to help us improve.
      </p>
      <button type="button" onClick={acceptCookies}>  {/* new */}
        Accept Cookies
      </button>
      <button type="button" onClick={declineCookies}> {/* new */}
        Decline Cookies 
      </button> 
    </div>
  );
}

export default CookieBanner;
```

Now, when we head back to our site, we can click accept or decline. By inspecting and clicking the Application tab again, we can see our decision stored in local storage. If declined, we’ll also see our tracking cookie was deleted.

![App local storage](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/react-cookie-banner/app-local.png)

## Step 5: Making the banner conditional

We don’t want to show users our beautiful cookie banner all the time. We can hide it once users make a decision and not load the banner when they come back to our site.  

To do this, we can use the `posthog.has_opted_out_capturing` and `posthog.has_opted_in_capturing` methods. Back in `App.js`, we can add the logic to conditionally render the component depending on if users already made a tracking cookie decision.

```js
// App.js

import logo from './logo.svg';
import './App.css';
import CookieBanner from './CookieBanner'; 
import posthog from 'posthog-js' // new

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {posthog.has_opted_out_capturing() // new
      ||posthog.has_opted_in_capturing() 
        ? null 
        : <CookieBanner /> 
      }
    </div>
  );
}

export default App;
```

Finally, we want to hide the banner when users make a decision. We’ll add a `showBanner` state to our `CookieBanner.js` component and set it to false once an option is chosen. We’ll then use the showBanner state to conditionally render the content of the component.

```js
// CookieBanner.js

import posthog from 'posthog-js'
import { useState } from 'react'; // new

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true); // new
  
  const acceptCookies = () => { 
    posthog.opt_in_capturing();
    setShowBanner(false); // new
  };

  const declineCookies = () => {
    posthog.opt_out_capturing();
    setShowBanner(false); // new
  };

  return (
    <div>
      {showBanner && ( // new
        <div>
          <p>
            We use tracking cookies to understand how you use the product 
            and help us improve it.
            Please accept cookies to help us improve.
          </p>
          <button type="button" onClick={acceptCookies}>
            Accept Cookies
          </button>
          <button type="button" onClick={declineCookies}>
            Decline Cookies
          </button>
        </div>
      )}
    </div>
  );
}

export default CookieBanner;
```

## Step 6: Testing it all out

To make sure everything works, try the following steps:

- Go to the site.
- Delete your PostHog key in local storage (found in the Application tab after inspecting).
- Reload the site then click accept or decline on the banner.
- Check the banner disappears.
- Reload the page.
- Check that the banner doesn’t load.

If all that works, you’ve done it. You’ve set up a basic tracking cookies consent banner in React. From here, you can customize it to your needs (such as adding other cookies) and the rest of your site’s design.

## Beyond cookie consent banners

If you’re interested in going further into tracking, data management, and cookies, check out these other resources:

1. A tutorial on [setting up cookieless tracking](/tutorials/cookieless-tracking).
2. A guide to [setting up a reverse proxy](/docs/integrate/proxy) to help your data stay first-party.
3. Sign up for our [EU Cloud](https://eu.posthog.com/signup).
