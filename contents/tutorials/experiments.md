---
title: How to run Experiments without feature flags
sidebar: Docs
showTitle: true
featuredTutorial: false
author: ['neil-kakkar']
topics: ['feature flags']
featuredImage: ../images/tutorials/banners/experiments.png
date: 2022-05-26
---

This tutorial explains how to run an experiment in PostHog while not using our feature flag library, either because you've rolled out your own or, more commonly, because feature flag support doesn't exist yet in your favourite PostHog client library.

## Step 1: Create an Experiment

The first step is to actually create your experiment in PostHog. Read our [how to create an experiment](/docs/user-guides/experimentation#creating-an-experiment) tutorial if you need help here.

Once you have created an experiment, make a note of three things:

**1. The feature flag associated with the experiment**

In our example, this will be `experiment-feature-flag`
	
**2. The variants you've chosen for that feature flag** 

In our example, these will be `control` and `test`.
	
**3. The events involved in the target metric**

In our example, this will be a `user signed up` -> `$pageview` -> `user paid` funnel. The experiment is purely frontend, but the metric we're tracking are these two backend events coming from their own libraries, along with a `$pageview` event coming from `posthog-js`.

Now, for the experiment to start tracking results and run its significance calculations, we need to instrument two things:

1. Send events along with a special feature property
2. Send `$feature_flag_called` events

## Step 2: Sending the right events

Experiments check whether an event belongs to an experiment or not by looking at a special property called `$feature/<feature-flag-name>`.

So, for our example above, we'll want all our events in the target metric ( `user signed up`, `$pageview`, and `user paid`) to send a property called `$feature/experiment-feature-flag` whose value is either `control` or `test`, i.e. the variant it belongs to.

The open question here is how do you determine the value for this property.

If you're using PostHog Feature Flags, and your favourite client library doesn't yet support experiments, you can get this value by calling the API directly. To do that, you hit the `/decide/` endpoint. [See the docs here for calling this endpoint](https://posthog.com/docs/api/post-only-endpoints#example-request--response-decide-v2). The two important parameters to send here are `api_key` and the `distinct_id`, which ensures you get feature flags in the response.

The response looks something like:

```
{
    config: {...}
    editorParams: {...}
    featureFlags: {
        ...
        experiment-feature-flag: "test"
        ...
    }
}
```

and there you have it, the value for `experiment-feature-flag`.

If you're not using PostHog Feature Flags, check with your provider on how to get the values for a given person.

At the end of this step, you must ensure that every event in the experiment, no matter which library it comes from, has these properties. Otherwise, Experiments UI won't work. `posthog-js` does this for you automatically, but other libraries don't, as of writing.

## Step 3: Sending the `$feature_flag_called` event

It's often possible that the distribution of users between variants is skewed, such that there are a lot more users in test than control. To measure the relative exposure between variants, we use this event called `$feature_flag_called`.

Thus, every time you send an event related to the experiment, also send an event called `$feature_flag_called` with the following properties:

1. `$feature_flag_response`
2. `$feature_flag`

The value for `$feature_flag_response` is the variant value you got from the API (`control` / `test`). 
The value for `$feature_flag` is the name of the feature flag (`experiment-feature-flag` in this case).

In most of our client libraries, we send this event whenever we make the API call to `/decide` to get feature flags for a person. It's a good idea that you do the same.

---

And that's all! You should be good to run any experiment you want with these changes. Let us know if you face any issues.
