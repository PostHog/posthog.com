---
title: How we review PRs
sidebar: Handbook
showTitle: true
---

Almost all PRs made to PostHog repositories will need a review from another engineer. We do this because, almost every time we review a PR, we find a bug, a performance issue, unnecessary code or UX that could have been confusing. Here's how we do it:

## Before requesting a review

The best way to get a fast, useful review is to make your PR easy to review.

  - **Keep PRs small.** If your change touches many files or mixes unrelated concerns, break it into a stack of smaller PRs. Smaller PRs get reviewed faster and reviewed better.
  - **Open a draft PR.** This keeps notifications quiet and lets you iterate without pinging reviewers.
  - **Add AI reviewers** (e.g. Copilot) and resolve their comments. Iterate until they're only leaving nit-level feedback.
  - **Self-review your own diff.** Read through it as if you're seeing it for the first time. You'll catch obvious issues before someone else has to.
  - **Write a clear description.** Explain what the change does and why. Link the issue. If there's context a reviewer needs, put it in the description — don't make them guess.
  - **Add screenshots or GIFs for UI changes.** A reviewer shouldn't have to pull the branch and navigate to the right page just to see what a button looks like.
  - **Make sure CI is green.** Don't ask someone to spend time reviewing code that doesn't pass checks.
  - **Mark it ready for review.**

## Have a flick through the code changes

#### What to look for:
  - Does the code fit into our coding conventions?
  - Is the code free of bugs?
  - How will the solution perform at huge scale?
    - Are the database queries scalable (do they use the right indexes)?
    - Are the migrations safe?
  - Are there tests and do they test the right things?
  - Is the solution secure?
    - Is there no leakage of data between projects/organizations?
  - Is the code properly instrumented for product analytics?
  - Is there logging for changes potentially affecting infrastructure?
  - Are analytics query changes covered by snapshot tests? Does the SQL generated make sense?

#### What _not_ to look for:
  - Syntax formatting. If we're arguing about syntax, that means we should be using a formatter or linter rule.

## Run the code yourself

#### What to look for:
  - Does the PR actually solve an issue?
    - Are we building the right thing? (We should be willing to throw away PRs or start over)
  - Does the change offer a good user experience?
  - Does the UI of the change fit into our design system?
  - Should the code be behind a feature flag?
    - If the code is behind a feature flag, do all cases work properly? (in particular, make sure the old functionality does not break)
  - Are all possible paths and inputs covered? (Try to break things!)

#### What _not_ to look for:
  - Issues unrelated to this PR. Create new, separate issues for those.

The emphasis should be on getting something out quickly. Endless review cycles sap energy and enthusiasm.

## Turnaround

Aim to respond to review requests within one working day. You don't have to finish the review — even a quick "I'll look at this properly tomorrow" or "this needs someone from [@team-name] to review" unblocks the author and sets expectations. Leaving a PR in limbo for days is worse than a fast "I can't review this."

## Requesting a review outside your team

Not every team has someone available to review your PR right away. Posting in #dev-stamp-exchange is a way to ask for a quick-turnaround review from someone outside your team. This is fine — but quick turnaround doesn't mean lower standards.

#### When this is appropriate:
  - The PR is small and self-contained (think single-digit files changed)
  - It doesn't require deep product or architectural context to understand
  - CI is green and any automated review comments are addressed

#### What's still expected from the reviewer:
  - Actually read the diff — don't just hit approve
  - Consider using AI-assisted review tools (e.g. add Copilot as a reviewer) to catch things you might miss
  - Flag anything that looks off, even if you're not deeply familiar with the area

#### When to push back instead of approving:
  - The PR is too large or complex to review without context
  - There are no tests, no description, or no visual evidence of the change working
  - You're not confident the change is safe — say so. "I can't meaningfully review this, you need someone with more context" is always valid feedback

## Review comment conventions

Use prefixes on your review comments so the author knows what actually needs to change before merging:

  - **`blocking:`** This must be fixed before merge. Use sparingly — reserve it for bugs, security issues, or things that will break.
  - **`nit:`** A minor style or naming suggestion. Take it or leave it.
  - **`suggestion:`** A different approach worth considering, but the author's call.
  - **`question:`** You don't understand something. Not necessarily a problem, but you'd like clarification.

If a comment doesn't have a prefix, assume it's a suggestion. This avoids the "is this a blocker or just a thought?" ambiguity that slows reviews down.
