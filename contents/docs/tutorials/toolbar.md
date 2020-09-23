---
title: Visualizing User Behavior - Toolbar
sidebar: Docs
showTitle: true
---
<br />

<small class="note-block centered">_Estimated Reading Time: 7 minutes ☕☕_</small>

<br />

<span class="larger-image">

![Toolbar banner image](../../images/tutorials/banners/toolbar.png)

</span>

<br />

An underlying purpose of analytics is to answer questions by utilizing data.

_"Who's using my website?"_ 

_"What type of people pay for my product?"_

_"Why am I not retaining users?"_

Often times, these questions don't have a simple answer, and, more often than not, just getting _any_ answer to your questions requires a good amount of effort. 

However, there are some questions that have straightforward answers - the difficulty comes in getting that answer across. 

Enter the PostHog Toolbar. 

Consider the question: _"Where are my users clicking?"_

![Toolbar landing image](../../images/tutorials/toolbar/toolbar-landing-page.png)

How's that for an answer?

This tutorial will walk you through using the PostHog Toolbar to answer some of your analytics questions, as well as show you step-by-step how to create actions with it, so that you can sort through your events and level up your PostHog game. 


<span class='centered'>...</span>

_Prefer to watch a video? Check out the [Toolbar sections of our demo video](https://youtu.be/aUILrrrlu50?t=48) for a shorter overview of this functionality._

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
1. Display all actions you have on a page

Our team uses the toolbar daily, mostly to get a quick overview of clicks (and therefore decide what pages need attention) as well as create actions. 

## Launching the Toolbar

The PostHog Toolbar will only be enabled for you - not your users. Effectively, the little floating hedgehog will only appear on your website if the current visitor is authenticated into your PostHog instance i.e. this can be you or anyone on your team. 

To launch the toolbar, you can just access your website and it should appear for you. If that does not work, you can go over to PostHog and click the 'Launch Toolbar' button on the top left of the sidebar:

![Launch Toolbar](../../images/tutorials/toolbar/launch-toolbar.png)

This will prompt you to select the URL you'd like to launch it on (in case you are tracking multiple websites). Once you've clicked the desired URL, you will then be taken to a new tab where your website will load with the toolbar enabled.

<div class='note-block'><b>Note:</b> The toolbar is now enabled for all new PostHog users by default, even though it is still in Beta. however, if you are an older user, you might need to enable the toolbar in 'Settings' -> 'Setup'.</div><br />

## Using the Heatmap

### Step 1: Enabling the heatmap

The heatmap is the most exciting feature of our toolbar. To use it, just hover over the hedgehog, and click on the red fire (🔥) icon. This will enable the heatmap. The process is the same for toggling any functionality on or off. By defalt, you might have actions toggled on. Just click on the green flag icon to toggle that off and reduce noise on the page.

![Launch Toolbar](../../images/tutorials/toolbar/toolbar-options.png)

### Step 2: Understanding the heatmap

With the heatmap on, you should now see that clickable elements on your website have a red overlay on them, with numbers on small yellow/orange boxes on the top right of each element. The bottom and/or top of your screen might also have these boxes.

Here's another example from our website with the heatmap enabled:

![PostHog Website Footer](../../images/tutorials/toolbar/posthog-footer.png)

