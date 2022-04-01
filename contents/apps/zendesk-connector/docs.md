---
title: How the Zendesk Connector app works
showTitle: true
topics:
    - zendesk connector
---

## What does this plugin do?
The Zendesk plugin can import new and historic ticket events to PostHog. However, only the Date Type User Field is supported.

## Are there any limitations?
The ZenDesk API have a limit of 400hits/min. If you have higher ingestion than that, please contact Zendesk.

## How do I install the Zendesk plugin?
Make sure to use your Zendesk Admin Account to perform the below activities.

- Head Over to Admin Section -> Settings -> Account.
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
