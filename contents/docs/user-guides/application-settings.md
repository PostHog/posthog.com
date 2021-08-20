---
title: Application Settings
sidebar: Docs
showTitle: true
---
This page documents all the application settings and configuration available on PostHog. These settings are generally available for both PostHog Cloud and PostHog Enterprise versions and should not be confused with instance settings (see [Configuring PostHog](/docs/self-host/)) for more details. Each subsection is represented as a tab in the user interface.

## Organization settings
Settings pertaining to the entire organization and/or instance. These settings can be accessed by opening the account dropdown on the right corner of the top navigation bar and then clicking on "Organization settings & billing". Contains the following settings:

#### General settings
- Organization name.
- Service data collection. Enables you to control how PostHog captures data on your organization's usage to improve our product. If you decide to anonymize your data at any point we'll retroactively delete or redact any personal information we have previously received.

#### Team members
- Team member management. Invite new members, cancel invitations, change role for team members or remove team members.

#### Billing / Licenses
- **[Self-hosted only]**. License management. Add new license keys and review existing license keys.
- **[Cloud only]**. Billing management. View current billing plan and usage, switch billing plans, cancel billing subscription, update payment information.


## Project settings
Settings scoped to the current project. These settings can be accessed by clicking on the project selector at the center of the top navigation bar and then clicking on the settings icon. Contains the following settings:

#### General settings
- Project name.
- Data capturing configuration. General configuration for how data is captured in your instance.
    - Anonymize client IP data. Toggles whether the full IP address of each customer is stored with each event.

#### Ingestion settings
- Ingestion key & Javascript snippet code. Main key used to ingest events through the JS snippet, PostHog libraries or API.
- Managed URLs. This are URLs (or base domains) where the Toolbar will automatically be opened when you're logged in to PostHog. These URLs will also be recognized when creating actions.

#### Integrations
- Toolbar settings. Enables or disables the Toolbar for the specific project.
- Slack / Teams integration. Configure a webhook to receive notifications on Slack or Teams when certain action is received on PostHog (see [Slack integration](/docs/integrate/webhooks/slack) or [Teams integration](/docs/integrate/webhooks/microsoft-teams) for more details).


## Personal settings
Settings scoped to the logged in user, any changes here **will only affect the currently logged in user**. These settings can be accessed by opening the account dropdown on the right corner of the top navigation bar and then clicking on "My account". Contains the following settings:

#### General settings
- Name.
- Email address.

#### Authentication
- Change password.
- Personal API keys. These keys are used to authenticate you against our api (see [docs](/docs/api/overview#authentication) for more information).

#### Notifications
- Notification settings. Control which notifications (email or push) you receive (e.g. security updates).