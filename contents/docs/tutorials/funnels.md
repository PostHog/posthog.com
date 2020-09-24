---
title: Analyzing Your Conversion with Funnels
sidebar: Docs
showTitle: true
---
<br />

<small class="note-block centered">_Estimated Reading Time: 6 minutes ☕☕_</small>

<br />

<span class="larger-image">

![Funnels Banner Image](../../images/tutorials/banners/funnels.png)

</span>

<br />

For most products, having a user land on your page is just the beginning. 

After all, a pageview isn't worth much if it doesn't lead to anything. 

You want users to sign up, use the product, pay you. 

To determine how well you're achieving these goals, you need to look at **conversion**.

Conversion rates tell you how well (or poorly) you're getting users from one step or action you need them to perform to another. 

For example, after a user visits your landing page, you want them to click a sign up button. Then, you want them to actually complete the signup process.

This process alone raises a lot of important questions for your business metrics, such as:

_"What percentage of users who visit my website actually sign up?"_

To answer those questions, you should really be using funnels.

![Funnel Example](../../images/tutorials/funnels/insights-funnel.png)

Above is a simple example of a PostHog funnel. It was made to answer the question:

_"Out of the PostHog team members who visited the website, how many clicked our 'Star Repo' button?"_

Just like us, you probably have a lot of questions that can be answered with funnels. 

Hence, this tutorial will walk you through creating a funnel step-by-step, while covering some of the use cases and features of PostHog funnels. 

<span class='centered'>...</span>

_Prefer to watch a video? Check out the [Funnels section of our demo video](https://youtu.be/aUILrrrlu50?t=504) for a shorter overview of this functionality._

## Pre-Requisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).
1. Have added the [PostHog snippet](/docs/integrations/js-integration) to your website. Our Toolbar only works with our [JavaScript Integration](/docs/integrations/js-integration), and requires the PostHog snippet to work. A Segment snippet, for example, will not give you access to the toolbar.

## Why Use the Toolbar

Before we go right into how to use the PostHog Toolbar, it's useful to understand why you'd want to do so.

Our toolbar is still in Beta, and there are exciting new features for it on our roadmap. However, in it's current form, it can:

1. Display user clicks on your website in a visual way
1. Tell you what element is the most clicked on a given page
1. Create actions in a simple way
1. Display all actions you have on a page (based on frontend elements)

Our team uses the toolbar daily, mostly to get a quick overview of clicks (and therefore decide what pages need attention) as well as create actions. 

## Launching the Toolbar

The PostHog Toolbar will only be enabled for you - not your users. Effectively, the little floating hedgehog will only appear on your website if the current visitor is authenticated into your PostHog instance i.e. this can be you or anyone on your team. 

To launch the toolbar, you can just access your website and it should appear for you. If that does not work, you can go over to PostHog and click the 'Launch Toolbar' button on the top left of the sidebar:

![Launch Toolbar](../../images/tutorials/toolbar/launch-toolbar.png)

This will prompt you to select the URL you'd like to launch it on (in case you are tracking multiple websites). Once you've clicked the desired URL, you will then be taken to a new tab where your website will load with the toolbar enabled.

<div class='note-block'><b>Note:</b> The toolbar is now enabled for all new PostHog users by default, even though it is still in Beta. however, if you are an older user, you might need to enable the toolbar in 'Settings' -> 'Setup'.</div><br />

## Using the Heatmap

### Step 1: Enabling the heatmap

The heatmap is the most exciting feature of our toolbar. To use it, just hover over the hedgehog, and click on the red fire (🔥) icon. 

The process is the same for toggling any functionality on or off. By defalt, you might have actions toggled on. Just click on the green flag icon to toggle that off and reduce noise on the page.

![Launch Toolbar](../../images/tutorials/toolbar/toolbar-options.png)

### Step 2: Understanding the heatmap

With the heatmap on, you should now see that clickable elements on your website have a red overlay on them, with numbers on small yellow/orange boxes on the top right of each element. The bottom and/or top of your screen might also have these boxes.

Here's another example from our website with the heatmap enabled:

![PostHog Website Footer](../../images/tutorials/toolbar/posthog-footer.png)

What the toolbar is doing here is displaying the number of clicks on each of those elements over the past 7 days. 

Numbers at the bottom or top of the screen just indicate that there are more elements that are not currently being displayed on the page. 

With the heatmap enabled, if you then click on an element, you will also be able to see its ranking on the page and create an action from it.

![Heatmap Selected Element](../../images/tutorials/toolbar/selected-element.png)

## Creating Actions

Actions are PostHog's way of allowing you to sort through your events. If you have not used them, you can find more information in the [dedicated Actions page](/docs/features/actions). 

### Step 1: Using 'Inspect'

When you're on your website with the toolbar enabled, you're able to create actions with just a few clicks.

If you're in PostHog, when you click to create an action, we will also give you the option to 'Inspect element on your site', which makes use of the toolbar.

To create an action from an element, toggle on 'Inspect' after hovering over the hedgehog. This is the blue button with the magnifying glass (🔍).

Example from our website:

![Toolbar Inspect Element](../../images/tutorials/toolbar/inspect-toolbar.png)

Just like the heatmap, this will also add an overlay to the elements, albeit a blue one.

Then, if you click on an element, you will be given the option to create an action from it, on the bottom of the modal. 

This will open up an action creation modal, like this:

![Toolbar Create Action](../../images/tutorials/toolbar/toolbar-create-action.png)

You should then fill in the name of the action under 'What did your user do?', scroll down, and click 'Create Action'.

If you want to create a more advanced action, you can also create it here. 

Here are the options you have for creating an action:

**Element filters**

These are used by PostHog to find the specific element you're creating the action for. 

_Link href_

Where a click on the element leads to (if available). 

_Text_

Inner text of the element (if available). 

_Selector_

Path to the element on the page. If you're not happy with the selector PostHog is using automatically, you could, for example, select elements based on their `id` or `data-attr`. This is useful if the path to the element is too complicated and not sufficiently robust to withstand website changes. 

_URL_

If you have the same element at the same position in various pages (e.g. navbar elements), the default action will capture them all. To prevent this, you can set an exact URL or specify a pattern for pages where this exact action should be recorded.

**Add another element**

If you want your action to cover more than one element, you can click 'Add another element' right above 'Create Action'. 

This is an `OR` operation, meaning that the action will be recorded if Element A _or_ Element B is clicked. 

This is useful if you have various buttons that take you to the same page, for instance, and just care that the user clicks one of them.

A good use case for this is leveraging the action as a [funnel step](/docs/features/funnels). 

### Step 2: Seeing your existing actions

Once you have created an action, it will be available for you in PostHog.

However, you can also visualize your actions with the toolbar.

By toggling on 'Actions' (green flag icon), you should have a view of all actions on the page. 

![Toolbar Actions](../../images/tutorials/toolbar/toolbar-actions.png)

Here, you can click an element and see all actions that use it. This is a great way of making sure the relevant elements to you have an action associated with them. 

Additionally, by clicking a specific action on an element, you can update or delete it.

## Just the beginning...

That's it! You've now learned to use the main functionalities of our toolbar. 

We would like to note once more that the PostHog Toolbar is in Beta (and we mean it!), so if you do find any issues, please report them to us on [GitHub](https://github.com/PostHog/posthog/issues). 

The toolbar should also be getting new features soon, so stay tuned.