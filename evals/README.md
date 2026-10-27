# Docs evals

Checks whether coding agents can follow a docs page to a correct result. Each docs page can have an eval file beside it that says what to ask an agent and what counts as a pass. The runner in this folder turns those files into [Gauge](https://docs.withgauge.com/agents/overview) runs.

The eval lives next to the content, so a docs PR can change the page and its eval together, and the runner always tests the page as it is built.

## Where eval files live

An eval file has the page's filename with `.eval.yaml` in place of `.mdx` or `.md`:

```
contents/docs/product-analytics/
  identify.mdx
  identify.eval.yaml               # eval for identify.mdx
  installation/
    react.mdx
    react.eval.yaml                # eval for react.mdx
evals/
  shared/                          # config every eval file uses
    criteria.yaml                  # shared rubrics, listed by name in criteria.shared
    codebases-to-test.yaml         # repos the agent works in, by name
    run-config.yml                 # agents, models, samples and MCP servers for every run
  e2e-evals/                       # end-to-end checks across several pages that no single page owns
    pick-an-sdk.eval.yaml          # key prefix e2e-pick-an-sdk-
    product-analytics/             # optional subfolders, by product
      e2e.eval.yaml                # key prefix e2e-product-analytics-e2e-
  run.ts                           # the CLI: calls the three steps below in order
  load-eval-files.ts               # 1. find, read and validate eval files
  build-eval-prompts.ts            # 2. build one prompt per check
  gauge/                           # everything Gauge-specific
    send-to-gauge.ts               # 3. prompts → Gauge cases for the free dry run; waits for paid runs
    saved-evals.ts                 # sync and launch the saved Gauge evals
    saved-evals.json               # check key → saved Gauge eval id, written by sync
    gauge.json                     # Gauge project settings
```

A folder page (`foo/index.mdx`) has `foo/index.eval.yaml`. `gatsby-config.js` ignores `**/*.eval.yaml`, so Gatsby never sources, watches or builds them, however many there are.

**Every eval file under `contents/` maps to exactly one page.** A file with no page beside it fails `validate`. That rule is what lets `--page` and `--changed` find every check for a page. A product-level eval that reads the overview page and a few others can go beside the section's `index.mdx`, for example `contents/docs/product-analytics/index.eval.yaml`. Anything that belongs to no single page goes in `evals/e2e-evals/`.

The page URL and its `.md` URL are never written down. The runner derives them from the file path, the same way Gatsby derives the slug.

## Eval file format

An eval file holds a list of **checks**. A check is one prompt for an agent, what the agent gets on top of it, and the criteria that grade the result. Each check becomes one saved eval in Gauge. Gauge calls the same thing a case; `gauge/send-to-gauge.ts` turns each check into a Gauge case.

```yaml
# contents/docs/product-analytics/installation/react.eval.yaml
owner: wizard-and-docs # team slug from contents/teams; who fixes it when it fails
tags: [install, javascript, react]
status: active # active | draft | skipped

checks:
    - id: install
      description: >-
          Tests whether the React install page alone gets an agent to wrap a Vite React
          app in PostHogProvider, with config from VITE_ env variables and the
          recommended defaults.
      codebase_to_test: react-vite # key in shared/codebases-to-test.yaml
      prompt: &install-prompt |
          The app in {folder}/ needs product analytics. Set up PostHog in it.
          Only change files inside {folder}/. Read the project token and host from
          environment variables rather than writing them into the code.
      append_docs_link: true # add the page's .md URL to the end of the prompt
      criteria: &install-criteria
          shared: [config-from-env, stays-in-folder, builds]
          rubrics:
              has-posthog-js: >-
                  {folder}/package.json lists `posthog-js` as a dependency.
              uses-defaults: >-
                  The PostHog options include a defaults option set to a date string.
                  Cite the file and line(s).

    - id: install-no-docs # the same task with nothing added, to compare against
      description: Same task as install, with no docs and nothing attached.
      codebase_to_test: react-vite
      prompt: *install-prompt # YAML anchors share the prompt and criteria
      criteria: *install-criteria
```

| Field                        | Required                  | Default                    | Meaning                                                                                                                         |
| ---------------------------- | ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `owner`                      | in `e2e-evals/`           |                            | Team slug from `contents/teams/`.                                                                                               |
| `tags`                       | no                        | `[]`                       | Filter with `--tag`.                                                                                                            |
| `status`                     | no                        | `active`                   | `draft` and `skipped` files are validated but never run.                                                                        |
| `pages`                      | in `e2e-evals/`           |                            | The pages every check in the file reads. At least one, up to 8.                                                                 |
| `checks[].id`                | yes                       |                            | Kebab-case, unique in the file.                                                                                                 |
| `checks[].description`       | when there's a codebase   |                            | What the check tests and what the prompt leaves out on purpose. Read it before you edit the prompt. Never sent to the agent.    |
| `checks[].codebase_to_test`  | when the prompt edits code | none: an answer-only check | The repo the agent works in: a key in `shared/codebases-to-test.yaml`.                                                                                                       |
| `checks[].pages`             | no                        | `[]`                       | Other pages the check depends on, as `docs/...` paths with no extension. Up to 4 pages in total beside a page, 8 in `e2e-evals/`. An edit to any of them selects the check. |
| `checks[].prompt`            | yes                       |                            | What the user asks. Say nothing about docs: the `append_` keys add them.                                                        |
| `checks[].suite`             | no                        | `smoke`                    | `smoke` or `deep`. Filter with `--suite`, so a quick run can skip the expensive checks.                                         |
| `checks[].append_docs_link`    | no                      | off                        | `true` adds each page's `.md` URL to the end of the prompt. See [What the agent gets](#what-the-agent-gets).                    |
| `checks[].append_docs_content` | no                      | off                        | `true` adds each page's built text to the end of the prompt.                                                                    |
| `checks[].attach_mcp`          | no                      | none                       | An MCP server to attach, by name from the `mcp` map in `shared/run-config.yml`, for example `posthog`.                          |
| `checks[].attach_skill`        | no                      | off                        | `true` attaches the check's pages as skills. A placeholder for now: the check is always skipped.                                |
| `checks[].criteria`          | yes, with at least one    |                            | How the result is graded: `shared`, `rubrics` or both, below.                                                                          |

### Criteria

Every criterion is a pass condition the judge grades. `criteria` has two keys:

| Key       | Holds                                                    |
| --------- | -------------------------------------------------------- |
| `shared`  | Names of rubrics many pages reuse, from `shared/criteria.yaml` |
| `rubrics` | This check's own pass conditions, as `name: text`        |

Rubric names are kebab-case and can't repeat a shared name. The runner sends shared rubrics first, then the check's own.

`{folder}` is the only template variable. It resolves to the codebase's folder, so it can only appear in checks with a `codebase_to_test`.

Checks that test the same task in different setups share the prompt and criteria with YAML anchors: `prompt: &install-prompt |` on the first check, `prompt: *install-prompt` on the others. Then the checks differ only in what they add, and their results compare directly.

### Writing a good check

- **Ask what a user would ask.** Describe the goal in product terms. Don't name the API or concept the page teaches: an agent that only gets it right when the prompt names the API wasn't helped by the page. A `-no-docs` pass is the sign that a prompt gives too much away.
- **Give every check a `-no-docs` twin.** The same prompt and criteria with nothing added. It's how you tell what the page adds.
- **Say why in `description`.** Especially what the prompt leaves out on purpose, so the next editor doesn't put it back.
- **Grade what the page says.** A rubric names the exact package, function, option or UI path the page gives, because the judge never sees the page. Cite the page's own words where you can.
- **Test what the docs add.** Prefer criteria an agent working from memory would likely miss: a required option, a newer API, a step the page marks required.
- **Say what fails.** "Fails if it only identifies at login" stops the judge from passing a half-done job.
- **Keep rubrics checkable.** The judge sees the agent's trace, its final message and the diff. "Cite the file and line" helps it.
- **Answer-only checks** (no `codebase_to_test`) are graded on the final message. Add `answers-directly` to `criteria.shared`.
- **Multi-page checks** list the other pages in `pages:`. If the prompt needs PostHog installed first, include the install page. When no single page owns the task, or it needs more than 4 pages, put it in `evals/e2e-evals/` instead, in a product subfolder if you like. That file names an `owner` and a file-level `pages:` list that every check in it reads.

## What the agent gets

Each check runs once, as written. Four keys add to it, and any of them combine. Keys that start with `append_` add to the end of the prompt. Keys that start with `attach_` add to the Gauge eval.

| Key | What the agent gets on top of the prompt | Status |
| --- | --- | --- |
| none | Nothing. Measures what the agent already knows. Name the check `<id>-no-docs`. | Works |
| `append_docs_link: true` | The `.md` URL of the page and every `pages:` page, with an instruction to follow it. | Works |
| `append_docs_content: true` | The built `.md` of each page, pasted in. With `append_docs_link`, the link comes first. | Works |
| `attach_mcp: <name>` | The MCP server's tools, logged in. Gauge holds the login; the agent never sees it. | Skipped until a version is pinned |
| `attach_skill: true` | The check's pages, as skills. | Placeholder: always skipped |

The append keys read the same build: the runner fetches each page's `.md` from `--base-url` (production by default, or a deploy preview), so a link check and a content check see the same words and nothing needs a snapshot.

### MCP checks

`attach_mcp` names an entry in the `mcp` map of `shared/run-config.yml`, which pins a Gauge MCP server as `handle@version`. MCP checks log in to a PostHog project made only for evals, so an agent that creates insights or flags never touches a real project. Until that project exists, `posthog` has no version and every MCP check is skipped. To turn them on:

1. Create the eval project in PostHog.
2. In Gauge, add a new version of the `mcp.posthog.com` server and complete its OAuth login against that project (`gauge mcp add --name mcp.posthog.com --url https://mcp.posthog.com/mcp --hosted`, then sign in from the Gauge app).
3. Pin it: `posthog: mcp.posthog.com@<version>` in `shared/run-config.yml`, then `pnpm evals sync`.

### Skill checks

`attach_skill: true` is a placeholder. Write the check now and it validates, but `plan` and `run` always skip it. The plan is to wrap each page's built `.md` in a `SKILL.md` and attach it to the saved eval with `--skill`. Gauge only takes skills from GitHub, and where they live is still to be agreed with Gauge.

## Running evals

Everything goes through one command, `pnpm evals <command> [filters]`, run from the repo root. `pnpm evals help` prints the full list.

### Set up once

1. **Install and sign in to the Gauge CLI:** `npm install -g @withgauge/cli`, then `gauge auth login`. The runner always uses hosted Gauge (`--hosted`), in the org that `gauge/gauge.json` names.
2. **Check credits** with `gauge billing status --hosted`. Paid runs spend the org's shared credits.

### Commands

| Command | What it does | Cost |
| --- | --- | --- |
| `pnpm evals validate` | Checks every eval file against the format. Run it after any edit. | Free |
| `pnpm evals index` | Prints each page and every check that reads it. | Free |
| `pnpm evals plan [filters]` | Builds the selected checks' prompts and has Gauge dry-run them. Nothing runs. | Free |
| `pnpm evals sync [filters]` | Creates or updates the saved evals in Gauge, one per check. Starts no sessions. | Free |
| `pnpm evals run [filters]` | Shows how many saved evals and agent sessions will launch, asks you to confirm, then launches them and waits for the verdicts. `--yes` skips the question. | **Paid** |
| `pnpm test:evals` | The harness's offline unit tests. | Free |

### The usual workflow

1. Edit a page or its eval file.
2. `pnpm evals validate`
3. `pnpm evals sync --page <page>`: brings that page's saved evals in Gauge up to date.
4. `pnpm evals plan --page <page>`: free; shows what would run and lets Gauge check it.
5. `pnpm evals run --page <page>`: the paid run. It asks before it launches anything.
6. Commit the eval file and `gauge/saved-evals.json` together.

### Before a paid run

`run` checks which saved evals it can launch, then prints a summary and waits for an answer. Nothing is spent until you type `y`:

```
Ready to launch on Gauge
  Saved evals   21
  Sessions      21
  Samples       1 per harness model
  Harnesses     claude-code (claude-sonnet-5-5)
  Skipped       51 (listed above)

This spends Gauge credits.
Launch? [y/N]
```

Each saved eval starts one agent session for each harness model and sample. So `--include-unverified` or a higher `samples` value in `shared/run-config.yml` multiplies the session count.

### Choosing what to run

With no filters, a command acts on every active check. Filters narrow that down:

| Filter | Selects |
| --- | --- |
| `--page <docs path>` | Every check that reads the page: the page's own eval file, plus any other check that lists the page in `pages:`. Write the path without `docs/`, for example `product-analytics/installation/go`. |
| `--tag <tag>` | Eval files with that tag, for example `install`, `e2e` or `python`. |
| `--suite <suite>` | `smoke` or `deep`. |
| `--harness <id>` | One agent from `shared/run-config.yml`, including an unverified one. |
| `--changed [base]` | Checks whose page or eval file changed against `base` (default `origin/master`), including uncommitted work. |

Repeating a filter widens the selection: `--page a --page b` means page a **or** page b. Different filters narrow it: `--page a --tag e2e` means page a **and** tag e2e.

Other options:

- `--base-url https://<deploy preview>` reads the pages from a deploy preview instead of production, to test a docs PR before it merges. The default is `https://posthog.com`.
- `--include-unverified` adds the agents marked `verified: false` in `shared/run-config.yml`.
- `--write <dir>` (`plan` only) keeps the Gauge spec files it generates.
- `--prune` (`sync` with no filters only) deletes saved evals whose check no longer exists.
- `--yes` or `-y` (`run` only) answers yes to the launch question in advance. Use it in CI and scripts: without a terminal, `run` stops before it launches unless it gets `--yes`.

### Recipes

```sh
# One page: every check in its eval file, and any other check that reads it
pnpm evals sync --page product-analytics/installation/go
pnpm evals run  --page product-analytics/installation/go

# Several pages
pnpm evals run --page product-analytics/installation/python --page product-analytics/installation/ruby

# Everything with a tag
pnpm evals run --tag install

# Every page a branch changed
pnpm evals run --changed

# A docs PR, against its deploy preview
pnpm evals sync --page product-analytics/identify --base-url https://<preview-url>
pnpm evals run  --page product-analytics/identify --base-url https://<preview-url>

# Everything: sync it all, check it for free, then run it
pnpm evals sync
pnpm evals plan
pnpm evals run
```

Use the same filters and `--base-url` for `sync` and `run`: `run` launches what the saved evals hold, and refuses a check whose saved eval doesn't match.

Not supported yet: selecting a folder (`--page product-analytics/installation` fails, because `--page` matches exact pages; use `--tag install` instead) and selecting one check out of a file with several (narrow with `--page`).

### Saved evals

Every paid run launches under a **saved eval** in Gauge: one per check, with an id that doesn't change. Gauge keeps each saved eval's run history, so you can see how one check does over time: `gauge run list --eval <id> --hosted`.

- **`sync` makes Gauge match the eval files.** It creates a saved eval for a new check and edits one whose prompt, criteria, codebase, agents, samples or MCP server changed. It leaves the rest alone, so a new revision in Gauge means a real change. It records each id in `gauge/saved-evals.json`; commit that file. It skips the checks that can't run (below).
- **`run` launches under those ids.** A check with no saved eval, or one whose saved eval no longer matches the eval file, is skipped with "run pnpm evals sync".
- **Sync again** after you change an eval file, a file in `shared/`, or a page that an `append_docs_content` check pastes in.
- **The Gauge org is shared.** Our saved evals are named `[posthog.com] <check key>` and tagged `posthog-com-evals`, and sync never touches an eval without that prefix.
- A page edit changes the prompt of an `append_docs_content` check, so it starts a new revision. It doesn't change an `append_docs_link` prompt, which holds only the page's URL, so link runs before and after a page edit share a revision.

### When something can't run

`plan` and `run` never stop for one bad check. They leave it out, list it with the reason, and run the rest:

- `codebase <name> has no ref in shared/codebases-to-test.yaml`: the check uses a placeholder, a codebase whose repo doesn't exist. To make it runnable, point the check at a real codebase in that file (Gauge's reference apps are listed there, each pinned to a commit) and rewrite any rubric that names files from the old one.
- `attach_mcp posthog has no version pinned in the mcp map of shared/run-config.yml`: see [MCP checks](#mcp-checks).
- `attach_skill is a placeholder`: see [Skill checks](#skill-checks).
- `no saved eval; run pnpm evals sync` or `saved eval is out of date; run pnpm evals sync`
- `launch failed: <Gauge's error code and message>`: `run` records it and goes on. On `insufficient_credits` it stops launching, since every later launch would fail too, and lists the rest as not launched.

`run` always waits for everything that did launch, then prints one summary, for example `7 passed, 3 failed, 17 couldn't run`, with each reason. It exits with 0 only when every selected check ran and passed.

Launching many runs at once has hit `insufficient_credits` while the org still had a balance, most likely because runs in flight hold credits. Rerun what wasn't launched once the first runs finish.

### Output

`run` writes three files to `evals/results/<timestamp>/` (gitignored):

| File | Holds |
| --- | --- |
| `checks.json` | Every check it tried to launch: prompt, criteria, codebase, MCP server |
| `request.json` | For each launch: the check, its saved eval id and Gauge's launch response |
| `results.json` | Gauge's verdict for each launched run, plus every check that couldn't run and why |

## Reading the results

Compare checks that share a prompt:

- **The `-no-docs` twin passes:** the agent didn't need the docs, so the page isn't really being tested. Often the prompt names what the page should teach.
- **The docs checks disagree:** how the docs reach the agent matters. If a content check passes where a link check fails, read the link run's logs to see whether the agent fetched the page at all.
- **Every docs check fails on the same criterion:** the page itself is the problem.

Read the failed runs with `gauge run get <run-id> --logs --hosted` before acting. A failure can come from the page, the agent, a badly worded rubric or Gauge itself, and only the first is a docs fix.
