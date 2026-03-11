---
title: Frontend coding conventions
sidebar: Handbook
showTitle: true
---

This page covers frontend-specific coding conventions for the PostHog codebase.

## Testing

React testing library tests are particularly useful for components with complex interactions or to guide future humans or agents when they're changing components without full context of its uses and edge cases.

For visual regression testing using Storybook, see the [development process page](/handbook/engineering/development-process#storybook-visual-regression-tests).

## State management

We use [Kea](https://kea.js.org/) for state management across the PostHog frontend. If you're unfamiliar with Kea, check out the [Kea documentation](https://kea.js.org/docs/intro/what-is-kea) to get started.
