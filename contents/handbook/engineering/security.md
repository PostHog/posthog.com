---
title: Security Best Practices
sidebar: Handbook
showTitle: true
---

## GitHub

### SSH Keys

Connecting to GitHub requires an SSH key (unless using HTTPS). Traditional SSH keys live as text files on your filesystem, making them vulnerable to theft or misuse by malware. We explicitly prohibit the use of SSH keys stored on your filesystem. If you already have a key in `~/.ssh`, see [replacing a key stored on disk](#replacing-a-key-stored-on-disk).

Use [Secretive](https://github.com/maxgoedjen/secretive/) or [1Password](https://developer.1password.com/docs/ssh/manage-keys/) to generate and store your SSH key. We have a slight preference for Secretive because it stores your key in the macOS Secure Enclave, ensuring the key can never be exported or extracted, even by malware. Always use ECDSA or Ed25519 — don't use RSA.

> **Note:** The default shell on macOS is `zsh`, so the `~/.zshrc` instructions below apply to you unless you've deliberately switched to a different shell. If you're not sure which shell you're using, run `echo $SHELL` in your terminal to check. If you use bash, use `~/.bash_profile` wherever these instructions say `~/.zshrc`. macOS terminals start login shells, and bash reads `~/.bash_profile` for those, not `~/.bashrc`. If you have `~/.profile` but no `~/.bash_profile`, use `~/.profile`.

#### Setting up with Secretive

1. Open [Secretive](https://github.com/maxgoedjen/secretive/) and click the + button to create a new key.
2. Name your key "GitHub SSH" and select **Notify** in the **Protection Level** dropdown.
    - For additional protection, select **Require Authentication** instead. This will require you to use Touch ID each time the key is accessed.
3. Go to **Secretive > Integrations** in the menu bar.
4. Select your shell on the left side set the `SSH_AUTH_SOCK` environment variable as instructed. For zsh, add the following to your `~/.zshrc`:

   ```sh
   export SSH_AUTH_SOCK=~/Library/Containers/com.maxgoedjen.Secretive.SecretAgent/Data/socket.ssh
   ```

   Make it the last line of the file. A line after it, such as `eval "$(ssh-agent -s)"`, replaces the Secretive socket. Then run `source ~/.zshrc` to apply it.

5. Click on your new key in Secretive and copy the public key.
6. Go to your [GitHub SSH keys settings](https://github.com/settings/keys) and add a new SSH key. Paste your public key and set the key type to **Authentication Key**.
7. Test it by running:

   ```bash
   echo $SSH_AUTH_SOCK
   ssh-add -L
   ssh -T git@github.com
   ```

   The first command should print a path that ends in `Secretive.SecretAgent/Data/socket.ssh`. The second should list your Secretive keys. The third should print a message like "Hi username! You've successfully authenticated". Check all three. If you still have a key in `~/.ssh`, the third command can pass without Secretive, because `ssh` falls back to the key files in `~/.ssh`.

#### Setting up with 1Password

Follow the [1Password SSH key management guide](https://developer.1password.com/docs/ssh/manage-keys/).

#### Replacing a key stored on disk

You can't move an existing key into Secretive, because Secretive creates each key inside the Secure Enclave. 1Password can import a key, but don't import one that was stored on disk. Treat that key as exposed and create a new one.

1. Set up your new SSH key (above) and your [commit signing key](#commit-signing) (below). Confirm that both work before you remove the old key, so you keep access to GitHub.
2. Run `ls ~/.ssh` and delete the old key files. These are usually `id_rsa`, `id_ecdsa`, or `id_ed25519`, plus the matching `.pub` files. Keep `config` and `known_hosts`.
3. In `~/.ssh/config`, remove the `IdentityFile`, `UseKeychain`, and `AddKeysToAgent` lines for the old key.
4. Remove any `ssh-agent` or `ssh-add` lines from your shell startup files. They can replace the Secretive socket. This command lists them, and your `SSH_AUTH_SOCK` export:

   ```bash
   grep -n -E 'SSH_AUTH_SOCK|ssh-agent|ssh-add' ~/.zshrc ~/.zprofile ~/.zshenv ~/.bashrc ~/.bash_profile ~/.profile 2>/dev/null
   ```

5. In your [GitHub SSH keys settings](https://github.com/settings/keys), delete the old key. Check both the **Authentication keys** and **Signing keys** lists.
6. In each repo you work in, check for a signing config that still uses the old key. A repo-level config overrides `~/.gitconfig`. See [troubleshooting](#troubleshooting).

### Commit signing

A git commit's `Author` field is completely user controllable and can be forged. Signing your commits cryptographically proves you authored them, preventing impersonation and confusion. **Signing is required, not optional:** an org-wide GitHub ruleset rejects unsigned commits in every PostHog repository, on every branch. Set this up before your first push, rather than when a push fails. This applies to automation too, see [signing commits from workflows](#signing-commits-from-workflows).

You can sign commits with either [Secretive](https://github.com/maxgoedjen/secretive/) or [1Password](https://developer.1password.com/docs/ssh/git-commit-signing/). We have a slight preference for Secretive because it stores your key in the macOS Secure Enclave, ensuring the key can never be exported or extracted, even by malware.

#### Setting up with Secretive

1. Open Secretive and click the + button to create a new key.
2. Name your key "Git signing key" and select **Notify** in the **Protection Level** dropdown.
3. Go to **Secretive > Integrations** in the menu bar.
4. Click **Git Signing** and select "Git signing key" from the **Secret** dropdown.
5. Copy and paste the `~/.gitconfig` and `~/.gitallowedsigners` snippets into their respective files.
    - If you already have content in `~/.gitconfig`, merge the new sections into the existing file rather than replacing it.
    - If you've previously configured commit signing (with a different SSH key, a GPG key, or an older Secretive key), **replace** any existing `signingkey`, `gpgsign`, `gpg.format`, and `allowedSignersFile` entries. Don't append duplicates. Git will silently use the last value, but a `.gitconfig` with multiple conflicting `signingkey` lines is hard to reason about.
    - A repo can also have its own signing config in `.git/config`, which overrides `~/.gitconfig`. If git still signs with an old key, see [troubleshooting](#troubleshooting).
    - The `~/.gitallowedsigners` file is used by `git log --show-signature` for local verification. Each line is `<your-git-email> <key-type> <public-key>`, e.g. `you@posthog.com ecdsa-sha2-nistp256 AAAA... Git-Signing-Key@...`. If you skip it, signing still works but local verification will report `No principal matched`.
6. Select your shell on the left side of Secretive and set the `SSH_AUTH_SOCK` environment variable as instructed. Skip this step if you already did it in the SSH key setup. For zsh, add the following to your `~/.zshrc`:

   ```bash
   export SSH_AUTH_SOCK=~/Library/Containers/com.maxgoedjen.Secretive.SecretAgent/Data/socket.ssh
   ```

   Then run `source ~/.zshrc` to apply it.

7. Your `~/.gitconfig` now has a `signingkey` pointing to a file. Copy your public key to the clipboard:

   ```bash
   cat <path-from-signingkey> | pbcopy
   ```

8. Go to your [GitHub SSH keys settings](https://github.com/settings/keys) and add a new SSH key. Paste your public key and set the key type to **Signing Key**.
    - GitHub treats **Authentication Key** and **Signing Key** as separate roles, even for the same key. If you get **"Key is already in use"**, it most likely means you already added this key as an Authentication Key (from the SSH Keys setup above). The same key can serve both roles — but you have to add it once for each. Add it again with key type **Signing Key**.
9. **Verify the signature locally before pushing.** Create an empty commit on a new branch:

   ```bash
   git switch -c test-signing
   git commit --allow-empty -m "test signing"
   git log -1 --format='%GK %G?'
   ```

   You should see a fingerprint followed by `G` (good signature). The fingerprint must match the **Signing Key** you just added on GitHub — find it at [GitHub SSH keys settings](https://github.com/settings/keys) under the **Signing keys** heading. If it matches an **Authentication key** entry instead, your `user.signingkey` in `~/.gitconfig` is pointing at the wrong file — fix it before pushing.

   `U` means the signature is valid, but the key isn't in `~/.gitallowedsigners`. This usually means git signed with an old key. See [troubleshooting](#troubleshooting). If the fingerprint matches your new signing key, check the email and key in `~/.gitallowedsigners`. `N` means the commit isn't signed.

10. Push the branch to GitHub — you should see a green **Verified** badge on the commit.

    ![Signed commit](https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/signed_commit_ea0c0b0cb0.png)


#### Setting up with 1Password

Follow the [1Password git commit signing guide](https://developer.1password.com/docs/ssh/git-commit-signing/).

#### After setup

Once commit signing is configured, enable the option in your [GitHub Profile](https://github.com/settings/keys) to "Flag unsigned commits as unverified". The org ruleset already blocks unsigned commits in PostHog repos, but this marks any commit attributed to your email and not signed by you as **Unverified** everywhere else on GitHub, including your personal repos.

#### Troubleshooting

- If using iTerm/Cursor/GitHub Desktop/Sourcetree/etc., you may be endlessly prompted to "access data from other apps". You can fix this by granting the app **Full Disk Access** in **System Settings > Privacy & Security > Full Disk Access**.

- If you are prompted to complete Touch ID each time you commit, your signing key is using a **Protection Level** of **Require Authentication**. Re-follow the instructions above to generate a new signing key with a **Protection Level** of **Notify**.

- **GitHub rejects your push with `GH013: Commits must have verified signatures`** even though the commits look signed locally. The commit was signed with a key GitHub doesn't recognize as a **Signing Key** — usually because (a) the key is only registered as an **Authentication Key**, or (b) your `user.signingkey` points at the wrong file. Confirm with `git log -1 --format='%GK'` and cross-check the fingerprint against [your GitHub keys](https://github.com/settings/keys). Once the right key is registered as a Signing Key, re-sign the existing commit:

   ```bash
   git commit --amend --no-edit -S
   git push --force-with-lease
   ```

   Use `--force-with-lease` rather than plain `--force` — it refuses the push if someone else has pushed to the branch since you last fetched.

- **Git still signs with an old key** after you update `~/.gitconfig`. The repo probably has its own signing config in `.git/config`, which overrides `~/.gitconfig`. From inside the repo, run:

   ```bash
   git config --show-origin --show-scope --get-regexp '^(user\.signingkey|gpg\.|commit\.gpgsign)'
   ```

   For each line that starts with `local`, remove the key with `git config --local --unset <key>`, for example `git config --local --unset user.signingkey`. A `global` line from a file other than `~/.gitconfig` comes from an `[include]` or `[includeIf]` section, so update the key in that file.

- **A commit fails with `No private key found for public key ".../Secretive.SecretAgent/Data/PublicKeys/....pub"`**. Your shell's `SSH_AUTH_SOCK` doesn't point at Secretive. Run `echo $SSH_AUTH_SOCK`. If the path doesn't end in `Secretive.SecretAgent/Data/socket.ssh`, fix the `export` line in your shell startup file and open a new terminal. See [replacing a key stored on disk](#replacing-a-key-stored-on-disk) for lines that can override it.

### GitHub Actions

Great care should be taken when writing or modifying a GitHub Actions workflow. Actions can access (and exfiltrate) secrets scoped to the repo. We scan workflows with Semgrep and CodeQL for common misconfigurations.

#### Authentication

Most Actions use the default `GITHUB_TOKEN`, whose permissions can be scoped via the `permissions` property. However, `GITHUB_TOKEN` cannot trigger other workflows, so commits or PRs created by an Action won't run CI, leaving PRs unmergeable without manual intervention. The workaround is a GitHub App.

Personal access tokens are not an option here. Classic PATs are blocked org-wide. Fine-grained PATs require approval and are generally not approved, because they are tied to an individual user and break when that user leaves PostHog.

Use a finely scoped, purpose-specific GitHub App instead. Scope each App to its use case and ideally a single repo. Prefer creating a new App over expanding an existing one's permissions, otherwise every Action using that App inherits permissions it doesn't need.

Send a message in #team-security if you need help setting up a new GitHub App.

#### Signing commits from workflows

The org ruleset applies to Actions too. A workflow that commits with `git push` is rejected, because there is no signing key on the runner. Create the commit through the GitHub API instead, which GitHub signs with its own key. In practice that means one of:

- [`planetscale/ghcommit-action`](https://github.com/planetscale/ghcommit-action), a wrapper around the GraphQL `createCommitOnBranch` mutation. This is what most of our workflows use.
- [`peter-evans/create-pull-request`](https://github.com/peter-evans/create-pull-request) with `sign-commits: true` (v6.1 or later)
- [`changesets/action`](https://github.com/changesets/action) with `commitMode: github-api`
- calling `createCommitOnBranch` yourself

> **Signing only works with a bot-generated token**, meaning `GITHUB_TOKEN` or a GitHub App installation token. With a PAT, `sign-commits` and its equivalents are a silent no-op: the action reports success, the commit is not signed, and the push is rejected.

Two limits of `createCommitOnBranch` to plan for. Its `FileAddition` input takes only `path` and `contents`, so it cannot set a file's executable bit. And it sends `expectedHeadOid`, so the commit is rejected if the branch moved since the run read the head. Re-read the head and retry rather than forcing.

#### External contributors

In public repos, Actions may run against PRs written by external contributors. These PRs should be reviewed thoroughly before [approving workflows to run](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/approve-runs-from-forks) against them. Otherwise, a malicious PR could gain access to and steal all of the secrets available to the repo.

## Managing secrets

### AWS

Application secrets are stored in AWS Secrets Manager. To modify an app's secrets, use our <PrivateLink url="https://github.com/PostHog/secrets">secrets tool</PrivateLink>.

### GitHub

Secrets used by GitHub Actions are stored in GitHub secrets. All secrets should be stored in our [GitHub org](https://github.com/PostHog) rather than in an individual repo. This allows us to more easily reuse secrets across repos, and also provides a holistic view of all of our secrets. The org secret should be scoped to the specific repos that need it.

## Reporting a security issue

If you believe we've been hit by a security issue, [raise an incident](https://posthog.com/handbook/engineering/operations/incidents#raising-an-incident). In the best case, it'll mean security folks look at it ASAP. In the worst case, it's a false positive and we can close the incident.
