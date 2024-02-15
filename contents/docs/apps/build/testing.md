---
title: Testing
---

In order to ensure apps are stable and work as expected for all their users, we highly recommend writing tests for every app you build.

### Adding testing capabilities to your app
You will need to add jest and our app testing scaffold to your project in your `package.json` file:
```json
"jest": {
    "testEnvironment": "node"
},
"scripts": {
    "test": "jest ."
},
"devDependencies": {
    "@posthog/plugin-scaffold": "0.10.0",
    "jest": "^27.0.4"
}
```

Create your test files e.g. `index.test.js` or `index.test.ts` for testing your `index.js` or `index.ts` file

### Writing tests

Write tests in jest, you can learn more about the syntax and best practices in the [jest documentation](https://jestjs.io/docs/getting-started). We recommend writing tests to cover the primary functions of your app (e.g. does it create events in the expected format) and also for edge cases (e.g. does it crash if no data is sent).

### Using the app scaffold

Since most PostHog apps are likely to rely on PostHog specific features like "processEvent" we have a number of helper functions to mock these.

* **CreateEvent** - This will mock an event being created in PostHog e.g. ```createEvent({ event: "booking completed", properties: { amount: "20", currency: "USD" } })```
* **CreateIdentify** - This will mock an identify event e.g. ```createIdentify()```

More detail on other helper functions and how to use them can be found in our [hello world example](https://github.com/PostHog/posthog-hello-world-plugin/blob/main/index.test.js) and in the [utils library](https://github.com/PostHog/plugin-scaffold/blob/main/test/utils.js)

These helper functions can be added to your test script using the following line:

```js
const { createEvent, createIdentify} = require("@posthog/plugin-scaffold/test/utils");
```

For testing cron activities (e.g. run every minute), we recommend testing the functions that are called from this cron in your test - rather than trying to mock the cron event.

### Running tests

If you have configured your package.json file as above you should be able to run

```bash
npm run test
```

And your tests will execute.