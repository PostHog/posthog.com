---
title: Snippet Installation
sidebar: Docs
showTitle: true
---

The easiest way to get going is to add a JavaScript snippet to your application.

### Get Started With No Code

To try out the snippet without having to update your codebase, you can make use of our bookmarklet, which you can find over in 'Project Settings'.

Here's a 25-second video showing how to use the bookmarklet to capture events in your website without **any code**:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Oe4wiNGzmk8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Finding the Snippet

This snippet will be provided to you during setup, but, if you need to access it afterwards, you can find it under 'Project' -> 'Settings':

![Snippet Settings Screenshot](../../../images/features/snippet/snippet-settings.png)


### Adding the snippet to your website

Having copied the snippet from the Settings page, you should now paste this within the `<head>` tags of your website, ideally just above the closing `</head>` tag. You will need to do this for all pages that you wish to track. 

## Website vs App

We recommend adding the PostHog snippet both on your homepage and your application (if you have one). That means you'll be able to follow a user from the moment they come onto your website, all the way through Sign Up and their actual usage of your product.

## Adding Multiple Domains 

PostHog supports tracking across multiple domains - just include the same snippet on all the websites you wish to track under the same project.

However, you can also configure "permitted domains" in your 'Project Settings'. These are domains where you'll be able to record user sessions and use the PostHog toolbar. 

###  Ignore/Censure elements
PostHog puts a great amount of effort into making sure it doesn't capture any sensitive data from your website. If there are other elements you don't want to be captured, you can add the `ph-no-capture` class name.

```html
<button class='ph-no-capture'>Sensitive information here</button>
```

### Alternatives to the snippet

You can choose not to use a JavaScript snippet, and can instead use one of our [many libraries](/docs/integrate/overview) or our [API](/docs/api/overview).