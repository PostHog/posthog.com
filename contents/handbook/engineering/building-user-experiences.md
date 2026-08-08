---
title: Building user experiences
sidebar: Handbook
showTitle: true
---

Most people now use agents to do much of the manual work involved with building products. This necessarily changes how we should be building and prioritizing UX.

## Who we are building for

We've historically only built for humans. We're now responsible for three sets of users:

- Humans who define the work
- Their agents who operate for them
- OR humans who are still doing the work

Our current revenue base relies a lot on humans who are doing the work. However, this likely does not represent our future revenue base - over time, humans-doing-the-work will employ more agents for these tasks. The tail of this is long, however, and can take a long time to transition.

## How to prioritize

1. All engineers should use an agent as their primary product testing interface.
    - This means you need to have Claude, PostHog Code, or another agent connected to your local stack so you can test changes in development.
    - Testing with agent prompts can feel slow. We likely need better testing infrastructure - if you come up with ideas for how to make this faster, build it and share it with the team.
2. Build features into PostHog Code.
    - PostHog Code is the new surface that's built for an agent-first UX. We'll change the name (again! Array -> Twig -> Code -> idk something else maybe just v2) eventually to reflect that it's not just for coding.
    - Hop into [#project-bluebird](https://posthog.slack.com/archives/C0B73C8480P) in Slack, have your agent add you to the `project-bluebird` feature flag, and figure out what a great experience looks like for your product there.
3. Collect agent feedback on your new features with the agent-feedback MCP tool.
3. Build features into the existing PostHog web interface, but don't spend time optimizing any UX here.
    - Code is cheap and easy. We shouldn't force people who aren't ready for an agent-first experience to move there before they, or their employer, is ready.
    - A quick check to make sure something works in the web UI is sufficient.
    - Don't optimize setup forms, page layouts, navigation, etc. Leave that all alone for now.

