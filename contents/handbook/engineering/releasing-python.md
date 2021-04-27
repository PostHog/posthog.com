---
title: Releasing a New Version (Python Library)
sidebar: Handbook
showTitle: true
---

## How to Release
1. Increase `VERSION` in `posthog/version.py`
2. Update `CHANGELOG.md` with a short summary of the changes
3. run `make release` and `make release_analytics`
4. `git commit -am "Release X.Y.Z."` (where X.Y.Z is the new version)
5. `git tag -a X.Y.Z -m "Version X.Y.Z"` (where X.Y.Z is the new version).