---
title: Releasing a new version
sidebar: Handbook
showTitle: true
---

At the moment, we release a new version weekly. This might change in the future.

## Version numbers

Every week we up the 'minor' in `major.minor.patch`. At the moment, we're at version 1 for major. This will only change once we have released sufficient functionality under stage 2 of [our roadmap](roadmap).

Hopefully we will not have to do many patch versions, but if between releasing version we discover a breaking bug, we will.


## Timeline

We release every Wednesday. We have no set time for this but it ends up being afternoon/evening UK time by the time we have everything ready.

Three days before we release, on Monday, we institute a code freeze. We branch master into `release-[version]` and deploy that to our production environment (app.posthog.com).
Only bugfixes are allowed to be merged into this branch (and thus put on production) between Monday and the release going out. This gives us about three days to test if this release has any bugs.

## Checklist

- [ ] Figure out what's updated in this release
  - `git checkout release-[version]`
  - `git log --pretty=format:%s [old-version]..head`
- [ ] Write up the PostHog array [blogpost](posthog-array) 
- [ ] Copy from PostHog Array and write up the changes into `CHANGELOG.md`
  - `git add CHANGELOG.md`
  - `git commit -m "Changelog version 1.7.0"`
- [ ] Update the `VERSION` in `posthog/settings.py`
  - `git checkout release-[version]`
  - `git add posthog/settings.py`
  - `git commit -m "Bump version [version]"`
- [ ] Tag the version
  - `git tag -a [version] -m "Version [version]"`
  - `git push origin head --tags`

  
Once a new docker image has been built for the new version, open the [charts](https://github.com/PostHog/charts) repo and make the changes:

1. Edit the **two** files [Chart.yaml](https://github.com/PostHog/charts/blob/master/charts/posthog/Chart.yaml) and [ChartV3.yaml](https://github.com/PostHog/charts/blob/master/charts/posthog/ChartV3.yaml), in both: 
  - Bump `appVersion` to the latest app version (same number as on the docker image).
  - Bump `version` (chart version) patch number, unless making big changes to the chart itself. Lesson learned: this can only be `x.x.x`. It can't have a fourth part.
2. Change the docker tag in [values.yaml](https://github.com/PostHog/charts/blob/master/charts/posthog/values.yaml#L6) to point to [the latest tag](https://hub.docker.com/r/posthog/posthog/tags?page=1&ordering=last_updated).
3. `git commit -m 'Bump PostHog app version to 1.0.XX, release chart version 1.0.YY'`
4. `git tag -a 1.0.YY -m "Version 1.0.YY"`
5. `git push && git push origin head --tags`
