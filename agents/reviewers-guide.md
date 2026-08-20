# Reviewer's guide

Nearly every PR description must contain a "Reviewer's guide" section. This section is written for the reviewer, and it has three jobs:

1. Prove the testing that was done.
2. Show the visual evidence.
3. Point the reviewer at the risk.

Two PRs do not need one: a trivial PR (a typo fix, a one-line copy edit), and a [content PR](../AGENTS.md#content-prs) – a change under `contents/` plus the navigation entries it needs. A content PR that touches navigation still owes the reviewer before/after screenshots of the nav.

Place the guide at the end of the PR description, after the [PR tour](pr-tour.md), inside a fold:

```markdown
<details>
<summary>🔍 Reviewer's guide</summary>

... guide content ...

</details>
```

Keep a blank line after the `<summary>` line and before `</details>`. Without those blank lines, GitHub does not render the markdown inside the fold.

Update the guide every time the PR changes – a guide that describes an old revision will get the PR closed.

## Section 1: Testing done

Record every check you ran, as a table. Only record what you actually ran and observed. Never write "tested" or "works" without the command and the result. If a claim in this table turns out to be false, that is worse than an empty table.

```markdown
### Testing done

| Check | Command / method | Result |
|---|---|---|
| Formatting | `pnpm format` on changed files | No changes needed |
| Dev server | `pnpm start`, loaded `/blog` and `/blog/some-post` | Pages render, no new console errors |
| Redirects | `pnpm test-redirects` | 0 failures |
| Window resize | Resized the Blog app from 400px to full width | Layout reflows, no overflow |
```

List anything you did **not** test in a "Not tested" line below the table, with the reason. An honest gap is acceptable. A hidden gap is not.

```markdown
**Not tested:** production build (`pnpm build`) — exceeds this environment's memory. Needs a CI pass before merge.
```

## Section 2: Screenshots

Required for any visual change. Provide before/after screenshots for every affected area, following the grid below. All apps are resizable, so a single desktop-width capture proves nothing.

Read the [browser screenshots guide](browser-screenshots.md) before you start. It covers how to drive a browser, which tool paints what, and how to upload the images with `gh attach` – `gh` cannot attach an image to a PR body on its own.

```markdown
### Screenshots

#### <Affected area, e.g. "Blog index card">

| State | Before | After |
|---|---|---|
| Light, narrow window | <img src="..." width="300"> | <img src="..." width="300"> |
| Light, wide window | <img src="..." width="300"> | <img src="..." width="300"> |
| Dark, narrow window | <img src="..." width="300"> | <img src="..." width="300"> |
| Dark, wide window | <img src="..." width="300"> | <img src="..." width="300"> |
```

If your environment cannot take screenshots, that is a blocker. Ask your user to supply them. Do not open the PR without them. A state you tried to capture and could not – a menu the tool will not paint, a width you cannot set – goes in the "Not tested" line with the reason. Never leave a cell of the grid silently empty.

## Section 3: What to look at

Name the most risky or most controversial parts of the PR. This is the part of the guide reviewers read first, so make it count:

- List zero to three items, ordered by risk, highest first. No need to make anything up just to fill a bullet point.
- For each item, give: a link to the code, why it is risky, and what a mistake there would break (the blast radius).
- Never write "low risk, nothing to look at". Every PR has a most dangerous line. Name it, even in a small PR.
- Controversial counts as risky. If you made a judgment call the reviewer could reasonably disagree with (an abstraction, a dependency, a naming choice), list it here instead of hoping nobody notices.

```markdown
### What to look at

1. **[`gatsby/onCreateNode.ts:88`](<permalink>)** — I add `rawBody` to every MDX
   node. This runs for all ~4,000 content files at build time. A mistake here
   breaks the whole build, not one page. Check the null guard on line 90.
2. **[`src/components/Blog/index.tsx:41`](<permalink>)** — the 265 words-per-minute
   constant is my judgment call, not a product decision. Push back if you want a
   different number or a shared constant.
```

## Full skeleton

```markdown
<details>
<summary>🔍 Reviewer's guide</summary>

### Testing done
<table>

**Not tested:** <gaps, with reasons — or omit the line if there are none>

### Screenshots
<grids per affected area — omit for non-visual PRs>

### What to look at
<0–3 risk items, highest first>

</details>
```
