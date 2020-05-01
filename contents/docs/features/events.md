The most critical thing that PostHog does is to capture Events from your website or application. For example, if a user clicks a button, or visits a URL – those are Events.

## Live events

Go to ‘Events’ in the left hand navigation:

![left hand navigation - events selected](https://posthog.com/wp-content/uploads/2020/03/Posthog-15.png)

You will see a live feed of Events as they are happening.

![live feed of events](https://posthog.com/wp-content/uploads/2020/02/Screenshot-2020-02-09-at-18.05.28.png)

## Event properties

You can view the Event properties by clicking on the items in the ‘Event’ column:

![event properties](https://posthog.com/wp-content/uploads/2020/02/Screenshot-2020-02-09-at-18.06.41.png)

You can also click the ‘Person’ to view a full list of the Event history of that User.

## Events by path

You can choose to view just the events at a particular Path. The quickest way to do this is to click the Event path item.


## Event filtering

Alternatively, you can filter the Events:

![event filtering](https://posthog.com/wp-content/uploads/2020/03/Posthog-11.png)

You can have one or more filters.

These refine the view to show just Events with a selected property:

![Event property filtering](https://posthog.com/wp-content/uploads/2020/02/Screenshot-2020-02-09-at-18.09.29.png)

## Autocapture event tracking

PostHog has the capability to capture all front end events automatically from just a simple JS snippet.

This means you do not need to add track(‘event’) to individual buttons, or parts of your product any more. The end result is zero maintenance of your event tracking, and less developer time spent on analytics. Focus on making product decisions and building cool features!

The other advantage is that you won’t lose data. If you change your product a lot, you can always work backwards with your analytics.

## Push-based event tracking

Most users of PostHog will want to combine their back-end data, such as user information, with the front end actions of those users in their UI.

There are two ways of passing data to PostHog – the API or through the JS snippet.

### API

Our API documentation is available here.

### JS snippet

The snippet installation page explains how to push events through the front end.

In particular, we recommend pushing basic user information, such as email address, to make it much easier to understand the analytics.

