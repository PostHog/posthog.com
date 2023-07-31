---
title: Redshift (Export)
github: https://github.com/PostHog/redshift-plugin
thumbnail: ../../cdp/thumbnails/redshift.svg
tags:
    - redshift-export
---

> This app is currently unavailable while we develop [a new export system](https://github.com/PostHog/posthog/issues/15997). It will be back again soon!

Using the Redshift Export app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to a Redshift Cluster to export to.

## Installation

1. [Create a Redshift Cluster](https://docs.aws.amazon.com/redshift/latest/dg/tutorial-loading-data-launch-cluster.html)
2. Make sure PostHog can access your cluster

This might require a few things:

-   [Allowing public access to the cluster](https://aws.amazon.com/premiumsupport/knowledge-center/redshift-cluster-private-public/)
-   [Ensuring your VPC security group allows traffic to and from the Redshift cluster](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html) - If this is not possible in your case, you should consider using our S3 Export app and then setting up your own system for getting data into your Redshift cluster

3. Create a user with table creation privileges

We need to create a new table to store events and execute `INSERT` queries. You can and should block us from doing anything else on any other tables. Giving us table creation permissions should be enough to ensure this:

```sql
CREATE USER posthog WITH PASSWORD '123456yZ';
GRANT CREATE ON DATABASE your_database TO posthog;
```

4. Add the connection details at the configuration step in PostHog

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code](https://github.com/PostHog/redshift-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra), as well as community member [Jean Roman](https://github.com/romj) for creating this

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
