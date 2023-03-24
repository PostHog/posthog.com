---
title: Settings & Billing
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

This page documents all settings within the PostHog _application_. If you are self-hosting PostHog, a guide to configuring your _instance_ settings [can be found here](/docs/self-host/configure/instance-settings).

- **Organization settings** - covers your entire organization
- **Billing** - covers your entire organization 
- **Project settings** - affect your current project only
- **My settings** - affect the current user that is logged in only

## Organization settings
Open your account dropdown in the top right corner of the navigation bar and then click on the gear icon next to 'Current organization'. Contains the following settings:

- _Display name_
- _Invites_
- _Members_ - you can remove and change roles for team members here
- _Notification preferences_
- _Danger Zone_ - delete your organization

Once you have invited a member to your Organization, you will then also need to add them to the relevant Project (see below) in order to be able to view it if the project is set to 'private'.

## Billing and license management
Open your account dropdown in the top right corner of the navigation bar and then click on 'Billing' (Cloud only) or 'License management' (Self Host only). Contains the following settings:

- [Cloud only] _Billing and usage_ - view your current billing plan and usage; manage your subscription (via Stripe) including changing your billing plan, cancel your subscription, and update payment information
- [Self-hosted only] _License management_ - add new and manage existing license keys

## Project settings
Click on 'Project settings' in the left hand menu. Contains the following settings:

- _Project name_
- _Website event autocapture_ - JavaScript snippet code to include in your website's HTML
- _Project API key_
- _Timezone_ - allows you to see relevant time conversions in PostHog
- _Filter out internal and test users_ - filter out events from internal sources in your queries
- _Correlation analysis exclusions (beta)_ - globally exclude certain events or properties from your correlation analysis
- _Path cleaning rules (beta)_ - make your Paths clearer by aliasing one or multiple URLs
- _Permitted domains/URLs_ - specify domains and URLs where the Toolbar will automatically launch if you are logged in, and where sessions will be recorded (if enabled)
- _Data attributes_ - these attributes can be used when using the Toolbar and defining Actions to match unique elements on your pages
- _Webhook integration_ - configure a webhook to receive notifications on Slack, Teams or Discord when a certain action is received in PostHog
- _Data capture configuration_ - set whether or not the full IP address of each user is stored with each Event
- _PostHog Toolbar_ - enable or disable the Toolbar for this project
- _Recordings_ - enable or disable Session Recording for this project
- _Group Analytics_ (paid plans only) - name your group types
- _Access Control_ - set whether anyone in your Organization can access the project, or just invited users
- _Danger zone_ - delete your project

## My settings
Open your account dropdown in the top right corner of the navigation bar and then click on gear icon next to your username. Contains the following settings:

- _Password_
- _Personal API keys_ - used to authenticate you against our API
- _Security and Feature Updates_ - enable or disable email notifications with security and product feature updates only (no marketing emails)
- _Anonymize Data Collection_ - set whether or not to allow PostHog to collect data about your usage of the product

### Further reading

Want to know more about what's possible with PostHog? Try these tutorials:

- [How to track single-page apps](/tutorials/spa)

Want more? Check our [full list of PostHog tutorials](https://posthog.com/tutorials). 
