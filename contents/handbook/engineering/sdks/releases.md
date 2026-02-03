---
title: SDK releases
sidebar: Handbook
showTitle: true
---

This guide documents our semi-automated release process for PostHog SDKs. Each SDK repository uses a GitHub App with restricted permissions to handle releases securely, requiring team approval before any release is published.

> Not all SDKs have been migrated to this process yet, but any new SDKs should definitely follow this approach. The Security folks are working on bringing all SDKs up to speed but that will take a while since we have so many of them.

## How it works

Our SDK release process uses a dedicated GitHub App per repository that can push directly to the main branch (bypassing branch protections) while still requiring human approval through GitHub Environments. This gives us:

- **Security:** The app only has access to the specific repository it needs
- **Auditability:** All releases require approval from the Client Libraries team
- **Automation:** Changelog generation, version bumping, and publishing are handled automatically

## Setting up releases for a new SDK

When creating a new SDK, or migrating an existing one to the new workflow, follow these steps to set up the release infrastructure.

> NOTE: Most of these steps require super administrator privileges on GitHub. Make sure you have the appropriate permissions to work on this.

### 1. Create a GitHub App

Go to [GitHub App settings](https://github.com/organizations/PostHog/settings/apps) and create a new app:

1. **Name:** `Releaser (<sdk_name>)` (e.g., `Releaser (posthog-go)`)
2. **Description:** Should be "Used to release new versions of `posthog-<sdk_name>` (e.g. "Used to release new versions of `posthog-go`.")
3. **Homepage URL:** Point to the SDK's docs page on posthog.com (e.g., `https://posthog.com/docs/libraries/go`)
4. **Webhook:** Disable (uncheck "Active")
5. **Permissions:** Under "Repository permissions", set only:
   - `Contents`: Read and write
6. Click **Create GitHub App**

After creating the app:

1. Upload the following image as the app icon and set the background color to `#D97148`

![SDK Releaser bot icon](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/2514924_640cf3f534.png)

2. Click the big button to generate a private key and save it locally — you'll need it later
3. Go to **Install App** in the sidebar
4. Install the app, restricting it to only the SDK repository

### 2. Create a release environment

In your SDK repository settings:

1. Go to **Environments** and create a new environment named `Release`
2. Configure protection rules:
   - **Required reviewers:** Add `Client libraries` as the team that can review
   - **Prevent self-review:** Enable this option
   - **Allow administrators to bypass:** Leave this **unchecked**

![Protection rules](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_12_29_T17_26_43_879_Z_cee626f86a.png)

3. Add environment secrets:
   - `GH_APP_POSTHOG_<SDK_NAME>_RELEASER_APP_ID` — Copy the App ID from your GitHub App settings
   - `GH_APP_POSTHOG_<SDK_NAME>_RELEASER_PRIVATE_KEY` — Paste the private key you downloaded, include the trailing newline

   > Replace `<SDK_NAME>` with your SDK name in uppercase with underscores (e.g., `GH_APP_POSTHOG_GO_RELEASER_APP_ID`, `GH_APP_POSTHOG_GO_RELEASER_PRIVATE_KEY`)

![Environment secrets](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_12_29_T17_28_12_362_Z_83a6c89501.png)

### 3. Add app to bypass lists

The GitHub App needs to bypass certain protections to push release commits directly.

#### CodeQL bypass

1. Go to [org settings](https://github.com/organizations/PostHog/settings/profile)
2. Navigate to **Repository** → **Rulesets**
3. Click on **Address CodeQL findings**
4. Under **Bypass list**, click **Add bypass**
5. Select your newly created GitHub App (`Releaser (<sdk_name>)`)
6. Click the three-dot menu and choose **Exempt**
7. Save the ruleset

![CodeQL bypass exemption](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_12_29_T17_29_04_157_Z_a403522dbe.png)

#### Repository PR bypass

1. Go to your SDK repository settings
2. Navigate to **Rules** → **Rulesets**
3. Open the ruleset that requires PRs (may have various names)
   1. If this ruleset doesn't exist, create one requiring PRs and reviews from codeowners which should be `@PostHog/client-libraries-approvers` for all files
4. Under **Bypass list**, click **Add bypass**
5. Select your GitHub App (`Releaser (<sdk_name>)`)
6. Click the three-dot menu and choose **Exempt**
7. Save the ruleset

![Repository PR bypass](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_12_29_T17_30_39_537_Z_a60a06feae.png)

### 4. Grant access to organization secrets

The release workflow needs access to shared organization secrets. Grant your SDK repository access to the below organization secrets via <PrivateLink url="https://runbooks.posthog.com/github/secrets">Terraform</PrivateLink>:

**Secrets:**
- `SLACK_CLIENT_LIBRARIES_BOT_TOKEN`
- `POSTHOG_PROJECT_API_KEY`

**Variables:**
- `GROUP_CLIENT_LIBRARIES_SLACK_GROUP_ID`
- `SLACK_APPROVALS_CLIENT_LIBRARIES_CHANNEL_ID`

### 5. Add the release workflow

Copy the release workflow from an existing SDK (e.g., [posthog-go](https://github.com/posthog/posthog-go/blob/main/.github/workflows/release.yml)) and adapt it:

1. Update the environment variable prefix to match your SDK name
2. Modify the changelog generation logic if needed for your language's conventions
3. Update the version bumping logic for your package manager (npm, pip, etc.)
4. Update the publishing steps for your package registry

### 6. Update the README

Add a section to your SDK's README explaining that releases are semi-automatic and link to the `#approvals-client-libraries` Slack channel where approval requests are posted.

### 7. Create required labels

Make sure the repository includes the following labels, they're used to trigger new releases:

- `release`
- `bump-patch`
- `bump-minor`
- `bump-major`

### 7. Open a PR

Create a PR with the new `release.yml` workflow and request a review from `@PostHog/group-client-libraries` - there's no SDK team at the moment, this is all collaborative work.

## Triggering a release

Once set up, releases are triggered by having a `release` label added to the PR alongside a matching `bump-*` tag. Once a PR is merged, the environment workflow will kick up and someone from the `@PostHog/group-client-libraries` team will have to approve it on `#approval-support-libraries`.

> In the future, we'll attempt to use https://github.com/bruits/sampo everywhere to support changesets like we have on `posthog-js` which means we won't need to worry about the `bump-*` tags.
