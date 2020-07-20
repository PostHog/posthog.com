---
title: Actions
sidebar: Docs
showTitle: true
---

Actions are PostHog’s way of easily cleaning up a large amount of Event data.

Actions consist of one or more events that you have decided to put into a manually-labelled bucket. They're used in Funnels, Live actions and Trends.

For example, a typical action might be one of the following:

* ‘Sign up button – clicked’
* ‘Profile page – viewed’
* ‘Post submit – clicked’
* ‘Pricing page – viewed’
* ‘Watch movie – clicked’

You can watch our **old** tutorial videos on Actions [here](https://www.youtube.com/watch?v=7RcVfsXHG58) and [here](https://www.youtube.com/watch?v=NezwIa_PihU). However, please note that our functionality and UI has significantly changed since then. As a step by step tutorial, the videos may be out of data, but they could be helpful for understanding the concepts.

## Accessing Actions

To access the Actions page, go to the 'Events' section on the left-hand navigation sidebar which will open up a submenu including 'Actions':

![](../../images/03/Posthog-17.png)
<br>

## Creating Frontend Actions
<br>

### Pre-Requisites

Before creating an Action, you must have provided the domain you will be using PostHog on. This should be the root domain where your application is hosted e.g. http://example.com. Do this by visiting 'Setup' > 'Setup your PostHog account'.
<br>

### Getting Started

The simplest way to create a frontend-based Action is to visit your application, and to use PostHog’s toolbar to tag the elements that are relevant.

To create a new Action, click the blue 'New Action' button on the above the table on the Actions page:

![](../../images/actions-page.png)

This will open the following page:

![](../../images/create-action.png)
<br>

Here, you have a choice of two options:

#### Inspect element on your site

This will open the domain you provided to PostHog so that you can select an element with our Inspect tool and create an action from this.

> **Note:** Our [Toolbar](/docs/features/toolbar) is making this significantly easier.

#### From event or pageview

Alternatively you can create an event based on `pageview` or an existing [event](/docs/features/events) on your website.

Choosing this option will open the following page where you can create your desired Action:

![](../../images/action-from-event.png)
<br>

 
#### Note: Actions Containing Multiple Events 

It is possible for an action to match multiple events. To do this, click ‘Add another match group’ when you are creating your action (see picture above).


## Action Types

As shown above, there 3 types of Actions you can record:

#### Page View

Page views can match urls containing a string or match exactly.

![](../../images/03/Posthog-20.png)
<br>


#### Frontend Element

Frontend Elements are actions based on some element on your website, such as a button or an input. The easiest way to select them is with the 'Inspect element on your site' functionality described above. However, you can also set them manually if you wish by providing something to identify the element, like a selector.
<br>

#### Custom Event

Custom Events can be sent to your PostHog instance by API we have several libraries to allow you to do [this](/Integrations).
<br>

## New: Labelling Events with the Toolbar

The easiest way to create new actions and label events is by using our [Toolbar](/docs/features/toolbar).
<br> 

## Identification Fields

There are three identification fields that you can use for most elements:

* Text: The text on the element, if applicable
* Selector: The type of element it is
* Only match if URL contains: The URL where this action needs to take place. 
 
You can have 1 or more identification fields selected. Having multiple fields selected is an **AND** statement, so all of them will need to match an event for it to count as the Action.

### Identification Field: Example Uses

* If you have buttons across your site, all saying ‘Sign Up’, you can track ALL of them, site-wide, as the same action, by choosing’Text’:’Sign Up’ and not matching the URL.
* If you choose to match the URL as well, it will track any button on that page if it contains the ‘Sign Up’ text (which could be more than one button).
* If you have multiple sign up buttons on the same page, all with the same text and you want to track events relating to just one of them, you can use ‘Selector’. If they are technically the same element type AND have the same classes, then you need to add a new class to the button you wish to track separately, and use this to identify it.

