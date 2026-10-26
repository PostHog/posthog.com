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
  criteria.yaml                    # shared rubrics, listed by name in criteria.shared
  fixtures.yaml                    # starting apps, by name
  matrix.yaml                      # harnesses and models we send checks to
  journeys/                        # checks that span pages and no single page owns
  run.ts                           # validate, plan, launch
  spec.ts                          # find, parse and validate eval files
  assertions.ts                    # typed assertions → criteria with fixed wording
  render.ts                        # checks × arms × harnesses → prompts
  docs-read.ts                     # did the agent use the docs?
  adapters/gauge.ts                # the only file that knows about Gauge
```

A folder page (`foo/index.mdx`) has `foo/index.eval.yaml`. Gatsby builds no pages from YAML, so eval files never change the site.

The page URL, its `.md` URL and its skill name are never written down. The runner derives them from the file path, the same way Gatsby derives the slug.

## Eval file format

An eval file holds a list of **checks**. A check is one prompt for an agent and the criteria that grade the result. Gauge calls the same thing a case; `adapters/gauge.ts` turns each check into a Gauge case.

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
      workspace:
          fixture: react-vite # key in fixtures.yaml
      prompt: |
          The app in {folder}/ needs product analytics. Set up PostHog in it.
          Only change files inside {folder}/. Read the project token and host from
          environment variables rather than writing them into the code.
      criteria:
          shared: [config-from-env, stays-in-folder, builds]
          assertions:
              - dependency: posthog-js
              - dependency: '@posthog/react'
          rubrics:
              uses-defaults: >-
                  The PostHog options include a defaults option set to a date string.
                  Cite the file and line(s).
```

| Field                        | Required                  | Default                    | Meaning                                                                                                                         |
| ---------------------------- | ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `owner`                      | journeys only             |                            | Team slug from `contents/teams/`.                                                                                               |
| `tags`                       | no                        | `[]`                       | Filter with `--tag`.                                                                                                            |
| `status`                     | no                        | `active`                   | `draft` and `skipped` files are validated but never run.                                                                        |
| `pages`                      | journeys only             |                            | The pages a journey file tests. At least one.                                                                                   |
| `checks[].id`                | yes                       |                            | Kebab-case, unique in the file.                                                                                                 |
| `checks[].description`       | when there's a workspace  |                            | What the check tests and what the prompt leaves out on purpose. Read it before you edit the prompt. Never sent to the agent.    |
| `checks[].workspace.fixture` | when the prompt edits code | none: an answer-only check | Key in `fixtures.yaml`.                                                                                                         |
| `checks[].pages`             | no                        | `[]`                       | Other pages the check depends on, as `docs/...` paths with no extension. Up to 4. An edit to any of them reruns the check.     |
| `checks[].prompt`            | yes                       |                            | What the user asks. Say nothing about docs: the runner adds each arm's instructions.                                           |
| `checks[].suite`             | no                        | `smoke`                    | `smoke` or `deep`. Filter with `--suite`, so a quick run can skip the expensive checks.                                         |
| `checks[].arms`              | no                        | `defaultArms` in matrix    | Any of `baseline`, `link`, `inline`, `skill`.                                                                                   |
| `checks[].criteria`          | yes, with at least one    |                            | How the result is graded. Has up to three keys, below.                                                                          |

### Criteria

Every criterion is a pass condition the judge grades. There are three kinds, each under its own key in `criteria`:

| Key          | Holds                                          | Wording comes from |
| ------------ | ---------------------------------------------- | ------------------ |
| `shared`     | Names of rubrics many pages reuse              | `criteria.yaml`    |
| `assertions` | Typed one-line facts, listed below             | `assertions.ts`    |
| `rubrics`    | This check's own pass conditions, `name: text` | The eval file      |

Rubric names are kebab-case, can't repeat a shared name and can't start with `assert-`. The runner sends shared rubrics first, then assertions, then rubrics.

`{folder}` is the only template variable. It resolves to the fixture's folder, so it can only appear in checks with a workspace.

### Assertions

An assertion states one fact in one line. Use one when it says everything a rubric would; write a rubric when the fact has conditions, alternatives or an order. Each assertion becomes a criterion named `assert-<kind>-<subject>`.

| Assertion                         | Needs a workspace | Becomes the criterion                                                    |
| --------------------------------- | ----------------- | ------------------------------------------------------------------------ |
| `dependency: <package>` (+ `in:`) | yes               | `{folder}/<in, default package.json>` lists the package as a dependency. |
| `command: <command>`              | yes               | The trace shows the command run in `{folder}/` and finishing cleanly.    |
| `file-exists: <path>`             | yes               | `{folder}/<path>` exists when the run ends.                              |
| `calls: <function>` (+ `in:`)     | yes               | The code (in `{folder}/<in>` if given) calls the function.               |
| `no-literal-token: true`          | yes               | No `phc_` project token appears as a literal in `{folder}/`.             |
| `mentions: <text>`                | no                | The final answer mentions the text.                                      |

The wording lives in `assertions.ts`, so the same assertion reads the same way on every page and results line up across pages. Today Gauge's judge grades assertions like any other criterion. If Gauge ever hands back the final workspace, `adapters/` can run them as code instead, and no eval file changes.

### Writing a good check

- **Ask what a user would ask.** Describe the goal in product terms. Don't name the API or concept the page teaches: an agent that only gets it right when the prompt names the API wasn't helped by the page. A `baseline` pass is the sign that a prompt gives too much away.
- **Say why in `description`.** Especially what the prompt leaves out on purpose, so the next editor doesn't put it back.
- **Grade what the page says.** A rubric names the exact package, function, option or UI path the page gives, because the judge never sees the page. Cite the page's own words where you can.
- **Test what the docs add.** Prefer criteria an agent working from memory would likely miss: a required option, a newer API, a step the page marks required.
- **Say what fails.** "Fails if it only identifies at login" stops the judge from passing a half-done job.
- **Keep rubrics checkable.** The judge sees the agent's trace, its final message and the diff. "Cite the file and line" helps it.
- **Answer-only checks** (no workspace) are graded on the final message. Add `answers-directly` to `criteria.shared`.
- **Multi-page checks** list the other pages in `pages:`. If the prompt needs PostHog installed first, include the install page.

## Arms

Each check runs once per arm. The prompt is the same in every arm; only the tail changes.

| Arm        | What the agent gets on top of the prompt                                         |
| ---------- | -------------------------------------------------------------------------------- |
| `baseline` | Nothing. Measures what the agent already knows.                                  |
| `link`     | The page's `.md` URL (and every `pages:` URL), with an instruction to follow it. |
| `inline`   | The built `.md` of each page, pasted into the prompt.                            |
| `skill`    | A skill that holds only the page, staged by Gauge.                               |

`link`, `inline` and `skill` all read the same build: the runner fetches each page's `.md` from `--base-url` (production by default, or a deploy preview), so every arm sees the same words and nothing needs a snapshot.

## Run it

```sh
pnpm evals validate                         # check every eval file; free
pnpm evals plan --page product-analytics/identify   # render checks, gauge --dry-run; free
pnpm evals plan --changed                   # only checks whose pages changed against origin/master
pnpm evals run --page product-analytics/installation/react --yes   # spends Gauge credits
pnpm evals index                            # print page → checks, from every pages: list
pnpm test:evals                             # offline unit tests
```

Filters combine: `--page <docs path>` (repeatable), `--tag`, `--suite`, `--arm`, `--harness`, `--changed [base]`. `--base-url https://<preview>` points `link` and the page text at a deploy preview. `--include-unverified` adds the matrix entries with `verified: false`.

`run` writes `checks.json`, `request.json`, `results.json` and `docs-read.json` under `evals/results/<timestamp>/` (gitignored). Gauge takes at most 20 cases per request, so bigger runs go out in several requests.

## Before the first paid run

1. **Sign in to the Gauge CLI**: `npm install -g @withgauge/cli`, then `gauge auth login`. In CI, set `GAUGE_API_TOKEN`. The runner always passes `--hosted`.
2. **Build the fixtures repo** from wizard-workbench (`pnpm evals:docs:fixtures`), push it, and pin `ref` for each fixture in `fixtures.yaml`. Until then, only checks on `acme-nextjs` and answer-only checks can launch.
3. **For the `skill` arm**: `pnpm evals skills --out <dir>` writes one `SKILL.md` per page. Push the folder to GitHub and register each with `gauge skills add <repo>/<name>#<ref> --as <name> --label <version>`; the command prints these. Then add `skill` to `defaultArms`.

## Reading the results

For each check, compare the arms:

- **`baseline` passes:** the agent didn't need the docs, so the page isn't really being tested. Often the prompt names what the page should teach.
- **The delivery arms disagree:** delivery matters. If `inline` passes where `link` fails, check whether the `link` run fetched the page at all (`docs-read.json`).
- **Every delivery arm fails on the same criterion:** the page itself is the problem.

Read the failed runs with `gauge run get <run-id> --logs --hosted` before acting. A failure can come from the page, the agent, a badly worded rubric or Gauge itself, and only the first is a docs fix.
