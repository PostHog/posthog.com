---
title: Jobs
---

> **Minimum PostHog version:** 1.25.0

Jobs are a way for app developers to schedule and run tasks asynchronously using a powerful scheduling API.

Jobs make possible use cases such as retrying failed requests, a key component of apps that export data out of PostHog.

### Specifying jobs

To specify jobs, you should export a `jobs` object mapping string keys (job names) to functions (jobs), like so:

```js
export const jobs = {
    retryRequest: (request, meta) => {
        fetch(request.url, request.options)
    }
}
```

Job functions can optionally take a payload as their first argument, which can be of any type. They can also access the `meta` object, which is appended as an argument to all app functions, meaning that it will be the second argument in the presence of a payload, and the first (and only) argument in the absence of one.

### Triggering a job

Jobs are accessed as `jobs` via the `meta` object. Triggering a job works as follows:

```js
await jobs.retryRequest(request).runIn(30, 'seconds')
await jobs.retryRequest(request).runNow()
await jobs.retryRequest(request).runAt(new Date())
```

Having gotten a job function via its key from the `jobs` object, calling the function with the desired payload will return another object with 3 functions that can be used to schedule your job. They are:

- `runNow`: Runs the job now, but does so asynchronously
- `runAt`: Takes a JavaScript `Date` object that specifies when the job should run
- `runIn`: Takes a duration as a `number` and a unit as a `string` specifying in how many units of time to run this job (e.g. 1 hour)

> Accepted values for the unit argument of `runIn` are: 'milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'quarters', and 'years'. The function will accept these in both singular (e.g. 'second') or plural (e.g. 'seconds') form.

All jobs return a promise that does not resolve to any value. 

### Full example

```js
export const jobs = {
    continueSearchingForTheTeapot: async (request, meta) => {
        await lookForTheTeapot(request)
    }
}

async function lookForTheTeapot (request) {
    const res = await fetch(request.url)
    if (res.status !== 418) {
        await jobs.continueSearchingForTheTeapot(request).runIn(30, 'seconds')
        return
    }
    console.log('found the teapot!')
}

export async function processEvent (event, { jobs }) {

    const request = { url: 'https://www.google.com/teapot' }
    await lookForTheTeapot(request)
    
    return event
}
```
