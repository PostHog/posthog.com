---
title: Releasing a new version
sidebar: Handbook
showTitle: true
---

At the moment, we release a new version every month ([unless it makes sense not to!](/blog/we-ship-whenever)). This might change in the future.

For consistency, releases happen on the last Monday of every month. Code freezes and break the release happen on the Wednesday before that. Each month there will be a different release owner in charge of the release, to be updated under this [calendar](https://calendar.google.com/calendar/embed?src=c_n8hc1iedb0k8gqhuiv83jolm50%40group.calendar.google.com&ctz=America%2FNew_York).

If we've shipped features that we want to feature in the release notes, we use the label `highlight` on our pull request. If after the code freeze we have important bugfixes that we want to get into the release, we add the label `release-[version]`. This makes it easier for the release owner to figure out changes for the release blog post and to cherry-pick commits between the Code Freeze and the Release.

## Version numbers

Every month we bump the `minor` in `major.minor.patch`. At the moment, we're at version 1 for major. This will only change once we have released sufficient functionality under stage 2 of [our Roadmap](/handbook/strategy/roadmap/).

Hopefully we will not have to do many patch versions, but if between versions we discover a breaking bug, we will.

## Timeline

> 💡 For the context of this guide `[version]` is interpreted as the version of the release (e.g. `1.29.0`).

Three business days before the release (Wednesday before the release), we institute a code freeze. Feel free to make an announcement on Slack before we cut the branch so people can have a heads up. Then, we branch master into release-[version] and deploy that to our playground environment (playground.posthog.com). We then host a hour long `break the release` session where everyone lends a hand in testing for any bugs. It is recommended to host `break the release` during an hour where as many people are available to join as possible.

Only bugfixes are allowed to be merged into this branch between the code freeze and the release going out. This gives us about three days to test the release.

The release manager is ultimately responsible for the timeline of the release. They are responsible for creating the code freeze and break the release calendar events as soon as possible. They should create these events under the `Releases` calendar linked up top.

<blockquote class="warning-note">
⚠️ As soon as the branch is created and pushed to GitHub, the Docker image will be built and pushed to Docker Hub under the tag <code>release-[version]-unstable</code>.
</blockquote>

## Checklist


### Pre-release phase (Wednesday before the release)

- [ ] Start the `release-[version]` branch to initiate the code freeze.
- [ ] Figure out what's updated in this release with the command below or by asking the Product or Engineering Team. The command will output the entire commit list to `log.txt`. You can use this list to obtain external contributions to highlight in the Array. In addition, you can look for the `highlight` tag in PRs but be mindful it's not used very consistently.
  ```bash
  git checkout release-[version]
  git log --pretty=format:"%s %ae" [old-version]..head > log.txt
  ```
- [ ] Update the `VERSION` in `posthog/version.py` and add an entry in `posthog/versions.json`
  ```bash
  git checkout release-[version]
  git add posthog/version.py posthog/versions.json
  git commit -m "Bump version [version]"
  ```
  
> 💡 Make sure you have `doctl`, `helm`, and `k9s` installed before going through the following steps. You can install all of these with `brew doctl helm k9s`.

> ⚠️ You'll also want to make sure that a Docker image under the tag `release-[version]-unstable` has been created in Docker Hub by this point. You can check its build status in the Github Actions workflow for the corresponding commit.

- [ ] Upgrade PostHog playground
    - The PostHog Playground uses a helm chart deployment on Digital Ocean. Find the playground cluster in our [Digital Ocean kubernetes clusters list](https://cloud.digitalocean.com/kubernetes/clusters?i=7cfa7c).
    - If this is your first time on Digital Ocean, you'll see the below screen. If it's not, or you don't see the Getting Started flow, click "Remind me how to use this file to connect to the cluster" in the "Config file" section under the "Overview" tab. Click Get Started.

  ![PostHog - Get Started Kubernetes](../../images/05/digital_ocean_release_01.png)

    - Copy the automatic connection script by clicking the copy icon.
  
  ![PostHog - Copy Script Kubernetes](../../images/05/digital_ocean_release_02.png)

    - Open terminal and run the command you copied. This command will set the correct kubectl context for the playground environment. As a sanity check, run `kubectl config current-context` and make sure that the current context name has `playground` in it somewhere.
    - Open another terminal window and run `k9s`. Use the arrow keys to scroll down to the posthog clusters and keep an eye on this for the duration of the upgrade. [`k9s`](https://k9scli.io/) is a terminal GUI that makes it easier to manage and observe your deployed Kubernetes applications.
    - On a separate PR, navigate to [`values.yaml`](https://github.com/PostHog/vpc/blob/main/client_values/posthog/playground.yaml) and replace the `image: -> tag:` value with the `release-[version]-unstable` tag found in Docker Hub. Tag the previous release manager on the PR and have it merged to `master`.
    - In a separate terminal window, follow the upgrade instructions [here](https://posthog.com/docs/self-host/deploy/digital-ocean#upgrading-the-chart).
    - If there are any failures showing up in `k9s` during the upgrade, ask `team-platform` for guidance.
    - Go to the [playground](https://playground.posthog.net/) and test that everything is working as expected. Check that the version running is the same as the one we're releasing.

> ⚠️ Note that you might need to follow major upgrade notes as mentioned in the upgrade guide, the same way our users would be required to.

- [ ] **Break the release session!** It's imperative that the session uses the published `release-[version]-unstable` image from Docker Hub (this is published automatically using GitHub Actions), to avoid any potential bugs creeping up in the final build stage.

### Launch phase (day of the release)
- [ ] Write up the [PostHog Array blog post](/handbook/growth/marketing/blog#posthog-array). Please tag Joe Martin for review, as this helps Marketing coordinate other announcements. 
- [ ] Tag the version in GitHub. This will also build and push the `release-[version]`, `latest-release` (for both PostHog base & FOSS) Docker images to Docker Hub. **Please do this once the release is completely ready, some users may see the image on Docker Hub and update immediately.**
  ```bash
  git tag -a [version] -m "Version [version]"
  git push origin head --tags
  ```
- [ ] Edit the [Helm Chart](https://github.com/PostHog/charts-clickhouse):
    - Bump `appVersion` to the latest app version (same number as on the Docker image).
    - Change the docker tag in [values.yaml](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/values.yaml) to point to the new tag (e.g. `release-1.29.0`).
    - Push the relevant changes and add the `bump-minor` label to the PR. **Do not merge until the latest version is built.** You can check that on [PostHog Docker](https://hub.docker.com/r/posthog/posthog/tags)
- [ ] Cherrypick the commits for the changelog and `version.py` into a new PR (branch `[version]-sync`) to make sure `master` is up to date.
  - [ ] Update the `versions.json` file and add the new release information (release name and release date). **Merging this to master will notify users that an update is available.**
- [ ] Go to the [EWXT9O7BVDC2O](https://console.aws.amazon.com/cloudfront/v3/home?region=us-east-2#/distributions/EWXT9O7BVDC2O) Cloudfront distribution to the "Invalidations" tab and add a new one with `/*` value. This will refresh the Cloudfront cache so that users can see the new version.
- [ ] Post a message on the PostHog Users Slack (community) in [#general](https://posthogusers.slack.com/archives/CT7HXDEG3) to let everyone know the release has shipped.
- [ ] Send the newsletter with the PostHog Array. The Marketing Team will arrange this, provided Joe Martin has been tagged for review in the PostHog Array blog post. 