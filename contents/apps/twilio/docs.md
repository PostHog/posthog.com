---
title: Twilio Connector documentation
showTitle: true
topics:
    - twilio
---

### What does the Twilio Connector app do?

This app triggers SMS messages in Twilio when specified events or actions are detected in PostHog. 

You can set a timeout period of between 1 second and 31536000 seconds (1 calendar year) to avoid accidentally spamming users with too many messages. 

### What are the requirements for this app?

This app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

### How do I install this app for PostHog?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Twilio' and select the app, press 'Install'.
3. Follow the steps below to configure the app.

### How do I configure the Twilio Connector app for PostHog?

To configure this app, you will need your Account SID and Auth Token from Twilio. You can find these in Twilio in your account menu under `Account > Keys & Credentials > API Keys and tokens > Live credentials`.

Additionally, you will need to know your Twilio Phone Number. Follow [Twilio's documentation for buying or finding your Twilio phone numbers](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number).

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Twilio Connector app](https://github.com/marcushyett-ph/posthog-twilio-plugin) is available on GitHub. 

### Who created this app?

We'd like to thank community members [Sandeep Guptan](https://github.com/samcaspus) and [Himanshu Garg](https://github.com/merrcury) for their work creating this app. Thank you, both!

### Where can I find out more?

Check [Twilio's documentation](https://www.twilio.com/docs/) for more information on connecting Twilio with other services. 

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.