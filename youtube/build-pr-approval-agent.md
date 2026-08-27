Read https://github.com/PostHog/posthog/blob/master/tools/pr-approval-agent/README.md and build the equivalent for the repo at <path>.

Copy the architecture; preserve its safety invariants exactly (fail closed, never request changes or merge, LLM can tighten gates but never loosen).

Their deny-list and thresholds are calibrated to their codebase — re-derive for me: mine my git history for high-blast-radius deny candidates and calibrate size/tier ceilings from my merged PRs, then propose the full gate config for my sign-off before writing any code.

At the same time, ask me whatever you can't derive from the repo — at minimum the CI system and trigger label, escalation routing if there's no CODEOWNERS, and which LLM/SDK to use and how CI gets its credentials.

Leave the result as uncommitted files on my working tree.
