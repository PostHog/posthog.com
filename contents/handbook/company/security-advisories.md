---
title: Security advisories & CVEs
sidebar: Handbook
showTitle: true
---

This page contains security advisories and Common Vulnerabilities and Exposures (CVEs) related to PostHog. We maintain this page to ensure transparency and help our users stay informed about any security issues that may impact them. In the event that a security incident leads to a confirmed exposure or requires action from users we will always contact users proactively. 

For coverage of other, [non-security incidents](/handbook/engineering/incidents), please check [our status page](https://status.posthog.com/). 

## Our approach to security advisories

At PostHog, we take security seriously. We have a robust security program that includes:

- Regular security audits and penetration testing
- Responsible disclosure program
- Proactive vulnerability monitoring
- Transparent communication with our community

For more information about our security practices, see our [main security page](/handbook/company/security).

## Reporting security issues

If you discover a security vulnerability in PostHog products or services, please report it to us at **[security@posthog.com](mailto:security@posthog.com)**. Valid findings will be rewarded with PostHog swag.

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

This section contains resolved security advisories for reference.

### Example Advisory (Resolved)

**Date:** January 15, 2024  
**CVE:** CVE-2024-XXXXX  
**Severity:** Medium  
**Status:** Resolved  

**Description:**  
Brief description of the vulnerability and its potential impact.

**Affected versions:**  
- PostHog Cloud: All versions before 1.42.0
- Self-hosted: All versions before 1.42.0

**Resolution:**  
Fixed in PostHog version 1.42.0. Users are advised to upgrade to the latest version.

**Timeline:**  
- **Discovered:** January 10, 2024
- **Reported:** January 12, 2024
- **Fixed:** January 15, 2024
- **Disclosed:** January 16, 2024




