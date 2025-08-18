---
title: Security advisories
sidebar: Handbook
showTitle: true
---

This page contains security advisories and Common Vulnerabilities and Exposures (CVEs) related to PostHog. We maintain this page to ensure transparency and help our users stay informed about any security issues that may impact them. In the event that a security incident leads to a confirmed exposure or requires action from users we will always contact users proactively. 

For coverage of other, [non-security incidents](/handbook/engineering/incidents), please check [our status page](https://status.posthog.com/). 

## Our approach to security advisories

At PostHog, we take security seriously. Not as a checkbox, but with hardware security keys and healthy paranoia. We have a robust security program that includes:

- Regular security audits, architecture reviews, and penetration testing
- Automated code and infrastructure as code (IaC) linting
- Responsible disclosure program
- Proactive vulnerability monitoring
- Transparent communication with our community

For more information about our security practices, see our [main security page](/handbook/company/security).

## Reporting security issues

If you discover a security vulnerability in PostHog products or services, please report it to us at **[security@posthog.com](mailto:security@posthog.com)**. Valid findings will be rewarded with PostHog swag.

## Updating this page

PRs to this page which update advisories or CVEs should only occur as part of an incident and should follow all [our usual processes for an incident](/handbook/engineering/incidents). If you need to issue an advisory or CVE and an incident is _not_ declared, you should declare one. 

Declaring an incident will ensure that there is good internal visibility and that members of relevant teams, including our Support team, are aware. Once an advisory is posted to this page, you should also update other teams by posting in the [#tell-posthog-anything](https://posthog.slack.com/archives/C0351B1DMUY) Slack channel. 

## Security best practices

Security is everyone's responsibility, so we encourage all our users and staff to follow some basic best practices within their own organizations.

- **Use PostHog Cloud** - [We sunset K8s deployments long ago](/blog/sunsetting-helm-support-posthog) and our OSS version isn't suitable for use at scale. Use PostHog Cloud to ensure you benefit from the latest security updates.
- **Use strong authentication** - Always enable multi-factor authentication, strong passwords, and SSO where available. PostHog supports all of these. 
- **Monitor access** - Regularly review who has access to your PostHog data and follow the principle of least privilege by only giving access to things people _actually_ need. 

We will always proactively reach out to affected users in the event of an advisory requiring attention or action. However, if you'd like to stay updated about future incidents or advisories, please [subscribe to our status page](https://status.posthog.com/). If you want to drink updates from the firehose, you can also follow our [GitHub repos](https://github.com/PostHog/posthog) for real-time updates about everything we do, as we're committed to working in the open wherever possible. 

## Current advisories

### No active advisories

Currently, there are no active security advisories or CVEs. All is well. 

## Past advisories

<details>
<summary>August 15, 2025 / PSA-2025-00001</summary>
**Date:** August 15, 2025
**Advisory:** PSA-2025-00001
**Severity:** Medium
**Status:** Resolved
**Description:** An overly permissive table was available in SQL editor that allowed users to see the queries performed by other users in unrelated teams. The results of the queries were not available, but the queries themselves were visible. Queries can contain PII if specified directly in a SQL directive (e.g. SELECT * FROM Table WHERE email=user@example.com). 
**Affected users:**
Our logs confirm that this feature was never used on our EU cloud. Our historical query log for our US cloud only contains data going back to July 3, 2025, and we are able to confirm that this feature was never used over that time period. We don't have query logs between December 12, 2024 and July 2nd, 2025, though we think it's very unlikely that this feature was every used in our US cloud given that it was never advertised.
**Resolution:**
Once discovered, we quickly removed the ability to query this table. We then re-introduced this feature with queries properly scoped to the user's team.
**What we learned:**
We have a logic guard to ensure that all queries contain a properly authorized `team_id` when the queried table contains a `team_id` field. This logic did not help us here because the query log table did not contain a `team_id` field. We have since added a `team_id` field to this table and audited all other tables to verify they contain a `team_id` field, where appropriate. Going forward, we'll be introducing automated tests to ensure that all future tables additionally contain a `team_id` field.
Our historical query log contains data over a longer period in our EU cloud simply because we deployed it there first. Going forward, our historical query log in our US cloud will continue to accumulate data that we can use when responding to future incidents.
**Timeline:**
- **Vulnerable code shipped:** December 12, 2024, 14:45 UTC
- **Discovered:** August 13, 2025, 11:32 UTC
- **Reported:** August 13, 2025, 11:39 UTC
- **Fixed:** August 13, 2025, 12:33 UTC
- **Disclosed:** August 15, 2025, 09:00 UTC
</details>

### Advisory template

```
**Date:** January 15, 2024  
**CVE:** CVE-2024-XXXXX  
**Severity:** Low / Medium / Critical  
**Status:** Reported / Fixed / Resolved  

**Description:**  
Brief description of the vulnerability and its potential impact.

**Affected users:**
Confirm if the advisory is limited to specific products.
Confirm if the advisory is limited to either US or EU customers, or both.   

**Resolution:**  
Where possible, add a link to a PR. Be clear on any next steps. 

**What we learned:**
If there's a lesson we took to prevent this happening again, document it briefly.

**Timeline:**  
- **Discovered:** January 10, 2024, 00:00 UTC
- **Reported:** January 10, 2024, 00:00 UTC
- **Fixed:** January 10, 2024, 00:00 UTC
- **Disclosed:** January 10, 2024, 00:00 UTC
```



