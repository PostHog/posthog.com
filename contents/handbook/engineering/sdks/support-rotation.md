---
title: SDK support rotation
sidebar: Handbook
showTitle: true
---

Outside of your team's Support Hero rotation, you are also eligible to serve in a one week SDK Support Hero rotation. [The schedule is managed in incident.io](https://app.incident.io/posthog/on-call/schedules/01K8WVCP2MD6JK1TEGAK97450S).

Your primary responsibility is simply to make sure SDK questions get some love. During the rotation, please keep an eye on two things:

- [Escalated SDK tickets in Zendesk](https://posthoghelp.zendesk.com/agent/filters/33118780890267)
- New issues in the SDK repositories
  - [posthog-js (Web, Web Lite, React, Next, Node, AI)](https://github.com/PostHog/posthog-js/)
  - [posthog-python](https://github.com/PostHog/posthog-python)
  - Others, see /docs/libraries

You don't have to be an expert in all of the SDKs, but it can be a great opportunity to dive into parts unknown.

## How should I prioritize my time?

Firstly, try to stay on top of new escalated Zendesk tickets and GitHub issues, and make sure that issues related to a specific team are routed to them. If there is a relevant team (e.g. the issue is related to session replay in posthog-js), you can assign the Zendesk ticket to that team, and use the team's label in GitHub. If there is no relevant team for a GitHub issue, please label with `SDK Support Hero`. Feel free to try to fix things yourself before tagging the team.

Next, please work on SDK tickets in Zendesk, and GitHub issues labelled `SDK Support Hero` (and unlabelled, but please label these!). You can use your own judgement to decide which issues to work on but please consider effort / reward / urgency / your skill set. For example, `posthog-js` usually has the most issues, but if you're a Python expert, you might want to focus on `posthog-python`.

At the end of the week, please write a public handover message in `#support-client-libraries`, to let the next person know what work is in progress, let the team know how the support rotation is going in general, and to share any learnings or feedback.

## Mobile SDKs

For Mobile SDK issues, the SLA has to be a bit faster since rolling out fixes on Mobile Apps may take weeks or even months.

- [Escalated SDK tickets in Zendesk](https://posthoghelp.zendesk.com/agent/filters/42222680081819)
- New issues in the SDK repositories
  - [posthog-js (React Native)](https://github.com/PostHog/posthog-js/tree/main/packages/react-native)
  - [posthog-ios](https://github.com/PostHog/posthog-ios)
  - [posthog-android](https://github.com/PostHog/posthog-android)
  - [posthog-flutter](https://github.com/PostHog/posthog-flutter)

Mobile support tickets reported by the PostHog app - Contact support panel with the Mobile topic will be assigned to the Mobile group on Zendesk and triaged by the Client Libraries team.

The <SmallTeam slug="client-libraries" /> will triage and fix them if they are in our domain area or reassign them to the related team.

If you see a Mobile SDK issue, please escalate it to the <SmallTeam slug="client-libraries" /> as soon as possible (@mobile-folks or @client-libraries-folks) on Slack, Mobile group on Zendesk, and @team-client-libraries on GitHub).

The Mobile folks are also happy to collaborate on any non-Mobile SDK issue that requires knowledge in the Mobile ecosystem, e.g., you're debugging person profiles from customers using the Mobile SDKs, and you don't have context on how the SDK works/identifies users.

