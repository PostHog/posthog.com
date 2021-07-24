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

Three days before we release, on Monday, we institute a code freeze. We branch master into release-[version] and deploy that to our playground environment (playground.posthog.com). Only bugfixes are allowed to be merged into this branch (and thus put on production) between Monday and the release going out. This gives us about three days to test if this release has any bugs.

## Checklist

<input type="checkbox"/> Figure out what's updated in this release
  - `git checkout release-[version]`
  - `git log --pretty=format:"%s %ae" [old-version]..head > log.txt`
The command above will output the entire commit list to `log.txt`. You can use this list to obtain external contributions to highlight in the Array.

<br />

<input type="checkbox"/> Write up the [PostHog Array blog post](/handbook/growth/marketing/blog#posthog-array)

<input type="checkbox"/> Copy from PostHog Array and write up the changes into `CHANGELOG.md` following the structure of the previous release
  - `git add CHANGELOG.md`
  - `git commit -m "Changelog version 1.7.0"`

<br />


<input type="checkbox"/> Update the `VERSION` in `posthog/version.py`
  - `git checkout release-[version]`
  - `git add posthog/version.py`
  - `git commit -m "Bump version [version]"`

<br />

<input type="checkbox"/> Tag the version
  - `git tag -a [version] -m "Version [version]"`
  - `git push origin head --tags`


Once a new Docker image has been built (see [Docker Hub](https://hub.docker.com), password in 1Password) for the new version, open the [charts](https://github.com/PostHog/charts) repo and make the changes:

1. Edit the **two** Chart files: [Chart.yaml](https://github.com/PostHog/charts/blob/master/charts/posthog/Chart.yaml) and [ChartV3.yaml](https://github.com/PostHog/charts/blob/master/charts/posthog/ChartV3.yaml), in both: 
    - Bump `appVersion` to the latest app version (same number as on the docker image).
    - Bump `version` (chart version) patch number, unless making big changes to the chart itself. Lesson learned: this can only be `x.x.x`. It can't have a fourth part.
2. Change the docker tag in [values.yaml](https://github.com/PostHog/charts/blob/master/charts/posthog/values.yaml#L6) to point to [the latest tag](https://hub.docker.com/r/posthog/posthog/tags?page=1&ordering=last_updated).
3. `git commit -m 'Bump PostHog app version to 1.0.XX, release chart version 1.0.YY'`
4. `git tag -a 1.0.YY -m "Version 1.0.YY"`
5. `git push && git push origin head --tags`

Finally to bump the `latest-release` docker image, log to [hub.docker.com](https://hub.docker.com/repository/docker/posthog/posthog/builds) and configure a new automatic build. Set the docker tag to `latest-release` and the source to the tag `1.XX.YY`. Delete any older tag with the same name if present and click "save & build".
