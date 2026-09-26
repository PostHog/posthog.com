---
title: Systems and automation
sidebar: Handbook
showTitle: true
---

One of the goals for the FDE team is to accelerate and improve our delivery by focusing on building automation, over one-off work. This helps us capture deep customer knowledge and allows for faster iterations. To that end, we have built systems and workflows to help us better achieve that goal.

### FDE Vault

The <PrivateLink url="https://github.com/PostHog/fde-vault/">FDE Vault</PrivateLink> is the operational brain for the FDE team and is where we store internal context about how we work and track specific customer engagements. The goal for the FDE Vault is to compound organizational knowledge over time by encoding our standards, playbooks, pricing, decision history, mistakes, and hard-won patterns in a central repository.

### FDE Vault Boy Bot
FDE Vault Boy is a triage bot for the #team-fde Slack channel, built as a Slack workflow. It runs automatically whenever a message containing pre-defined keywords is posted in #team-fde which requires FDE attention. The bot classifies the message to identify what's being asked, then provides a tailored response based on the original ask and its category.

### Team Digest
Team Digest is a weekly GitHub Action which runs from the <PrivateLink url="https://github.com/PostHog/fde-vault/actions/workflows/digest.yml">FDE Vault</PrivateLink>. It posts a Slack message to the #team-fde channel summarizing the past week for the team: Tasks, Meetings, Deliverables, and Pull Requests (opened and merged), with the full digest details stored as a linked GitHub issue.

### FDE Signal Router
People love working in Slack, so most of how the team operates lives in threads that scroll off and never compound. The FDE Signal Router is built to catch these valuable conversations.

Reply to any Slack message with the :fde-is-on-da-job: emoji and the context is captured to a Slack canvas in the #team-fde channel, where it is routinely monitored and reviewed by the FDE team.

Use it to flag anything warranting action from the FDE team, whether that means routing it to a more permanent home or raising it for discussion at standup or sprint planning.
