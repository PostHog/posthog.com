---
title: Integrate PostHog with Shopify
sidebar: Docs
showTitle: true
---
<br />

<small class="note-block centered">_Estimated Reading Time: 1 minutes_</small>

<br />

## Objective

Integrating PostHog with your Shopify store.

## Pre-Requisites

To follow this tutorial along, you should:

1. Have [deployed PostHog](/docs/deployment) or be using PostHog Cloud.

## Step-By-Step Instructions

1. Get your [PostHog snippet]((/docs/deployment/snippet-installation)) from your 'Project Settings' or the initial PostHog setup
1. Login to your Shopify dashboard
1. Go to 'Online Store' -> 'Themes' (see image below)
1. On your theme, click 'Actions' -> 'Edit code' (see image below)

    <br />![Shopify Dashboard](../../images/tutorials/shopify/shopify-dashboard.png)<br />

1. You should now be seeing a code editor. Click on `theme.liquid` under 'Layout' on the left sidebar (see image below)
1. Navigate until you see the closing `</head>` tag. Paste your snippet there, like so:

    <br />![Shopify Dashboard](../../images/tutorials/shopify/snippet.png)<br />

1. Click the green save button on the top right and you're good to go - PostHog should now be working on your Shopify store!

> To confirm PostHog is configured correctly, visit your store and then check if the events from your session appear in PostHog. Note that this may take a few minutes.