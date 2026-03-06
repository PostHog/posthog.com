---
title: Post-mortems
sidebar: Handbook
showTitle: true
---

At PostHog, we believe that incidents are learning opportunities. Every incident, whether major or minor, provides valuable insights that help us improve our systems, processes, and response capabilities. Post-mortems are our way of capturing these lessons and ensuring we continuously improve.

## Why post-mortems matter

Post-mortems serve several critical purposes:

* **Learning from failures** – Understanding what went wrong and why helps prevent similar issues
* **Process improvement** – Identifying gaps in our monitoring, alerting, or response procedures
* **Knowledge sharing** – Ensuring the entire team benefits from lessons learned
* **Documentation** – Creating a historical record of incidents and their resolutions


## Post-mortem process

Incidents can be stressful and time consuming but it's equally important that we take the time to learn from them and improve our systems and processes. The longer you wait, the more details you'll forget and the less valuable the post-mortem becomes.

We use incident.io's post-mortem template which helps guide you through the process. They also have hints on what kind of content you should be focusing on in each section.

### For major incidents

Major incidents require a **team call** to discuss and learn together:

1. **Write the post-mortem** – Fill out the template in the incident page (you will be prompted to do this when the incident is resolved).
1. **Fill out the Summary and DERP sections in detail** – These are the most valuable
1. **Check the timeline is accurate** –
1. **Schedule the call** – Invite `engineering@posthog.com` and any key stakeholders related to the incident
3. **Review as a group** – There may be details and other ideas people come up with in the call – you should be updating the post-mortem as you go to capture these.
5. **Share outcomes** – Post the final summary in `#incidents` (this should happen automatically when you mark the post-mortem as complete)

### For minor incidents

Minor incidents can be handled more simply:

1. **Write the post-mortem** – Fill out the template
2. **Focus on the summary and DERP** – The timeline here is less important.
3. **Share the summary** – Post in `#incidents` channel for visibility (this should happen automatically when you mark the post-mortem as complete)

### For false-positive incidents

Sometimes incidents are raised but turn out to be false-positives. In this case you can usually just close the incident and opt-out of the post-mortem process.

But wait! Before you do this you should consider what could have been done better to prevent the incident from happening in the first place. Clearly there was some false-alert or unclear alerting that caused the incident to be raised in the first place. It might be worth a quick post-mortem just to check that we have follow ups in place


> 💡 Remember: **The goal is not to prevent all incidents, but to learn from them and improve our systems and processes.** Every incident is an opportunity to make PostHog more reliable and our team more effective.

## Public post-mortems

Some incidents require a public post-mortem. We publish these on our [public post-mortems page](/handbook/company/post-mortems) because we believe transparency builds trust, and the wider engineering community benefits from shared lessons. A public post-mortem is needed when an incident:

- Results in permanent impact on user data (such as data loss)
- Directly disrupts customers' own services (such as SDK bugs breaking customer sites)
- Results in extended unavailability of PostHog services for customers

### Process

Public post-mortems go through an internal review before being published. This isn't to hide anything – we're committed to being transparent about what happened and why. The review exists to make sure we don't accidentally expose sensitive information (such as customer data, internal credentials, or infrastructure details that could be exploited) and to ensure the post-mortem is clear and useful to readers.

1. **Write the internal post-mortem first** – Complete the normal post-mortem process above. The internal version is where you can freely discuss all details without worrying about what's safe to share publicly.
2. **Draft the public version** – Open a PR against [requests-for-comments-internal](https://github.com/PostHog/requests-for-comments-internal) using the [public post-mortem template](https://github.com/PostHog/requests-for-comments-internal/blob/main/_TEMPLATES/public-post-mortem.md). This gives reviewers a private space to flag anything that shouldn't be public before it lands on the website.
3. **Get review** – Have the draft reviewed by relevant stakeholders. Focus on making sure the root cause, impact, and remediation are explained clearly enough to be useful, while removing anything that could compromise security or expose customer information.
4. **Publish** – Once approved, open a PR against [posthog.com](https://github.com/PostHog/posthog.com) adding the post-mortem to `contents/handbook/company/post-mortems/` and update the list on the [public post-mortems page](/handbook/company/post-mortems).

