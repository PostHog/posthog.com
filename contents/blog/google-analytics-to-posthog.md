---
title: An intro to PostHog for Google Analytics users
date: 2023-07-04T00:00:00.000Z
author:
  - ian-vanagas
  - andy-vandervell
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-vs-ga4/posthog-vs-ga4.jpeg
featuredImageType: full
category: Using PostHog
tags:
  - Guides
---

With the sunsetting of the Google Analytics Universal Analytics platform and unhappiness with its replacement, Google Analytics 4 (GA4), many are [looking for alternatives](/blog/ga4-alternatives). 

We’re biased, but PostHog is a great one. When compared with Google Analytics, it is:

- Easier to set up and capture data about traffic and usage.
- Provides all the same reports, views, and filters.
- Adds functionality like custom event capture, group analytics, session replays, A/B tests, and more.

This post will go over the basics you must know to make the transition from Google Analytics to PostHog.

> Read our [PostHog and Google Analytics comparison](/blog/posthog-vs-ga4) for an in-depth look at the differences

## Initial PostHog setup

If you’ve set up Google Analytics, PostHog’s setup won’t look too different. After [signing up](https://app.posthog.com/signup), get the script snippet from the "web" option in the getting started flow, and paste it into the `<head>` tag of your site. You can put it right next to your Google Analytics code like this:

```html
<!-- PostHog snippet -->
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',{api_host:'<ph_instance_address>'})
</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QCX3G7KSPC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-QCX3G7KSPC');
</script>
```

This works wherever code you can add code to your `<head>` tag, for example, site builders like [WordPress](/docs/libraries/wordpress) and [Webflow](/tutorials/webflow). Alternatively, you can add the PostHog snippet through [Google Tag Manager](/docs/libraries/google-tag-manager) or install the [JavaScript library](/docs/libraries/js) in your app. 

When you set up the snippet or JS library, it autocaptures events (similar to GA4’s [enhanced measurement](https://support.google.com/analytics/answer/9216061)) and they start showing up in your PostHog instance. Pageviews, clicks, inputs, and sessions are all captured without needing to create "properties," "streams," or instrument events yourself.

## Comparing PostHog and Google Analytics

PostHog has much of the same functionality as Google Analytics, but much of it is tweaked and named differently. Here’s a quick comparison of the two:

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
  <thead>
    <tr>
      <td><strong>GA name</strong></td>
      <td><strong>PostHog equivalent</strong></td>
      <td></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Report</td>
      <td>Insight</td>
      <td>Query and filter analytics data and visualize results. Types include trends, funnels, retention, and more.</td>
    </tr>
    <tr>
      <td>View</td>
      <td>Dashboard</td>
      <td>A collection of insights displayed together.</td>
    </tr>
    <tr>
      <td>Audience</td>
      <td>Persons</td>
      <td>Represents a user or set of users who create events, potentially filtered by properties or behaviors.</td>
    </tr>
    <tr>
      <td>Segment</td>
      <td>Filter</td>
      <td>A way to create a subset of your data.</td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>Properties</td>
      <td>Additional details added to events, persons, and groups such as location, browser, and status.</td>
    </tr>
    <tr>
      <td>Goals and conversions</td>
      <td>Actions</td>
      <td>An event or collection of events representing a target behavior.</td>
    </tr>
    <tr>
      <td>Client ID</td>
      <td>Distinct ID</td>
      <td>A unique identifier for a user.</td>
    </tr>
    <tr>
      <td>Measurement ID</td>
      <td>Project API key</td>
      <td>The unique identifier for your project, used to send data to your PostHog instance.</td>
    </tr>
  </tbody>
</table>
</div>

## Creating your first dashboard

PostHog has the same functionality as Google Analytics reports and views. For us, they are [insights](/docs/product-analytics/insights) and [dashboards](/docs/product-analytics/dashboards). 

When you first get into your PostHog instance, you see the default dashboard with a collection of insights like daily active users, growth accounting, and retention. If these insights don’t seem relevant to you, like if you are focusing on web traffic, you can customize your dashboards and insights to your needs.

![Home dashboard video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/google-analytics-to-posthog/home.mp4)

Tailoring PostHog to your needs is done by creating a new dashboard with new insights. To help you with this, we built [dashboard templates](/templates) similar to the default views Google Analytics provides:

- GA’s **acquisition overview** is similar to PostHog’s [landing page report](/templates/landing-dashboard) template. It contains insights on the most popular pages, referring domains, unique sessions, and session duration. This dashboard relies heavily on UTMs, so the [campaign URL builder](https://ga-dev-tools.google/campaign-url-builder/) is still important here.

- GA’s **realtime overview** is similar to PostHog’s [real time analytics](/templates/real-time-dashboard) template. It contains insights on unique users, pageviews, locations, and browsers, all filtered for occurrences within the last 5 minutes.

- GA’s **engagement overview** is similar to PostHog’s [website traffic](/templates/website-dashboard) template. It contains insights on SEO performance, user behavior, web traffic, and content performance.

- GA’s **retention overview** is similar to PostHog’s [user retention](/templates/retention-dashboard) template. It contains insights on overall retention, feature retention, and retention broken down by geography and device.

You can use these by going to [the dashboards tab](https://app.posthog.com/dashboard), clicking the "New dashboard" button, and selecting the template you want. 

### Creating an insight

Within these dashboards, you can edit the insights or add more. PostHog has insight types similar to GA’s trends, free form, conversion, path, and more. They are the key way to do analysis in PostHog.

To create one, you:

1. Go to the insights tab, and click "[New insight](https://app.posthog.com/insights/new)."
2. Select the tab with the type you want, like "Trends."
3. Select a data series, like "total count of pageviews."
4. Add filters to that series, like "where current URL contains blog."
5. Customize the visualization with types and breakdowns, like using the total value bar graph broken down by the current URL.
6. Save and add it to a dashboard.

![Insight video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/google-analytics-to-posthog/insight.mp4)

Each type has unique functionality such as direct SQL aggregations in trends, attribution type in funnels, return windows in retention, wild card groups in paths, and more.

## Working with persons, groups, and cohorts

Although PostHog is event-based, it still gathers details about users. To do an analysis similar to Google Analytics’ audiences or segments, we rely on [person](/docs/data/persons) and [group](/docs/product-analytics/group-analytics) data. 

- Every event contains a distinct ID for a person.
- With the snippet, every person gets an anonymous distinct ID. This gets stored in a cookie and automatically added to the events they trigger.
- You can use the [identify](/docs/data/identify) function to connect a person with a distinct ID like email or username.
- You can use the [group](/docs/product-analytics/group-analytics) function to connect a person with a group like an organization or company.

![Event structure](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/google-analytics-to-posthog/event.png)

You can then use all of this data in your insights. For example, you can aggregate an event series by unique users, monthly active users, unique groups, and more. 

## Filtering with properties

Like Google Analytics, each of the event series, insights, and dashboards is filterable. Filters are largely created with our version of "dimensions," named [properties](/docs/data/events#event-properties). 

Properties are keys and values set on events, persons, and groups adding more details about them. For example, the pageview event contains properties for the timestamp, OS, browser, current URL, referring domain, geographic data, and more. PostHog automatically adds some properties, but if you capture [custom events](/docs/libraries/js#send-custom-events-with-posthogcapture), you can also send as many custom properties as you want.

```js
posthog.capture('signed up', {email: 'ian@posthog.com', paid: true});
```

You can also use properties to create [cohorts](/docs/data/cohorts). These are lists of users meeting behavior or property criteria, such as completing an event for the first time or being a paid user. You can then use cohorts as filters throughout PostHog. 

## Measuring target user behavior with actions

The PostHog equivalent to goals and conversions are [actions](/docs/data/actions). An action is one or more events with filters matching a user’s behavior. For example, a "shown interest" action could include a visit to the pricing page, clicking a book demo button, or signing up.

You create actions in the [data management tab](https://app.posthog.com/data-management/actions). Once created, you can use them in insights. For example, if you want to track conversion, they are especially useful in the funnel-type insight. Actions can also trigger [webhooks](/docs/webhooks) and send messages in [Slack](/docs/webhooks/slack) or [Teams](/docs/webhooks/microsoft-teams).

Beyond actions, PostHog also can run A/B tests, which compare "test" and "control" variants to calculate whether a change impacts a goal metric. This is our version of Google Optimize. For an example, see "[How to run A/B tests in Webflow with PostHog](/tutorials/webflow-ab-tests)."

## Useful tips for first-time PostHog users

### 1. Try using filters on dashboards

![dashboard filters](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/dashboard-templates.mp4)

Filters work the same way on insights and dashboards. Want to see the same metrics for your whole website and a specific URL? Just create one dashboard, and then filter the dashboard by `Current URL` to view those same metrics for a single URL, or a collection of similar pages. Want to see those metrics for a specific cohort? You can do that too, among many other things.

### 2. You can use formulas to create custom insights

![formulas](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/formula-mode.mp4)

Trends support simple mathematical formulas, which makes it easy to create custom insights to track specific conversion events and percentage trends. Simply setup two or more variables (e.g. unique users and unique users from Germany) then input a formula the same way you would in Google Sheets or Excel like `B/A`. This is useful for tracking metrics like sessions per user or pages per user.

### 3. Enabling session replay will change your life

<iframe allowfullscreen width="100%" height="450" frameborder="0" src="https://app.posthog.com/embedded/VDVn0WRlvJdBomoFyy2Xg0Di2T1pEg"></iframe>

Session replay is incredibly powerful. Knowing how many people reach your pricing, and where they came from, is useful. Seeing what they _do_ when they get there is truly actionable. Session replay is tightly integrated in PostHog, so you can quickly go from viewing a funnel insight to watching users who went through it. You get 5,000 recordings for free each month, and there are numerous ways to [limit how many you capture](https://posthog.com/tutorials/limit-session-recordings) if you want to be selective.

### 4. Use the `Pageview` event to track unique users

![unique users](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/unique-users.mp4)

Unique users isn't a default metric in PostHog because it's event-based, but it's still easy to track. To do so, select the `pageview` event when building insights, then select `unique users` from the adjacent dropdown. This will show you the number of unique users who triggered the `pageview` event – i.e. the number of unique users you visited your website. You can also track `unique sessions` this way.

### 5. Use breakdowns to view your top pages

![breakdowns](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/breakdown.mp4)

Just want to see the top pages on your website? Create a Trends insight, click `Add breakdown`, and add the event property `Current URL`. To view these in a bar chart or table, go to `Chart type` and select either from the `Total value` options. Alternatively, you can use our [Landing pages dashboard template](/templates/landing-dashboard).

### 6. Use the lifecycle insight to track new and returning users

![lifecycle](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/lifecycle.mp4)

The Lifecycle insight breaks down unique users who complete your desired event by:

- **New** – Users who did the event or action during the interval and were also created during that period.

- **Returning** – Someone who was active in the previous interval, and is also active in the current interval.

- **Resurrecting** - Someone who was not active in the previous interval, and became active once again.

- **Dormant** - Users who are not active in the current interval, but were active in the previous interval.

This makes it an easy way to track new and returning visitors to your website, and you can toggle each user cohort on and off as you please.

## Added benefits of PostHog

- Easy [custom event capture](/docs/libraries/js#send-custom-events-with-posthogcapture) with nearly limitless custom properties.

- [Session replays](/docs/session-replay) with visuals of actual user behavior on your site and performance stats.

- [Data connections](/docs/cdp) to import events from sources [Segment](/cdp/segment) and to export to destinations like [BigQuery](/cdp/bigquery-export) and [Snowflake](/cdp/snowflake-export).

- Direct SQL querying and customization with [HogQL](/docs/product-analytics/hogql).

- Free for 1 million events and 5,000 session recordings per month, see [pricing for more](/pricing).

## Further reading

- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [Complete guide to event tracking](/tutorials/event-tracking-guide)
- [A non-technical guide to understanding data in PostHog](/tutorials/non-technical-guide-to-data)
