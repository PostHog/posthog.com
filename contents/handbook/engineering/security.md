---
title: Security Best Practices
sidebar: Handbook
showTitle: true
---

## GitHub

### SSH Keys

Connecting to GitHub requires an SSH key (unless using HTTPS). Traditional SSH keys live as text files on your filesystem, making them vulnerable to theft or misuse by malware. We explicitly prohibit the use of SSH keys stored on your filesystem.

Use [Secretive](https://github.com/maxgoedjen/secretive/) or [1Password](https://developer.1password.com/docs/ssh/manage-keys/) to generate and store your SSH key. We have a slight preference for Secretive because it stores your key in the macOS Secure Enclave, ensuring the key can never be exported or extracted, even by malware. Always use ECDSA or Ed25519 — don't use RSA.

#### Setting up with Secretive

1. Open [Secretive](https://github.com/maxgoedjen/secretive/) and click the + button to create a new key.
2. Name your key "GitHub SSH" and select **Notify** in the **Protection Level** dropdown.
    - For additional protection, select **Require Authentication** instead. This will require you to use Touch ID each time the key is accessed.
3. Go to **Secretive > Integrations** in the menu bar.
4. Select your shell on the left side set the `SSH_AUTH_SOCK` environment variable as instructed. For zsh, add the following to your `~/.zshrc`:

   ```sh
   export SSH_AUTH_SOCK=~/Library/Containers/com.maxgoedjen.Secretive.SecretAgent/Data/socket.ssh
   ```

   Then run `source ~/.zshrc` to apply it.

5. Click on your new key in Secretive and copy the public key.
6. Go to your [GitHub SSH keys settings](https://github.com/settings/keys) and add a new SSH key. Paste your public key and set the key type to **Authentication Key**.
7. Test it by running:

   ```bash
   ssh -T git@github.com
   ```

   You should see a message like "Hi username! You've successfully authenticated".

#### Setting up with 1Password

Follow the [1Password SSH key management guide](https://developer.1password.com/docs/ssh/manage-keys/).

### Commit signing

A git commit's `Author` field is completely user controllable and can be forged. Signing your commits cryptographically proves you authored them, preventing impersonation and confusion.

You can sign commits with either [Secretive](https://github.com/maxgoedjen/secretive/) or [1Password](https://developer.1password.com/docs/ssh/git-commit-signing/). We have a slight preference for Secretive because it stores your key in the macOS Secure Enclave, ensuring the key can never be exported or extracted, even by malware.

#### Setting up with Secretive

1. Open Secretive and click the + button to create a new key.
2. Name your key "Git signing key" and select **Notify** in the **Protection Level** dropdown.
3. Go to **Secretive > Integrations** in the menu bar.
4. Click **Git Signing** and select "Git signing key" from the **Secret** dropdown.
5. Copy and paste the `~/.gitconfig` and `~/.gitallowedsigners` snippets into their respective files
    - If you already have content in `~/.gitconfig`, merge the new sections into the existing file rather than replacing it.
6. Select your shell on the left side of Secretive and set the `SSH_AUTH_SOCK` environment variable as instructed. For zsh, add the following to your `~/.zshrc`:

   ```bash
   export SSH_AUTH_SOCK=~/Library/Containers/com.maxgoedjen.Secretive.SecretAgent/Data/socket.ssh
   ```

   Then run `source ~/.zshrc` to apply it.

7. Your `~/.gitconfig` now has a `signingkey` pointing to a file. Copy your public key to the clipboard:

   ```bash
   cat <path-from-signingkey> | pbcopy
   ```

8. Go to your [GitHub SSH keys settings](https://github.com/settings/keys) and add a new SSH key. Paste your public key and set the key type to **Signing Key**.
9. Test it by creating an empty commit on a new branch:

   ```bash
   git commit --allow-empty -m "test signing"
   ```

   Push the branch to GitHub — you should see a green **Verified** badge on the commit.

   ![Signed commit](https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/signed_commit_ea0c0b0cb0.png)


#### Setting up with 1Password

Follow the [1Password git commit signing guide](https://developer.1password.com/docs/ssh/git-commit-signing/).

#### After setup

Once commit signing is configured, enable the option in your [GitHub Profile](https://github.com/settings/keys) to "Flag unsigned commits as unverified".

#### Troubleshooting

- If using iTerm/Cursor/GitHub Desktop/Sourcetree/etc., you may be endlessly prompted to "access data from other apps". You can fix this by granting the app **Full Disk Access** in **System Settings > Privacy & Security > Full Disk Access**.

- If you are prompted to complete Touch ID each time you commit, your signing key is using a **Protection Level** of **Require Authentication**. Re-follow the instructions above to generate a new signing key with a **Protection Level** of **Notify**.

### GitHub Actions

Great care should be taken when writing or modifying a GitHub Actions workflow. Actions can access (and exfiltrate) secrets scoped to the repo. We scan workflows with Semgrep and CodeQL for common misconfigurations.

#### Authentication

Most Actions use the default `GITHUB_TOKEN`, whose permissions can be scoped via the `permissions` property. However, `GITHUB_TOKEN` cannot trigger other workflows — so commits or PRs created by an Action won't run CI, leaving PRs unmergeable without manual intervention. The workaround is a Personal Access Token (PAT) or GitHub App. We use GitHub Apps because PATs are tied to an individual user and break when that user leaves PostHog.

Scope each GitHub App to its use case and ideally a single repo. Prefer creating a new App over expanding an existing one's permissions, otherwise every Action using that App inherits permissions it doesn't need.

Send a message in #team-security if you need help setting up a new GitHub App.

#### External contributors

In public repos, Actions may run against PRs written by external contributors. These PRs should be reviewed thoroughly before [approving workflows to run](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/approve-runs-from-forks) against them. Otherwise, a malicious PR could gain access to and steal all of the secrets available to the repo.

## Managing secrets

### AWS

Application secrets are stored in AWS Secrets Manager. To modify an app's secrets, use our <PrivateLink url="https://github.com/PostHog/secrets">secrets tool</PrivateLink>.

### GitHub

Secrets used by GitHub Actions are stored in GitHub secrets. All secrets should be stored in our [GitHub org](https://github.com/PostHog) rather than in an individual repo. This allows us to more easily reuse secrets across repos, and also provides a holistic view of all of our secrets. The org secret should be scoped to the specific repos that need it.

## Reporting a security issue

If you believe we've been hit by a security issue, [raise an incident](https://posthog.com/handbook/engineering/operations/incidents#raising-an-incident). In the best case, it'll mean security folks look at it ASAP. In the worst case, it's a false positive and we can close the incident.
