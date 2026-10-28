# Docs evals

Tests whether a coding agent can follow a docs page to a correct result. Each page can have an eval file beside it that says what to ask the agent and what counts as a pass. The runner in this folder turns those files into [Gauge](https://docs.withgauge.com/agents/overview) runs.

The eval sits next to the page, so a docs PR changes both together, and every run tests the page as built.

Only `evals/gauge/` knows about Gauge. The eval files, the `shared/` config and `results.json` use no Gauge terms, so another runner would replace that one folder.

## Where eval files live

An eval file has the page's filename, with `.eval.yaml` in place of `.mdx` or `.md`:

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
  e2e-evals/                       # checks across several pages that no single page owns
    pick-an-sdk.eval.yaml          # key prefix e2e-pick-an-sdk-
    product-analytics/             # optional subfolders, by product
      e2e.eval.yaml                # key prefix e2e-product-analytics-e2e-
  run.ts                           # the CLI: calls the three steps below in order
  load-eval-files.ts               # 1. find, read and validate eval files
  build-eval-prompts.ts            # 2. build one prompt per check
  gauge/                           # everything Gauge-specific
    send-to-gauge.ts               # 3. prompts → Gauge cases for the free dry run; waits for paid runs
    saved-evals.ts                 # sync and launch the saved Gauge evals
    mcp-servers.yml                # attach_mcp name → the pinned Gauge MCP server
    gauge.json                     # Gauge project settings
```

A folder page (`foo/index.mdx`) has `foo/index.eval.yaml`. `gatsby-config.js` ignores `**/*.eval.yaml`, so Gatsby never builds or watches them.

**Every eval file under `contents/` maps to exactly one page.** `validate` fails a file with no page beside it. This is how `--page` and `--changed` find every check for a page. A product-level eval that reads the overview and a few other pages goes beside the section's `index.mdx`, such as `contents/docs/product-analytics/index.eval.yaml`. Anything that belongs to no single page goes in `evals/e2e-evals/`.

The runner derives the page URL and its `.md` URL from the file path, the same way Gatsby derives the slug. You never write them down.

## Eval file format

An eval file holds a list of **checks**. A check is one prompt, what the agent gets on top of it, and the criteria that grade the result. Each check becomes one saved eval in Gauge, named `[posthog.com/<path>] <check id>` (see [Saved evals](#saved-evals)). Gauge calls a check a case.

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
                  The PostHog options include a defaults option set to
                  '<ph_posthog_js_defaults>'. Cite the file and line(s).

    - id: install-no-docs # the same task with nothing added, to compare against
      description: Same task as install, with no docs and nothing attached.
      codebase_to_test: react-vite
      prompt: *install-prompt # YAML anchors share the prompt and criteria
      criteria: *install-criteria
```

| Field                          | Required                   | Default                    | Meaning                                                                                                                                                                      |
| ------------------------------ | -------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `owner`                        | in `e2e-evals/`            |                            | Team slug from `contents/teams/`.                                                                                                                                            |
| `tags`                         | no                         | `[]`                       | Filter with `--tag`.                                                                                                                                                         |
| `status`                       | no                         | `active`                   | `draft` and `skipped` files are validated but never run.                                                                                                                     |
| `pages`                        | in `e2e-evals/`            |                            | The pages every check in the file reads. 1 to 8.                                                                                                                             |
| `checks[].id`                  | yes                        |                            | Kebab-case, unique in the file.                                                                                                                                              |
| `checks[].description`         | when there's a codebase    |                            | What the check tests and what the prompt leaves out on purpose. Read it before you edit the prompt. Never sent to the agent.                                                 |
| `checks[].codebase_to_test`    | when the prompt edits code | none: an answer-only check | The repo the agent works in: a key in `shared/codebases-to-test.yaml`.                                                                                                       |
| `checks[].pages`               | no                         | `[]`                       | Other pages the check depends on, as `docs/...` paths with no extension. Up to 4 pages in total beside a page, 8 in `e2e-evals/`. An edit to any of them selects the check. |
| `checks[].prompt`              | yes                        |                            | What the user asks. Say nothing about docs: the `append_` keys add them.                                                                                                     |
| `checks[].suite`               | no                         | `smoke`                    | `smoke` or `deep`. Filter with `--suite` to skip the expensive checks.                                                                                                       |
| `checks[].append_docs_link`    | no                         | off                        | `true` adds each page's `.md` URL to the end of the prompt. See [What the agent gets](#what-the-agent-gets).                                                                 |
| `checks[].append_docs_content` | no                         | off                        | `true` adds each page's built text to the end of the prompt.                                                                                                                 |
| `checks[].attach_mcp`          | no                         | none                       | An MCP server to attach, by name from the `mcp` map in `shared/run-config.yml`, such as `posthog`.                                                                           |
| `checks[].attach_skill`        | no                         | off                        | `true` attaches the check's pages as skills. A placeholder for now: the check is always skipped.                                                                             |
| `checks[].criteria`            | yes, at least one          |                            | How the result is graded: `shared`, `rubrics` or both.                                                                                                                       |

### Criteria

Each criterion is a pass condition the judge grades. `criteria` has two keys:

| Key       | Holds                                                          |
| --------- | -------------------------------------------------------------- |
| `shared`  | Names of rubrics many pages reuse, from `shared/criteria.yaml` |
| `rubrics` | This check's own pass conditions, as `name: text`              |

Rubric names are kebab-case and can't repeat a shared name. The runner sends shared rubrics first.

Prompts and rubrics take two template variables:

- `{folder}` becomes the codebase's folder, so only checks with a `codebase_to_test` can use it.
- `<ph_posthog_js_defaults>` becomes the posthog-js `defaults` date that docs code blocks show, read from `src/components/CodeBlock/index.tsx`. Use it instead of a date, so the rubric stays correct when the docs move to a new date. `scripts/check-posthog-js-defaults.js` fails on any hardcoded date in an eval file.

Checks that test one task in different setups share the prompt and criteria with YAML anchors: `prompt: &install-prompt |` on the first check, `prompt: *install-prompt` on the others. The checks then differ only in what they add, so their results compare directly.

### Writing a good check

- **Ask what a user would ask.** Describe the goal in product terms, and don't name the API or concept the page teaches. If the agent only gets it right when the prompt names the API, the page didn't help. A `-no-docs` pass means the prompt gives too much away.
- **Give every check a `-no-docs` twin**, with the same prompt and criteria and nothing added. It shows what the page adds.
- **Say why in `description`**, especially what the prompt leaves out on purpose, so the next editor doesn't put it back.
- **Grade what the page says.** The judge never sees the page, so a rubric names the exact package, function, option or UI path the page gives. Quote the page where you can.
- **Test what the docs add.** Prefer criteria an agent working from memory would miss: a required option, a newer API, a step the page marks required.
- **Say what fails.** "Fails if it only identifies at login" stops the judge passing a half-done job.
- **Keep rubrics checkable.** The judge sees the agent's trace, its final message and the diff. "Cite the file and line" helps.
- **Answer-only checks** (no `codebase_to_test`) are graded on the final message. Add `answers-directly` to `criteria.shared`.
- **Multi-page checks** list the other pages in `pages:`. If the task needs PostHog installed first, include the install page. If no single page owns the task, or it needs more than 4 pages, put it in `evals/e2e-evals/`. That file names an `owner` and a file-level `pages:` list that every check in it reads.

## What the agent gets

Each check runs once, as written. Four keys add to it, in any combination. `append_` keys add to the end of the prompt. `attach_` keys add to the Gauge eval.

| Key                         | What the agent gets on top of the prompt                                                | Status                                              |
| --------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| none                        | Nothing. Measures what the agent already knows. Name the check `<id>-no-docs`.          | Works                                               |
| `append_docs_link: true`    | The `.md` URL of the page and every `pages:` page, with an instruction to follow them.  | Works                                               |
| `append_docs_content: true` | The built `.md` of each page, pasted in. With `append_docs_link`, the link comes first. | Works                                               |
| `attach_mcp: <name>`        | The MCP server's tools, logged in. Gauge holds the login; the agent never sees it.      | Skipped until `gauge/mcp-servers.yml` pins a server |
| `attach_skill: true`        | The check's pages, as skills.                                                           | Placeholder: always skipped                         |

Both `append_` keys read the same build: the runner fetches each page's `.md` from `--base-url` (production by default, or a deploy preview). A link check and a content check see the same words, and nothing needs a snapshot.

### MCP checks

`attach_mcp` names an entry in the `mcp` map of `shared/run-config.yml`, which gives the server's URL. `gauge/mcp-servers.yml` pins the Gauge MCP server for each name as `handle@version`. MCP checks log in to a PostHog project made only for evals, so an agent that creates insights or flags never touches a real project. That project doesn't exist yet, so `posthog` has no pin and every MCP check is skipped. To turn them on:

1. Create the eval project in PostHog.
2. In Gauge, add a new version of the `mcp.posthog.com` server and log it in to that project: `gauge mcp add --name mcp.posthog.com --url https://mcp.posthog.com/mcp --hosted`, then sign in from the Gauge app.
3. Pin it as `posthog: mcp.posthog.com@<version>` in `gauge/mcp-servers.yml`, then run `pnpm evals sync`.

### Skill checks

`attach_skill: true` is a placeholder. The check validates, but `plan` and `run` always skip it. The plan is to wrap each page's built `.md` in a `SKILL.md` and attach it to the saved eval with `--skill <name>@<version>`. Gauge registers skills from a GitHub repo (`gauge skills add owner/repo/skill --track`); we haven't picked the repo.

## Running evals

Run everything from the repo root with `pnpm evals <command> [filters]`. `pnpm evals help` lists every option.

### Set up once

1. **Install and sign in to the Gauge CLI:** `npm install -g @withgauge/cli`, then `gauge auth login`. The runner always uses hosted Gauge, in the org that `gauge/gauge.json` names.
2. **Check credits** with `gauge billing status --hosted`. Paid runs spend the org's shared credits.

### Commands

| Command                     | What it does                                                                                                             | Cost     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| `pnpm evals validate`       | Checks every eval file against the format. Run it after any edit.                                                        | Free     |
| `pnpm evals index`          | Prints each page and every check that reads it.                                                                          | Free     |
| `pnpm evals plan [filters]` | Builds the selected checks' prompts and has Gauge dry-run them. Starts no sessions.                                      | Free     |
| `pnpm evals sync [filters]` | Creates or updates one saved eval in Gauge per check. Starts no sessions.                                                | Free     |
| `pnpm evals run [filters]`  | Shows how many saved evals and sessions will launch, asks you to confirm, then launches them and waits for the verdicts. | **Paid** |
| `pnpm test:evals`           | The runner's offline unit tests.                                                                                         | Free     |

### The usual workflow

1. Edit a page or its eval file.
2. `pnpm evals validate`
3. `pnpm evals sync --page <page>` brings that page's saved evals up to date.
4. `pnpm evals plan --page <page>` shows what would run, for free.
5. `pnpm evals run --page <page>` is the paid run. It asks before it launches anything.
6. Commit the eval file. Gauge finds saved evals by name, so there's no Gauge state to commit.

### Before a paid run

`run` prints a summary and waits. Nothing is spent until you type `y`:

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

Each saved eval starts one session per harness model per sample. `--include-unverified` or a higher `samples` value in `shared/run-config.yml` multiplies the count.

### Choosing what to run

With no filters, a command acts on every active check. Filters narrow it:

| Filter               | Selects                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--page <docs path>` | Every check that reads the page: its own eval file, plus any check that lists it in `pages:`. Write the path without `docs/`, such as `product-analytics/installation/go`. |
| `--tag <tag>`        | Eval files with that tag, such as `install`, `e2e` or `python`.                                                                                                            |
| `--suite <suite>`    | `smoke` or `deep`.                                                                                                                                                         |
| `--harness <id>`     | One agent from `shared/run-config.yml`, including an unverified one.                                                                                                       |
| `--changed [base]`   | Checks whose page, eval file, or a snippet or component the page imports changed against `base` (default `origin/master`), including uncommitted work.                     |

Repeating a filter widens the selection: `--page a --page b` means a **or** b. Different filters narrow it: `--page a --tag e2e` means a **and** e2e.

Other options:

- `--base-url https://<deploy preview>` reads pages from a deploy preview, to test a docs PR before it merges. Default: `https://posthog.com`.
- `--include-unverified` adds the agents marked `verified: false` in `shared/run-config.yml`.
- `--write <dir>` (`plan` only) keeps the Gauge spec files.
- `--prune` (`sync` with no filters only) deletes saved evals whose check no longer exists.
- `--yes` or `-y` (`run` only) answers yes to the launch question. Without a terminal, as in CI, `run` won't launch unless it gets `--yes`.

### Recipes

```sh
# One page: its eval file, and any other check that reads it
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

# Everything: sync, check for free, then run
pnpm evals sync
pnpm evals plan
pnpm evals run
```

Use the same filters and `--base-url` for `sync` and `run`. `run` launches what the saved evals hold, and skips a check whose saved eval doesn't match the eval file.

Not supported yet: selecting a folder (`--page` matches exact pages, so use `--tag install` instead), and selecting one check from a file with several.

### Saved evals

Every paid run launches under a **saved eval** in Gauge, one per check. Its name identifies it: `[posthog.com/<path>] <check id>`, where the path is the page or the e2e file. For example:

- `[posthog.com/docs/product-analytics/installation/react] install`
- `[posthog.com/evals/e2e-evals/posthog-instrumentation] instrument-app`

The repo stores no Gauge ids, so parallel PRs don't conflict. Gauge keeps each saved eval's run history: find its id with `gauge eval list --hosted`, then `gauge run list --eval <id> --hosted`.

- **`sync` makes Gauge match the eval files.** It creates a saved eval for a new check, and edits one only when its prompt, criteria, codebase, agents, samples or MCP server changed, so a new Gauge revision always means a real change. It skips checks that can't run (below). If two saved evals share a name, it changes neither and reports them.
- **`run` finds each saved eval by name.** It skips a check with no saved eval, or one that no longer matches the eval file, with "run pnpm evals sync".
- **Sync again** after you change an eval file, a file in `shared/`, or a page that an `append_docs_content` check pastes in. A page edit doesn't change an `append_docs_link` prompt, which holds only the URL.
- **Renaming starts a new saved eval.** Moving a page or changing a check id changes the name. Sync creates a new saved eval and lists the old one, with its run history, as an orphan.
- **The Gauge org is shared.** Sync only touches evals whose name starts with `[posthog.com`, all tagged `posthog-com-evals`. A full `sync` lists evals with the older `[posthog.com] <check key>` names as orphans, and `--prune` deletes them.

### When something can't run

`plan` and `run` never stop for one bad check. They list it with the reason and run the rest:

- `codebase <name> has no ref in shared/codebases-to-test.yaml`: the check points at a placeholder codebase whose repo doesn't exist. Point it at a real codebase in that file (Gauge's reference apps are there, each pinned to a commit) and rewrite any rubric that names files from the old one.
- `attach_mcp posthog has no Gauge server pinned in gauge/mcp-servers.yml`: see [MCP checks](#mcp-checks).
- `attach_skill is a placeholder`: see [Skill checks](#skill-checks).
- `no saved eval; run pnpm evals sync` or `saved eval is out of date; run pnpm evals sync`.
- `launch failed: <Gauge's error code and message>`: `run` records it and carries on. On `insufficient_credits` it stops launching and lists the rest as not launched.

`run` waits for everything that launched, then prints one summary, such as `7 passed, 3 failed, 17 couldn't run`, with each reason. It exits 0 only when every selected check ran and passed.

Launching many runs at once has hit `insufficient_credits` while the org still had credits, probably because runs in flight hold them. Rerun what didn't launch once the first runs finish.

### Output

`run` writes four files to `evals/results/<timestamp>/` (gitignored):

| File             | Holds                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checks.json`    | Every check it tried to launch: prompt, criteria, codebase, MCP server.                                                                                                |
| `request.json`   | For each launch: the check, its saved eval id and Gauge's launch response.                                                                                             |
| `results.json`   | One entry per session, in no Gauge terms: `{ check, harness, model, passed, criteria: [{ name, passed, reason }], url }`. Plus every check that couldn't run, and why. |
| `gauge-raw.json` | Gauge's own verdict for each check, for debugging.                                                                                                                     |

## Reading the results

Compare checks that share a prompt:

- **The `-no-docs` twin passes:** the agent didn't need the docs, so the page isn't being tested. The prompt often names what the page should teach.
- **The docs checks disagree:** how the docs reach the agent matters. If a content check passes and a link check fails, read the link run's logs to see whether the agent fetched the page.
- **Every docs check fails on the same criterion:** the page is the problem.

Read failed runs with `gauge run get <run-id> --logs --hosted` before you act. A failure can come from the page, the agent, a badly worded rubric or Gauge, and only the first is a docs fix.
