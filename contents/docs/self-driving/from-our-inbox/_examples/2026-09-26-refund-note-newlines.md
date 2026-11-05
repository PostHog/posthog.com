---
category: User experience
report:
  title: Enter in a refund note submits the form before the note is complete
  source: Scout · Self-driving GitHub issues (custom)
  body: >-
    A GitHub issue reported that adding a new line to an Inbox refund note submits the form.
    Once a reason is selected, both Enter and Shift+Enter reach the form's submit handler.
    The investigation found that the note field lacks the keyboard event guard already used
    by the dismiss dialog.
  suggestedAction: >-
    Add the same guard to the refund note. Test both keys to confirm they insert a new line
    without submitting, and check that the Refund button sends the complete note.
inboxExample:
  reportId: 01a0dd18-a10d-70c3-af15-044b7c6ffe68
  publishedAt: 2026-09-26
  outcome: >-
    An implementation agent added the guard and regression tests after the report became ready.
    The tests failed before the fix and passed after it. The pull request merged with the
    change limited to the refund dialog and its tests.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/107220
    title: "fix(signals): prevent refund submission when adding a newline"
    mergedAt: 2026-09-26
---
