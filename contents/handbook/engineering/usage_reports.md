---
title: How we track and manage usage
sidebar: Handbook
showTitle: true
---

Tracking and managing usage is one of the core responsibilities of the Growth team. If we do it wrong, we don't get paid. 

Each organization's usage is calculated once per day and saved in a usage report. This usage report is sent to the billing service, which saves the report and sends the usage along to Stripe for the customer's subscription, if one exists.

## Usage reports

Usage reports are largely generated within `posthog/posthog` - because that's where the usage happens. Every day at midnight BST a cron job runs in each instance (US and EU) to calculate usage for every single organization in the instance. 

Occasionally the cron will get interrupted - when this happens the billing service won't receive or store any of the reports, and usage won't be sent to Stripe. You'll notice that usage reports have failed in two ways: 

1. When looking at the Revenue dashboard in Metabase, you'll see that there are fewer reports than previous days, and one of the instance (generally US) will show 0 reports sent.
2. When looking at the Usage report insight on the [Growth dashboard](https://app.posthog.com/dashboard/54139) you'll see a big dip in an otherwise steady trend.

We don't currently have a way to automatically re-run failed usage reporting, so we have to do it manually. To do so, you'll need to follow the instructions to [connect to PostHog Cloud infra](/handbook/engineering/how-to-access-posthog-cloud-infra). Once you do so you can run a management command to re-run the usage reports for a specific date:

```
python manage.py send_usage_report --date YYYY-MM-DD
```

where the date is the day that the usage report would have been run, so is *one day past the date where usage reports are missing*. For instance, if we had 0 usage reports on May 11, the date you'd use in the command is actually May 12 (because usage reports are reporting usage for the previous day). 

The command can take a while to run, and if it gets interrupted (eg because pods were turned over with a deploy) it'll fail again with `command terminated with exit code 137`. Simply reconnect and try again. If it's successful, you'll get a log like `21262 Reports sent!`. 
