---
title: Integrate PostHog with Shopify
sidebarTitle: Shopify
sidebar: Docs
showTitle: true
---

## Objective

Integrating PostHog with your Shopify store

## Why is this useful?

Tracking how users use your [Shopify](https://www.shopify.com/) store can help you improve the user experience and increase conversion rates on your e-shop.  

## Prerequisites

To follow this tutorial along, you should:

1. Have [deployed PostHog](/docs/deployment) or be using PostHog Cloud.

## Step-by-step instructions

1. Get your [PostHog snippet](/docs/integrate/client/snippet-installation) from your 'Project Settings' or the initial PostHog setup
1. Login to your Shopify dashboard
1. Go to 'Online Store' -> 'Themes' (see image below)
1. On your theme, click 'Actions' -> 'Edit code' (see image below)

    <br />

    ![Shopify Dashboard](../../../images/tutorials/shopify/shopify-dashboard.png)

    <br />

1. You should now be seeing a code editor. Click on `theme.liquid` under 'Layout' on the left sidebar (see image below)
1. Navigate until you see the closing `</head>` tag. Paste your snippet there, before that tag, like in the image below:

    <br />

    ![Shopify Dashboard](../../../images/tutorials/shopify/snippet.png)
    
    <br />

1. Click the green save button on the top right and you're good to go - PostHog should now be working on your Shopify store!

> To confirm PostHog is configured correctly, visit your store and then check if the events from your session appear in PostHog. Note that this may take a few minutes.
