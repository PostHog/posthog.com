---
title: Multiple Projects
sidebar: Docs
showTitle: true
---

In order to track various projects within the same organization, PostHog offers a _Multiple Projects_ feature, letting you segregate data collection and analysis between different individual projects. 

This allows you to avoid mixing concerns, being able to do things like keeping tracking for your development and production environments separate, as well as track multiple domains and apps without merging the data.  

When enabled, you will be able to switch between projects on the top right of the page, as well as configure individual project settings by navigating to 'Project' on the left sidebar:

![Multiple Projects Screenshot](../../images/blog/array/org-project.png)

Each project will have a separate token which you can use to initialize your [integration of choice](/docs/integrations), as well as connect to our [API](/docs/api/overview).

> **Note:** Our _Multiple Projects_ feature is part of our Enterprise Edition offering. It is currently enabled by default on PostHog Cloud, but if you wish to have access to it when self-hosting, please contact _[sales@posthog.com](mailto:sales@posthog.com)_,
