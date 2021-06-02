---
title: Releasing a new version (Python library)
sidebar: Handbook
showTitle: true
---

## How to release
1. Increase `VERSION` in `posthog/version.py`.
2. Update `CHANGELOG.md` with a short summary of the changes.
3. Run `make release` and `make release_analytics`.
    1. You may need to `pip install wheel twine`.
    2. Request access to upload to PyPi if you don't already have it.
4. Run `git commit -am "Release X.Y.Z." && git push origin` to bump the version in `master` (where X.Y.Z is the new version).
5. Draft and publish new "X.Y.Z" with tag `X.Y.Z` in GitHub: https://github.com/PostHog/posthog-python/releases. Use the same summary as in `CHANGELOG.md`.
