---
title: Redshift Export
github: https://github.com/PostHog/redshift-plugin
installUrl: https://app.posthog.com/project/apps?name=Redshift+Export
thumbnail: ../../apps/thumbnails/redshift.svg
topics:
    - redshift-export
---

### What are the requirements for this app?

Using the Redshift Export app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to a Redshift Cluster to export to.

### How do I install the Redshift Export app?

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

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Redshift Export app](https://github.com/PostHog/redshift-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra), as well as community member [Jean Roman](https://github.com/romj) for creating the Redshift Export app.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
