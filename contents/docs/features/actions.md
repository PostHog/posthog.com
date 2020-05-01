Actions are PostHog’s way of easily cleaning up a large amount of Event data.

Actions consist of one or more events that you have decided to put into a manually-labelled bucket. They're used in Funnels, Live actions and Trends.

For example, a typical action might be one of the following:

* ‘Sign up button – clicked’
* ‘Profile page – viewed’
* ‘Post submit – clicked’
* ‘Pricing page – viewed’
* ‘Watch movie – clicked’

You can watch our tutorial videos on Actions here:

Actions 

[![Actions video](http://img.youtube.com/vi/7RcVfsXHG58/0.jpg)](http://www.youtube.com/watch?v=7RcVfsXHG58)

Action Toolbar 

[![Actions Toolbar](http://img.youtube.com/vi/NezwIa_PihU/0.jpg)](http://www.youtube.com/watch?v=NezwIa_PihU)

## Creating a new action 

To get started with Actions, go to the 'Events' section in the left hand navigation which will open up 'Actions:

![Left hand nav - actions highlighted](https://posthog.com/wp-content/uploads/2020/03/Posthog-17.png)

## Creating front end Actions

### Pre-Requisites

Before creating an Action, you must have provided the domain you will be using PostHog on. This should be the root domain where your application is hosted, ie http://example.com. Do this by visiting Setup > Setup your PostHog account.

### Getting started

The simplest way to create a front-end based Action is to visit your application, and to use PostHog’s toolbar to tag the elements that are relevant.

To create a new Action, click 'New Action' button at the top right of the Actions page:

![Pop out actions](https://posthog.com/wp-content/uploads/2020/03/Posthog-18.png)

This will open a the New Action page with the 3 types of Actions you can record:

* Frontend Element
* Custom Event
* Page view

![New action page](https://posthog.com/wp-content/uploads/2020/03/Posthog-19.png)

Page views can match urls containing a string or match exactly.

![page view action](https://posthog.com/wp-content/uploads/2020/03/Posthog-20.png)

Custom Events can be sent to your PostHog instance by API we have several libraries to allow you to do [this](/Integrations).

Frontend Elements can be selected directly on your site, click 'Select element on site'.

![toolbar pop up](https://posthog.com/wp-content/uploads/2020/03/Posthog-21.png)

This will pop open the domain you provided in Setup.

You will see a PostHog toolbar pop up on the right hand side:

![PostHog Toolbar](https://posthog.com/wp-content/uploads/2020/02/Screenshot-2020-02-09-at-14.48.17-1024x269.png)


## Labelling events with the toolbar

In this example, we may want to track users clicking ‘Sign up!’ to our example movie streaming website, HogFlix.

Use the toolbar to create a name for the Action. Pro-tip: the best convention for this is ‘Object – Verb’, but it’s up to you.

Next, click ‘Inspect element’ to tag the element on the page that you want to grab events relating to. Your application screen will be highlighted in blue.

Now, move your mouse over the element in question. You’ll see PostHog highlight the element you are hovering over, and the toolbar will populate with the relevant fields as you move the mouse around.

![PostHog toolbar in action](https://posthog.com/wp-content/uploads/2020/02/Screenshot-2020-02-09-at-14.51.31-1024x510.png)

## Example - labelling a sign up Action

In this example, we may want to track users clicking ‘Sign up!’ to our example movie streaming website, HogFlix.

Use the toolbar to create a name for the Action. Pro-tip: the best convention for this is ‘Object – Verb’, but it’s up to you.

Next, click ‘Inspect element’ to tag the element on the page that you want to grab events relating to. Your application screen will be highlighted in blue.

Now, move your mouse over the element in question. You’ll see PostHog highlight the element you are hovering over, and the toolbar will populate with the relevant fields as you move the mouse around.

## Identification fields

There are three identification fields that you can use for most elements:

* Text – the text on the element, if applicable
* Selector – the type of element it is
* Only match if URL contains – the URL where this action needs to take place. 
 
You can have 1 or more identification fields selected. Having multiple fields selected is an AND statement, so all of them will need to match an event for it to count as the Action.

### Identification field example use

* If you have buttons across your site, all saying ‘Sign Up’, you can track ALL of them, site-wide, as the same action, by choosing’Text’:’Sign Up’ and not matching the URL.
* If you choose to match the URL as well, it will track any button on that page if it contains the ‘Sign Up’ text (which could be more than one button).
* If you have multiple sign up buttons on the same page, all with the same text and you want to track events relating to just one of them, you can use ‘Selector’. If they are technically the same element type AND have the same classes, then you need to add a new class to the button you wish to track separately, and use this to identify it.
 
## Actions containing multiple Events 

It is possible for Action to match multiple events. To do this, click ‘Add another match group’ here:

![PostHog toolbar - adding another match group](https://posthog.com/wp-content/uploads/2020/02/Screenshot-2020-02-09-at-15.04.51.png)
