---
title: Security advisories
sidebar: Handbook
showTitle: true
---

This page contains security advisories and Common Vulnerabilities and Exposures (CVEs) related to PostHog. We maintain this page to ensure transparency and help our users stay informed about any security issues that may impact them. In the event that a security incident leads to a confirmed exposure or requires action from users we will always contact users proactively. 

For coverage of other, [non-security incidents](/handbook/engineering/operations/incidents), please check [our status page](https://status.posthog.com/). 

## Our approach to security advisories

At PostHog, we take security seriously. We don't treat it as a checkbox, but rather as a core part of our decision making. We have a robust security program that includes:

- Regular security audits, architecture reviews, and penetration testing
- Automated code and infrastructure as code (IaC) linting
- Responsible disclosure program
- Proactive vulnerability monitoring
- Transparent communication with our community

For more information about our security practices, see our [main security page](/handbook/company/security).

## Reporting security issues

Security vulnerabilities and other security related findings can be reported via our [vulnerability disclosure program](https://bugcrowd.com/engagements/posthog-vdp-pro) or by emailing [security-reports@posthog.com](mailto:security-reports@posthog.com). Valid findings will be rewarded with PostHog swag.

## Updating this page

PRs to this page which update advisories or CVEs should only occur as part of an incident and should follow all [our usual processes for an incident](/handbook/engineering/operations/incidents). If you need to issue an advisory or CVE and an incident is _not_ declared, you should declare one. 

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

<details id="PSA-2026-00001">
  <summary>June 2, 2026 / PSA-2026-00001 <AdvisoryAnchor id="PSA-2026-00001" /></summary>

  <p><strong>Date:</strong> June 2, 2026<br />
  <strong>Advisory:</strong> PSA-2026-00001<br />
  <strong>Severity:</strong> Critical<br />
  <strong>Status:</strong> Resolved</p>

  <p><strong>No customer data was accessed and no action is required.</strong> Our investigation using AWS CloudTrail and Wiz, together with the researchers' confirmation, found that no customer data was viewed, accessed, or modified, and no customer accounts were affected. The incident exposed our internal production credentials, not customer data, to security researchers and we have rotated those credentials as a precaution.</p>

  <h4>Description</h4>
  <p>A security researcher exploited a known vulnerability (<a href="https://www.cve.org/CVERecord?id=CVE-2026-7899">CVE-2026-7899</a>) in an outdated version of Chromium that we ran via Playwright to generate heatmaps. This Chromium instance ran without a sandbox, which was a legacy configuration we had planned to change but had not yet enabled. The combination of the outdated version and the missing sandbox allowed the researcher to gain a shell on the Kubernetes pod and read credentials stored in the pod's environment variables.</p>
  <p>We were alerted when one of the researchers stored the extracted secrets in a private GitHub gist, triggering GitHub's secret-scanning notifications to the affected providers, including AWS. Based on the researchers' confirmation and our own investigation via AWS CloudTrail and Wiz, no customer data was accessed and the vulnerability was not exploited by anyone other than the researchers. The researchers confirmed that their last access to our environment occurred before we began rotating credentials.</p>

  <h4>Affected users</h4>
  <ul>
    <li><strong>No customer data was affected.</strong> No customer data was accessed, viewed, or modified, and no customer accounts were compromised. This was confirmed by our investigation using AWS CloudTrail and Wiz, and by the researchers.</li>
    <li><strong>No customer action is required.</strong> We rotated the most critical credentials immediately, and are completing rotation of the remainder as a precaution.</li>
    <li>This affected our <strong>US Cloud</strong> environment only. EU Cloud was not affected.</li>
    <li>The exposure was platform-wide in scope (credentials available to the affected workload), not limited to a specific product.</li>
  </ul>

  <h4>Resolution</h4>
  <ul>
    <li>We immediately began rotating production credentials, starting with the most critical (including AWS).</li>
    <li>We updated Playwright and Chromium to the latest version.</li>
    <li>We have begun moving heatmap generation and other uses of Chromium to an external service so that we no longer run Chromium in our own containers.</li>
    <li>We are exploring additional container hardening, including removing the shell from these containers entirely.</li>
  </ul>

  <h4>What we learned</h4>
  <ul>
    <li>A sandbox would have contained the exploit to the browser process rather than letting it reach the pod and its secrets. We should have closed that known gap sooner.</li>
    <li>Our initial status update was slower than it should have been because the incident began on a Friday evening, when fewer responders were immediately available. We also lacked a playbook for this specific incident type.</li>
    <li>Reducing the number of static, long-lived secrets limits the impact of any future exposure. We already use short-lived, automatically-rotated credentials (such as OIDC and IRSA) wherever we can, but many third-party services still only support static API keys. We'd like to see the industry move further toward short-lived credentials.</li>
    <li>Rotating our secrets is slower and more manual than it should be. We need better documentation of where each secret originates and who is able to rotate it.</li>
    <li>We need better tooling to propagate rotated secrets into running workloads and trigger a redeploy independently of a normal release, so rotation isn't gated on the deploy process.</li>
    <li>Automated secret-scanning notifications from our cloud providers were an effective backstop that alerted us quickly.</li>
  </ul>

  <h4>Timeline</h4>
  <ul>
    <li><strong>Secret-scanning alert received:</strong> May 29, 2026, 23:55 UTC</li>
    <li><strong>Incident declared:</strong> May 30, 2026, 00:08 UTC</li>
    <li><strong>Outreach to researcher:</strong> May 30, 2026, 00:16 UTC</li>
    <li><strong>Began rotating credentials:</strong> May 30, 2026, 00:24 UTC</li>
    <li><strong>Initial status page update published:</strong> May 30, 2026, 01:04 UTC</li>
    <li><strong>Researcher confirmed exploit path:</strong> May 30, 2026, 01:37 UTC</li>
    <li><strong>Initial fix deployed (Chromium/Playwright update):</strong> May 30, 2026, 02:40 UTC</li>
  </ul>

</details>

<details id="PSA-2025-00001">
  <summary>August 15, 2025 / PSA-2025-00001 <AdvisoryAnchor id="PSA-2025-00001" /></summary>

  <p><strong>Date:</strong> August 15, 2025<br />
  <strong>Advisory:</strong> PSA-2025-00001<br />
  <strong>Severity:</strong> Medium<br />
  <strong>Status:</strong> Resolved</p>

  <h4>Description</h4>
  <p>An overly permissive table was available in the SQL editor that allowed users to see queries performed by other users in unrelated teams. The results of those queries were <em>not</em> accessible, but the queries themselves were visible.</p>

  <h4>Affected users</h4>
  <ul>
    <li>Our logs confirm that this feature was never used in our EU cloud.</li>
    <li>Our historical query log for the US cloud only contains data going back to July 3, 2025, and we can confirm the feature was not used during that period.</li>
    <li>We do not have query logs between December 12, 2024, and July 2, 2025. While we cannot fully confirm usage during this window, we believe it is very unlikely the feature was used in our US cloud, as it was never advertised.</li>
  </ul>

  <h4>Resolution</h4>
  <p>Once discovered, we immediately removed the ability to query this table. We then reintroduced the feature with queries properly scoped to each user’s team.</p>

  <h4>What we learned</h4>
  <ul>
    <li>We have a logic guard to ensure that all queries contain a properly authorized <code>team_id</code> when the queried table includes a <code>team_id</code> field.</li>
    <li>This logic did not help in this case because the query log table did not contain a <code>team_id</code> field.</li>
    <li>We have since added a <code>team_id</code> field to this table and audited all other tables to verify that they contain a <code>team_id</code> field where appropriate.</li>
    <li>Going forward, we will introduce automated tests to ensure that all new tables also include a <code>team_id</code> field.</li>
    <li>Our historical query log contains a longer dataset in the EU cloud simply because it was deployed there first. Going forward, our US cloud logs will continue to accumulate historical data for future incident response.</li>
  </ul>

  <h4>Timeline</h4>
  <ul>
    <li><strong>Vulnerable code shipped:</strong> December 12, 2024, 14:45 UTC</li>
    <li><strong>Discovered:</strong> August 13, 2025, 11:32 UTC</li>
    <li><strong>Reported:</strong> August 13, 2025, 11:39 UTC</li>
    <li><strong>Fixed:</strong> August 13, 2025, 12:33 UTC</li>
    <li><strong>Disclosed:</strong> August 15, 2025, 09:00 UTC</li>
  </ul>

</details>

### Advisory template

Use the advisory code as the `<details>` `id` (and the matching `<AdvisoryAnchor>` `id`) so it can be linked directly. Linking to the anchor (e.g. `/handbook/company/security-advisories#PSA-2025-XXXXX`) auto-expands the advisory.

```
<details id="PSA-2025-XXXXX">
  <summary>August 15, 2025 / PSA-2025-XXXXX <AdvisoryAnchor id="PSA-2025-XXXXX" /></summary>

  <p><strong>Date:</strong> August 15, 2025<br />
  <strong>Advisory:</strong> PSA-2025-XXXXX<br />
  <strong>Severity:</strong> Low / Medium / Critical<br />
  <strong>Status:</strong>Reported / Fixed / Resolved</p>

  <h4>Description</h4>
  <p>Brief description of the vulnerability and its potential impact.</p>

  <h4>Affected users</h4>
  <ul>
    <li>Confirm if the advisory is limited to specific products.</li>
    <li>Confirm if the advisory is limited to either US or EU customers, or both</li>
  </ul>

  <h4>Resolution</h4>
  <p>Where possible, add a link to a PR. Be clear on any next steps.</p>

  <h4>What we learned</h4>
    <p>If there's a lesson we took to prevent this happening again, document it briefly.</p>

  <h4>Timeline</h4>
  <ul>
    <li><strong>Vulnerable code shipped:</strong> January 10, 2024, 00:00 UTC</li>
    <li><strong>Discovered:</strong> January 10, 2024, 00:00 UTC</li>
    <li><strong>Reported:</strong> January 10, 2024, 00:00 UTC</li>
    <li><strong>Fixed:</strong> January 10, 2024, 00:00 UTC</li>
    <li><strong>Disclosed:</strong> January 10, 2024, 00:00 UTC</li>
  </ul>

</details>
```



