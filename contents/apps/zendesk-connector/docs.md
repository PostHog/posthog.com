---
title: Zendesk Connector documentation
showTitle: true
topics:
    - zendesk-connector
---

### What does the Zendesk Connector app do?

The Zendesk Connector app can import new and historic ticket events to PostHog. However, only the Date Type User Field is currently supported.

### What are the requirements for this app?

The Zendesk Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

You'll also need a Zendesk account, with admin access. 

### Are there any limitations?

The ZenDesk API has a limit of 400hits/min. If you have higher ingestion than that, please contact Zendesk.

### How do I install the Zendesk Connector app?

Make sure to use your Zendesk Admin Account to perform the below activities.

- Head Over to Zendesk's Admin section -> Settings -> Account.
- In the Branding section, scroll down to Subdomain and find your subdomain there. 
- Head to the Admin Section -> Channels -> API.
- In Settings, follow the below steps:
  + Turn On Token Access.
  + Click on Add API Token.
  + Give it some name like PostHog.
  + Copy the Token(You won't be able to see it later).
  + Save the Token.

Next, Head to the Admin section -> Manage -> User Fields. Click Add Fields and follow the steps below.

  + Give Name
  + Select Type `Date`.
  + Add field key, (you will be required to share this key in PostHog while setting up)
  + Click Save.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Zendesk Connector](https://github.com/PostHog/posthog-zendesk-plugin) is available on GitHub. 

### Who created this app?

This app was created by the community. We'd like to thank [Sandeep Guptan](https://github.com/samcaspus) and [Himanshu Garg](https://github.com/merrcury) for creating the Zendesk connector, as well as for all the other support and feedback. Thank you, both! 

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.