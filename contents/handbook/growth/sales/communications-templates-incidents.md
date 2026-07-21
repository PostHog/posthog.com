---
title: Communication templates for incidents
sidebar: Handbook
showTitle: true
---

When things go wrong, our priority is simple: **keep customers informed, quickly and clearly.**

This section covers how we communicate during service disruptions, from small hiccups to major outages. We aim to be **transparent, human, and proactive** — sharing what we know (and what we don't) in plain English.

> For the engineering incident response process, see [Handling an incident](/handbook/engineering/operations/incidents).

PostHog customers rely on us to power their products, so we provide honest, timely updates through the right channels — usually Slack or email, and occasionally SMS for high‑touch accounts.

## **Core principles**

### **1\. Transparency \> Perfection**

Share what we know, when we know it, clearly and without “status-speak.”

### **2\. Human-centric**

Messages come from people, not “The PostHog Team.” Show empathy and ownership (“I know this might interrupt your work; here’s what we’re doing.”)

### **3\. Consistency**

Use a consistent structure and timing so customers know what to expect.

### **4\. Proactive by default**

Reach out before customers ask, even if it’s just to say, “We’re aware and investigating.”

## **Severity levels**

| Level | Description | Examples | Channels | Cadence |
| ----- | ----- | ----- | ----- | ----- |
| **SEV 0 – Emergency** | Existential service failure; all or most customers impacted with no workaround. CMOC sends immediately via broadcast. Account owners do **not** gate comms. | Full platform outage, data loss, security breach with active customer impact. | Slack message → Email → DM/SMS | Immediate broadcast, then every 15–30 min; postmortem within 24h |
| **SEV 1 – Critical** | Major outage or data loss; widespread impact. | API unavailable, ingestion halted, login failures. | Slack → Email → (DM or SMS if needed) | Every 30–60 min; postmortem within 48h |
| **SEV 2 – Major** | Partial degradation or downtime; workaround available. | Replay or query delays \>30 min, flag evaluation slow. | Slack or Email | Every 1–2 hrs |
| **SEV 3 – Minor** | Limited impact or slow recovery. | Billing sync delays, isolated org issues. | Slack | Start and close |
| **SEV 4 – Informational / Planned** | Maintenance or recovered incidents. | DB upgrade, scaling events. | Email or Slack broadcast | Before \+ after window |

## **Templates**

### **Emergency (SEV 0)**

> **This overrides the standard workflow.** CMOC sends directly to all affected Slack customer channels without waiting for account owners. Account owners follow up individually once online.

**Initial message (Slack):**

We're investigating a major incident affecting [feature/service]. [Symptom — e.g., "Event ingestion is fully stopped" or "The PostHog app is unreachable."]

Our engineering team is actively working on a fix. We'll post updates here every 15–30 minutes until this is resolved.

**Update template:**

Update on [feature/service]: [Status — e.g., "Root cause identified. Fix is being deployed." or "Still investigating. No ETA yet, but narrowing it down."]

Next update in ~[15/30] minutes.

**Resolution template:**

[Feature/service] is back online as of [time UTC]. 

Root cause: [one-line summary].
Duration: [start–end].
Impact: [brief description of what customers experienced].

We're monitoring closely. A full postmortem will follow within 24 hours.

If you experienced data gaps or have concerns about impact to your project, reply here and your account owner will follow up directly.

### **Critical**

**Subject:** PostHog Outage – We’re investigating

Hey \[Name/Team\],

We’re investigating a major outage affecting \[feature\]. You may see \[symptom\]. Engineers are on it — updates every 30 minutes until resolved.

We know this may disrupt your work — thanks for your patience while we get things back online.

— \[Your Name\], PostHog

**Follow-Up (Resolution):** Good news — the issue is resolved. Root cause: \[summary\].
Duration: \[start–end\].
Impact: \[brief effect\].

We’re monitoring and will share a full write-up within 48 hours.

### **Major**

**Subject:** Performance issues in \[Feature\]

Hey \[Name\],

We’re seeing performance issues in \[component\]. You might notice \[impact\]. We’re mitigating and will update within the hour.

Thanks for your patience\!
— \[Your Name\], PostHog

### **Minor**

**Subject:** Slower performance in \\\[area\\\]

FYI — This shouldn’t block you, but we’re monitoring closely. I’ll update once it’s stable.

### **Planned maintenance**

**Subject:** Maintenance – \[Service/Region\]

Heads up — maintenance on \[system\] from \[time window\]. No downtime expected, but queries or replays may be briefly delayed. We’ll confirm once complete.

## **Tone and voice**

| Principle | Example | Avoid |
| :---- | :---- | :---- |
| **Direct** | “Event ingestion is paused.” | “We are experiencing an issue affecting a subset of users.” |
| **Empathetic** | “I know this blocks work; it’s our top priority.” | “We apologize for the inconvenience.” |
| **Plain English** | “Dashboards might not update.” | “You may experience degraded query latency.” |
| **Ownership** | “We identified a config issue on our side.” | “A third-party dependency caused an issue.” |

## **Coordination within GTM**

**Engineering manages detection and resolution** (see [engineering incident handbook](/handbook/engineering/operations/incidents)). GTM ensures clear, consistent customer updates, without duplication or coverage gaps.

### **Goals**

* Keep a single source of truth for comms, managed by the CMOC.
* Maintain global coverage so customers always hear from us.
* Enable fast, clear handoffs between teams.

### **Roles & responsibilities**

| Role | Responsibility |
| :---- | :---- |
| **Communications Manager On-Call (CMOC)** | Activated for any incident requiring GTM notification. Drafts all comms using handbook templates. Coordinates with engineering for context and keeps a central log of who’s been notified. Manages regional handoffs if incidents span time zones or owners are offline. |
| **AM/AE/CSM** | Sends comms to their accounts using CMOC drafts. If offline (PTO, off-hours, or time zone), CMOC assigns a regional backup. |
| **Regional Backup (Americas / EMEA / APAC)** | Covers accounts when owners are offline. Takes handoff from CMOC, sends comms, and ensures follow-up continuity. |
| **Engineering Incident Lead** | Owns technical response and provides updates to CMOC for accurate messaging. |

> All coordination between CMOC and Account Owners should happen in [#group-cs-sales-support](https://posthog.slack.com/archives/C090RCG671C) transparently so that everyone who manages customers is in the loop.

### **Workflow**

> **SEV 0 override:** For SEV 0 incidents, the CMOC skips steps 4–5 and sends the initial message directly via Slack to all affected customer channels. Account owners are notified in [#group-cs-sales-support](https://posthog.slack.com/archives/C090RCG671C) simultaneously, and take over individual follow-up threads once online. The CMOC continues to own broadcast updates until the incident is resolved or downgraded.
1. **Incident declared** (Engineering).
2. **CMOC activated**, notified of impact.
3. **Assess customer impact**, this <PrivateLink url="https://us.posthog.com/project/2/insights/EBiXOD91">insight</PrivateLink> (or this <PrivateLink url="https://docs.google.com/spreadsheets/d/1EyV55L0vWTfD4W02j5A3Vx3YZYPUODmQQC1toFPcKXU/edit?gid=1396499197#gid=1396499197">Google Sheet</PrivateLink> as a backup) will help you understand which customers are using which components in which cloud environment.
4. **CMOC drafts the initial message**, shares with the Account Owners in [#group-cs-sales-support](https://posthog.slack.com/archives/C090RCG671C)
5. **AM/AE/CSM sends to accounts**; backup sends if primary is offline.
6. **Updates** drafted by CMOC (30–60 min for SEV1, 1–2 hrs for SEV2).
7. **Regional handoffs** coordinated by CMOC.
8. **Resolution**: CMOC drafts closure; AM/AE/CSM (or backup) sends.
9. **Post-incident**: CMOC archives thread; GTM logs feedback and follow-ups.
10. **Postmortem**: Engineering writes technical summary; GTM adds comms learnings.

## **Example Slack workflow (Critical)**

1. **Incident created**: \#inc-2025-11-05-posthog-feature-flags-error.
2. **SRE posts summary; CMOC coordinates comms.**
3. **CMOC drafts message** and shares with the **Account Owner** (the person responsible for the affected accounts).
4. **Account Owner sends the message** to their customers. Example outbound: “We’re investigating an outage affecting event ingestion. Updates every 30 minutes.”
5. **During:** “Root cause identified (Redis queue saturation). Fix in progress.”
6. **Resolution:** “Resolved at 11:42 UTC. Write-up soon.”
