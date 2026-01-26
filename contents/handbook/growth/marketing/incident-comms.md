---
title: Incident comms
sidebar: Handbook
showTitle: true
---

Incident communication guidelines
=================================

> These guidelines are for marketers who support engineering during incidents.
> For engineers, we have additional guidance on [how to declare and handle an incident](/handbook/engineering/operations/incidents).
> For GTM workflows and templates, see the [communication templates for incidents](/handbook/growth/sales/communications-templates-incidents).

Incidents happen. Each one is different and not all incidents require comms, but when they do we need to have clear processes in mind.

For this reason we've kept our guidelines as flexible as possible and focused on providing high-level guidance and responsibilities. In the event that an incident occurs we trust each others' judgement on when to adhere or deviate from these guidelines.


Appointing a Comms Lead
-----------------------

During and following an incident, Product Marketing Managers (PMMs) generally assume responsibility for handling customer communication at a broad level.

- If an incident is focused on a particular product and that team has a PMM focused on it, that PMM typically takes responsibility and becomes the Comms Lead.
- If this is unclear or there's no dedicated PMM, then ownership should be decided by the available PMMs  and a single Comms Lead should be clearly designated in the incident channel.

The role of the Comms Lead typically involves planning how we will respond at a high level by:

-   Creating a simple comms plan (who we talk to, what we say, and when).
-   Taking ownership of any large-scale communication to users.
-   Coordinating with Support, Sales, and Success so we don't duplicate or contradict each other.

> **Oh no --- all the PMMs are on holiday or asleep!**
> If this happens, the incident lead may appoint a Comms Lead from [the Content Team](/teams) or another team. If the incident lead fails to appoint a Comms Lead, [Team Blitzscale](/teams) should appoint someone to lead Comms. 

Guidelines for Comms Leads
--------------------------

These are principles to keep in mind during any incident:

-   **Identify the per-product impact.**
    This helps scope the customer impact. Always clarify the impact on feature flags, experiments, and workflows especially. It's always worth asking how it impacts each product and if any data is lost, or merely delayed.

-   **Don't rush external comms.**
    It's better to be slower and correct than fast and wrong. The status page and support tickets usually cover the early phase while details are changing quickly.

-   **Default to transparency, not overcommunication.**
    We shouldn't send comms unless there's a definite impact and a clear story to tell. If we do send external comms, target **owners and admins in impacted orgs** where possible, rather than being too noisy.

-   **Use the status page as the primary public channel.**
    The status page should be the main place we direct users to during an incident. Extra channels (emails, social posts) are the exception, not the rule. If a post-mortem is created, this supersedes the status page.

-   **Aim not to send broad customer comms until an incident is resolved or a post-mortem is published.**
    Major or critical incidents will often have a public post-mortem – this should usually be the backbone of any wider comms. Don't communicate before resolution unless there is a strong need.

> **When handling a security incident:** align with the incident lead in the incident Slack channel about public communication of security issues before proceeding. E.g. it could make sense to hold back communication of an attack publicly, as this could make the attacker aware that we are investigating already. This could it make harder for us to stop this attack for good. However, in some cases of data breach and security incidents, like the [download of malicious packages](/blog/nov-24-shai-hulud-attack-post-mortem), it is better to notify users immediately, in case the incident lead has identified that **users can take action to prevent the malicious packages from spreading further.** 


What does the Comms Lead do?
----------------------------

At a high level, the Comms Lead is responsible for *how* we talk about the incident, not for fixing it. In practice, that usually means:

-   **Join the incident channel immediately and make your role clear.**
-   **Stay in the loop without adding noise.**
    Read the summaries and updates, follow the thread, and avoid asking for updates just to "check in". Only jump in when you need information for comms, or have a specific ask.
-   **Make sure the status page is accurate and up to date.**
    Check-in periodically to ensure the status is updated at least once every six hours, that the current impact is accurately described, and that the incident is closed when needed. [The Incident Lead](/handbook/engineering/operations/incidents) is responsible for these updates. 
-   **Decide whether we actually need outbound comms.**
    If we do, you should put together a plan for doing so (below).
-   **Draft, coordinate, and send any messages.**
    When we *do* decide to communicate:

    -   Create a comms plan to coordinate the response. This should be an issue in an internal repo. [Here's an example comms plan for a critical incident](https://github.com/PostHog/company-internal/issues/2431).
    -   Share comms drafts in the incident channel and on the comms plan for quick fact-checks from the incident lead or engineers.
    -   Keep messages in plain English, impact-first, and avoid status-speak. Use existing [communication templates for incidents](/handbook/growth/sales/communications-templates-incidents) as a reference.
    -   By default, communicate through email rather than in social posts. Social posts can exacerbate an issue.
    -   Direct users to the status page or post-mortem (if available) as the source of truth. 
     > **When do we need to notify users immediately?** For security incidents, like the [download of malicious packages](/blog/nov-24-shai-hulud-attack-post-mortem), in case the incident lead has identified that users can take action to reduce their risk, we should notify users immediately with clear steps how to act on their side. Product downtime that doesn’t involve security breaches/attacks should be addressed after the incident is closed and we have the context needed to inform users.

-   **Support the post-mortem process.**
    For major/critical incidents you may need to help shape and review the post-mortem with the incident lead and approvers (Tim and/or Ben, and Charles). Once published, use the post-mortem as the primary reference for any follow-up comms (emails, service messages, etc.), rather than rewriting multiple different explanations.
    > **After a data breach/security incident** the comms lead should contribute to the post-mortem by transparently addressing the impact, what went well, and what could have gone better. 
-   **Keep Sales and Support teams notified of impact.**
    Often these teams are dealing with the brunt of the customer response and your goal should be support them by giving them the information they need to respond effectively. 
-   **Handover to another Comms Lead, if needed.**
    Most comms can be handled quickly, but in the event of a long-running issue you should develop a plan to handover or continue monitoring the incident status.

These steps are a starting point, not a script. In practice, the Comms Lead's job is to keep communication **accurate, calm, and useful** --- and to reduce noise, not add to it.

What does the Comms Lead not do?
----------------------------

The Comms Lead is typically not responsible for:

- **Updating the Status Page.** This should fall to the Incident Lead. 
- **Updating VIP customers.** This usually is best handled by the Sales team. 
- **Providing technical support to users.** They can leave that to the Support team. 
- **Making technical decisions about the incident.** The Incident Lead will handle this. 
