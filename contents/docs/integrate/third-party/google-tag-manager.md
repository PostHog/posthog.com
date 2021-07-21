---
title: Integrate PostHog with Google Tag Manager
sidebarTitle: Google Tag Manager
sidebar: Docs
showTitle: true
---

## Objective

Integrating PostHog into your website using Google Tag Manager.

## Why is this useful?

[Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) helps you add tags into your website in a codeless way, for services such as marketing and analytics tools. 

It is an easy way to integrate PostHog into your website without having to update your codebase. 

## Pre-Requisites

To follow this tutorial along, you should:

1. Have [deployed PostHog](/docs/deployment) or be using PostHog Cloud.

## Step-By-Step Instructions

1. Get your [PostHog snippet](/docs/integrate/client/snippet-installation) from your 'Project Settings' or the initial PostHog setup
2. Access your [Google Tag Manager Dashboard](https://tagmanager.google.com/) and navigate to the desired account/container that is integrated with the website you want to add PostHog tracking to
3. Click to add a new tag:

    <br />![GTM Dashboard](../../../images/tutorials/gtm/dashboard.png)<br />

4. On the page to configure a new tag, add your PostHog snippet as a 'Custom HTML Tag' under 'Tag Configuration'
5. For the trigger, select the default "All Pages - Page View" trigger and then click 'Save' on the top right corner of the drawer
6. Back on the main dashboard, click 'Submit' to update your website with the new PostHog tag
7. You're done! PostHog is now configured for your website.

> To confirm PostHog is configured correctly, visit your website and then check if the events from your session appear in PostHog. Note that this may take a few minutes.
