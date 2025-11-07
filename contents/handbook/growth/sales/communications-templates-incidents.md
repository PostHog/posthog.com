---
title: Communcation templates for incidents
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

## **⚙️ Severity levels**

| Level | Description | Examples | Channels | Cadence |
| ----- | ----- | ----- | ----- | ----- |
| **SEV 1 – Critical** | Major outage or data loss; widespread impact. | API unavailable, ingestion halted, login failures. | Slack → Email → (DM or SMS if needed) | Every 30–60 min; postmortem within 48h |
| **SEV 2 – Major** | Partial degradation or downtime; workaround available. | Replay or query delays \>30 min, flag evaluation slow. | Slack or Email | Every 1–2 hrs |
| **SEV 3 – Minor** | Limited impact or slow recovery. | Billing sync delays, isolated org issues. | Slack | Start and close |
| **SEV 4 – Informational / Planned** | Maintenance or recovered incidents. | DB upgrade, scaling events. | Email or Slack broadcast | Before \+ after window |

## **Templates**

### **Critical**

**Subject:** 🛑 PostHog Outage – We’re investigating

Hey \[Name/Team\],

We’re investigating a major outage affecting \[feature\]. You may see \[symptom\]. Engineers are on it — updates every 30 minutes until resolved.

We know this may disrupt your work — thanks for your patience while we get things back online.

— \[Your Name\], PostHog

**Follow-Up (Resolution):** Good news — the issue is resolved. Root cause: \[summary\].
Duration: \[start–end\].
Impact: \[brief effect\].

We’re monitoring and will share a full write-up within 48 hours.

### **Major**

**Subject:** ⚠️ Performance issues in \[Feature\]

Hey \[Name\],

We’re seeing performance issues in \[component\]. You might notice \[impact\]. We’re mitigating and will update within the hour.

Thanks for your patience\!
— \[Your Name\], PostHog

---

### **Minor**

**Subject:** 🟡 Slower performance in \\\[area\\\]

FYI — This shouldn’t block you, but we’re monitoring closely. I’ll update once it’s stable.

---

### **Planned maintenance**

**Subject:** 🛠 Maintenance – \[Service/Region\]

Heads up — maintenance on \[system\] from \[time window\]. No downtime expected, but queries or replays may be briefly delayed. We’ll confirm once complete.

---

## **Tone and voice**

| Principle | Example | Avoid |
| :---- | :---- | :---- |
| **Direct** | “Event ingestion is paused.” | “We are experiencing an issue affecting a subset of users.” |
| **Empathetic** | “I know this blocks work; it’s our top priority.” | “We apologize for the inconvenience.” |
| **Plain English** | “Dashboards might not update.” | “You may experience degraded query latency.” |
| **Ownership** | “We identified a config issue on our side.” | “A third-party dependency caused an issue.” |

---

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

### **Workflow**

1. **Incident declared** (Engineering).
2. **CMOC activated**, notified of impact.
3. **CMOC drafts the initial message**, shares with the Account Owner.
4. **AM/AE/CSM sends to accounts**; backup sends if primary is offline.
5. **Updates** drafted by CMOC (30–60 min for SEV1, 1–2 hrs for SEV2).
6. **Regional handoffs** coordinated by CMOC.
7. **Resolution**: CMOC drafts closure; AM/AE/CSM (or backup) sends.
8. **Post-incident**: CMOC archives thread; GTM logs feedback and follow-ups.
9. **Postmortem**: Engineering writes technical summary; GTM adds comms learnings.

## **Example Slack workflow (Critical)**

1. **Incident created**: \#inc-2025-11-05-posthog-feature-flags-error.
2. **SRE posts summary; CMOC coordinates comms.**
3. **CMOC drafts message** and shares with the **Account Owner** (the person responsible for the affected accounts).
4. **Account Owner sends the message** to their customers. Example outbound: “We’re investigating an outage affecting event ingestion. Updates every 30 minutes.”
5. **During:** “Root cause identified (Redis queue saturation). Fix in progress.”
6. **Resolution:** “Resolved at 11:42 UTC. Write-up soon.”
