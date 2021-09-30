---
title: Development Workflow
sidebar: Docs
showTitle: true
---

## Trunk-based development

Posthog uses <a href="https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development" target="_blank">
trunk-based development</a> using Git.

Our model requires collaboration on a single branch named either `master` or `main`. We aim for short-lived feature branches to allow more frequent code-review and build checking via continuous integration.

### Contribution flow

The general flow for contributing to PostHog is:

1. Clone the repository you want to work on. 
2. Create a branch off the `master` or `main` trunk for the changes you're planning.
3. Make commits in your branch.
4. When you're ready, create a new pull request.

#### Developing against a fork

If you prefer, you may contribute using the traditional fork-based PR workflow. That is, instead of cloning the project directly, first create a personal fork of a repo. 

If you choose this method, you should still branch off the trunk and when ready create a PR as described above.   
