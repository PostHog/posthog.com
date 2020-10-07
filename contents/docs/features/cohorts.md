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

## Demo Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/GtSSxmOdyk4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Creating a New Cohort

**Step 1:** Go to 'People' in the left hand navigation:

![left hand navigation for cohorts](../../images/features/cohorts/cohorts-page.png)

<br />

**Step 2:** Click '+ New Cohort' on the top left.

<br />


## Cohort Settings

There are three key settings for a cohort: 'action', 'property', and 'New group'. See below:

<br />

![Three key cohort settings](../../images/features/cohorts/cohort-options.png)

'New group' adds another group of filters that a user must match to be a part of the cohort, as an `OR` operation. This means that if a user matches _any_ of the groups you add, they will be added to the cohort. 

<br />

**Group Users by Actions**

You can group users who have performed certain [actions](/features/actions). You need to already have configured actions for that to work.

**Group Users by Property**

You can also group users who have a certain property in common. Commonly, this used to combine users at a certain team, from a certain marketing campaign (via their UTM tags), or whatever other static property you need:

<br />


## Adjusting Time Frames

You may only want users who have performed a certain action within a certain timeframe.

On setting the cohort to 'user has *action*', you will be presented with the following:

<br />


<span class='centered'>![cohort - user action date range selection](../../images/features/cohorts/cohort-time-frame.png)</span>

<br />


Currenly, our time filtering for cohorts has 3 options, but we are working to [expand this functionality](https://github.com/PostHog/posthog/issues/199).

<br />


## Viewing Users in a Cohort

Go to 'People' > 'Cohorts' in the left-hand navigation (as shown in the beginning of this page) and select the cohort you want to view by clicking it, and you'll be presented with a list

<br />

## Differentiating Team vs. Users Traffic
From the initial setup, [PostHog is tracking various events](/docs/integrations/js-integration#autocapture) from all users. However, you may want to differentiate between traffic from your team and traffic from your users.

To do so, you can identify your team members in PostHog either through a [`posthog.identify`](/docs/integrations/js-integration#identifying-users) (e.g. by setting an email as the ID) call or by [assocating properties](/docs/integrations/js-integration#sending-user-information) with your team member users (e.g. `is_team = true`). 

With that done, you can then create a cohort of your team and/or a cohort that does not include any of your team members, so that you can continue to gather data on all users, but can differentiate between them when performing your analytics processes.

This is the recommended method for differentiating between team and user traffic if you want to keep receiving events. However, if you wish to stop receiving events on your team altogether, you should consider using [`posthog.opt_out_capturing`](/docs/integrations/js-integration#opt-users-out).