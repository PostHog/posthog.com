---
title: How we review PRs
sidebar: Handbook
showTitle: true
---

<!-- Canonical "how to review a PR" reference: review requirements, review checklists, turnaround, partial reviews, and comment conventions live here. Shipping/release process lives in development-process.md, link to this page from there, don't duplicate review guidance. -->

Almost all PRs made to PostHog repositories need a review before merging. We do this because, almost every time we review a PR, we find a bug, a performance issue, unnecessary code, or UX that could have been confusing. Here's how we do it:

## Review requirements

PRs can be written by humans or by agents (like PostHog Code). See [Creating PRs](/handbook/engineering/development-process#creating-prs) for how we distinguish AI-assisted human-authored PRs from fully automatically generated agent-authored PRs. Either way, the normal rule is that every PR needs a review before merging, and a human always merges. If you need an urgent review, ask in the `#dev-stamp-exchange` Slack channel. For true emergencies where no one else is available, an admin can bypass review requirements.

Who should review depends on who wrote the code:

- **Human-authored PRs** can be reviewed by a team member or by Stamphog, our AI approval agent. Stamphog runs deterministic checks first (size, file ownership, tier) and then does an LLM review for approval eligibility and suggestions. Stamphog is the only AI approval agent whose approval can satisfy the review requirement, and only for eligible human-authored PRs, so a team member can merge.
- **Agent-authored PRs** always require a human review since we want at least one human in the loop. A team member must review the PR and approve it before merging.

We encourage the use of AI review agents (Codex, Copilot, Greptile, etc.) on PRs. Run them when they're useful, whether before opening a PR, while iterating, or before requesting a human review, and respond to or resolve meaningful comments. Other AI review agent comments and suggestions do not count as approval, but they catch things humans miss and speed up the review process. Avoid adding more agent reviews when the PR already has automated feedback. Three agents arguing with each other is noisy, unless the extra agent has a niche focus like security.

## What reviews are for

Automated reviewers are useful for cheap, repetitive checks: obvious bugs, missing tests, typo-level mistakes, suspicious edge cases, and things that look like lint or static analysis. They reduce noise for humans, but they don't replace human judgment.

Human reviewers should focus on things agents are bad at:

- Does this solve the right problem for customers?
- Is this the right thing to build at all?
- Does it fit the team's direction and the surrounding product context?
- Is the UX clear?
- Is the approach simple, maintainable, secure, and scalable?

Reviews also build shared context and collective ownership. They are a chance to teach, learn, and make sure more than one person understands important changes. The author still owns correctness: reviewers help reduce risk, but approval does not move responsibility away from the person responsible for the PR.

If a change has long-term impact, such as architecture, schema, API, dependency, framework, or build changes, ask or pair with someone who has deeper context before merging. The goal is not to gatekeep, but to understand the tradeoffs and avoid surprising the team later.

If a change affects public behavior, docs, examples, changelogs, APIs, configuration, or defaults, review those as part of the PR too. Changes that need human judgment should get human review rather than relying on agents alone. This is especially important for SDK changes. Our [SDK guidelines](/handbook/engineering/sdks/guidelines) call out that public APIs, configuration, defaults, and behavior that affects customers need human review for ergonomics, platform fit, and long-term support cost.

Don't spend human review cycles on syntax formatting or preferences that a formatter, linter, or agent should catch.

> The one sanctioned exception is the break-glass [Force-merge a PR](/handbook/engineering/development-process#break-glass-force-merge-a-pr) Slack app, used in exceptional cases (almost always during an incident) to merge a PR without the normal review and checks. Every use is audited.

## Before requesting a review

The best way to get a fast, useful review is to make your PR easy to review.

  - **Keep PRs small.** If your change touches many files or mixes unrelated concerns, break it into a stack of smaller PRs. Smaller PRs get reviewed faster and reviewed better.
  - **Open a draft PR.** This keeps notifications quiet and lets you iterate without pinging reviewers.
  - **Use AI reviewers** (e.g. Copilot) or your own agent review where useful, and resolve meaningful comments. Iterate until they're only leaving nit-level feedback.
  - **Self-review your own diff.** Read through it as if you're seeing it for the first time. You'll catch obvious issues before someone else has to.
  - **Write a clear description.** Explain what the change does and why. Link the issue. Explain important tradeoffs or approaches you considered but rejected. If there's context a reviewer needs, put it in the description so they don't have to guess.
  - **Annotate specific lines when useful.** Leave comments on non-obvious code, risky tradeoffs, or places where extra context will help the reviewer.
  - **Ask the right person or team.** Pick reviewers who have the context needed for the change, but avoid assigning a crowd. If multiple teams need to weigh in, be clear who should review which part.
  - **Add screenshots or GIFs for UI changes.** A reviewer shouldn't have to pull the branch and navigate to the right page just to see what a button looks like.
  - **Describe validation.** Say what you tested, what manual QA you did, and why tests weren't added if applicable.
  - **Avoid unnecessary rebases once review has started.** They can orphan review comments and make it harder for reviewers to see what changed.
  - **Make sure CI is green.** Don't ask someone to spend time reviewing code that doesn't pass checks.
  - **Mark it ready for review.**

After you make changes, re-request review and leave a short comment when important feedback has been addressed, especially if the fix is not obvious from the diff.

If your repository needs a clearer signal that a PR is ready for review, consider adding a lightweight checklist to your PR template. For example: "I've self-reviewed this PR", "I've run or added AI review and addressed relevant comments", and "This PR was agent-authored and needs human review." Keep this repository-specific and only add it if it reduces confusion.

## Have a flick through the code changes

#### What to look for:
  - Does the code fit into our coding conventions?
  - Is the code free of bugs?
  - How will the solution perform at huge scale?
    - Are the database queries scalable (do they use the right indexes)?
    - Are the migrations safe?
  - Are there tests and do they test the right things?
    - Do they cover the requirement or defect, not just implementation details?
    - Do they simulate how a user would call the API or use the UI where possible?
    - Do they cover permissions and access control where relevant?
    - If tests were AI-written, do the assertions prove the behavior is correct rather than only passing?
    - Are the tests simple enough to trust, without unnecessary branching or looping?
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
    - Is there anything here we should not build?
  - Does the change offer a good user experience?
  - Does the UI of the change fit into our design system?
  - Should the code be behind a feature flag?
    - If the code is behind a feature flag, do all cases work properly? (in particular, make sure the old functionality does not break)
  - Are all possible paths and inputs covered? (Try to break things!)

#### What _not_ to look for:
  - Issues unrelated to this PR. Create new, separate issues for those.

The emphasis should be on getting something out quickly. Endless review cycles sap energy and enthusiasm.

## Turnaround

Aim to respond to review requests within one working day. You don't have to finish the review. Even a quick "I'll look at this properly tomorrow" or "this needs someone from [@team-name] to review" unblocks the author and sets expectations. Leaving a PR in limbo for days is worse than a fast "I can't review this."

## Requesting a review outside your team

Not every team has someone available to review your PR right away. Posting in #dev-stamp-exchange is a way to ask for a quick-turnaround review from someone outside your team. This is fine, but quick turnaround doesn't mean lower standards.

#### When this is appropriate:
  - The PR is small and self-contained (think single-digit files changed)
  - It doesn't require deep product or architectural context to understand
  - CI is green and any automated review comments are addressed

#### What's still expected from the reviewer:
  - Actually read the diff. Don't just hit approve
  - Consider using AI-assisted review tools (e.g. add Copilot as a reviewer) to catch things you might miss
  - If your approval is intentionally low-context to unblock someone, say that in the review so the author knows to seek deeper help if needed
  - Flag anything that looks off, even if you're not deeply familiar with the area

#### When to push back instead of approving:
  - The PR is too large or complex to review without context
  - There are no tests, no description, or no visual evidence of the change working
  - You're not confident the change is safe. Say so. "I can't meaningfully review this. You need someone with more context" is always valid feedback

## Partial reviews

If you were asked to review only one aspect of a PR (e.g. copy, design, infra, security), submit your review as **Comment**, not **Approve**. An Approve from any reviewer clears the review requirement and marks the PR mergeable, so it should mean "I reviewed this against the full checklist above." Reserve Approve for when you actually did.

If multiple reviewers are splitting aspects of a PR, the author is responsible for making sure at least one Approve came from someone who reviewed the code. CODEOWNERS can enforce this on a per-path basis where it matters.

## Choosing a GitHub review state

Use **Comment** for thoughts, questions, suggestions, partial reviews, or feedback where the author can use their judgment.

Use **Approve** when you think the PR is safe to merge. It's fine to approve with nits or suggestions.

Use **Request changes** only when you believe merging the PR as-is would be seriously unsafe and you can keep the feedback loop moving. Examples include security or privacy risks, data loss or corruption, migrations that are unsafe or hard to roll back, unexpected breaking changes to public APIs or contracts, or changes likely to materially harm customers or the company.

Remember that **Request changes** blocks the PR until you approve a later revision or the state is dismissed. A `blocking:` comment can be submitted with **Comment**, especially when something must be fixed but you cannot own prompt follow-up. Authors and mergers should not merge while unresolved `blocking:` comments remain, even if those comments were submitted with **Comment**. If you use **Request changes**, make the required change explicit, watch for the author's response, and re-review promptly. If you won't be available, prefer **Comment** or hand off to someone who can follow through.

## Review comment conventions

Use prefixes on your review comments so the author knows what actually needs to change before merging:

  - **`blocking:`** This must be fixed before merge. Use sparingly, and reserve it for bugs, security issues, or things that will break. A `blocking:` comment does not require **Request changes**; use **Comment** if **Request changes** would unnecessarily block the feedback loop.
  - **`nit:`** A minor style or naming suggestion. Take it or leave it. If only nits remain, consider approving rather than forcing another review cycle.
  - **`suggestion:`** A different approach worth considering, but the author's call.
  - **`question:`** You don't understand something. Not necessarily a problem, but you'd like clarification.

If a comment doesn't have a prefix, assume it's a suggestion. This avoids the "is this a blocker or just a thought?" ambiguity that slows reviews down.
