---
title: Working with cloud providers
sidebar: Handbook
showTitle: true
---

## AWS

### How do I get access?

Ask in the `#team-infrastructure` Slack channel for someone to add you.

To give someone access (important to follow these steps!):
1. Go to http://go/aws and click on the "PostHog" account (795637471508), and click "management console"
2. navigate to [IAM](https://us-east-1.console.aws.amazon.com/singlesignon/home?region=us-east-1#!/instances/7223d5d28068c4d6/users).
3. Use the `Add User` button at the top right.
4. Under username, type the user’s email address, and fill in the rest of the fields (Email, First and Last name).
5. Click next and choose the user group.
6. Click next and then click on Add user.

### Deploying PostHog

See docs [here](https://posthog.com/docs/self-host/deploy/aws).


## GCP

### How do I get access?

Ask in the `#team-infrastructure` Slack channel for someone to add you.

To give someone access: Navigate to [PostHog project IAM](https://console.cloud.google.com/iam-admin/iam?project=posthog-301601&supportedpurview=project) and use the `+Add` button at the top to add their PostHog email address and toggle `Basic` -> `Editor` role.

### Deploying PostHog

See docs [here](https://posthog.com/docs/self-host/deploy/gcp).


## DigitalOcean

### How do I get access?

Ask in the `#team-infrastructure` Slack channel for someone to add you.

To give someone access: navigate to [PostHog team settings page](https://cloud.digitalocean.com/account/team?i=7cfa7c) and use the `Invite Members` button to add their PostHog email address.

### Edit 1-Click app info

This can be done in the [vendor portal](https://cloud.digitalocean.com/vendorportal/), click on `PostHog` with Approved status to edit the listing.

The code and setup files are in [digitalocean/marketplace-kubernetes repository](https://github.com/digitalocean/marketplace-kubernetes/tree/master/stacks/posthog).

### Deploying PostHog

See docs [here](https://posthog.com/docs/self-host/deploy/digital-ocean).
