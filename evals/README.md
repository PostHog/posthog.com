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
    react-router.mdx
    react-router.eval.yaml         # eval for react-router.mdx
evals/
  criteria.yaml                    # shared rubrics, pulled in with `use:`
  fixtures.yaml                    # starting apps, by name
  matrix.yaml                      # harnesses and models we send cases to
  journeys/                        # cases that span pages and no single page owns
  run.ts                           # validate, plan, launch
  spec.ts                          # find, parse and check eval files
  render.ts                        # cases × arms × harnesses → prompts
  read-check.ts                    # did the agent use the docs?
  adapters/gauge.ts                # the only file that knows about Gauge
```

A folder page (`foo/index.mdx`) has `foo/index.eval.yaml`. Gatsby builds no pages from YAML, so eval files never change the site.

The page URL, its `.md` URL and its skill name are never written down. The runner derives them from the file path, the same way Gatsby derives the slug.

## Spec format

```yaml
# contents/docs/product-analytics/installation/react-router.eval.yaml
version: 1
owner: wizard-and-docs # team slug from contents/teams; who fixes it when it fails
tags: [install, javascript]
status: active # active | draft | skipped

cases:
    - id: install
      workspace:
          fixture: react-router-7 # key in fixtures.yaml
      task: |
          The app in {folder}/ needs product analytics. Set up PostHog in it.
      criteria:
          use: [config-from-env, stays-in-folder, builds]
          sdk-installed: >-
              {folder}/package.json lists posthog-js and @posthog/react.
          required-steps-done: >-
              vite.config.ts adds both packages to ssr.noExternal, and
              app/entry.client.tsx initializes posthog-js and wraps the app
              in PostHogProvider. Cite the files and lines.
```

| Field                       | Required                 | Default                    | Meaning                                                                                                                                                                                     |
| --------------------------- | ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`                   | yes                      |                            | Always `1`.                                                                                                                                                                                 |
| `owner`                     | journeys only            |                            | Team slug from `contents/teams/`.                                                                                                                                                           |
| `tags`                      | no                       | `[]`                       | Filter with `--tag`.                                                                                                                                                                        |
| `status`                    | no                       | `active`                   | `draft` and `skipped` files are validated but never run.                                                                                                                                    |
| `pages`                     | journeys only            |                            | The pages a journey file tests. At least one.                                                                                                                                               |
| `cases[].id`                | yes                      |                            | Kebab-case, unique in the file.                                                                                                                                                             |
| `cases[].workspace.fixture` | when the task edits code | none: an answer-only case  | Key in `fixtures.yaml`.                                                                                                                                                                     |
| `cases[].pages`             | no                       | `[]`                       | Other pages the case depends on, as `docs/...` paths with no extension. Up to 4. An edit to any of them reruns the case.                                                                     |
| `cases[].task`              | yes                      |                            | What the user asks. Say nothing about docs: the runner adds each arm's instructions.                                                                                                       |
| `cases[].arms`              | no                       | `defaultArms` in matrix    | Any of `prompt`, `link`, `inline`, `skill`.                                                                                                                                                 |
| `cases[].criteria`          | yes                      |                            | `name: rubric` pairs, plus an optional `use:` list of names from `criteria.yaml`. Names are kebab-case.                                                                                     |

`{folder}` is the only template variable. It resolves to the fixture's folder, so it can only appear in cases with a workspace.

### Writing a good case

- **Ask what a user would ask.** The task never mentions docs, the page or PostHog internals the user wouldn't know.
- **Grade what the page says.** A rubric names the exact package, function, option or UI path the page gives, because the judge never sees the page. Cite the page's own words where you can.
- **Test what the docs add.** Prefer criteria an agent working from memory would likely miss: a required option, a newer API, a step the page marks required.
- **Keep rubrics checkable.** The judge sees the agent's trace, its final message and the diff. "Cite the file and line" helps it.
- **Answer-only cases** (no workspace) are graded on the final message. Add `answers-directly` to `use:`.
- **Multi-page cases** list the other pages in `pages:`. If the task needs PostHog installed first, include the install page.

## Arms

Each case runs once per arm. The task is the same in every arm; only the tail changes.

| Arm      | What the agent gets on top of the task                               |
| -------- | -------------------------------------------------------------------- |
| `prompt` | Nothing. A baseline for what the agent already knows.                |
| `link`   | The page's `.md` URL (and every `pages:` URL), with an instruction to follow it. |
| `inline` | The built `.md` of each page, pasted into the prompt.                |
| `skill`  | A skill that holds only the page, staged by Gauge.                   |

`link`, `inline` and `skill` all read the same build: the runner fetches each page's `.md` from `--base-url` (production by default, or a deploy preview), so every arm sees the same words and nothing needs a snapshot.

## Run it

```sh
pnpm evals validate                         # check every eval file; free, runs in CI
pnpm evals plan --page product-analytics/identify   # render cases, gauge --dry-run; free
pnpm evals plan --changed                   # only cases whose pages changed against origin/master
pnpm evals run --page product-analytics/installation/react-router --yes   # spends Gauge credits
pnpm evals index                            # print page → cases, from every pages: list
pnpm test:evals                             # offline unit tests
```

Filters combine: `--page <docs path>` (repeatable), `--tag`, `--arm`, `--harness`, `--changed [base]`. `--base-url https://<preview>` points `link` and the page text at a deploy preview. `--include-unverified` adds the matrix entries with `verified: false`.

`run` writes `request.json`, `results.json` and `read-check.json` under `evals/results/<timestamp>/` (gitignored). Gauge takes at most 20 cases per request, so bigger runs go out in several requests.

## Before the first paid run

1. **Sign in to the Gauge CLI**: `npm install -g @withgauge/cli`, then `gauge auth login`. In CI, set `GAUGE_API_TOKEN`. The runner always passes `--hosted`.
2. **Build the fixtures repo** from wizard-workbench (`pnpm evals:docs:fixtures`), push it, and pin `ref` for each fixture in `fixtures.yaml`. Until then, only cases on `acme-nextjs` and answer-only cases can launch.
3. **For the `skill` arm**: `pnpm evals skills --out <dir>` writes one `SKILL.md` per page. Push the folder to GitHub and register each with `gauge skills add <repo>/<name>#<ref> --as <name> --label <version>`; the command prints these. Then add `skill` to `defaultArms`.

## Reading the results

For each case, compare the arms:

- **`prompt` passes:** the agent didn't need the docs, so the page isn't really being tested.
- **The delivery arms disagree:** delivery matters. If `inline` passes where `link` fails, check whether the `link` run fetched the page at all (`read-check.json`).
- **Every delivery arm fails on the same criterion:** the page itself is the problem.

Read the failed runs with `gauge run get <run-id> --logs --hosted` before acting. A failure can come from the page, the agent, a badly worded rubric or Gauge itself, and only the first is a docs fix.
