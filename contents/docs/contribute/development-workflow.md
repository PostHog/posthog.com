---
title: Development Workflow
sidebar: Docs
showTitle: true
---

## Trunk-based development

Posthog uses <a href="https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development" target="_blank">
trunk-based development</a> using Git.

Our model requires collaboration on a single branch named either `master` or `main`. We aim for short-lived feature branches to allow more frequent code-review and build checking via continuous integration.

## Contribution flow

The general flow for contributing to PostHog is:

1. Clone the repository you want to work on. 
2. Create a branch off the `master` or `main` trunk for the changes you're planning.
3. Make commits in your branch.
4. When you're ready, create a new pull request.

#### Developing against a fork

If you prefer, you may contribute using the traditional fork-based PR workflow. That is, instead of cloning the project directly, first create a personal fork of a repo. 

If you choose this method, you should still branch off the trunk and when ready create a PR as described above. 

## Branch and pull request naming

We are relatively flexible with branch names, but do have a few specific requests:

- If your pull request is related to an issue, please mention that issue when naming your branch: `git checkout -b 263-logout-button`.
- Do not use `release-*` patterns in your branches unless pushing a release. These branches have get special handling by our CI.

## Commit message style

We recommend using imperative style commit messages. 

In this style, commit message subject lines complete the following sentence: "If applied, this commit will _**your commit message subject here**_.

The exception to this is in your initial commit message, where you should mention the issue number: `git commit -m "Closes #263 adds logout button"`. This will ensure the corresponding ticket will be closed automatically once your pull request is merged.

## Review process

When we review a PR, we'll look at the following things:
- Does the PR actually solve the issue?
- Does the solution make sense?
- Will the code perform with millions of events/users/actions?
- Are there tests and do they test the right things?
- Are there any security flaws?

Things we do not care about during review:
- Syntax. If we're arguing about syntax, that means we should install a code formatter

Once that's done, we'll also QA your pull request.

# 🎉

You're done! Your code will be included in the next release of PostHog.
