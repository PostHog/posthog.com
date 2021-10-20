---
title: Releasing a new version
sidebar: Handbook
showTitle: true
---

At the moment, we release a new version every month ([unless it makes sense not to!](/blog/we-ship-whenever)). This might change in the future.

## Version numbers

Every month we bump the `minor` in `major.minor.patch`. At the moment, we're at version 1 for major. This will only change once we have released sufficient functionality under stage 2 of [our Roadmap](/handbook/strategy/roadmap/).

Hopefully we will not have to do many patch versions, but if between versions we discover a breaking bug, we will.

## Timeline

> 💡 For the context of this guide `[version]` is interpreted as the version of the release (e.g. `1.29.0`).

On the week before the release, on Friday, we institute a code freeze. We branch master into release-[version] and deploy that to our playground environment (playground.posthog.com) and ClickHouse test environment (samltest.posthog.net). Only bugfixes are allowed to be merged into this branch (and thus put on production) between the code freeze and the release going out. This gives us about three days to test if this release has any bugs.

<blockquote class="warning-note">
⚠️ As soon as the branch is created and pushed to GitHub, the Docker image will be built and pushed to Docker Hub under the tag <code>release-[version]-unstable</code>.
</blockquote>

## Checklist


### Pre-release phase

- [ ] Start the `release-[version]` branch to initiate the code freeze.
- [ ] Figure out what's updated in this release with the command below. The command will output the entire commit list to `log.txt`. You can use this list to obtain external contributions to highlight in the Array.
  ```bash
  git checkout release-[version]
  git log --pretty=format:"%s %ae" [old-version]..head > log.txt
  ```
- [ ] Write up the main fixes/improvements and breaking changes into `CHANGELOG.md` following the structure of the previous release
  ```bash
  git add CHANGELOG.md
  git commit -m "Changelog version 1.29.0"
  ```
- [ ] Update the `VERSION` in `posthog/version.py`
  ```bash
  git checkout release-[version]
  git add posthog/version.py
  git commit -m "Bump version [version]"
  ```
- [ ] Deploy PostHog playground from the `release-[version]` branch on Heroku dashboard.
- [ ] Deploy ClickHouse test environment from the `release-[version]-unstable` Docker image.
- [ ] **Break the release session!** It's imperative that the session uses the published `release-[version]-unstable` image from Docker Hub (this is published automatically using GitHub Actions), to avoid any potential bugs creeping up in the final build stage.

### Launch phase
- [ ] Write up the [PostHog Array blog post](/handbook/growth/marketing/blog#posthog-array)
- [ ] Edit the [Helm Chart](https://github.com/PostHog/charts-clickhouse):
    - Bump `appVersion` to the latest app version (same number as on the Docker image).
    - Change the docker tag in [values.yaml](https://github.com/PostHog/charts-clickhouse/blob/main/charts/posthog/values.yaml) to point to the new tag (e.g. `release-1.29.0`).
    - Push the relevant changes and add the `bump-minor` label to the PR. **Do not merge until the latest version is built.**
- [ ] Tag the version in GitHub. **This will immediately mark that a new version is available for users. Do this when you're sure the new release is ready.** This will also build and push the `release-[version]`, `latest-release` & `foss-release-[version]` Docker images to Docker Hub.
  ```bash
  git tag -a [version] -m "Version [version]"
  git push origin head --tags
  ```
- [ ] Cherrypick the commits for the changelog and `version.py` into a new PR (branch `[version]-sync`) and merge to make sure `master` is up to date.
- [ ] Post a message on the PostHog Users Slack (community) in [#general](https://posthogusers.slack.com/archives/CT7HXDEG3) to let everyone know the release has shipped.
- [ ] Send the newsletter with the PostHog Array. We do this through Mailchimp. You can use the template for the previously sent newsletter. You may need to ask someone with access to help with this last part.