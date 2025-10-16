---
title: Handling an incident
sidebar: Handbook
showTitle: true
---

# The TL;DR 

* If you get paged, acknowledge the page and look at the associated metrics - if it looks even slightly bad and not recovering - **CREATE AN INCIDENT**
* If you notice something broken with the app, or a user reports something clearly broken - **CREATE AN INCIDENT**
* If you are not sure - **CREATE AN INCIDENT**
* _How?_ 
  * Click the `Declare incident` button on an alert or do `/inc` in any slack channel
* _What?_ 
  * Join the incident channel
  * Assign yourself as lead (you can always re-assign later)
  * Share whatever info you have at that time
  * Escalate by bringing in the relevant team, engineers or via incident.io using the options a the top of the channel
  * Update the statuspage if there is any noticeable impact to users

## Raising an incident

![alert-example](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/incidentio_alert_343ed2062b.png)


Incidents are going to happen. If you'd rather watch a Loom, check out an incident drill recording [here](https://www.loom.com/share/5603d887624f4981bc089677cb4b8611).


> **Anyone can declare an incident and, when in doubt, you should always raise an incident.** We'd much rather have declared an incident which turned out not to be an incident. Many incidents take too long to get called, or are missed completely because someone didn't ring the alarm when they had a suspicion something was wrong. It's _always_ better to sound an alarm than not.  

To declare an incident, type `/incident` anywhere in Slack. This creates a new dedicated channel for the incident and add a few stakeholders. It will trigger an alert in the #incidents channel so everyone else can be aware. Declaring an incident **doesn't** trigger any external notifications. 

Once an incident is raised an automatic workflow begins that will help you summarize the issue and escalate it appropriately. 

Some things that should definitely be an incident

- `us.posthog.com` (PostHog Cloud US) or `eu.posthog.com` (PostHog Cloud EU) being completely unavailable (not just for you)
- No insights can be created
- Feature flags are not being returned at all, or `/flags` is down
- Any feature is 'down' and users are unable to access their existing data through it (this can be a bug and doesn't have to be an infra incident)
- Various alerts defined as critical, such as disk space full, OOM or >5 minute ingestion lag

Things that _shouldn’t_ be an incident

- Insights returning incorrect data
- Events being < 5-10 minutes behind (E2E ingestion lag)
- Unable to save insights, create feature flags
- Expected disruption which happens as part of scheduled maintenance

> Planning some maintenance? Check the [announcements](/handbook/growth/brand/product-announcements) section instead.

### Security-specific guidance

Security incidents can have far-reaching consequences and should always be treated with urgency. 
Some examples of security-related issues that warrant raising an incident include:

- Unauthorized access to systems, data, or user accounts
- Detection of malware, ransomware, or other malicious software on company systems
- Suspicious activity on production infrastructure, such as unexpected user logins, privilege escalations, or resource consumption spikes
- Discovery of exposed credentials, sensitive data, or secrets in logs, repositories, or public forums
- Receiving a credible report of a vulnerability or exploit affecting company systems

**When in doubt, err on the side of caution and raise the incident and escalate early!** Better to be safe than sorry.

> **Need to make a security advisory?** We have a page for that with [more detail on the process for security vulnerabilities](/handbook/company/security-advisories). 

### Incident severity

Please refer to the following guidance when choosing the severity for your incident. If you are unsure, it's usually better to over-estimate than under-estimate!

#### Minor

A minor-severity incident does not usually require paging people, and can be addressed within normal working hours. It is higher priority than any bugs however, and should come before sprint work.

Examples

- Broken non-critical functionality, with no workaround. Not on the critical path for customers.
- Performance degradation. Not an outage, but our app is not performing as it should. For instance, growing (but not yet critical) ingestion lag.
- A memory leak in a database or feature. With time, this could cause a major/critical incident, but does not usually require _immediate_ attention.
- A low-risk security vulnerability or non-critical misconfiguration, such as overly permissive access on a non-sensitive resource

If not dealt with, minor incidents can often become major incidents. Minor incidents are usually OK to have open for a few days, whereas anything more severe we would be trying to resolve ASAP.

#### Major

A major incident usually requires paging people, and should be dealt with _immediately_. They are usually opened when key or critical functionality is not working as expected.

Major incidents often become critical incidents if not resolved in a timely manner.

Examples

- Customer signup is broken
- Significantly elevated error rate
- A Denial of Service (DoS) attack or other malicious activity that affects system availability
- Discovery of exposed sensitive data (e.g., credentials, secrets) that could lead to a security breach if not remediated

#### Critical

An incident with very high impact on customers, and with the potential to existentially affect the company or reduce revenue.

Examples

- Posthog Cloud is completely down
- A data breach, or loss of data
- Event ingestion totally failing - we are losing events
- Discovery of an active security exploit, such as a compromised user account or system
- Detection of ransomware, malware, or unauthorized modifications to production systems

## What happens during an incident?

The person who raised the incident is the incident lead. It’s their responsibility to:

- Make sure the right people join the call. This includes [the current on-call person](https://posthog.pagerduty.com/service-directory/P43Y0E8). Optionally, add people from Infra and [the feature owner](/handbook/engineering/feature-ownership) and Support. Product Marketers can assist in running communications if required.
- Take notes in the incident channel. This should include timestamps, and is a brain dump of everything that we know, and everything that we are or have tried. This will give us much more of an opportunity to learn from the incident afterwards.
- Update the [status page](https://status.posthog.com/). This is best done in the incident Slack channel using `/incident statuspage` (`/inc sp`). 
    - We use Atlassian for hosting our status page. It is automatically updated from the incident.io slack command.
    - Access to Atlassian is limited due to seats so if you need access talk to Tim or James.
    - Do not try and update the status page via the incident.io dashboard because it won't be sync'd to the Atlassian status page.

If the person who raised the incident is the best person to debug the issue, they should hand over the incident lead role to someone else on the call.

[You can find all of our production runbooks + specific strategies for debugging outages here (internal)](https://runbooks.posthog.com)

### Customer communications

Significant incidents such as the app being partially or fully non-operational, as well as ingestion delays of 30 minutes or longer should be clearly communicated to our customers. They should get to know what is going on and what we are doing to resolve it.

When handling a security incident, please align with the incident responder team in the incident slack channel about public communication of
security issues. E.g. it could not make sense to immediately communicate an attack publicly, as this could make the attacker aware that we are investigating already. This could it make harder for us to stop this attack for good.
If an early communication is outweighing those kind of downsides or helps our customers if affected, then do it!

Our [status page](https://status.posthog.com/) is the central hub for all incident communication. You can update it easily using the `/incident statuspage` (`/inc sp`) Slack command.

When updating the status page, make sure to mark the affected component appropriately (for example during an ingestion delay, setting `US Cloud 🇺🇸` / `Event and Data Ingestion` to `Degraded Performance`). This allows PostHog's UI to gently surface incidents with a "System status" warning on the right. Only users in the affected region will see the warning:

<img width="223" alt="status" src="https://github.com/PostHog/posthog.com/assets/4550621/55fb053a-83f4-44c5-ac12-0a5409f4033f" />

Occasionally it may be desirable to do additional customer communications, such as sending an email to impacted customers or making updates to [the service page](/service-message). Product Marketers will organize and write these communications for you, so please let them know if this is needed. Joe is usually the best initial point of contact.

#### When a customer is causing an incident

In the case that we need to update a _specific_ customer, such as when an individual org is causing an incident, we should let them know as soon as possible. Use the following guidelines to ensure smooth communication:

- Ensure you are always contacting the admins of the impacted organization
- Communication is best done through Zendesk. The Support team can create tickets and handle this for you. 
- Before sending any comms, check with the incident lead. Then, share a ticket link in the incident channel. 
- If action is needed, it's better to take that action and inform the user than to ask the user to do it.
- If you're not able to take the required action, give the user deadlines for the changes they need to do and explain what will happen if they don't meet the deadline.
- Try to keep all communication on a single ticket, with all relevant parties.

In the case that we need to temporarily limit a _specific_ customer's access to any functionality (e.g. temporarily prevent them from using an endpoint) as a result of certain usage resulting in an incident, we need to make sure we put an alert on their Zendesk tickets.  This will make sure that anyone working on a ticket from the org will know what's happening with the org before replying (even if we've already reached out to the org, some folks at the org may not be aware, and so may open a support ticket.)

You'll just need to set the name of the org in an existing trigger in Zendesk, then reverse that change when the org's full access has been restored:

1. After Logging into Zendesk, go to the [admin center](https://posthoghelp.zendesk.com/admin/home)
2. In the left column, expand `Objects and rules` and click on `Triggers` (under "Business rules")
3. On the Triggers page, expand `Housekeeping` and click on `Add alert for org with special-handling`
4. Under `Conditions`, the last condition is: `Organization > Organization` `Is` `PostHog`. Change `PostHog` to the name of organization who has had their access limited as a result of the incident. (Click on "PostHog" and then start typing to filter and find the org name, then click on it)
5. Scroll to the bottom of the page and click the `Save` button

Once the org has had their full access restored, repeat the steps above, but this time put `PostHog` back in the last condition, and remember to `Save` the change.

## When does an incident end?

When we’ve identified the root cause of the issue and put a fix in place. End the incident by typing `/inc close` in the incident channel. Make sure to also mark the incident as resolved on the status page.

## What happens after an incident? (Incident analysis)

1. If the impact was high, or the incident recurs frequently, proceed to the next step to document the incident and hold an incident-review meeting. If this is a low-/no-impact incident, it's recommended to opt-out of the post-incident flow - we only want to document relevant incidents and keep our processes lean!
2. Create a PR against the [incidents analysis repository](https://github.com/PostHog/incidents-analysis) using [this template](https://github.com/PostHog/incidents-analysis/blob/master/yyyy-mm-dd-template.md).
3. Hold a ~30 min meeting discussing the above
4. If an incident had significant impact on customers (like data loss or flags not being available), we should sanitize and copy the post mortem into the public [post-mortems repository](https://github.com/PostHog/post-mortems)

All critical incidents should have a PR in the post-mortem repository + a scheduled meeting. All major incidents should have a PR in the post-mortem repository, and optionally a scheduled meeting.

_Thanks to [Incident Review and Postmortem Best Practices](https://blog.pragmaticengineer.com/postmortem-best-practices/) from Pragmatic Engineer_
