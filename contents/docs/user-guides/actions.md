---
title: Actions
sidebar: Docs
showTitle: true
---

> Would you rather go through a tutorial about actions instead of this feature reference? Check out our [Complete Guide to Event Tracking](/docs/tutorials/event-tracking-guide#sorting-through-your-events-with-actions).

Actions are PostHog’s way of easily cleaning up a large amount of event data.

Actions consist of one or more events that you have decided to put into a deliberately-labeled bucket. They're used in insights and dashboards.

For example, a typical action might be one of the following:

* ‘Clicked sign up button’
* ‘User created account’
* ‘Viewed pricing page’
* ‘Submitted billing form’


To access the Actions page, go to the Event section on the left-hand navigation sidebar and then click on the Actions tab.

## Creating actions

### Select element on site

The simplest way to create a frontend-based action is to visit your application and use the PostHog Toolbar to tag the elements that are relevant.

We have a full [step-by-step tutorial](/docs/tutorials/toolbar) available about using our Toolbar, with a specific section dedicated to [creating actions from frontend elements](/docs/tutorials/toolbar#creating-actions).


### Autocapture-based actions

Autocapture-based actions are based on frontend elements from your website, such as a button or an input. The easiest way to select them is with the 'Inspect element on your site' functionality described above. However, you can also set them manually if you wish by providing something to identify the element, like a selector.

Our [Autocapture](/docs/integrate/client/js#autocapture) functionality will capture a lot of frontend elements by default, but you will need to manually set anything else you want to be captured. Currently, autocapture will capture any click or change of input or submission of `a`, `button`, `form`, `input`, `select`, `textarea`, and `label` tags. All other elements need to be set manually. This important to note if you deviate from established HTML practices, such as using a `div` as a button.

> Autocapture is also conservative regarding `input` tags to prevent grabbing sensitive data. See [Autocapture](/docs/integrate/client/js#autocapture) for more details.


There are three ways to match your elements:

> You **can have more than one match type** selected. Having multiple fields selected is an `AND` statement, so all of them will need to match an event for it to count as the action.

1. Text: The text on the element, if applicable. If you have buttons across your site, all saying ‘Sign Up’, you can track ALL of them, site-wide, as the same action, by choosing `Text: "Sign Up"` and not matching the URL.
2. Only match if URL contains: The URL where this action needs to take place. If you choose to match the URL as well, it will track any button on that page if it contains the ‘Sign Up’ text (which could be more than one button).
3. Selector: details below.
 

#### Matching selectors

You can use <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors" target="_blank" rel="noopener">standard basic CSS selectors </a> to uniquely identify the elements you care about. The following types of selectors are supported:
<ul>
    <li>
        <b>Recommended.</b> Attribute selectors. Example:
        <code>[data-attr="value"]</code> will match elements that have the
        given attribute and value.
        <blockquote>
            Please note that special attribute operators (e.g. <code>*</code>, <code>~</code>
            <code>|</code>, ...) are currently <b>not</b> supported. Combining multiple attribute selectors is also <b>not</b> supported.
        </blockquote>
    </li>
    <li>
        ID selectors. Example: <code>#special-link</code> will match
        elements with ID "special-link".
    </li>
    <li>
        Class selectors. Example: <code>.important-link</code> will match
        elements with CSS class "important-link".
    </li>
    <li>
        Type selectors. Example: <code>input</code> will match any
        <code>&lt;input&gt;</code> elements.
    </li>
    <li>
        Combinators are also supported (e.g. descendant or child combinators).
        <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#combinators"
            target="_blank"
            rel="noopener"
        >
            Learn more
        </a>
        about combinators. Examples: <code>form > [data-attr="submit"]</code> or <code>button span</code>.
    </li>
</ul>

### Custom events & page views
Page views can match urls containing a string or match exactly.

Custom Events can be sent to your PostHog instance via our API or one of our [several libraries](/docs/integrate/overview).


<blockquote class='warning-note'>
It is possible for an action to match multiple events. To do this, click ‘Add another match group’ when you are creating your action. Actions with multiple events work based on OR operations. That means that an action like "Clicked Read More Button" OR "Clicked More Information Button" will trigger as soon as the user clicks either of the buttons. Both clicks are not required for the action.
</blockquote>
