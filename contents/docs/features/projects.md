---
title: Projects
sidebar: Docs
showTitle: true
---

To facilitate tracking various products within the same organization, it's possible to have multiple projects within a single [PostHog organization](/docs/features/organizations), letting you segregate data and analysis workflows completely and safely.

This way you can for example keep tracking separate for your development and production environments, or track multiple domains and apps without merging the data.  

When enabled, you will be able to switch between projects on the top right of the page, as well as configure individual project settings by navigating to 'Project' on the left sidebar:

![Multiple Projects Screenshot](../../images/blog/array/org-project.png)

Each project has its own distinct write-only token, which you can use to initialize your [integration of choice](/docs/integrations), as well as to connect to our [API](/docs/api/overview).

> **Note:** Multiple projects within an organization belong to our premium team-oriented offering. To use this feature, [set up PostHog Cloud billing](https://posthog.com/pricing?o=cloud) or contact [sales@posthog.com](mailto:sales@posthog.com) for a self-hosted license.
