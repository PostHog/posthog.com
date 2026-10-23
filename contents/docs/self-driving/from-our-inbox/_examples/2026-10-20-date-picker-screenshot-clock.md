---
category: "Code health"
report:
  title: "Date picker screenshots change with the clock even when the code stays the same"
  source: "Scout · Unfrozen time in visual tests (custom)"
  body: >-
    A custom scout found that DateTimePicker stories build date ranges, labels, and calendar bounds from the real clock.
    Screenshots therefore change with the date even when the component code stays the same.
    These differences add noise to visual reviews.
  suggestedAction: >-
    Freeze the clock for these stories.
    Render them with different browser dates and check that the screenshots stay the same.
inboxExample:
  reportId: 01a1406b-9a63-7e83-b065-62bd58de961e
  publishedAt: 2026-10-20
  outcome: >-
    The implementation agent added the missing Storybook clock decorator and moved initial date construction into rendering.
    The merged pull request records that all seven checked stories stayed identical across two browser dates after the fix.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/117992
    title: "fix(quill): freeze clock in DateTimePicker stories"
    mergedAt: 2026-10-19
---
