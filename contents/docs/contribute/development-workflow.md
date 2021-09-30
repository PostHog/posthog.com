---
title: Development Workflow
sidebar: Docs
showTitle: true
---

## Trunk-based development

Posthog uses <a href="https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development" target="_blank">
trunk-based development</a> using Git.

Our model requires collaboration on a single branch named either `master` or `main`. We aim for short-lived feature branches to allow more frequent code-review and build checking via continuous integration.

