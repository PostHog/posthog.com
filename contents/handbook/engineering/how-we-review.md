---
title: How we review PRs
sidebar: Handbook
showTitle: true
---

Almost all PRs made to PostHog repositories will need a review from another engineer. We do this because, almost every time we review a PR, we find a bug, a performance issue, unnecessary code or UX that could have been confusing.

## How to review

1. Have a flick through the code.
  - What to look for:
    - Code that does the wrong thing or will produce bugs
    - Code that you think will cause performance issues
    - Are there tests for all of the new functionality, and do they test the right thing?
    - Any security issues or project leakage?
    - Is the code properly instrumented to allow tracking of every relevant action (i.e. all the relevant frontend elements have unique and helpful `data-attr`s, and there are backend events where appropriate)?
  - What _not_ to look for:
    - Formatting issues (prettier should handle this, raise a PR to fix that)
    - "I would have done it differently" (Unless the code is completely incomprehensible or unreadable, or will cause us massive harm long term - as long as it works, it's good enough.)

2. Open the review app or check the branch out locally.
  - What to look for:
    - Bugs in the new functionality (if you're reviewing the insights page, make sure you try breakdown, cohorts, filters, different time frames etc)
    - Confusing UX
    - Confusing wording
    - Backend tracked events not being fired properly or with an incorrect payload.
    - Should the code be behind a feature flag?
      - If the code is behind a feature flag, do all cases work properly? (in particular, make sure the old functionality does not break)
    - Are we building the right thing? (We should be willing to throw away PRs or start over)
    - Don't be shy here - try to break it!
  - What not to look for:
    - Issues _not_ related to this PR. Create a new issue for those.

The emphasis should be on getting something out quickly. Endless review cycles sap energy and enthusiasm.

## Setting up Heroku test environment 

1. Go to the pull request you want to QA on. 
2. Go to the Heroku test environment.
    Check/do the following:
    1. If the environment was already deployed, it should say "This branch was successfully deployed"
    1. If it says ‘This branch was not deployed’ go to the Heroku pipeline and click ‘Create review app’
    1. If the PR was submitted from a fork, you'll need to test the changes locally. 
3. Open the app, create a new account, and start testing!

