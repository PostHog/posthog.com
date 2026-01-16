---
title: 'Testing frontend feature flags with React, Vitest, and PostHog'
date: 2025-04-01
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - feature flags
---
 

Combining both testing and feature flags can be a bit tricky. Tests generally check only one variant of the feature flag and leave other code untested. If you want to test the code behind feature flags, you must set up your tests to do so.

To do this, you need to mock the flags to access the other variations. This tutorial shows you how to do that by creating a React app with Jest tests, adding PostHog, then setting up tests that work with feature flags by mocking PostHog.

## Creating a React app with Vite and setting up Vitest

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer), and then create a new React app with Vite. We named ours `flag-test`.

```bash
npm create vite@latest flag-test -- --template react
```

Next, in the newly created `flag-test` folder, we install Vitest and its requirements:

```bash
cd flag-test
npm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Since we're about to test `components` directly, we must create a file called `vitest.setup.js` at our project root and import the required dependency:

```js
// ./vitest.setup.js
import '@testing-library/jest-dom'
```

With the dependency installed in our project, the next step is to let the `vite.config.js` know the new testing setup configurations by adding the `test` property:

```js
// ./vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ 
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js'
  },
})
```

Now, we're ready to set up our first test. Since **vite-react** already provided a sample component `src/App.jsx`, we can create a new file called `src/App.test.jsx` and test it:

```js
// ./src/App.test.jsx
import { expect, test } from 'vitest'
import { render, screen } from "@testing-library/react";
import App from './App';

test('renders learn link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn/i);
  expect(linkElement).toBeInTheDocument();
});
```

This test uses **Vitest**, a popular JavaScript testing library. It passes when all the default code is in place and is a test to build on as we build out our app.

To run the tests, update your `package.json` with the new script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

With everything set up, we can finally run our tests: 

```bash
npm test
```

![Test](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/test-frontend-feature-flags/test.png)

## Adding PostHog

If we’ve created our React app and run our first test, we want to add PostHog. First, we need a PostHog instance ([sign up for free](https://app.posthog.com/signup)). We then need our project API key and instance address from it. Once we have them, in our React app, install `posthog-js`:

```bash
npm i posthog-js
```

Next, add the `PostHogProvider` to `main.jsx`. This enables access to PostHog throughout your React app.

```js
// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react'
import App from './App';

posthog.init(
  "<ph_project_api_key>",
  {
    api_host: "<ph_client_api_host>",
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  	<PostHogProvider client={posthog}>
	  <App />
  	</PostHogProvider>
  </StrictMode>
)
```

With this setup, events are automatically captured, and we can set up our [React feature flag](/tutorials/react-feature-flags).

## Setting up our feature flag

In PostHog, go to the "Feature Flags" tab and click the "New feature flag" button. Set the key to `test-flag` and the release condition to 100% of users then click "Save."

With the flag created, go to  `src/App.jsx` in our React app, import `useFeatureFlagEnabled` from `@posthog/react`, and use it to check the `test-flag`. We have access to this because we set up the `PostHogProvider` earlier. We then conditionally render either a link to PostHog if the flag is enabled or the default "Learn React" link if not. This looks like this:

```js
// src/App.jsx
import './App.css';
import { useFeatureFlagEnabled } from '@posthog/react'

function App() {
  const flagEnabled = useFeatureFlagEnabled('test-flag')

  return (
    <div className="App">
      <header className="App-header">
        { flagEnabled ?
          <a
            className="App-link"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to PostHog
          </a> : 
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        }
      </header>
    </div>
  );
}

export default App;
```

When we run the app again, the main link on the page changed to "Go to PostHog."

![Go to PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_27_at_09_52_49_2x_65390628c1.png)

## Making our tests and feature flags work together

When we run tests now, it still passes, but only tests part of the code. To test all of it, we must handle feature flags by mocking PostHog. 

Luckily, Vitest provides a mock service natively. You can use it by importing the `vi` dependency from `vitest`, which also has compatibility with the Jest API.

In `src/App.test.jsx`, mock `useFeatureFlagEnabled`. Create a new test where the mocked `useFeatureFlagEnabled` function return `true`, then checks the "Go to PostHog" version of the flag.

```js
// src/App.test.jsx
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from 'vitest';
import App from './App';

const mockUseFeatureFlagEnabled = vi.fn()

vi.mock('@posthog/react', () => ({
    useFeatureFlagEnabled: () => mockUseFeatureFlagEnabled(),
}))

test('renders learn react link', () => {
    mockUseFeatureFlagEnabled.mockReturnValueOnce(false);

    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders go to posthog link', () => {
    mockUseFeatureFlagEnabled.mockReturnValueOnce(true);

    render(<App />);
    const linkElement = screen.getByText(/go to posthog/i);
    expect(linkElement).toBeInTheDocument();
});
```

This tests both variants of the flag. You can use this mocking strategy to test other PostHog methods, components, and code throughout your app.

## Further reading

- [Master Feature Flags: Best practice, tips and examples](/blog/feature-flag-best-practices)
- [How to run Experiments without feature flags](/docs/experiments/running-experiments-without-feature-flags)
- [How to do a canary release with feature flags in PostHog](/tutorials/canary-release)

<NewsletterForm />
