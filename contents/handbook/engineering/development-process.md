---
title: Shipping & releasing
sidebar: Handbook
showTitle: true
---

Any process is a balance between speed and control. If we have a long process that requires extensive QA and 10 approvals, we will never make mistakes because we will never release anything.

However, if we have no checks in place, we will release quickly but everything will be broken. For this reason we have some best practices for releasing things, and guidelines on how to ship.

## How to decide what to build

### Set milestones

To start, Product and Engineering should align on major milestones (e.g. Collaboration) which we have strong conviction will drive our success metrics for a feature.

There are two types of goals.

-   **Moonshots:** These are big, scary goals where we expect to fail 50% of the time. If we fail we expect to learn something equally as valuable as if we succeed. Just scraping the goal counts as a success.
-   **Roofshots:** These might also be big, but we expect to achieve them 100% of the time. These can be goals where we cannot afford to fail (e.g. Launch feature to keep us compliant with new regulation), or where we are confident in our approach and don’t foresee unexpected risks or issues.

Goals should be time-bound, but since we primarily use goals for our two-weekly sprint planning we should consider them generally timebound to two weeks.

Use the following principles:

-   **Clear:** Anyone with general context can read it and instantly know what specifically it means to achieve it (i.e. NOT “refactor components”)
-   **Finite:** There should be an obvious end to the goal and cannot go on forever (i.e. NOT “improve dashboards”)
-   **Assessable:** You can validate whether or not you’ve achieved the goal - it doesn’t need to be a metric (e.g. Increased signups by 20% or Events can be ingested in any order)
-   **Meaningful:** If we achieve this goal it will solve a real need for our customers (i.e. a 10x improvement in performance sounds great as a goal - but it's not meaningful if our customers are happy with the current performance)
-   **Challenging:** It should too big for one person to solve on their own and require creativity or brute force to achieve in the proposed time-frame (e.g. ship correlation analysis with a killer feature no one else has)
-   **Homogenous:** The goal should be all about achieving a single meaningful thing and not a collection of unconnected things (i.e. NOT ‘Improve query performance and launch collaboration MVP’)

### Assign an owner

A single engineer should be accountable for a milestone partnering closely with other functions to ensure it’s successful.

### Think about other teams

Most things won't cause issues for other teams. However, if it will, don't "align teams" or write a huge RFC (unless that'd help you). Do a quick 1:1 with the most relevant person on another team.

Consider:

-   The scale of the customer you're building for
-   If you can get from your hacky MVP to production-ready easily. It's OK to start with basic, but be mindful of making it harder to fully roll something out in future.
-   If you know what you're doing or need someone from another team's expertise to get the right architecture or overall approach. We have lots of experienced people, get their help if you would benefit from it.

If this is a big feature which will need an announcement, content, or other marketing support then it's _never_ too early for [the owner](/handbook/engineering/development-process#assign-an-owner) to let the Marketing team know. Drop a post in their Slack channel or tagging them on an issue.

### Break up goals

The owner turns the ambiguous milestone into a roadmap of ambitious, meaningful, sprint-sized goals, thinking 2 - 3 sprints ahead to give other functions time. [Goal principles](/handbook/engineering/development-process#set-some-milestones) still apply.

### Iterate through the work

We used to have company-wide sprint planning sessions but as we've grown there were so many teams that it started being plan-reading and not planning.

PostHog works in two week iterations. Each team plans their work together and adds their sprint plan to [a pinned issue in GitHub](https://github.com/PostHog/posthog/issues?q=sort%3Aupdated-desc%20is%3Aissue%20is%3Aopen%20%20). If the issue for the next iteration doesn't exist when you come to comment on it then you create it.

When planning your work you should also have a retrospective for the previous iteration. Like most things at PostHog this can be a very low ceremony retro and ideally checking the team is working on the right things in the right way is a frequent thing not a once a fortnight thing.

Work in the iteration should:

-   be concrete and probably achievable in 2 weeks
-   have a clear owner in the team
-   have a clear link to the team or company goals

As one of our values is [Why not now?](/handbook/company/values#why-not-now), during the iteration you might come across something that should be much higher priority than what was already planned. It's up to you to then decide to work on that as opposed to what was agreed in the planning session.

### Evaluate success

Review impact of each major milestone and feedback into the planning process.

When we review the status of goals we classify them as follows:

-   **Nailed it:** We hit the goal spectacularly. High fives all round.
-   **Scraped it:** We _almost_ hit the goal, but we'll need to do a little bit more next sprint to tidy up. We should adjust our workload to have fewer resources on big goals during the next sprint to comfortably get this finished.
-   **Failed it:** We were nowhere near hitting the goal, but we learned some valuable lessons. We're going to go back to the drawing board. Maybe the goal wasn't right or maybe there's a different way to approach it?

## What about the small stuff?

Not everything directly contributes to a company level goal. It’s important that the small stuff also gets done for us to succeed. Use the following principles:

-   **Yes, and**: Be encouraging and helpful with others who are innovating. All of our biggest wins have looked like bad ideas early on.
-   **Dogfooding**: Use the product yourself. When you see something that annoys you, fix it.
-   **Side quests:** Smaller projects you are passionate about but may not shoot up our metrics (e.g. turbo mode).
-   **Support hero:** Support hero dedicates all of their time to customers, solving the wild and wonderful issues our customers find each week.

## Sizing tasks and reducing WIP

Efficient engineering organizations actively [reduce Work In Progress](https://loom.com/share/5efceb288b634a449041918bdba08202) (WIP) to avoid negative feedback loops that drive down productivity.

Hence, a PR should be optimized for two things:

1. Quality of implementation
2. The speed with which we can merge it in

PRs should ideally be sized to be doable in one day, including code review and QA. If it's not, you should break it down into smaller chunks until it fits into a day. Tasks of this size are easy to test, easy to deploy, easy to review and less likely to cause merge conflicts.

Sometimes, tasks need a few review cycles to get resolved, and PRs remain open for days. This is not ideal, but it happens. What else can you do to make sure your code gets merged quickly?

-   First, start your own day by responding to review requests from colleagues, and unblocking their work. This builds goodwill and encourages them to also review your code in priority. Otherwise, if everybody jumps to implement new features before reviewing WIP, we will end up with [three](https://github.com/PostHog/posthog/pull/6717), [different](https://github.com/PostHog/posthog/pull/6722), [PRs](https://github.com/PostHog/posthog/pull/6766), all for the same thing.
-   Test your code. Always read through your PR's changed lines, and test everything yourself, before handing it over for review. Remember that your colleagues are busy people, and you must do what you can to save their time. There's nothing more annoying than an extra 30 min review cycle that starts with _"Almost there, just it's all black now, and remove that console.log please"_.
-   Help your reviewer by leaving comments that help them review trickier bits. Better yet, write these directly into the code, either as comments or by clearly labelling your variables.
-   It's always good to put new features behind [feature flags](/docs/user-guides/feature-flags). It's even better to develop partial features behind feature flags. As long as it's clear what needs to be done before a flag can be lifted, you can usually get the smallest bit of any new feature out in a day this way.
-   Don't be afraid to restart from scratch if the PR gets out of hand. It's a bit of time lost for you, but a lot of time saved for the reviewer if they get a clean PR to review.
-   Push your code out as a draft PR early on, so everyone can see the work in progress, and comment on the validity of the general approach when needed.
-   Remember that PRs can be reverted as easily as they can be merged. Don't be afraid to get stuff in early if it makes things better. [Why not now?](/handbook/company/values#why-not-now).
-   Most importantly, [really understand why it's paramount to reduce WIP](https://loom.com/share/5efceb288b634a449041918bdba08202), until you feel it in your bones.

## Writing code

We're big fans of [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD). We've tried to create test infrastructure that helps you rather than annoys you. If that isn't the case, please raise an issue! Keeping tests on point is a high priority to keep developer productivity high.

Other than that, you know what to do.

## Creating PRs

To make sure our issues are linked correctly to the PRs, you can tag the issue in your commit.

```bash
git commit -m "Closes #289 add posthog logo to website"
```

## Testing code

See: [How we review](/handbook/engineering/how-we-review).

### Storybook Visual Regression Tests

In our CI pipeline, we use [Playwright](https://playwright.dev/) to load our Storybook stories and take snapshots. If any changes are detected, the updated snapshots are automatically committed to the PR. This helps you quickly verify whether you've introduced unexpected changes or if the UI has been altered in the intended way.

Check the `test-runner.ts` file to see how this is configured. We use the `@storybook/test-runner` package; you can find more details in the [official Storybook documentation](https://storybook.js.org/docs/writing-tests/test-runner).

#### Running Tests Locally

1. **Start Storybook** in one terminal:

    ```bash
    pnpm storybook
    # or
    pnpm --filter=@posthog/storybook
    ```

2. **Install Playwright and run the visual tests in debug mode** in another terminal:

    ```bash
    pnpm exec playwright install
    pnpm --filter=@posthog/storybook test:visual:debug
    ```

This setup will help catch unintended UI regressions and ensure consistent visual quality.

If you wish to locally run `test-runner.ts` and output all snapshots:

```bash
pnpm --filter=@posthog/storybook test:visual:ci:update
```

Or if you wish to run one particular story:

```bash
pnpm --filter=@posthog/storybook test:visual:ci:update <path_to_story>

# example: pnpm --filter=@posthog/storybook test:visual:ci:update frontend/src/scenes/settings/stories/SettingsProject.stories.tsx
```

#### Merge conflicts with visual regression snapshots

It happens often that your PR will show conflics with our snapshots, as our CI pipeline will run `test-runner.ts` on every push, generating and pushing to your PR any significant visual changes.

Github does not allow for conflict resolution inside their website, so you must do it manually.

> The following is done on your branch in question.

1. Bring your branch up to date with `master`.

    ```bash
    git fetch origin
    ```

2. Rebase master into your branch

    ```bash
    git rebase master
    ```

3. Rebase your upstream into your local branch

    ```bash
    git pull --rebase <your branch>
    ```

In your terminal, it should show you the conflicts mimicking what you see in your Github PR.

```bash
warning: Cannot merge binary files: frontend/__snapshots__/<conflicted_file_1>.png (HEAD vs. xxx (Update UI snapshots for `chromium` (1)))
Auto-merging frontend/__snapshots__/<conflicted_file_1>.png
CONFLICT (content): Merge conflict in frontend/__snapshots__/<conflicted_file_1>.png
error: could not apply xxx... Update UI snapshots for `chromium` (1)
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
```

If all your conflicts are only snapshots, you can simply skip it.

```bash
git rebase --skip
```

If all conflicts go away, then

```bash
git push origin --force <your branch>
```

> Why does this work? As we mentioned earlier, our CI runs `test-runner.ts` on every push, so we don't really care if these images are conflicted as they are regenerated after you push to your branch.

### Deployed Preview

You can spin up a real deployed PostHog instance to test your branch by adding the `hobby-preview` label to your PR. This uses the hobby (Docker Compose) self-hosted setup under the hood.

**How it works:**

1. Add the `hobby-preview` label to your PR
2. CI creates a DigitalOcean droplet and deploys PostHog with your branch
3. A comment is posted to the PR with the preview URL (e.g., `https://hobby-pr-12345.posthog.dev`)
4. The droplet persists across commits so you can iterate
5. Remove the label or close the PR to clean up the droplet

**When to use it:**

- Testing changes in a real deployed environment
- Manual QA before merging
- Verifying Docker Compose or deployment script changes

The workflow also runs a smoke test (health check) automatically on PRs that touch deployment-related files.

## Reviewing code

When we review a PR, we'll look at the following things:

-   Does the PR actually solve the issue?
-   Does the solution make sense?
-   Will the code perform with millions of events/users/actions?
-   Are there tests and do they test the right things?
-   Are there any security flaws?
-   Is the code in line with our [coding conventions](/docs/contribute/coding-conventions)?

Things we do not care about during review:

-   Syntax. If we're arguing about syntax, that means we should install a code formatter.

## Merging

Merge anytime. Friday afternoon? Merge.

Our testing, reviewing and building process should be good enough that we're comfortable merging any time.

Always request a review on your pull request by a fellow team member (or leave unassigned for anyone to pick up when available). We avoid self-merge PRs unless it's an emergency fix and no one else is available (especially for posthog.com).

Once you merge a pull request, it will automatically deploy to all environments. The deployment process is documented in our [charts repository](https://github.com/PostHog/charts/blob/main/DEPLOYMENT.md). Check out the `#platform-bots` Slack channel to see how your deploy is progressing. 

We're managing deployments with [ArgoCD](http://go/argo) where you can also see individual resources and their status.

### Verifying your deployment

After merging, your code should deploy automatically. If you need to verify your changes are live (or troubleshoot why they're not), here's how:

#### 1. Check state.yaml (what *should* be deployed)

The [charts repository state.yaml](https://github.com/PostHog/charts/blob/main/state.yaml) is the source of truth for what ArgoCD is trying to deploy. Find your service (e.g., `ingestion`, `posthog`) and check the commit SHA listed.

#### 2. Check running pods (what's *actually* deployed)

If you have [cluster access](/handbook/engineering/how-to-access-posthog-cloud-infra), verify what's running:

```bash
# Find your service's pods
kubectl -n posthog get pods | grep <service-name>

# Get the image/commit running on a pod
kubectl -n posthog get pod <pod-name> -o jsonpath='{.spec.containers[0].image}'
```

#### 3. Verify your commit is included

Use `git merge-base` to check if your commit is an ancestor of the deployed commit:

```bash
git fetch origin
git merge-base --is-ancestor <your-commit-sha> <deployed-commit-sha> && echo "Deployed" || echo "Not deployed"
```

#### 4. Troubleshooting with ArgoCD

If `state.yaml` shows a newer commit than what's running on pods, check ArgoCD:

1. **Find the specific app** - Don't just look at the parent grouping (e.g., `ingestion`). Drill down to the specific environment app like `ingestion-events-prod-us` or `posthog-prod-eu`.

2. **Check sync status** - Is it "Synced" or "OutOfSync"? When was the last successful sync?

3. **Check if auto-sync is enabled** - Some apps may have auto-sync disabled and require manual syncing.

4. **Look at the diff** - Click "DIFF" to see what's different between desired and live state.

#### Common deployment issues

| Symptom | Likely cause | Solution |
|---------|--------------|----------|
| App shows "OutOfSync" | Auto-sync disabled or sync error | Check if auto-sync is enabled; try manual sync |
| state.yaml updated but pods unchanged | ArgoCD hasn't synced yet | Check ArgoCD app status; may need manual intervention |
| Pods running old commit | Rollout stuck or image not built | Check deployment rollout status; verify CI built the image |
| Can't find your service in ArgoCD | Looking at wrong app grouping | Search for your specific service + environment (e.g., `ingestion-events-prod-us`) |

If a deployment appears stuck, reach out in `#team-infrastructure`.

## Documenting

If you build it, [document it](/docs). You're in the best position to do this, and it forces you to think things through from a user perspective.

It's not the responsibility of either <SmallTeam slug="website" /> or <SmallTeam slug="content" /> teams to document features.

See our [docs style guide](/handbook/content/posthog-style-guide) for tips on how to write great docs.

## Releasing

There are a few different ways to release code here:

* just release the code change directly
    * when you have hign confidence the change is safe 
* release it behind a flag and slowly roll it out
    * when you don't need to run an AB test but want to be sure you can check the impact of the change 
* release it behind a flag and roll it out on demand (we call this a closed beta)
    * when you want to slowly release this to people who know they'll likely need to give feedback
    * you know it isn't complete and you need early feedback 
* release it behind a flag and run it with an AB experiment
    * you don't know what impact it will have and want to measure it 
* release it behind a flag and put it in a feature preview (we call this an open beta)
    *  when you want to slowly release this to people who know they'll likely need to give feedback
    * you know it isn't 100% and you need feedback
* run old and new at the same time
    * sometimes called the strangler fig https://martinfowler.com/bliki/StranglerFigApplication.html
    * run both old and new and compare the output / effect
    * you can then cut across (sometimes in stages) before removing the old code  

### Best practices for full releases

Opt-in betas can have rough edges, but public betas and full releases should be more polished and user friendly.

Engineers should apply the following best practices for _all_ new releases:

-   Ensure Marketing is aware of the launch, so [a launch plan](/handbook/growth/marketing/product-announcements) can be created.
-   Ensure docs are updated to reflect the new release.
-   Ensure all new features include at least one pre-made template (or equivalent) for users.

### When to A/B test

There are two broad categories of things we A/B test:

- Changes intended to move a metric (eg. changing CTAs to see if it improves click-through)
- Changes that could impact large swaths of users and their behavior, to make sure there is no negative impact (eg. moving all items in the left nav into a drawer)

The former is an optimization scheme; the latter makes sure we don't break things. Just like we create tests in our codebase to make sure new code doesn't disrupt existing features, we also need to do behavioral testing to make sure our new features aren't disrupting existing user behaviors.

A/B tests make sense when:

- There is sufficient traffic to give results in 1-2 weeks
- The change isn't simply adding a new feature (eg adding a totally new feature and A/B testing if people use the feature isn't exactly informative, though you _should_ be looking at metrics for features you ship to see if anyone uses them)
    - If the feature is designed to improve some other metric like retention or stickiness, then test away!
- The change impacts user behavior (eg most backend changes should have code tests - not behavioral A/B tests)

If you're not sure something should be A/B tested, run one anyway. Feature flags (which experiments run on top of) are a great kill-switch for rolling back features in case something goes sidwways. And it's always nice to know how your changes might move the numbers! 

It's easy to just think "this makes more sense, let's just roll it out." Sometimes that's okay, sometimes it has unintended consequences. We obviously can't and shouldn't test everything, but running A/B tests frequently gets you comfortable with being wrong, which is a _very_ handy skill to have.

#### A/B test metrics

Experiment design is a bit of an art. There are different types of [metrics](/docs/experiments/metrics) you can use in PostHog experiments. Another benefit of running experiments is forcing yourself to think through what other things your change might impact, which oftentimes doesn't happen in the regular release cycle!

Generally, a good pattern is to set up 1-2 primary metrics that you anticipate might be impacted by the A/B test, as well as 3+ secondary metrics that might also be good to keep an eye on, just in case. If you aren't sure what metrics to be testing, just ask! Lots of people are excited to help think this through (especially #team-growth and Raquel!).

### Releasing a new product

We can release alphas and betas both as publicly available, or opt-in. See: [Releasing new products and features](/handbook/product/releasing-new-products-and-features).

It's always worth letting Marketing know about new betas so they can help raise awareness. [The owner](/handbook/engineering/development-process#assign-an-owner) should tag them on an issue, or drop a message in the Marketing Slack channel.

Betas are usually announced as milestones on the public roadmap and included in the changelog by Marketing.

### Product announcements

Announcements, whether for beta or final updates, are a Marketing responsibility. See: [Product announcements](/handbook/growth/marketing/product-announcements).

In order to ensure a smooth launch [the owner](/handbook/engineering/development-process#assign-an-owner) should tell Marketing about upcoming updates as soon as possible, or include them in an All-Hands update.

It's _never_ too early to give Marketing a heads-up about something by tagging them in an issue or via the Marketing Slack channel.

### Self-hosted and hobby versions

We have [sunset support for our kubernetes and helm chart managed self-hosted offering](/blog/sunsetting-helm-support-posthog). This means we no longer offer support for fixing to specific versions of PostHog. A [docker image is pushed for each commit to master](https://hub.docker.com/r/posthog/posthog). Each of those versions is immediately deployed to PostHog Cloud.

The [deploy-hobby script](https://github.com/PostHog/posthog/blob/master/bin/deploy-hobby) allows you to set a `POSTHOG_APP_TAG` environment variable and fix your docker-compose deployed version of PostHog. Or you can edit your docker-compose file to replace each instance of `image: posthog/posthog:$POSTHOG_APP_TAG` with a specific tag e.g. `image: posthog/posthog:9c68581779c78489cfe737cfa965b73f7fc5503c`
