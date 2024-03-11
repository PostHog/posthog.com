---
title: 'How to set up customer-facing analytics with PostHog, Next.js, and Tremor'
date: 2023-04-04
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - insights
  - product analytics
---

If you are a host, content platform, or some other type of B2B2C product, your users might want to know their traffic or usage metrics. To put it another way: if your users have their own users, sometimes your users want analytics about their users. Customer-facing analytics are analytics you capture and display to your users to fulfill this need.

This tutorial shows you how to set up customer-facing analytics using PostHog and its API, Next.js, and Tremor (a React visualization library). You need a PostHog instance ([sign up for free](https://app.posthog.com/signup)) as well as a way to filter your analytics for an individual user, such as a user or group property (like name, domain, ID).

> Thanks to [Mintlify](https://mintlify.com/) for the inspiration for this tutorial. Find out [how and why Mintlify used PostHog and Tremor to launch user-facing analytics](/customers/mintlify) within their product!

## Creating sample customer-facing insights

First, create insights to act as a reference for your customer-facing dashboard. This may include insights like:

- unique visitor count
- pageviews
- form submissions
- button clicks

These must all be filterable by a group or person property so you can show each user the insights relevant to them. As an example, we will create two insights, a pageview line graph and an "insights created" number. We filter them for the group named "PostHog" as an example of a filter. 

![Insight](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/customer-facing-analytics/insight.png)

> **Note:** if you are testing your sample insight filter with your own company (like for me and PostHog), make sure to uncheck "Filter out internal and test users."

Together on a dashboard, they look like this:

![Dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/customer-facing-analytics/dashboard.png)

These sample insights help us figure out the params to make API requests to filter and get this data for all the different users.

## Getting the params for our API request

Next, we need to set up the API requests to get the data from PostHog for our customer-facing insights. To do this, we will use the `<ph_instance_address>/api/projects/<project_id>/insights/trend` endpoint with `events`, `display`, and `properties` params, but we need to figure out these params first.

To quickly figure out the params for our request, we can make a different request to each of the insights individually. To do this, get the "short ID" from the URL of each of the insights. It is an eight character value like `HmKFweHR`:

![Short ID](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/customer-facing-analytics/short-id.png)

To make the API request to get the data about this insight, you need the insight short ID, your project ID (found in project settings), and a personal API key. To create a personal API key:

1. Click the icon in the top right corner of your PostHog instance.
2. Click the gear next to your name and email. 
3. On the "My settings" page, scroll down to "Personal API Keys." 
4. Click the "Create personal API key" button. 
5. Add a name and click "Create key."  
6. Copy your personal API key.

With your personal API key, project ID, and insight short ID, you can make a request to the `<ph_instance_address>/api/projects/<project_id>/insights` endpoint (different from the one we’ll use later) to get all the data about that insight like this: 

```bash
curl --location '<ph_instance_address>/api/projects/<project_id>/insights/?short_id=<short_id>' \
--header 'Authorization: Bearer <ph_personal_api_key>'
```

The objects and arrays we want are under `results` → `filters` → `events`, `properties`, `display`. Copy them to use them in the next step.

![Request](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/customer-facing-analytics/request.png)

## Creating our customer-facing analytics Next.js app

You will likely build customer-facing analytics into your app, but for this tutorial, we'll build ours as a [Next.js app](/tutorials/nextjs-analytics). The first step is to create a basic Next.js app:

```bash
npx create-next-app@latest analytics
```

Choose **not** to use TypeScript, **not** to use the app router, and the defaults for the rest. Once done creating, go into our newly created `analytics` folder and run our app. 

```bash
cd analytics
npm run dev
```

This creates a basic Next app for our customer-facing analytics.

![Next app](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/customer-facing-analytics/next.png)

### Getting the data into our app using the PostHog API

In our Next.js app, create a `.env.local`  in the base `analytics` directory and add the personal API key we created earlier. 

```
NEXT_POSTHOG_PERSONAL_KEY=<ph_personal_api_key>
```

In the `pages` folder, create a new file named `insights.js` and add a `getServerSideProps` function at the bottom of the file that:

1. gets group or user property to filter from the URL (context)
2. sets our `events`, `display`, and `properties` params 
3. formats the `fetch` `GET` request to `<ph_instance_address>/api/projects/<project_id>/insights/trend?${params}`
4. passes the response data as a prop to our component

For our "insights created" insight, this looks like this:

```js
// pages/insights.js

export async function getServerSideProps(context) {
	// Get filter value
  const filterValue = context.query.filter
	// Set up params
	const filterValue = "PostHog"
	const params = new URLSearchParams();
  params.append(
    'events',
    JSON.stringify(
      [
        {
          id: 'insight created'
        }
      ]
    )
  );
  params.append('display', 'BoldNumber');
  params.append('properties', JSON.stringify(
    {
      type: "AND",
      values: [
        {
          type: "AND",
          values: [
            {
              key: "name",
              type: "group",
              value: [filterValue],
              operator: "exact",
              group_type_index: 0
            }
          ]
        }
      ]
    }
  ));
	
	// Make fetch request
  const url = `<ph_instance_address>/api/projects/<project_id>/insights/trend?${params}`;
  
  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_POSTHOG_PERSONAL_KEY}`
    }
  })
	
	// Return response as prop
  const response = await request.json()
  const count = response.result[0].aggregated_value

  return {
    props: {
      count
    }
  }
}
```

When we go to `http://localhost:3000/insights?filter=PostHog`, we filter for values from the group named "PostHog." You can vary this `?filter=` value to provide different analytics for different users.

## Displaying our customer-facing data using Tremor

With our customer-facing data in our app, we can visualize it. To do this, we use [Tremor](https://www.tremor.so/), a React visualization library using Tailwind. 

### Setting up Tremor

We follow their [installation guide](https://www.tremor.so/docs/getting-started/installation) here. First, install Tremor:

```bash
npm install @tremor/react
```

Next, install Tailwind CSS and its dependencies, then initialization Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer 
npx tailwindcss init -p
```

Add the paths to your template files in your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Path to the tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {},
    },
    plugins: [],
}
```

Finally, add the `@tailwind` directives for each Tailwind's layers to your `globals.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Using Tremor to display the data

With our data and Tremor set up, we can use a Tremor component to display the data from PostHog. 

Import the `Card`, `Text`, and `Metric` components from Tremor. Also, set up the component to receive the `count` prop we are passing from `getServerSideProps`, and use it in the `Metric` component. Combining these two looks like this:

```js
// pages/insights.js
import { Card, Text, Metric } from "@tremor/react";

export default function Insights({ count }) {
  return (
    <>
      <Card className="max-w-xs mx-auto">
        <Text>Insights created</Text>
        <Metric>{count}</Metric>
      </Card>
    </>
  )
}
//... getServerSideProps()
```

This gives us a nice-looking start to our customer-facing dashboard.

![Customer-facing dashboard start](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/customer-facing-analytics/face.png)

Next is setting up and displaying a trend.

### Getting trend data

To display a trend, we go through the whole insight creation process again:

1. Get params for the API request from `insight` endpoint with short ID (our `events` and `display` params are different, but our `properties` filter is the same).
2. Set up the API request in `getServerSideProps`.
3. Display that data using Tremor.

The difference with the trend data is that:

1. It uses a different `events` param to get unique user `$pageview`. We add the `math: 'dau'` key to get unique users.
2. The data from PostHog requires formatting, we do this with a `.map()` call of the data.
3.  The visualization is a more complicated Tremor `LineChart` to display our data.

Once you’ve implemented this, here’s what gets added or changed in the `getServerSideProps()` function:

```js
export async function getServerSideProps(context) {
	//... code for insights created 
  
const trendsParams = new URLSearchParams();
  trendsParams.append(
    'events',
    JSON.stringify(
      [
        {
          id: '$pageview',
          math: 'dau'
        }
      ]
    )
  );
  trendsParams.append('display', 'ActionsLineGraph');
  trendsParams.append('properties', JSON.stringify(
    {
      type: "AND",
      values: [
        {
          type: "AND",
          values: [
            {
              key: "name",
              type: "group",
              value: [filterValue],
              operator: "exact",
              group_type_index: 0
            }
          ]
        }
      ]
    }
  ));
  const trendsUrl = `https://app.posthog.com/api/projects/<project_id>/insights/trend?${trendsParams}`;
  
  const trendsRequest = await fetch(trendsUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_POSTHOG_PERSONAL_KEY}`
    }
  })
  const trendsResponse = await trendsRequest.json()

  const dataPoints = trendsResponse.result[0].data
  const labels = trendsResponse.result[0].labels

  const chartData = dataPoints.map((point, index) => {
    return {
      date: labels[index],
      pageviews: point
    }
  })

  return {
    props: {
      count,
      chartData
    }
  }
}
```

You’ll see we do a simple `map()` of the data points we get from PostHog. This is to format them for use with Tremor, which is up next.

### Displaying trend data with a Tremor line graph

To display a line graph, import `Title` and `LineChart` from Tremor, handle our `chartData` prop, and configure the `LineChart` component.

```js
// pages/insights.js
import { Card, Text, Metric, Title, LineChart } from "@tremor/react";

export default function Insights({ count, chartData }) {

  return (
    <>
      <Card className="max-w-xs mx-auto">
        <Text>Insights created</Text>
        <Metric>{count}</Metric>
      </Card>
      <Card>
        <Title>Pageviews</Title>
        <LineChart
          className="mt-6"
          data={chartData}
          index="date"
          categories={["pageviews"]}
          colors={["blue"]}
        />
      </Card>
    </>
  )
}
//... getServerSideProps()
```

This gives us a line chart of the pageviews from unique users from PostHog over the week.

![Line chart](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/customer-facing-analytics/line.png)

From here, you can add other charts and metrics. See the [PostHog API](/docs/api) for what data you can get from PostHog, and [Tremor](https://www.tremor.so/components) for the ways you can display it.

> Want to know more? Find out [how and why Mintlify used PostHog and Tremor to launch user-facing analytics](/customers/mintlify) within their product!

## Further reading

- [How to add popups to your React app with feature flags](/tutorials/react-popups)
- [How to set up Next.js analytics, feature flags, and more](/tutorials/nextjs-analytics)
- [Get feedback and book user interviews with surveys](/tutorials/feedback-interviews-site-apps)
