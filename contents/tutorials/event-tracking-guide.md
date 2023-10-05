---
title: Complete guide to event tracking
sidebar: Docs
showTitle: true
author: ['ian-vanagas', 'yakko-majuri']
date: 2022-09-23
featuredImage: ../images/tutorials/banners/tutorial-18.png
featuredVideo: https://www.youtube-nocookie.com/embed/LIJ_TuyMq74
tags: ['actions', 'events', 'product os', 'product analytics']
---

- **Level:** Medium 🦔🦔
- **Estimated reading time:** 12 minutes ☕️☕️

Event tracking is the first step in making a product better (after building the product). Event tracking gathers the data you need to understand the usage of your product, do analysis, and make improvement decisions. Ideally, every time a user takes action, an event can be captured that helps deepen your understanding of the usage of your product.

At PostHog, we offer two ways to track events: autocapture and custom events. This tutorial addresses both step-by-step, walking through setting up autocapture, then diving deeper into custom events, and finally refining those custom events to capture the right data you need.

## Setting up autocapture

Autocapture makes it easy to start getting data such as page views, clicks, and submissions from your site through a Javascript snippet. It doesn’t require setting up individual events and automatically captures data from new or changed components. This is useful, for example, if you restructure your frontend, autocapture continues to collect relevant events without you needing to update your codebase.

To set up autocapture:

1. Go to “Project settings”

2. Under “Website event autocapture,” copy the code block snippet containing the script tags and Javascript function.

3. Paste the block into your site’s HTML in the `<head>` tags (ideally at the end). This should be an HTML page that acts as a base or template page (with other scripts your page loads) to ensure all possible events are captured.

This allows autocapture to capture events like clicks, change of inputs, or submission of **`a`**, **`button`**, **`form`**, **`input`**, **`select`**, **`textarea`**, and **`label`** tags. Once set up, those events flow automatically into PostHog for you to see and analyze. For a detailed guide on how to install the snippet, read our **[installation guide](/docs/integrate?tab=snippet)**.

Autocapture can also be set up by installing the **[posthog-js](https://github.com/PostHog/posthog-js)** library, details of which can be [found here](https://posthog.com/docs/integrate/client/js), but we’ll also explain it when we cover setting up custom events below.

## Autocapture’s limitations

Although we are proud of our autocapture feature, we know it isn’t enough for more advanced product analytics. This is for two reasons.

First, event autocapture can be overwhelming. In high-volume instances, where events come in at a high rate, the live events table can contain so much information it can be difficult to determine exactly what you care about. Remember that every click, change of input, or submission is tracked here. Without proper filters, actions, and insights set up, this data can be overwhelming.

Second, autocapture is a general solution that provides value to many users. To get the most out of PostHog, you should be using custom events. Custom events let you track *exactly* the behavior you care about, ranging from a user hovering an input, to a function call in your backend.

## Setting up custom events

To expand on autocapture, you can create and add custom events to your product. Custom events allow you to capture details from anywhere in the codebase whether it is a button press on the frontend or a class method call on the backend. This ensures correct and comprehensive data capture.

To set up custom events, first, you need to install the library for the language or framework you are using. We have built libraries for a range of languages and frameworks including Javascript, Python, iOS, Android, and more. You can find our [full list of libraries here](https://posthog.com/docs/integrate#libraries).

For example, with Python (and Python frameworks like Django or Flask), setting up custom events starts with installing the PostHog package with pip (or your package manager of choice). 

```bash
pip install posthog
```

Second, in whatever library you’ve chosen, you’ll need to configure PostHog. This includes adding your project’s API key and setting the PostHog host.

```python
import posthog

# Substitutes posthog.api_key which still exists but has been deprecated
posthog.project_api_key = '<ph_project_api_key>'

# Only necessary if you want to use feature flags
posthog.personal_api_key = '<ph_personal_api_key>'

# You can remove this line if you're using app.posthog.com
posthog.host = '<ph_instance_address>'
```

Third, once the library is installed and configured, events can be captured by calling library methods with user details, event types, and properties. Each of our libraries contains the relevant structure for connecting the arguments to these categories. For example, in Python a capture method call might look like this:

```python
def movie_played(movie):
	posthog.capture(
		'distinct_id', 
		'movie_played', 
		{
			'movie_id': movie.id,
			'category': movie.category
		}
	)
```

Adding more of these capture calls in the right places in your codebase creates a flow of event tracking data into PostHog. For more information on setting this up, read the **[live data ingestion guide](https://posthog.com/docs/integrate/ingest-live-data).**

## Getting custom events right

With some custom events being sent, it is time to refine those events to capture the data you want. Getting this right requires multiple steps.

1. It starts with the goals of the product, which inform what data is needed about users and their behavior.
 
2. Next is ensuring data is accessible in the right places in your codebase. This might require writing helper functions for access or formatting the data correctly.

3. Finally, ensuring all the data is captured and added to PostHog for use in your analysis, visualization, and optimization. This is where we’ll focus for the rest of this tutorial.

There are multiple places where more details can be added to events to make sure you are tracking the right data. Here are some key ones.

### Identifying users

To best capture data about users, you must understand who those users are. Autocaptured events identify users for you, while custom events require manually setting that user identification. Examples of identifiers for users include session IDs and emails. For example, getting identifying a user by email using Javascript is as simple as calling `posthog.identify()` with a unique identifier.

```js
function loginRequest(user) {
  return authUser(user)
	.then(authorizedUser => {
		posthog.identify(user.email)
	})
}
```

Identifying users helps understand who those users are and what they are doing. Once identified, PostHog connects events related to formerly anonymous IDs with the unique set IDs. You can find more information on [identifying users here](https://posthog.com/docs/integrate/identifying-users). 

### Properties

Once a user has been identified and a basic event has been set up (with a name), properties can also be set for that event. Properties create more details about the event, such as the ID, category of the data, and other important data that differs between events. These properties can then be used to filter and analyze event tracking data.

As shown above in Python and below in a variety of other languages, properties are sent along with the distinct id and event. They can include as much data as you like. Common [data formats](https://posthog.com/manual/events#event-filtering) such as booleans, dates, numerics, and more can be handled and utilized within PostHog to filter or adjust data when analyzing.

<MultiLanguage>

```js
posthog.capture(
  'event_name', 
  { property1: 'value', property2: 'another value' }
);
```

```php
PostHog::capture(array(
  'distinctId' => 'distinct_id_of_your_user',
  'event' => 'movie_played',
  'properties' => array(
    'movie_id' => '123',
    'category' => 'romcom'
  )
));
```

```ruby
posthog.capture({
  distinct_id: 'distinct_id',
  event: 'movie_played',
  properties: {
    movie_id: '123',
    category: 'romcom'
  }
})
```

```go
client.Enqueue(posthog.Capture{
  DistinctId: "test-user",
  Event:      "test-snippet",
  Properties: posthog.NewProperties().
    Set("plan", "Enterprise").
    Set("friends", 42),
    Set("proUser", true),
})
```

</MultiLanguage>

Properties can also be set for individual users using the `set` and `set_once` methods. This allows data to be connected to the user rather than the function or method where the event was called. It also allows permanent user data to be stored across events, and not have to be recreated in each event capture call. Once a user property is `set_once` it can’t be changed by calling `set_once` again. For example:

<MultiLanguage>

```js
posthog.capture(
  'set_some_user_properties', 
  { 
    $set: { location: 'London'  },
    $set_once: { referred_by: 'some ID' },
  }
)
```

```python
posthog.capture(
  'distinct_id',
  event='movie_played',
  properties={ 
    '$set': { 'location' : 'London' },
    '$set_once': { 'referred_by': 'some ID' }
  }
)
```

```php
PostHog::capture(array(
  'distinctId' => 'distinct_id_of_your_user',
  'event' => 'movie_played',
  'properties' => array(
    '$set' => array(
      'location' => 'London'
    ),
    '$set_once' => array(
      'referred_by' => 'some ID'
    )
  )
));
```

```ruby
posthog.capture({
  distinct_id: 'distinct_id',
  event: 'movie_played',
  properties: {
    $set: { location: 'London' },
    $set_once: { referred_by: 'some ID' }
  }
})
```

```go
client.Enqueue(posthog.Capture{
  DistinctId: "test-user",
  Event:      "test-snippet",
  Properties: map[string]interface{}{
        "$set": map[string]interface{}{
            "location": "London",
        },
        "$set_once": map[string]interface{}{
            "referred_by": "some ID",
        },
    }
})
```

</MultiLanguage>

You can find more about [user properties here](https://posthog.com/docs/integrate/user-properties).

### Group event tracking

PostHog provides the ability to aggregate events by groups. Groups allow you to track and manage events, not at an individual user level, but at a “company,” “organization,” “project” or another broader entity level. 

For example, if you had multiple deployments for different companies in your product, you could group events by each company. Another example is instead of calling capture after using identify or with the distinct user id, you can call a group or add the group data to the capture call.

<MultiLanguage>

```js
// All subsequent events will be associated with company `id:5`
posthog.group('company', 'id:5');
posthog.capture('some_event')
```

```python
posthog.capture('distinct_id', 'some_event', groups={'company': 'id:5'})
```

```go
client.Enqueue(posthog.Capture{
    DistinctId: "distinct_id",
    Event:      "some_event",
    Groups: posthog.NewGroups().
        Set("company", "id:5").
})
```

```node
posthog.capture({
    event: "some_event",
    distinctId: 'distinct_id',
    groups: { company: 'company_id_in_your_db' }
})
```

```php
PostHog::capture(array(
    'distinctId' => 'distinct_id',
    'event' => 'some_event',
    '$groups' => array("company" => "id:5")
));
```

```segment
analytics.track('event_name', {
    "$groups": {
        "company": "id:5"
    }
})
```

</MultiLanguage>

This allows these groups to be used for analyzing, filtering, and visualizing events in PostHog. An example of a metric that benefits from group event tracking is the unique number of organizations signed up (rather than individuals). For more details about group analytics, you can check out [our product manual](https://posthog.com/manual/group-analytics). 

## Combining events into actions

Often a single event does not make up an entire behavior that you want to track. For example, a signup can include not only pressing the signup button, but entering the correct information, and making it past the basic information input stage. 

[Actions](/docs/data/actions) enable you to combine events that you want to be tracked together. You can then visualize actions in [insights](/docs/product-analytics/insights) and [dashboards](/docs/product-analytics/dashboards). For more detail, see our [action docs](/docs/data/actions).

## What’s next?

Now that you have set up autocapture, high-quality custom events, and actions, what’s next? If your product is being used (we hope it is), you’ll be getting a flow of data into your PostHog instance. You can continue to expand the capturing and formatting of that data or you can begin to analyze it. Check out our [recommended next steps after installing PostHog](/tutorials/next-steps-after-installing).

If you are looking for more options to where to send your events from that aren’t covered by our client- and server-side libraries (or autocapture), you can check out our [API](https://posthog.com/docs/api).

If you are looking to get started with analysis of all the event tracking data you now have, you can look into creating a new [trend](https://posthog.com/manual/trends), [funnel](https://posthog.com/manual/funnels), or [dashboard](https://posthog.com/manual/dashboards).
