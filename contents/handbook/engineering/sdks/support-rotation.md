---
title: SDK support rotation
sidebar: Handbook
showTitle: true
---

The SDK Support Hero rotation is managed by the <SmallTeam slug="client-libraries" />. Each week, one member of the team is designated the SDK Support Hero. [The schedule is managed in incident.io](https://app.incident.io/posthog/on-call/schedules/01K8WVCP2MD6JK1TEGAK97450S).

Your primary responsibility is to make sure SDK questions get some love — across all SDKs, including mobile. During the rotation, please keep an eye on:

- [Escalated SDK tickets in Zendesk](https://posthoghelp.zendesk.com/agent/filters/33118780890267)
- New issues in the SDK repositories:
  - [posthog-js (Web, Web Lite, React, React Native, Next, Node, AI)](https://github.com/PostHog/posthog-js/)
  - [posthog-python](https://github.com/PostHog/posthog-python)
  - [posthog-ios](https://github.com/PostHog/posthog-ios)
  - [posthog-android](https://github.com/PostHog/posthog-android)
  - [posthog-flutter](https://github.com/PostHog/posthog-flutter)
  - Others, see /docs/libraries

## How should I prioritize my time?

Firstly, try to stay on top of new escalated Zendesk tickets and GitHub issues, and make sure that issues related to a specific team are routed to them. If there is a relevant team (e.g. the issue is related to session replay in posthog-js), you can assign the Zendesk ticket to that team, and use the team's label in GitHub. If there is no relevant team for a GitHub issue, please label with `SDK Support Hero`. Feel free to try to fix things yourself before tagging the team.

Next, please work on SDK tickets in Zendesk, and GitHub issues labelled `SDK Support Hero` (and unlabelled, but please label these!). You can use your own judgement to decide which issues to work on but please consider effort / reward / urgency / your skill set. For example, `posthog-js` usually has the most issues, but if you're a Python expert, you might want to focus on `posthog-python`.

For mobile SDK issues, prioritize accordingly — rolling out fixes on mobile apps may take weeks or even months, so faster turnaround on these is important.

At the end of the week, please write a public handover message in `#support-client-libraries`, to let the next person know what work is in progress, let the team know how the support rotation is going in general, and to share any learnings or feedback.

