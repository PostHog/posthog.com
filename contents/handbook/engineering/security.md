---
title: Security Best Practices
sidebar: Handbook
showTitle: true
---

## GitHub

### SSH Keys

Connecting to GitHub generally requires the use of an SSH key (unless connecting over https). Keys stored on your filesystem are susceptible to theft and misuse by malware.

Generate a new key reserved only for use with GitHub. The key should be generated with [Secretive](https://github.com/maxgoedjen/secretive/) or [1Password](https://developer.1password.com/docs/ssh/manage-keys/). ECDSA/Ed25519 is preferable to RSA - don't use RSA.

### Commit signing

A git commit's `Author` field is completely user controllable and can be forged. Signing your commits allows others to verify their authenticity. Generate your signing key with [Secretive](https://github.com/maxgoedjen/secretive/) or [1Password](https://developer.1password.com/docs/ssh/git-commit-signing/).

Once commit signing is configured, enable the option in your [GitHub Profile](https://github.com/settings/keys) to "Flag unsigned commits as unverified".

### GitHub Actions

Great care should be taken when writing or modifying a GitHub Actions workflow.

#### External contributors

In public repos, Actions may run against PRs written by external contributors. These PRs should be reviewed thoroughly before [approving workflows to run](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/approve-runs-from-forks) against them. Otherwise, a malicious PR could gain access to and steal all of the secrets available to the repo.

## Managing secrets

### AWS

Application secrets are stored in AWS Secrets Manager. To modify an app's secrets, use <PrivateLink url="https://github.com/PostHog/charts/tree/main/secrets">secrets.py</PrivateLink>.

### GitHub

Secrets used by GitHub Actions are stored in GitHub secrets. All secrets should be stored in our [GitHub org](https://github.com/PostHog) rather than in an individual repo. This allows us to more easily reuse secrets across repos, and also provides a holistic view of all of our secrets. The org secret should be scoped to the specific repos that need it.

## Reporting a security issue

If you believe we've been hit by a security issue, [raise an incident](https://posthog.com/handbook/engineering/operations/incidents#raising-an-incident). In the best case, it'll mean security folks look at it ASAP. In the worst case, it's a false positive and we can close the incident.
