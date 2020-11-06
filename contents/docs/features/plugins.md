---
title: Plugins
sidebar: Docs
showTitle: true
---
<br>

Plugins are a way to extend PostHog's functionality by either pulling data into or sending data out of PostHog. 

Our goal with plugins is to allow anyone to extend and customize PostHog in order to better fit their analytics and business needs. 

## Architecture

PostHog [uses Celery](/docs/stack) to execute tasks such as ingesting an event. 



![Plugins Pipeline](../../images/features/plugins/plugins-pipeline.png)


## Demo Video


## Accessing Retention


1. Click 'Insights' on the left sidebar
2. Click the 'Retention' tab

![Retention Page](../../images/features/retention/retention-page.png)

<br />


## Understandin