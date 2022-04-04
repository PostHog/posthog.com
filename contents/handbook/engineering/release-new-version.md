---
title: Releasing a new version
sidebar: Handbook
showTitle: true
---

At the moment, we release a new version every month ([unless it makes sense not to!](/blog/we-ship-whenever)). This might change in the future.

For consistency, releases happen on the last Monday of every month. Code freezes and break the release happen on the Wednesday before that. Each month there will be a different release owner in charge of the release, to be updated [here](https://calendar.google.com/calendar/embed?src=c_n8hc1iedb0k8gqhuiv83jolm50%40group.calendar.google.com&ctz=America%2FNew_York).

If we've shipped features that we want to go into release notes, we use the label `highlight` on our pull request. If after the code freeze we have important bugfixes that we want to get into the release, we add the label `release-1.version.0`. This makes it easier for the release owner to figure out changes for the release blog post and to cherry-pick commits between the Code Freeze and the Release.

## Version numbers

Every month we bump the `minor` in `major.minor.patch`. At the moment, we're at version 1 for major. This will only change once we have released sufficient functionality under stage 2 of [our Roadmap](/handbook/strategy/roadmap/).

Hopefully we will not have to do many patch versions, but if between versions we discover a breaking bug, we will.

## Timeline

> 💡 For the context of this guide `[version]` is interpreted as the version of the release (e.g. `1.29.0`).

On the week before the release, on Wednesday, we institute a code freeze (used to be Fridays but that led to a rush of PRs on the eleventh hour which made the release process trickier). We branch master into release-[version] and deploy that to our playground environment (playground.posthog.com) and ClickHouse test environment (samltest.posthog.net). Only bugfixes are allowed to be merged into this branch (and thus into production) between the code freeze and the release going out. This gives us about three days to test if this release has any bugs.

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
- [ ] Update the `VERSION` in `posthog/version.py`
  ```bash
  git checkout release-[version]
  git add posthog/version.py
  git commit -m "Bump version [version]"
  ```
- [ ] Upgrade PostHog playground
    - The PostHog Playground uses a helm chart deployment on Digital Ocean.
    - The upgrade instructions can be found [here](https://posthog.com/docs/self-host/deploy/digital-ocean#upgrading-the-chart)
    - Find the playground cluster in our [Digital Ocean kubernetes clusters list](https://cloud.digitalocean.com/kubernetes/clusters?i=7cfa7c) and switch to the right kubectl context.
    - lookup the the `release-[version]-unstable` Docker image's SHA (you can obtain it from Docker Hub, credentials in 1Password) and update that in the [`values.yaml`](https://github.com/PostHog/vpc/blob/main/client_values/posthog/playground.yaml). Make sure to commit any changes made.
    - note that you might need to follow major upgrade notes as mentioned in the upgrade guide same way our users would need to do that.
- [ ] **Break the release session!** It's imperative that the session uses the published `release-[version]-unstable` image from Docker Hub (this is published automatically using GitHub Actions), to avoid any potential bugs creeping up in the final build stage.

### Launch phase (day of the release)
- [ ] Write up the [PostHog Array blog post](/handbook/growth/marketing/blog#posthog-array)
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
- [ ] Send the newsletter with the PostHog Array. We do this through Mailchimp. You can use the template for the previously sent newsletter. You may need to ask someone with access to help with this last part.