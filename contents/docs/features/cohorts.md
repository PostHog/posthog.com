---
title: Cohorts
sidebar: Docs
showTitle: true
---

Cohorts are PostHog's way of letting you easily create a list of users who have something in common.

You can use the cohorts to:

* View a list of users who all did the same action or have the same property. A few examples of how you might use this are:
  * "Which users used the app today?"
  * "Which users work at the same company?"
  * "Who used the app once but never came back?"
* Segment other statistics. For example, to view user paths or action trends. This let's you understand things like:
  * "Are people at company X using the app much?"
  * "Is the number of Daily Active Users going up or down over time?"

A short video on Cohorts can be found here: https://youtu.be/8_SsZW1v56Q

## Creating a New Cohort

Go to 'People' in the left hand navigation:
<br /><br />

![left hand navigation for cohorts](../../images/cohorts-nav.png)

<br /><br />

Then click '+ New Cohort' on the top left:

<br /><br />

![+ new cohort button](../../images/new-cohort.png)

<br />


## Cohort Settings

There are three key settings for a cohort: 'action', 'property', and 'New group'. See below:

<br />

![Three key cohort settings](../../images/cohort-opts.png)

<br />

#### Group Users by Actions

You can group users who have performed certain [actions](/features/actions). You need to already have configured actions for that to work.

#### Group Users by Property

You can also group users who have a certain property in common. Commonly, this used to combine users at a certain team, or from a certain marketing campaign via their UTM tags, or whatever other static property you need:

<br />

<span class='centered'>![user cohorts - properties menu](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+15.58.24.png)</span>

<br />

#### Group Users According to Multiple Conditions

You can add together multiple conditions by using the 'New group' button. This acts as an **AND** function i.e. all conditions must be **true** for the grouping to occur.

<br>

## Adjusting Time Frames

You may only want users who have performed a certain action within a certain timeframe.

On setting the cohort to 'user has *action*', you will be presented with the following:

<br />


<span class='centered'>![cohort - user action date range selection](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+15.59.50.png)</span>

<br />


We are working to [expand the power of this filter](https://github.com/PostHog/posthog/issues/199).

<br />


## Viewing Users in a Cohort

Go to 'People' > 'Cohorts' in the left-hand navigation (as shown in the beginning of this page) and select the cohort you want to view by clicking it, and you'll be presented with a list

<br />

## Differentiating Team vs. Users Traffic
From the initial setup, [PostHog is tracking various events](/docs/integrations/js-integration#autocapture) from all users. However, you may want to differentiate between traffic from your team and traffic from your users.

To do so, you can identify your team members in PostHog either through a [`posthog.identify`](/docs/integrations/js-integration#identifying-users) (e.g. by setting an email as the ID) call or by [assocating properties](/docs/integrations/js-integration#sending-user-information) with your team member users (e.g. `is_team = true`). 

With that done, you can then create a cohort of your team and/or a cohort that does not include any of your team members, so that you can continue to gather data on all users, but can differentiate between them when performing your analytics processes.

This is the recommended method for differentiating between team and user traffic if you want to keep receiving events. However, if you wish to stop receiving events on your team altogether, you should consider using [`posthog.opt_out_capturing`](/docs/integrations/js-integration#opt-users-out).