# PR tour

Every PR description must contain a PR tour. A PR tour is a guided walkthrough of the diff. It moves through the change feature by feature, in the order a reviewer should read it. A reviewer who follows the tour from top to bottom must understand every hunk in the diff before they open the "Files changed" tab.

Writing a good tour costs real effort. That is the point. The burden of explaining a change sits with the submitter, not the reviewer.

## When to write one

- Required for every PR that touches more than two files or more than ~50 changed lines.
- Optional for trivial PRs (a typo fix, a one-line copy edit). If you skip the tour, say so in one line: "No tour: single-line copy fix."
- Update the affected stops every time you push a change that alters the diff. A stale tour is worse than no tour.

## Placement and fold

Put the tour after the PR summary and before the [reviewer's guide](reviewers-guide.md), inside a fold:

```markdown
<details>
<summary>🗺️ PR tour</summary>

... tour content ...

</details>
```

Keep a blank line after the `<summary>` line and before `</details>`. Without those blank lines, GitHub does not render the markdown inside the fold.

## Structure

1. Order the stops by how a reviewer should read the change, not alphabetically. Start at the entry point (the page, the data source, the config change). End with consumers, tests, and cleanup.
2. Group stops by feature. One stop is one `###` heading. A stop usually covers one file. Small related files can share a stop.
3. At each stop, write:
   - What changed, in one or two sentences.
   - Why it changed, when the diff alone does not show the reason.
   - A link to the file in the diff (see "Linking into the diff").
   - An embedded code permalink for the hunks that matter most (see below).
4. Cover every changed file. Mechanical changes (renames, import updates, formatting) can share one final stop: list the files and label them "mechanical only". Never leave a file out – an untoured file reads as an unreviewed file.
5. Call out surprises at the stop where they appear: deleted code, changed behavior, a new dependency, or a decision a reviewer would question. Do not bury them.
6. Write the tour in [Simplified Technical English](asd-ste100.md), like the rest of the PR.

## Linking into the diff

Generate all links after your final push. Use the head commit SHA, never a branch name – branch links go stale when the branch moves.

1. Get the head SHA: `git rev-parse HEAD`.
2. **Embedded code (preferred).** Paste a permalink with a line range on its own line, surrounded by blank lines:

   ```
   https://github.com/PostHog/posthog.com/blob/<full-sha>/src/components/Example.tsx#L12-L24
   ```

   GitHub expands this into an inline code snippet in the PR body. It must use the full 40-character SHA, and it must sit alone on its line. Use one embed per stop for the hunk that carries the change. Do not embed every hunk – embed the ones a reviewer must see.
3. **Link to a file in the "Files changed" tab.** The anchor is the SHA-256 hash of the file path:

   ```bash
   printf '%s' 'src/components/Example.tsx' | shasum -a 256
   ```

   Then link: `https://github.com/PostHog/posthog.com/pull/<number>/files#diff-<hash>`. This needs the PR number, so add these links in an edit right after you open the PR.
4. If you amend or force-push, regenerate every SHA-based link with the new head SHA.

## Template

```markdown
<details>
<summary>🗺️ PR tour</summary>

### Stop 1: <feature or file> ([diff](<files-changed-anchor>))

<What changed and why, one or two sentences.>

<permalink-with-line-range on its own line>

<Callout for anything surprising at this stop.>

### Stop 2: ...

### Stop N: Mechanical changes

These files only have import updates and formatting: `<file>`, `<file>`.

</details>
```

## Example stop

```markdown
### Stop 2: Reading time calculation ([diff](https://github.com/PostHog/posthog.com/pull/1234/files#diff-ab12...))

The blog index now shows an estimated reading time on each card. The estimate
comes from the post body's word count at 265 words per minute.

https://github.com/PostHog/posthog.com/blob/f8da1bc04c1c.../src/components/Blog/index.tsx#L41-L52

⚠️ Note: this reads `post.rawBody`, which is only available after the
`onCreateNode` change in Stop 1. The two stops must land together.
```
