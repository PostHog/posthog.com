---
title: Releasing a new version
sidebar: Company
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
- [ ] Write up the changes into `CHANGELOG.md`
  - Create a pull request
- [ ] Update the `VERSION` in `posthog/settings.py`
  - `git checkout release-[version]`
  - `git add posthog/settings.py`
  - `git commit -m "Bump version [version]"`
- [ ] Tag the version
  - `git commit -a [version] -m "Version [version]"`
  - `git push origin head --tags`
- [ ] Update settings.py in [posthog-production](http://github.com/posthog/posthog-production)
  - `git add settings.py`
  - `git commit -m "Bump version [version]"`
  - `git push origin head`
