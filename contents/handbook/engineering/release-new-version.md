---
title: Releasing a new version
sidebar: Handbook
showTitle: true
---

We release a new version every four weeks on Monday. This lines up with our sprints, which are two weeks. Code freeze and "break the release" happens on Wednesday before.

> Because there are thirteen weeks in a quarter, there is always one extra out-of-sprint week at the end of each quarter. We dedicate that last week to cleanup tasks along with OKR reflection and planning.

This consistency is important, as it means our community and our customers can look forward to new features at a predictable pace. There will always be more work that we want to do and if we get in a habit of pushing deadlines out, we'll push them further and further.

Each release there is a different release owner in charge, according to [this calendar](https://calendar.google.com/calendar/embed?src=c_n8hc1iedb0k8gqhuiv83jolm50%40group.calendar.google.com).

If we've shipped features that we want to feature in the release notes, we use the label `highlight` on our pull request. If after the code freeze we have important bugfixes that we want to get into the release, we add the label `release-[version]`. This makes it easier for the release owner to figure out changes for the release blog post and to cherry-pick commits between the Code Freeze and the Release.

> When we say "release", technically we mean releasing to self-hosted users as we deploy PostHog Cloud continuously. However, releases are still an important moment within PostHog as we publicly announce all new features.

## Version numbers

Every release we bump the `minor` in `major.minor.patch`. At the moment, we're at version 1 for major. This will only change once we have released sufficient functionality under stage 2 of [our Roadmap](/handbook/strategy/roadmap/).

Hopefully we will not have to do many patch versions, but if between versions we discover a breaking bug, we will.

## Timeline

> 💡 For the context of this guide `[version]` is interpreted as the version of the release (e.g. `1.29.0`).

On the Wednesday before the release, we institute a code freeze. Feel free to make an announcement on Slack before we cut the branch, so people have a heads-up. Then, we branch `master` into `release-[version]` and deploy that to our playground environment, [playground.posthog.com](https://playground.posthog.net/). We then host an hour-long "Break the release" session where everyone lends a hand in testing for any bugs. It's a recurring meeting, so you don't need to set it up.

Only bugfixes and finishing touches are allowed to be merged into this branch between the code freeze and the release going out. This gives us about three days to test the release.

The release manager is ultimately responsible for the timeline of the release. They are responsible for creating the "Code freeze" and "Break the release" calendar events as soon as possible. They should create these events under the `Releases` calendar linked up top.

## Steps

### Pre-release (Wednesday before the release)

1. [ ] Post in #dev about the upcoming release (replace `<version>` and `<array draft pr>` from Joe)
```
Release is happening next Monday. Which means 
1. There will be code freeze today (fixes that need to be cherry picked later should be tagged with `release-<version>`)
2. Please join the Break the Release meeting to help out testing on the Playground.
3. Shipped something awesome this month, please add a blurb or comment to <array draft pr> ([highlighted PRs](https://github.com/PostHog/posthog/pulls?q=is%3Apr+label%3A%22highlight+%3Astar%3A%22+)) :pray:
```
3. [ ] Start the `release-[version]` branch from `master` to initiate the code freeze.
4. [ ] Update the `VERSION` value in `posthog/version.py` and add an appropriate entry in `posthog/versions.json`. Then commit those changes:
  ```bash
  git checkout release-[version]
  git add posthog/version.py versions.json
  git commit -m "chore: Bump version to [version]"
  ```
1. [ ] Publish the `release-[version]` branch:
  ```bash
  git push -u origin release-[version]
  ```
  Note that this will result in a Docker image tagged `release-[version]-unstable` being built. It might take a while, but it should show up [in Docker Hub](https://hub.docker.com/r/posthog/posthog/tags?page=1&name=release) within half an hour. You can check the build's status on the [GitHub Actions page of the main repo](https://github.com/PostHog/posthog/actions/workflows/docker-unstable-image.yml).
  
  > 💡 Make sure you have `doctl`, `helm`, and `k9s` installed before going through the next steps. You can install all of these with `brew install doctl helm k9s`.
1. [ ] Create a new [`charts-clickhouse`](https://github.com/PostHog/charts-clickhouse) branch named `bump-[version]` to update the Helm chart:
    1. In [`Chart.yaml`](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/Chart.yaml) update `appVersion` to the new version.
    1. In [`Chart.yaml`](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/Chart.yaml) update `version`. 
      - If you're releasing a patch version of the app, increase the `patch` version by 1. 
      - If you're releasing a minor version of the app with no breaking changes, increase the `minor` version by 1.
      - If you're releasing a minor version of the app with breaking changes for deployment (e.g. you must run async migrations manually), increase the `major` version by 1 and publish [upgrade notes](https://github.com/PostHog/posthog.com/blob/master/contents/docs/runbook/upgrade-notes.md) for the chart.
    1. In [values.yaml](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/values.yaml) update `image.default` to point to the new **unstable** tag (i.e. `:release-[version]-unstable`).
    1. In [`ALL_VALUES.md`](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/ALL_VALUES.md) update the default value of `image.default` to what you set in the previous step. Also, update the `AppVersion` [shields.io](https://shields.io/) badge at the top.
    1. Push the relevant changes and create a PR. **Do not merge this PR.** (You can see that [in Docker Hub](https://hub.docker.com/r/posthog/posthog/tags?page=1&name=release-))
    1. Make sure all tests pass in this PR. If a test fails, to get the errors, check the "namespace report", which is run right after the failed test.

1. [ ] Upgrade PostHog playground
    1. The PostHog Playground uses a helm chart deployment on DigitalOcean. Find the playground cluster in our [DigitalOcean Kubernetes clusters list](https://cloud.digitalocean.com/kubernetes/clusters?i=7cfa7c).
    1. If this is your first time on DigitalOcean, you'll see the below screen. If it's not, or you don't see the Getting Started flow, click "Remind me how to use this file to connect to the cluster" in the "Config file" section under the "Overview" tab. Click Get Started.

      ![PostHog - Get Started Kubernetes](../../images/05/digital_ocean_release_01.png)

    1. Copy the automatic connection script by clicking the copy icon.
  
      ![PostHog - Copy Script Kubernetes](../../images/05/digital_ocean_release_02.png)

    1. Open terminal and run the command you copied. This command will set the correct kubectl context for the playground environment. As a sanity check, run `kubectl config current-context` and make sure that the current context name has `playground` in it somewhere.
    1. _Optional:_ Open another terminal window and run `k9s`. Use the arrow keys to scroll down to the PostHog clusters and keep an eye on this for the duration of the upgrade. [`k9s`](https://k9scli.io/) is a terminal GUI that makes it easier to manage and observe your deployed Kubernetes applications.  
    1. Get the latest values and store them in a `playground.yaml` file:

      ```shell
      # use tail to remove the first line "USER SUPPLIED VALUES:"
      helm get values posthog -n posthog | tail -n +2 > playground.yaml
      ```
    1. Update the `playground.yaml` for `image: -> tag:` value to `release-[version]-unstable` with the new version.
    1. Follow the upgrade instructions [here](https://posthog.com/docs/self-host/deploy/digital-ocean#upgrading-the-chart). Replace `values.yaml` in the last upgrade command with `playground.yaml`.
      > ⚠️ Note that you might need to follow major upgrade notes as mentioned in the [upgrade guide](https://posthog.com/docs/self-host/deploy/digital-ocean#upgrading-the-chart), the same way our users would be required to. If so, make any additional changes to the `playground.yaml` file as needed.
      > ⚠️ Make sure you're not in a working directory containing `posthog` folder, this could lead to the upgrade command looking for the chart locally rather than using the helm repo installed and seeing an error like `Chart.yaml not found`.
    1. Optional: Keep an eye on the progress of the upgrade in `k9s`
    1. If the `helm upgrade` command fails or if in the end the output for `kubectl get pods -n posthog` doesn't show everything as running, then ask `team-platform` for guidance.
    1. Optional: Verify playground is running the latest image by running `kubectl get pod --namespace posthog`. In the output of that command, you should see a row like `posthog-web-6447ff5fdf-gs664`. Copy this row (the numbers after `posthog-web-` will be different), and then run `kubectl  describe pod --namespace posthog posthog-web-6447ff5fdf-gs664`. If you scroll up in that output, you should see a line like `Image: posthog/posthog@sha256:daf43a4a4cd06658e41273bb8fe4a74f17b295d67c6f1e16c17243b5d09af7ee`. This is the sha of the image that is running. You can compare this to the sha in Docker Hub to verify that the image is the latest.
    1. Go to the [playground](https://playground.posthog.net/) and test that everything is working as expected. Check that the version running is the same as the one we're releasing.
    1. Commit the changes to the [`playground.yaml` file in the `vpc` repo](https://github.com/PostHog/vpc/blob/main/client_values/posthog/playground.yaml) - have someone from Infrastructure team review.
1. [ ] Time for the "Break the release" session! It's imperative that the session uses the published `release-[version]-unstable` image from Docker Hub to avoid any potential bugs creeping up in the final build stage. You're responsible for running the session, prepare the [release checklist doc](https://docs.google.com/document/d/1tyTChgLM8ZKCIyP05yDeyzS7y-s2ii5lm5WltREO3so) by adding the template at the top. Note that you're also responsible for making sure everything is tested and for cherry picking the fixes and prs tagged with `release-<version>` into the release branch.
1. [ ] Figure out what's updated in this release with the command below or by asking the Product or Engineering Team. The command will output the entire commit list to `changelog.txt`, sorted by PR [type and scope](https://www.conventionalcommits.org/en/). You can use this list to obtain external contributions to highlight in the Array. In addition, you can look for the `highlight` tag in [PRs](https://github.com/PostHog/posthog/pulls?q=is%3Apr+label%3A%22highlight+%3Astar%3A%22+) but be mindful it's not used very consistently.
  ```bash
  git checkout release-[version]
  git log --pretty=format:"%s %ae" origin/release-[old-version]..head | sort -t ':' -k 1,1 -s > changelog.txt
  ```
1. [ ] Write up the [PostHog Array blog post](/handbook/growth/marketing/blog#posthog-array). Please tag Joe Martin for review, as this helps Marketing coordinate other announcements. Do not release the post until the day of release.
1. [ ] Share the PostHog Array blog post with all partners listed in the [PostHog partner directory](/partners) via the dedicated Slack channels. Don't have access to them all? Please ask Joe Martin to do this instead. 

### Launch (day of the release)
1. [ ] Tag the version in GitHub. This will also build and push the `release-[version]`, `latest-release` (for both PostHog base & FOSS) Docker images to Docker Hub. **Please do this once the release branch is finalized, some users may see the image on Docker Hub and update immediately.**
  ```bash
  git tag -a [version] -m "Version [version]"
  git push --follow-tags
  ```
1. [ ] Update the PR in [charts-clickhouse](https://github.com/PostHog/charts-clickhouse/pulls) and change the image from `release-1.x.y-unstable` to `release-1.x.y`.
1. [ ] Publish the [PostHog Array blog post](/handbook/growth/marketing/blog#posthog-array).
1. [ ] Create a new main repo (`posthog`) branch named `sync-[version]`. Cherry-pick the `release-[version]` commits updating `version.py` and `versions.json` into `sync-[version]` and create a PR to get them into `master`. **Merging this to master will notify users that an update is available.** The Array post should be out at this point so that the "Release notes" link isn't a 404.
1. [ ] Go to the [EWXT9O7BVDC2O](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=us-east-2#/distributions/EWXT9O7BVDC2O) CloudFront distribution to the "Invalidations" tab and add a new one with `/*` value. This will refresh the CloudFront cache so that users can see the new version. You can check this by visiting https://update.posthog.com/
1. [ ] Send a message on the PostHog Users Slack (community) in [#announcements](https://posthogusers.slack.com/archives/CT7HXDEG3) to let everyone know the release has shipped.
1. [ ] Send the newsletter with the PostHog Array. The Marketing Team will arrange this, provided Joe Martin has been tagged for review in the PostHog Array blog post.
1. [ ] Enable a site banner, using the `<Banner />` component, to announce a new version. The Marketing team will arrange this. ([Example PR](https://github.com/PostHog/posthog.com/pull/4723).)

### After release
1. [ ] 48-72 hours after the release, disable the site banner. Marketing will arrange this. 
