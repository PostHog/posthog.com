---
title: Onboarding customer
sidebar: Handbook
showTitle: true
---

A lot of people want to set up PostHog on their own without talking to anyone, and we'll make sure that path is as optimised as possible. However, sometimes it's more efficient/better to talk to one of us over a call. A standard structure you could maintain while doing that call is:

## 1. Introductions / find out about their business

1. Make sure you introduce yourself
1. Introduce PostHog: "We're open-source product analytics. Think Mixpanel or Amplitude, but with full control over your data and focussed on engineers"
1. Ask questions about their business:
  - Why did they reach out in the first place?
  - What are their main goals/most important metric for this quarter/batch/year?
  - Are they familiar with other product analytics tools? Are they using any right now?
  - What stage is their company at - do they have users, are they about to launch, are they trying to expand?
  - How does their app work?
  - Where does the app live? Website, online app, mobile app, backend?

## 2. Demo

Share your own screen and wizz through a demo of PostHog. The following order tends to work best:

1. Tell them the big picture of how the demo will work "I am going to show you two main things - how we collect data and what we help you do with hit"
1. Go to /events, show raw events coming in and explain how we're different from Mixpanel/Amplitude as we track all clicks, which means no `posthog.track()` calls necessary
1. Go to /trends, show filtering by url, DAU, breakdown by initial domain referrer, anything else they ask for. It's a good chance to show some knowledge ie how to understand where traffic is coming from (UTM tags or referring domain)
1. Go to /funnels, explain how those work and that PostHog specifically allows you to see each user that goes through the funnel, rather than aggregates
1. Go to Default dashboard
1. Optional: show paths
1. Ask if any questions

## 3. Setup

Flip it around and ask them to share their screen.

0. If they haven't setup PostHog yet, walk them through and help them install the snippet on their website (and anywhere else necessary)
1. Based on your questions in section 1, set up relevant dashboards for them.
  - DAUs are already there, but they might want a /trends view split out by different pages. Have them add that to default dashboard. They may also want to see where traffic is coming from as a separate item in trends to add to the dashboard.
  - Have them create an action for a click on their CTA on the home page
  - Create a funnel with two steps: pageviews and the CTA action 
1. (Optional) if they have an app, help them set up `identify` calls correctly
1. Ask if any questions

## 4. Conclusion

1. Ask them to join our Slack group (send email after)
