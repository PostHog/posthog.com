---
title: Releasing a new version (Python library)
sidebar: Handbook
showTitle: true
---

## How to release
1. Increase `VERSION` in `posthog/version.py`
2. Update `CHANGELOG.md` with a short summary of the changes
3. run `make release` and `make release_analytics`
    1. You may need to `pip install wheel twine`
    2. Request access to upload to PyPi if you don't already have it
4. `git commit -am "Release X.Y.Z."` (where X.Y.Z is the new version)
5. `git tag -a X.Y.Z -m "Version X.Y.Z"` (where X.Y.Z is the new version).